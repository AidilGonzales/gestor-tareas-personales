export interface Tarea {
  id?: string;         // Firestore asigna ID
  titulo: string;
  descripcion: string;
  categoriaId: string;
  fecha: string;       // formato YYYY-MM-DD
  completada: boolean;
  creadoPor: string;   // uid del usuario
}
