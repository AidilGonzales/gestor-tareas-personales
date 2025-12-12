import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { AuthService } from './auth';
import { Tarea } from '../models/tarea.model';
import { Observable, of, switchMap, map } from 'rxjs';
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
    return this.auth.user$.pipe(
      switchMap((usuario) => {
        console.log("👤 Usuario detectado en TareasService:", usuario);

        if (!usuario) return of([]); // usuario no logueado -> lista vacía

        const ref = query(
          this.tareasRef,
          where('creadoPor', '==', usuario.uid)
        );

        // collectionData devuelve datos en tiempo real
        return collectionData(ref, { idField: 'id' }).pipe(
          // asegurar que tenemos un array y ordenar por fecha protegiendo valores nulos
          map((tareas: any[]) => {
            return (tareas || []).slice().sort((a, b) => {
              const fa = (a?.fecha ?? '') + ''; // forzar string
              const fb = (b?.fecha ?? '') + '';
              return fa.localeCompare(fb);
            }) as Tarea[];
          })
        ) as Observable<Tarea[]>;
      })
    );
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
