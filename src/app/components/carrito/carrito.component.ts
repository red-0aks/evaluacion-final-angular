import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { Producto } from 'src/app/services/producto';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  docPDF: jsPDF = new jsPDF();
  listaProductos: Producto[] = [];
  montoTotal: number = 0;

  constructor(private router: Router, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.listaProductos = this.carritoService.getCarrito();
    this.montoTotal = this.carritoService.getMontoTotal();
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

  public getMontoTotal(): number {
    return this.carritoService.getMontoTotal();
  }

  // PDF
  downloadPDF() {
    const html = document.getElementById('seleccion')
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 6
    };
    // @ts-ignore
    html2canvas(html, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_boleta_cliente.pdf`);
    });
  }
}
