document.addEventListener("DOMContentLoaded", () => {
  marcarPoke();
});

/* variables */

const lista = document.getElementById("pokemons");
const controls = document.querySelector(".controls");
const alerta = document.querySelector(".alerta");
const detail = document.querySelector(".detailP");
const body = document.querySelector("body");
const buscador = document.getElementById("busqueda");

/* varibles para cmbiar de seccion */
let count1 = 1;
let count2 = 20;

/* funcion que consume la api y muestra los pokemons  */
const getPokemon = (num1, num2) => {
  lista.innerHTML = "";
  for (let i = num1; i <= num2; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        lista.innerHTML += `<div class="poke ">
          <h3 class = 'name'>${data.name}</h3>

          <img src=${data.sprites.front_default} alt="" />

          <small class = 'none'>Experience : <span> + ${data.base_experience}</span></small>

          <p class = 'none'>${data.moves[0].move.name}</p>

         

          <button class="  btn-info" id=${data.id}>Ver Pokemon</button>
        </div>`;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Exito!");
      });
  }
};

/* funcion que aumenta valores  */

function sumar() {
  count1 += 20;
  count2 += 20;

  console.log(count1);
  getPokemon(count1, count2);
}

/* funcion que resta valores y verifica que llegue a cierto punto */
function restar() {
  if (count1 < 21) {
    alerta.classList.contains("none")
      ? alerta.classList.remove("none")
      : alerta.classList.add("none");
    alerta.textContent = "No es posible ir mas atrás";

    setTimeout(() => {
      alerta.textContent = "";
      alerta.classList.add("none");
    }, 1500);
  } else {
    count1 -= 20;
    count2 -= 20;
    getPokemon(count1, count2);
  }
}

getPokemon(count1, count2);

const marcarPoke = () => {
  document.addEventListener("click", (e) => {
    let point = e.target;
    if (point.classList.contains("btn-info")) {
      let pokeSelected = point.parentNode;

      crearPoke(pokeSelected);
    }
  });
};

/* funcion que muestra el detalle del pokemon seleccionado */

const crearPoke = (poke) => {
  const pokemon = {
    nombre: poke.querySelector("h3").textContent,
    img: poke.querySelector("img").src,
    experience: poke.querySelector("small").textContent,
    move: poke.querySelector("p").textContent,
  };

  const { nombre, img, experience, move } = pokemon;

  detail.innerHTML = `
<div class="poke big">
<div class="comand">

<div><button class="btn btn-close" onclick = quitPoke()></button></div>
</div>
<h3 class="name">${nombre}</h3>
          <img src=${img} alt="" />

          <div class="info">
          <div>
            <small> <Span> ${experience}</span></small>
          </div>
        
          <div>
            <p>Movimiento: <span class = "black"> ${move}</span></p>
          </div>
        </div>
        
         

         
        </div>`;

  body.classList.add("dark");
};

/* quita el modal del detalle de pokemon */
const quitPoke = () => {
  detail.innerHTML = "";

  body.classList.remove("dark");
};

const searchName = () => {
  let name = buscador.value.toLowerCase();

  console.log(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data) => {
      detail.innerHTML = `
    <div class="poke big">
    <div class="comand">
    
    <div><button class="btn btn-close" onclick = quitPoke()></button></div>
    </div>
    <h3 class="name">${data.name}</h3>
              <img src=${data.sprites.front_default} alt="img" />
    
              <div class="info">
              <div>
                <small> <Span> ${data.base_experience}</span></small>
              </div>
            
              <div>
                <p>Movimiento: <span class = "black"> ${data.moves[0].move.name}</span></p>
              </div>
            </div>
            
             
    
             
            </div>`;
      body.classList.add("dark");
    })
    .catch((err) => {
      console.log(err);
      alerta.classList.remove("none");
      alerta.textContent = "Pokemon no válido";
      setTimeout(() => {
        alerta.classList.add("none");
      }, 1500);
    });

  buscador.value = "";
};
