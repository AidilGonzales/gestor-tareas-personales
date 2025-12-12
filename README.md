# Gestor de Tareas Personales  
**Autora:** Gonzales Medina, Aidil Patricia  
**Código Universitario:** 1008320231  
**Universidad:** José María Arguedas  
**Escuela Profesional:** Ingeniería de Sistemas  
**Ciclo:** VI Ciclo  

---

## Descripción del Proyecto

**Gestor de Tareas Personales** es una aplicación web desarrollada en **Angular** que permite a los usuarios gestionar sus actividades diarias.  
El sistema permite crear, editar, eliminar y visualizar tareas, además de aplicar filtros y búsquedas relevantes.  
Toda la información se almacena en tiempo real mediante **Firebase Firestore**, con acceso restringido a usuarios autenticados mediante **Firebase Authentication**.

Este proyecto se desarrolla como parte del **Trabajo Final** del curso *Programación Web con Angular*.

---

## Objetivo General

Construir una aplicación web funcional que implemente operaciones **CRUD**, autenticación, manejo de datos en tiempo real y buenas prácticas de desarrollo con Angular.

---

## Objetivos Específicos

- Implementar un sistema de autenticación seguro con **Firebase Authentication**.  
- Desarrollar operaciones CRUD completas para tareas.  
- Implementar la gestión de categorías personalizadas por usuario.  
- Desarrollar estadísticas de tareas (completadas, pendientes, totales).  
- Mantener datos sincronizados en tiempo real usando **Firestore**.  
- Aplicar buenas prácticas de organización en Angular: servicios, guards, rutas y componentes standalone.  

---

## Requerimientos Funcionales

- Implementar autenticación de usuarios con **Firebase Authentication**.
- Crear una colección principal en **Firestore** para almacenar tareas personales.
- Permitir crear, editar y eliminar tareas asociadas al usuario autenticado.
- Agregar validaciones de formularios para campos obligatorios y formatos correctos.
- Permitir **filtrar y buscar** registros por criterios relevantes (nombre, fecha o categoría).
- Mostrar el listado de tareas **ordenado y actualizado en tiempo real** desde Firestore.
- Crear una vista de **estadísticas o resumen general** con totales, promedios o estados principales.

---

## 🛠 Tecnologías y Herramientas Utilizadas

- Angular 17+  
- TypeScript  
- Firebase Authentication  
- Firebase Firestore  
- AngularFire  
- SCSS  
- Node.js  
- Git y GitHub  
- Visual Studio Code  

---

## Requisitos para Instalar y Ejecutar el Proyecto

### 1. Clonar el repositorio

git clone https://github.com/AidilGonzales/gestor-tareas-personales.git
cd gestor-tareas-personales

### 2. Instalar dependencias

Copiar código:

npm install

### 3. Ejecutar el servidor de desarrollo

Copiar código:

ng serve -o

Abrira en el navegador: http://localhost:4200/

---

## Arquitectura del Proyecto 


src/

 └── app/

      ├── auth/

      │    ├── login/

      │    └── register/

      ├── core/

      │    ├── guards/

      │    ├── models/

      │    └── services/

      ├── pages/

      │    ├── tareas/

      │    │     ├── lista/

      │    │     ├── detalle/

      │    │     └── formulario/

      │    ├── categorias/

      │    └── estadisticas/

      ├── shared/

      │    └── components/

      │           └── navbar/

      ├── app.routes.ts

      ├── app.html

      ├── app.ts

      ├── app.scss

 └── assets/
 


Incluye:  
✔ Componentes standalone  
✔ Servicios centralizados  
✔ Guards  
✔ Firebase modular  
✔ SCSS por página  

---

## URL de Firebase Hosting 
Este es el enlace del deploy : https://gestor-tareas-personales.web.app


---

## Video Explicativo (5–8 minutos) 

Video: https://drive.google.com/drive/folders/1iJSgoIFdO07MircL2pITBsth2oCo8ecl?usp=drive_link


---

## Manual de Usuario 

El manual completo : https://drive.google.com/drive/folders/1t3p2VkzMLbjpnxnOAGA9h5GvSv7CH8Z1?usp=drive_link

## Docente:
Iván Soria Solis