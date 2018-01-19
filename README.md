# a4-overlay
Angular 4 Overlay

# How-To
## Install
```
npm install a4-overlay
```

## app.module.ts
1. Add ```OverlayModule``` to imports of the ```app.module.ts```.

```typescript

...
import { OverlayModule } from 'a4-overlay';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...,
    OverlayModule,
    ...
  ],
  ...
})
```

## app.component.ts
1. Add ```viewContainerRef: ViewContainerRef``` to the constructor of ```app.component.ts```.
```typescript
...
import { ViewContainerRef } from '@angular/core';
...

constructor(private viewContainerRef: ViewContainerRef) { }
```

## your.component.ts
1. Add ```overlayService: OverlayService``` to the constructor of your component.
```typescript
constructor(private overlayService: OverlayService) { }
```
1. Invoking the overlay mask can be done by using the service as shown below.
```typescript
this.overlayService.show(); // to show an overlay over the page
this.overlayService.hide(); // to hide the overlay
```
