import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

    isThereNotification: boolean = false;
    label: string = 'announcemets';

    constructor(
        private notificationService: NotificationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.checkNotifications()
    }

    checkNotifications() {
        this.notificationService.getToastContent().subscribe((res) => {
            if (res) {
                this.isThereNotification = true;
            }
        })
    }

    onButtonClick(): void {
        console.log('clicked')
    }

    navigate() {
        this.router.navigate(['/home/main'])
    }
}
