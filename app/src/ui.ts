import { Personaje } from "./api/personajesAPI";

export function inicializarUI(
    searchHandler: (query: string) => Promise<void>
): {
    resultsDiv: HTMLDivElement;
    loading: HTMLDivElement;
    errorDiv: HTMLDivElement;
} {
    // Elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    // Verificaciones de tipo
    if (!(searchInput instanceof HTMLInputElement)) throw new Error('Elemento searchInput no válido');
    if (!(resultsDiv instanceof HTMLDivElement)) throw new Error('Elemento results no válido');
    if (!(loading instanceof HTMLDivElement)) throw new Error('Elemento loading no válido');
    if (!(errorDiv instanceof HTMLDivElement)) throw new Error('Elemento error no válido');

    // Configurar event listeners
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        
        if (timeoutId) clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            searchHandler(query);
        }, 300);
    });

    return {
        resultsDiv,
        loading,
        errorDiv
    };
}

export function mostrarResultados(personajes: Personaje[], container: HTMLDivElement): void {
    container.innerHTML = personajes.length > 0 
        ? personajes.map(personaje => `
            <div class="character-card">
                <img src="./images/${personaje.imagen}" alt="${personaje.nombre}">
                <h3>${personaje.nombre}${personaje.apodo ? ` (${personaje.apodo})` : ''}</h3>
                <p><strong>Especialidad:</strong> ${personaje.especialidad}</p>
                <p><strong>Habilidades:</strong> ${personaje.habilidades.join(', ')}</p>
                ${personaje.amigo ? `<p><strong>Compañero:</strong> ${personaje.amigo}</p>` : ''}
            </div>
        `).join('')
        : '<p class="error-message">No se encontraron resultados</p>';
}

export function manejarError(error: unknown, errorDiv: HTMLDivElement): void {
    if (error instanceof Error) {
        if (error.name === 'AbortError') {
            console.log('Búsqueda cancelada');
            return;
        }
        errorDiv.textContent = error.message;
    } else {
        errorDiv.textContent = 'Error desconocido';
    }
    errorDiv.style.display = 'block';
}