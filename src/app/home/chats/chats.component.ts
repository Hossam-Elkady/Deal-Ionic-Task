import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { NotificationClass } from 'src/app/core/models/notificationClass.class';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-chats',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, OnDestroy {

    constructor(
        private notificationService: NotificationService
    ) { }

    ngOnDestroy(): void {
        this.showNotification()
    }

    ngOnInit() { }

    showNotification() {        
        let toasterContent: NotificationClass = new NotificationClass()
        toasterContent.title = '';
        toasterContent.message = 'Notification for you!';
        toasterContent.isError = false;
        let sub: Subscription = timer(5000).subscribe(() => {
            this.notificationService.toastNotification(toasterContent);
            sub.unsubscribe()
        })
    }

}
