import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../services/producto'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() productos: Producto[] = [];
  @Input() mensaje: string = '';

  imagenesCarousel: any = [
    { src: '../../../assets/img/cat1.png' },
    { src: '../../../assets/img/cat2.png' },
    { src: '../../../assets/img/cat3.png' },
  ]

  constructor(private productoService: ProductoService) { }

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

  ordenarProductos(property: string): void {
    
  }
}
