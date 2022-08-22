import { Component, Input, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CarritoService } from 'src/app/services/carrito.service';
import { Producto } from 'src/app/services/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @Input() productos: Producto[] = [];
  @Input() mensaje: string = '';
  faCartPlus = faCartPlus;

  constructor(private productoService: ProductoService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data.productos;
        this.mensaje = data.mensaje;
        console.log(this.productos);
        console.log(this.mensaje);
      }
    );
  }

  addToCarrito(item: Producto): void {
    this.carritoService.addToCarrito(item);
    console.log('carrito service')
  }

}
