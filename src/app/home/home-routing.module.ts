import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ChatsComponent } from './chats/chats.component';
import { HomePage } from './home.page';
import { MainHomeComponent } from './main-home/main-home.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo: '/home/main', pathMatch: 'full' },
      { path: 'main', component: MainHomeComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'announcements', component: AnnouncementsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
