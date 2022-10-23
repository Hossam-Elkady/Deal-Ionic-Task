import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotificationComponent } from './components/app-notification/app-notification.component';



@NgModule({
    declarations: [AppNotificationComponent],
    imports: [CommonModule],
    exports: [AppNotificationComponent]
})
export class SharedModule { }
