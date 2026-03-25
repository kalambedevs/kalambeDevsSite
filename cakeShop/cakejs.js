// Data
const categories = [
  { id: '1', name: 'Wedding Cakes', image: '../Assets/Images/weddingCake.avif' },
  { id: '2', name: 'Birthday Cakes', image: '../Assets/Images/birthdayCake.avif' },
  { id: '3', name: 'Cupcakes', image: '../Assets/Images/cupCake.avif' },
  { id: '4', name: 'Custom Designs', image: '../Assets/Images/customCake.avif' }
];

const cakes = [
  { id: '1', name: 'Classic Vanilla Bean', price: 300, category: 'Classic', image: '../Assets/Images/beenCake.jpeg', description: 'Light, fluffy vanilla sponge layered with rich Madagascar vanilla bean buttercream.' },
  { id: '2', name: 'Dark Chocolate Truffle', price: 450, category: 'Chocolate', image: '../Assets/Images/truffelCake.webp', description: 'Decadent dark chocolate cake with silky chocolate ganache and truffle topping.' },
  { id: '3', name: 'Strawberry Shortcake', price: 500, category: 'Fruit', image: '../Assets/Images/stroberryCake.jpg', description: 'Fresh strawberries and whipped cream sandwiched between layers of vanilla sponge.' },
  { id: '4', name: 'Red Velvet Dream', price: 700, category: 'Premium', image: '../Assets/Images/redvelvetCake.jpeg', description: 'Classic red velvet with our signature cream cheese frosting and pecan crumble.' },
  { id: '5', name: 'Lemon Raspberry', price: 150, category: 'Fruit', image: '../Assets/Images/lemonCupcake.jpg', description: 'Zesty lemon cake filled with tart raspberry compote and lemon buttercream.' },
  { id: '6', name: 'Caramel Macchiato', price: 650, category: 'Premium', image: '../Assets/Images/caramelCake.webp', description: 'Espresso-infused cake layers with salted caramel filling and coffee buttercream.' }
];

const chefs = [
  { id: '1', name: 'Isabella Rossi', role: 'Head Pastry Chef', image: '../Assets/Images/chef1.avif', description: 'Trained in Paris, Isabella brings 15 years of classical French pastry experience.' },
  { id: '2', name: 'Marcus Chen', role: 'Cake Designer', image: '../Assets/Images/chef1.avi2', description: 'An artist turned baker, Marcus specializes in gravity-defying custom sculptures.' },
  { id: '3', name: 'Sarah Jenkins', role: 'Flavor Specialist', image: '../Assets/Images/chef3.avif', description: 'Sarah is the genius behind our unique flavor combinations and seasonal menus.' }
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
    paymentMethod: 'UPI'
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
  
  lucide.createIcons();
});

// Rendering Functions
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  grid.innerHTML = categories.map((cat, i) => `
    <div class="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 animate-on-scroll delay-${(i % 4 + 1) * 100}">
      <div class="aspect-[4/5] w-full overflow-hidden">
        <img src="${cat.image}" alt="${cat.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-choco-900/80 via-choco-900/20 to-transparent flex items-end p-6">
        <h3 class="text-2xl font-serif font-bold text-white group-hover:-translate-y-2 transition-transform duration-300">${cat.name}</h3>
      </div>
    </div>
  `).join('');
}

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = cakes.map((cake, i) => `
    <div class="bg-cream-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group animate-on-scroll delay-${(i % 3 + 1) * 100}">
      <div class="relative h-64 overflow-hidden">
        <img src="${cake.image}" alt="${cake.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-rose-500">${cake.category}</div>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-serif font-bold text-choco-900 line-clamp-1">${cake.name}</h3>
          <span class="text-xl font-bold text-rose-500">₹${cake.price}</span>
        </div>
        <p class="text-choco-800/70 text-sm mb-6 flex-grow line-clamp-2">${cake.description}</p>
        <div class="flex gap-3 mt-auto">
          <button onclick="startCheckout('cake', '${cake.id}')" class="flex-1 bg-choco-900 hover:bg-choco-800 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <i data-lucide="credit-card" class="w-4 h-4"></i> Buy Now
          </button>
          <button onclick="addToCart('${cake.id}')" class="flex-1 bg-rose-100 hover:bg-rose-200 text-rose-600 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderChefs() {
  const grid = document.getElementById('chefs-grid');
  grid.innerHTML = chefs.map((chef, i) => `
    <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center group animate-on-scroll delay-${(i % 3 + 1) * 100}">
      <div class="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-cream-100 group-hover:border-rose-200 transition-colors">
        <img src="${chef.image}" alt="${chef.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';" class="w-full h-full object-cover" />
      </div>
      <h4 class="text-xl font-serif font-bold text-choco-900 mb-1">${chef.name}</h4>
      <p class="text-rose-500 font-medium mb-4">${chef.role}</p>
      <p class="text-choco-800/70 text-sm">${chef.description}</p>
    </div>
  `).join('');
}

// Navigation
function setupNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

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

function showView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.getElementById(`view-${viewId}`).classList.add('active');
  window.scrollTo(0, 0);
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
        <div class="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
          <i data-lucide="shopping-bag" class="w-12 h-12"></i>
        </div>
        <h2 class="text-3xl font-serif font-bold text-choco-900 mb-4">Your Cart is Empty</h2>
        <p class="text-choco-800/70 mb-8 max-w-md mx-auto">Looks like you haven't added any delicious cakes yet. Let's fix that!</p>
        <button onclick="showView('home')" class="inline-flex bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all">
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
          <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div class="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
              <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow text-center sm:text-left">
              <h3 class="text-xl font-serif font-bold text-choco-900 mb-1">${item.name}</h3>
              <p class="text-rose-500 font-semibold mb-4">$${item.price}</p>
              <div class="flex items-center justify-center sm:justify-start gap-4">
                <div class="flex items-center bg-cream-100 rounded-full p-1">
                  <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="w-8 h-8 flex items-center justify-center text-choco-800 hover:bg-white rounded-full transition-colors">
                    <i data-lucide="minus" class="w-4 h-4"></i>
                  </button>
                  <span class="w-10 text-center font-medium text-choco-900">${item.quantity}</span>
                  <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="w-8 h-8 flex items-center justify-center text-choco-800 hover:bg-white rounded-full transition-colors">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                  </button>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="text-choco-800/50 hover:text-rose-500 transition-colors p-2">
                  <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
              </div>
            </div>
            <div class="text-xl font-bold text-choco-900">
              $${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="lg:col-span-1">
        <div class="bg-white p-8 rounded-3xl shadow-sm sticky top-28">
          <h3 class="text-2xl font-serif font-bold text-choco-900 mb-6 border-b border-cream-100 pb-4">Order Summary</h3>
          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-choco-800">
              <span>Subtotal</span>
              <span class="font-medium">$${cartTotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-choco-800">
              <span>Taxes</span>
              <span class="font-medium">$${(cartTotal * 0.05).toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-choco-800">
              <span>Delivery</span>
              <span class="font-medium">Calculated at next step</span>
            </div>
            <div class="border-t border-cream-100 pt-4 flex justify-between text-xl font-bold text-choco-900">
              <span>Total</span>
              <span>$${(cartTotal * 1.05).toFixed(2)}</span>
            </div>
          </div>
          <button onclick="startCheckout('cart')" class="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2">
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
  document.getElementById('custom-order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('custom-category').value;
    const flavor = document.getElementById('custom-flavor').value;
    
    if (category && flavor) {
      checkoutState.customData = { category, flavor };
      startCheckout('custom');
    }
  });
}

// Checkout Logic
window.startCheckout = function(type, cakeId = null) {
  checkoutState = {
    step: 1,
    type,
    cakeId,
    data: { size: 'Medium', message: '', address: '', phone: '', paymentMethod: 'UPI' }
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
        circle.className = 'step-circle w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 bg-rose-500 text-white';
        circle.innerHTML = '<i data-lucide="check-circle-2" class="w-5 h-5"></i>';
        label.className = 'step-label text-xs font-semibold uppercase tracking-wider hidden sm:block text-rose-500';
      } else if (step === s) {
        circle.className = 'step-circle w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 bg-rose-500 text-white';
        circle.innerHTML = s;
        label.className = 'step-label text-xs font-semibold uppercase tracking-wider hidden sm:block text-rose-500';
      } else {
        circle.className = 'step-circle w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 bg-white text-choco-800 border-2 border-cream-200';
        circle.innerHTML = s;
        label.className = 'step-label text-xs font-semibold uppercase tracking-wider hidden sm:block text-choco-800/50';
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
      <h2 class="text-3xl font-serif font-bold text-choco-900 mb-2">Select Size</h2>
      <p class="text-choco-800/60 mb-8">Choose the perfect size for your occasion.</p>
      <form id="checkout-form">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          ${['Small', 'Medium', 'Large'].map(size => `
            <label class="cursor-pointer rounded-2xl border-2 p-6 text-center transition-all ${data.size === size ? 'border-rose-500 bg-rose-50 shadow-md' : 'border-cream-200 hover:border-rose-300'}">
              <input type="radio" name="size" value="${size}" ${data.size === size ? 'checked' : ''} class="hidden" onchange="updateCheckoutData('size', this.value)" />
              <span class="block font-serif text-xl font-bold text-choco-900 mb-1">${size}</span>
              <span class="text-sm text-choco-800/60">${size === 'Small' ? '0.5 kg (4-6 pax)' : size === 'Medium' ? '1 kg (8-10 pax)' : '2 kg (15-20 pax)'}</span>
            </label>
          `).join('')}
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-4 rounded-xl shadow-md transition-all flex items-center gap-2">
            Next Step <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>
      </form>
    `;
  } else if (step === 2) {
    content.innerHTML = `
      <h2 class="text-3xl font-serif font-bold text-choco-900 mb-2">Add a Message</h2>
      <p class="text-choco-800/60 mb-8">What would you like written on the cake?</p>
      <form id="checkout-form">
        <div class="mb-10">
          <label class="block text-sm font-semibold text-choco-900 uppercase tracking-wider mb-3">Cake Message (Optional)</label>
          <input type="text" placeholder="e.g., Happy Birthday Sarah!" value="${data.message}" oninput="updateCheckoutData('message', this.value); document.getElementById('msg-count').textContent = this.value.length;" maxlength="40" class="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-rose-400 text-choco-900 text-lg" />
          <p class="text-right text-xs text-choco-800/50 mt-2"><span id="msg-count">${data.message.length}</span>/40 characters</p>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-4 rounded-xl shadow-md transition-all flex items-center gap-2">
            Next Step <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>
      </form>
    `;
  } else if (step === 3) {
    content.innerHTML = `
      <h2 class="text-3xl font-serif font-bold text-choco-900 mb-2">Delivery Details</h2>
      <p class="text-choco-800/60 mb-8">Where should we send this sweet treat?</p>
      <form id="checkout-form" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-choco-900 uppercase tracking-wider mb-3">Full Address</label>
          <textarea required rows="3" placeholder="Street address, apartment, city, zip code" onchange="updateCheckoutData('address', this.value)" class="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-rose-400 text-choco-900 resize-none">${data.address}</textarea>
        </div>
        <div class="mb-10">
          <label class="block text-sm font-semibold text-choco-900 uppercase tracking-wider mb-3">Contact Number</label>
          <input required type="tel" placeholder="+1 (555) 000-0000" value="${data.phone}" onchange="updateCheckoutData('phone', this.value)" class="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-rose-400 text-choco-900" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-4 rounded-xl shadow-md transition-all flex items-center gap-2">
            Next Step <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>
      </form>
    `;
  } else if (step === 4) {
    content.innerHTML = `
      <h2 class="text-3xl font-serif font-bold text-choco-900 mb-2">Payment</h2>
      <p class="text-choco-800/60 mb-8">Secure your order with a 50% advance payment.</p>
      
      <div class="bg-cream-50 rounded-2xl p-6 mb-8 border border-cream-200">
        <div class="flex justify-between items-center mb-2">
          <span class="text-choco-800">Total Amount:</span>
          <span class="font-bold text-choco-900">$${finalPrice.toFixed(2)}</span>
        </div>
        <div class="flex justify-between items-center text-lg">
          <span class="font-serif font-bold text-choco-900">Advance Required (50%):</span>
          <span class="font-bold text-rose-500 text-2xl">$${advancePayment.toFixed(2)}</span>
        </div>
      </div>

      <form id="checkout-form">
        <div class="space-y-4 mb-10">
          <label class="block text-sm font-semibold text-choco-900 uppercase tracking-wider mb-3">Select Payment Method</label>
          ${['UPI', 'Credit/Debit Card'].map(method => `
            <label class="flex items-center p-4 border rounded-xl cursor-pointer transition-all ${data.paymentMethod === method ? 'border-rose-500 bg-rose-50' : 'border-cream-200 hover:bg-cream-50'}">
              <input type="radio" name="payment" value="${method}" ${data.paymentMethod === method ? 'checked' : ''} onchange="updateCheckoutData('paymentMethod', this.value)" class="w-5 h-5 text-rose-500 focus:ring-rose-500 border-gray-300" />
              <span class="ml-4 font-medium text-choco-900">${method}</span>
            </label>
          `).join('')}
        </div>
        <div class="flex justify-end">
          <button type="submit" class="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Place Order
          </button>
        </div>
      </form>
    `;
  } else if (step === 5) {
    content.innerHTML = `
      <div class="text-center">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
          <i data-lucide="check-circle-2" class="w-12 h-12"></i>
        </div>
        <h2 class="text-4xl font-serif font-bold text-choco-900 mb-4">Order Placed!</h2>
        <div class="bg-rose-50 border border-rose-200 rounded-2xl p-6 mb-8 inline-block max-w-md mx-auto">
          <p class="text-rose-600 font-medium text-lg leading-relaxed">
            "This is not a real website. This is a replica/demo created for a client project."
          </p>
        </div>
        <p class="text-choco-800/70 mb-8">Thank you for trying out the checkout flow.</p>
        <button onclick="showView('home')" class="bg-choco-900 hover:bg-choco-800 text-white font-semibold px-8 py-4 rounded-full shadow-md transition-all">
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
