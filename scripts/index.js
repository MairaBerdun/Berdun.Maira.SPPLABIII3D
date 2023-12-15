import {getMonstruosFetch} from "./db.js";

const monstruos = await getMonstruosFetch(); //OBTENGO EL LISTADO DE LOS MONSTRUOS

setTimeout(() => {
  const divSpinner = document.getElementById("divSpinner");
  divSpinner.setAttribute("hidden", true); //oculto el spinner

  const divPrincipal = document.getElementById("contenedorTarjetas");
  divPrincipal.removeAttribute("hidden"); //muestro la seccion de cartas
}, 2000); //2 segundos 

//genero una card para cada elemento del array
monstruos.forEach((monstruo) => {
  const card = document.createElement("div");
  card.classList.add('cards', 'col-md-4', 'mb-4',);
  
  card.innerHTML = `
  <div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><i class="bi bi-person-circle"></i> Nombre: ${monstruo.Nombre}</li>
      <li class="list-group-item"><i class="bi bi-person-badge"></i> Alias: ${monstruo.Alias}</li>
      <li class="list-group-item"><i class="bi bi-radioactive"></i> Defensa: ${monstruo.Defensa}</li>
      <li class="list-group-item"><i class="bi bi-balloon-fill"></i> Miedo: ${monstruo.Miedo}</li>
      <li class="list-group-item"><i class="bi bi-emoji-smile-fill"></i> Tipo: ${monstruo.Tipo}</li>
    </ul>
  </div>`;

  contenedorTarjetas.appendChild(card);
});
