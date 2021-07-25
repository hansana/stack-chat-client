import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './services/logger.service';
import { ChatService } from './services/chat.service';
import { LoginService } from './services/login.service';
import { UserDataService } from './services/user-data.service';
import { ChatListService } from './services/chat-list.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule, RouterModule
  ],
  providers: [
    LoggerService, ChatService, LoginService, UserDataService, ChatListService,
    { provide: 'Window', useFactory: () => window }
  ],
})
export class CoreModule { }
