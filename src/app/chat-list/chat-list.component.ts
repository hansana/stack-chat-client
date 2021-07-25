import { Component, Input, NgZone, OnInit } from '@angular/core';

import { Message } from '../shared/models/Message';  
import { ChatService } from '../core/services/chat.service';  
import { IUser } from '../shared/interfaces/shared-interface';
import { UserDataService } from '../core/services/user-data.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Input() user: any;

  constructor(
    private _chatService: ChatService,
    private _userService: UserDataService,
    private _ngZone: NgZone
  ) {
    this.updateUserConnectionId();
  }

  ngOnInit() {
  }

  private updateUserConnectionId(): void {
    this._chatService.connectionIdReceived.subscribe((connectionId: string) => {
      this._ngZone.run(() => {
        if (connectionId !== undefined || connectionId !== '') {
          this._userService.updateConnectionId(this.user.id, connectionId);
        };
      });
    });
  }
}
