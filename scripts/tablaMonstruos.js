//genera dinámicamente un elemento de tabla HTML a partir de un array.
export function crearTabla(array)
{
    if (array.length > 0)
    {
        const tabla = document.createElement("table");
        tabla.appendChild(crearCabecera(array[0]));
        tabla.appendChild(crearCuerpo(array));
        return tabla;
    }
    else
    {
        return document.createElement("table");
    }
}

//creacion del encabezado de la tabla
export function crearCabecera(item){

    if(item){
        const cabeceraTabla = document.createElement("thead");
        const filaTabla = document.createElement("tr");
        filaTabla.classList.add("cabecera");

        //obtengo las claves menos la del ID
        const claves = Object.keys(item).filter(key => key !== "id");

        //genera las celdas para cada clave
        claves.forEach(key => {
        const celdaCabecera = document.createElement("th"); 
        celdaCabecera.classList.add("bg-primary", "text-black" , "p-2"); 
        celdaCabecera.appendChild(document.createTextNode(key));
        filaTabla.appendChild(celdaCabecera);
        });

        cabeceraTabla.appendChild(filaTabla);
        return cabeceraTabla;

    }else{
        return null
    }
}

//creacion del cuerpo de la tabla segun los elementos del array
export function crearCuerpo(array) {
    if (array.length === 0) {
        return null;
    }

    const cuerpoTabla = document.createElement("tbody");

    array.forEach(objeto => {
        const filaTabla = document.createElement("tr");

        Object.keys(objeto).forEach(key => {
            if (key === "id") {
                filaTabla.setAttribute("data-" + key, objeto[key]);
            } else {
                const celdaCuerpo = document.createElement("td");
                celdaCuerpo.classList.add("bg-light", "p-2"); 
                celdaCuerpo.classList.add("bg-light");
                celdaCuerpo.appendChild(document.createTextNode(objeto[key]));
                filaTabla.appendChild(celdaCuerpo);
            }
        });

        cuerpoTabla.appendChild(filaTabla);
    });

    return cuerpoTabla;
}
