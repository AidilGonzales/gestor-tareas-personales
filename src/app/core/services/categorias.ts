import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { Categoria } from '../models/categoria.model';
import { Observable, of, switchMap, map } from 'rxjs';
import { AuthService } from './auth';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasRef;
  private auth = inject(AuthService);

  constructor(private firestore: Firestore) {
    this.categoriasRef = collection(this.firestore, 'categorias');
  }

  // Crear categoría
  crearCategoria(categoria: Categoria) {
    return addDoc(this.categoriasRef, categoria);
  }

  // Obtener categorías (tiempo real)
  
  obtenerCategorias(): Observable<Categoria[]> {
    return this.auth.user$.pipe(
      switchMap((usuario) => {
        if (!usuario) return of([]);

        const ref = query(
          this.categoriasRef,
          where('creadoPor', '==', usuario.uid)
        );

        return collectionData(ref, { idField: 'id' }).pipe(
          map((categorias: any[]) => {
            return (categorias || []).slice().sort((a, b) =>
              a.nombre.localeCompare(b.nombre)
            );
          })
        );
      })
    );
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
