import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareasService } from '../../../core/services/tareas';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../../core/services/categorias';

@Component({
  selector: 'app-formulario-tarea',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class Formulario {

  private fb = inject(FormBuilder);
  private tareasService = inject(TareasService);
  private router = inject(Router);

  categorias: any[] = [];

  form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: [''],
    categoriaId: ['', Validators.required],
    fecha: ['', Validators.required],
    completada: [false],
  });

  constructor() {
    const categoriasService = inject(CategoriasService);

    categoriasService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }


  guardar() {
    if (this.form.invalid) return;

    const tarea = {
      titulo: this.form.value.titulo ?? '',
      descripcion: this.form.value.descripcion ?? '',
      categoriaId: this.form.value.categoriaId ?? '',
      fecha: this.form.value.fecha ?? '',
      completada: this.form.value.completada ?? false,
      creadoPor: '' // luego se completa en el service
    };

    this.tareasService.crearTarea(tarea).then(() => {
      this.router.navigate(['/tareas']);
    });
  }

}
