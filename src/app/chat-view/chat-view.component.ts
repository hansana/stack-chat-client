import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ChatListService } from '../core/services/chat-list.service';
import { ChatService } from '../core/services/chat.service';
import { LoggerService } from '../core/services/logger.service';
import { Message, MESSAGE_TYPE } from '../shared/models/message';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  @Input() user: any;

  txtMessage: string = '';
  messages = new Array<Message>();
  message = new Message();
  pageSize: number = 10;
  pageNumber: number = 1;
  isLoading: boolean = false;
  hasMore: boolean = false;

  constructor(
    private _chatService: ChatService,
    private _chatListService: ChatListService,
    private _logger: LoggerService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.getMessages();
  }

  ngOnInit() {
  }

  getMessages(loadMore: boolean = false): void {
    this.isLoading = true;
    this._chatListService.getAllMessage(this.pageNumber, this.pageSize)
      .subscribe(
        (res: Message[]) => {
          if (res !== undefined && res.length > 0) {
            this.messages = res.concat(this.messages);
            this.hasMore = res.length < 10 ? false : true;
          } else {
            this.hasMore = false;
          }

          if (!loadMore) { this.scollToBottom(); }
          this.pageNumber++;
        },
        (err: any) => { this._logger.logError(err); this.isLoading = false; },
        () => { this._logger.log(`Messages loaded successfylly`); this.isLoading = false; }
      )
  }
  
  sendMessage(): void {
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.userId = this.user.id;
      this.message.userName = this.user.userName,
      this.message.type = MESSAGE_TYPE.TEXT;  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.messages.push(this.message);
      this._chatService.sendMessage(this.message);  
      this.txtMessage = '';
      this.scollToBottom();
    }  
  }

  private subscribeToEvents(): void {  
    this._chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.userId !== this.user.id) {
          this.messages.push(message);
          this.scollToBottom();
        }
      });
    });
  }

  private scollToBottom(){
    setTimeout(function(){ window.scrollTo(0, document.body.scrollHeight); }, 100);
  }
}
