import { timer, Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NotificationClass } from 'src/app/core/models/notificationClass.class';

@Component({
    selector: 'app-app-notification',
    templateUrl: './app-notification.component.html',
    styleUrls: ['./app-notification.component.css']
})
export class AppNotificationComponent implements OnInit {

    toasterContent$: Observable<NotificationClass>;

    constructor(private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.toasterContent$ = this.notificationService.getToastContent()
    }

    closeToaster() {
        this.notificationService.closeToaster()
    }
}

