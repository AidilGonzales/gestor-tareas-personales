import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TareasService } from '../../../core/services/tareas';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tarea: Tarea | null = null;
  cargando = true;
  modoEdicion = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    // cargar la tarea
    this.tareasService.obtenerTareaPorId(id).subscribe((tarea: any) => {
      this.tarea = tarea;
      this.cargando = false;
    });

    // si la URL tiene ?edit=true → activar edición
    this.modoEdicion = this.route.snapshot.queryParamMap.get('edit') === 'true';
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
