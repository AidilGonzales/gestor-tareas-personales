import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasRef;

  constructor(private firestore: Firestore) {
    this.categoriasRef = collection(this.firestore, 'categorias');
  }

  // Crear categoría
  crearCategoria(categoria: Categoria) {
    return addDoc(this.categoriasRef, categoria);
  }

  // Obtener categorías (tiempo real)
  obtenerCategorias(): Observable<Categoria[]> {
    return collectionData(this.categoriasRef, { idField: 'id' }) as Observable<Categoria[]>;
  }

  // Editar categoría
  actualizarCategoria(id: string, categoria: Partial<Categoria>) {
    const catDoc = doc(this.firestore, `categorias/${id}`);
    return updateDoc(catDoc, categoria);
  }

  // Eliminar categoría
  eliminarCategoria(id: string) {
    const catDoc = doc(this.firestore, `categorias/${id}`);
    return deleteDoc(catDoc);
  }
}
