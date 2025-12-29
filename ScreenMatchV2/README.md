# Backend - Screen Match (Spring Boot)

Documentación técnica detallada del backend. Para información general y visual del proyecto, ver [README principal](../README.md).

---

## 📋 Tabla de Contenidos

- [Inicio Rápido](#inicio-rápido)
- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [Variables de Entorno](#variables-de-entorno)
- [APIs Externas](#apis-externas)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Endpoints REST](#endpoints-rest)
- [Testing](#testing)

---

## ⚡ Inicio Rápido

```bash
cd ScreenMatchV2

# 1. Compilar proyecto
mvn clean install

# 2. Ejecutar
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

---

## 📦 Requisitos

- **Java 17** o superior
- **Maven 3.8+**
- **PostgreSQL 12+**
- **Git**

---

## 📂 Estructura del Proyecto

```
ScreenMatchV2/
├── src/
│   ├── main/
│   │   ├── java/com/aluracursos/screenmatch/
│   │   │   ├── ScreenmatchApplication.java         # Clase principal
│   │   │   ├── ScreenmatchApplicationConsola.java  # Versión CLI
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   └── SerieController.java            # Endpoints REST
│   │   │   │
│   │   │   ├── service/
│   │   │   │   ├── ConsumoAPI.java                 # Consumo OMDB
│   │   │   │   ├── ConsultaGemini.java             # Traducciones AI
│   │   │   │   ├── ConsultaChatGPT.java            # Integración ChatGPT
│   │   │   │   ├── ConvierteDatos.java             # Mapeo JSON
│   │   │   │   ├── IConvierteDatos.java            # Interfaz
│   │   │   │   └── SerieService.java               # Lógica de negocio
│   │   │   │
│   │   │   ├── model/
│   │   │   │   ├── Serie.java                      # Entidad @Entity
│   │   │   │   ├── Episodio.java                   # Entidad @Entity
│   │   │   │   ├── Categoria.java                  # Enum
│   │   │   │   ├── DatosSerie.java                 # DTO OMDB
│   │   │   │   ├── DatosEpisodio.java              # DTO Episodios
│   │   │   │   └── DatosTemporadas.java            # DTO Temporadas
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   ├── SerieDTO.java                   # Transfer Object
│   │   │   │   └── EpisodioDTO.java                # Transfer Object
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   └── SerieRepository.java            # JPA Repository
│   │   │   │
│   │   │   ├── config/
│   │   │   │   └── CorsConfiguration.java          # Config CORS
│   │   │   │
│   │   │   └── principal/
│   │   │       └── Principal.java                  # Lógica principal CLI
│   │   │
│   │   └── resources/
│   │       └── application.properties              # Configuración
│   │
│   └── test/
│       └── java/ScreenmatchApplicationTests.java   # Tests
│
├── pom.xml                                         # Dependencias Maven
├── mvnw                                            # Maven Wrapper Linux
├── mvnw.cmd                                        # Maven Wrapper Windows
├── create_database.sql                             # Script BD
└── README.md                                       # Este archivo
```

---

## 💾 Base de Datos

### Crear la Base de Datos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Ejecutar script
\i ScreenMatchV2/create_database.sql

# Verificar tablas
\dt

# Salir
\q
```

### Tablas Principales

| Tabla | Descripción |
|-------|-----------|
| `series` | Información de las series |
| `episodios` | Episodios de cada serie |
| `categorias` | Categorías/Géneros |

### Configuración en `application.properties`

```properties
# Datasource
spring.datasource.url=jdbc:postgresql://${DB_HOST}/${DB_NAME}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.format-sql=true
```

---

## 🔐 Variables de Entorno

Copia el archivo `.env.example` a `.env` en la **carpeta raíz** del proyecto:

```bash
cp .env.example .env
```

Configura las siguientes variables:

```env
# ===== DATABASE =====
DB_HOST=localhost:5432
DB_NAME=screenmatch
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# ===== EXTERNAL APIs =====
OMDB_API_KEY=tu_clave_omdb_aqui
GEMINI_API_KEY=tu_clave_gemini_aqui

# ===== APPLICATION =====
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

## 🌐 APIs Externas

### OMDB API

```
URL: https://www.omdbapi.com/?t=
Método: GET
```

**Variables de entorno:**
- `OMDB_API_KEY`: Tu clave de API

**Uso:** Búsqueda de series y obtención de información detallada

**Ejemplo:**
```
https://www.omdbapi.com/?t=Breaking+Bad&apikey=TU_CLAVE
```

### Google Gemini API

```
URL: https://generativelanguage.googleapis.com/v1beta/models
Método: POST
```

**Variables de entorno:**
- `GEMINI_API_KEY`: Tu clave de API

**Uso:** Traducción automática de descripciones al español

**Documentación:** https://ai.google.dev/

---

## 🚀 Ejecutar la Aplicación

### Opción 1: Maven en Línea de Comandos

```bash
cd ScreenMatchV2
mvn spring-boot:run
```

### Opción 2: Compilar y Ejecutar JAR

```bash
mvn clean package
java -jar target/screenmatch-0.0.1-SNAPSHOT.jar
```

### Opción 3: Desde tu IDE

**IntelliJ IDEA:**
1. Click derecho en `ScreenmatchApplication.java`
2. Selecciona "Run 'ScreenmatchApplication.main()'"

**Eclipse:**
1. Click derecho en el proyecto
2. "Run As" → "Spring Boot App"

**VS Code:**
1. Instala la extensión "Extension Pack for Java"
2. Click en Run arriba del método main

---

## 📡 Endpoints REST

### Obtener todas las series

```http
GET /api/series
Content-Type: application/json
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "titulo": "Breaking Bad",
    "sinopsis": "...",
    "genero": "Drama",
    "votoPromedio": 9.5
  }
]
```

### Buscar serie por nombre

```http
GET /api/series/buscar?nombre=Breaking+Bad
Content-Type: application/json
```

### Obtener detalles de una serie

```http
GET /api/series/{id}
Content-Type: application/json
```

**Respuesta:**
```json
{
  "id": 1,
  "titulo": "Breaking Bad",
  "sinopsis": "...",
  "temporadas": 5,
  "episodios": [
    {
      "numero": 1,
      "temporada": 1,
      "nombre": "Pilot",
      "descripcion": "..."
    }
  ]
}
```

### Guardar una serie

```http
POST /api/series
Content-Type: application/json

{
  "titulo": "The Office",
  "genero": "Comedy",
  "votoPromedio": 9.0
}
```

### Obtener episodios de una serie

```http
GET /api/series/{id}/episodios
```

---

## 🧪 Testing

### Ejecutar todas las pruebas

```bash
mvn test
```

### Ejecutar prueba específica

```bash
mvn test -Dtest=ScreenmatchApplicationTests
```

### Ver reporte de cobertura

```bash
mvn clean test jacoco:report
# Ver en: target/site/jacoco/index.html
```

---

## 🏗️ Arquitectura y Patrones

### Patrones Utilizados

- **MVC**: Separación en Controller, Service, Repository
- **DTO Pattern**: Transferencia de datos entre capas
- **Repository Pattern**: Abstracción de acceso a datos
- **Dependency Injection**: Inyección de dependencias con Spring

### Flujo de Datos

```
Cliente HTTP
    ↓
SerieController
    ↓
SerieService (Lógica)
    ↓
SerieRepository (JPA)
    ↓
PostgreSQL Database
```

---

## 🔍 Debugging y Logs

### Ver logs en consola

```bash
# Los logs aparecerán automáticamente cuando ejecutes la app
```

### Niveles de log

```properties
# En application.properties
logging.level.root=INFO
logging.level.com.aluracursos.screenmatch=DEBUG
```

### H2 Console (si está habilitada)

```
http://localhost:8080/h2-console
```

---

## 🛠️ Desarrollo

### Agregar Nueva Entidad

1. Crear clase en `model/`
2. Anotar con `@Entity`
3. Crear `Repository` en `repository/`
4. Crear `Controller` en `controller/`

### Agregar Nuevo Endpoint

```java
@RestController
@RequestMapping("/api/mi-recurso")
public class MiController {
    
    @GetMapping
    public ResponseEntity<List<MiDTO>> obtenerTodos() {
        // implementación
    }
}
```

---

## 📌 Notas Importantes

⚠️ **Variables de Entorno**: El `.env` debe estar en la carpeta raíz del proyecto, NO en git

⚠️ **PostgreSQL**: Debe estar corriendo en `localhost:5432`

⚠️ **Puerto 8080**: Asegúrate que no esté en uso

⚠️ **CORS**: Configurado para acepar peticiones desde `http://localhost:3000`

✅ **APIs**: Tanto OMDB como Gemini requieren claves válidas

---

## 🔗 Enlaces Útiles

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [OMDB API Docs](https://www.omdbapi.com/)
- [Google Gemini API Docs](https://ai.google.dev/)

---

**Versión**: 1.0.0  
**Framework**: Spring Boot 3.x  
**Java**: 17+

---

[← Volver al proyecto principal](../README.md)
