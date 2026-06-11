  // ===== CALCULATOR STATE =====
  let current = '0';
  let previous = '';
  let operator = null;
  let shouldReset = false;
  let history = [];

  const mainEl = document.getElementById('calcMain');
  const exprEl = document.getElementById('calcExpr');

  function updateDisplay() {
    mainEl.textContent = current;
    mainEl.className = 'calc-main';
    if (current.length > 10) mainEl.classList.add('tiny');
    else if (current.length > 7) mainEl.classList.add('small');
  }

  function calcNum(n) {
    if (shouldReset) { current = ''; shouldReset = false; }
    if (current === '0' && n !== '.') current = n;
    else if (current.length < 14) current += n;
    updateDisplay();
  }

  function calcDot() {
    if (shouldReset) { current = '0'; shouldReset = false; }
    if (!current.includes('.')) current += '.';
    updateDisplay();
  }

  function calcOp(op) {
    if (operator && !shouldReset) calcEquals(true);
    previous = current;
    operator = op;
    shouldReset = true;
    exprEl.textContent = previous + ' ' + op;
  }

  function calcEquals(intermediate = false) {
    if (!operator || !previous) return;

    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result;

    switch (operator) {
      case '+': result = a + b; break;
      case '−': result = a - b; break;
      case '×': result = a * b; break;
      case '÷':
        if (b === 0) {
          mainEl.classList.add('shake');
          setTimeout(() => mainEl.classList.remove('shake'), 400);
          current = 'خطأ: قسمة على صفر';
          exprEl.textContent = '';
          operator = null; previous = '';
          updateDisplay(); return;
        }
        result = a / b; break;
    }

    // Round floating point
    result = parseFloat(result.toPrecision(12));

    const expr = previous + ' ' + operator + ' ' + current;

    if (!intermediate) {
      addHistory(expr, result);
      exprEl.textContent = expr + ' =';
    }

    current = String(result);
    operator = null; previous = '';
    shouldReset = true;
    updateDisplay();
  }

  function calcAC() {
    current = '0'; previous = ''; operator = null; shouldReset = false;
    exprEl.textContent = '';
    mainEl.classList.add('flash');
    setTimeout(() => mainEl.classList.remove('flash'), 250);
    updateDisplay();
  }

  function calcToggleSign() {
    if (current !== '0') {
      current = current.startsWith('-') ? current.slice(1) : '-' + current;
      updateDisplay();
    }
  }

  function calcPercent() {
    current = String(parseFloat(current) / 100);
    updateDisplay();
  }

  // ===== HISTORY =====
  function addHistory(expr, result) {
    history.unshift({ expr, result });
    if (history.length > 20) history.pop();
    renderHistory();
  }

  function renderHistory() {
    const list = document.getElementById('historyList');
    if (history.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:0.88rem"><i class="bi bi-calculator" style="font-size:2rem;display:block;margin-bottom:10px;opacity:0.4"></i>لا توجد عمليات بعد</div>';
      return;
    }
    list.innerHTML = history.map((h, i) => `
      <div class="history-item" onclick="reuseResult(${i})" title="اضغط لاستخدام النتيجة">
        <div>
          <div class="history-expr">${h.expr}</div>
          <div class="history-result">= ${h.result.toLocaleString()}</div>
        </div>
        <i class="bi bi-arrow-return-left" style="font-size:0.8rem;opacity:0.4"></i>
      </div>`).join('');
  }

  function reuseResult(idx) {
    current = String(history[idx].result);
    shouldReset = false;
    updateDisplay();
  }

  function clearHistory() {
    history = [];
    renderHistory();
  }

  // ===== KEYBOARD SUPPORT =====
  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') calcNum(e.key);
    else if (e.key === '.') calcDot();
    else if (e.key === '+') calcOp('+');
    else if (e.key === '-') calcOp('−');
    else if (e.key === '*') calcOp('×');
    else if (e.key === '/') { e.preventDefault(); calcOp('÷'); }
    else if (e.key === 'Enter' || e.key === '=') calcEquals();
    else if (e.key === 'Escape') calcAC();
    else if (e.key === 'Backspace') {
      if (current.length > 1) { current = current.slice(0,-1); updateDisplay(); }
      else { current = '0'; updateDisplay(); }
    }
  });
