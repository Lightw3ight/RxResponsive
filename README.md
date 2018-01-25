# RxResponsive

RxResponsive is a small responsive library for working with responsive web breakpoints in a responsive, fluid manor

## Install
TBA

## Usage:

### Module setup
Add the `RxResponsiveModule` as a provider
```typescript
import { RxResponsiveModule } from 'RxResponsive';

@NgModule({
    imports: [
        ..
    ],
    declarations: [
        ..
    ],
    providers: [
        RxResponsiveModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

### Component setup
Inject the `RxResponsiveService` service publicly
```typescript
import { } from 'RxResponsive';

@Component({
    ..
})
export class MyComponent {
    constructor (
        public media: RxResponsiveService
    ) { }
}
```

### Using the service in your HTML
Given that you have publicly imported `RxResponsiveService` in your component with a name of `media`
#### Simple breakpoints
```html
    <div *ngIf="media.is.xs$"></div>
    <div *ngIf="media.is.sm$"></div>
    <div *ngIf="media.is.md$"></div>
    <div *ngIf="media.is.lg$"></div>
    <div *ngIf="media.is.xl$"></div>
```

#### Combined breakpoints
```html
    <div *ngIf="media.is.xs$.or.sm$"></div>
    <div *ngIf="media.is.lg$.or.xl$"></div>
    <div *ngIf="media.is.sm$.or.md$.or.lg$"></div>
```

#### greater$ and less$
```html
    <div *ngIf="media.is.md$.or.greater$"></div>
    <div *ngIf="media.is.lg$.or.less$"></div>
```

### Service API
#### .snapshot
A public getter to a snapshot in time of the current breakpoints

`media.snapshot.isMd === true`

#### .mediaSize$
A public getter to the breakpoint observable

```typescript
    media.mediaSize$.pipe(
        filter(ms => ms.isLg),
        switchMap(...)
    )
```

### Configuring breakpoints
The default breakpoint sizes are based on bootstrap, but you can configure your own breakpoint conditions.

Instead of registering the `RxResponsiveModule` module as a provider, add it as an import using the static `withConfig()` method

```typescript
import { RxResponsiveModule } from 'RxResponsive';

@NgModule({
    imports: [
        RxResponsiveModule.withConfig({
            xs: { max: 575 },
            sm: { min: 576, max: 767 },
            md: { min: 768, max: 991 },
            lg: { min: 992, max: 1199 },
            xl: { min: 1200 },
        })
    ],
    declarations: [
        ..
    ],
    providers: [
        ..
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```