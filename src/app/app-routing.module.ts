import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { LoginComponent } from './shared/component/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'chatlist', component: ChatListComponent },
  // { path: 'chatview/:id', component: ChatViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
