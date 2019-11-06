import { ActionListComponent } from './forms/elements/action/action-list/action-list.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AttachmentComponent } from './forms/elements/attachment/attachment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BusinessUnitTextComponent } from './forms/elements/business-unit/business-unit-text/business-unit-text.component';
import { BusinessUnitTreeComponent } from './forms/elements/business-unit/business-unit-tree/business-unit-tree.component';
import { CheckboxComponent } from './forms/elements/checkbox/checkbox.component';
import { CoreModule } from './core/core.module';
import { CurrencyComponent } from './forms/elements/currency/currency.component';
import { DateComponent } from './forms/elements/date/date.component';
import { DecimalComponent } from './forms/elements/decimal/decimal.component';
import { DividerComponent } from './forms/elements/divider/divider.component';
import { DropdownComponent } from './forms/elements/dropdown/dropdown.component';
import { environment } from '../environments/environment';
import { FormHeadingComponent } from './forms/elements/form-heading/form-heading.component';
import { HeaderInterceptor } from './core/services/header-interceptor.service';
import { HtmlComponent } from './forms/elements/html/html.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImageComponent } from './forms/elements/image/image.component';
import { IntegerComponent } from './forms/elements/integer/integer.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { LabelComponent } from './forms/elements/label/label.component';
import { NgModule } from '@angular/core';
import { PopoverComponent } from './forms/elements/popover/popover.component';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { SignatureComponent } from './forms/elements/signature/signature.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TextareaComponent } from './forms/elements/textarea/textarea.component';
import { TextComponent } from './forms/elements/text/text.component';
import { UrlComponent } from './forms/elements/url/url.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    ActionListComponent,
    AppComponent,
    AttachmentComponent,
    BusinessUnitTextComponent,
    BusinessUnitTreeComponent,
    CheckboxComponent,
    CurrencyComponent,
    DateComponent,
    DecimalComponent,
    DividerComponent,
    DropdownComponent,
    FormHeadingComponent,
    HtmlComponent,
    ImageComponent,
    IntegerComponent,
    LabelComponent,
    PopoverComponent,
    SignatureComponent,
    TextareaComponent,
    TextComponent,
    UrlComponent
  ],
  entryComponents: [
    ActionListComponent,
    AttachmentComponent,
    BusinessUnitTextComponent,
    BusinessUnitTreeComponent,
    CheckboxComponent,
    CurrencyComponent,
    DateComponent,
    DecimalComponent,
    DividerComponent,
    DropdownComponent,
    FormHeadingComponent,
    HtmlComponent,
    ImageComponent,
    IntegerComponent,
    LabelComponent,
    PopoverComponent,
    SignatureComponent,
    TextareaComponent,
    TextComponent,
    UrlComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FileUploadModule,
    SharedModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IonicStorageModule.forRoot({
      name: '__solvpwadb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
