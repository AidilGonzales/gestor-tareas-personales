import { Component, inject } from '@angular/core';
import { TareasService } from '../../../core/services/tareas';
import { Tarea } from '../../../core/models/tarea.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../../core/services/categorias';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista {

  private tareasService = inject(TareasService);

  tareas: Tarea[] = [];
  filtro = '';
  
  constructor() {
    this.tareasService.obtenerTareas().subscribe(data => {
      this.tareas = data;
    });
    this.categoriasService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  categorias: any[] = [];
  private categoriasService = inject(CategoriasService);

  

  get tareasFiltradas() {
    return this.tareas.filter(t =>
      t.titulo.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminar(id: string | undefined) {
    if (!id) return;
    if (confirm('¿Eliminar tarea?')) {
      this.tareasService.eliminarTarea(id);
    }
  }
  
  getCategoriaNombre(id: string) {
   return this.categorias.find(c => c.id === id)?.nombre ?? 'Sin categoría';
  }

}
