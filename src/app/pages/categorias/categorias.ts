import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../core/services/categorias';
import { Categoria } from '../../core/models/categoria.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  crear() {
    if (!this.nuevaCategoria.trim()) return;

    const categoria: Categoria = {
      nombre: this.nuevaCategoria,
      creadoPor: '' // luego colocamos uid real del usuario
    };

    this.categoriasService.crearCategoria(categoria);
    this.nuevaCategoria = '';
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

  eliminar(id: string | undefined) {
    if (!id) return;
    this.categoriasService.eliminarCategoria(id);
  }
}
