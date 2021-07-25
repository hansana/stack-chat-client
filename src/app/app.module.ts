import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { LoginComponent } from './shared/component/login/login.component';
import { CoreModule } from './core/core.module';
import { ChatLabelComponent } from './chat-label/chat-label.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatViewComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ChatLabelComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
