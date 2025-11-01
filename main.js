import { kategoriVerisi } from './veri.js';

// ================= SLIDER =================
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const dotsContainer = document.querySelector('.dots');
let index = 0;

// Dot'ları dinamik oluştur
images.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dots span');

// Slider gösterme fonksiyonu
function showSlide(i) {
  if (i < 0) index = images.length - 1;
  else if (i >= images.length) index = 0;
  else index = i;

  slides.style.transition = "transform 0.8s ease-in-out"; // yumuşak geçiş
  slides.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Otomatik geçiş (5 saniye)
setInterval(() => {
  showSlide(index + 1);
}, 5000);


// 🔥 Mobil dokunma kaydırma desteği

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

