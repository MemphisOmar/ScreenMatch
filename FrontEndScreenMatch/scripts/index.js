import getdatos from "./getDatos.js";

// Mapea los elementos DOM que desea actualizar
const elementos = {
    top5: document.querySelector('[data-name="top5"] .section__content'),
    lanzamientos: document.querySelector('[data-name="lanzamientos"] .section__content'),
    
    series: document.querySelector('[data-name="series"] .section__content'),
    categoria: document.querySelector('[data-name="categoria"] .section__content'),
    categoriaTitulo: document.querySelector('#categoria-titulo')
};

const categoriaSelect = document.querySelector('[data-categorias]');
const searchInput = document.querySelector('.search-input');
const sectionsParaOcultar = document.querySelectorAll('.section');

// Funcion para crear la lista de peliculas
function crearListaPeliculas(elemento, datos) {
    const ul = document.createElement('ul');
    ul.className = 'lista';
    const listaHTML = datos.map((pelicula) => `
        <li>
            <a href="./detalles.html?id=${pelicula.id}" title="${pelicula.titulo}">
                <img src="${pelicula.poster}" alt="${pelicula.titulo}" loading="lazy">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
    elemento.innerHTML = '';
    elemento.appendChild(ul);
}

// Funcion genérica para tratamiento de errores
function tratarConErrores(mensajeError) {
    console.error(mensajeError);
    const elemento = document.createElement('div');
    elemento.style.cssText = 'padding: 2rem; text-align: center; color: #ff6b6b;';
    elemento.textContent = mensajeError;
    return elemento;
}

// Mostrar todas las secciones normales
function mostrarSeccionesNormales() {
    sectionsParaOcultar.forEach(section => {
        if (section.getAttribute('data-name') !== 'categoria') {
            section.classList.remove('hidden');
        }
    });
    document.querySelector('[data-name="categoria"]').classList.add('hidden');
}

// Ocultar todas las secciones normales y mostrar búsqueda
function ocultarSeccionesNormales() {
    sectionsParaOcultar.forEach(section => {
        if (section.getAttribute('data-name') !== 'categoria') {
            section.classList.add('hidden');
        }
    });
    document.querySelector('[data-name="categoria"]').classList.remove('hidden');
}

// Evento para filtro por categoría
categoriaSelect.addEventListener('change', function () {
    const categoriaSeleccionada = categoriaSelect.value;

    if (categoriaSeleccionada === 'todos') {
        mostrarSeccionesNormales();
        searchInput.value = '';
    } else {
        ocultarSeccionesNormales();
        elementos.categoriaTitulo.textContent = `📂 Resultados en: ${categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)}`;
        
        getdatos(`/series/categoria/${categoriaSeleccionada}`)
            .then(data => {
                if (data && data.length > 0) {
                    crearListaPeliculas(elementos.categoria, data);
                } else {
                    elementos.categoria.innerHTML = '<p style="color: #b0b0b0; text-align: center; padding: 2rem;">No hay series en esta categoría</p>';
                }
            })
            .catch(error => {
                elementos.categoria.appendChild(tratarConErrores("Error al cargar la categoría"));
            });
    }
});

// Evento para búsqueda por texto (si existe un endpoint)
searchInput.addEventListener('input', function debounce(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        mostrarSeccionesNormales();
        return;
    }

    ocultarSeccionesNormales();
    elementos.categoriaTitulo.textContent = `🔍 Buscando: "${searchTerm}"`;

    // Buscar en todas las series cargadas
    Promise.all([
        getdatos('/series/top5'),
        getdatos('/series/lanzamientos'),
        getdatos('/series')
    ]).then(([top5, lanzamientos, todas]) => {
        const allSeries = [...top5, ...lanzamientos, ...todas];
        const resultados = allSeries.filter(serie => 
            serie.titulo.toLowerCase().includes(searchTerm) ||
            (serie.sinopsis && serie.sinopsis.toLowerCase().includes(searchTerm))
        );

        if (resultados.length > 0) {
            crearListaPeliculas(elementos.categoria, resultados);
        } else {
            elementos.categoria.innerHTML = `<p style="color: #b0b0b0; text-align: center; padding: 2rem;">No se encontraron resultados para "${searchTerm}"</p>`;
        }
    }).catch(error => {
        elementos.categoria.appendChild(tratarConErrores("Error al realizar la búsqueda"));
    });
});

// Cargar datos iniciales
function generaSeries() {
    const urls = ['/series/top5', '/series/lanzamientos', '/series'];

    Promise.all(urls.map(url => getdatos(url)))
        .then(data => {
            crearListaPeliculas(elementos.top5, data[0]);
            crearListaPeliculas(elementos.lanzamientos, data[1]);
            crearListaPeliculas(elementos.series, data[2].slice(0, 5));
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
            document.querySelector('.main-content').appendChild(
                tratarConErrores("Error al cargar las series. Intenta recargar la página.")
            );
        });
}

// Inicializar
generaSeries();
