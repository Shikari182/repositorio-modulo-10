import "./style.css";
import { obtenerTodosPersonajes, buscarPersonajes } from "./api/personajesAPI";
import { mostrarListadoPersonajes } from "./ui";

const iniciarAplicacion = async () => {
    const listaPersonajes = await obtenerTodosPersonajes ()
    mostrarListadoPersonajes(listaPersonajes);
    console.log (listaPersonajes);
}


const manejarBusqueda = async () => {

    
    const inputBusqueda = document.getElementById("busquedaInput") as HTMLInputElement;
    const query = inputBusqueda.value.trim();
    
    try {
        const resultados = await buscarPersonajes(query);
        mostrarListadoPersonajes(resultados);
    } catch (error) {
        console.error("Error en la búsqueda:", error);
    }
};


document.addEventListener("DOMContentLoaded", iniciarAplicacion);


const formularioBusqueda = document.getElementById("formulario");
if (formularioBusqueda) {
    formularioBusqueda.addEventListener("submit", manejarBusqueda);
};



