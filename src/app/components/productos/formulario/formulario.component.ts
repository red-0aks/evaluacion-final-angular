import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/services/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  titleCreate: string = "Crear nuevo producto";
  producto: Producto = new Producto();
  submitted: boolean = false;

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    stock: new FormControl(''),
    precio: new FormControl(''),
    imagen: new FormControl(''),
  })

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(200)
          ]
        ],
        descripcion: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(1000)
          ]
        ],
        stock: [
          '',
          [
            Validators.required,
          ]
        ],
        precio: [
          '',
          [
            Validators.required,
          ]
        ],
        imagen: [
          '',
          [
            Validators.required,
          ]
        ]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.producto);
    this.createProducto();
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public createProducto(): void {
    this.productoService.createProducto(this.producto).subscribe(
      producto => {
        this.router.navigate(['/productos']);
        Swal.fire('Nuevo Producto', `Se ha creado el producto ID: ${producto.ID} - ${producto.nombre}`, 'success');
      }
    );
  }

}
