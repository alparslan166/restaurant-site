

// ================= SLIDER =================
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const dotsContainer = document.querySelector('.dots');
let index = 0;
let startX = 0;
let endX = 0;

// Dot'ları dinamik oluştur
images.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dots span');

function showSlide(i) {
  if (i < 0) index = images.length - 1;
  else if (i >= images.length) index = 0;
  else index = i;

  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

setInterval(() => showSlide(index + 1), 5000);
slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slides.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) showSlide(index + 1);
  if (endX - startX > 50) showSlide(index - 1);
});

// ================= KATEGORİLER =================
const categoryButtons = document.querySelectorAll('.categories button');
let currentCategory = "pizzalar";

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMain(currentCategory);
  });
});

// ================= ÜRÜN VERİSİ =================
const mainContent = document.getElementById('main-content');

const kategoriVerisi = {
  pizzalar: [
    { 
      isim: "Margarita", 
      resim: "./img/pizza3.jpeg", 
      fiyat: "90₺", 
      malzemeler: ["Domates", "Mozzarella", "Fesleğen"], 
      extras: [
        { isim: "Ekstra Patates", fiyat: "15₺", resim: "./img/patates.jpeg" },
        { isim: "Soğan Halkası", fiyat: "12₺", resim: "./img/sogan.jpeg" },
        { isim: "Ekstra Salata", fiyat: "10₺", resim: "./img/salata.jpeg" }
      ]
    },
    { 
      isim: "Pepperoni", 
      resim: "./img/pizza2.jpeg", 
      fiyat: "110₺", 
      malzemeler: ["Pepperoni", "Mozzarella", "Domates"], 
      extras: [
        { isim: "Ekstra Peynir", fiyat: "10₺", resim: "./img/peynir.jpg" },
        { isim: "Patates Kızartması", fiyat: "15₺", resim: "./img/patates.jpg" }
      ]
    },
    { 
      isim: "Margarita", 
      resim: "./img/pizza3.jpeg", 
      fiyat: "90₺", 
      malzemeler: ["Domates", "Mozzarella", "Fesleğen"], 
      extras: [
        { isim: "Ekstra Patates", fiyat: "15₺", resim: "./img/patates.jpeg" },
        { isim: "Soğan Halkası", fiyat: "12₺", resim: "./img/sogan.jpeg" },
        { isim: "Ekstra Salata", fiyat: "10₺", resim: "./img/salata.jpeg" }
      ]
    },
    { 
      isim: "Pepperoni", 
      resim: "./img/pizza2.jpeg", 
      fiyat: "110₺", 
      malzemeler: ["Pepperoni", "Mozzarella", "Domates"], 
      extras: [
        { isim: "Ekstra Peynir", fiyat: "10₺", resim: "./img/peynir.jpg" },
        { isim: "Patates Kızartması", fiyat: "15₺", resim: "./img/patates.jpg" }
      ]
    },
    { 
      isim: "Margarita", 
      resim: "./img/pizza3.jpeg", 
      fiyat: "90₺", 
      malzemeler: ["Domates", "Mozzarella", "Fesleğen"], 
      extras: [
        { isim: "Ekstra Patates", fiyat: "15₺", resim: "./img/patates.jpeg" },
        { isim: "Soğan Halkası", fiyat: "12₺", resim: "./img/sogan.jpeg" },
        { isim: "Ekstra Salata", fiyat: "10₺", resim: "./img/salata.jpeg" }
      ]
    },
    { 
      isim: "Pepperoni", 
      resim: "./img/pizza2.jpeg", 
      fiyat: "110₺", 
      malzemeler: ["Pepperoni", "Mozzarella", "Domates"], 
      extras: [
        { isim: "Ekstra Peynir", fiyat: "10₺", resim: "./img/peynir.jpg" },
        { isim: "Patates Kızartması", fiyat: "15₺", resim: "./img/patates.jpg" }
      ]
    },
    { 
      isim: "Margarita", 
      resim: "./img/pizza3.jpeg", 
      fiyat: "90₺", 
      malzemeler: ["Domates", "Mozzarella", "Fesleğen"], 
      extras: [
        { isim: "Ekstra Patates", fiyat: "15₺", resim: "./img/patates.jpeg" },
        { isim: "Soğan Halkası", fiyat: "12₺", resim: "./img/sogan.jpeg" },
        { isim: "Ekstra Salata", fiyat: "10₺", resim: "./img/salata.jpeg" }
      ]
    },
    { 
      isim: "Pepperoni", 
      resim: "./img/pizza2.jpeg", 
      fiyat: "110₺", 
      malzemeler: ["Pepperoni", "Mozzarella", "Domates"], 
      extras: [
        { isim: "Ekstra Peynir", fiyat: "10₺", resim: "./img/peynir.jpg" },
        { isim: "Patates Kızartması", fiyat: "15₺", resim: "./img/patates.jpg" }
      ]
    }
  ],
  hamburgerler: [
    { 
      isim: "Cheeseburger", 
      resim: "./img/burger1.jpg", 
      fiyat: "70₺", 
      malzemeler: ["Et", "Peynir", "Marul", "Domates"], 
      extras: [
        { isim: "Ekstra Peynir", fiyat: "10₺", resim: "./img/peynir.jpg" },
        { isim: "Soğan Halkası", fiyat: "12₺", resim: "./img/sogan.jpg" }
      ]
    }
  ],
  icecekler: [
    { 
      isim: "Kola", 
      resim: "./img/icecek1.jpg", 
      fiyat: "15₺", 
      malzemeler: ["Karbonatlı su", "Şeker"], 
      extras: []
    }
  ]
};

// ================= ANA LİSTE =================
function renderMain(category) {
  mainContent.innerHTML = "";
  kategoriVerisi[category].forEach(item => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${item.resim}" alt="${item.isim}">
      <div class="product-info">
        <p>${item.isim}</p>
        <p class="price">${item.fiyat}</p>
      </div>
    `;

    card.addEventListener('click', () => renderDetail(item));
    mainContent.appendChild(card);
  });
}

// ================= DETAY SAYFASI =================
function renderDetail(item) {
  mainContent.innerHTML = "";

  const malzemeListesi = item.malzemeler
    .map(m => `<li class="malzeme-item">${m}</li>`)
    .join("");

  const extrasListesi = item.extras.length > 0 
    ? item.extras.map(e => `
      <div class="extra-option">
        <img src="${e.resim}" alt="${e.isim}">
        <span class="extra-name">${e.isim}</span>
        <span class="extra-price">${e.fiyat}</span>
      </div>
    `).join("")
    : "<p class='no-extra'>Bu ürün için ekstra seçenek bulunmamaktadır.</p>";

  const detailHTML = `
    <div class="product-detail">
      <img src="${item.resim}" alt="${item.isim}" class="product-image">
      <div class="product-info">
        <h2 class="product-name">${item.isim}</h2>
        <p class="price">${item.fiyat}</p>

        <h3 class="section-title">Malzemeler:</h3>
        <ul class="malzemeler-list">${malzemeListesi}</ul>

        <h3 class="section-title">Ekstra Seçenekler:</h3>
        <div class="extras-container">${extrasListesi}</div>

        <button class="back-btn" aria-label="Geri Dön">Geri</button>
      </div>
    </div>
  `;

  mainContent.innerHTML = detailHTML;

  // Geri butonu
  const backBtn = mainContent.querySelector(".back-btn");
  backBtn.addEventListener("click", () => renderMain(currentCategory));

  // Ekstra ürün butonları (tıklama efekti)
  const extrasButtons = mainContent.querySelectorAll(".extra-option");
  extrasButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("selected");
      btn.style.backgroundColor = btn.classList.contains("selected")
        ? "#ffeef3"
        : "#fafafa";
    });
  });
   mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
}



const header = document.querySelector("header");
const categories = document.querySelector(".categories");

window.addEventListener("scroll", () => {
  const categoriesTop = categories.dataset.originalTop
    ? parseFloat(categories.dataset.originalTop)
    : categories.offsetTop;

  if (!categories.dataset.originalTop) {
    categories.dataset.originalTop = categoriesTop;
  }

  if (window.scrollY >= categoriesTop) {
    categories.classList.add("sticky");
  } else {
    categories.classList.remove("sticky");
  }
});




// ================= SAYFA BAŞLANGICI =================
// let currentCategory = "favoriler";
window.scrollTo(0, 0);

renderMain("pizzalar");

// Favoriler butonu aktif görünsün
document
  .querySelector('.categories button[data-category="pizzalar"]')
  ?.classList.add('active');

