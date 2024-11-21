const cardprincipal = document.getElementById('cardprincipal');
const spinner = document.getElementById('spinner');

spinner.innerHTML = `
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
`;

fetch("./public/data.json")
  .then((res) => {
    if (!res.ok) {  // Si la respuesta NO es correcta
      throw { ok: false, msg: "Error 404" };
    }
    return res.json();
  })
  .then((data) => 
    data.forEach((item) => {
      cardprincipal.innerHTML += card(item);  // Usar la función 'card' para generar contenido
    })
  )
  .catch((err) => {
    cardprincipal.innerHTML = err.msg || "Error 404";  // Mostrar el error personalizado si lo hay
  })
  .finally(() => {
    setTimeout(() => {
      spinner.innerHTML = " ";  // Limpiar el spinner después de 1 segundo
    }, 1000);
  });


// Función para determinar la clase del botón según el stock
const btnclass = (stock) => {
  return stock > 0 ? "btn-primary" : "btn-danger disabled";
}

// Función que crea la tarjeta (card) de cada álbum
function card(albums) {
  const { album, artista, genero, stock } = albums;  // Desestructuramos 'albums'

  return `
    <div class="card mb-2" style="width: 18rem;">
      <img src="https://via.placeholder.com/150" class="card-img-top" alt="placeholder image">
      <div class="card-body">
        <h4 class="card-title">${album}</h4>
        <p class="card-text">${artista} - ${genero}</p>
        <p class="fs-6">Disponible: ${stock} </p>
        <a href="#" class="btn ${btnclass(stock)}">Comprar</a>
      </div>
    </div>
  `;
}
