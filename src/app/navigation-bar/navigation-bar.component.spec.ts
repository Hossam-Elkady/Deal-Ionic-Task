import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationBarComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = TestBed.get(Router); // TestBed.inject(Router) for Angular 9+
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should call onButtonClick when clicked', fakeAsync(() => {
        spyOn(component, 'onButtonClick');
        const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button#announcement');
        button.click();
        expect(component.onButtonClick).toHaveBeenCalled();
    }));

    it('check Label Value ', () => {
        fixture.whenStable().then(() => {
            const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button#announcement');
            button.click();
            expect(component.label).toEqual('announcemets')
        })
    })


    it('navigate home', () => {
        const component = fixture.componentInstance;
        const navigateSpy = spyOn(router, 'navigate');
        component.navigate();
        expect(navigateSpy).toHaveBeenCalledWith(['/home/main']);
    });

});
