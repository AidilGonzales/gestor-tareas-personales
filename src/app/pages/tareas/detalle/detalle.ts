import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TareasService } from '../../../core/services/tareas';
import { CategoriasService } from '../../../core/services/categorias';
import { Tarea } from '../../../core/models/tarea.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-tarea',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss'
})
export class Detalle {

  private tareasService = inject(TareasService);
  private categoriasService = inject(CategoriasService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tarea: Tarea | null = null;
  categorias: any[] = [];
  cargando = true;
  modoEdicion = false;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    // Activar edición si viene ?edit=true
    const editParam = this.route.snapshot.queryParamMap.get('edit');
    this.modoEdicion = editParam === 'true';    

    if (id) {
      this.tareasService.obtenerTareaPorId(id).subscribe((data: Tarea)=> {
        this.tarea = data;
        this.cargando = false;
      });
    }

    // cargar categorías
    this.categoriasService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }  

  activarEdicion() {
    this.modoEdicion = true;
  }

  guardarCambios() {
    if (!this.tarea || !this.tarea.id) return;

    this.tareasService.editarTarea(this.tarea.id, this.tarea).then(() => {
      alert('Cambios guardados');
      this.router.navigate(['/tareas']);
    });
  }

  eliminar() {
    if (!this.tarea?.id) return;

    if (confirm('¿Seguro que quieres eliminar esta tarea?')) {
      this.tareasService.eliminarTarea(this.tarea.id).then(() => {
        this.router.navigate(['/tareas']);
      });
    }
  }
}
