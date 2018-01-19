import { Injectable, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import { OverlayComponent } from './../overlay/overlay.component';

enum BusCommand { SHOW, HIDE };

interface BusData {
    command: BusCommand;
    dynamicComponent?: Type<any>;
}

@Injectable()
export class OverlayService {

    private count = 0;
    private componentRef: ComponentRef<OverlayComponent>;
    private dynamicComponentRef: ComponentRef<any>;
    private bus$ = new BehaviorSubject<BusData>(null);

    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) {
        this.bus$.filter(p => !!p)
            .subscribe(p => {
                setTimeout(() => {
                    if (p.command === BusCommand.SHOW) {
                        this.doShow(p.dynamicComponent);
                    } else {
                        this.doHide();
                    }
                }, 0);
            });
    }

    private get viewContainerRef(): ViewContainerRef {
        if (this.applicationRef.components.length === 0) {
            return null;
        }
        const appInstance = this.applicationRef.components[0].instance;

        if (!appInstance.viewContainerRef) {
            const appName = this.applicationRef.componentTypes[0].name;
            throw new Error(`Missing 'viewContainerRef' declaration in ${appName} constructor`);
        }

        return appInstance.viewContainerRef;
    }

    private doShow(dynamicComponent: Type<any>) {
        if (this.viewContainerRef) {
            if (this.count === 0) {
                const factory = this.resolver.resolveComponentFactory(OverlayComponent);
                this.componentRef = this.viewContainerRef.createComponent(factory);
                if (dynamicComponent) {
                    const dynamicFactory = this.resolver.resolveComponentFactory(dynamicComponent);
                    this.dynamicComponentRef = this.viewContainerRef.createComponent(dynamicFactory);
                }
            }
            this.count++;
        }
    }

    doHide() {
        if (this.count > 0) {
            this.count--;
            if (this.count === 0) {
                this.componentRef.destroy();
                if (this.dynamicComponentRef) {
                    this.dynamicComponentRef.destroy();
                    this.dynamicComponentRef = null;
                }
            }
        }

    }

    show(dynamicComponent: Type<any> = null) {
        this.bus$.next({ command: BusCommand.SHOW, dynamicComponent });
    }

    hide() {
        this.bus$.next({ command: BusCommand.HIDE });
    }

    public get attachedComponent(): ComponentRef<any> {
        return this.dynamicComponentRef;
    }

}