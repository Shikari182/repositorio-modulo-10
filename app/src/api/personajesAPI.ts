export interface Personaje {
    id: string;
    nombre: string;
    apodo: string;
    especialidad: string;
    habilidades: string[];
    imagen: string;
    amigo: string;
}

export async function obtenerTodosPersonajes(signal?: AbortSignal): Promise<Personaje[]> {
    try {
        const response = await fetch('http://localhost:3000/personajes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            signal
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Falló la carga de personajes: ${(error as Error).message}`);
    }
}

export async function buscarPersonajes(query: string, signal?: AbortSignal): Promise<Personaje[]> {
    try {
        const response = await fetch(
            `http://localhost:3000/personajes?q=${encodeURIComponent(query)}&_limit=20`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                signal
            }
        );

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Búsqueda fallida: ${(error as Error).message}`);
    }
}