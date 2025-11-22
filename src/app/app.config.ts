import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "gestor-tareas-aidil", appId: "1:620061689340:web:7c21beec052a60d922de79", storageBucket: "gestor-tareas-aidil.firebasestorage.app", apiKey: "AIzaSyCqlKU31D8ZNXjPzKhL859YjqzApD9lGyc", authDomain: "gestor-tareas-aidil.firebaseapp.com", messagingSenderId: "620061689340" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
