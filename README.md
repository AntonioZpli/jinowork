# Jinowork

> Plataforma web de búsqueda y gestión de oportunidades laborales.

Jinowork es una plataforma orientada a conectar **candidatos y empresas**, facilitando la búsqueda de oportunidades laborales, publicación de ofertas, gestión de perfiles y recomendaciones basadas en compatibilidad profesional.

Actualmente el proyecto se encuentra en una etapa de **frontend funcional**, utilizando datos locales y persistencia en el navegador como base para el desarrollo de la plataforma.

---

https://pin.it/3KojQ8ULD

---

## Características

### Candidatos

- Creación y edición de perfil profesional.
- Información de experiencia laboral.
- Formación académica.
- Habilidades y especializaciones.
- Preferencias laborales.
- Búsqueda y filtrado de ofertas.
- Visualización detallada de ofertas.
- Postulación a ofertas.
- Seguimiento de postulaciones.
- Cálculo de compatibilidad con ofertas laborales.
- Indicador de completitud del perfil.

### Empresas

- Creación y edición de perfil empresarial.
- Publicación de ofertas laborales.
- Gestión de ofertas.
- Visualización de candidatos.
- Gestión de postulaciones recibidas.
- Información sobre requisitos y condiciones de las ofertas.

---

## Sistema de compatibilidad

Jinowork incorpora un sistema de **matching** entre perfiles profesionales y ofertas laborales.

El sistema compara diferentes características del candidato con los requisitos de una oferta:

```text
                    PERFIL DEL CANDIDATO
                            │
             ┌──────────────┼──────────────┐
             │              │              │
        Experiencia      Educación     Especialización
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                    SISTEMA DE MATCHING
                            │
                            ▼
                    OFERTA LABORAL
                            │
                            ▼
                  NIVEL DE COMPATIBILIDAD
```

Entre los criterios considerados se encuentran:

- Área profesional.
- Especialización.
- Experiencia.
- Educación.
- Habilidades.
- Ubicación.
- Modalidad de trabajo.
- Tipo de contrato.
- Nivel de experiencia.

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| Vue 3 | Framework principal |
| TypeScript | Tipado y desarrollo |
| Vite | Herramienta de desarrollo y build |
| Pinia | Gestión del estado |
| Vue Router | Navegación y control de acceso |
| Tailwind CSS | Estilos e interfaz |
| pnpm | Gestión de paquetes |

---

## Arquitectura

El proyecto utiliza una arquitectura frontend organizada por responsabilidades:

```text
┌─────────────────────────────┐
│            Views            │
│      Páginas de Vue         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         Composables         │
│      Lógica reutilizable    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        Pinia Stores         │
│       Estado global         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Models / Local Data    │
│   Datos y lógica de dominio │
└─────────────────────────────┘
```

Esta separación permite mantener la interfaz, la lógica de negocio y el estado de la aplicación relativamente desacoplados.

---

## Estructura del proyecto

```text
jinowork/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── data/
│   ├── models/
│   ├── router/
│   ├── stores/
│   ├── views/
│   ├── App.vue
│   └── main.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Instalación

### Requisitos

- Node.js
- pnpm
- Git

### Clonar el repositorio

```bash
git clone https://github.com/AntonioZpli/jinowork.git
cd jinowork
```

### Instalar dependencias

```bash
pnpm install
```

### Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en la dirección indicada por Vite, normalmente:

```text
http://localhost:5173
```

### Crear build de producción

```bash
pnpm build
```

### Previsualizar el build

```bash
pnpm preview
```

---

## Flujo de usuario

### Candidato

```text
Registro / Inicio de sesión
            │
            ▼
      Perfil profesional
            │
            ├── Experiencia
            ├── Educación
            ├── Habilidades
            └── Preferencias
            │
            ▼
      Buscar ofertas
            │
            ▼
    Revisar compatibilidad
            │
            ▼
        Postularse
            │
            ▼
  Seguimiento de postulación
```

### Empresa

```text
Registro / Inicio de sesión
            │
            ▼
      Perfil empresarial
            │
            ▼
     Crear oferta laboral
            │
            ▼
       Publicar oferta
            │
            ▼
     Recibir postulaciones
            │
            ▼
       Revisar candidatos
```

---

## Modelo de dominio

Las principales entidades utilizadas actualmente son:

```text
                    User
                     │
          ┌──────────┴──────────┐
          │                     │
      Candidate              Company
          │                     │
    ┌─────┼─────┐               │
    │     │     │               │
Experience Education Skills     Jobs
    │                         │
    └──────────┐              │
               │              │
               ▼              ▼
            Profile      JobApplication
               │              │
               └──────┬───────┘
                      │
                      ▼
                   Matching
```

---

## Clasificación profesional

Jinowork utiliza una estructura jerárquica para organizar los perfiles y ofertas:

```text
Área profesional
      │
      ├── Especialización
      │       │
      │       └── Habilidades
      │
      └── Ofertas relacionadas
```

También se contemplan diferentes categorías para estructurar las oportunidades laborales:

- Áreas profesionales.
- Especializaciones.
- Habilidades.
- Departamentos.
- Municipios.
- Modalidades de trabajo.
- Tipos de contrato.
- Niveles de experiencia.
- Niveles educativos.
- Categorías laborales.

Esta estructura permite realizar búsquedas y comparaciones más específicas que una clasificación basada únicamente en palabras clave.

---

## Búsqueda y filtros

Las ofertas pueden filtrarse utilizando diferentes criterios:

- Texto.
- Modalidad.
- Experiencia.
- Categoría.
- Área profesional.
- Especialización.
- Tipo de contrato.
- Ubicación.
- Educación.

Esto permite reducir el conjunto de ofertas disponibles y encontrar oportunidades más relevantes para cada perfil.

---

## Autenticación y autorización

Actualmente la autenticación funciona principalmente como parte del frontend y utiliza almacenamiento local del navegador.

La aplicación diferencia los principales tipos de usuario:

```text
                    Usuario
                       │
              ┌────────┴────────┐
              │                 │
           Candidate          Company
              │                 │
        Candidate Routes    Company Routes
```

El sistema utiliza guards de Vue Router para controlar el acceso a determinadas rutas.

> La autenticación y autorización actuales son adecuadas para el prototipo, pero deberán trasladarse al backend antes de utilizar el sistema en producción.

---

## Persistencia actual

En la versión actual, los datos se manejan principalmente mediante:

- Estado de Pinia.
- Datos locales.
- Datos iniciales/seed.
- `localStorage`.

Esto permite desarrollar y probar la aplicación sin depender todavía de un servidor externo.

Actualmente **no existe un backend de producción, API REST ni base de datos remota**.

---

## Feedback de la interfaz

La aplicación incorpora mecanismos de feedback para mantener al usuario informado sobre las acciones realizadas.

Entre ellos:

- Notificaciones.
- Confirmaciones.
- Mensajes de error.
- Mensajes de éxito.
- Confirmaciones antes de acciones importantes.
- Validaciones de formularios.
- Advertencias ante cambios potencialmente destructivos.

Por ejemplo, algunas operaciones sobre perfiles requieren confirmación antes de eliminar información o realizar cambios que puedan afectar otras partes del perfil.

---

## Estado actual

Jinowork se encuentra actualmente en una etapa de **prototipo frontend funcional**.

### Implementado

- [x] Interfaz principal.
- [x] Navegación.
- [x] Perfiles de candidatos.
- [x] Perfiles de empresas.
- [x] Ofertas laborales.
- [x] Postulaciones.
- [x] Búsqueda y filtros.
- [x] Matching candidato-oferta.
- [x] Clasificación profesional.
- [x] Gestión de estado con Pinia.
- [x] Persistencia local.
- [x] Validaciones.
- [x] Sistema de feedback.
- [x] Control de acceso mediante Vue Router.

### Pendiente

- [ ] Backend.
- [ ] API REST.
- [ ] Base de datos.
- [ ] Autenticación real.
- [ ] Autorización del lado del servidor.
- [ ] Persistencia remota.
- [ ] Validaciones del lado del servidor.
- [ ] Gestión segura de sesiones.
- [ ] Despliegue de producción.

---

## Roadmap

```text
Frontend
   │
   ├── Diseño de interfaz              ✓
   ├── Componentes                     ✓
   ├── Navegación                      ✓
   ├── Perfiles                        ✓
   ├── Ofertas                         ✓
   ├── Postulaciones                   ✓
   ├── Búsqueda                        ✓
   └── Matching                        ✓
   
Backend
   │
   ├── API REST                        ○
   ├── Base de datos                   ○
   ├── Autenticación                   ○
   ├── Autorización                    ○
   ├── Persistencia                    ○
   └── Despliegue                      ○
```

## Licencia

Proyecto actualmente en desarrollo y destinado a fines académicos/prototipo...

---

## Autores

**Eythan, Diego y yo**

Proyecto: **Jinowork**

GitHub: [AntonioZpli/jinowork](https://github.com/AntonioZpli/jinowork?utm_source=chatgpt.com)