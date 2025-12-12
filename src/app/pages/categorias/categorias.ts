import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../core/services/categorias';
import { Categoria } from '../../core/models/categoria.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss'
})
export class Categorias implements OnInit {

  categorias: Categoria[] = [];
  nuevaCategoria: string = '';
  editando: Categoria | null = null;
  errorMsg = '';

  constructor(
    private categoriasService: CategoriasService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  crear() {
    const nombre = this.nuevaCategoria.trim();

    if (!nombre) {
      this.errorMsg = "El nombre no puede estar vacío.";
      return;
    }

    if (this.categorias.some(c => c.nombre.toLowerCase() === nombre.toLowerCase())) {
      this.errorMsg = "Esta categoría ya existe.";
      return;
    }

    const cat: Categoria = {
      nombre,
      creadoPor: this.auth.auth.currentUser?.uid ?? ''
    };

    this.categoriasService.crearCategoria(cat);
    this.nuevaCategoria = '';
    this.errorMsg = '';
  }

  seleccionarParaEditar(cat: Categoria) {
    this.editando = { ...cat };
  }

  guardarEdicion() {
    if (!this.editando) return;

    this.categoriasService.actualizarCategoria(this.editando.id!, {
      nombre: this.editando.nombre
    });

    this.editando = null;
  }

  cancelar() {
    this.editando = null;
  }

  eliminar(id: string | undefined) {
    if (!id) return;

    if (confirm("¿Eliminar categoría?")) {
      this.categoriasService.eliminarCategoria(id);
    }
  }
}
