import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { Producto } from 'src/app/services/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnChanges {

  listaProductos: Producto[] = [];
  montoTotal: number = 0;

  constructor(private router: Router, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.listaProductos = this.carritoService.getCarrito();
    this.montoTotal = this.carritoService.getMontoTotal();
  }

  ngOnChanges(): void {

  }

  public vaciarCarrito(): void {
    this.carritoService.deleteAll();
    this.listaProductos = this.carritoService.getCarrito();
    this.montoTotal = this.carritoService.getMontoTotal();
    Swal.fire('Carrito vaciado');
  }

  public deleteFromCarrito(i: number): void {
    this.carritoService.deleteByIndex(i);
    this.listaProductos = this.carritoService.getCarrito();
    this.montoTotal = this.carritoService.getMontoTotal();
    Swal.fire('Producto eliminado');
  }

  public getMontoTotal(): void {

    this.listaProductos.forEach(item => {
      this.montoTotal = this.montoTotal + item.precio;
    })
    // return this.carritoService.getMontoTotal();
  }


}
