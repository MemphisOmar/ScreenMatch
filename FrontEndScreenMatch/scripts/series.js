import getDatos from "./getDatos.js";

const params = new URLSearchParams(window.location.search);
const serieId = params.get('id');
const listaTemporadas = document.getElementById('temporadas-select');
const fichaSerie = document.getElementById('temporadas-episodios');
const fichaDescripcion = document.getElementById('ficha-descripcion');

// Validar que se haya pasado una serie ID
if (!serieId) {
    fichaDescripcion.innerHTML = `<p style="color: #ff6b6b; padding: 2rem;">Error: No se especificó una serie válida. <a href="./index.html" style="color: #409ecd;">Volver al inicio</a></p>`;
}

// Funcion para cargar temporadas
function cargarTemporadas() {
    getDatos(`/series/${serieId}/temporadas/todas`)
        .then(data => {
            if (!data || data.length === 0) {
                console.warn('No hay temporadas disponibles');
                return;
            }

            const temporadasUnicas = [...new Set(data.map(temporada => temporada.temporada))].sort((a, b) => a - b);
            listaTemporadas.innerHTML = '';

            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Seleccione una temporada';
            optionDefault.disabled = true;
            optionDefault.selected = true;
            listaTemporadas.appendChild(optionDefault);
           
            temporadasUnicas.forEach(temporada => {
                const option = document.createElement('option');
                option.value = temporada;
                option.textContent = `Temporada ${temporada}`;
                listaTemporadas.appendChild(option);
            });

            const optionTodos = document.createElement('option');
            optionTodos.value = 'todas';
            optionTodos.textContent = '📺 Todas las temporadas'
            listaTemporadas.appendChild(optionTodos);

            const optionTop = document.createElement('option');
            optionTop.value = 'top';
            optionTop.textContent = '⭐ Top 5 episodios'
            listaTemporadas.appendChild(optionTop);
        })
        .catch(error => {
            console.error('Error al obtener temporadas:', error);
            listaTemporadas.innerHTML = '<option>Error al cargar temporadas</option>';
        });
}

// Funcion para cargar episodios de una temporada
function cargarEpisodios() {
    getDatos(`/series/${serieId}/temporadas/${listaTemporadas.value}`)
        .then(data => {
            if (!data || data.length === 0) {
                fichaSerie.innerHTML = '<p style="color: #b0b0b0; text-align: center; padding: 2rem;">No hay episodios disponibles</p>';
                return;
            }

            const temporadasUnicas = [...new Set(data.map(temporada => temporada.temporada))].sort((a, b) => a - b);
            fichaSerie.innerHTML = ''; 
            temporadasUnicas.forEach(temporada => {
                const ul = document.createElement('ul');
                ul.className = 'episodios-lista';

                const episodiosTemporadaAtual = data.filter(serie => serie.temporada === temporada);

                const listaHTML = episodiosTemporadaAtual.map(serie => `
                    <li>
                        <strong>Episodio ${serie.numeroEpisodio}</strong> - ${serie.titulo}
                    </li>
                `).join('');
                ul.innerHTML = listaHTML;
                
                const paragrafo = document.createElement('p');
                paragrafo.textContent = `📺 Temporada ${temporada} (${episodiosTemporadaAtual.length} episodios)`;
                fichaSerie.appendChild(paragrafo);
                fichaSerie.appendChild(ul);
            });
        })
        .catch(error => {
            console.error('Error al obtener episodios:', error);
            fichaSerie.innerHTML = '<p style="color: #ff6b6b; text-align: center; padding: 2rem;">Error al cargar los episodios</p>';
        });
}

// Funcion para cargar top 5 episodios
function cargarTopEpisodios() {
    getDatos(`/series/${serieId}/temporadas/top`)
        .then(data => {
            if (!data || data.length === 0) {
                fichaSerie.innerHTML = '<p style="color: #b0b0b0; text-align: center; padding: 2rem;">No hay episodios destacados</p>';
                return;
            }

            fichaSerie.innerHTML = '';
            const ul = document.createElement('ul');
            ul.className = 'episodios-lista';

            const listaHTML = data.map((serie, index) => `
                <li>
                    <strong>🏆 #${index + 1} - Episodio ${serie.numeroEpisodio}</strong> (Temporada ${serie.temporada})
                    <div style="margin-top: 0.25rem; color: #b0b0b0;">${serie.titulo}</div>
                </li>
            `).join('');
            ul.innerHTML = listaHTML;
            
            const paragrafo = document.createElement('p');
            paragrafo.textContent = '⭐ Top 5 Episodios más valorados';
            fichaSerie.appendChild(paragrafo);
            fichaSerie.appendChild(ul);
        })
        .catch(error => {
            console.error('Error al obtener episodios destacados:', error);
            fichaSerie.innerHTML = '<p style="color: #ff6b6b; text-align: center; padding: 2rem;">Error al cargar episodios destacados</p>';
        });
}

// Funcion para cargar informaciones de la serie
function cargarInfoSerie() {
    getDatos(`/series/${serieId}`)
        .then(data => {
            fichaDescripcion.innerHTML = `
                <img src="${data.poster}" alt="${data.titulo}" />
                <div>
                    <h2>${data.titulo}</h2>
                    <div class="descricao-texto">
                        <p><b>⭐ Calificación promedio:</b> ${data.evaluacion}</p>
                        <p><b>📝 Sinopsis:</b> ${data.sinopsis || 'Sin sinopsis disponible'}</p>
                        <p><b>🎭 Actores:</b> ${data.actores || 'No disponible'}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error al obtener información de la serie:', error);
            fichaDescripcion.innerHTML = '<p style="color: #ff6b6b; padding: 2rem;">Error al cargar la información de la serie</p>';
        });
}

// Adiciona escuchador de evento para el elemento select
listaTemporadas.addEventListener('change', function() {
    if (listaTemporadas.value === 'top') {
        cargarTopEpisodios();
    } else if (listaTemporadas.value !== '') {
        cargarEpisodios();
    }
});

// Carga las informaciones de la série y las temporadas cuando la página carga
cargarInfoSerie();
cargarTemporadas();
