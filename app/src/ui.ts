import { Personaje } from "./api/personajesAPI";

export const mostrarListadoPersonajes = (personajes: Personaje []) => {
    const elementoResultado = document.getElementById ("results");
    if (elementoResultado !== null && elementoResultado !== undefined && elementoResultado instanceof HTMLDivElement) {
        elementoResultado.innerHTML = personajes.map(personaje => `
                    <div class="character-card">
                        <img src="./images/${personaje.imagen}" alt="${personaje.nombre}">
                        <div class="character-info">
                            <h3>${personaje.nombre}${personaje.apodo ? `<small>${personaje.apodo}</small>` : ''}</h3>
                            <p><strong>Especialidad:</strong> ${personaje.especialidad}</p>
                            <p><strong>Habilidades:</strong> ${personaje.habilidades.join(', ')}</p>
                            ${personaje.amigo ? `<p><strong>Aliado:</strong> ${personaje.amigo}</p>` : ''}
                        </div>
                    </div>`
    ).join("")}
}

