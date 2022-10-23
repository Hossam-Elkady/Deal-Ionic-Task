import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

    isThereNotification: boolean = false;

    constructor(
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.checkNotifications()
    }

    checkNotifications() {
        let sub: Subscription = this.notificationService.getToastContent().subscribe((res) => {
            if (res) {
                this.isThereNotification = true;
                sub.unsubscribe()
            }
        })
    }

}
