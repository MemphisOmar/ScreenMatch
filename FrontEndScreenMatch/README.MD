# Frontend - Screen Match

Documentación técnica detallada del frontend. Para información general y visual del proyecto, ver [README principal](../README.md).

---

## 📋 Tabla de Contenidos

- [Inicio Rápido](#inicio-rápido)
- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Cómo Ejecutar](#cómo-ejecutar)
- [Consumo de API](#consumo-de-api)
- [Flujo de la Aplicación](#flujo-de-la-aplicación)
- [Desarrollo](#desarrollo)
- [Responsividad](#responsividad)

---

## ⚡ Inicio Rápido

```bash
cd FrontEndScreenMatch

# Opción 1: Python
python -m http.server 3000

# Opción 2: VS Code Live Server
# Click derecho en index.html → Open with Live Server
```

Frontend disponible en: `http://localhost:3000`

---

## 📦 Requisitos

- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **Backend ejecutándose** en `http://localhost:8080`
- **Python 3+** (para servidor) O **Live Server extension**

---

## 📂 Estructura del Proyecto

```
FrontEndScreenMatch/
├── index.html                      # Página principal (buscador)
├── detalles.html                   # Página de detalles (serie)
├── styles.css                      # Estilos globales
├── teste.js                        # Archivo de pruebas
├── .gitignore
│
├── css/
│   ├── home.css                    # Estilos página principal
│   ├── detalhes.css                # Estilos página detalles
│   └── responsive.css              # [Opcional] Estilos mobile
│
├── img/
│   └── logo.png                    # Logo del proyecto
│
└── scripts/
    ├── index.js                    # Lógica principal
    ├── series.js                   # Gestión de series
    └── getDatos.js                 # Consumo de API REST
```

---

## 🚀 Cómo Ejecutar

### Opción 1: Servidor Python

```bash
cd FrontEndScreenMatch
python -m http.server 3000
```

Accede a: `http://localhost:3000`

### Opción 2: Live Server en VS Code

1. Instala la extensión "Live Server" de Ritwick Dey
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 3: http-server de Node.js

```bash
npm install -g http-server
cd FrontEndScreenMatch
http-server -p 3000
```

### Opción 4: Cualquier editor con servidor local

- **WebStorm**: Botón Play en la barra de herramientas
- **Sublime Text**: Con Live Server plugin
- **Atom**: Con Live Server package

---

## 🔌 Consumo de API

### Archivo: `scripts/getDatos.js`

Contiene todas las funciones para comunicarse con el backend.

### Búsqueda de Series

```javascript
// GET /api/series/buscar?nombre=Breaking+Bad
async function buscarSeries(nombreSerie) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/series/buscar?nombre=${nombreSerie}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Obtener Todas las Series

```javascript
// GET /api/series
async function obtenerSeries() {
  try {
    const response = await fetch('http://localhost:8080/api/series');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Obtener Detalles de una Serie

```javascript
// GET /api/series/{id}
async function obtenerDetalles(id) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/series/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Guardar una Serie

```javascript
// POST /api/series
async function guardarSerie(serie) {
  try {
    const response = await fetch(
      'http://localhost:8080/api/series',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serie)
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📊 Flujo de la Aplicación

```
Usuario abre index.html
        ↓
Carga inicial de estilos (styles.css, home.css)
        ↓
Carga de scripts (index.js, getDatos.js, series.js)
        ↓
Usuario ingresa nombre en buscador
        ↓
Event listener dispara buscarSeries()
        ↓
Fetch API llama a /api/series/buscar
        ↓
Backend retorna datos JSON
        ↓
JavaScript renderiza resultados en el DOM
        ↓
Usuario ve grid de series con pósters
        ↓
Usuario hace click en una serie
        ↓
Navega a detalles.html?id={id}
        ↓
Se cargan detalles.html y detalhes.css
        ↓
JavaScript obtiene datos de /api/series/{id}
        ↓
Se renderizan temporadas y episodios
```

---

## 💻 Desarrollo

### Estructura de Archivos HTML

**index.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Screen Match</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="css/home.css">
</head>
<body>
  <!-- Contenido aquí -->
  
  <script src="scripts/getDatos.js"></script>
  <script src="scripts/series.js"></script>
  <script src="scripts/index.js"></script>
</body>
</html>
```

### Manipulación del DOM

```javascript
// Crear elementos
const elemento = document.createElement('div');
elemento.innerHTML = `<h1>${titulo}</h1>`;

// Insertar en el DOM
const contenedor = document.getElementById('resultados');
contenedor.appendChild(elemento);

// Event listeners
document.getElementById('buscar').addEventListener('click', buscar);
```

### LocalStorage (Opcional)

```javascript
// Guardar favoritos localmente
localStorage.setItem('favoritos', JSON.stringify(favoritos));

// Recuperar favoritos
const favoritos = JSON.parse(localStorage.getItem('favoritos'));
```

---

## 📱 Responsividad

### Breakpoints Principales

```css
/* Móviles pequeños: 320px - 480px */
@media (max-width: 480px) {
  /* Estilos para móviles pequeños */
}

/* Tablets: 481px - 768px */
@media (max-width: 768px) {
  /* Estilos para tablets */
}

/* Desktops: 769px+ */
@media (min-width: 769px) {
  /* Estilos para desktops */
}
```

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 🎨 Estilos

### Archivo: `styles.css`
Contiene estilos globales para toda la aplicación.

### Archivo: `css/home.css`
Estilos específicos de la página principal (index.html).

### Archivo: `css/detalhes.css`
Estilos específicos de la página de detalles (detalles.html).

### Colores Recomendados

```css
:root {
  --color-primario: #ff6b6b;
  --color-secundario: #4ecdc4;
  --color-fondo: #f7f7f7;
  --color-texto: #333;
  --color-borde: #ddd;
}
```

---

## 🔍 Debugging

### Abre DevTools del Navegador

**Windows/Linux:** `F12`  
**Mac:** `Cmd + Option + I`

### Pestaña Console
Ver errores y mensajes de log:
```javascript
console.log('Debug:', variable);
console.error('Error:', error);
console.warn('Advertencia:', warning);
```

### Pestaña Network
Ver peticiones HTTP:
- Método HTTP (GET, POST, etc)
- Status (200, 404, 500, etc)
- Response del servidor
- Tiempo de respuesta

### Pestaña Elements/Inspector
Inspeccionar elementos HTML y CSS en tiempo real.

---

## 📌 Notas Importantes

⚠️ **Backend Requerido**: El backend debe estar ejecutándose en `http://localhost:8080`

⚠️ **CORS Habilitado**: El backend debe tener CORS configurado para `localhost:3000`

⚠️ **Async/Await**: Todos los fetch son asincronos, maneja correctamente

✅ **Sin Frameworks**: Código vanilla JavaScript puro

✅ **Responsive**: Funciona en todos los tamaños de pantalla

---

## 🛠️ Mejores Prácticas

✅ Usar `const` y `let` en lugar de `var`  
✅ Nombres descriptivos para variables y funciones  
✅ Comentar código complejo  
✅ Validar entrada de usuarios  
✅ Manejar errores con try-catch  
✅ Usar async/await para operaciones asincronas  
✅ Mobile-first en CSS  
✅ Código limpio y formateado  

---

## 🔗 Enlaces Útiles

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [MDN Web Docs - CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [MDN Web Docs - HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Versión**: 1.0.0  
**Tecnologías**: HTML5, CSS3, JavaScript Vanilla

---

[← Volver al proyecto principal](../README.md)
