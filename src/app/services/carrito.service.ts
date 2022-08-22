import { compileNgModule } from '@angular/compiler';
import { Injectable, Output } from '@angular/core';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productosCarrito: Producto[] = []
  private montoTotal: number = 0;

  constructor() { }

  public getCarrito(): Producto[] {
    return this.productosCarrito;
  }

  public addToCarrito(item: Producto): void {
    this.productosCarrito.push(item);
    console.log('carrito service - item.precio:', item.precio)
    this.montoTotal = this.montoTotal + item.precio;
    console.log('carrito service - total:', this.montoTotal)
    console.log('carrito service', this.productosCarrito);
  }

  public sizeCarrito(): number {
    return this.productosCarrito.length;
  }

  public deleteByIndex(index: number): void {
    this.montoTotal = this.montoTotal - this.productosCarrito[index].precio;
    this.productosCarrito.splice(index, 1);
  }

  public deleteAll(): void {
    this.productosCarrito.splice(0, this.productosCarrito.length);
    this.montoTotal = 0;
  }

  public getMontoTotal(): number {
    // console.log('El monto total es: ', this.montoTotal)
    return this.montoTotal;
  }

}
