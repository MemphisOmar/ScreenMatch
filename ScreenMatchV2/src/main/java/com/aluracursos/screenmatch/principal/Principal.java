package com.aluracursos.screenmatch.principal;

import com.aluracursos.screenmatch.model.*;
import com.aluracursos.screenmatch.repository.SerieRepository;
import com.aluracursos.screenmatch.service.ConsumoAPI;
import com.aluracursos.screenmatch.service.ConvierteDatos;

import java.util.*;
import java.util.stream.Collectors;

public class Principal {
    private Scanner teclado = new Scanner(System.in);
    private ConsumoAPI consumoApi = new ConsumoAPI();
    private final String URL_BASE = "https://www.omdbapi.com/?t=";
    private final String API_KEY;
    private static final String IMDB_API_KEY_ENV = "OMDB_API_KEY";
    private ConvierteDatos conversor = new ConvierteDatos();
    private List<DatosSerie> datosSeries = new ArrayList<>();
    private SerieRepository repositorio;
    private List<Serie> series;
    private Optional<Serie> serieBuscada;

    public Principal(SerieRepository repository) {
        this.repositorio = repository;
        
        // Obtener API key desde variables de entorno
        String apiKeyFromEnv = System.getenv(IMDB_API_KEY_ENV);
        if (apiKeyFromEnv == null || apiKeyFromEnv.isEmpty()) {
            System.err.println("Error: " + IMDB_API_KEY_ENV + " no está configurada en las variables de entorno");
            this.API_KEY = "";
        } else {
            this.API_KEY = "&apikey=" + apiKeyFromEnv;
        }
    }

    public void muestraElMenu() {
        var opcion = -1;
        while (opcion != 0) {
            var menu = """
                    1 - Buscar series 
                    2 - Buscar episodios
                    3 - Mostrar series buscadas
                    4 - Buscar series por titulo
                    5 - Top 5 series
                    6 - Buscar series por categoría
                    7 - Buscar series por temporadas y evaluación
                    8 - Buscar episodios por nombre
                    9 - Top 5 episodios de una serie
                    0 - Salir
                    """;
            System.out.println(menu);
            opcion = teclado.nextInt();
            teclado.nextLine();

            switch (opcion) {
                case 1:
                    buscarSerieWeb();
                    break;
                case 2:
                    buscarEpisodioPorSerie();
                    break;
                case 3:
                    mostrarSeriesBuscadas();
                    break;
                case 4:
                    buscarSeriesPorTitulo();
                    break;
                case 5:
                    top5Series();
                    break;
                case 6:
                    busquedaPorCategoria();
                    break;
                case 7:
                    buscarSeriesPorTemporadasYEvaluacion();
                    break;
                case 8:
                    buscarEpisodiosPorNombre();
                    break;
                case 9:
                    top5EpisodioSerie();
                    break;
                case 0:
                    System.out.println("Cerrando la aplicación...");
                    break;
                default:
                    System.out.println("Opción inválida");
            }
        }

    }


    private DatosSerie getDatosSerie() {
        System.out.println("Escribe el nombre de la serie que deseas buscar");
        var nombreSerie = teclado.nextLine();
        var json = consumoApi.obtenerDatos(URL_BASE + nombreSerie.replace(" ", "+") + API_KEY);
        System.out.println(json);
        DatosSerie datos = conversor.obtenerDatos(json, DatosSerie.class);
        return datos;
    }

    private void buscarEpisodioPorSerie() {
        mostrarSeriesBuscadas();
        System.out.println("Escribe el nombre de la seria de la cual quieres ver los episodios");
        var nombreSerie = teclado.nextLine();

        Optional<Serie> serie = series.stream()
                .filter(s -> s.getTitulo().toLowerCase().contains(nombreSerie.toLowerCase()))
                .findFirst();

        if (serie.isPresent()) {
            var serieEncontrada = serie.get();
            List<DatosTemporadas> temporadas = new ArrayList<>();

            for (int i = 1; i <= serieEncontrada.getTotalTemporadas(); i++) {
                var json = consumoApi.obtenerDatos(URL_BASE + serieEncontrada.getTitulo().replace(" ", "+") + "&season=" + i + API_KEY);
                DatosTemporadas datosTemporada = conversor.obtenerDatos(json, DatosTemporadas.class);
                temporadas.add(datosTemporada);
            }
            temporadas.forEach(System.out::println);

            List<Episodio> episodios = temporadas.stream()
                    .flatMap(d -> d.episodios().stream()
                            .map(e -> new Episodio(d.numero(), e)))
                    .collect(Collectors.toList());

            serieEncontrada.setEpisodios(episodios);
            repositorio.save(serieEncontrada);
        }


    }

    private void buscarSerieWeb() {
        DatosSerie datos = getDatosSerie();
        Serie serie = new Serie(datos);
        repositorio.save(serie);
        //datosSeries.add(datos);
        System.out.println(datos);
    }

    private void mostrarSeriesBuscadas() {
        series = repositorio.findAll();

        series.stream()
                .sorted(Comparator.comparing(Serie::getGenero))
                .forEach(System.out::println);
    }

    private void buscarSeriesPorTitulo() {
        System.out.println("Escribe el nombre de la seria que deseas buscar");
        var nombreSerie = teclado.nextLine();
        serieBuscada = repositorio.findByTituloContainsIgnoreCase(nombreSerie);

        if (serieBuscada.isPresent()) {
            System.out.println("Serie encontrada: " + serieBuscada.get());
        } else {
            System.out.println("No se encontró ninguna serie con ese título.");
        }
    }

    private void top5Series() {
        List<Serie> topSeries = repositorio.findTop5ByOrderByEvaluacionDesc();
        topSeries.forEach(s -> System.out.println("Serie: " + s.getTitulo() + " Evaluación: " + s.getEvaluacion()));
    }

    private void busquedaPorCategoria(){
        System.out.println("Escribe la categoría que deseas buscar");
        var genero = teclado.nextLine();
        var categoria = Categoria.fromEspanol(genero);
        List<Serie> seriesPorCategoria = repositorio.findByGenero(categoria);
        System.out.println("Las series de la categoría " + genero + " son:");
        seriesPorCategoria.forEach(System.out::println);
    }

    private void buscarSeriesPorTemporadasYEvaluacion() {
        System.out.println("Número máximo de temporadas:");
        var totalTemporadas = teclado.nextInt();
        teclado.nextLine();

        System.out.println("Evaluación mínima:");
        var evaluacion = teclado.nextDouble();
        teclado.nextLine();

        List<Serie> filtroSeries = repositorio.seriesPorTemporadayEvaluacion(totalTemporadas,evaluacion);
        filtroSeries.forEach(s ->
                System.out.println(s.getTitulo() + " evaluación: " + s.getEvaluacion() + " temporadas: "));
    }

    private void buscarEpisodiosPorNombre() {
        System.out.println("Escribe el nombre del episodio que deseas buscar:");
        var nombreEpisodio = teclado.nextLine();
        List<Episodio> episodiosEncontrados = repositorio.episodiosPorNombre(nombreEpisodio);
        episodiosEncontrados.forEach(e ->
                System.out.printf("Serie: %s Temporada %s Episodio: %s Evaluacion: %s\n",
                        e.getSerie().getTitulo(), e.getTemporada(),e.getNumeroEpisodio(), e.getEvaluacion()));
    }

    private void top5EpisodioSerie() {
        buscarSeriesPorTitulo();
        if (serieBuscada.isPresent()){
            Serie serie = serieBuscada.get();
            List<Episodio> topEpisodios = repositorio.top5Episodios(serie);
            topEpisodios.forEach(e ->
                    System.out.printf("Serie: %s Temporada %s Episodio: %s, Evaluacion: %s*\n",
                            e.getSerie().getTitulo(), e.getTemporada(),e.getTitulo(), e.getEvaluacion()));
        }
    }
}

