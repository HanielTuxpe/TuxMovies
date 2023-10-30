const key = "0728fd80cad38de6d046207fc9b0b8cb";
const url = new URL(window.location.href);
const movie_id = url.searchParams.get("id");

cargarDetalles(movie_id);

function cargarDetalles(movie_id) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=es&api_key=${key}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        const imgDet = document.getElementById("pelicula");
        imgDet.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        const detallesDiv = document.getElementById("detalles");
        const collectionInfo = data.belongs_to_collection ? `<p class="reparto descripcion">Colección: ${data.belongs_to_collection.name}</p>` : '';
        let languagesInfo = '';
        if (data.spoken_languages.length > 0) {
            const languages = data.spoken_languages.slice(0, 3).map(lang => lang.english_name).join(', ');
            languagesInfo = `<p class="reparto descripcion">Idiomas: ${languages}</p>`;
        }
        let generos = '';
        if (data.genres.length > 0) {
            const genress = data.genres.slice(0, 3).map(gen => gen.name).join(', ');
            generos = `<p class="reparto descripcion">Géneros: ${genress}</p>`;
        }
        let productoras = '';
        if (data.production_companies.length > 0) {
            const prods = data.genres.slice(0, 3).map(pro => pro.name).join(', ');
            productoras = `<p class="reparto descripcion">Géneros: ${prods}</p>`;
        }
        detallesDiv.innerHTML = `
        <h2>${data.title}</h2>
        <p class="reparto descripcion">Descripción: ${data.overview}</p>
        ${generos}
        <p class="reparto descripcion">Fecha de Estreno: ${data.release_date}</p>
        ${productoras}
        ${languagesInfo}
        ${collectionInfo}
      `;
    });
}

cargarRelacionados(movie_id);

function cargarRelacionados(movie_id) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?language=es&api_key=${key}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        const peliculasDiv = document.getElementById("contenedorP");
        data.results.slice(0, 5).forEach((pelicula) => {
            const peliculaDiv = document.createElement("div");
            peliculaDiv.className = "pelicula-relacionada";
            peliculaDiv.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <p>${pelicula.title}</p>`;
            peliculaDiv.addEventListener("click", () => {
                mostrarDetalles(pelicula.id);
            });
            peliculasDiv.appendChild(peliculaDiv);
        });
    });
}

function mostrarDetalles(peliculaId) {
    window.location.href = `detalle.html?id=${peliculaId}`;
}

