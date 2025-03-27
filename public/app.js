const API_URL = 'http://localhost:3000/personajes';
const container = document.getElementById('characters-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(API_URL);
});


searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    fetchCharacters(`${API_URL}?nombre_like=${encodeURIComponent(searchTerm)}`);
});

// Búsqueda al hacer clic (opcional)
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    fetchCharacters(`${API_URL}?nombre_like=${encodeURIComponent(searchTerm)}`);
});

async function fetchCharacters(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error de la T.I.A.');
        const personajes = await response.json();
        displayCharacters(personajes);
    } catch (error) {
        container.innerHTML = `
            <div class="error">
                <p>¡Sopla! Algo ha ido mal</p>
            </div>
        `;
    }
}

function displayCharacters(personajes) {
    container.innerHTML = '';
    
    if (personajes.length === 0) {
        container.innerHTML = '<p>¡No hay nadie aquí, Filemón!</p>';
        return;
    }

    personajes.forEach(character => {
        const card = `
            <div class="card">
                <img src="${character.imagen}" alt="${character.nombre}" class="character-image">
                <h2>${character.nombre}</h2>
                <p><strong>Apodo:</strong> ${character.apodo}</p>
                <p><strong>Especialidad:</strong> ${character.especialidad}</p>
                <p><strong>Habilidades:</strong> ${character.habilidades.join(', ')}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });
}