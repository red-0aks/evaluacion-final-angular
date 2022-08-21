import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { FormularioComponent } from './components/productos/formulario/formulario.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/formulario', component: FormularioComponent, },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '404', component: Pagina404Component },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
