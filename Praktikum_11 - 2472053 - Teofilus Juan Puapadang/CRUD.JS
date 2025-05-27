let produkList = [];

function loadProdukData() {
  const localData = localStorage.getItem("produkList");

  if (localData) {
    produkList = JSON.parse(localData);
    renderTable();
  } else {
    fetch("CRUD.json")
      .then(response => response.json())
      .then(data => {
        console.log("Data dari CRUD.json berhasil dipanggil:", data);
        produkList = data;
        saveAndRender();
      })
      .catch(error => {
        console.error("Gagal mengambil data dari CRUD.json:", error);
      });
  }
}


function generateId() {
  return produkList.length ? Math.max(...produkList.map(p => p.id)) + 1 : 1;
}


function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID").format(angka);
}


function renderTable() {
  const tbody = document.getElementById("produkTable");
  tbody.innerHTML = "";

  if (produkList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Tidak ada produk</td></tr>`;
    return;
  }

  produkList.forEach(produk => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${produk.id}</td>
      <td>${produk.nama}</td>
      <td>${formatRupiah(produk.harga)}</td>
      <td>${produk.deskripsi}</td>
      <td>${produk.stok}</td>
      <td class="actions">
        <button class="btn-edit" onclick="editProduk(${produk.id})">Edit</button>
        <button class="btn-delete" onclick="hapusProduk(${produk.id})">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}


function saveAndRender() {
  localStorage.setItem("produkList", JSON.stringify(produkList));
  renderTable();
  resetForm();
}


function resetForm() {
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
  document.getElementById("submitBtn").innerText = "Tambah Produk";
}


function addProduct(produk) {
  produkList.push(produk);
  saveAndRender();
}


function updateProduct(updatedProduct) {
  const index = produkList.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    produkList[index] = updatedProduct;
    saveAndRender();
  }
}

function hapusProduk(id) {
  if (confirm("Yakin ingin menghapus produk ini?")) {
    produkList = produkList.filter(p => p.id !== id);
    saveAndRender();
  }
}


function editProduk(id) {
  const produk = produkList.find(p => p.id === id);
  if (produk) {
    document.getElementById("productId").value = produk.id;
    document.getElementById("nama").value = produk.nama;
    document.getElementById("harga").value = produk.harga;
    document.getElementById("stok").value = produk.stok;
    document.getElementById("deskripsi").value = produk.deskripsi;
    document.getElementById("submitBtn").innerText = "Update Produk";
  }
}


document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("productId").value;
  const nama = document.getElementById("nama").value.trim();
  const harga = parseInt(document.getElementById("harga").value);
  const stok = parseInt(document.getElementById("stok").value);
  const deskripsi = document.getElementById("deskripsi").value.trim();

  if (!nama || isNaN(harga) || isNaN(stok)) {
    alert("Nama, harga, dan stok wajib diisi!");
    return;
  }

  const produk = {
    id: id ? parseInt(id) : generateId(),
    nama,
    harga,
    stok,
    deskripsi
  };

  if (id) {
    updateProduct(produk);
  } else {
    addProduct(produk);
  }
});


window.onload = loadProdukData;
