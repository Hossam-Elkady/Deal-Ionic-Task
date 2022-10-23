import { Injectable } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { NotificationClass } from '../models/notificationClass.class';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    toasterContent$: Subject<{}> = new Subject();
    timerSubscription: Subscription

    constructor() { }

    getToastContent = () => this.toasterContent$;

    toastNotification = (toasterContent: NotificationClass) => {
        const { title, message, isError } = toasterContent;
        this.timerSubscription && this.timerSubscription.unsubscribe();
        this.toasterContent$.next({ title: title, message: message, isError: isError });
        this.timerSubscription = timer(3000).subscribe(() => this.toasterContent$.next(null));
    }

    closeToaster = () => this.toasterContent$.next(null);
}
