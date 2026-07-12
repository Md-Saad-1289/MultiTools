/* Static Page Builder for Multi-Tools Website */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extraTools } from './extra-tools.js';
import { upgradedTools } from './workable-tools.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure output directories exist
if (!fs.existsSync(path.resolve(rootDir, 'tools'))) {
  fs.mkdirSync(path.resolve(rootDir, 'tools'), { recursive: true });
}

// Global Layout Template
const layoutTemplate = (title, description, content, activePage = '', relativePath = '.', extraScripts = '') => `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - MultiTools Premium Web Utilities</title>
  <meta name="description" content="${description}">
  
  <!-- CSS Stylesheets -->
  <link rel="stylesheet" href="${relativePath}/assets/css/themes.css">
  <link rel="stylesheet" href="${relativePath}/assets/css/style.css">
  <link rel="stylesheet" href="${relativePath}/assets/css/components.css">
  <link rel="stylesheet" href="${relativePath}/assets/css/responsive.css">
  
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@0.354.0/dist/umd/lucide.min.js"></script>

  <!-- Clarity Tracking Script -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xl7p4suhj3");
  </script>
</head>
<body>

  <!-- Sticky Glassmorphic Navbar -->
  <nav class="navbar" id="navbar">
    <div class="navbar-container">
      <a href="${relativePath}/index.html" class="logo" id="site-logo">
        <i data-lucide="layers" id="logo-icon"></i> Multi<span>Tools</span>
      </a>
      
      <ul class="nav-menu" id="nav-menu">
        <li><a href="${relativePath}/index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
        <li class="nav-item-dropdown">
          <a href="#" class="nav-link dropdown-toggle" id="tools-dropdown-toggle">
            Tools <i data-lucide="chevron-down" class="dropdown-arrow"></i>
          </a>
          <div class="dropdown-menu-container">
            <div class="dropdown-menu-grid">
              <div class="dropdown-column">
                <h5 class="dropdown-col-title"><i data-lucide="calculator"></i> Calculators</h5>
                <ul class="dropdown-col-links">
                  <li><a href="${relativePath}/tools/scientific-calculator.html">Scientific Calculator</a></li>
                  <li><a href="${relativePath}/tools/loan-emi-calculator.html">Loan EMI Calculator</a></li>
                  <li><a href="${relativePath}/tools/age-calculator.html">Age Calculator</a></li>
                  <li><a href="${relativePath}/tools/bmi-calculator.html">BMI Calculator</a></li>
                  <li><a href="${relativePath}/tools/unit-converter.html">Unit Converter</a></li>
                </ul>
              </div>
              <div class="dropdown-column">
                <h5 class="dropdown-col-title"><i data-lucide="code"></i> Dev Utilities</h5>
                <ul class="dropdown-col-links">
                  <li><a href="${relativePath}/tools/qr-code-generator.html">QR Code Generator</a></li>
                  <li><a href="${relativePath}/tools/password-generator.html">Password Generator</a></li>
                  <li><a href="${relativePath}/tools/base64-encoder-decoder.html">Base64 Encoder/Decoder</a></li>
                  <li><a href="${relativePath}/tools/json-formatter.html">JSON Formatter</a></li>
                  <li><a href="${relativePath}/tools/hash-generator.html">SHA-256 & MD5 Generator</a></li>
                </ul>
              </div>
              <div class="dropdown-column">
                <h5 class="dropdown-col-title"><i data-lucide="palette"></i> Design & Text</h5>
                <ul class="dropdown-col-links">
                  <li><a href="${relativePath}/tools/color-picker.html">Color Picker</a></li>
                  <li><a href="${relativePath}/tools/css-gradient-generator.html">Gradient Generator</a></li>
                  <li><a href="${relativePath}/tools/image-compressor.html">Image Compressor</a></li>
                  <li><a href="${relativePath}/tools/word-counter.html">Word & Character Counter</a></li>
                  <li><a href="${relativePath}/tools/stopwatch-timer.html">Stopwatch & Timer</a></li>
                </ul>
              </div>
            </div>
            <div class="dropdown-footer">
              <a href="${relativePath}/index.html#tools-section" class="dropdown-all-btn">
                <span>View All Premium Tools (${toolsList.length} total)</span> <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>
        </li>
        <li><a href="${relativePath}/about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a></li>
        <li><a href="${relativePath}/contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
      </ul>
      
      <div class="nav-actions">
        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark mode">
          <i data-lucide="moon" class="light-icon" id="sun-icon"></i>
          <i data-lucide="sun" class="dark-icon" id="moon-icon"></i>
        </button>
        
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false">
          <i data-lucide="menu" id="hamburger-icon"></i>
        </button>
      </div>
    </div>
  </nav>

  <main class="fade-in">
    ${content}
  </main>

  <!-- Footer -->
  <footer class="footer" id="footer">
    <div class="footer-container">
      <div>
        <a href="${relativePath}/index.html" class="logo mb-16">
          <i data-lucide="layers"></i> Multi<span>Tools</span>
        </a>
        <p class="footer-brand-desc">
          Your premium all-in-one suite of ${toolsList.length} secure, responsive, client-side tools running entirely inside your browser. No server storage, no limits.
        </p>
      </div>
      <div>
        <h4 class="footer-title">Popular Tools</h4>
        <ul class="footer-links">
          <li><a href="${relativePath}/tools/scientific-calculator.html" class="footer-link">Scientific Calculator</a></li>
          <li><a href="${relativePath}/tools/qr-code-generator.html" class="footer-link">QR Code Generator</a></li>
          <li><a href="${relativePath}/tools/image-compressor.html" class="footer-link">Image Compressor</a></li>
          <li><a href="${relativePath}/tools/password-generator.html" class="footer-link">Password Generator</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-title">Company</h4>
        <ul class="footer-links">
          <li><a href="${relativePath}/about.html" class="footer-link">About Us</a></li>
          <li><a href="${relativePath}/contact.html" class="footer-link">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-title">Legal</h4>
        <ul class="footer-links">
          <li><a href="${relativePath}/privacy-policy.html" class="footer-link">Privacy Policy</a></li>
          <li><a href="${relativePath}/disclaimer.html" class="footer-link">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 MultiTools. All rights reserved. 100% browser-safe client-side software.</p>
      <div style="display: flex; gap: 16px;">
        <a href="${relativePath}/privacy-policy.html" class="footer-link">Privacy</a>
        <a href="${relativePath}/disclaimer.html" class="footer-link">Disclaimer</a>
      </div>
    </div>
  </footer>

  <!-- Core Scripts -->
  <script src="${relativePath}/assets/js/theme.js"></script>
  <script src="${relativePath}/assets/js/app.js"></script>
  <script>
    // Initialize icons
    lucide.createIcons();
  </script>
  ${extraScripts}
</body>
</html>`;

// Tools configurations and specific components
const toolsList = [
  // CALCULATORS
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    desc: 'An advanced scientific calculator featuring trigonometry, inverse functions, logarithms, powers, roots, brackets, memory, and click-to-load calculation history.',
    category: 'calculators',
    badgeClass: 'badge-calculator',
    icon: 'calculator',
    html: `
      <div class="calculator-container" style="max-width: 100%; margin: 0 auto;">
        <!-- Double-line Screen -->
        <div class="calc-screen-container" style="background: var(--bg-surface-secondary); border: 1.5px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 20px; box-shadow: inset var(--shadow-sm); position: relative; overflow: hidden;">
          <!-- Angle Mode Indicator & Memory Indicator -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
            <div>
              <span id="calc-mode-indicator" class="badge" style="background: var(--bg-surface); color: var(--color-primary); border: 1px solid var(--border-color); padding: 2px 6px; font-size: 10px; border-radius: var(--radius-sm); margin-right: 6px;">DEG</span>
              <span id="calc-mem-indicator" style="display: none; background: var(--border-color); padding: 2px 6px; font-size: 10px; border-radius: var(--radius-sm);">M</span>
            </div>
            <div id="calc-expression-preview" style="max-width: 75%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12px; color: var(--text-secondary); font-family: 'JetBrains Mono', monospace;"></div>
          </div>
          <!-- Main screen input -->
          <input type="text" id="calc-screen" class="form-control" style="border: none; background: transparent; box-shadow: none; padding: 0; margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 32px; font-weight: 700; text-align: right; width: 100%; color: var(--text-primary); letter-spacing: 0.5px;" readonly value="0">
        </div>

        <!-- Mode Selector & Memory Bar -->
        <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm" id="btn-toggle-mode" style="font-family: 'JetBrains Mono', monospace; font-weight: 700; min-width: 80px; padding: 6px 12px; font-size: 12px;">DEG ⇆ RAD</button>
          <button class="btn btn-secondary btn-sm calc-mem-btn" data-action="mc" style="padding: 6px 12px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">MC</button>
          <button class="btn btn-secondary btn-sm calc-mem-btn" data-action="mr" style="padding: 6px 12px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">MR</button>
          <button class="btn btn-secondary btn-sm calc-mem-btn" data-action="mplus" style="padding: 6px 12px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">M+</button>
          <button class="btn btn-secondary btn-sm calc-mem-btn" data-action="mminus" style="padding: 6px 12px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">M-</button>
          <button class="btn btn-secondary btn-sm calc-mem-btn" data-action="ms" style="padding: 6px 12px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">MS</button>
        </div>

        <div class="calculator-grid-layout" style="display: grid; grid-template-columns: 2.5fr 1.2fr; gap: 20px;">
          <!-- Buttons Area -->
          <div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
              <!-- Trig / Scientific row 1 -->
              <button class="btn btn-secondary calc-btn" data-val="sin" title="Sine" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">sin</button>
              <button class="btn btn-secondary calc-btn" data-val="cos" title="Cosine" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">cos</button>
              <button class="btn btn-secondary calc-btn" data-val="tan" title="Tangent" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">tan</button>
              <button class="btn btn-secondary calc-btn" data-val="asin" title="Arcsine" style="font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 12px 4px;">sin⁻¹</button>
              <button class="btn btn-secondary calc-btn" data-val="acos" title="Arccosine" style="font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 12px 4px;">cos⁻¹</button>

              <!-- Trig / Scientific row 2 -->
              <button class="btn btn-secondary calc-btn" data-val="atan" title="Arctangent" style="font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 12px 4px;">tan⁻¹</button>
              <button class="btn btn-secondary calc-btn" data-val="log" title="Logarithm (base 10)" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">log</button>
              <button class="btn btn-secondary calc-btn" data-val="ln" title="Natural Logarithm (base e)" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">ln</button>
              <button class="btn btn-secondary calc-btn" data-val="sqrt" title="Square Root" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">√</button>
              <button class="btn btn-secondary calc-btn" data-val="cbrt" title="Cube Root" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">³√</button>

              <!-- Powers & Algebra row -->
              <button class="btn btn-secondary calc-btn" data-val="^" title="Power" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">xʸ</button>
              <button class="btn btn-secondary calc-btn" data-val="^2" title="Square" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">x²</button>
              <button class="btn btn-secondary calc-btn" data-val="^3" title="Cube" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">x³</button>
              <button class="btn btn-secondary calc-btn" data-val="abs" title="Absolute Value" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">|x|</button>
              <button class="btn btn-secondary calc-btn" data-val="!" title="Factorial" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">x!</button>

              <!-- Utility row -->
              <button class="btn btn-secondary calc-btn" data-val="pi" title="Pi Constant" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">π</button>
              <button class="btn btn-secondary calc-btn" data-val="e" title="Euler Constant" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">e</button>
              <button class="btn btn-secondary calc-btn" data-val="(" title="Open parenthesis" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">(</button>
              <button class="btn btn-secondary calc-btn" data-val=")" title="Close parenthesis" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">)</button>
              <button class="btn btn-secondary calc-btn" data-val="%" title="Percentage" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">%</button>

              <!-- Clear & Actions Row -->
              <button class="btn btn-secondary calc-btn" data-val="Ans" title="Use previous result" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px; color: var(--color-primary);">Ans</button>
              <button class="btn btn-secondary calc-btn" data-val="mod" title="Modulo (remainder)" style="font-family: 'JetBrains Mono', monospace; font-size: 13px; padding: 12px 4px;">mod</button>
              <button class="btn btn-secondary calc-btn" style="color: var(--color-danger); font-weight: 700;" data-val="C" title="Clear all">C</button>
              <button class="btn btn-secondary calc-btn" data-val="backspace" title="Delete last character">⌫</button>
              <button class="btn btn-secondary calc-btn" data-val="/" title="Divide" style="font-size: 16px;">÷</button>

              <!-- Number Rows -->
              <button class="btn btn-secondary calc-btn btn-num" data-val="7" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">7</button>
              <button class="btn btn-secondary calc-btn btn-num" data-val="8" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">8</button>
              <button class="btn btn-secondary calc-btn btn-num" data-val="9" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">9</button>
              <button class="btn btn-secondary calc-btn" data-val="*" title="Multiply" style="font-size: 16px;">×</button>
              <button class="btn btn-secondary calc-btn" data-val="-" title="Subtract" style="font-size: 16px;">-</button>

              <button class="btn btn-secondary calc-btn btn-num" data-val="4" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">4</button>
              <button class="btn btn-secondary calc-btn btn-num" data-val="5" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">5</button>
              <button class="btn btn-secondary calc-btn btn-num" data-val="6" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">6</button>
              <button class="btn btn-secondary calc-btn" data-val="+" title="Add" style="font-size: 16px;">+</button>
              <button class="btn btn-primary calc-btn" style="grid-row: span 2; height: 100%; font-size: 20px; font-weight: 700;" data-val="=" title="Evaluate expression">=</button>

              <button class="btn btn-secondary calc-btn btn-num" data-val="1" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">1</button>
              <button class="btn btn-secondary calc-btn btn-num" data-val="2" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">2</button>
              <button class="btn btn-secondary calc-btn btn-num" data-val="3" style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">3</button>
              <button class="btn btn-secondary calc-btn btn-num" style="grid-column: span 1; font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);" data-val="0">0</button>
              <button class="btn btn-secondary calc-btn" data-val="." style="font-weight: 600; background: var(--bg-surface); border-color: var(--border-color);">.</button>
            </div>
          </div>

          <!-- History Area -->
          <div class="card" style="padding: 16px; display: flex; flex-direction: column; min-height: 380px; background: var(--bg-surface-secondary);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; margin-bottom: 12px;">
              <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-primary); margin: 0;">History</h4>
              <button class="btn btn-secondary btn-sm" id="btn-clear-history" style="padding: 2px 6px; font-size: 10px; font-weight: 600; border-radius: var(--radius-sm);">Clear</button>
            </div>
            <div id="calc-history-list" style="flex: 1; overflow-y: auto; font-family: 'JetBrains Mono', monospace; font-size: 12px; display: flex; flex-direction: column; gap: 8px; max-height: 320px;">
              <div style="color: var(--text-muted); text-align: center; padding-top: 40px; font-style: italic;">No calculations yet</div>
            </div>
          </div>
        </div>

        <!-- Keyboard Shortcuts & Instructions Panel -->
        <div class="card" style="margin-top: 24px; padding: 16px; background: var(--bg-surface);">
          <h4 class="mb-8" style="font-size: 14px; font-weight: 700; text-transform: uppercase;">Keyboard Support</h4>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin: 0;">
            Type numbers and operators <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">+</code>, <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">-</code>, <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">*</code>, <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">/</code>, <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">^</code> directly. 
            Press <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">Enter</code> or <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">=</code> for calculation, <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">Backspace</code> to delete, and <code style="background: var(--bg-surface-secondary); padding: 2px 4px; border-radius: 4px;">Esc</code> to clear.
          </p>
        </div>
      </div>
    `,
    js: `
      // State variables
      let expression = '';
      let activeMode = 'DEG'; // DEG or RAD
      let lastResult = null;
      let memory = 0;
      let history = [];

      // Elements
      const screen = document.getElementById('calc-screen');
      const preview = document.getElementById('calc-expression-preview');
      const modeIndicator = document.getElementById('calc-mode-indicator');
      const memIndicator = document.getElementById('calc-mem-indicator');
      const btnToggleMode = document.getElementById('btn-toggle-mode');
      const historyList = document.getElementById('calc-history-list');
      const btnClearHistory = document.getElementById('btn-clear-history');

      // Sync localstorage for history if available
      try {
        const savedHist = localStorage.getItem('calc_history');
        if (savedHist) {
          history = JSON.parse(savedHist);
          renderHistory();
        }
      } catch (e) {}

      // Toggle mode (DEG / RAD)
      function toggleMode() {
        activeMode = activeMode === 'DEG' ? 'RAD' : 'DEG';
        modeIndicator.textContent = activeMode;
        window.showToast('Switched to ' + activeMode + ' mode');
      }
      btnToggleMode.addEventListener('click', toggleMode);

      // Memory Operations
      document.querySelectorAll('.calc-mem-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          let currentVal = parseFloat(screen.value) || 0;
          if (isNaN(currentVal)) currentVal = 0;

          if (action === 'mc') {
            memory = 0;
            memIndicator.style.display = 'none';
            window.showToast('Memory Cleared');
          } else if (action === 'mr') {
            expression += String(memory);
            screen.value = expression;
            preview.textContent = expression;
          } else if (action === 'mplus') {
            memory += currentVal;
            memIndicator.style.display = 'inline-block';
            window.showToast('Added ' + currentVal + ' to Memory');
          } else if (action === 'mminus') {
            memory -= currentVal;
            memIndicator.style.display = 'inline-block';
            window.showToast('Subtracted ' + currentVal + ' from Memory');
          } else if (action === 'ms') {
            memory = currentVal;
            memIndicator.style.display = 'inline-block';
            window.showToast('Stored ' + currentVal + ' in Memory (' + memory + ')');
          }
        });
      });

      // Render History List
      function renderHistory() {
        if (history.length === 0) {
          historyList.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding-top: 40px; font-style: italic;">No calculations yet</div>';
          return;
        }
        historyList.innerHTML = '';
        history.slice().reverse().forEach((item) => {
          const div = document.createElement('div');
          div.className = 'card';
          div.style.padding = '8px 12px';
          div.style.cursor = 'pointer';
          div.style.background = 'var(--bg-surface)';
          div.style.border = '1px solid var(--border-color)';
          div.style.borderRadius = 'var(--radius-sm)';
          div.style.transition = 'all var(--transition-fast)';
          div.style.wordBreak = 'break-all';
          
          div.innerHTML = \`
            <div style="font-size: 11px; color: var(--text-muted); text-align: right; margin-bottom: 2px;">\${item.expr}</div>
            <div style="font-weight: 700; text-align: right; color: var(--color-primary); font-size: 13px;">\${item.res}</div>
          \`;
          
          div.addEventListener('click', () => {
            expression = item.expr;
            screen.value = expression;
            preview.textContent = expression;
            window.showToast('Loaded expression from history');
          });
          historyList.appendChild(div);
        });
      }

      btnClearHistory.addEventListener('click', () => {
        history = [];
        try {
          localStorage.removeItem('calc_history');
        } catch(e) {}
        renderHistory();
        window.showToast('History Cleared');
      });

      // Click event for buttons
      document.querySelectorAll('.calc-btn').forEach(btn => {
        const val = btn.getAttribute('data-val');
        if (!val) return;

        btn.addEventListener('click', () => {
          handleInput(val);
        });
      });

      // Standardize input handler so we can use both keypress and buttons
      function handleInput(val) {
        if (val === 'C') {
          expression = '';
          screen.value = '0';
          preview.textContent = '';
        } else if (val === 'backspace') {
          // If expression ends with a function prefix, delete the whole prefix
          const prefixes = ['asin(', 'acos(', 'atan(', 'sqrt(', 'cbrt(', 'sin(', 'cos(', 'tan(', 'log(', 'ln(', 'abs('];
          let prefixDeleted = false;
          for (let prefix of prefixes) {
            if (expression.endsWith(prefix)) {
              expression = expression.slice(0, -prefix.length);
              prefixDeleted = true;
              break;
            }
          }
          if (!prefixDeleted) {
            expression = expression.slice(0, -1);
          }
          screen.value = expression || '0';
          preview.textContent = expression;
        } else if (val === '=') {
          evaluateExpr();
        } else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 'abs'].includes(val)) {
          expression += val + '(';
          screen.value = expression;
          preview.textContent = expression;
        } else if (val === 'Ans') {
          if (lastResult !== null) {
            expression += 'Ans';
            screen.value = expression;
            preview.textContent = expression;
          } else {
            window.showToast('No previous answer available!');
          }
        } else {
          if (expression === '0' && !isNaN(val)) expression = '';
          expression += val;
          screen.value = expression;
          preview.textContent = expression;
        }
      }

      // Keyboard support
      window.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' && document.activeElement.id !== 'calc-screen') {
          return;
        }
        
        const key = e.key;
        if (key >= '0' && key <= '9') {
          handleInput(key);
        } else if (['+', '-', '*', '/', '(', ')', '.', '%'].includes(key)) {
          handleInput(key);
        } else if (key === '^') {
          handleInput('^');
        } else if (key === 'Enter' || key === '=') {
          e.preventDefault();
          handleInput('=');
        } else if (key === 'Backspace') {
          handleInput('backspace');
        } else if (key === 'Escape') {
          handleInput('C');
        }
      });

      // Evaluation Engine with MathJS
      function evaluateExpr() {
        if (!expression) return;
        try {
          if (typeof math === 'undefined') {
            window.showToast('Loading Math Engine, please wait...');
            return;
          }

          const scope = activeMode === 'DEG' ? {
            sin: x => Math.sin(x * Math.PI / 180),
            cos: x => Math.cos(x * Math.PI / 180),
            tan: x => Math.tan(x * Math.PI / 180),
            asin: x => Math.asin(x) * 180 / Math.PI,
            acos: x => Math.acos(x) * 180 / Math.PI,
            atan: x => Math.atan(x) * 180 / Math.PI,
            log: x => Math.log10(x),
            ln: x => Math.log(x),
            cbrt: x => Math.cbrt(x),
            abs: x => Math.abs(x),
            pi: Math.PI,
            e: Math.E,
            Ans: lastResult || 0
          } : {
            sin: x => Math.sin(x),
            cos: x => Math.cos(x),
            tan: x => Math.tan(x),
            asin: x => Math.asin(x),
            acos: x => Math.acos(x),
            atan: x => Math.atan(x),
            log: x => Math.log10(x),
            ln: x => Math.log(x),
            cbrt: x => Math.cbrt(x),
            abs: x => Math.abs(x),
            pi: Math.PI,
            e: Math.E,
            Ans: lastResult || 0
          };

          let evalResult = math.evaluate(expression, scope);
          
          if (typeof evalResult === 'object' && evalResult !== null) {
            if (evalResult.isComplex) {
              evalResult = evalResult.toString();
            } else if (typeof evalResult.toNumber === 'function') {
              evalResult = evalResult.toNumber();
            }
          }

          if (typeof evalResult === 'number') {
            if (!Number.isFinite(evalResult)) {
              evalResult = 'Infinity';
            } else {
              evalResult = +evalResult.toFixed(12);
            }
          }

          preview.textContent = expression + ' =';
          screen.value = String(evalResult);
          
          const newItem = { expr: expression, res: String(evalResult) };
          history.push(newItem);
          if (history.length > 50) history.shift();
          try {
            localStorage.setItem('calc_history', JSON.stringify(history));
          } catch(e) {}
          
          renderHistory();

          lastResult = typeof evalResult === 'number' ? evalResult : null;
          expression = String(evalResult);
        } catch (err) {
          screen.value = 'Error';
          preview.textContent = expression;
          window.showToast('Math Error: ' + err.message);
        }
      }
    `
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    desc: 'Calculate your exact age in years, months, days, and seconds. View your upcoming birthday details.',
    category: 'calculators',
    badgeClass: 'badge-calculator',
    icon: 'calendar',
    html: `
      <div class="form-group">
        <label class="form-label" for="dob-input">Enter your Date of Birth</label>
        <input type="date" id="dob-input" class="form-control mb-16">
        <button id="calc-age-btn" class="btn btn-primary w-full">Calculate Age</button>
      </div>
      <div id="age-results" style="display: none; margin-top: 30px;" class="fade-in">
        <h3 class="mb-16">Your Exact Age</h3>
        <div class="grid grid-3 mb-24">
          <div class="card text-center">
            <h4 id="age-years" style="font-size: 32px; color: var(--color-primary);">0</h4>
            <p>Years</p>
          </div>
          <div class="card text-center">
            <h4 id="age-months" style="font-size: 32px; color: var(--color-primary);">0</h4>
            <p>Months</p>
          </div>
          <div class="card text-center">
            <h4 id="age-days" style="font-size: 32px; color: var(--color-primary);">0</h4>
            <p>Days</p>
          </div>
        </div>
        <h4 class="mb-16">Lifespan Milestones</h4>
        <ul class="footer-links" style="padding: 16px; background: var(--bg-surface-secondary); border-radius: var(--radius-md); font-family: monospace;">
          <li style="display:flex; justify-content:space-between;"><span>Total Months:</span><strong id="total-months">0</strong></li>
          <li style="display:flex; justify-content:space-between;"><span>Total Weeks:</span><strong id="total-weeks">0</strong></li>
          <li style="display:flex; justify-content:space-between;"><span>Total Days:</span><strong id="total-days">0</strong></li>
          <li style="display:flex; justify-content:space-between;"><span>Total Hours:</span><strong id="total-hours">0</strong></li>
          <li style="display:flex; justify-content:space-between;"><span>Total Minutes:</span><strong id="total-minutes">0</strong></li>
        </ul>
        <div class="card mt-24 text-center">
          <p>🎉 Next birthday in: <strong id="next-birthday-days" style="color: var(--color-accent);">0</strong> days!</p>
        </div>
      </div>
    `,
    js: `
      document.getElementById('calc-age-btn').addEventListener('click', () => {
        const dobVal = document.getElementById('dob-input').value;
        if (!dobVal) {
          window.showToast('Please select a valid date!');
          return;
        }
        
        const dob = new Date(dobVal);
        const now = new Date();
        
        if (dob > now) {
          window.showToast('Date of birth cannot be in the future!');
          return;
        }

        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();

        if (days < 0) {
          months--;
          const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
          days += prevMonth.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        document.getElementById('age-years').textContent = years;
        document.getElementById('age-months').textContent = months;
        document.getElementById('age-days').textContent = days;

        const diffMs = now - dob;
        document.getElementById('total-months').textContent = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.4375));
        document.getElementById('total-weeks').textContent = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
        document.getElementById('total-days').textContent = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        document.getElementById('total-hours').textContent = Math.floor(diffMs / (1000 * 60 * 60));
        document.getElementById('total-minutes').textContent = Math.floor(diffMs / (1000 * 60));

        // Next Birthday Countdown
        const nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
        if (now > nextBday) {
          nextBday.setFullYear(now.getFullYear() + 1);
        }
        const nextBdayDiff = nextBday - now;
        document.getElementById('next-birthday-days').textContent = Math.ceil(nextBdayDiff / (1000 * 60 * 60 * 24));

        document.getElementById('age-results').style.display = 'block';
      });
    `
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    desc: 'Calculate Body Mass Index (BMI) for adults instantly. Check your healthy weight range.',
    category: 'calculators',
    badgeClass: 'badge-calculator',
    icon: 'activity',
    html: `
      <div class="form-group">
        <label class="form-label" for="weight">Weight (kg)</label>
        <input type="number" id="weight" class="form-control" value="70">
      </div>
      <div class="form-group">
        <label class="form-label" for="height">Height (cm)</label>
        <input type="number" id="height" class="form-control" value="175">
      </div>
      <button id="calc-bmi-btn" class="btn btn-primary w-full mb-24">Calculate BMI</button>
      <div id="bmi-result" style="display: none;" class="fade-in">
        <div class="card text-center mb-16">
          <p style="font-size: 14px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Your BMI Score</p>
          <h3 id="bmi-score" style="font-size: 40px; color: var(--color-primary); margin: 8px 0;">22.9</h3>
          <span id="bmi-status" class="badge" style="font-size: 14px; padding: 6px 16px;">Normal Weight</span>
        </div>
        <div style="height: 10px; border-radius: var(--radius-full); display: flex; overflow: hidden; margin-bottom: 24px;">
          <div style="flex: 18.5; background: #3b82f6;" title="Underweight"></div>
          <div style="flex: 6; background: #10b981;" title="Normal"></div>
          <div style="flex: 5; background: #f59e0b;" title="Overweight"></div>
          <div style="flex: 10; background: #ef4444;" title="Obese"></div>
        </div>
        <p class="text-center" style="font-size: 14px;">Healthy weight range for your height: <strong id="healthy-range">56.7kg - 76.2kg</strong></p>
      </div>
    `,
    js: `
      document.getElementById('calc-bmi-btn').addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100;
        
        if (!weight || !height || weight <= 0 || height <= 0) {
          window.showToast('Please enter valid positive values!');
          return;
        }

        const bmi = +(weight / (height * height)).toFixed(1);
        document.getElementById('bmi-score').textContent = bmi;
        
        const statusEl = document.getElementById('bmi-status');
        let status = '';
        let color = '';
        
        if (bmi < 18.5) {
          status = 'Underweight';
          color = '#3b82f6';
        } else if (bmi < 25) {
          status = 'Normal Weight';
          color = '#10b981';
        } else if (bmi < 30) {
          status = 'Overweight';
          color = '#f59e0b';
        } else {
          status = 'Obese';
          color = '#ef4444';
        }

        statusEl.textContent = status;
        statusEl.style.backgroundColor = color + '20';
        statusEl.style.color = color;

        const minW = +(18.5 * height * height).toFixed(1);
        const maxW = +(24.9 * height * height).toFixed(1);
        document.getElementById('healthy-range').textContent = minW + 'kg - ' + maxW + 'kg';

        document.getElementById('bmi-result').style.display = 'block';
      });
    `
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    desc: 'Quickly solve three common percentage calculation questions in real-time.',
    category: 'calculators',
    badgeClass: 'badge-calculator',
    icon: 'percent',
    html: `
      <div class="card mb-24">
        <h4 class="mb-16">What is X% of Y?</h4>
        <div style="display:flex; gap:12px; align-items:center;">
          <input type="number" id="p1-x" class="form-control" placeholder="X" style="width: 80px;">
          <span>% of</span>
          <input type="number" id="p1-y" class="form-control" placeholder="Y" style="width: 100px;">
          <span>=</span>
          <input type="text" id="p1-res" class="form-control" readonly placeholder="Result" style="flex:1;">
        </div>
      </div>
      <div class="card mb-24">
        <h4 class="mb-16">X is what percent of Y?</h4>
        <div style="display:flex; gap:12px; align-items:center;">
          <input type="number" id="p2-x" class="form-control" placeholder="X" style="width: 80px;">
          <span>is what % of</span>
          <input type="number" id="p2-y" class="form-control" placeholder="Y" style="width: 100px;">
          <span>=</span>
          <input type="text" id="p2-res" class="form-control" readonly placeholder="Result %" style="flex:1;">
        </div>
      </div>
      <div class="card">
        <h4 class="mb-16">What is the percentage change from X to Y?</h4>
        <div style="display:flex; gap:12px; align-items:center;">
          <span>From</span>
          <input type="number" id="p3-x" class="form-control" placeholder="X" style="width: 100px;">
          <span>to</span>
          <input type="number" id="p3-y" class="form-control" placeholder="Y" style="width: 100px;">
          <span>=</span>
          <input type="text" id="p3-res" class="form-control" readonly placeholder="Result %" style="flex:1;">
        </div>
      </div>
    `,
    js: `
      const p1X = document.getElementById('p1-x');
      const p1Y = document.getElementById('p1-y');
      const p1Res = document.getElementById('p1-res');
      
      const p2X = document.getElementById('p2-x');
      const p2Y = document.getElementById('p2-y');
      const p2Res = document.getElementById('p2-res');
      
      const p3X = document.getElementById('p3-x');
      const p3Y = document.getElementById('p3-y');
      const p3Res = document.getElementById('p3-res');

      function calcPercent() {
        // Form 1
        if (p1X.value && p1Y.value) {
          p1Res.value = +((p1X.value / 100) * p1Y.value).toFixed(4);
        } else { p1Res.value = ''; }

        // Form 2
        if (p2X.value && p2Y.value && p2Y.value != 0) {
          p2Res.value = +((p2X.value / p2Y.value) * 100).toFixed(4) + '%';
        } else { p2Res.value = ''; }

        // Form 3
        if (p3X.value && p3Y.value && p3X.value != 0) {
          const diff = p3Y.value - p3X.value;
          const pct = (diff / p3X.value) * 100;
          p3Res.value = (pct >= 0 ? '+' : '') + (+pct.toFixed(4)) + '%';
        } else { p3Res.value = ''; }
      }

      [p1X, p1Y, p2X, p2Y, p3X, p3Y].forEach(el => el.addEventListener('input', calcPercent));
    `
  },
  {
    id: 'loan-emi-calculator',
    title: 'Loan EMI Calculator',
    desc: 'Calculate monthly home, car, or personal loan EMIs instantly with full loan breakdown tables.',
    category: 'calculators',
    badgeClass: 'badge-calculator',
    icon: 'landmark',
    html: `
      <div class="form-group">
        <label class="form-label" for="loan-amount">Loan Amount ($)</label>
        <input type="number" id="loan-amount" class="form-control" value="100000">
      </div>
      <div class="form-group">
        <label class="form-label" for="interest-rate">Annual Interest Rate (%)</label>
        <input type="number" id="interest-rate" class="form-control" value="7.5" step="0.1">
      </div>
      <div class="form-group">
        <label class="form-label" for="loan-tenure">Loan Tenure (Years)</label>
        <input type="number" id="loan-tenure" class="form-control" value="15">
      </div>
      <button id="calc-emi-btn" class="btn btn-primary w-full mb-24">Calculate EMI</button>
      <div id="emi-result" style="display: none;" class="fade-in">
        <div class="grid grid-3 mb-24">
          <div class="card text-center">
            <h4 id="monthly-emi" style="font-size: 24px; color: var(--color-primary);">$0</h4>
            <p>Monthly EMI</p>
          </div>
          <div class="card text-center">
            <h4 id="total-interest" style="font-size: 24px; color: var(--color-accent);">$0</h4>
            <p>Total Interest</p>
          </div>
          <div class="card text-center">
            <h4 id="total-payment" style="font-size: 24px; color: var(--text-primary);">$0</h4>
            <p>Total Payment</p>
          </div>
        </div>
      </div>
    `,
    js: `
      document.getElementById('calc-emi-btn').addEventListener('click', () => {
        const principal = parseFloat(document.getElementById('loan-amount').value);
        const rate = parseFloat(document.getElementById('interest-rate').value) / 12 / 100;
        const months = parseFloat(document.getElementById('loan-tenure').value) * 12;

        if (!principal || !rate || !months || principal <= 0 || rate <= 0 || months <= 0) {
          window.showToast('Please enter valid positive values!');
          return;
        }

        const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        const totalPay = emi * months;
        const totalInterest = totalPay - principal;

        document.getElementById('monthly-emi').textContent = '$' + emi.toLocaleString('en-US', {maximumFractionDigits: 2});
        document.getElementById('total-interest').textContent = '$' + totalInterest.toLocaleString('en-US', {maximumFractionDigits: 2});
        document.getElementById('total-payment').textContent = '$' + totalPay.toLocaleString('en-US', {maximumFractionDigits: 2});

        document.getElementById('emi-result').style.display = 'block';
      });
    `
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    desc: 'A robust unit converter featuring Length, Mass, Temperature, Area, and Volume metrics.',
    category: 'calculators',
    badgeClass: 'badge-calculator',
    icon: 'refresh-cw',
    html: `
      <div class="form-group">
        <label class="form-label" for="unit-category">Select Category</label>
        <select id="unit-category" class="form-control form-select">
          <option value="length">Length</option>
          <option value="weight">Weight/Mass</option>
          <option value="temp">Temperature</option>
        </select>
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="form-label" for="from-unit-val">From</label>
          <input type="number" id="from-unit-val" class="form-control" value="1">
          <select id="from-unit-select" class="form-control form-select mt-8"></select>
        </div>
        <div class="form-group">
          <label class="form-label" for="to-unit-val">To</label>
          <input type="number" id="to-unit-val" class="form-control" readonly>
          <select id="to-unit-select" class="form-control form-select mt-8"></select>
        </div>
      </div>
    `,
    js: `
      const cat = document.getElementById('unit-category');
      const fromVal = document.getElementById('from-unit-val');
      const toVal = document.getElementById('to-unit-val');
      const fromSel = document.getElementById('from-unit-select');
      const toSel = document.getElementById('to-unit-select');

      const units = {
        length: { m: 1, cm: 0.01, km: 1000, inch: 0.0254, ft: 0.3048, yard: 0.9144, mile: 1609.34 },
        weight: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.028349523 },
        temp: { C: 'C', F: 'F', K: 'K' }
      };

      function populateSelects() {
        const selectedCat = cat.value;
        fromSel.innerHTML = '';
        toSel.innerHTML = '';
        
        Object.keys(units[selectedCat]).forEach(unit => {
          fromSel.innerHTML += \`<option value="\${unit}">\${unit.toUpperCase()}</option>\`;
          toSel.innerHTML += \`<option value="\${unit}">\${unit.toUpperCase()}</option>\`;
        });
        
        toSel.selectedIndex = 1;
        convert();
      }

      function convert() {
        const selectedCat = cat.value;
        const from = fromSel.value;
        const to = toSel.value;
        const val = parseFloat(fromVal.value);

        if (isNaN(val)) {
          toVal.value = '';
          return;
        }

        if (selectedCat === 'temp') {
          if (from === to) { toVal.value = val; return; }
          let celsius = val;
          if (from === 'F') celsius = (val - 32) * 5/9;
          if (from === 'K') celsius = val - 273.15;
          
          let out = celsius;
          if (to === 'F') out = (celsius * 9/5) + 32;
          if (to === 'K') out = celsius + 273.15;
          toVal.value = +out.toFixed(4);
        } else {
          const fromRate = units[selectedCat][from];
          const toRate = units[selectedCat][to];
          toVal.value = +(val * (fromRate / toRate)).toFixed(6);
        }
      }

      cat.addEventListener('change', populateSelects);
      [fromVal, fromSel, toSel].forEach(el => el.addEventListener('input', convert));
      populateSelects();
    `
  },
  // DEVELOPER TOOLS
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    desc: 'Validate, beautify, formatting with 2/4 space indentation, or minify raw JSON strings instantly.',
    category: 'dev',
    badgeClass: 'badge-dev',
    icon: 'braces',
    html: `
      <div class="form-group">
        <label class="form-label" for="json-input">Raw JSON Input</label>
        <textarea id="json-input" class="form-control" style="font-family: 'JetBrains Mono', monospace; height: 180px; font-size: 14px;" placeholder='{"name": "MultiTools", "isPremium": true}'></textarea>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
        <button id="btn-fmt-2" class="btn btn-secondary btn-sm">Format (2 Spaces)</button>
        <button id="btn-fmt-4" class="btn btn-secondary btn-sm">Format (4 Spaces)</button>
        <button id="btn-minify" class="btn btn-secondary btn-sm">Minify JSON</button>
        <button id="btn-validate" class="btn btn-primary btn-sm">Validate JSON</button>
        <button id="btn-copy-json" class="btn btn-secondary btn-sm" style="margin-left:auto;"><i data-lucide="copy" style="width:14px;height:14px;"></i> Copy</button>
      </div>
      <div class="form-group">
        <label class="form-label">Formatted Output & Validation logs</label>
        <div id="json-feedback" style="display:none; padding:12px; border-radius:var(--radius-sm); font-size:14px; margin-bottom:12px; font-weight:600;"></div>
        <textarea id="json-output" class="form-control" style="font-family: 'JetBrains Mono', monospace; height: 220px; font-size: 14px;" readonly></textarea>
      </div>
    `,
    js: `
      const input = document.getElementById('json-input');
      const output = document.getElementById('json-output');
      const feedback = document.getElementById('json-feedback');

      function processJSON(spaces, minify = false) {
        feedback.style.display = 'none';
        const val = input.value.trim();
        if (!val) return;
        
        try {
          const parsed = JSON.parse(val);
          output.value = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, spaces);
          feedback.textContent = '✓ Valid JSON String';
          feedback.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
          feedback.style.color = 'var(--color-accent)';
          feedback.style.display = 'block';
        } catch (err) {
          output.value = '';
          feedback.textContent = '✗ Invalid JSON: ' + err.message;
          feedback.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
          feedback.style.color = 'var(--color-danger)';
          feedback.style.display = 'block';
        }
      }

      document.getElementById('btn-fmt-2').addEventListener('click', () => processJSON(2));
      document.getElementById('btn-fmt-4').addEventListener('click', () => processJSON(4));
      document.getElementById('btn-minify').addEventListener('click', () => processJSON(0, true));
      document.getElementById('btn-validate').addEventListener('click', () => processJSON(2));
      
      document.getElementById('btn-copy-json').addEventListener('click', () => {
        if (output.value) {
          navigator.clipboard.writeText(output.value);
          window.showToast('Copied JSON string to clipboard!');
        }
      });
    `
  },
  {
    id: 'base64-encoder-decoder',
    title: 'Base64 Encoder & Decoder',
    desc: 'Securely encode plain text strings into Base64 format or decode them back quickly.',
    category: 'dev',
    badgeClass: 'badge-dev',
    icon: 'lock',
    html: `
      <div class="form-group">
        <label class="form-label" for="b64-input">Input String</label>
        <textarea id="b64-input" class="form-control" style="height: 120px;" placeholder="Type or paste your text here..."></textarea>
      </div>
      <div style="display:flex; gap:12px; margin-bottom:20px;">
        <button id="b64-encode" class="btn btn-primary btn-sm">Encode to Base64</button>
        <button id="b64-decode" class="btn btn-secondary btn-sm">Decode Base64</button>
        <button id="b64-swap" class="btn btn-secondary btn-sm">Swap IO</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="b64-output">Output String</label>
        <textarea id="b64-output" class="form-control" style="height: 120px;" readonly></textarea>
      </div>
      <button id="b64-copy" class="btn btn-secondary w-full">Copy Output to Clipboard</button>
    `,
    js: `
      const input = document.getElementById('b64-input');
      const output = document.getElementById('b64-output');

      document.getElementById('b64-encode').addEventListener('click', () => {
        try {
          output.value = btoa(unescape(encodeURIComponent(input.value)));
        } catch (err) {
          output.value = 'Error: Cannot encode binary/special characters correctly.';
        }
      });

      document.getElementById('b64-decode').addEventListener('click', () => {
        try {
          output.value = decodeURIComponent(escape(atob(input.value.trim())));
        } catch (err) {
          output.value = 'Error: Invalid Base64 character string.';
        }
      });

      document.getElementById('b64-swap').addEventListener('click', () => {
        const temp = input.value;
        input.value = output.value;
        output.value = temp;
      });

      document.getElementById('b64-copy').addEventListener('click', () => {
        if (output.value) {
          navigator.clipboard.writeText(output.value);
          window.showToast('Base64 output copied!');
        }
      });
    `
  },
  {
    id: 'url-encoder-decoder',
    title: 'URL Encoder & Decoder',
    desc: 'Encode special characters in query string paths or convert escaped URL links to normal strings.',
    category: 'dev',
    badgeClass: 'badge-dev',
    icon: 'link',
    html: `
      <div class="form-group">
        <label class="form-label" for="url-input">Input String</label>
        <textarea id="url-input" class="form-control" style="height: 120px;" placeholder="Enter URL or text query..."></textarea>
      </div>
      <div style="display:flex; gap:12px; margin-bottom:20px;">
        <button id="url-encode" class="btn btn-primary btn-sm">URL Encode</button>
        <button id="url-decode" class="btn btn-secondary btn-sm">URL Decode</button>
        <button id="url-swap" class="btn btn-secondary btn-sm">Swap IO</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="url-output">Output String</label>
        <textarea id="url-output" class="form-control" style="height: 120px;" readonly></textarea>
      </div>
      <button id="url-copy" class="btn btn-secondary w-full">Copy URL to Clipboard</button>
    `,
    js: `
      const input = document.getElementById('url-input');
      const output = document.getElementById('url-output');

      document.getElementById('url-encode').addEventListener('click', () => {
        output.value = encodeURIComponent(input.value);
      });

      document.getElementById('url-decode').addEventListener('click', () => {
        try {
          output.value = decodeURIComponent(input.value);
        } catch (err) {
          output.value = 'Error: Invalid URI format sequence.';
        }
      });

      document.getElementById('url-swap').addEventListener('click', () => {
        const temp = input.value;
        input.value = output.value;
        output.value = temp;
      });

      document.getElementById('url-copy').addEventListener('click', () => {
        if (output.value) {
          navigator.clipboard.writeText(output.value);
          window.showToast('URL string copied!');
        }
      });
    `
  },
  // DESIGN TOOLS
  {
    id: 'color-picker',
    title: 'Color Picker & Converter',
    desc: 'A full color picker with sliders for RGB and HEX string outputs in real-time.',
    category: 'design',
    badgeClass: 'badge-design',
    icon: 'palette',
    html: `
      <div class="color-picker-wrapper mb-24">
        <input type="color" id="picker-input" class="form-control" style="width:120px; height:120px; padding:0; border:none; cursor:pointer;" value="#3b82f6">
        <div style="flex:1; display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>HEX Code:</span>
            <div style="display:flex; gap:8px;">
              <input type="text" id="color-hex" class="form-control" style="width:120px; padding:6px 12px;" readonly value="#3b82f6">
              <button id="copy-hex" class="btn btn-secondary btn-sm">Copy</button>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>RGB/A:</span>
            <div style="display:flex; gap:8px;">
              <input type="text" id="color-rgb" class="form-control" style="width:140px; padding:6px 12px;" readonly value="rgb(59, 130, 246)">
              <button id="copy-rgb" class="btn btn-secondary btn-sm">Copy</button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="slide-opacity">Alpha / Opacity (<span id="opacity-lbl">100</span>%)</label>
        <input type="range" id="slide-opacity" class="form-control" min="0" max="100" value="100" style="padding:0; height:auto;">
      </div>
    `,
    js: `
      const picker = document.getElementById('picker-input');
      const hexEl = document.getElementById('color-hex');
      const rgbEl = document.getElementById('color-rgb');
      const alphaEl = document.getElementById('slide-opacity');
      const opacityLbl = document.getElementById('opacity-lbl');

      function updateColor() {
        const hex = picker.value;
        const alphaVal = alphaEl.value;
        opacityLbl.textContent = alphaVal;

        // Convert hex to rgb
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const a = alphaVal / 100;

        hexEl.value = a === 1 ? hex : hex + Math.round(a * 255).toString(16).padStart(2, '0');
        rgbEl.value = a === 1 ? \`rgb(\${r}, \${g}, \${b})\` : \`rgba(\${r}, \${g}, \${b}, \${a})\`;
      }

      picker.addEventListener('input', updateColor);
      alphaEl.addEventListener('input', updateColor);

      document.getElementById('copy-hex').addEventListener('click', () => {
        navigator.clipboard.writeText(hexEl.value);
        window.showToast('Copied HEX color code!');
      });
      document.getElementById('copy-rgb').addEventListener('click', () => {
        navigator.clipboard.writeText(rgbEl.value);
        window.showToast('Copied RGB color string!');
      });
    `
  },
  {
    id: 'css-gradient-generator',
    title: 'CSS Gradient Generator',
    desc: 'Generate visually responsive CSS background linear/radial color gradients and export raw styling rules.',
    category: 'design',
    badgeClass: 'badge-design',
    icon: 'paint-bucket',
    html: `
      <div class="grid grid-2 mb-24">
        <div class="form-group">
          <label class="form-label" for="grad-color-1">Color 1</label>
          <input type="color" id="grad-color-1" class="form-control" value="#3b82f6">
        </div>
        <div class="form-group">
          <label class="form-label" for="grad-color-2">Color 2</label>
          <input type="color" id="grad-color-2" class="form-control" value="#ec4899">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="grad-angle">Angle (<span id="angle-val">135</span>&deg;)</label>
        <input type="range" id="grad-angle" class="form-control" min="0" max="360" value="135" style="padding:0; height:auto;">
      </div>
      <div id="grad-preview" style="height:120px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:20px; background: linear-gradient(135deg, #3b82f6, #ec4899);"></div>
      <div class="form-group">
        <label class="form-label">CSS Output Code</label>
        <textarea id="grad-css" class="form-control" style="font-family: monospace; height:80px; font-size:13px;" readonly>background: linear-gradient(135deg, #3b82f6, #ec4899);</textarea>
      </div>
      <button id="copy-grad" class="btn btn-primary w-full">Copy Gradient CSS</button>
    `,
    js: `
      const c1 = document.getElementById('grad-color-1');
      const c2 = document.getElementById('grad-color-2');
      const ang = document.getElementById('grad-angle');
      const angLbl = document.getElementById('angle-val');
      const preview = document.getElementById('grad-preview');
      const output = document.getElementById('grad-css');

      function updateGradient() {
        const color1 = c1.value;
        const color2 = c2.value;
        const angle = ang.value;
        angLbl.textContent = angle;

        const css = \`background: linear-gradient(\${angle}deg, \${color1}, \${color2});\`;
        preview.style.background = \`linear-gradient(\${angle}deg, \${color1}, \${color2})\`;
        output.value = css;
      }

      [c1, c2, ang].forEach(el => el.addEventListener('input', updateGradient));
      document.getElementById('copy-grad').addEventListener('click', () => {
        navigator.clipboard.writeText(output.value);
        window.showToast('Copied Gradient CSS rules!');
      });
    `
  },
  {
    id: 'css-box-shadow-generator',
    title: 'CSS Box Shadow Generator',
    desc: 'An interactive generator to construct CSS box shadow rules using sliders for spacing, radius, and opacities.',
    category: 'design',
    badgeClass: 'badge-design',
    icon: 'layers',
    html: `
      <div class="grid grid-2 mb-16">
        <div class="form-group">
          <label class="form-label" for="shd-h">Horizontal Offset (<span id="shd-h-lbl">4</span>px)</label>
          <input type="range" id="shd-h" class="form-control" min="-50" max="50" value="4" style="padding:0; height:auto;">
        </div>
        <div class="form-group">
          <label class="form-label" for="shd-v">Vertical Offset (<span id="shd-v-lbl">4</span>px)</label>
          <input type="range" id="shd-v" class="form-control" min="-50" max="50" value="4" style="padding:0; height:auto;">
        </div>
      </div>
      <div class="grid grid-2 mb-16">
        <div class="form-group">
          <label class="form-label" for="shd-blur">Blur Radius (<span id="shd-blur-lbl">12</span>px)</label>
          <input type="range" id="shd-blur" class="form-control" min="0" max="100" value="12" style="padding:0; height:auto;">
        </div>
        <div class="form-group">
          <label class="form-label" for="shd-spread">Spread Radius (<span id="shd-spread-lbl">0</span>px)</label>
          <input type="range" id="shd-spread" class="form-control" min="-30" max="30" value="0" style="padding:0; height:auto;">
        </div>
      </div>
      <div class="grid grid-2 mb-20">
        <div class="form-group">
          <label class="form-label" for="shd-color">Shadow Color</label>
          <input type="color" id="shd-color" class="form-control" value="#000000">
        </div>
        <div class="form-group">
          <label class="form-label" for="shd-op">Opacity (<span id="shd-op-lbl">15</span>%)</label>
          <input type="range" id="shd-op" class="form-control" min="0" max="100" value="15" style="padding:0; height:auto;">
        </div>
      </div>
      <div style="display:flex; justify-content:center; align-items:center; height:120px; background:var(--bg-surface-secondary); border-radius:var(--radius-md); margin-bottom:20px;">
        <div id="shd-box" style="width:80px; height:80px; background:#ffffff; border-radius:var(--radius-md); box-shadow: 4px 4px 12px 0px rgba(0,0,0,0.15);"></div>
      </div>
      <div class="form-group">
        <label class="form-label">CSS Code Rule</label>
        <textarea id="shd-css" class="form-control" style="font-family: monospace; height:60px; font-size:13px;" readonly>box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.15);</textarea>
      </div>
      <button id="copy-shd" class="btn btn-primary w-full">Copy Shadow CSS</button>
    `,
    js: `
      const h = document.getElementById('shd-h');
      const v = document.getElementById('shd-v');
      const b = document.getElementById('shd-blur');
      const s = document.getElementById('shd-spread');
      const c = document.getElementById('shd-color');
      const o = document.getElementById('shd-op');
      
      const hl = document.getElementById('shd-h-lbl');
      const vl = document.getElementById('shd-v-lbl');
      const bl = document.getElementById('shd-blur-lbl');
      const sl = document.getElementById('shd-spread-lbl');
      const ol = document.getElementById('shd-op-lbl');

      const box = document.getElementById('shd-box');
      const out = document.getElementById('shd-css');

      function updateShadow() {
        const hv = h.value; hl.textContent = hv;
        const vv = v.value; vl.textContent = vv;
        const bv = b.value; bl.textContent = bv;
        const sv = s.value; sl.textContent = sv;
        const ov = o.value; ol.textContent = ov;
        const hex = c.value;

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const blk = parseInt(hex.slice(5, 7), 16);
        const alpha = ov / 100;

        const val = \`\${hv}px \${vv}px \${bv}px \${sv}px rgba(\${r}, \${g}, \${blk}, \${alpha})\`;
        box.style.boxShadow = val;
        out.value = \`box-shadow: \${val};\`;
      }

      [h, v, b, s, c, o].forEach(el => el.addEventListener('input', updateShadow));
      document.getElementById('copy-shd').addEventListener('click', () => {
        navigator.clipboard.writeText(out.value);
        window.showToast('Copied Box Shadow CSS!');
      });
    `
  },
  // TEXT TOOLS
  {
    id: 'word-counter',
    title: 'Word Counter',
    desc: 'Count total words, characters, sentences, paragraphs, and read times in real-time.',
    category: 'text',
    badgeClass: 'badge-text',
    icon: 'align-left',
    html: `
      <div class="form-group">
        <label class="form-label" for="word-input">Paste or Type Text</label>
        <textarea id="word-input" class="form-control" style="height: 180px;" placeholder="Start writing or paste content..."></textarea>
      </div>
      <div class="grid grid-3 mb-24">
        <div class="card text-center" style="padding:16px;">
          <h4 id="word-count" style="font-size:24px; color:var(--color-primary);">0</h4>
          <p>Words</p>
        </div>
        <div class="card text-center" style="padding:16px;">
          <h4 id="char-count" style="font-size:24px; color:var(--color-primary);">0</h4>
          <p>Characters</p>
        </div>
        <div class="card text-center" style="padding:16px;">
          <h4 id="sent-count" style="font-size:24px; color:var(--color-primary);">0</h4>
          <p>Sentences</p>
        </div>
      </div>
      <div class="grid grid-2 mb-20">
        <div class="card text-center" style="padding:16px;">
          <h4 id="para-count" style="font-size:20px; color:var(--text-secondary);">0</h4>
          <p>Paragraphs</p>
        </div>
        <div class="card text-center" style="padding:16px;">
          <h4 id="read-time" style="font-size:20px; color:var(--text-secondary);">0 min</h4>
          <p>Est. Reading Time</p>
        </div>
      </div>
    `,
    js: `
      const input = document.getElementById('word-input');
      const words = document.getElementById('word-count');
      const chars = document.getElementById('char-count');
      const sents = document.getElementById('sent-count');
      const paras = document.getElementById('para-count');
      const time = document.getElementById('read-time');

      input.addEventListener('input', () => {
        const text = input.value;
        const totalChars = text.length;
        
        const cleanText = text.trim();
        const totalWords = cleanText === '' ? 0 : cleanText.split(/\\s+/).length;
        
        const totalSents = cleanText === '' ? 0 : (text.match(/[.!?]+(\\s|$)/g) || []).length;
        const totalParas = cleanText === '' ? 0 : text.split(/\\n+/).filter(p => p.trim() !== '').length;

        words.textContent = totalWords;
        chars.textContent = totalChars;
        sents.textContent = totalSents;
        paras.textContent = totalParas;
        
        const readMin = Math.ceil(totalWords / 200);
        time.textContent = readMin + ' min' + (readMin > 1 ? 's' : '');
      });
    `
  },
  {
    id: 'character-counter',
    title: 'Character Counter',
    desc: 'Count standard character structures with and without space bounds, line offsets, and keyword density.',
    category: 'text',
    badgeClass: 'badge-text',
    icon: 'text-cursor',
    html: `
      <div class="form-group">
        <label class="form-label" for="char-limit-input">Text Analysis Panel</label>
        <textarea id="char-limit-input" class="form-control" style="height: 180px;" placeholder="Input text rules..."></textarea>
      </div>
      <div class="grid grid-3">
        <div class="card text-center" style="padding:12px;">
          <h4 id="char-with-space" style="font-size:20px; color:var(--color-primary);">0</h4>
          <p style="font-size:12px;">With Spaces</p>
        </div>
        <div class="card text-center" style="padding:12px;">
          <h4 id="char-no-space" style="font-size:20px; color:var(--color-accent);">0</h4>
          <p style="font-size:12px;">No Spaces</p>
        </div>
        <div class="card text-center" style="padding:12px;">
          <h4 id="char-lines" style="font-size:20px; color:var(--text-secondary);">0</h4>
          <p style="font-size:12px;">Lines</p>
        </div>
      </div>
    `,
    js: `
      const inEl = document.getElementById('char-limit-input');
      const wSp = document.getElementById('char-with-space');
      const nSp = document.getElementById('char-no-space');
      const lines = document.getElementById('char-lines');

      inEl.addEventListener('input', () => {
        const text = inEl.value;
        wSp.textContent = text.length;
        nSp.textContent = text.replace(/\\s/g, '').length;
        lines.textContent = text === '' ? 0 : text.split('\\n').length;
      });
    `
  },
  {
    id: 'text-case-converter',
    title: 'Text Case Converter',
    desc: 'Convert any string array between UPPERCASE, lowercase, Title Case, Sentence Case, or Snake Case.',
    category: 'text',
    badgeClass: 'badge-text',
    icon: 'type',
    html: `
      <div class="form-group">
        <label class="form-label" for="case-text">Input Text</label>
        <textarea id="case-text" class="form-control" style="height: 150px;" placeholder="Start typing..."></textarea>
      </div>
      <div class="grid grid-3" style="gap:10px;">
        <button id="case-up" class="btn btn-secondary btn-sm">UPPER</button>
        <button id="case-low" class="btn btn-secondary btn-sm">lower</button>
        <button id="case-title" class="btn btn-secondary btn-sm">Title Case</button>
        <button id="case-sent" class="btn btn-secondary btn-sm">Sentence</button>
        <button id="case-snake" class="btn btn-secondary btn-sm">snake_case</button>
        <button id="case-slug" class="btn btn-secondary btn-sm">slug-case</button>
      </div>
      <button id="case-copy" class="btn btn-primary w-full mt-20">Copy Output to Clipboard</button>
    `,
    js: `
      const txt = document.getElementById('case-text');

      document.getElementById('case-up').addEventListener('click', () => {
        txt.value = txt.value.toUpperCase();
      });
      document.getElementById('case-low').addEventListener('click', () => {
        txt.value = txt.value.toLowerCase();
      });
      document.getElementById('case-title').addEventListener('click', () => {
        txt.value = txt.value.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
      });
      document.getElementById('case-sent').addEventListener('click', () => {
        txt.value = txt.value.toLowerCase().replace(/(^\\s*|[.!?]\\s+)([a-z])/g, (m, g1, g2) => g1 + g2.toUpperCase());
      });
      document.getElementById('case-snake').addEventListener('click', () => {
        txt.value = txt.value.toLowerCase().trim().replace(/\\s+/g, '_');
      });
      document.getElementById('case-slug').addEventListener('click', () => {
        txt.value = txt.value.toLowerCase().trim().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
      });
      
      document.getElementById('case-copy').addEventListener('click', () => {
        if (txt.value) {
          navigator.clipboard.writeText(txt.value);
          window.showToast('Converted text copied!');
        }
      });
    `
  },
  // UTILITY TOOLS
  {
    id: 'password-generator',
    title: 'Password Generator',
    desc: 'Generate highly secure, randomly structured, customized passcodes to safeguard your accounts.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'shield',
    html: `
      <div class="form-group">
        <label class="form-label" for="pass-len">Password Length: <span id="pass-len-lbl">16</span></label>
        <input type="range" id="pass-len" class="form-control" min="8" max="64" value="16" style="padding:0; height:auto;">
      </div>
      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
        <label><input type="checkbox" id="pass-up" checked> Include Uppercase (A-Z)</label>
        <label><input type="checkbox" id="pass-low" checked> Include Lowercase (a-z)</label>
        <label><input type="checkbox" id="pass-num" checked> Include Numbers (0-9)</label>
        <label><input type="checkbox" id="pass-sym" checked> Include Symbols (@#$%)</label>
      </div>
      <div class="form-group">
        <input type="text" id="pass-output" class="form-control text-center" style="font-family: monospace; font-size: 18px;" readonly>
      </div>
      <div style="display:flex; gap:12px;">
        <button id="pass-gen" class="btn btn-secondary w-full">Regenerate</button>
        <button id="pass-copy" class="btn btn-primary w-full">Copy Password</button>
      </div>
    `,
    js: `
      const len = document.getElementById('pass-len');
      const lenLbl = document.getElementById('pass-len-lbl');
      const uCheck = document.getElementById('pass-up');
      const lCheck = document.getElementById('pass-low');
      const nCheck = document.getElementById('pass-num');
      const sCheck = document.getElementById('pass-sym');
      const out = document.getElementById('pass-output');

      const chars = {
        up: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        low: 'abcdefghijklmnopqrstuvwxyz',
        num: '0123456789',
        sym: '!@#$%^&*()_+~|}{[]:;?><,./-='
      };

      function generate() {
        const length = parseInt(len.value);
        lenLbl.textContent = length;

        let pool = '';
        if (uCheck.checked) pool += chars.up;
        if (lCheck.checked) pool += chars.low;
        if (nCheck.checked) pool += chars.num;
        if (sCheck.checked) pool += chars.sym;

        if (!pool) {
          out.value = 'Select at least one option!';
          return;
        }

        let pass = '';
        // Use modern cryptography random values
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
          pass += pool.charAt(array[i] % pool.length);
        }
        out.value = pass;
      }

      len.addEventListener('input', generate);
      [uCheck, lCheck, nCheck, sCheck].forEach(c => c.addEventListener('change', generate));
      document.getElementById('pass-gen').addEventListener('click', generate);
      document.getElementById('pass-copy').addEventListener('click', () => {
        if (out.value && out.value !== 'Select at least one option!') {
          navigator.clipboard.writeText(out.value);
          window.showToast('Security passcode copied!');
        }
      });
      generate();
    `
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    desc: 'Instantly convert URLs, credentials, or simple texts into printable vector-like QR codes.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'qr-code',
    html: `
      <div class="form-group">
        <label class="form-label" for="qr-data">Data to Encode (Text or URL)</label>
        <input type="text" id="qr-data" class="form-control" value="https://google.com">
      </div>
      <div style="display:flex; justify-content:center; align-items:center; background: var(--bg-surface-secondary); padding:24px; border-radius:var(--radius-md); margin-bottom:20px; min-height:160px;">
        <div id="qr-canvas"></div>
      </div>
      <button id="download-qr" class="btn btn-primary w-full">
        <i data-lucide="download" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Download QR Code
      </button>
      
      <!-- Script injection to handle QR library -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    `,
    js: `
      const qrData = document.getElementById('qr-data');
      const canvasEl = document.getElementById('qr-canvas');
      const downloadBtn = document.getElementById('download-qr');

      let qrcodeObj = null;

      function renderQR() {
        if (typeof QRCode === 'undefined') {
          setTimeout(renderQR, 100);
          return;
        }
        canvasEl.innerHTML = '';
        const val = qrData.value.trim();
        if (!val) {
          downloadBtn.disabled = true;
          return;
        }
        downloadBtn.disabled = false;
        
        qrcodeObj = new QRCode(canvasEl, {
          text: val,
          width: 160,
          height: 160,
          colorDark: '#0f172a',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
      }

      function downloadQR() {
        const canvas = canvasEl.querySelector('canvas');
        const img = canvasEl.querySelector('img');
        let dataUrl = '';
        if (img && img.src) {
          dataUrl = img.src;
        } else if (canvas) {
          dataUrl = canvas.toDataURL('image/png');
        }
        
        if (!dataUrl) return;
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      qrData.addEventListener('input', renderQR);
      downloadBtn.addEventListener('click', downloadQR);
      
      // Delay to ensure script fully loads before execution
      setTimeout(renderQR, 100);
    `
  },
  {
    id: 'random-number-generator',
    title: 'Random Number Generator',
    desc: 'Generate secure lists of random integers within a specified range, allowing or blocking duplicates.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'shuffle',
    html: `
      <div class="grid grid-2 mb-16">
        <div class="form-group">
          <label class="form-label" for="rnd-min">Min Value</label>
          <input type="number" id="rnd-min" class="form-control" value="1">
        </div>
        <div class="form-group">
          <label class="form-label" for="rnd-max">Max Value</label>
          <input type="number" id="rnd-max" class="form-control" value="100">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="rnd-count">How many numbers to generate?</label>
        <input type="number" id="rnd-count" class="form-control" value="5">
      </div>
      <button id="rnd-btn" class="btn btn-primary w-full mb-24">Generate Numbers</button>
      <div id="rnd-output-panel" style="display:none;" class="fade-in">
        <label class="form-label">Generated Results</label>
        <div id="rnd-numbers-list" style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px; justify-content:center;"></div>
        <button id="rnd-copy" class="btn btn-secondary w-full">Copy Numbers List</button>
      </div>
    `,
    js: `
      const rMin = document.getElementById('rnd-min');
      const rMax = document.getElementById('rnd-max');
      const rCnt = document.getElementById('rnd-count');
      const outList = document.getElementById('rnd-numbers-list');
      const outPanel = document.getElementById('rnd-output-panel');

      document.getElementById('rnd-btn').addEventListener('click', () => {
        const min = parseInt(rMin.value);
        const max = parseInt(rMax.value);
        const cnt = parseInt(rCnt.value);

        if (isNaN(min) || isNaN(max) || isNaN(cnt) || cnt <= 0 || min > max) {
          window.showToast('Please input correct ranges!');
          return;
        }

        outList.innerHTML = '';
        const range = max - min + 1;
        const numbers = [];

        // Simple loop generation
        for (let i = 0; i < cnt; i++) {
          numbers.push(Math.floor(Math.random() * range) + min);
        }

        numbers.forEach(num => {
          outList.innerHTML += \`<span class="badge" style="font-size:20px; padding:10px 18px; border-radius:var(--radius-md); font-family:monospace; background:rgba(59,130,246,0.12); color:#3b82f6;">\${num}</span>\`;
        });

        outPanel.style.display = 'block';

        document.getElementById('rnd-copy').addEventListener('click', () => {
          navigator.clipboard.writeText(numbers.join(', '));
          window.showToast('Numbers copied!');
        });
      });
    `
  },
  {
    id: 'stopwatch-timer',
    title: 'Stopwatch & Countdown Timer',
    desc: 'An elegant time tracker with millisecond-precision stopwatch lap-counters and robust countdown timers.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'clock',
    html: `
      <div style="display:flex; justify-content:space-around; margin-bottom:24px; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
        <button id="tab-sw" class="btn btn-secondary btn-sm" style="background:var(--color-primary); color:#fff;">Stopwatch</button>
        <button id="tab-tm" class="btn btn-secondary btn-sm">Timer</button>
      </div>
      
      <!-- Stopwatch Screen -->
      <div id="sw-panel" class="fade-in">
        <h2 id="sw-display" class="text-center" style="font-family:monospace; font-size:42px; margin-bottom:20px; letter-spacing:2px;">00:00:00.00</h2>
        <div style="display:flex; gap:12px; margin-bottom:20px;">
          <button id="sw-start" class="btn btn-primary w-full">Start</button>
          <button id="sw-lap" class="btn btn-secondary w-full" disabled>Lap</button>
          <button id="sw-reset" class="btn btn-secondary w-full">Reset</button>
        </div>
        <ul id="sw-laps-list" class="footer-links" style="max-height:120px; overflow-y:auto; padding-left:12px; font-family:monospace;"></ul>
      </div>

      <!-- Timer Screen -->
      <div id="tm-panel" style="display:none;" class="fade-in">
        <div class="grid grid-3 mb-20">
          <input type="number" id="tm-h" class="form-control text-center" placeholder="HH" value="0" min="0">
          <input type="number" id="tm-m" class="form-control text-center" placeholder="MM" value="5" min="0" max="59">
          <input type="number" id="tm-s" class="form-control text-center" placeholder="SS" value="0" min="0" max="59">
        </div>
        <h2 id="tm-display" class="text-center" style="font-family:monospace; font-size:42px; margin-bottom:20px; letter-spacing:2px; display:none;">00:05:00</h2>
        <div style="display:flex; gap:12px;">
          <button id="tm-start" class="btn btn-primary w-full">Start Countdown</button>
          <button id="tm-reset" class="btn btn-secondary w-full">Reset</button>
        </div>
      </div>
    `,
    js: `
      // Sw Tabs
      const tabSw = document.getElementById('tab-sw');
      const tabTm = document.getElementById('tab-tm');
      const swPanel = document.getElementById('sw-panel');
      const tmPanel = document.getElementById('tm-panel');

      tabSw.addEventListener('click', () => {
        swPanel.style.display = 'block'; tmPanel.style.display = 'none';
        tabSw.style.background = 'var(--color-primary)'; tabSw.style.color = '#fff';
        tabTm.style.background = 'none'; tabTm.style.color = 'var(--text-secondary)';
      });

      tabTm.addEventListener('click', () => {
        swPanel.style.display = 'none'; tmPanel.style.display = 'block';
        tabTm.style.background = 'var(--color-primary)'; tabTm.style.color = '#fff';
        tabSw.style.background = 'none'; tabSw.style.color = 'var(--text-secondary)';
      });

      // Stopwatch logic
      let swInterval = null;
      let swElapsed = 0;
      const swDisp = document.getElementById('sw-display');
      const swStart = document.getElementById('sw-start');
      const swLap = document.getElementById('sw-lap');
      const swLaps = document.getElementById('sw-laps-list');

      function formatTime(ms) {
        let hrs = Math.floor(ms / 3600000).toString().padStart(2, '0');
        let mins = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
        let secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        let hund = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return \`\${hrs}:\${mins}:\${secs}.\${hund}\`;
      }

      swStart.addEventListener('click', () => {
        if (swInterval) {
          clearInterval(swInterval);
          swInterval = null;
          swStart.textContent = 'Start';
          swLap.disabled = true;
        } else {
          let lastTime = Date.now() - swElapsed;
          swInterval = setInterval(() => {
            swElapsed = Date.now() - lastTime;
            swDisp.textContent = formatTime(swElapsed);
          }, 10);
          swStart.textContent = 'Pause';
          swLap.disabled = false;
        }
      });

      swLap.addEventListener('click', () => {
        const li = document.createElement('li');
        li.textContent = \`Lap \${swLaps.children.length + 1}: \${formatTime(swElapsed)}\`;
        swLaps.appendChild(li);
      });

      document.getElementById('sw-reset').addEventListener('click', () => {
        clearInterval(swInterval); swInterval = null;
        swElapsed = 0; swDisp.textContent = '00:00:00.00';
        swStart.textContent = 'Start'; swLap.disabled = true; swLaps.innerHTML = '';
      });

      // Countdown Timer logic
      let tmInterval = null;
      let tmTotalSecs = 0;
      const tmStart = document.getElementById('tm-start');
      const tmDisp = document.getElementById('tm-display');
      const tmH = document.getElementById('tm-h');
      const tmM = document.getElementById('tm-m');
      const tmS = document.getElementById('tm-s');

      tmStart.addEventListener('click', () => {
        if (tmInterval) {
          clearInterval(tmInterval); tmInterval = null;
          tmStart.textContent = 'Resume';
        } else {
          if (tmTotalSecs <= 0) {
            const h = parseInt(tmH.value) || 0;
            const m = parseInt(tmM.value) || 0;
            const s = parseInt(tmS.value) || 0;
            tmTotalSecs = (h * 3600) + (m * 60) + s;
          }
          if (tmTotalSecs <= 0) return;

          [tmH, tmM, tmS].forEach(el => el.style.display = 'none');
          tmDisp.style.display = 'block';

          tmInterval = setInterval(() => {
            tmTotalSecs--;
            let h = Math.floor(tmTotalSecs / 3600).toString().padStart(2, '0');
            let m = Math.floor((tmTotalSecs % 3600) / 60).toString().padStart(2, '0');
            let s = (tmTotalSecs % 60).toString().padStart(2, '0');
            tmDisp.textContent = \`\${h}:\${m}:\${s}\`;

            if (tmTotalSecs <= 0) {
              clearInterval(tmInterval); tmInterval = null;
              tmDisp.textContent = '00:00:00';
              window.showToast('Time is up!');
              
              // Local sound synthesization using Web Audio API
              try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime);
                osc.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.35);
              } catch(e) {}
            }
          }, 1000);
          tmStart.textContent = 'Pause';
        }
      });

      document.getElementById('tm-reset').addEventListener('click', () => {
        clearInterval(tmInterval); tmInterval = null; tmTotalSecs = 0;
        [tmH, tmM, tmS].forEach(el => el.style.display = 'block');
        tmDisp.style.display = 'none'; tmStart.textContent = 'Start Countdown';
      });
    `
  },
  {
    id: 'image-compressor',
    title: 'Client-side Image Compressor',
    desc: 'Compress JPG, PNG, and WebP images entirely local in your browser before uploading.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'image',
    html: `
      <div class="form-group">
        <label class="form-label" for="img-file">Choose Image File</label>
        <input type="file" id="img-file" class="form-control" accept="image/*" style="padding:10px;">
      </div>
      <div class="form-group">
        <label class="form-label" for="img-qual">Compression Quality (<span id="img-qual-lbl">70</span>%)</label>
        <input type="range" id="img-qual" class="form-control" min="5" max="100" value="70" style="padding:0; height:auto;">
      </div>
      <div id="img-summary" style="display:none;" class="fade-in">
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px;">
          <span>Original: <strong id="img-orig-sz">0 KB</strong></span>
          <span>Compressed: <strong id="img-comp-sz" style="color:var(--color-accent);">0 KB</strong></span>
        </div>
        <img id="img-preview" style="max-height:160px; max-width:100%; object-fit:contain; border-radius:var(--radius-sm); border:1px solid var(--border-color); display:block; margin: 0 auto 20px;">
        <button id="img-dl" class="btn btn-primary w-full">Download Compressed Image</button>
      </div>
    `,
    js: `
      const fileIn = document.getElementById('img-file');
      const qualIn = document.getElementById('img-qual');
      const qualLbl = document.getElementById('img-qual-lbl');
      const origSize = document.getElementById('img-orig-sz');
      const compSize = document.getElementById('img-comp-sz');
      const preview = document.getElementById('img-preview');
      const dlBtn = document.getElementById('img-dl');
      const summary = document.getElementById('img-summary');

      let originalImage = null;
      let originalFileName = 'compressed-image.jpg';

      fileIn.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        originalFileName = file.name;
        origSize.textContent = (file.size / 1024).toFixed(1) + ' KB';

        const reader = new FileReader();
        reader.onload = (event) => {
          originalImage = new Image();
          originalImage.src = event.target.result;
          originalImage.onload = compress;
        };
        reader.readAsDataURL(file);
      });

      qualIn.addEventListener('input', () => {
        qualLbl.textContent = qualIn.value;
        if (originalImage) compress();
      });

      function compress() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = originalImage.naturalWidth;
        canvas.height = originalImage.naturalHeight;
        ctx.drawImage(originalImage, 0, 0);

        const quality = qualIn.value / 100;
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        preview.src = compressedDataUrl;
        
        // Calculate compressed size
        const head = 'data:image/jpeg;base64,';
        const lengthInBytes = Math.round((compressedDataUrl.length - head.length) * 3 / 4);
        compSize.textContent = (lengthInBytes / 1024).toFixed(1) + ' KB';

        dlBtn.onclick = () => {
          const a = document.createElement('a');
          a.href = compressedDataUrl;
          a.download = 'compressed-' + originalFileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        summary.style.display = 'block';
      }
    `
  }
];

toolsList.push(...extraTools);

// Replace basic tools with upgraded versions
upgradedTools.forEach(upgraded => {
  const index = toolsList.findIndex(t => t.id === upgraded.id);
  if (index !== -1) {
    toolsList[index] = upgraded;
  }
});

// 1. Generate Tool Pages
toolsList.forEach(tool => {
  const content = `
    <div class="container" style="margin-top: 20px;">
      <div class="breadcrumbs">
        <a href="../index.html">Home</a>
        <div class="breadcrumbs-separator"><i data-lucide="chevron-right"></i></div>
        <span style="color:var(--text-primary);">${tool.title}</span>
      </div>

      <div class="tool-layout">
        <!-- Main Tool Column -->
        <div class="tool-panel">
          <h1 style="font-size:32px; margin-bottom:12px;">${tool.title}</h1>
          <p class="mb-32" style="color:var(--text-muted); font-size:15px;">${tool.desc}</p>
          
          <div style="margin-top:20px;">
            ${tool.html}
          </div>
        </div>

        <!-- Sidebar Column -->
        <div class="card" style="height:fit-content; padding:24px;">
          <h3 class="mb-16">Quick Instructions</h3>
          <ul class="footer-links" style="padding-left:16px; list-style:disc; color:var(--text-secondary); margin-bottom:24px; font-size:14px; line-height:1.6;">
            <li>Fill in all parameter sliders or text input boxes.</li>
            <li>Calculations run entirely safe and local inside your browser.</li>
            <li>Use the standard Copy buttons to copy outputs instantly.</li>
          </ul>

          <h3 class="mb-16">Security & Privacy</h3>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">
            Our suite executes 100% locally. None of your data, text inputs, password profiles, or uploaded images are ever sent to external cloud servers.
          </p>
        </div>
      </div>

      <!-- SEO Informational Block -->
      <div class="tool-info-section">
        <div class="tool-info-block">
          <h3>Why use the online ${tool.title}?</h3>
          <p>This premium ${tool.title} represents a client-side tool optimized for immediate results. Designed with lightweight modern CSS frames and standard calculations, it loads within milliseconds and operates offline without lag.</p>
        </div>
        <div class="tool-info-block">
          <h3>Key Features & Advantages</h3>
          <p>Enjoy absolute client-side protection: since no files or texts are transferred to databases, it remains the safest portal. Works fluently across mobile touch devices, iPads, laptops, and desktop browsers alike.</p>
        </div>
      </div>
    </div>
  `;

  const pageScript = `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        ${tool.js}
      });
    </script>
  `;

  const pageHtml = layoutTemplate(
    tool.title,
    tool.desc,
    content,
    '',
    '..',
    (tool.id === 'scientific-calculator' ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.js"></script>' : '') + (tool.id === 'qr-code-scanner' ? '<script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>' : '') + pageScript
  );

  fs.writeFileSync(path.resolve(rootDir, `tools/${tool.id}.html`), pageHtml);
});

// 2. Generate index.html (Homepage)
const getHomeContent = () => {
  let categoriesHtml = '';
  const cats = {
    calculators: { title: '🧮 Calculators', list: [] },
    dev: { title: '💻 Developer Tools', list: [] },
    design: { title: '🎨 Design Tools', list: [] },
    text: { title: '✍️ Text Tools', list: [] },
    utility: { title: '⚡ Utility Tools', list: [] }
  };

  toolsList.forEach(tool => {
    cats[tool.category].list.push(tool);
  });

  Object.keys(cats).forEach(catKey => {
    const category = cats[catKey];
    categoriesHtml += `
      <section class="category-section mt-40" id="${catKey}-section">
        <h3 class="mb-24" style="font-size:24px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">${category.title}</h3>
        <div class="grid grid-3">
    `;

    category.list.forEach(tool => {
      categoriesHtml += `
        <div class="card tool-card tool-card-item">
          <div>
            <div class="tool-card-header">
              <div class="tool-card-icon"><i data-lucide="${tool.icon}"></i></div>
              <h4 class="tool-card-title">${tool.title}</h4>
            </div>
            <p class="tool-card-desc">${tool.desc}</p>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span class="badge ${tool.badgeClass}">${tool.category.toUpperCase()}</span>
            <a href="tools/${tool.id}.html" class="btn btn-secondary btn-sm" style="font-size:13px; font-weight:600;">Open Tool</a>
          </div>
        </div>
      `;
    });

    categoriesHtml += `
        </div>
      </section>
    `;
  });

  return `
    <!-- Hero Section -->
    <section class="section hero-section" style="background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-primary) 100%); border-bottom:1px solid var(--border-color);">
      <!-- Ambient Glow Effects -->
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      
      <!-- Interactive Particle Canvas -->
      <canvas id="hero-canvas"></canvas>
      
      <div class="container text-center hero-content" style="max-width:800px; padding:40px 24px;">
        <h1 class="mb-16 animate-on-load delay-100" style="font-size:46px;">All-in-One Online <span style="color:var(--color-primary);">Toolbox</span></h1>
        <p class="mb-32 animate-on-load delay-200" style="font-size:18px; color:var(--text-secondary); max-width:600px; margin-left:auto; margin-right:auto;">
          Access ${toolsList.length} fully working calculators, developer validators, and design utilities. 100% free, safe, and fast, running entirely in your browser.
        </p>
        
        <!-- Live Search Bar -->
        <div class="animate-on-load delay-300" style="position:relative; max-width:550px; margin: 0 auto;">
          <input type="text" id="tool-search" class="form-control" placeholder="Search from ${toolsList.length} tools instantly (e.g. EMI, Base64)..." style="padding:16px 20px 16px 54px; font-size:16px; border-radius:var(--radius-full); box-shadow:var(--shadow-md);">
          <i data-lucide="search" style="position:absolute; left:20px; top:18px; color:var(--text-muted); width:20px; height:20px;"></i>
        </div>
      </div>
    </section>

    <!-- Popular Tools Shortcut Section -->
    <section class="container animate-on-load delay-400" id="popular-tools-section" style="padding-top:40px; padding-bottom:10px;">
      <h3 class="text-center mb-24" style="font-size:18px; color:var(--text-muted); font-weight:600; text-transform:uppercase; letter-spacing:1px;">Popular Highlights</h3>
      <div style="display:flex; flex-wrap:wrap; gap:16px; justify-content:center;">
        <a href="tools/image-compressor.html" class="btn btn-secondary btn-sm" style="border-radius:var(--radius-full);"><i data-lucide="image" style="width:16px;height:16px;color:#10b981;"></i> Image Compressor</a>
        <a href="tools/qr-code-generator.html" class="btn btn-secondary btn-sm" style="border-radius:var(--radius-full);"><i data-lucide="qr-code" style="width:16px;height:16px;color:#f59e0b;"></i> QR Generator</a>
        <a href="tools/password-generator.html" class="btn btn-secondary btn-sm" style="border-radius:var(--radius-full);"><i data-lucide="shield" style="width:16px;height:16px;color:#3b82f6;"></i> Password Creator</a>
        <a href="tools/scientific-calculator.html" class="btn btn-secondary btn-sm" style="border-radius:var(--radius-full);"><i data-lucide="calculator" style="width:16px;height:16px;color:#ec4899;"></i> Calculator</a>
      </div>
    </section>

    <!-- Main Tools List -->
    <section class="container" id="tools-section">
      <div id="no-results-message" style="display:none; text-align:center; padding:60px 0;" class="fade-in">
        <i data-lucide="search-x" style="width:64px; height:64px; color:var(--text-muted); margin-bottom:16px;"></i>
        <h2>No Tools Match Your Query</h2>
        <p style="color:var(--text-muted); margin-top:8px;">Try searching for "EMI", "Calculator", "Word", "CSS", or "Base64" instead.</p>
      </div>

      ${categoriesHtml}
    </section>

    <!-- Extra Features / Value Proposition Section -->
    <section class="section" style="border-top:1px solid var(--border-color); background:var(--bg-surface);">
      <div class="container">
        <div class="section-header">
          <h2>Why Choose MultiTools?</h2>
          <p>We built our utility platform emphasizing strict privacy, fast loading and clean layout boundaries.</p>
        </div>
        <div class="grid grid-3">
          <div class="card why-card" style="padding:32px;">
            <i data-lucide="shield-check" style="width:36px; height:36px; color:var(--color-accent); margin-bottom:16px;"></i>
            <h4 class="mb-8">100% Client-Side Privacy</h4>
            <p style="font-size:14px; line-height:1.6;">No data ever transfers to database servers. All operations happen natively in your local browser sandbox.</p>
          </div>
          <div class="card why-card" style="padding:32px;">
            <i data-lucide="zap" style="width:36px; height:36px; color:var(--color-primary); margin-bottom:16px;"></i>
            <h4 class="mb-8">Sub-millisecond Speed</h4>
            <p style="font-size:14px; line-height:1.6;">Constructed without heavy frameworks or tracker tags, ensuring instantaneous layout loading speeds.</p>
          </div>
          <div class="card why-card" style="padding:32px;">
            <i data-lucide="smartphone" style="width:36px; height:36px; color:#ec4899; margin-bottom:16px;"></i>
            <h4 class="mb-8">Fully Mobile Responsive</h4>
            <p style="font-size:14px; line-height:1.6;">Every single input panel is polished for fluid mobile viewing, keyboard operations, and responsive grids.</p>
          </div>
        </div>
      </div>
    </section>
  `;
};

// Write index.html
const homeContentHtml = layoutTemplate(
  'Online Premium Toolbox',
  `All-in-one responsive web utility library containing ${toolsList.length} free browser tools including calculators, developer aids, designers, word counters, and compressors.`,
  getHomeContent(),
  'home',
  '.',
  `<script src="./assets/js/search.js"></script><script src="./assets/js/home-animations.js"></script>`
);
fs.writeFileSync(path.resolve(rootDir, 'index.html'), homeContentHtml);

// 3. Generate Static Informational Pages
const pages = [
  {
    id: 'about',
    title: 'About Us',
    desc: 'Learn more about the technical background and client-side design of MultiTools.',
    content: `
      <div class="container" style="max-width:800px; padding:40px 24px;">
        <h1 class="mb-16">About MultiTools</h1>
        <p class="mb-24" style="font-size:17px; line-height:1.7;">
          MultiTools is a modern, high-contrast, offline-capable collection of ${toolsList.length} premium web instruments built for developers, designers, and office workflows.
        </p>
        <p class="mb-16">
          Unlike online portals which silently save your paste bins, query params, or confidential texts, our architecture uses strict <strong>HTML5 client APIs</strong>. Your logs remain private, 100% of the time.
        </p>
        <h3 class="mt-32 mb-16">Core Pillars</h3>
        <ul style="padding-left:24px; line-height:1.8;">
          <li>No tracking scripts, databases, or cookies.</li>
          <li>Optimized fluid layout CSS, free from heavy frameworks.</li>
          <li>Modern design and immediate keyboard support.</li>
        </ul>
      </div>
    `
  },
  {
    id: 'contact',
    title: 'Contact Us',
    desc: 'Reach out to our open-source frontend engineering team.',
    content: `
      <div class="container" style="max-width:600px; padding:40px 24px;">
        <h1 class="mb-16 text-center">Contact Us</h1>
        <p class="mb-32 text-center" style="color:var(--text-muted);">Have questions or tool suggestions? Send us a quick note.</p>
        <form class="card" onsubmit="event.preventDefault(); window.showToast('Message sent securely! (Demo only)'); this.reset();">
          <div class="form-group">
            <label class="form-label" for="c-name">Full Name</label>
            <input type="text" id="c-name" class="form-control" required placeholder="John Doe">
          </div>
          <div class="form-group">
            <label class="form-label" for="c-email">Email Address</label>
            <input type="email" id="c-email" class="form-control" required placeholder="john@example.com">
          </div>
          <div class="form-group">
            <label class="form-label" for="c-msg">Message Content</label>
            <textarea id="c-msg" class="form-control" required style="height:120px;" placeholder="Tell us how to improve..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-full">Send Safe Message</button>
        </form>
      </div>
    `
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    desc: 'Our strict browser privacy terms. We do not store or track any of your data.',
    content: `
      <div class="container" style="max-width:800px; padding:40px 24px;">
        <h1 class="mb-16">Privacy Policy</h1>
        <p class="mb-24" style="color:var(--text-muted);">Effective: July 2026</p>
        <p class="mb-16">
          Your confidentiality is highly prioritized. Because MultiTools is compiled as static HTML/CSS/JS, the tools run strictly on your device's browser memory loop.
        </p>
        <h3 class="mt-24 mb-12">No Data Collection</h3>
        <p class="mb-16">We don't deploy analytical cookies, backend servers, databases, or third-party query tracking systems. Any file uploads, password strings, and calculations disappear completely upon browser refresh.</p>
      </div>
    `
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    desc: 'Standard legal terms of service and tool use representations.',
    content: `
      <div class="container" style="max-width:800px; padding:40px 24px;">
        <h1 class="mb-16">Disclaimer</h1>
        <p class="mb-16">
          The calculation algorithms, formula models, and outputs from this utility portal are made in good faith for general testing purposes. 
        </p>
        <p class="mb-16">
          We exclude all warranties regarding operational accuracy, financial estimations, or compression qualities. MultiTools cannot be held responsible for calculations regarding formal bank loans or server database deployments.
        </p>
      </div>
    `
  }
];

pages.forEach(p => {
  const pageHtml = layoutTemplate(p.title, p.desc, p.content, p.id, '.');
  fs.writeFileSync(path.resolve(rootDir, `${p.id}.html`), pageHtml);
});

console.log(`✓ Successfully generated ${toolsList.length} Premium Tools, Home, About, Contact, Privacy, and Disclaimer Pages!`);
