# Screen Match - Full Stack

Una aplicación **full stack completa** para descubrir, buscar y gestionar series de televisión. Combinando un **backend robusto en Spring Boot** con un **frontend moderno en HTML/CSS/JavaScript**, Screen Match ofrece una experiencia integral para los amantes de las series.

> **Proyecto Full Stack**: Backend + Frontend en un único repositorio

---

## 📋 Tabla de Contenidos

- [Galería Visual](#galería-visual)
- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Características Principales](#características-principales)
- [Instalación y Configuración](#instalación-y-configuración)
- [Variables de Entorno](#variables-de-entorno)
- [Guía de Uso](#guía-de-uso)
- [API Endpoints](#api-endpoints)
- [Desarrollo](#desarrollo)
- [Contribuciones](#contribuciones)

---

## 🖼️ Galería Visual

Aquí puedes ver el funcionamiento de Screen Match:

### Página Principal
<img width="1896" height="948" alt="image" src="https://github.com/user-attachments/assets/321e6f95-d159-4f10-917c-9311b917b224" />

*Interfaz principal con buscador y galería de series*

### Ordenamiento por categoría
<img width="1916" height="855" alt="image" src="https://github.com/user-attachments/assets/511880a2-38b7-443b-b699-b2ae1e149e2f" />

*Ordena series por su categoría*

### Detalles de Serie
<img width="1900" height="945" alt="image" src="https://github.com/user-attachments/assets/222ad56e-c9db-41e9-a469-eca4be0f34d8" />

*Información completa con temporadas y episodios*

### TOP 5 EPISODIO VALUADOS
<img width="1898" height="946" alt="image" src="https://github.com/user-attachments/assets/12062454-feb4-4681-a8b3-6daaff680afe" />

*Ordena los episodios mejor valuados de cada serie*

---

## 📋 Tabla de Contenidos

- [Galería Visual](#galería-visual)
- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Stack Tecnológico](#stack-tecnológico)
- [Características Principales](#características-principales)
- [Instalación y Configuración](#instalación-y-configuración)
- [Variables de Entorno](#variables-de-entorno)
- [Guía de Uso](#guía-de-uso)
- [API Endpoints](#api-endpoints)
- [Desarrollo](#desarrollo)
- [Contribuciones](#contribuciones)

---

## 📱 Descripción General

Screen Match es un proyecto de demostración de un **aplicación web full stack** que permite a los usuarios:

- **Buscar series** de televisión en tiempo real
- **Ver información detallada** incluyendo temporadas y episodios
- **Gestionar favoritos** guardados en una base de datos
- **Obtener traducciones automáticas** de descripciones
- **Disfrutar de una interfaz responsiva** en cualquier dispositivo

---

## 📁 Estructura del Proyecto

```
ScreenMatchV3/                     # Carpeta Raíz del Proyecto
│
├── README.md                      # Este archivo
├── .gitignore                     # Configuración de git
│
├── ScreenMatchV2/                 # Backend (Spring Boot)
│   ├── pom.xml
│   ├── .env.example               # Template de variables de entorno
│   ├── create_database.sql        # Script de BD
│   ├── README.md                  # Documentación específica backend
│   └── src/
│       ├── main/
│       │   ├── java/              # Código Java
│       │   │   └── com/aluracursos/screenmatch/
│       │   │       ├── controller/
│       │   │       ├── service/
│       │   │       ├── model/
│       │   │       ├── repository/
│       │   │       └── ...
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│
└── FrontEndScreenMatch/           # Frontend (HTML/CSS/JS)
    ├── .gitignore
    ├── index.html
    ├── detalles.html
    ├── styles.css
    ├── css/
    │   ├── home.css
    │   └── detalhes.css
    └── scripts/
        ├── index.js
        ├── series.js
        └── getDatos.js
```

---

## 🛠️ Stack Tecnológico

### Backend
| Componente | Tecnología |
|-----------|-----------|
| **Framework** | Spring Boot 3.x |
| **Lenguaje** | Java 17+ |
| **Base de Datos** | PostgreSQL |
| **ORM** | Hibernate / JPA |
| **APIs Externas** | OMDB API, Google Gemini |
| **Build Tool** | Maven |
| **CORS** | Spring Web Config |

### Frontend
| Componente | Tecnología |
|-----------|-----------|
| **HTML** | HTML5 Semántico |
| **CSS** | CSS3 + Responsive Design |
| **JavaScript** | Vanilla JS (sin frameworks) |
| **API Communication** | Fetch API |
| **Storage** | LocalStorage |

---

## ✨ Características Principales

### 🎬 Búsqueda de Series
- Busca en tiempo real usando OMDB API
- Resultados instantáneos mientras escribes
- Información completa de series

### 📺 Detalles Completos
- Sinopsis y género
- Calificaciones y votos
- Información de temporadas
- Lista de episodios con detalles

### 💾 Gestión de Favoritos
- Guarda series en base de datos
- Acceso persistente a tus favoritos
- Gestión desde la interfaz

### 🌐 Traducción Automática
- Traduce descripciones automáticamente
- Usa Google Gemini AI
- Disponible en detalles

### 📱 Interfaz Responsiva
- Funciona en desktop, tablet y móvil
- Diseño moderno y limpio
- Experiencia de usuario intuitiva

---

## 🚀 Instalación y Configuración

### Requisitos Previos

```bash
- Java 17 o superior
- Maven 3.8+
- PostgreSQL 12+
- Git
- Navegador moderno
```

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/screenmatch.git
cd ScreenMatchV3
```

### Paso 2: Configurar Base de Datos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Ejecutar el script SQL
\i ScreenMatchV2/create_database.sql

# Salir
\q
```

### Paso 3: Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp ScreenMatchV2/.env.example .env

# Editar .env con tus credenciales
# Ver sección de Variables de Entorno más abajo
```

### Paso 4: Iniciar Backend

```bash
cd ScreenMatchV2

# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### Paso 5: Iniciar Frontend

En otra terminal:

```bash
cd FrontEndScreenMatch

# Opción A: Servidor Python
python -m http.server 3000

# Opción B: Live Server (VS Code)
# Click derecho en index.html > Open with Live Server
```

Frontend disponible en: `http://localhost:3000`

---

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz con:

```env
# ========== DATABASE ==========
DB_HOST=localhost:5432
DB_NAME=screenmatch
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# ========== EXTERNAL APIs ==========
# OMDB API - https://www.omdbapi.com/apikey.aspx
OMDB_API_KEY=tu_clave_omdb

# Google Gemini API - https://ai.google.dev/
GEMINI_API_KEY=tu_clave_gemini

# ========== APPLICATION ==========
SERVER_PORT=8080
SPRING_PROFILE=development
```

### Configurar en tu Sistema Operativo

**Windows (PowerShell):**
```powershell
$env:DB_HOST="localhost:5432"
$env:DB_NAME="screenmatch"
$env:DB_USER="postgres"
$env:DB_PASSWORD="tu_contraseña"
$env:OMDB_API_KEY="tu_clave"
$env:GEMINI_API_KEY="tu_clave"
```

**Linux/Mac:**
```bash
export DB_HOST=localhost:5432
export DB_NAME=screenmatch
export DB_USER=postgres
export DB_PASSWORD=tu_contraseña
export OMDB_API_KEY=tu_clave
export GEMINI_API_KEY=tu_clave
```

---

## 📖 Guía de Uso

### Flujo de Uso Principal

```
1. Inicia Backend (localhost:8080)
        ↓
2. Inicia Frontend (localhost:3000)
        ↓
3. Abre en navegador
        ↓
4. Busca una serie por nombre
        ↓
5. Visualiza resultados en grid
        ↓
6. Haz click para ver detalles
        ↓
7. Explora temporadas y episodios
        ↓
8. Guarda favoritos en base de datos
```

### Funciones Principales

**Página Principal (index.html)**
- Buscador de series
- Grid de resultados
- Visualización de pósters
- Información resumida

**Página de Detalles (detalles.html)**
- Información completa
- Temporadas expandibles
- Episodios por temporada
- Opciones de guardado

---

## 🔌 API Endpoints

El frontend se comunica con el backend mediante estos endpoints:

### Búsqueda
```
GET /api/series/buscar?nombre=Nombre
Response: { titulo, sinopsis, genero, votos, ... }
```

### Obtener Series Guardadas
```
GET /api/series
Response: [ { id, titulo, genero, ... }, ... ]
```

### Obtener Detalles
```
GET /api/series/{id}
Response: { id, titulo, temporadas: [...], episodios: [...] }
```

### Guardar Serie
```
POST /api/series
Body: { titulo, genero, votoPromedio }
Response: { id, titulo, ... }
```

### Obtener Episodios
```
GET /api/series/{id}/episodios
Response: [ { numero, temporada, nombre, ... }, ... ]
```

---

## ‍💻 Desarrollo

### Estructura de Carpetas Detallada

**Backend - Paquetes Java:**
```
com.aluracursos.screenmatch
├── controller/          # Controladores REST
│   └── SerieController.java
├── service/            # Lógica de negocio
│   ├── ConsumoAPI.java
│   ├── ConsultaGemini.java
│   └── ConvierteDatos.java
├── model/             # Entidades JPA
│   ├── Serie.java
│   ├── Episodio.java
│   ├── Categoria.java
│   └── ...
├── dto/              # Data Transfer Objects
│   ├── SerieDTO.java
│   └── EpisodioDTO.java
├── repository/       # Acceso a datos
│   └── SerieRepository.java
├── config/           # Configuración
│   └── CorsConfiguration.java
└── principal/        # Lógica principal
    └── Principal.java
```

**Frontend - Estructura:**
```
FrontEndScreenMatch
├── index.html         # Página principal
├── detalles.html      # Página de detalles
├── styles.css         # Estilos globales
├── css/
│   ├── home.css       # Estilos específicos home
│   └── detalhes.css   # Estilos específicos detalles
└── scripts/
    ├── index.js       # Lógica principal
    ├── series.js      # Gestión de series
    └── getDatos.js    # Consumo de API
```

### Mejores Prácticas

#### Backend
- ✅ Usar DTOs para transferencia de datos
- ✅ Separar lógica en servicios
- ✅ Usar repository pattern
- ✅ Validar entrada de usuarios
- ✅ Manejar excepciones apropiadamente

#### Frontend
- ✅ Usar async/await con Fetch API
- ✅ Validar datos antes de enviar
- ✅ Manejar errores de red
- ✅ Componentes reutilizables
- ✅ CSS modular y escalable

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/MiFeature`)
3. Commit tus cambios (`git commit -m 'Add MiFeature'`)
4. Push a la rama (`git push origin feature/MiFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para detalles.

---

## 🙏 Agradecimientos

- Alura Cursos - Base del proyecto
- OMDB API - Información de series
- Google Gemini - Traducciones automáticas
- Comunidad de desarrolladores

---

## 📚 Documentación Adicional

- [Backend Details](./ScreenMatchV2/README.md) - Documentación específica del backend
- [Frontend Details](./FrontEndScreenMatch/) - Archivos y estructura del frontend

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2025  
**Status**: En Desarrollo ✅

---

## 🚀 Roadmap

- [ ] Autenticación de usuarios
- [ ] Sistema de comentarios
- [ ] Valoraciones personalizadas
- [ ] Recomendaciones basadas en IA
- [ ] Modo oscuro
- [ ] Notificaciones de nuevas temporadas
- [ ] Integración con redes sociales

