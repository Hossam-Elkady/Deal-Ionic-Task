import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { NotificationClass } from './core/models/notificationClass.class';
import { NotificationService } from './core/services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription[] = []

    constructor(private notificationService: NotificationService) { }

    ngOnDestroy(): void {
        this.subscription.forEach(sub => sub?.unsubscribe())
    }

    ngOnInit(): void {
        this.subscription.push(timer(3000).subscribe(() => this.sendNotification()))
    }

    sendNotification() {
        let toasterContent: NotificationClass = new NotificationClass()
        toasterContent.title = '';
        toasterContent.message = 'Notification for you!';
        toasterContent.isError = false;
        this.notificationService.toastNotification(toasterContent)
    }
}
