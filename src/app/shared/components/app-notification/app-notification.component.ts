import { timer, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NotificationClass } from 'src/app/core/models/notificationClass.class';

@Component({
    selector: 'app-app-notification',
    templateUrl: './app-notification.component.html',
    styleUrls: ['./app-notification.component.css']
})
export class AppNotificationComponent implements OnInit, OnDestroy {

    toasterContent: NotificationClass;
    toasterSubscription: Subscription;
    isMouseEntered: boolean = true;
    timerSubscription: Subscription

    constructor(private notificationService: NotificationService) { }

    ngOnDestroy(): void {
        this.toasterSubscription?.unsubscribe()
    }

    ngOnInit(): void {
        this.toasterSubscription = this.notificationService.getToastContent().subscribe((res: NotificationClass) => {
            this.toasterContent = res            
        })
    }

    extendToasterTime() {
        this.isMouseEntered = false
        this.notificationService.toastNotification(this.toasterContent)
        this.toasterSubscription?.unsubscribe()
        this.timerSubscription && this.timerSubscription?.unsubscribe();
    }

    closeToaster() {
        this.toasterContent = null;
        this.isMouseEntered = true
        this.notificationService.closeToaster()
        this.ngOnInit()
    }

    closeToasterAfterMouseMove() {
        this.isMouseEntered = true
        this.timerSubscription = timer(3000).subscribe(() => {
            this.toasterContent = null
            this.ngOnInit()
        })
    }
}

