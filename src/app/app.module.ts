import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RelojComponent } from './components/reloj/reloj.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { FormularioComponent } from './components/productos/formulario/formulario.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CL';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination'


registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RelojComponent,
    HomeComponent,
    ProductosComponent,
    NosotrosComponent,
    Pagina404Component,
    FormularioComponent,
    CarritoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot(environment.auth0),
    NgxPaginationModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
