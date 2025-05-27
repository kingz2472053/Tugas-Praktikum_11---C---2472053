function showMovies() {
  const container = document.getElementById('moviesContainer');
  container.style.display = 'block';

  fetch('movies.json')
    .then(response => response.json())
    .then(data => {
      console.log("Data dari movies.json berhasil dipanggil:", data);

      const grid = document.getElementById('menu');
      grid.innerHTML = ''; 
      data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'movie-card fade-in';

        card.innerHTML = `
          <img src="${item.img}" alt="${item.title}" class="movie-poster" />
          <div class="movie-info">
            <h3 class="movie-title">${item.title}</h3>
            <p class="movie-genres">Genre: ${item.genre}</p>
          </div>
        `;

        grid.appendChild(card);
      });
    })
   

}
