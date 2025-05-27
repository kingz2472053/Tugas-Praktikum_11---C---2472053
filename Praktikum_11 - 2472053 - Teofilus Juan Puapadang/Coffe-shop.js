fetch('DataCoffe.json')
  .then(response => response.json())
  .then(data => {
    console.log("Data dari DataCoffe.json berhasil dipanggil:", data);

    const container = document.getElementById('menu');
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-item';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price">${item.price}</div>
      `;
      
     
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';a
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
      
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Gagal mengambil data dari DataCoffe.json:', error);
  });
