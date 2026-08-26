/* =========================================================
   DATA PRODUK
   Ganti / tambah item sesuai stok aplikasi kamu.
========================================================= */
const WA_NUMBER = "6289523410422"; // Nomor WhatsApp OyPremium

const products = [
  {
    name: "Gemini AI Pro 1 Bulan",
    desc: "1 Bulan Akses Premium, Full Garansi",
    price: "Rp 18.000",
    oldPrice: "Rp 20.000",
    image: "images/Gemini1.png",
    tag: "Best Seller",
    shopeeUrl: "https://s.shopee.co.id/2g9NgZaNVO" // Ganti dengan link produk Shopee spesifik
  },
  {
    name: "Gemini AI Pro + VEO 3",
    desc: "Akses VEO 3, 1000 Credits",
    price: "Rp 18.000",
    oldPrice: "Rp 20.000",
    image: "images/Gemini1.1.png",
    tag: "Populer",
    shopeeUrl: "https://s.shopee.co.id/9zvyQ7BFEA"
  },
  {
    name: "Gemini Head Private 1000Flow",
    desc: "Private 1 Pengguna",
    price: "Rp 45.000",
    oldPrice: "Rp 50.000",
    image: "images/Gemini1.3.png",
    tag: "Diskon",
    shopeeUrl: "https://s.shopee.co.id/1gHm5tdrP6"
  },
  {
    name: "Drive 5TB Private",
    desc: "Paket Sultan 18 Bulan Garansi Penuh",
    price: "Rp 11.000",
    oldPrice: null,
    image: "images/Drive.png",
    tag: null,
    shopeeUrl: "https://s.shopee.co.id/5LA8rUz5Zg"
  },
  {
    name: "Youtube Premium",
    desc: "Bebas Iklan, Putar Latar Belakang, YT Music",
    price: "Rp 14.000",
    oldPrice: null,
    image: "images/Youtube.png",
    tag: null,
    shopeeUrl: "https://s.shopee.co.id/2qU3CowtSR"
  },
  {
    name: "Capcut Pro",
    desc: "Unlock Semua Fitur Pro, Tanpa Watermark",
    price: "Rp 14.000",
    oldPrice: "Rp 16.000",
    image: "images/Macam.png",
    tag: "Hemat",
    shopeeUrl: "https://s.shopee.co.id/60R4yfWpZx"
  },
  {
    name: "Gemini AI Pro 3 Bulan",
    desc: "3 Bulan Akses + 3000 Credits + VEO 3",
    price: "Rp 45.000",
    oldPrice: null,
    image: "images/Gemini1.2.png",
    tag: null,
    shopeeUrl: "https://s.shopee.co.id/903REFcGpp"
  },
  {
    name: "Gemini AI Pro 6 Bulan",
    desc: "6 Bulan Akses Premium Hemat, Full Garansi",
    price: "Rp 75.000",
    oldPrice: null,
    image: "images/Gemini1.4.png",
    tag: null,
    shopeeUrl: "https://s.shopee.co.id/6L2g3Oy4A3"
  },
  {
    name: "Gemini AI Pro 12 Bulan",
    desc: "1 Tahun Penuh Akses AI Pro Resmi",
    price: "Rp 120.000",
    oldPrice: "Rp 140.000",
    image: "images/Gemini1.5.png",
    tag: "Populer",
    shopeeUrl: "https://s.shopee.co.id/9KgHcu4r1J"
  },
  {
    name: "Gemini Head 18 Bulan",
    desc: "Paket Sultan 18 Bulan Garansi Penuh",
    price: "Rp 240.000",
    oldPrice: null,
    image: "images/Gemini1.6.png",
    tag: null,
    shopeeUrl: "https://s.shopee.co.id/9zxDk0ZT7e"
  }
];

/* =========================================================
   RENDER PRODUK
========================================================= */
const productsGrid = document.getElementById("productsGrid");
const noResult = document.getElementById("noResult");

function renderProducts(list){
  productsGrid.innerHTML = "";
  if(list.length === 0){
    noResult.hidden = false;
    return;
  }
  noResult.hidden = true;

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const message = encodeURIComponent(`Halo OyPremium, saya mau order ${p.name}`);

    card.innerHTML = `
      <div class="product-thumb">
        ${p.tag ? `<span class="product-badge">${p.tag}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" class="product-img">
      </div>
      <div class="product-info">
        <div class="product-title">${p.name}</div>
        <div class="product-desc">${p.desc || ""}</div>
        <div class="product-bottom">
          <div class="product-price">
            ${p.price}
            ${p.oldPrice ? `<small>${p.oldPrice}</small>` : ""}
          </div>
          <div class="product-actions">
            <a class="product-buy btn-wa" href="https://wa.me/${WA_NUMBER}?text=${message}" target="_blank" rel="noopener">
              WA
            </a>
            <a class="product-buy btn-shopee" href="${p.shopeeUrl || 'https://shopee.co.id/oypremium'}" target="_blank" rel="noopener">
              Shopee
            </a>
          </div>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

renderProducts(products);

/* Search (filter produk) */
function filterProducts(keyword){
  const kw = keyword.trim().toLowerCase();
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(kw) || 
    (p.desc && p.desc.toLowerCase().includes(kw))
  );
  renderProducts(filtered);
}

const productSearch = document.getElementById("productSearch");
if (productSearch) {
  productSearch.addEventListener("input", () => filterProducts(productSearch.value));
}

/* Sinkronkan pencarian dari navbar ke #apps */
function goToAppsWithSearch(keyword){
  if (productSearch) {
    productSearch.value = keyword;
    filterProducts(keyword);
  }
  document.getElementById("apps")?.scrollIntoView({ behavior:"smooth" });
}

const topSearchInput = document.getElementById("topSearchInput");
const topSearchGo = document.getElementById("topSearchGo");
if (topSearchGo && topSearchInput) {
  topSearchGo.addEventListener("click", () => goToAppsWithSearch(topSearchInput.value));
  topSearchInput.addEventListener("keydown", e => { if(e.key === "Enter") goToAppsWithSearch(topSearchInput.value); });
}

const navSearchInput = document.getElementById("navSearchInput");
const navSearchBtn = document.getElementById("navSearchBtn");
if (navSearchBtn && navSearchInput) {
  navSearchBtn.addEventListener("click", () => { goToAppsWithSearch(navSearchInput.value); closeMobileMenu(); });
  navSearchInput.addEventListener("keydown", e => { if(e.key === "Enter"){ goToAppsWithSearch(navSearchInput.value); closeMobileMenu(); } });
}

/* =========================================================
   NAVBAR & HAMBURGER
========================================================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function closeMobileMenu(){
  if (hamburger && navLinks) {
    hamburger.classList.remove("open", "active");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener("click", () => closeMobileMenu());
});

/* Search toggle (desktop dropdown) */
const searchToggle = document.getElementById("searchToggle");
const searchDropdown = document.getElementById("searchDropdown");
if (searchToggle && searchDropdown) {
  searchToggle.addEventListener("click", () => {
    searchDropdown.classList.toggle("open");
    if(searchDropdown.classList.contains("open") && topSearchInput) topSearchInput.focus();
  });
}

/* =========================================================
   CAROUSEL
========================================================= */
const track = document.getElementById("carouselTrack");
if (track) {
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  let current = 0;
  let autoplayTimer = null;

  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
  }
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  function updateSlide(){
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function goToSlide(i){
    current = (i + slides.length) % slides.length;
    updateSlide();
    resetAutoplay();
  }

  function nextSlide(){ goToSlide(current + 1); }
  function prevSlide(){ goToSlide(current - 1); }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  function startAutoplay(){ autoplayTimer = setInterval(nextSlide, 5000); }
  function resetAutoplay(){ clearInterval(autoplayTimer); startAutoplay(); }

  startAutoplay();

  const carousel = document.getElementById("carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
    carousel.addEventListener("mouseleave", startAutoplay);
  }

  /* Swipe Touch */
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive:true });
  track.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if(Math.abs(diff) > 40){
      diff > 0 ? nextSlide() : prevSlide();
    }
  }, { passive:true });
}

/* =========================================================
   FOOTER YEAR
========================================================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();