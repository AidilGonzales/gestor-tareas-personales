import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { AuthService } from './auth';
import { Tarea } from '../models/tarea.model';
import { Observable } from 'rxjs';
import { docData } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class TareasService {

  private firestore = inject(Firestore);
  private auth = inject(AuthService);

  // referencia a colección
  private tareasRef = collection(this.firestore, 'tareas');

  // Crear tarea
  crearTarea(tarea: Tarea) {
    return addDoc(this.tareasRef, tarea);
  }

  // Obtener tareas del usuario
  obtenerTareas(): Observable<Tarea[]> {
    return collectionData(
      query(
        this.tareasRef,
        where('creadoPor', '==', this.auth.auth.currentUser?.uid ?? ''),
        orderBy('fecha', 'asc')
      ),
      { idField: 'id' }
    ) as Observable<Tarea[]>;
  }


  // Editar tarea
  editarTarea(id: string, cambios: Partial<Tarea>) {
    const ref = doc(this.firestore, `tareas/${id}`);
    return updateDoc(ref, cambios);
  }

  // Eliminar tarea
  eliminarTarea(id: string) {
    const ref = doc(this.firestore, `tareas/${id}`);
    return deleteDoc(ref);
  }
// Obtener una tarea por ID
  obtenerTareaPorId(id: string) {
    const ref = doc(this.firestore, `tareas/${id}`);
    return docData(ref, { idField: 'id' }) as any;
  }


}
