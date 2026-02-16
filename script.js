// ========================================
// OYPREMIUM MARKETPLACE - JavaScript
// ========================================

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// WhatsApp Admin
const ADMIN_WA = '6289523410422';

// ========================================
// WhatsApp Handler
// ========================================
function openWhatsApp(message) {
  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

document.querySelectorAll('[data-wa]').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = btn.getAttribute('data-msg') || 'Halo OYPREMIUM, saya tertarik dengan layanan Anda.';
    openWhatsApp(msg);
  });
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking links
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href') || '';
    const hash = href.includes('#') ? `#${href.split('#')[1]}` : '';

    if (hash) {
      e.preventDefault();
      handleNavShortcut(hash);
      history.replaceState(null, '', hash);
    }
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !mobileToggle.contains(e.target)) {
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========================================
// Product Filter
// ========================================
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');
const searchInput = document.getElementById('searchProduct');
const noResults = document.getElementById('noResults');

function filterProducts(category) {
  let visibleCount = 0;
  const searchTerm = searchInput.value.toLowerCase().trim();

  productCards.forEach(card => {
    const cardCategories = card.getAttribute('data-category').split(' ');
    const productName = card.querySelector('.product-name').textContent.toLowerCase();
    
    const matchesCategory = category === 'all' || cardCategories.includes(category);
    const matchesSearch = !searchTerm || productName.includes(searchTerm);
    
    if (matchesCategory && matchesSearch) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const category = tab.getAttribute('data-filter');
    filterProducts(category);
  });
});

searchInput.addEventListener('input', () => {
  const activeTab = document.querySelector('.filter-tab.active');
  const category = activeTab.getAttribute('data-filter');
  filterProducts(category);
});
function activateFilterTab(filterName) {
  const targetTab = document.querySelector(`.filter-tab[data-filter="${filterName}"]`);
  if (!targetTab) return;

  targetTab.click();
}

function scrollToElementWithOffset(target) {
  if (!target) return;

  const offsetTop = target.offsetTop - 72;
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
}

function handleNavShortcut(hash) {
  const filterSection = document.querySelector('.filter-section');

  if (hash === '#apps') {
    searchInput.value = '';
    activateFilterTab('popular');
    scrollToElementWithOffset(filterSection || document.querySelector('#apps'));
    return true;
  }

  if (hash === '#sosmed') {
    searchInput.value = '';
    activateFilterTab('new');
    scrollToElementWithOffset(filterSection || document.querySelector('#apps'));
    return true;
  }

  return false;
}
// ========================================
// Product Detail Modal
// ========================================
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');

// Product Data
const productsData = {
  youtube: {
    name: 'YouTube Premium',
    icon: 'images/yt.png',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #dd5d5d 100%)',
    desc: 'Nikmati YouTube tanpa iklan dengan kualitas premium. Akses YouTube Music dan download video untuk ditonton offline.',
    plans: [
      { name: 'FAMHEAD', note: 'Bisa invite 5 member (Bisa ACC Seller/Buyer \harga tetap sama\)', price: 'Rp 15.000', period: '/bulan', msg: 'YouTube Premium - FAMHEAD (Rp 15K/bulan)' },
      { name: 'FAMPLAN', note: 'Via invite (Bisa ACC Seller/Buyer \harga tetap sama\)', price: 'Rp 5.000', period: '/bulan', msg: 'YouTube Premium - FAMPLAN (Rp 5K/bulan)' },
      { name: 'INDIVIDUAL', note: 'Akun pribadi (Bisa ACC Seller/Buyer \harga tetap sama\)', price: 'Rp 15.000', period: '/bulan', msg: 'YouTube Premium - INDIVIDUAL (Rp 15K/bulan)' }
    ],
    features: [
      'Semua paket dapat ACC dari Oypremium',
      'Bebas iklan di semua device',
      'YouTube Music Premium included',
      'Download untuk offline',
      'Background play',
      'Full garansi 1 bulan',
      'Support fast response'
    ]
  },
  gemini: {
    name: 'Gemini AI PRO',
    icon: 'images/Ge.png',
    gradient: 'linear-gradient(135deg, #a2c3f6 0%, #e49797 100%)',
    desc: 'AI assistant canggih dari Google untuk membantu pekerjaan, riset, coding, dan creative tasks dengan kemampuan multimodal.',
    plans: [
      { name: 'HEAD', note: 'Bisa invite 5 member (Bisa ACC Seller/Buyer \harga tetap sama\)', price: 'Rp 15.000', period: '/bulan', msg: 'Gemini AI PRO - HEAD (Rp 15K/bulan)' },
      { name: 'FAMPLAN', note: 'Join via invite (Bisa ACC Seller/Buyer \harga tetap sama\)', price: 'Rp 6.000', period: '/bulan', msg: 'Gemini AI PRO - FAMPLAN (Rp 6K/bulan)' }
    ],
    features: [
      
      'Semua paket dapat ACC dari Oypremium',
      'Penyimpanan Drive 2TB',
      'VEO 3',
      'Nano banana',
      'Private Account',
      'Full garansi 1 bulan',
      'Support fast response'
    ]
  },
  canva: {
    name: 'Canva Pro',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #00C4CC 0%, #7D2AE8 100%)',
    desc: 'Platform desain grafis #1 dengan jutaan template premium, brand kit, background remover, dan kolaborasi tim.',
    plans: [
      { name: 'MONTHLY', note: 'Perpanjang bulanan', price: 'Rp 3.000', period: '/bulan', msg: 'Canva Pro - MONTHLY (Rp 3K/bulan)' }
    ],
    features: [
      '100+ juta premium stock',
      'Brand Kit & Magic Resize',
      'Background Remover',
      'Unlimited storage',
      'Full garansi 1 bulan',
      'Tutorial & support'
    ]
  },
  capcut: {
    name: 'CapCut Pro',
    icon: '✂️',
    gradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
    desc: 'Editor video profesional dengan AI-powered features. Perfect untuk content creator TikTok, Instagram, dan YouTube.',
    plans: [
      { name: 'MONTHLY', note: 'All features unlocked', price: 'Rp 5.000', period: '/bulan', msg: 'CapCut Pro - MONTHLY (Rp 5K/bulan)' }
    ],
    features: [
      'AI video enhancement',
      'Advanced editing tools',
      'Premium transitions & effects',
      'Export tanpa watermark',
      'Full garansi 1 bulan',
      'Support fast response'
    ]
  },
  chatgpt: {
    name: 'ChatGPT Business',
    icon: 'images/ch.png',
    gradient: 'linear-gradient(135deg, #10A37F 0%, #087F5B 100%)',
    desc: 'AI assistant paling canggih untuk produktivitas, riset, coding, dan creative writing. Powered by GPT-4 Turbo.',
    plans: [
      { name: 'HEAD', note: 'Bisa invite 4 member (ACC Seller)', price: 'Rp 30.000', period: '/bulan', msg: 'ChatGPT Business - HEAD (Rp 30K/bulan)' },
      { name: 'PRIVATE MEMBER', note: 'Private member (Bisa ACC Seller/Buyer \harga tetap sama\)', price: 'Rp 10.000', period: '/bulan', msg: 'ChatGPT Business - PRIVATE MEMBER (Rp 10K/bulan)' }
    ],
    features: [
      
      'Full garansi 1 bulan',
      'Support fast response'
    ]
  },
  spotify: {
    name: 'Spotify Premium',
    icon: '🎵',
    gradient: 'linear-gradient(135deg, #1DB954 0%, #1AA34A 100%)',
    desc: 'Streaming musik premium dengan 100+ juta lagu, podcast, dan audiobook. Bebas iklan dengan kualitas audio terbaik.',
    plans: [
      { name: 'MONTHLY', note: 'Personal account', price: 'Rp 8.000', period: '/bulan', msg: 'Spotify Premium - MONTHLY (Rp 8K/bulan)' }
    ],
    features: [
      'Ad-free listening',
      'Offline download',
      'High quality audio',
      '100M+ songs & podcasts',
      'Full garansi 1 bulan',
      'Support fast response'
    ]
  },
  netflix: {
    name: 'Netflix Premium',
    icon: '📺',
    gradient: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
    desc: 'Platform streaming film & series terbaik dunia. Konten original berkualitas tinggi dengan subtitle Indonesia.',
    plans: [
      { name: 'SHARED', note: '1 profile shared', price: 'Rp 25.000', period: '/bulan', msg: 'Netflix Premium - SHARED (Rp 25K/bulan)' }
    ],
    features: [
      '4K Ultra HD streaming',
      '4 devices simultaneous',
      'Unlimited movies & series',
      'Download untuk offline',
      'Full garansi 1 bulan',
      'Login assistance'
    ]
  },
  disney: {
    name: 'Disney+ Hotstar',
    icon: '🏰',
    gradient: 'linear-gradient(135deg, #113CCF 0%, #0E2B8F 100%)',
    desc: 'Streaming Disney, Pixar, Marvel, Star Wars, dan konten Hotstar Premium. Termasuk live sports dan original series.',
    plans: [
      { name: 'MONTHLY', note: 'Premium subscription', price: 'Rp 15.000', period: '/bulan', msg: 'Disney+ Hotstar - MONTHLY (Rp 15K/bulan)' }
    ],
    features: [
      'Disney+ & Hotstar Premium',
      'Live sports streaming',
      '4K HDR content',
      'Download untuk offline',
      'Full garansi 1 bulan',
      'Support fast response'
    ]
  },
  instagram: {
    name: 'Instagram Followers',
    icon: 'images/ig.png',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #857c81 100%)',
    desc: 'Followers real Indonesia dengan sistem follow manual. Bukan bot, bisa like & komen, permanent & bergaransi.',
    plans: [
      { name: '20 Followers', note: 'Real Indo • Manual', price: 'Rp 2.000', period: '', msg: 'Instagram Followers - 20 Followers (Rp 2K)' },
      { name: '50 Followers', note: 'Real Indo • Manual', price: 'Rp 5.000', period: '', msg: 'Instagram Followers - 50 Followers (Rp 5K)' },
      { name: '100 Followers', note: 'Real Indo • Manual', price: 'Rp 9.000', period: '', msg: 'Instagram Followers - 100 Followers (Rp 9K)' }
    ],
    features: [
      'Akun real Indonesia',
      'Sistem follow manual',
      'Bukan bot / web',
      '100% permanent',
      'Private account bisa',
      'Bergaransi & support'
    ]
  }
};

function showProductDetail(productKey) {
  const product = productsData[productKey];
  if (!product) return;

  modalBody.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-header">
        <div class="product-detail-png" style="background: ${product.gradient};">
  ${
    typeof product.icon === 'string' && product.icon.match(/\.(png|jpe?g|svg|webp)$/i)
      ? `<img src="${product.icon}" alt="${product.name}" class="detail-icon-img">`
      : product.icon
  }
</div>

        </div>
        <div>
          <h2 class="product-detail-name">${product.name}</h2>
          <p class="product-detail-desc">${product.desc}</p>
        </div>
      </div>

      <div class="product-detail-plans">
        <h3 class="plans-title">Pilih Paket</h3>
        ${product.plans.map(plan => `
          <div class="plan-card">
            <div class="plan-header">
              <div>
                <div class="plan-name">${plan.name}</div>
                <div class="plan-note">${plan.note}</div>
              </div>
              <div class="plan-price-box">
                <div class="plan-price">${plan.price}</div>
                ${plan.period ? `<div class="plan-period">${plan.period}</div>` : ''}
              </div>
            </div>
            <button class="plan-order-btn" onclick="orderProduct('${plan.msg}')">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 9.5C15 12.5376 12.5376 15 9.5 15C7.51046 15 5.75421 13.8707 4.81836 12.2056L2 13L2.79444 10.1816C2.28769 9.35842 2 8.39788 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>Pesan via WhatsApp</span>
            </button>
          </div>
        `).join('')}
      </div>

      <div class="product-detail-features">
        <h3 class="features-title">✨ Keuntungan</h3>
        <ul class="features-list">
          ${product.features.map(feature => `
            <li>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" fill="#10B981" opacity="0.2"/>
                <path d="M6 10L9 13L14 8" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>${feature}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function orderProduct(message) {
  closeModal();
  openWhatsApp(`Halo OYPREMIUM, saya mau pesan ${message}.`);
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.classList.contains('nav-link') || this.classList.contains('mobile-link')) {
      return;
    }
    const href = this.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      scrollToElementWithOffset(target);
    }
  });
});

// ========================================
// Initialize
// ========================================
window.addEventListener('load', () => {
  // Initial filter
  filterProducts('all');
  
  console.log('%c OYPREMIUM MARKETPLACE ', 
    'background: linear-gradient(135deg, #10B981 0%, #1E3A8A 100%); color: white; font-size: 18px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
  console.log('%c Premium Digital Services 🚀 ', 
    'color: #10B981; font-size: 14px; font-weight: 600;');
});

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
  .product-detail {
    padding: 1rem 0;
  }

  .product-detail-header {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
  }

  .product-detail-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    font-size: 2.5rem;
    flex-shrink: 0;
    box-shadow: var(--shadow-lg);
  }

  .product-detail-name {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .product-detail-desc {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .plans-title,
  .features-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .product-detail-plans {
    margin-bottom: 2rem;
  }

  .plan-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .plan-card:last-child {
    margin-bottom: 0;
  }

  .plan-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .plan-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .plan-note {
    font-size: 13px;
    color: var(--text-muted);
  }

  .plan-price-box {
    text-align: right;
  }

  .plan-price {
    font-size: 1.25rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .plan-period {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: -4px;
  }

  .plan-order-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: var(--gradient-primary);
    border: none;
    border-radius: var(--border-radius-sm);
    color: var(--white);
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition);
  }

  .plan-order-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
  }

  .plan-order-btn svg {
    stroke: currentColor;
  }

  .features-list {
    list-style: none;
    display: grid;
    gap: 0.75rem;
  }

  .features-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-secondary);
    font-size: 15px;
  }

  .features-list li svg {
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .product-detail-header {
      flex-direction: column;
    }

    .plan-header {
      flex-direction: column;
      gap: 0.75rem;
    }

    .plan-price-box {
      text-align: left;
    }
  }
`;
document.head.appendChild(modalStyles);
// ===== NAV ACTIVE + COVER PINDAH =====
(function () {
  const nav = document.getElementById("mainNav");
  const indicator = document.getElementById("navIndicator");
  const links = Array.from(document.querySelectorAll(".nav-link"));

  if (!nav || !indicator || !links.length) return;

  function moveIndicator(el) {
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const x = elRect.left - navRect.left;

    indicator.style.width = `${elRect.width}px`;
    indicator.style.transform = `translate(${x}px, -50%)`;
  }

  function setActive(el) {
    links.forEach(a => a.classList.remove("active"));
    el.classList.add("active");
    moveIndicator(el);
  }

  // klik -> pindah active + cover pindah + scroll smooth
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;

      e.preventDefault();
      setActive(link);

      const handledByShortcut = handleNavShortcut(hash);
      if (!handledByShortcut) {
        const target = document.querySelector(hash);
        scrollToElementWithOffset(target);
      }
      history.replaceState(null, "", hash);
    });
  });

  // init pertama kali
  window.addEventListener("load", () => {
    // kalau ada hash
    if (location.hash) {
      const byHash = links.find(a => a.getAttribute("href") === location.hash);
     
      if (byHash) {
        setActive(byHash);

        if (!handleNavShortcut(location.hash)) {
          const target = document.querySelector(location.hash);
          scrollToElementWithOffset(target);
        }

        return;
      }
    }

    // default: yang sudah active, kalau tidak ada -> link pertama
    const active = links.find(a => a.classList.contains("active")) || links[0];
    setActive(active);
  });

  // biar tetap pas kalau resize
  window.addEventListener("resize", () => {
    const active = links.find(a => a.classList.contains("active")) || links[0];
    moveIndicator(active);
  });
})();
