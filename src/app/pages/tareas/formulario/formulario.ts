import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareasService } from '../../../core/services/tareas';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../../core/services/categorias';
import { Auth } from '@angular/fire/auth';


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
  private categoriasService = inject(CategoriasService);
  private router = inject(Router);
  private auth = inject(Auth);


  categorias: any[] = [];

  form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: [''],
    categoriaId: ['', Validators.required],
    fecha: ['', Validators.required],
    completada: [false],
  });

  constructor() {

    this.categoriasService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });

  }


  async guardar() {
    if (this.form.invalid) return;

    const uid = this.auth.currentUser?.uid;

    if (!uid) {
      // si no hay usuario logueado, redirigir a login
      alert('Debes iniciar sesión para crear tareas.');
      this.router.navigate(['/login']);
      return;
    }

    const tarea = {
      titulo: this.form.value.titulo ?? '',
      descripcion: this.form.value.descripcion ?? '',
      categoriaId: this.form.value.categoriaId ?? '',
      fecha: this.form.value.fecha ?? '',
      completada: this.form.value.completada ?? false,
      creadoPor: uid // luego se completa en el service
    };

    this.tareasService.crearTarea(tarea).then(() => {
      this.router.navigate(['/tareas']);
    });
  }

}
