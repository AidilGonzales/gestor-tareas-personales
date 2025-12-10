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
    provideRouter(routes), 
    provideFirebaseApp(() => 
      initializeApp({
        apiKey: "AIzaSyCYS-3EUcPgyWTtFF9OiElFw4Soehg-4Bk",
        authDomain: "gestor-tareas-personales.firebaseapp.com",
        projectId: "gestor-tareas-personales",
        storageBucket: "gestor-tareas-personales.firebasestorage.app",
        messagingSenderId: "436450442440",
        appId: "1:436450442440:web:1230147386292198f339fd"
       })), 
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
