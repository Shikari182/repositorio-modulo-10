import { Personaje } from "./api/personajesAPI";

const API_DELAY = 300; // Mover la constante aquí

type UIConfig = {
    searchInput: HTMLInputElement;
    resultsContainer: HTMLDivElement;
    loadingIndicator: HTMLDivElement;
    errorDisplay: HTMLDivElement;
    onSearch: (query: string) => Promise<void>;
};

export function inicializarUI(config: UIConfig) {
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;

    config.searchInput.addEventListener('input', (event: Event) => {
        const query = (event.target as HTMLInputElement).value.trim();
        
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => config.onSearch(query), API_DELAY);
    });

    return {
        mostrarResultados: (personajes: Personaje[]) => {
            config.resultsContainer.innerHTML = personajes.length > 0
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
        },
        
        manejarError: (error: unknown) => {
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Error desconocido';
            
            config.errorDisplay.textContent = errorMessage;
            config.errorDisplay.style.display = 'block';
            
            setTimeout(() => {
                config.errorDisplay.style.display = 'none';
            }, 5000);
        },
        
        mostrarLoading: () => {
            config.loadingIndicator.style.display = 'block';
            config.resultsContainer.innerHTML = '';
        },
        
        ocultarLoading: () => {
            config.loadingIndicator.style.display = 'none';
        }
    };
}

export type UI = ReturnType<typeof inicializarUI>;