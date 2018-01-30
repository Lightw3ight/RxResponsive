# RxResponsive

RxResponsive is a small angular library for working with responsive web breakpoints in a fluid manner using RxJs.

The default breakpoints are based on bootstrap but you can configure your own strongly typed breakpoints too.

## Install
`yarn add rx-responsive`

## Usage:

### Module setup
Add the `RxResponsiveModule` with `forRoot()` to your root module's imports
```typescript
import { RxResponsiveModule } from 'rx-responsive';

@NgModule({
    imports: [
        RxResponsiveModule.forRoot()
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

### Component setup
Inject the `RxResponsiveService` service publicly
```typescript
import { RxResponsiveService } from 'rx-responsive';

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
    <div *ngIf="media.is.xs | async"></div>
    <div *ngIf="media.is.sm | async"></div>
    <div *ngIf="media.is.md | async"></div>
    <div *ngIf="media.is.lg | async"></div>
    <div *ngIf="media.is.xl | async"></div>
```

#### Combined breakpoints
```html
    <div *ngIf="media.is.xs.or.sm | async"></div>
    <div *ngIf="media.is.lg.or.xl | async"></div>
    <div *ngIf="media.is.sm.or.md.or.lg | async"></div>
```

#### greater$ and less$
```html
    <div *ngIf="media.is.md.or.greater | async"></div>
    <div *ngIf="media.is.lg.or.less | async"></div>
```

### Service API
#### .snapshot
A public getter to a snapshot in time of the current breakpoints

`media.snapshot.md === true`

#### .mediaSize$
A public getter to the breakpoint observable

```typescript
    media.mediaSize$.pipe(
        filter(ms => ms.lg),
        switchMap(...)
    )
```

### Configuring breakpoints
The default breakpoint sizes are based on bootstrap, but you can configure your own breakpoint conditions.

First off, define your own breakpoints as a const somewhere
```typescript
export const MyCustomBreakpoints = {
    mobile: { max: 500 },
    tablet: { min: 501, max: 1000 }
    desktop: { max: 1001 }
}
```

When importing the module `RxResponsiveModule` pass your breakpoints into the `forRoot()` method

```typescript
import { RxResponsiveModule } from 'rx-responsive';

@NgModule({
    imports: [
        RxResponsiveModule.withConfig(MyCustomBreakpoints)
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

Finally, when importing the `RxResponsiveService` service in your component, add a generic type argument of your custom breakpoints

```typescript
import { RxResponsiveService } from 'rx-responsive';

@Component({
    ..
})
export class MyComponent {
    constructor (
        public media: RxResponsiveService<typeof MyCustomBreakpoints>
    ) { }
}
```

You will then get strong typing of your custom breakpoints

```html
    <div *ngIf="media.is.mobile | async"></div>
    <div *ngIf="media.is.tablet.or.greater | async"></div>
    <div *ngIf="media.is.mobile.or.desktop | async"></div>
```

```typescript
    media.mediaSize$.pipe(
        filter(ms => ms.mobile),
        switchMap(..)
    )

    media.is.mobile
        .subscribe(..)
```