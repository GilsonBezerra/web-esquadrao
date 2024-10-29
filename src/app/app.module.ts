import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { RouteReuseStrategy } from '@angular/router';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    PagesModule,
    CommonModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFirestoreModule,
    
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    AppVersion
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
