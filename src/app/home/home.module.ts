import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MainHomeComponent } from './main-home/main-home.component';
import { OrdersComponent } from './orders/orders.component';
import { ChatsComponent } from './chats/chats.component';
import { AnnouncementsComponent } from './announcements/announcements.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, MainHomeComponent, OrdersComponent, ChatsComponent, AnnouncementsComponent]
})
export class HomePageModule { }
