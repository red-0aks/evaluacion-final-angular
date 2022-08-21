import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css']
})
export class RelojComponent implements OnInit {

  title="Reloj"
  fecha:number = Date.now();
  hora:any;
 

  constructor() { }

  ngOnInit(): void {
    this.mostrarHora();
  }

  mostrarHora(){
    this.hora = new Date()
   
    setInterval(()=> {
      this.hora = new Date();
    },1000)
  }

}
