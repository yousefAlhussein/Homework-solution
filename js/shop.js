  let cart = [];

  // ===== ADD TO CART =====
  function addToCart(btn, name, price, emoji) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price: parseInt(price), emoji, qty: 1 });
    }

    // Update count
    const total = cart.reduce((s, i) => s + i.qty, 0);
    const countEl = document.getElementById('cartCount');
    countEl.textContent = total;

    // Bounce animation
    const badge = document.querySelector('.cart-badge');
    badge.classList.remove('bounce');
    void badge.offsetWidth;
    badge.classList.add('bounce');

    // Button feedback
    btn.classList.add('added');
    btn.innerHTML = '<i class="bi bi-check-circle me-1"></i>تمت الإضافة ✓';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<i class="bi bi-cart-plus me-1"></i>أضف إلى السلة';
    }, 2000);
  }

  // ===== RENDER CART =====
  function renderCart() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');

    if (cart.length === 0) {
      container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)"><div style="font-size:3rem;margin-bottom:12px">🛒</div><p>السلة فارغة. أضف بعض المنتجات!</p></div>`;
      totalEl.style.display = 'none';
      return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, idx) => {
      total += item.price * item.qty;
      html += `
        <div class="cart-item">
          <div class="cart-item-emoji">${item.emoji}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:0.9rem;color:var(--text-dark)">${item.name}</div>
            <div style="font-size:0.82rem;color:var(--text-muted)">${item.price} ليرة سورية × ${item.qty}</div>
          </div>
          <div style="font-weight:800;color:var(--primary);white-space:nowrap">${item.price * item.qty} ليرة سورية</div>
          <button class="remove-btn" onclick="removeItem(${idx})"><i class="bi bi-x-circle"></i></button>
        </div>`;
    });

    container.innerHTML = html;
    document.getElementById('totalPrice').textContent = total.toLocaleString() + ' ليرة سورية';
    totalEl.style.display = 'block';
  }

  function removeItem(idx) {
    cart.splice(idx, 1);
    document.getElementById('cartCount').textContent = cart.reduce((s,i) => s+i.qty, 0);
    renderCart();
  }

  function openCart() { renderCart(); document.getElementById('cartOverlay').classList.add('show'); }
  function closeCart() { document.getElementById('cartOverlay').classList.remove('show'); }
  function handleOverlayClick(e) { if (e.target === document.getElementById('cartOverlay')) closeCart(); }

  function checkout() {
    alert('🎉 شكرًا لطلبك! سيتم التواصل معك قريبًا.\nالإجمالي: ' + document.getElementById('totalPrice').textContent);
    cart = [];
    document.getElementById('cartCount').textContent = 0;
    closeCart();
  }

  // ===== FILTER PRODUCTS =====
  function filterProducts(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.product-item').forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
    });
  }
