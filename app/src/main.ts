/*import "./style.css";

interface Personaje {
    id: string;
    nombre: string;
    apodo: string;
    especialidad: string;
    habilidades: string[];
    imagen: string;
    amigo: string;
}

const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const resultsDiv = document.getElementById('results') as HTMLDivElement;
const loading = document.getElementById('loading') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let controller: AbortController | null = null;

// Cargar todos los personajes al iniciar
window.addEventListener('DOMContentLoaded', () => {
    buscarPersonajes('');
});

async function cargarTodosPersonajes(): Promise<Personaje[]> {
    try {
        const response = await fetch('http://localhost:3000/personajes');
        if (!response.ok) throw new Error('Error al cargar personajes');
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            errorDiv.textContent = `Error: ${error.message}`;
            errorDiv.style.display = 'block';
        }
        return [];
    }
}

function filtrarPersonajes(personajes: Personaje[], query: string): Personaje[] {
    const busqueda = query.toLowerCase();
    return personajes.filter(personaje => 
        personaje.nombre.toLowerCase().includes(busqueda) ||
        personaje.apodo.toLowerCase().includes(busqueda) ||
        personaje.habilidades.some(h => h.toLowerCase().includes(busqueda)) ||
        personaje.especialidad.toLowerCase().includes(busqueda)
    );
}

async function buscarPersonajes(query: string): Promise<void> {
    try {
        loading.style.display = 'block';
        errorDiv.style.display = 'none';
        
        const todosPersonajes = await cargarTodosPersonajes();
        const resultados = query ? filtrarPersonajes(todosPersonajes, query) : todosPersonajes;
        
        mostrarResultados(resultados);
    } catch (error) {
        if (error instanceof Error) {
            errorDiv.textContent = `Error: ${error.message}`;
            errorDiv.style.display = 'block';
        }
    } finally {
        loading.style.display = 'none';
    }
}

function mostrarResultados(personajes: Personaje[]): void {
    resultsDiv.innerHTML = personajes.length > 0 
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

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    
    if (timeoutId) clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
        buscarPersonajes(query);
    }, 300);
});

*/