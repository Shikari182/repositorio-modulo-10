import "./style.css";
import { obtenerTodosPersonajes, buscarPersonajes, Personaje } from "./api/personajesAPI";

// Configuración inicial
const API_DELAY = 300; // ms
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
let abortController: AbortController | null = null;

// Elementos del DOM
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const resultsContainer = document.getElementById('results') as HTMLDivElement;
const loadingIndicator = document.getElementById('loading') as HTMLDivElement;
const errorDisplay = document.getElementById('error') as HTMLDivElement;

// Eventos
window.addEventListener('DOMContentLoaded', iniciarAplicacion);
searchInput.addEventListener('input', manejarBusqueda);

async function iniciarAplicacion(): Promise<void> {
    try {
        mostrarLoading();
        const personajes = await obtenerTodosPersonajes();
        mostrarResultados(personajes);
    } catch (error) {
        manejarError(error);
    } finally {
        ocultarLoading();
    }
}

async function manejarBusqueda(event: Event): Promise<void> {
    const query = (event.target as HTMLInputElement).value.trim();
    
    // Cancelar petición anterior
    if (abortController) {
        abortController.abort();
    }
    abortController = new AbortController();
    
    // Limpiar timeout anterior
    if (searchTimeout) clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(async () => {
        try {
            if (!query) {
                const todos = await obtenerTodosPersonajes(abortController?.signal);
                return mostrarResultados(todos);
            }
            
            mostrarLoading();
            const resultados = await buscarPersonajes(query, abortController?.signal);
            mostrarResultados(resultados);
            
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                manejarError(error);
            }
        } finally {
            ocultarLoading();
        }
    }, API_DELAY);
}

function mostrarResultados(personajes: Personaje[]): void {
    resultsContainer.innerHTML = personajes.length > 0
        ? personajes.map(personaje => `
            <div class="character-card">
                <img src="./images/${personaje.imagen}" alt="${personaje.nombre}">
                <div class="character-info">
                    <h3>${personaje.nombre}${personaje.apodo ? `<small>${personaje.apodo}</small>` : ''}</h3>
                    <p><strong>Especialidad:</strong> ${personaje.especialidad}</p>
                    <p><strong>Habilidades:</strong> ${personaje.habilidades.join(', ')}</p>
                    ${personaje.amigo ? `<p><strong>Aliado:</strong> ${personaje.amigo}</p>` : ''}
                </div>
            </div>
        `).join('')
        : '<p class="no-results">No se encontraron agentes</p>';
}

function manejarError(error: unknown): void {
    const errorMessage = error instanceof Error 
        ? error.message 
        : 'Ocurrió un error desconocido';
    
    errorDisplay.textContent = errorMessage;
    errorDisplay.style.display = 'block';
    
    setTimeout(() => {
        errorDisplay.style.display = 'none';
    }, 5000);
}

function mostrarLoading(): void {
    loadingIndicator.style.display = 'block';
    resultsContainer.innerHTML = '';
}

function ocultarLoading(): void {
    loadingIndicator.style.display = 'none';
}