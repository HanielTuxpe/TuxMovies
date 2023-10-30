function openNav()
{
    document.getElementById("Movil-menu").style.width = "25%"
}

function closeNav()
{
    document.getElementById("Movil-menu").style.width = "0%"; 
}

const key = "0728fd80cad38de6d046207fc9b0b8cb";

fetch(`https://api.themoviedb.org/3/genre/movie/list?language=es&api_key=${key}`)
.then((response) => response.json())
.then((data) => {
  console.log(data);
  const genresList = document.getElementById("genres");
  data.genres.forEach((genero) => {
    const li = document.createElement("li");
    const genreLink = document.createElement("a");
    genreLink.textContent = genero.name;
    genreLink.href = `generos.html?genres_id=${genero.id}&genre_name=${genero.name}`; 
    li.setAttribute("data-id", genero.id);
    li.appendChild(genreLink);
    genresList.appendChild(li);
  });
});