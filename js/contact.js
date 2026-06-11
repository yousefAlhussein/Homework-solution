  // ===== VALIDATION RULES =====
  const rules = {
    fName: {
      validate: v => {
        if (!v.trim()) return 'الاسم الكامل مطلوب';
        if (v.trim().length < 3) return 'الاسم يجب أن يكون 3 أحرف على الأقل';
        if (v.trim().length > 60) return 'الاسم طويل جدًا';
        return '';
      }
    },
    fEmail: {
      validate: v => {
        if (!v.trim()) return 'البريد الإلكتروني مطلوب';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(v)) return 'يرجى إدخال بريد إلكتروني صحيح (example@domain.com)';
        return '';
      }
    },
    fPhone: {
      validate: v => {
        if (!v.trim()) return ''; // optional
        const re = /^[\+]?[\d\s\-\(\)]{8,20}$/;
        if (!re.test(v)) return 'رقم الهاتف غير صحيح';
        return '';
      }
    },
    fService: {
      validate: v => v ? '' : 'يرجى اختيار نوع الاستشارة'
    },
    fMessage: {
      validate: v => {
        if (!v.trim()) return 'الرسالة مطلوبة';
        if (v.trim().length < 20) return 'الرسالة قصيرة جدًا (20 حرفًا على الأقل)';
        return '';
      }
    },
    fTerms: {
      validate: () => document.getElementById('fTerms').checked ? '' : 'يجب الموافقة على الشروط والأحكام'
    }
  };

  function validateField(id) {
    const el = document.getElementById(id);
    const errEl = document.getElementById('err-' + id);
    if (!el || !errEl) return true;

    const val = id === 'fTerms' ? '' : el.value;
    const error = rules[id].validate(val);

    el.classList.toggle('error', !!error);
    el.classList.toggle('success', !error && (id === 'fTerms' ? document.getElementById('fTerms').checked : val.trim().length > 0));

    errEl.innerHTML = error ? `<i class="bi bi-exclamation-circle-fill me-1"></i>${error}` : '';
    updateProgress();
    return !error;
  }

  function countChars() {
    const el = document.getElementById('fMessage');
    const cc = document.getElementById('charCount');
    const len = el.value.length;
    cc.textContent = len + ' / 500';
    cc.className = 'char-count' + (len > 450 ? ' full' : len > 350 ? ' warn' : '');
  }

  function updateProgress() {
    const fields = ['fName','fEmail','fService','fMessage','fTerms'];
    let filled = 0;
    fields.forEach((id, i) => {
      const el = document.getElementById(id);
      const isOk = id === 'fTerms'
        ? el && el.checked
        : el && el.value.trim().length > 0 && !rules[id].validate(el.value);
      document.getElementById('pd' + (i+1)).classList.toggle('filled', isOk);
      if (isOk) filled++;
    });
  }

  // ===== SUBMIT =====
  function submitForm() {
    const fields = ['fName','fEmail','fPhone','fService','fMessage','fTerms'];
    let allValid = true;

    fields.forEach(id => {
      if (!validateField(id)) allValid = false;
    });

    if (!allValid) {
      // Scroll to first error
      const firstErr = document.querySelector('.field-input.error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Shake submit button
      const btn = document.getElementById('submitBtn');
      btn.style.animation = 'shake 0.4s ease';
      setTimeout(() => { btn.style.animation = ''; }, 400);
      return;
    }

    // Simulate sending
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    document.getElementById('submitText').textContent = 'جاري الإرسال...';
    btn.innerHTML = '<div class="spinner-border spinner-border-sm me-2"></div>جاري الإرسال...';

    setTimeout(() => {
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('successCard').style.display = 'block';
    }, 1800);
  }

  function resetForm() {
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('successCard').style.display = 'none';

    ['fName','fEmail','fPhone','fMessage'].forEach(id => {
      const el = document.getElementById(id);
      el.value = ''; el.classList.remove('error','success');
      document.getElementById('err-'+id).innerHTML = '';
    });
    document.getElementById('fService').value = '';
    document.getElementById('fTerms').checked = false;
    document.getElementById('charCount').textContent = '0 / 500';
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').innerHTML = '<i class="bi bi-send"></i><span id="submitText">إرسال الرسالة</span>';
    updateProgress();
  }

  // Init progress
  document.addEventListener('DOMContentLoaded', updateProgress);
