import { Injectable, EventEmitter } from '@angular/core';
import { Message } from 'src/app/shared/models/Message';
declare var $: any;  

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  connectionIdReceived = new EventEmitter<string>();
  
  private connectionIsEstablished = false;
  private hubConnection: any;
  private proxy: any;
  
  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  
  sendMessage(message: Message) {
    //this.proxy.state.connectionId = "Fadi Fakhouri";
    this.proxy.invoke('SendMessageToClient', message);
    

    //this.proxy.invoke('BroadcastMessage', message);
  }
  
  private createConnection() {
    this.hubConnection = $.hubConnection("https://localhost:44348");
    this.proxy = this.hubConnection.createHubProxy("StackHub");
  }

  private startConnection(): void {
    this.hubConnection.start().done((data: any) => {
        console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
        this.connectionIdReceived.emit(data.id);
        this.connectionEstablished.emit(true);
        this.connectionIsEstablished = true;
    }).fail((error: any) => {
        console.log('Could not connect ' + error);
        this.connectionEstablished.emit(false);
    });
  }
 
  private registerOnServerEvents(): void {
    this.proxy.on('messageReceived', (data: any) => {
      console.log(data);
      this.messageReceived.emit(data);
    });
  }
}
