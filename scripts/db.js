const miURL = "http://localhost:3000/monstruos";
const tipoMonstruosURL = "http://localhost:3000/tipoMonstruos";
//import axios from '../node_modules/axios';

/*FETCH*/
//GET MONSTRUOS
export const getMonstruosFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(miURL)
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
    });
};

//GET TIPO DE MONSTRUOS
export const getTiposMonstruosFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(tipoMonstruosURL)
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
    });
};

//POST
export const postMonstruosFetch = (monstruo) => {

    fetch(miURL, {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(monstruo)
    })
    .then((respuesta)=>{
        if(respuesta.ok){
            return respuesta.json();
        }else{
            console.log(respuesta);
            return Promise.reject(respuesta);
        }
    })
    .catch((error)=>{
        console.error(`Error ${error.status} - ${error.statusText}`);
    })
};

//DELETE
export const deleteMonstruosFetch = (id) => {

    fetch(miURL + "/" + id, {
        method: "DELETE"
    })
    .then((respuesta)=>{
        if(!respuesta.ok){
            return Promise.reject(respuesta);
            console.log("El monstruo ha sido borrado");
        }
    })
    .catch((error)=>{
        console.error(`Error ${error.status} - ${error.statusText}`);
    })
};

// PUT
export const putMonstruosFetch = (monstruo) => {

    fetch(miURL + "/" + monstruo.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(monstruo)
    })
    .then((respuesta)=>{
        if(respuesta.ok){
            return respuesta.json();
        }else{
            return Promise.reject(respuesta);
        }
    })
    .catch((error)=>{
        console.error(`Error ${error.status} - ${error.statusText}`);
    })
};


/*AJAX */

// GET
export const getMonstruosAjax = () => 
{
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
        }
    });
    xhr.open("GET", miURL);
    xhr.send();
    });
};

// POST
export const postMonstruoAjax = (monstruo) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            detenerSpinner();
        }
    });
    xhr.open("POST", miURL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(monstruo));
};

// DELETE
export const deleteMonstruoAjax = (id) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log("El monstruo ha sido eliminado");
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("DELETE", miURL + "/" + id);
    xhr.send();
};

// PUT
export const putMonstruoAjax = (monstruo) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("PUT", miURL + "/" + monstruo.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(monstruo));
};

/*AXIOS*/
//GET

export const getMonstruosAxios = () => {

    return new Promise((resolve, reject) => {
        axios.get(miURL)
        .then((respuesta)=>{
            const {data} = respuesta;
            resolve(data);
        })
        .catch((error)=>{
            reject(error.message);
        })
    });
};

// POST
export const postMonstruosAxios = async (monstruo) => {

    try {
        const response = await axios.post(miURL, monstruo, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        const datos = response.data;
        console.log('Datos recibidos:', datos);
    } catch (error) {
        console.error('Error al enviar la solicitud:', error.message);
    }
};

// DELETE
export const deleteMonstruosAxios = async (id) => 
{
    try
    {
        let {data} = await axios.delete(miURL + "/" + id);
        console.log(data);
    }
    catch(error)
    {
        console.log(error.message);
    }
    finally
    {
        detenerSpinner();
    }
};

// PUT
export const putMonstruosAxios = async (monstruo) => {

    try {
        let {datos} = await axios.put(miURL + "/" + monstruo.id, monstruo, {"Content-Type": "application/json;charset=utf-8"});
    } catch (error) {
        console.log(error.message);
    }
};

//auxiliares
export const getArmasAjax = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            detenerSpinner();
        }
    });
    xhr.open("GET", armasURL);
    xhr.send();
    });
};

export const getCardsFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(miURL) // El Fetch retorna una promesa.
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
    });
};