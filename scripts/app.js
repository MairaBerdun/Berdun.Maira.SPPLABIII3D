import Monstruo from "./monstruo.js";
import {crearTabla, crearCabecera, crearCuerpo} from "./tablaMonstruos.js";

import { getTiposMonstruosFetch, postMonstruoAjax, putMonstruoAjax, getMonstruosAjax, getMonstruosAxios,  deleteMonstruosAxios, postMonstruosFetch, postMonstruosAxios, deleteMonstruoAjax, deleteMonstruosFetch, putMonstruosFetch } from "./db.js";

//Carga los monstruos del servidor
const monstruos = await getMonstruosAjax();
//const monstruos = await getMonstruosAxios();

//Carga del servidor los diferentes tipos de monstruos para el select del form
const tipos = await getTiposMonstruosFetch();

//Obtengo la referencia al elemento select del form
const miSelectForms = document.getElementById('tiposForm');

let flagFilaSeleccionada = false;
let ultimaFilaSeleccionada;
let idFilaClickeada;

//obtengo referencia a los tipos de monstruos
tipos.forEach((tipo) => {
    if (tipo !== "Todos") {
        const opcionElement = document.createElement('option');
        opcionElement.value = tipo;
        opcionElement.text = tipo;
        miSelectForms.add(opcionElement);
    }
});


//Obtengo la referencia al elemento select del filtro
const miSelectFiltro = document.getElementById('filtroTipos');

//itero sobre cada elemento del array y creo por cada uno un elemento option
tipos.forEach((tipo) => {
  const opcionElement = document.createElement('option');
  opcionElement.value = tipo; 
  opcionElement.text = tipo;
  miSelectFiltro.add(opcionElement);
});

//Almaceno la ref al elemento del DOM con el id "table-container"
const $containerTabla = document.getElementById("table-container");

//Almaceno la ref alelemento del DOM con el id "filtroTipos"
const $select = document.getElementById("filtroTipos");

//Llamado a la función filtrarTabla para inicialmente filtrar la tabla de monstruos según el valor seleccionado y se guarda en listaFiltrada.
let listaFiltrada = filtrarTabla($containerTabla, monstruos, $select.value);

let listadoCheck = listaFiltrada;

//Seleccion todos los elementos del DOM con la clase "chbox" y los almacena en la variable
const checkbox = document.querySelectorAll(".chbox");
checkbox.forEach(element => { element.checked = true; });
actualizarTabla($containerTabla, monstruos);

//-------------------------------------------------------------
//Agregar / modificar un nuevo elemento
const frmMonstruo = document.getElementById("monstruoForm");

frmMonstruo.addEventListener("submit", (e) => {
    e.preventDefault();

    if (idFilaClickeada != null && idFilaClickeada != undefined) { //para modificar un elemento
        monstruos.forEach((element) => { 
            if (element.id == idFilaClickeada) { //tomo los nuevos valores cargados
                let id = element.id;
                let nombre = document.getElementById("txtNombre").value;
                let alias = document.getElementById("txtAlias").value;
                let miedo = document.getElementById("rangeMiedo").value;
                let tipo = document.getElementById("tiposForm").value;
                let defensa = getRadioBtnDefensaSeleccionado().value;

                const putMonstruo = new Monstruo(id, nombre, alias, defensa, miedo, tipo);

                //actualizo el monstruo
                //putMonstruoAjax(putMonstruo);
                putMonstruosFetch(putMonstruo);

                //Dejo de tener en cuenta ese objeto ya modificado.
                if (flagFilaSeleccionada == true) {
                    idFilaClickeada = null;
                }
                limpiarControlesMonstruo();

                actualizarTabla();
                return;
            }
        });
    } else {
        let id;
        let nombre = document.getElementById("txtNombre").value;
        let alias = document.getElementById("txtAlias").value;
        let defensa = getRadioBtnDefensaSeleccionado().value;  
        let miedo = document.getElementById("rangeMiedo").value;
        let tipo = document.getElementById("tiposForm").value;
        
        const newMonstruo = new Monstruo(id, nombre, alias, defensa, miedo, tipo);

       // postMonstruoAjax(newMonstruo);
        postMonstruosFetch(newMonstruo);
        //postMonstruosAxios(newMonstruo);

    }

});

//-------------------------------------------------------------
//Borrar un elemento de la tabla
const botonEliminar = document.getElementById("BtnEliminar");
const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));

botonEliminar.addEventListener("click", (e) => {
    if (idFilaClickeada != null && idFilaClickeada != undefined) {
       modalEliminar.show();
        return;
    }
});

const botonConfirmarEliminar = document.getElementById("BtnConfirmarEliminar");

botonConfirmarEliminar.addEventListener("click", () => {
    deleteMonstruosFetch(idFilaClickeada);
    // deleteMonstruosAxios(idFilaClickeada);
    //deleteMonstruoAjax(idFilaClickeada);
    modalEliminar.hide(); //cierro el modal
});


//---------------------------Captura del boton cancelar y desarrollo de su evento 'click'--------------------------------
const botonCancelar = document.getElementById("BtnCancelar");
botonCancelar.addEventListener("click", (e) => {
    if (flagFilaSeleccionada == true) {
        idFilaClickeada = null;
    }

    limpiarControlesMonstruo();
});


//-----------------------------------------------------------------------------------------------------------------------
//Funcion que desarrolla el evento 'click' en una fila seleccionada de la tabla
const contenedorTabla = document.getElementById("table-container");
contenedorTabla.addEventListener("click", (e) => {
    const fila = e.target.closest("tr");

    if (fila && fila !== ultimaFilaSeleccionada) {
        idFilaClickeada = fila.dataset.id;
        console.log("El ID del Monstruo seleccionado: " + idFilaClickeada);

        cargarFormMonstruoSeleccionado(idFilaClickeada);

        ultimaFilaSeleccionada = fila;
        flagFilaSeleccionada = true;
    }
});


//------------------------------------------------------------------------------------------------------------------------
//funcion para cargar los datos de la fila seleccionada de la tabla
function cargarFormMonstruoSeleccionado(idRecibido) {
    monstruos.forEach((element) => {
        if (element.id == idRecibido) {
            document.getElementById("txtNombre").value = element.Nombre;
            document.getElementById("txtAlias").value = element.Alias;
            document.getElementById("rangeMiedo").value = element.Miedo;
            document.getElementById("tiposForm").value = element.Tipo;
            switch (element.Defensa) {
                case "Pocion":
                    document.getElementById("pocion").checked = true;
                    break;
                case "Crucifijo":
                    document.getElementById("crucifijo").checked = true;
                    break;
                case "Estaca":
                    document.getElementById("estaca").checked = true;
                    break;
                case "Plata":
                    document.getElementById("plata").checked = true;
                    break;
            }
        }
    });
}

//------------------------------------------------------------------------------------------------------------------------
//Funcion que actualiza los registros de tabla.
function actualizarTabla(contenedor, data) {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (data) {
        contenedor.appendChild(crearTabla(data));
    }
    promedio.value = calcularPromedio(data);
    miedoMin.value = obtenerMiedoMinimo(data);
    miedoMax.value = obtenerMiedoMaximo(data);
};

//------------------------------------------------------------------------------------------------------------------------
//Funcion para calcular el promedio.
function calcularPromedio(lista) {
    let acumulador = lista.reduce((anterior, actual) => {
        let acumulador = anterior + parseInt(actual.Miedo);
        return acumulador;
    }, 0);
    if (acumulador >= 1) {
        return Math.round(acumulador / lista.length);
    }
    else {
        return "-";
    }
};

//------------------------------------------------------------------------------------------------------------------------
//Funcion para calcular el valor minimo.
function obtenerMiedoMinimo(lista) {
    let valoresValidos = lista
        .map(item => parseInt(item.Miedo))
        .filter(valor => !isNaN(valor));

    if (valoresValidos.length > 0) {
        return valoresValidos.reduce((min, actual) => Math.min(min, actual), Infinity);
    } else {
        return "-";
    }
}

//------------------------------------------------------------------------------------------------------------------------
//Funcion para calcular el valor maximo.
function obtenerMiedoMaximo(lista) {
    let valoresValidos = lista
        .map(item => parseInt(item.Miedo))
        .filter(valor => !isNaN(valor));

    if (valoresValidos.length > 0) {
        return valoresValidos.reduce((max, actual) => Math.max(max, actual), -Infinity);
    } else {
        return "-";
    }
}

//------------------------------------------------------------------------------------------------------------------------
//Setea los valores vacios en los controles
function limpiarControlesMonstruo() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtAlias").value = "";
    document.getElementById("rangeMiedo").value = 0;
}

//Simulacion de carga de tabla con el loader
setTimeout(() => {
    const divSpinner = document.getElementById("divSpinner");
    divSpinner.setAttribute("Hidden", true);

    const divPrincipal = document.getElementById("table-container");
    divPrincipal.removeAttribute("Hidden");
}, 2000);

function getRadioBtnDefensaSeleccionado() {
    const radios = document.getElementsByName('Defensa');

    // Encuentra el radio button que está checkeado
    let radioSeleccionado;
    for (const radio of radios) {
        if (radio.checked) {
            radioSeleccionado = radio;
            break;
        }
    }
    return radioSeleccionado;
}


//Funcion para filtrar los registros en la tabla segun el Tipo
function filtrarTabla(contenedor, lista, filtro) {
    console.log("Filtro aplicado: ",filtro);
    if (filtro != "Todos") {

        let listaFiltrada = lista.filter((elemento) => elemento.Tipo == filtro); // FILTRO
        actualizarTabla(contenedor, listaFiltrada);
        return listaFiltrada;
    }
    else {
        actualizarTabla(contenedor, lista);
        return lista;
    }
}

$select.addEventListener("change", () => {
    listaFiltrada = filtrarTabla($containerTabla, monstruos, $select.value);
    checkbox.forEach(element => { element.checked = true; });
    limpiarControlesMonstruo();
});

//actualizar monstruos!
const modificarTabla = () => {
    const checked = {};
    checkbox.forEach((elem) => { console.log(elem.name); 
        console.log("entramos a mofi tabla");
    guardarColumnasSeleccionadasLocalStorage(); //
    checked[elem.name] = elem.checked; 
    });

    listadoCheck = listaFiltrada.map((elem) => {
        const newElement = {};
        for (const key in elem) {
            if (key == "id" || checked[key] == true) {
                newElement[key] = elem[key];
            }
        }
        return newElement;
    });

    actualizarTabla($containerTabla, listadoCheck);
};

checkbox.forEach((elem) => elem.addEventListener("click", modificarTabla));

//------------------------------------------------------------------------------------------------------------------------
//logica para guardar en el localstorage la seleccion de los checkboxes

let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let columnasSelecc = seleccionarColumnasActivas(); //selecciono las columas 
let columnasSeleccEnLocalStorage = JSON.parse(localStorage.getItem('columnasSelecc')); //tomo las columnas seleccionadas guardadas en LocalStorage

//imprimo todos los checkboxes que encuentre en el html
console.log("primero:",checkboxes);

function seleccionarColumnasActivas() {
    return Array.from(checkboxes) //le paso el arrar de checkboxes
        .filter(checkbox => checkbox.checked) // Filtra solo los checkboxes activos
        .map(checkbox => {
            console.log("Segundo: entre a la funcion de col seleccionadas");
            return checkbox.getAttribute('data-column'); //retorna el valor del data-column de cada checkbox
    });
}


function guardarColumnasSeleccionadasLocalStorage()
{
    console.log("entre a la funcion que guarda las columnas en el local");

    //almaceno el array de cada uno de los checkboxes seleccionados
    columnasSelecc = seleccionarColumnasActivas();
    console.log("Tercero: Array de checkboxes a guardar:", columnasSelecc);

    //guardo el array de checkboxes en el localStorage
    localStorage.setItem('columnasSelecc', JSON.stringify(columnasSelecc)); 
    console.log("Cuarto: Array enviado:", columnasSelecc);

    //Tomo los guardado en el localStorage local storage
    columnasSeleccEnLocalStorage = JSON.parse(localStorage.getItem('columnasSelecc'));
    console.log("Quinto: Contenido en el LocalStorage: ",columnasSeleccEnLocalStorage);

    actualizarTabla($containerTabla, listadoCheck);

}