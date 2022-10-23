import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotificationComponent } from './components/app-notification/app-notification.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
    declarations: [AppNotificationComponent],
    imports: [CommonModule, IonicModule],
    exports: [AppNotificationComponent]
})
export class SharedModule { }
