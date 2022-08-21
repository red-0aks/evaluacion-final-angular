import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Producto } from './producto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndpoint: string = 'http://localhost:8088/api/productos';
  private httpHeaders =  new HttpHeaders({ 'Content-type' : 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  //OBTENER TODOS LOS PRODUCTOS
  getProductos(): Observable<any> {
    return this.http.get<any>(this.urlEndpoint);
  }

  //OBTENER POR ID
  getProducto(id: number): Observable<any> {
    return this.http.get<Producto>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        //this.router.navigate(['/productos']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  //CREAR PRODUCTO
  createProducto(producto: Producto): Observable<any> {
    return this.http.post(this.urlEndpoint, producto, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.producto as Producto),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  //UPDATE PRODUCTO
  updateProducto(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${producto.id}`, producto,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  //DELETE PRODUCTO
  deleteProducto(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
