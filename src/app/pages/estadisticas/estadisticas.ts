import { Component, inject } from '@angular/core';
import { TareasService } from '../../core/services/tareas';
import { CategoriasService } from '../../core/services/categorias';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
  imports: [CommonModule]
})
export class Estadisticas {

  private tareasService = inject(TareasService);
  private categoriasService = inject(CategoriasService);

  tareas: any[] = [];
  categorias: any[] = [];

  total = 0;
  completadas = 0;
  pendientes = 0;

  tareasPorCategoria: { categoria: string, cantidad: number }[] = [];

  constructor() {
    // cargar tareas
    this.tareasService.obtenerTareas().subscribe(tareas => {
      this.tareas = tareas;

      this.total = tareas.length;
      this.completadas = tareas.filter(t => t.completada).length;
      this.pendientes = tareas.filter(t => !t.completada).length;

      this.calcularTareasPorCategoria();
    });

    // cargar categorías
    this.categoriasService.obtenerCategorias().subscribe(cats => {
      this.categorias = cats;
      this.calcularTareasPorCategoria();
    });
  }

  calcularTareasPorCategoria() {
    if (this.categorias.length === 0 || this.tareas.length === 0) return;

    this.tareasPorCategoria = this.categorias.map(cat => ({
      categoria: cat.nombre,
      cantidad: this.tareas.filter(t => t.categoriaId === cat.id).length
    }));
  }
}
