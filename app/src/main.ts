import "./style.css";
import { obtenerTodosPersonajes, buscarPersonajes } from "./api/personajesAPI";
import { inicializarUI, UI } from "./ui";

let abortController: AbortController | null = null;
let ui: UI;

// Elementos del DOM
const searchInputElement = document.getElementById('searchInput');
const resultsContainerElement = document.getElementById('results');
const loadingIndicatorElement = document.getElementById('loading');
const errorDisplayElement = document.getElementById('error');

// Verificaciones de tipo
if (!(searchInputElement instanceof HTMLInputElement)) throw new Error('Elemento searchInput no válido');
if (!(resultsContainerElement instanceof HTMLDivElement)) throw new Error('Elemento results no válido');
if (!(loadingIndicatorElement instanceof HTMLDivElement)) throw new Error('Elemento loading no válido');
if (!(errorDisplayElement instanceof HTMLDivElement)) throw new Error('Elemento error no válido');

// Configurar UI
ui = inicializarUI({
    searchInput: searchInputElement,
    resultsContainer: resultsContainerElement,
    loadingIndicator: loadingIndicatorElement,
    errorDisplay: errorDisplayElement,
    onSearch: manejarBusqueda
});

// Eventos
window.addEventListener('DOMContentLoaded', iniciarAplicacion);

async function iniciarAplicacion(): Promise<void> {
    try {
        ui.mostrarLoading();
        const personajes = await obtenerTodosPersonajes();
        ui.mostrarResultados(personajes);
    } catch (error) {
        ui.manejarError(error);
    } finally {
        ui.ocultarLoading();
    }
}

async function manejarBusqueda(query: string): Promise<void> {
    abortController?.abort();
    abortController = new AbortController();

    try {
        ui.mostrarLoading();
        const resultados = query 
            ? await buscarPersonajes(query, abortController?.signal)
            : await obtenerTodosPersonajes(abortController?.signal);
        
        ui.mostrarResultados(resultados);
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            ui.manejarError(error);
        }
    } finally {
        ui.ocultarLoading();
    }
}