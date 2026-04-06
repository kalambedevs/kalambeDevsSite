// Data
const categories = [
  { 
    id: '1', 
    name: 'Signature Celebrations', 
    description: 'Our most popular, crowd-pleasing cakes for any occasion.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '2', 
    name: 'Occasion Gateaux', 
    description: 'Sophisticated, highly technical mirror-glaze masterpieces.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '3', 
    name: 'Tasting Assortments', 
    description: 'A curated tray of high-end, miniature patisserie creations.',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '4', 
    name: "The Signature 'Slice' Series", 
    description: 'An abstract, geometric deconstructed dessert concept.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800'
  }
];

const cakes = [
  { 
    id: '1', 
    name: 'Signature Gateaux', 
    price: 55, 
    category: 'Signature', 
    image: 'https://images.unsplash.com/photo-1557925923-33b251dc32d6?auto=format&fit=crop&q=80&w=800', 
    description: 'Decadent dark chocolate cake with silky chocolate ganache and truffle topping.',
    video: 'Firefly Extreme macro cinematography...mp4',
    badge: 'Limited Edition',
    gridClass: 'lg:col-span-2 lg:row-span-1'
  },
  { 
    id: '2', 
    name: 'Gourmet Toppings', 
    price: 50, 
    category: 'Gourmet', 
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800', 
    description: 'Fresh strawberries and whipped cream sandwiched between layers of vanilla sponge.',
    video: 'PixVerse_V5.6_Image_Text_360P...mp4',
    badge: 'Limited Edition',
    gridClass: 'lg:col-span-2 lg:row-span-1'
  },
  { id: '3', name: 'Lemon Raspberry', price: 55, category: 'Fruit', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800', description: 'Zesty lemon cake filled with tart raspberry compote and lemon buttercream.' },
  { id: '4', name: 'Caramel Macchiato', price: 65, category: 'Premium', image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=800', description: 'Espresso-infused cake layers with salted caramel filling and coffee buttercream.' },
  { id: '5', name: 'Classic Vanilla Bean', price: 45, category: 'Classic', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800', description: 'Light, fluffy vanilla sponge layered with rich Madagascar vanilla bean buttercream.' },
  { id: '6', name: 'Artisan Decor', price: 60, category: 'Premium', image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800', description: 'Classic red velvet with our signature cream cheese frosting and pecan crumble.' }
];

const chefs = [
  { id: '1', name: 'Isabella Rossi', role: 'Head Pastry Chef', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400', description: 'Trained in Paris, Isabella brings 15 years of classical French pastry experience.' },
  { id: '2', name: 'Marcus Chen', role: 'Cake Designer', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400', description: 'An artist turned baker, Marcus specializes in gravity-defying custom sculptures.' },
  { id: '3', name: 'Sarah Jenkins', role: 'Flavor Specialist', image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=400', description: 'Sarah is the genius behind our unique flavor combinations and seasonal menus.' }
];

// State
let cart = [];
let checkoutState = {
  step: 1,
  type: 'cart', // 'cart', 'cake', 'custom'
  cakeId: null,
  data: {
    size: 'Medium',
    message: '',
    address: '',
    phone: '',
    paymentMethod: 'Credit/Debit Card'
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  renderCategories();
  renderMenu();
  renderChefs();
  
  setupNavigation();
  setupCart();
  setupCustomOrder();
  setupAnimations();
  setupCustomScrollbar();
  
  lucide.createIcons();
});

function setupCustomScrollbar() {
  const track = document.getElementById('custom-scrollbar-track');
  const thumb = document.getElementById('custom-scrollbar-thumb');
  if (!track || !thumb) return;
  
  let isScrolling;
  
  function updateScrollbar() {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = window.scrollY;
    
    if (scrollHeight <= clientHeight) {
      thumb.style.opacity = '0';
      return;
    }
    
    const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 40);
    const maxScrollTop = scrollHeight - clientHeight;
    const scrollPercentage = scrollTop / maxScrollTop;
    const thumbTop = scrollPercentage * (clientHeight - thumbHeight);
    
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${thumbTop}px)`;
    thumb.style.opacity = '1';
    
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      thumb.style.opacity = '0';
    }, 500);
  }
  
  window.addEventListener('scroll', updateScrollbar, { passive: true });
  window.addEventListener('resize', updateScrollbar);
  updateScrollbar();
}

// Rendering Functions
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  grid.innerHTML = categories.map((cat, i) => {
    const offsetClass = i % 2 !== 0 ? 'md:mt-24' : '';
    const isOccasionGateaux = cat.name === 'Occasion Gateaux';
    
    // Color logic for all category cards to ensure readability and premium feel
    const titleColor = 'text-[#F0F8FF]';
    const descColor = 'text-[#F0F8FF]/90';
    const btnClass = 'bg-white/10 backdrop-blur-sm border-[#F0F8FF] text-[#F0F8FF] hover:bg-[#F0F8FF] hover:text-cocoa';
    const arrowColor = 'text-[#F0F8FF]';

    return `
      <div class="group relative flex flex-col ${offsetClass} animate-on-scroll delay-${(i % 2 + 1) * 100}">
        <div class="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 bg-white border border-divider">
          <div class="aspect-[4/5] w-full overflow-hidden relative">
            <img src="${cat.image}" alt="${cat.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 z-10" />
            <!-- Subtle Dark Gradient Overlay for Readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[15] opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div class="absolute bottom-6 left-6 right-6 backdrop-blur-xl border border-white/20 p-6 rounded-2xl transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
            <h3 class="text-2xl font-serif font-bold ${titleColor} mb-2">${cat.name}</h3>
            <p class="text-sm ${descColor} font-light leading-relaxed mb-4 line-clamp-2">${cat.description}</p>
            <a href="#menu" class="inline-flex items-center justify-center gap-2 ${btnClass} border font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:-translate-y-1 group/btn w-full sm:w-auto">
              <span>View Collection</span>
              <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform ${arrowColor}"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = cakes.map((cake, i) => {
    const isVideo = !!cake.video;
    return `
      <div class="collection-card group relative flex flex-col ${cake.gridClass || ''} animate-on-scroll" style="perspective: 1000px;">
        <div class="relative h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 bg-white flex flex-col hover:-translate-y-2">
          <!-- Image/Video Container (70%) -->
          <div class="relative h-[70%] overflow-hidden">
            <img src="${cake.image}" alt="${cake.name}" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 z-10 group-hover:opacity-0 group-hover:scale-105" />
            ${isVideo ? `<video src="${cake.video}" muted loop playsinline class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></video>` : ''}
            
            <!-- Content Overlay (On Image) -->
            <div class="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <h3 class="text-3xl font-serif font-bold text-[#F0F8FF] mb-2">${cake.name}</h3>
              <p class="text-sm font-sans text-[#F0F8FF]/90 mb-6 line-clamp-2 leading-relaxed">${cake.description}</p>
              <div class="flex items-center justify-between">
                <span class="text-2xl font-semibold text-[#F0F8FF]">$${cake.price}</span>
                <a href="#menu" class="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-[#F0F8FF] text-[#F0F8FF] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:bg-[#F0F8FF] hover:text-cocoa group/btn">
                  <span>View Collection</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Bottom Part (30%) - Pure White Base -->
          <div class="h-[30%] bg-white p-8 flex flex-col justify-center">
             <div class="flex items-center gap-2 mb-2">
               <div class="w-8 h-[1px] bg-pink/30"></div>
               <span class="text-[10px] text-cocoa/40 uppercase tracking-[0.3em] font-bold">Artisan Series</span>
             </div>
             <div class="flex items-center justify-between">
               <span class="text-xs font-serif font-bold text-cocoa tracking-widest uppercase">Handcrafted</span>
               <div class="flex gap-1">
                 <div class="w-1 h-1 rounded-full bg-pink"></div>
                 <div class="w-1 h-1 rounded-full bg-pink/40"></div>
                 <div class="w-1 h-1 rounded-full bg-pink/20"></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Add video hover listeners
  const cards = document.querySelectorAll('.collection-card');
  cards.forEach(card => {
    const video = card.querySelector('video');
    if (video) {
      card.addEventListener('mouseenter', () => video.play());
      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  setupCollectionInteractions();
}

function setupCollectionInteractions() {
  const cards = document.querySelectorAll('.collection-card');
  
  cards.forEach(card => {
    const video = card.querySelector('video');
    
    card.addEventListener('mouseenter', () => {
      if (video) {
        video.play().catch(err => console.log("Video play blocked:", err));
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  });
}

function renderChefs() {
  const grid = document.getElementById('chefs-grid');
  grid.innerHTML = chefs.map((chef, i) => `
    <div class="bg-white border border-divider rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,77,108,0.08)] transition-all duration-500 text-center group animate-on-scroll delay-${(i % 3 + 1) * 100}">
      <div class="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-2 border-transparent group-hover:border-pink transition-colors duration-500 p-1">
        <img src="${chef.image}" alt="${chef.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';" class="w-full h-full object-cover rounded-full group-hover:brightness-105 transition-all duration-500" />
      </div>
      <h4 class="text-xl font-serif font-bold text-cocoa mb-2">${chef.name}</h4>
      <p class="text-pink text-xs uppercase tracking-widest font-semibold mb-4">${chef.role}</p>
      <p class="text-cocoa text-sm font-light leading-relaxed">${chef.description}</p>
    </div>
  `).join('');
}

  // Navigation
  function setupNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navTextElements = document.querySelectorAll('.nav-text-color');
  
    window.addEventListener('scroll', () => {
      if (currentView !== 'home') return;
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.remove('bg-transparent', 'border-transparent');
        navbar.classList.add('bg-white/70', 'backdrop-blur-md', 'shadow-sm', 'border-divider');
        navTextElements.forEach(el => {
          el.classList.remove('text-white');
          el.classList.add('text-cocoa');
        });
      } else {
        navbar.classList.add('bg-transparent', 'border-transparent');
        navbar.classList.remove('bg-white/70', 'backdrop-blur-md', 'shadow-sm', 'border-divider');
        navTextElements.forEach(el => {
          el.classList.add('text-white');
          el.classList.remove('text-cocoa');
        });
      }
    });

  mobileMenuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('max-h-0')) {
      mobileMenu.classList.remove('max-h-0', 'opacity-0');
      mobileMenu.classList.add('max-h-96', 'opacity-100');
    } else {
      mobileMenu.classList.add('max-h-0', 'opacity-0');
      mobileMenu.classList.remove('max-h-96', 'opacity-100');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetView = e.currentTarget.getAttribute('data-target');
      if (targetView) {
        showView(targetView);
      }
      // Close mobile menu if open
      if (!mobileMenu.classList.contains('max-h-0')) {
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        mobileMenu.classList.remove('max-h-96', 'opacity-100');
      }
    });
  });

  document.getElementById('cart-btn').addEventListener('click', () => {
    showView('cart');
    renderCartView();
  });
}

let currentView = 'home';

function showView(viewId) {
  currentView = viewId;
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.getElementById(`view-${viewId}`).classList.add('active');
  window.scrollTo(0, 0);
  
  // Update navbar state based on view
  const navbar = document.getElementById('navbar');
  const navTextElements = document.querySelectorAll('.nav-text-color');
  
  if (viewId !== 'home') {
    navbar.classList.remove('bg-transparent', 'border-transparent');
    navbar.classList.add('bg-white/70', 'backdrop-blur-md', 'shadow-sm', 'border-divider');
    navTextElements.forEach(el => {
      el.classList.remove('text-white');
      el.classList.add('text-cocoa');
    });
  } else {
    // On home view, let the scroll listener handle it
    if (window.scrollY < 50) {
      navbar.classList.add('bg-transparent', 'border-transparent');
      navbar.classList.remove('bg-white/70', 'backdrop-blur-md', 'shadow-sm', 'border-divider');
      navTextElements.forEach(el => {
        el.classList.add('text-white');
        el.classList.remove('text-cocoa');
      });
    }
  }
}

// Cart Logic
function setupCart() {
  updateCartBadge();
}

window.addToCart = function(cakeId) {
  const cake = cakes.find(c => c.id === cakeId);
  const existing = cart.find(item => item.id === cakeId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...cake, quantity: 1 });
  }
  updateCartBadge();
  
  // Optional: Add a simple toast notification here
  alert(`${cake.name} added to cart!`);
};

window.removeFromCart = function(cakeId) {
  cart = cart.filter(item => item.id !== cakeId);
  updateCartBadge();
  renderCartView();
};

window.updateQuantity = function(cakeId, newQty) {
  if (newQty < 1) {
    removeFromCart(cakeId);
    return;
  }
  const item = cart.find(item => item.id === cakeId);
  if (item) {
    item.quantity = newQty;
    updateCartBadge();
    renderCartView();
  }
};

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCartView() {
  const container = document.getElementById('cart-content');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center py-12">
        <div class="w-24 h-24 bg-white border border-divider rounded-full flex items-center justify-center mx-auto mb-6 text-pink shadow-sm">
          <i data-lucide="shopping-bag" class="w-12 h-12"></i>
        </div>
        <h2 class="text-3xl font-serif font-bold text-cocoa mb-4">Your Cart is Empty</h2>
        <p class="text-cocoa mb-8 max-w-md mx-auto font-light tracking-wide">Looks like you haven't added any delicious cakes yet. Let's fix that!</p>
        <button onclick="showView('home')" class="inline-flex bg-transparent border border-pink text-pink hover:bg-pink hover:text-white font-semibold px-8 py-3 rounded-full uppercase tracking-widest text-sm transition-all">
          Browse Menu
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const cartTotal = getCartTotal();
  
  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2 space-y-6">
        ${cart.map(item => `
          <div class="bg-white border border-divider p-4 sm:p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
            <div class="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-divider">
              <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow text-center sm:text-left">
              <h3 class="text-xl font-serif font-bold text-cocoa mb-1">${item.name}</h3>
              <p class="text-pink font-semibold mb-4">$${item.price}</p>
              <div class="flex items-center justify-center sm:justify-start gap-4">
                <div class="flex items-center bg-white border border-divider rounded-full p-1 shadow-sm">
                  <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="w-8 h-8 flex items-center justify-center text-cocoa-light hover:text-pink hover:bg-pink/10 rounded-full transition-colors">
                    <i data-lucide="minus" class="w-4 h-4"></i>
                  </button>
                  <span class="w-10 text-center font-medium text-cocoa">${item.quantity}</span>
                  <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="w-8 h-8 flex items-center justify-center text-cocoa-light hover:text-pink hover:bg-pink/10 rounded-full transition-colors">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                  </button>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="text-cocoa-light hover:text-red-500 transition-colors p-2 bg-white border border-divider rounded-full shadow-sm hover:bg-red-50">
                  <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
              </div>
            </div>
            <div class="text-xl font-semibold text-cocoa">
              $${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="lg:col-span-1">
        <div class="bg-white border border-divider p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] sticky top-28">
          <h3 class="text-2xl font-serif font-bold text-cocoa mb-6 border-b border-divider pb-4">Order Summary</h3>
          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-cocoa-light font-light tracking-wide">
              <span>Subtotal</span>
              <span class="text-cocoa font-medium">$${cartTotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-cocoa-light font-light tracking-wide">
              <span>Taxes</span>
              <span class="text-cocoa font-medium">$${(cartTotal * 0.05).toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-cocoa-light font-light tracking-wide">
              <span>Delivery</span>
              <span class="text-cocoa font-medium">Calculated at next step</span>
            </div>
            <div class="border-t border-divider pt-4 flex justify-between text-xl font-bold text-pink">
              <span>Total</span>
              <span>$${(cartTotal * 1.05).toFixed(2)}</span>
            </div>
          </div>
          <button onclick="startCheckout('cart')" class="w-full bg-transparent border border-pink text-pink hover:bg-pink hover:text-white font-semibold py-4 rounded-full uppercase tracking-widest text-sm transition-all flex justify-center items-center gap-2">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  `;
  lucide.createIcons();
}

// Custom Order
function setupCustomOrder() {
  const occasionTiles = document.querySelectorAll('.occasion-tile');
  const flavorItems = document.querySelectorAll('.flavor-item');
  const continueBtn = document.getElementById('configurator-continue');
  
  const previewImg = document.getElementById('configurator-preview-image');
  const video1 = document.getElementById('configurator-preview-video-1');
  const video2 = document.getElementById('configurator-preview-video-2');
  const previewTitle = document.getElementById('preview-title');
  const previewDesc = document.getElementById('preview-desc');
  
  let selectedOccasion = '';
  let selectedFlavor = '';
  
  const flavorData = {
    'Vanilla Bean': {
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
      title: 'Pure Vanilla Bean',
      desc: 'Madagascar vanilla bean sponge with silky buttercream.'
    },
    'Rich Chocolate': {
      image: 'https://images.unsplash.com/photo-1557925923-33b251dc32d6?auto=format&fit=crop&q=80&w=1200',
      title: 'Midnight Chocolate',
      desc: '70% dark Belgian chocolate with ganache layers.'
    },
    'Strawberry': {
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=1200',
      title: 'Summer Strawberry',
      desc: 'Fresh farm-picked strawberries with light whipped cream.'
    }
  };

  function updatePreview() {
    if (selectedFlavor) {
      const data = flavorData[selectedFlavor];
      previewImg.src = data.image;
      previewTitle.textContent = data.title;
      previewDesc.textContent = data.desc;
    }
    
    if (selectedOccasion && selectedFlavor) {
      continueBtn.classList.add('bg-pink', 'text-[#F0F8FF]');
      continueBtn.classList.remove('text-pink');
    } else {
      continueBtn.classList.remove('bg-pink', 'text-[#F0F8FF]');
      continueBtn.classList.add('text-pink');
    }
  }

  occasionTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      occasionTiles.forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      selectedOccasion = tile.dataset.value;
      updatePreview();
    });
    
    tile.addEventListener('mouseenter', () => {
      video2.classList.add('opacity-100');
      video2.play().catch(err => console.log("Video play blocked:", err));
    });
    
    tile.addEventListener('mouseleave', () => {
      video2.classList.remove('opacity-100');
      video2.pause();
      video2.currentTime = 0;
    });
  });

  flavorItems.forEach(item => {
    item.addEventListener('click', () => {
      flavorItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedFlavor = item.dataset.value;
      updatePreview();
    });
    
    item.addEventListener('mouseenter', () => {
      video1.classList.add('opacity-100');
      video1.play().catch(err => console.log("Video play blocked:", err));
    });
    
    item.addEventListener('mouseleave', () => {
      video1.classList.remove('opacity-100');
      video1.pause();
      video1.currentTime = 0;
    });
  });

  continueBtn.addEventListener('click', () => {
    if (!selectedOccasion || !selectedFlavor) {
      alert('Please select both an occasion and a flavor.');
      return;
    }
    checkoutState.customData = { category: selectedOccasion, flavor: selectedFlavor };
    startCheckout('custom');
  });
}

// Checkout Logic
window.startCheckout = function(type, cakeId = null) {
  checkoutState = {
    step: 1,
    type,
    cakeId,
    data: { size: 'Medium', message: '', address: '', phone: '', paymentMethod: 'Credit/Debit Card' }
  };
  showView('checkout');
  renderCheckoutStep();
};

function renderCheckoutStep() {
  const { step, type, cakeId, data } = checkoutState;
  const content = document.getElementById('checkout-step-content');
  const header = document.getElementById('checkout-header');
  
  // Hide header on success step
  if (step === 5) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
    
    // Update progress bar
    document.getElementById('checkout-progress').style.width = `${((step - 1) / 3) * 100}%`;
    
    // Update step indicators
    document.querySelectorAll('.checkout-step-indicator').forEach(indicator => {
      const s = parseInt(indicator.getAttribute('data-step'));
      const circle = indicator.querySelector('.step-circle');
      const label = indicator.querySelector('.step-label');
      
      if (step > s) {
        circle.className = 'step-circle w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 bg-pink text-white shadow-[0_10px_20px_rgba(255,77,108,0.3)]';
        circle.innerHTML = '<i data-lucide="check-circle-2" class="w-5 h-5"></i>';
        label.className = 'step-label text-xs font-semibold uppercase tracking-wider hidden sm:block text-pink';
      } else if (step === s) {
        circle.className = 'step-circle w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 bg-pink text-white shadow-[0_10px_20px_rgba(255,77,108,0.3)]';
        circle.innerHTML = s;
        label.className = 'step-label text-xs font-semibold uppercase tracking-wider hidden sm:block text-pink';
      } else {
        circle.className = 'step-circle w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 bg-white text-cocoa-light border border-divider';
        circle.innerHTML = s;
        label.className = 'step-label text-xs font-semibold uppercase tracking-wider hidden sm:block text-cocoa-light';
      }
    });

    // Setup Back Button
    const backBtn = document.getElementById('checkout-back-btn');
    backBtn.onclick = () => {
      if (step > 1) {
        checkoutState.step -= 1;
        renderCheckoutStep();
      } else {
        if (type === 'cart') showView('cart');
        else showView('home');
      }
    };
    document.getElementById('checkout-back-text').textContent = step === 1 ? 'Back' : 'Previous Step';
  }

  // Calculate Prices
  let basePrice = 0;
  if (type === 'cart') {
    basePrice = getCartTotal() * 1.05; // Including tax
  } else if (type === 'cake') {
    const cake = cakes.find(c => c.id === cakeId);
    basePrice = cake ? cake.price : 0;
  } else if (type === 'custom') {
    basePrice = 60;
  }

  const sizeMultiplier = data.size === 'Small' ? 0.8 : data.size === 'Large' ? 1.5 : 1;
  const finalPrice = basePrice * sizeMultiplier;
  const advancePayment = finalPrice * 0.5;

  // Render Step Content
  if (step === 1) {
    content.innerHTML = `
      <h2 class="text-3xl font-serif font-bold text-cocoa mb-2">Select Size</h2>
      <p class="text-cocoa font-light tracking-wide mb-8">Choose the perfect size for your occasion.</p>
      <form id="checkout-form">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          ${['Small', 'Medium', 'Large'].map(size => `
            <label class="cursor-pointer rounded-2xl border-2 p-6 text-center transition-all ${data.size === size ? 'border-pink bg-pink/5 shadow-[0_10px_20px_rgba(255,77,108,0.1)]' : 'border-divider hover:border-pink/30 bg-white'}">
              <input type="radio" name="size" value="${size}" ${data.size === size ? 'checked' : ''} class="hidden" onchange="updateCheckoutData('size', this.value)" />
              <span class="block font-serif text-xl font-bold text-cocoa mb-1">${size}</span>
              <span class="text-sm text-cocoa-light font-light">${size === 'Small' ? '0.5 kg (4-6 pax)' : size === 'Medium' ? '1 kg (8-10 pax)' : '2 kg (15-20 pax)'}</span>
            </label>
          `).join('')}
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-transparent border border-pink text-pink hover:bg-pink hover:text-white font-semibold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-all flex items-center gap-2">
            Next Step <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>
      </form>
    `;
  } else if (step === 2) {
    content.innerHTML = `
      <h2 class="text-3xl font-serif font-bold text-cocoa mb-2">Add a Message</h2>
      <p class="text-cocoa font-light tracking-wide mb-8">What would you like written on the cake?</p>
      <form id="checkout-form">
        <div class="mb-10">
          <label class="block text-sm font-semibold text-pink uppercase tracking-widest mb-3">Cake Message (Optional)</label>
          <input type="text" placeholder="e.g., Happy Birthday Sarah!" value="${data.message}" oninput="updateCheckoutData('message', this.value); document.getElementById('msg-count').textContent = this.value.length;" maxlength="40" class="w-full bg-white border-2 border-divider rounded-xl px-4 py-4 focus:outline-none focus:border-pink text-cocoa text-lg font-light transition-colors placeholder-gray-400" />
          <p class="text-right text-xs text-cocoa-light mt-2 font-light"><span id="msg-count">${data.message.length}</span>/40 characters</p>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-transparent border border-pink text-pink hover:bg-pink hover:text-white font-semibold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-all flex items-center gap-2">
            Next Step <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>
      </form>
    `;
  } else if (step === 3) {
    content.innerHTML = `
      <h2 class="text-3xl font-serif font-bold text-cocoa mb-2">Delivery Details</h2>
      <p class="text-cocoa font-light tracking-wide mb-8">Where should we send this sweet treat?</p>
      <form id="checkout-form" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-pink uppercase tracking-widest mb-3">Full Address</label>
          <textarea required rows="3" placeholder="Street address, apartment, city, zip code" onchange="updateCheckoutData('address', this.value)" class="w-full bg-white border-2 border-divider rounded-xl px-4 py-4 focus:outline-none focus:border-pink text-cocoa font-light resize-none transition-colors placeholder-gray-400">${data.address}</textarea>
        </div>
        <div class="mb-10">
          <label class="block text-sm font-semibold text-pink uppercase tracking-widest mb-3">Contact Number</label>
          <input required type="tel" placeholder="+1 (555) 000-0000" value="${data.phone}" onchange="updateCheckoutData('phone', this.value)" class="w-full bg-white border-2 border-divider rounded-xl px-4 py-4 focus:outline-none focus:border-pink text-cocoa font-light transition-colors placeholder-gray-400" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-transparent border border-pink text-pink hover:bg-pink hover:text-white font-semibold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-all flex items-center gap-2">
            Next Step <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>
      </form>
    `;
  } else if (step === 4) {
    content.innerHTML = `
      <h2 class="text-3xl font-serif font-bold text-cocoa mb-2">Payment</h2>
      <p class="text-cocoa font-light tracking-wide mb-8">Secure your order with a 50% advance payment.</p>
      
      <div class="bg-white border-2 border-divider rounded-2xl p-6 mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-cocoa-light font-light tracking-wide">Total Amount:</span>
          <span class="font-medium text-cocoa">$${finalPrice.toFixed(2)}</span>
        </div>
        <div class="flex justify-between items-center text-lg">
          <span class="font-serif font-bold text-cocoa">Advance Required (50%):</span>
          <span class="font-bold text-pink text-2xl">$${advancePayment.toFixed(2)}</span>
        </div>
      </div>

      <form id="checkout-form">
        <div class="space-y-4 mb-10">
          <label class="block text-sm font-semibold text-pink uppercase tracking-widest mb-3">Select Payment Method</label>
          ${['UPI', 'Credit/Debit Card'].map(method => `
            <label class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${data.paymentMethod === method ? 'border-pink bg-pink/5 shadow-[0_5px_15px_rgba(255,77,108,0.1)]' : 'border-divider hover:border-pink/30 bg-white'}">
              <input type="radio" name="payment" value="${method}" ${data.paymentMethod === method ? 'checked' : ''} onchange="updateCheckoutData('paymentMethod', this.value)" class="w-5 h-5 text-pink focus:ring-pink border-divider bg-white" />
              <span class="ml-4 font-medium tracking-wide text-cocoa">${method}</span>
            </label>
          `).join('')}
        </div>
        <div class="flex justify-end">
          <button type="submit" class="w-full sm:w-auto bg-transparent border border-pink text-pink hover:bg-pink hover:text-white font-semibold px-12 py-4 rounded-full uppercase tracking-widest text-sm transition-all">
            Place Order
          </button>
        </div>
      </form>
    `;
  } else if (step === 5) {
    content.innerHTML = `
      <div class="text-center">
        <div class="w-24 h-24 bg-white border-2 border-pink rounded-full flex items-center justify-center mx-auto mb-6 text-pink shadow-[0_10px_30px_rgba(255,77,108,0.2)]">
          <i data-lucide="check-circle-2" class="w-12 h-12"></i>
        </div>
        <h2 class="text-4xl font-serif font-bold text-cocoa mb-4">Order Placed!</h2>
        <div class="bg-pink/5 border border-pink/20 rounded-2xl p-6 mb-8 inline-block max-w-md mx-auto">
          <p class="text-pink font-medium tracking-wide text-lg leading-relaxed">
            "This is not a real website. This is a replica/demo created for a client project."
          </p>
        </div>
        <p class="text-cocoa font-light tracking-wide mb-8">Thank you for trying out the checkout flow.</p>
        <button onclick="showView('home')" class="bg-transparent border border-pink text-pink hover:bg-pink hover:text-white font-semibold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-all">
          Return to Home
        </button>
      </div>
    `;
    if (type === 'cart') {
      cart = [];
      updateCartBadge();
    }
  }

  // Attach submit handler
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      checkoutState.step += 1;
      renderCheckoutStep();
    });
  }

  lucide.createIcons();
}

window.updateCheckoutData = function(field, value) {
  checkoutState.data[field] = value;
  if (field === 'size' || field === 'paymentMethod') {
    renderCheckoutStep();
  }
};

// Scroll Animations
function setupAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
