import {
    ApplicationRef,
    ComponentRef,
    createComponent,
    EnvironmentInjector,
    inject,
    Injectable,
    inputBinding,
    outputBinding,
} from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertTypes } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private readonly injector = inject(EnvironmentInjector);
    private readonly appRef = inject(ApplicationRef);

    private show(message: string, color: AlertTypes, duration: number = 3000) {
        // Create a host element for the popup

        const host = document.createElement('alert-host');

        // Create the component and bind in one call
        const ref = createComponent(AlertComponent, {
            environmentInjector: this.injector,
            hostElement: host,
            bindings: [
                inputBinding('message', () => message),
                inputBinding('color', () => color),
                inputBinding('duration', () => duration),
                outputBinding('closed', () => { this.fadeOut(host, ref) }),
            ],
        });
        // Registers the component’s view so it participates in change detection cycle.
        this.appRef.attachView(ref.hostView);
        // Inserts the provided host element into the DOM (outside the normal Angular view hierarchy).
        // This is what makes the popup visible on screen, typically used for overlays or modals.
        document.body.appendChild(host);
    }

    private fadeOut(host: HTMLElement, ref: ComponentRef<AlertComponent>) {
        // Wait for the transition to finish before removing
        host.addEventListener('transitionend', () => {
            document.body.removeChild(host);
            this.appRef.detachView(ref.hostView);
            ref.destroy();
        }, { once: true });
    }

    info(message: string, duration: number = 3000) {
        this.show(message, AlertTypes.Info, duration)
    }
    warn(message: string, duration: number = 3000) {
        this.show(message, AlertTypes.Warning, duration)
    }
    error(message: string, duration: number = 3000) {
        this.show(message, AlertTypes.Error, duration)
    }
    success(message: string, duration: number = 3000) {
        this.show(message, AlertTypes.Success, duration)
    }
}