import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { RestService } from './rest.service';

//Importações Portinari
import { PoFieldModule } from '@portinari/portinari-ui';
import { PoAccordionModule } from '@portinari/portinari-ui';
import { PoButtonModule } from '@portinari/portinari-ui';
import { PoTableModule } from '@portinari/portinari-ui';
import { PoTagModule } from '@portinari/portinari-ui';
import { PoContainerModule } from '@portinari/portinari-ui';
import { PoLoadingModule } from '@portinari/portinari-ui';
import { PoModalModule } from '@portinari/portinari-ui';
import { PoDividerModule } from '@portinari/portinari-ui';
import { PoNotificationModule } from '@portinari/portinari-ui';
import { PoInfoModule } from '@portinari/portinari-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    PoFieldModule,
    HttpClientModule,
    PoAccordionModule,
    BrowserAnimationsModule,
    PoButtonModule,
    PoTableModule,
    PoTagModule,
    PoContainerModule,
    PoLoadingModule,
    PoModalModule,
    PoDividerModule,
    PoNotificationModule,
    PoInfoModule
  ],
  providers: [
    CookieService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
