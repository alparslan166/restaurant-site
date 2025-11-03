import { kategoriVerisi } from './veri.js';

//! ------------------------------------

// ================= SLIDER =================
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

// Dot'ları dinamik oluştur
images.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dots span');

let startX = 0;
let isDragging = false;

function showSlide(i) {
  if (i < 0) index = images.length - 1;
  else if (i >= images.length) index = 0;
  else index = i;

  slides.style.transition = "transform 0.8s ease-in-out";
  slides.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Otomatik geçiş (5 saniye)
setInterval(() => {
  showSlide(index + 1);
}, 5000);

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));
//!-----------------__-___---------

// ================= KATEGORİLER =================
const categoryButtons = document.querySelectorAll('.categories button');
var currentCategory = "favoriler";

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMain(currentCategory);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });
});

// ================= ÜRÜN VERİSİ =================

// main.js
const mainContent = document.getElementById('main-content');

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

  // Malzemeler
  const malzemeListesi = (item.malzemeler || [])
    .map(m => `<li class="malzeme-item">${m}</li>`)
    .join("");

  // Ekstra listesi kontrolü — undefined veya boş olabilir
  const extras = item.extras || []; // yoksa boş dizi ver
  const extrasListesi = extras.length > 0
    ? extras.map(e => `
        <div class="extra-option">
          <img src="${e.resim}" alt="${e.isim}">
          <span class="extra-name">${e.isim}</span>
          <span class="extra-price">${e.fiyat}</span>
        </div>
      `).join("")
    : ""; // Hiçbir şey eklemesin

  // Ana HTML
  const detailHTML = `
    <div class="product-detail">
      <img src="${item.resim}" alt="${item.isim}" class="product-image">
      <div class="product-info">
        <h2 class="product-name">${item.isim}</h2>
        <p class="price">${item.fiyat}</p>

        ${currentCategory !== "icecekler" && item.malzemeler && item.malzemeler.length > 0 ? `
          <h3 class="section-title">Malzemeler:</h3>
          <ul class="malzemeler-list">${malzemeListesi}</ul>
        ` : ""}


        ${extras.length > 0 ? `
          <h3 class="section-title">Ekstra Seçenekler:</h3>
          <div class="extras-container">${extrasListesi}</div>
        ` : ""}
        
        <button class="back-btn" aria-label="Geri Dön">Geri</button>
      </div>
    </div>
  `;

  mainContent.innerHTML = detailHTML;

  // Geri butonu
  const backBtn = mainContent.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
  renderMain(currentCategory);
  window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });



  // Ekstra ürün butonları (varsa)
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

const infoBanner = document.getElementById('info-banner');

function updateBanner(category) {
  infoBanner.classList.remove('show');
  infoBanner.style.display = 'none';
  infoBanner.textContent = '';

  if (category === 'tatlilar') {
    infoBanner.textContent = '🍰 Bütün tatlılar 70 TL!';
    infoBanner.style.display = 'block';
    requestAnimationFrame(() => infoBanner.classList.add('show'));
  } 
  else if (category === 'favoriler') {
    infoBanner.textContent = '⭐️ EN ÇOK SATANLAR!!';
    infoBanner.style.display = 'block';
    requestAnimationFrame(() => infoBanner.classList.add('show'));
  }
}

// 🔸 Butonlara tıklanınca çalıştır
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    updateBanner(currentCategory);
  });
});

// 🔸 Sayfa ilk yüklendiğinde aktif kategoriye göre başlat
updateBanner(currentCategory);





// ================= SAYFA BAŞLANGICI =================
// let currentCategory = "favoriler";
window.scrollTo(0, 0);

renderMain("favoriler");

// Favoriler butonu aktif görünsün
document
  .querySelector('.categories button[data-category="favoriler"]')
  ?.classList.add('active');

