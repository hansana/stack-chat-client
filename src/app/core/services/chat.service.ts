import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../../shared/models/message';
import { environment } from '../../../environments/environment';
declare var $: any;  

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  connectionIdReceived = new EventEmitter<string>();
  userLogedIn = new EventEmitter<string>();
  
  chatBaseUrl = environment.baseUrl;
  private hubConnection: any;
  private proxy: any;
  
  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  
  sendMessage(message: Message) {
    this.proxy.invoke('SendMessageToClient', message);
  }
  
  private createConnection() {
    this.hubConnection = $.hubConnection(this.chatBaseUrl);
    this.proxy = this.hubConnection.createHubProxy("StackHub");
  }

  private startConnection(): void {
    this.hubConnection.start().done((data: any) => {
        console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
        this.connectionIdReceived.emit(data.id);
        this.connectionEstablished.emit(true);
    }).fail((error: any) => {
        console.log('Could not connect ' + error);
        this.connectionEstablished.emit(false);
    });
  }
 
  private registerOnServerEvents(): void {
    this.proxy.on('messageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });

    this.proxy.on('userLogin', (data: any) => {
      this.userLogedIn.emit(data);
    });
  }
}
