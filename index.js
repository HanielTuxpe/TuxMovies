const key = "0728fd80cad38de6d046207fc9b0b8cb";

fetch(`https://api.themoviedb.org/3/discover/movie?language=es&api_key=${key}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    const peliculasDiv = document.getElementById("contenedorP");
    data.results.forEach((pelicula) => {
      const peliculaDiv = document.createElement("div");
      peliculaDiv.className = "pelicula";
      peliculaDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <p>${pelicula.title}</p>`;
      peliculaDiv.addEventListener("click", () => {
        mostrarDetalles(pelicula.id);
      });
      peliculasDiv.appendChild(peliculaDiv);
    });
  });

function mostrarDetalles(peliculaId) {
  window.location.href = `detalle.html?id=${peliculaId}`;
}
