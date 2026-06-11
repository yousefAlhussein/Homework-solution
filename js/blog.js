  let currentFilter = 'all';

  // ===== TOGGLE READ MORE =====
  function toggleArticle(btn) {
    const card = btn.closest('.article-card');
    const full = card.querySelector('.article-full');
    const isOpen = full.style.display === 'block';
    full.style.display = isOpen ? 'none' : 'block';
    btn.innerHTML = isOpen
      ? 'قراءة المزيد <i class="bi bi-chevron-down"></i>'
      : 'إخفاء <i class="bi bi-chevron-up"></i>';
  }

  // ===== FILTER ARTICLES =====
  function setFilter(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = cat;
    filterArticles();
  }

  function filterArticles() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const items = document.querySelectorAll('.article-item');
    let visible = 0;

    items.forEach(item => {
      const matchCat = currentFilter === 'all' || item.dataset.cat === currentFilter;
      const matchSearch = !q || item.dataset.title.toLowerCase().includes(q) ||
        item.querySelector('.article-excerpt').textContent.toLowerCase().includes(q);
      const show = matchCat && matchSearch;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    document.getElementById('countDisplay').textContent = visible;
    document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
  }
