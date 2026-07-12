// Upgraded, highly polished versions of design and utility tools
export const upgradedTools = [
  {
    id: 'color-picker',
    title: 'Color Picker, Converter & Harmony Suite',
    desc: 'An advanced interactive color engineering laboratory. Analyze WCAG contrast compliance, generate live click-to-apply harmonies, adjust RGB/HSL sliders, and export directly to Hex, RGB, HSL, CMYK, and HSV formats.',
    category: 'design',
    badgeClass: 'badge-design',
    icon: 'palette',
    html: `
      <style>
        .picker-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .picker-grid {
            grid-template-columns: 1fr;
          }
        }
        .color-preview-box {
          height: 140px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          transition: all 0.15s ease;
          position: relative;
          box-shadow: var(--shadow-sm);
        }
        .contrast-badge {
          padding: 4px 10px;
          font-size: 11px;
          border-radius: var(--radius-full);
          font-weight: 700;
          display: inline-block;
          text-align: center;
        }
        .contrast-badge.pass {
          background: #10b981;
          color: #fff;
        }
        .contrast-badge.fail {
          background: #ef4444;
          color: #fff;
        }
        .harmony-swatch {
          height: 48px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          border: 1px solid var(--border-color);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 4px;
        }
        .harmony-swatch:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
          z-index: 2;
        }
        .harmony-swatch span {
          font-size: 10px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          padding: 1px 4px;
          border-radius: var(--radius-sm);
          font-family: monospace;
          pointer-events: none;
        }
        .color-val-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .color-val-row span {
          width: 50px;
          font-weight: 600;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .color-val-row input {
          font-family: monospace;
          font-size: 13px;
        }
        .palette-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .palette-item {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          cursor: pointer;
          border: 1.5px solid var(--border-color);
          transition: transform 0.1s ease;
        }
        .palette-item:hover {
          transform: scale(1.15);
        }
      </style>

      <div class="picker-grid">
        <!-- Left Side: Controls & Sliders -->
        <div class="card" style="padding: 24px;">
          <h3 class="mb-16">Color Adjustments</h3>
          
          <div style="display:flex; gap:16px; align-items:center; margin-bottom:24px;">
            <div style="position:relative; width:90px; height:90px; border-radius:var(--radius-md); overflow:hidden; border:2px solid var(--border-color); cursor:pointer;">
              <input type="color" id="main-color-picker" style="position:absolute; top:-10px; left:-10px; width:120px; height:120px; border:none; cursor:pointer;" value="#3b82f6">
            </div>
            <div style="flex:1;">
              <label class="form-label" for="manual-color-input">Manual Input (Hex, RGB, HSL, CSS Name)</label>
              <div style="display:flex; gap:8px;">
                <input type="text" id="manual-color-input" class="form-control" style="font-family:monospace;" value="#3b82f6">
                <button id="btn-eyedropper" class="btn btn-secondary" style="display:none; padding:10px; align-items:center; justify-content:center; width:42px; height:42px;" title="Eye Dropper / Pick Color from Screen">
                  <i data-lucide="pipette" style="width:18px; height:18px;"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- RGB Sliders -->
          <div class="mb-24">
            <h4 class="mb-12" style="font-size:14px; font-weight:600; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.5px;">RGB Sliders</h4>
            
            <div class="form-group" style="margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span style="color:#ef4444;">Red</span>
                <span id="slide-r-val">59</span>
              </div>
              <input type="range" id="slide-r" class="form-control" min="0" max="255" value="59" style="padding:0; height:6px; background:#fecaca;">
            </div>

            <div class="form-group" style="margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span style="color:#10b981;">Green</span>
                <span id="slide-g-val">130</span>
              </div>
              <input type="range" id="slide-g" class="form-control" min="0" max="255" value="130" style="padding:0; height:6px; background:#bbf7d0;">
            </div>

            <div class="form-group" style="margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span style="color:#3b82f6;">Blue</span>
                <span id="slide-b-val">246</span>
              </div>
              <input type="range" id="slide-b" class="form-control" min="0" max="255" value="246" style="padding:0; height:6px; background:#bfdbfe;">
            </div>
          </div>

          <!-- HSL Sliders -->
          <div>
            <h4 class="mb-12" style="font-size:14px; font-weight:600; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.5px;">HSL & Opacity</h4>
            
            <div class="form-group" style="margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>Hue</span>
                <span><span id="slide-h-val">217</span>&deg;</span>
              </div>
              <input type="range" id="slide-h" class="form-control" min="0" max="360" value="217" style="padding:0; height:6px; background:linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);">
            </div>

            <div class="grid grid-2" style="gap:12px;">
              <div class="form-group" style="margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>Saturation</span>
                  <span><span id="slide-s-val">91</span>%</span>
                </div>
                <input type="range" id="slide-s" class="form-control" min="0" max="100" value="91" style="padding:0; height:6px;">
              </div>

              <div class="form-group" style="margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>Lightness</span>
                  <span><span id="slide-l-val">60</span>%</span>
                </div>
                <input type="range" id="slide-l" class="form-control" min="0" max="100" value="60" style="padding:0; height:6px;">
              </div>
            </div>

            <div class="form-group" style="margin-bottom:0;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>Alpha (Opacity)</span>
                <span><span id="slide-a-val">100</span>%</span>
              </div>
              <input type="range" id="slide-a" class="form-control" min="0" max="100" value="100" style="padding:0; height:6px;">
            </div>
          </div>
        </div>

        <!-- Right Side: Outputs & Harmonies -->
        <div style="display:flex; flex-direction:column; gap:24px;">
          <!-- Preview & Contrast Check -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-16">Analytics & Live Preview</h3>
            
            <div id="live-color-preview" class="color-preview-box mb-16">
              <span id="preview-text">Sample Text</span>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
              <div style="background:var(--bg-surface-secondary); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-color); text-align:center;">
                <p style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:6px;">White Text Contrast</p>
                <div id="white-contrast-ratio" style="font-size:18px; font-weight:700; color:var(--text-primary); margin-bottom:4px;">4.5:1</div>
                <span id="white-wcag-badge" class="contrast-badge" style="background:#10b981; color:#fff;">AAA PASS</span>
              </div>
              <div style="background:var(--bg-surface-secondary); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-color); text-align:center;">
                <p style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:6px;">Black Text Contrast</p>
                <div id="black-contrast-ratio" style="font-size:18px; font-weight:700; color:var(--text-primary); margin-bottom:4px;">4.5:1</div>
                <span id="black-wcag-badge" class="contrast-badge" style="background:#ef4444; color:#fff;">FAIL</span>
              </div>
            </div>

            <!-- Extended WCAG table -->
            <div style="background:var(--bg-surface-secondary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:20px;">
              <h4 class="mb-12" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">WCAG 2.1 Compliance</h4>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                <div>
                  <span style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px;">Normal Text (&lt;18pt)</span>
                  <div style="display:flex; gap:4px; align-items:center;">
                    <span id="wcag-normal-aa" class="contrast-badge" style="padding:2px 6px; font-size:10px;">AA</span>
                    <span id="wcag-normal-aaa" class="contrast-badge" style="padding:2px 6px; font-size:10px;">AAA</span>
                  </div>
                </div>
                <div>
                  <span style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px;">Large Text (&gt;18pt)</span>
                  <div style="display:flex; gap:4px; align-items:center;">
                    <span id="wcag-large-aa" class="contrast-badge" style="padding:2px 6px; font-size:10px;">AA</span>
                    <span id="wcag-large-aaa" class="contrast-badge" style="padding:2px 6px; font-size:10px;">AAA</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Value Exports -->
            <div class="mb-8">
              <div class="color-val-row">
                <span>HEX</span>
                <input type="text" id="out-hex" class="form-control" style="padding:6px 10px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyColorField('out-hex', 'HEX')">Copy</button>
              </div>
              <div class="color-val-row">
                <span>RGBA</span>
                <input type="text" id="out-rgba" class="form-control" style="padding:6px 10px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyColorField('out-rgba', 'RGBA')">Copy</button>
              </div>
              <div class="color-val-row">
                <span>HSLA</span>
                <input type="text" id="out-hsla" class="form-control" style="padding:6px 10px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyColorField('out-hsla', 'HSLA')">Copy</button>
              </div>
              <div class="color-val-row">
                <span>CMYK</span>
                <input type="text" id="out-cmyk" class="form-control" style="padding:6px 10px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyColorField('out-cmyk', 'CMYK')">Copy</button>
              </div>
            </div>
          </div>

          <!-- Tints & Shades -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-12">Tints & Shades</h3>
            <p class="mb-16" style="font-size:12px; color:var(--text-muted);">Tints are lighter variations (mixed with white); Shades are darker variations (mixed with black). Click any swatch to select.</p>
            <div>
              <h5 class="mb-6" style="font-size:12px; font-weight:600; color:var(--text-secondary);">Tints (Lighter)</h5>
              <div style="display:grid; grid-template-columns: repeat(10, 1fr); gap:6px; margin-bottom:16px;" id="tints-container"></div>
              <h5 class="mb-6" style="font-size:12px; font-weight:600; color:var(--text-secondary);">Shades (Darker)</h5>
              <div style="display:grid; grid-template-columns: repeat(10, 1fr); gap:6px;" id="shades-container"></div>
            </div>
          </div>

          <!-- Color Harmonies -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-12">Color Harmonies</h3>
            <p class="mb-16" style="font-size:12px; color:var(--text-muted);">Click any swatch to apply that color as the main selected color.</p>
            
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div>
                <h5 class="mb-6" style="font-size:12px; font-weight:600; color:var(--text-secondary);">Complementary</h5>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;" id="harmony-comp"></div>
              </div>
              <div>
                <h5 class="mb-6" style="font-size:12px; font-weight:600; color:var(--text-secondary);">Analogous</h5>
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px;" id="harmony-anal"></div>
              </div>
              <div>
                <h5 class="mb-6" style="font-size:12px; font-weight:600; color:var(--text-secondary);">Triadic</h5>
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px;" id="harmony-tri"></div>
              </div>
              <div>
                <h5 class="mb-6" style="font-size:12px; font-weight:600; color:var(--text-secondary);">Monochromatic Variations</h5>
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap:8px;" id="harmony-mono"></div>
              </div>
            </div>
          </div>

          <!-- Recently Picked Colors -->
          <div class="card" style="padding: 24px;">
            <h3 class="margin:0;">Recently Picked Colors</h3>
            <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Automatically holds recent colors from your picker session.</p>
            <div class="palette-grid" id="recent-palette-swatches"></div>
          </div>

          <!-- Palette Savings -->
          <div class="card" style="padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 style="margin:0;">Saved Palette History</h3>
              <button class="btn btn-secondary btn-sm" id="btn-clear-palette" style="padding:4px 8px; font-size:11px;">Clear</button>
            </div>
            <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Save up to 16 favorite colors in local storage.</p>
            <div class="palette-grid" id="saved-palette-swatches"></div>
            <button class="btn btn-primary w-full mt-16" id="btn-save-to-palette"><i data-lucide="plus" style="width:16px; height:16px;"></i> Add Current Color</button>
          </div>
        </div>
      </div>
    `,
    js: `
      const picker = document.getElementById('main-color-picker');
      const manualColorInput = document.getElementById('manual-color-input');
      const btnEyedropper = document.getElementById('btn-eyedropper');
      
      const rSlide = document.getElementById('slide-r');
      const gSlide = document.getElementById('slide-g');
      const bSlide = document.getElementById('slide-b');
      
      const rValLbl = document.getElementById('slide-r-val');
      const gValLbl = document.getElementById('slide-g-val');
      const bValLbl = document.getElementById('slide-b-val');
      
      const hSlide = document.getElementById('slide-h');
      const sSlide = document.getElementById('slide-s');
      const lSlide = document.getElementById('slide-l');
      const aSlide = document.getElementById('slide-a');
      
      const hValLbl = document.getElementById('slide-h-val');
      const sValLbl = document.getElementById('slide-s-val');
      const lValLbl = document.getElementById('slide-l-val');
      const aValLbl = document.getElementById('slide-a-val');
      
      const livePreview = document.getElementById('live-color-preview');
      const previewText = document.getElementById('preview-text');
      
      const whiteContrast = document.getElementById('white-contrast-ratio');
      const whiteBadge = document.getElementById('white-wcag-badge');
      const blackContrast = document.getElementById('black-contrast-ratio');
      const blackBadge = document.getElementById('black-wcag-badge');
      
      const wcagNormalAA = document.getElementById('wcag-normal-aa');
      const wcagNormalAAA = document.getElementById('wcag-normal-aaa');
      const wcagLargeAA = document.getElementById('wcag-large-aa');
      const wcagLargeAAA = document.getElementById('wcag-large-aaa');

      const outHex = document.getElementById('out-hex');
      const outRgba = document.getElementById('out-rgba');
      const outHsla = document.getElementById('out-hsla');
      const outCmyk = document.getElementById('out-cmyk');

      const btnSave = document.getElementById('btn-save-to-palette');
      const btnClear = document.getElementById('btn-clear-palette');
      const paletteContainer = document.getElementById('saved-palette-swatches');
      const recentContainer = document.getElementById('recent-palette-swatches');

      let recentColors = [];

      // Helper function to safely copy text
      window.copyColorField = (elementId, formatName) => {
        const input = document.getElementById(elementId);
        if (input && input.value) {
          navigator.clipboard.writeText(input.value);
          window.showToast('Copied ' + formatName + ' format: ' + input.value);
        }
      };

      // Set active picked color from harmony/history click
      window.setPickedColor = (hexValue) => {
        const parsed = parseColor(hexValue);
        if (parsed) {
          picker.value = rgbToHex(parsed.r, parsed.g, parsed.b);
          const hsl = rgbToHsl(parsed.r, parsed.g, parsed.b);
          updateAllDisplays(parsed.r, parsed.g, parsed.b, hsl.h, hsl.s, hsl.l, parsed.a);
          addRecentColor(hexValue);
        }
      };

      // Recent colors list
      function addRecentColor(hex) {
        hex = hex.toUpperCase();
        if (recentColors[0] === hex) return;
        recentColors = recentColors.filter(c => c !== hex);
        recentColors.unshift(hex);
        if (recentColors.length > 12) recentColors.pop();
        renderRecentColors();
      }

      function renderRecentColors() {
        recentContainer.innerHTML = '';
        if (recentColors.length === 0) {
          recentContainer.innerHTML = '<span style="font-size:12px; color:var(--text-muted); font-style:italic;">No recent colors.</span>';
          return;
        }
        recentColors.forEach(color => {
          const item = document.createElement('div');
          item.className = 'palette-item';
          item.style.backgroundColor = color;
          item.title = color;
          item.onclick = () => setPickedColor(color);
          recentContainer.appendChild(item);
        });
      }

      // EyeDropper API Support
      if (window.EyeDropper) {
        btnEyedropper.style.display = 'flex';
        btnEyedropper.addEventListener('click', async () => {
          try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            setPickedColor(result.sRGBHex);
            window.showToast('Picked color from screen: ' + result.sRGBHex);
          } catch (err) {
            if (err.name !== 'AbortError') {
              window.showToast('EyeDropper Error: ' + err.message);
            }
          }
        });
      }

      // RGB to HSL
      function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
          h = s = 0; // achromatic
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
      }

      // HSL to RGB
      function hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;

        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
        return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
        };
      }

      // RGB to CMYK
      function rgbToCmyk(r, g, b) {
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);
        let k = Math.min(c, m, y);

        if (k === 1) {
          return { c: 0, m: 0, y: 0, k: 100 };
        }
        c = Math.round(((c - k) / (1 - k)) * 100);
        m = Math.round(((m - k) / (1 - k)) * 100);
        y = Math.round(((y - k) / (1 - k)) * 100);
        k = Math.round(k * 100);

        return { c, m, y, k };
      }

      // RGB hex conversion helper
      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      // Interpolate colors for tints & shades
      function interpolateColor(r1, g1, b1, r2, g2, b2, factor) {
        return {
          r: Math.round(r1 + factor * (r2 - r1)),
          g: Math.round(g1 + factor * (g2 - g1)),
          b: Math.round(b1 + factor * (b2 - b1))
        };
      }

      // Versatile color parser (accepts Hex, RGB, HSL, Named CSS)
      function parseColor(str) {
        str = str.trim();
        if (!str) return null;
        
        // Let's create a temporary element to let browser parse it
        const dummy = document.createElement('div');
        dummy.style.color = str;
        document.body.appendChild(dummy);
        const computed = window.getComputedStyle(dummy).color;
        document.body.removeChild(dummy);
        
        if (computed === 'rgba(0, 0, 0, 0)' || computed === 'transparent') {
          // If browser couldn't parse it, try adding # for raw hex helper
          if (/^[0-9a-fA-F]{3,8}$/.test(str)) {
            return parseColor('#' + str);
          }
          return null;
        }
        
        const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          return {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
            a: match[4] !== undefined ? Math.round(parseFloat(match[4]) * 100) : 100
          };
        }
        return null;
      }

      // Render tints & shades swatches
      function renderTintsAndShades(r, g, b) {
        const tintsCont = document.getElementById('tints-container');
        const shadesCont = document.getElementById('shades-container');
        tintsCont.innerHTML = '';
        shadesCont.innerHTML = '';

        const factors = [0.15, 0.3, 0.45, 0.6, 0.7, 0.8, 0.88, 0.94, 0.97, 0.99];

        factors.forEach(f => {
          const tint = interpolateColor(r, g, b, 255, 255, 255, f);
          const tintHex = rgbToHex(tint.r, tint.g, tint.b);
          const tintSwatch = document.createElement('div');
          tintSwatch.style.backgroundColor = tintHex;
          tintSwatch.style.height = '24px';
          tintSwatch.style.borderRadius = 'var(--radius-sm)';
          tintSwatch.style.cursor = 'pointer';
          tintSwatch.style.border = '1px solid var(--border-color)';
          tintSwatch.style.transition = 'transform 0.1s ease';
          tintSwatch.title = tintHex;
          tintSwatch.onclick = () => setPickedColor(tintHex);
          tintSwatch.onmouseenter = () => tintSwatch.style.transform = 'scale(1.1)';
          tintSwatch.onmouseleave = () => tintSwatch.style.transform = 'none';
          tintsCont.appendChild(tintSwatch);
        });

        factors.forEach(f => {
          const shade = interpolateColor(r, g, b, 0, 0, 0, f);
          const shadeHex = rgbToHex(shade.r, shade.g, shade.b);
          const shadeSwatch = document.createElement('div');
          shadeSwatch.style.backgroundColor = shadeHex;
          shadeSwatch.style.height = '24px';
          shadeSwatch.style.borderRadius = 'var(--radius-sm)';
          shadeSwatch.style.cursor = 'pointer';
          shadeSwatch.style.border = '1px solid var(--border-color)';
          shadeSwatch.style.transition = 'transform 0.1s ease';
          shadeSwatch.title = shadeHex;
          shadeSwatch.onclick = () => setPickedColor(shadeHex);
          shadeSwatch.onmouseenter = () => shadeSwatch.style.transform = 'scale(1.1)';
          shadeSwatch.onmouseleave = () => shadeSwatch.style.transform = 'none';
          shadesCont.appendChild(shadeSwatch);
        });
      }

      // Relative Luminance for WCAG Contrast
      function getRelativeLuminance(r, g, b) {
        const rs = r / 255;
        const gs = g / 255;
        const bs = b / 255;

        const rLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
        const gLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
        const bLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

        return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
      }

      // Calculate Contrast ratio
      function getContrastRatio(l1, l2) {
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
      }

      // WCAG Compliance Badge
      function updateBadge(badgeEl, ratio) {
        if (ratio >= 7) {
          badgeEl.textContent = 'AAA PASS';
          badgeEl.className = 'contrast-badge pass';
        } else if (ratio >= 4.5) {
          badgeEl.textContent = 'AA PASS';
          badgeEl.className = 'contrast-badge pass';
          badgeEl.style.backgroundColor = 'var(--color-primary)';
        } else if (ratio >= 3) {
          badgeEl.textContent = 'AA LARGE ONLY';
          badgeEl.className = 'contrast-badge';
          badgeEl.style.backgroundColor = '#f59e0b';
          badgeEl.style.color = '#fff';
        } else {
          badgeEl.textContent = 'FAIL';
          badgeEl.className = 'contrast-badge fail';
        }
      }

      // Core sync functions
      function updateAllDisplays(r, g, b, h, s, l, a) {
        // Label displays
        rValLbl.textContent = r;
        gValLbl.textContent = g;
        bValLbl.textContent = b;
        hValLbl.textContent = h;
        sValLbl.textContent = s;
        lValLbl.textContent = l;
        aValLbl.textContent = a;

        // Sliders
        rSlide.value = r;
        gSlide.value = g;
        bSlide.value = b;
        hSlide.value = h;
        sSlide.value = s;
        lSlide.value = l;
        aSlide.value = a;

        const baseHex = rgbToHex(r, g, b);
        picker.value = baseHex;
        
        const hexWithAlpha = a === 100 ? baseHex : baseHex + Math.round((a / 100) * 255).toString(16).padStart(2, '0');
        
        // Prevent recursive value sets if manually typing
        if (document.activeElement !== manualColorInput) {
          manualColorInput.value = hexWithAlpha.toUpperCase();
        }

        // Inputs
        outHex.value = hexWithAlpha.toUpperCase();
        outRgba.value = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a / 100).toFixed(2) + ')';
        outHsla.value = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + (a / 100).toFixed(2) + ')';
        
        const cmyk = rgbToCmyk(r, g, b);
        outCmyk.value = 'cmyk(' + cmyk.c + '%, ' + cmyk.m + '%, ' + cmyk.y + '%, ' + cmyk.k + '%)';

        // Live preview styling
        livePreview.style.backgroundColor = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a / 100) + ')';
        // Choose white or black text in preview based on luminance
        const lum = getRelativeLuminance(r, g, b);
        if (lum > 0.45) {
          previewText.style.color = '#1e293b';
        } else {
          previewText.style.color = '#ffffff';
        }

        // Contrast Analytics
        const whiteLum = getRelativeLuminance(255, 255, 255);
        const blackLum = getRelativeLuminance(0, 0, 0);
        
        const wRatio = getContrastRatio(lum, whiteLum);
        const bRatio = getContrastRatio(lum, blackLum);

        whiteContrast.textContent = wRatio.toFixed(2) + ':1';
        blackContrast.textContent = bRatio.toFixed(2) + ':1';

        updateBadge(whiteBadge, wRatio);
        updateBadge(blackBadge, bRatio);

        // Extended WCAG evaluation
        // Normal text (AA >= 4.5, AAA >= 7)
        if (wRatio >= 7) {
          wcagNormalAA.textContent = 'AA PASS'; wcagNormalAA.className = 'contrast-badge pass';
          wcagNormalAAA.textContent = 'AAA PASS'; wcagNormalAAA.className = 'contrast-badge pass';
        } else if (wRatio >= 4.5) {
          wcagNormalAA.textContent = 'AA PASS'; wcagNormalAA.className = 'contrast-badge pass';
          wcagNormalAAA.textContent = 'AAA FAIL'; wcagNormalAAA.className = 'contrast-badge fail';
        } else {
          wcagNormalAA.textContent = 'AA FAIL'; wcagNormalAA.className = 'contrast-badge fail';
          wcagNormalAAA.textContent = 'AAA FAIL'; wcagNormalAAA.className = 'contrast-badge fail';
        }

        // Large text (AA >= 3, AAA >= 4.5)
        if (wRatio >= 4.5) {
          wcagLargeAA.textContent = 'AA PASS'; wcagLargeAA.className = 'contrast-badge pass';
          wcagLargeAAA.textContent = 'AAA PASS'; wcagLargeAAA.className = 'contrast-badge pass';
        } else if (wRatio >= 3) {
          wcagLargeAA.textContent = 'AA PASS'; wcagLargeAA.className = 'contrast-badge pass';
          wcagLargeAAA.textContent = 'AAA FAIL'; wcagLargeAAA.className = 'contrast-badge fail';
        } else {
          wcagLargeAA.textContent = 'AA FAIL'; wcagLargeAA.className = 'contrast-badge fail';
          wcagLargeAAA.textContent = 'AAA FAIL'; wcagLargeAAA.className = 'contrast-badge fail';
        }

        // Generate Harmonies
        renderHarmonies(h, s, l);

        // Render Tints & Shades
        renderTintsAndShades(r, g, b);
      }

      function syncFromPicker() {
        const hex = picker.value;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const hsl = rgbToHsl(r, g, b);
        const a = parseInt(aSlide.value);
        updateAllDisplays(r, g, b, hsl.h, hsl.s, hsl.l, a);
      }

      function syncFromRgbSliders() {
        const r = parseInt(rSlide.value);
        const g = parseInt(gSlide.value);
        const b = parseInt(bSlide.value);
        const hsl = rgbToHsl(r, g, b);
        const a = parseInt(aSlide.value);
        updateAllDisplays(r, g, b, hsl.h, hsl.s, hsl.l, a);
      }

      function syncFromHslSliders() {
        const h = parseInt(hSlide.value);
        const s = parseInt(sSlide.value);
        const l = parseInt(lSlide.value);
        const a = parseInt(aSlide.value);
        const rgb = hslToRgb(h, s, l);
        updateAllDisplays(rgb.r, rgb.g, rgb.b, h, s, l, a);
      }

      function syncFromManualInput() {
        const parsed = parseColor(manualColorInput.value);
        if (!parsed) return; // Don't crash on invalid input mid-typing
        const hsl = rgbToHsl(parsed.r, parsed.g, parsed.b);
        updateAllDisplays(parsed.r, parsed.g, parsed.b, hsl.h, hsl.s, hsl.l, parsed.a);
      }

      // Add listeners
      picker.addEventListener('input', () => {
        syncFromPicker();
        addRecentColor(picker.value);
      });
      manualColorInput.addEventListener('input', syncFromManualInput);
      manualColorInput.addEventListener('change', () => {
        const parsed = parseColor(manualColorInput.value);
        if (parsed) addRecentColor(rgbToHex(parsed.r, parsed.g, parsed.b));
      });

      [rSlide, gSlide, bSlide].forEach(s => s.addEventListener('input', syncFromRgbSliders));
      [rSlide, gSlide, bSlide].forEach(s => s.addEventListener('change', () => {
        addRecentColor(picker.value);
      }));

      [hSlide, sSlide, lSlide, aSlide].forEach(s => s.addEventListener('input', syncFromHslSliders));
      [hSlide, sSlide, lSlide, aSlide].forEach(s => s.addEventListener('change', () => {
        addRecentColor(picker.value);
      }));

      // Harmonies Renderer
      function renderHarmonies(h, s, l) {
        const comp = document.getElementById('harmony-comp');
        const anal = document.getElementById('harmony-anal');
        const tri = document.getElementById('harmony-tri');
        const mono = document.getElementById('harmony-mono');

        // Comp: base and base + 180
        const c1_rgb = hslToRgb(h, s, l);
        const c2_rgb = hslToRgb((h + 180) % 360, s, l);
        const c1_hex = rgbToHex(c1_rgb.r, c1_rgb.g, c1_rgb.b);
        const c2_hex = rgbToHex(c2_rgb.r, c2_rgb.g, c2_rgb.b);

        comp.innerHTML = '<div class="harmony-swatch" style="background:' + c1_hex + ';" onclick="setPickedColor(\'' + c1_hex + '\')"><span>' + c1_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + c2_hex + ';" onclick="setPickedColor(\'' + c2_hex + '\')"><span>' + c2_hex + '</span></div>';

        // Analogous: base - 30, base, base + 30
        const a1_rgb = hslToRgb((h + 330) % 360, s, l);
        const a2_rgb = hslToRgb(h, s, l);
        const a3_rgb = hslToRgb((h + 30) % 360, s, l);
        const a1_hex = rgbToHex(a1_rgb.r, a1_rgb.g, a1_rgb.b);
        const a2_hex = rgbToHex(a2_rgb.r, a2_rgb.g, a2_rgb.b);
        const a3_hex = rgbToHex(a3_rgb.r, a3_rgb.g, a3_rgb.b);

        anal.innerHTML = '<div class="harmony-swatch" style="background:' + a1_hex + ';" onclick="setPickedColor(\'' + a1_hex + '\')"><span>' + a1_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + a2_hex + ';" onclick="setPickedColor(\'' + a2_hex + '\')"><span>' + a2_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + a3_hex + ';" onclick="setPickedColor(\'' + a3_hex + '\')"><span>' + a3_hex + '</span></div>';

        // Triadic: base, base + 120, base + 240
        const t1_rgb = hslToRgb(h, s, l);
        const t2_rgb = hslToRgb((h + 120) % 360, s, l);
        const t3_rgb = hslToRgb((h + 240) % 360, s, l);
        const t1_hex = rgbToHex(t1_rgb.r, t1_rgb.g, t1_rgb.b);
        const t2_hex = rgbToHex(t2_rgb.r, t2_rgb.g, t2_rgb.b);
        const t3_hex = rgbToHex(t3_rgb.r, t3_rgb.g, t3_rgb.b);

        tri.innerHTML = '<div class="harmony-swatch" style="background:' + t1_hex + ';" onclick="setPickedColor(\'' + t1_hex + '\')"><span>' + t1_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + t2_hex + ';" onclick="setPickedColor(\'' + t2_hex + '\')"><span>' + t2_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + t3_hex + ';" onclick="setPickedColor(\'' + t3_hex + '\')"><span>' + t3_hex + '</span></div>';

        // Mono: different lightness variants
        const m1_rgb = hslToRgb(h, s, Math.max(10, l - 30));
        const m2_rgb = hslToRgb(h, s, Math.max(20, l - 15));
        const m3_rgb = hslToRgb(h, s, Math.min(90, l + 15));
        const m4_rgb = hslToRgb(h, s, Math.min(95, l + 30));
        const m1_hex = rgbToHex(m1_rgb.r, m1_rgb.g, m1_rgb.b);
        const m2_hex = rgbToHex(m2_rgb.r, m2_rgb.g, m2_rgb.b);
        const m3_hex = rgbToHex(m3_rgb.r, m3_rgb.g, m3_rgb.b);
        const m4_hex = rgbToHex(m4_rgb.r, m4_rgb.g, m4_rgb.b);

        mono.innerHTML = '<div class="harmony-swatch" style="background:' + m1_hex + ';" onclick="setPickedColor(\'' + m1_hex + '\')"><span>' + m1_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + m2_hex + ';" onclick="setPickedColor(\'' + m2_hex + '\')"><span>' + m2_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + m3_hex + ';" onclick="setPickedColor(\'' + m3_hex + '\')"><span>' + m3_hex + '</span></div>' +
          '<div class="harmony-swatch" style="background:' + m4_hex + ';" onclick="setPickedColor(\'' + m4_hex + '\')"><span>' + m4_hex + '</span></div>';
      }

      // LocalStorage palette history management
      function loadPaletteHistory() {
        const saved = JSON.parse(localStorage.getItem('multi_saved_palette') || '[]');
        paletteContainer.innerHTML = '';
        if (saved.length === 0) {
          paletteContainer.innerHTML = '<span style="font-size:12px; color:var(--text-muted); font-style:italic;">No saved colors.</span>';
          return;
        }
        saved.forEach(color => {
          const item = document.createElement('div');
          item.className = 'palette-item';
          item.style.backgroundColor = color;
          item.title = color;
          item.onclick = () => setPickedColor(color);
          paletteContainer.appendChild(item);
        });
      }

      btnSave.addEventListener('click', () => {
        let saved = JSON.parse(localStorage.getItem('multi_saved_palette') || '[]');
        const current = outHex.value.slice(0, 7);
        if (saved.includes(current)) {
          window.showToast('Color is already in your palette!');
          return;
        }
        saved.unshift(current);
        if (saved.length > 16) saved.pop(); // Keep top 16
        localStorage.setItem('multi_saved_palette', JSON.stringify(saved));
        window.showToast('Saved to palette list!');
        loadPaletteHistory();
      });

      btnClear.addEventListener('click', () => {
        localStorage.removeItem('multi_saved_palette');
        window.showToast('Palette history cleared.');
        loadPaletteHistory();
      });

      // Initial Kickstart
      syncFromPicker();
      loadPaletteHistory();
      renderRecentColors();
    `
  },
  {
    id: 'css-gradient-generator',
    title: 'CSS Premium Gradient Laboratory',
    desc: 'Craft production-ready CSS background gradients in linear or radial layouts. Manage up to 8 adjustable color stops interactively, click-to-load premium modern presets, and export to CSS, SVG, Canvas, Tailwind, or React styling systems.',
    category: 'design',
    badgeClass: 'badge-design',
    icon: 'paint-bucket',
    html: `
      <style>
        .gradient-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .gradient-grid {
            grid-template-columns: 1fr;
          }
        }
        .canvas-stage {
          height: 180px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        .canvas-grid-bg {
          background-image: linear-gradient(45deg, var(--border-color) 25%, transparent 25%), 
                            linear-gradient(-45deg, var(--border-color) 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, var(--border-color) 75%), 
                            linear-gradient(-45deg, transparent 75%, var(--border-color) 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        .canvas-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .preset-item {
          height: 54px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-color);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 6px;
          font-weight: 600;
          font-size: 11px;
          color: #fff;
          text-shadow: 0 1px 4px rgba(0,0,0,0.8);
        }
        .preset-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }
        .stop-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          margin-bottom: 6px;
        }
        .compass-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        /* Active Stop highlight */
        .stop-item.active {
          border-color: var(--color-primary);
          background: rgba(59, 130, 246, 0.04);
        }
      </style>

      <div class="gradient-grid">
        <!-- Left Column: Controls & Color Stops -->
        <div class="card" style="padding: 24px;">
          <h3 class="mb-16">Gradient Layout Configuration</h3>
          
          <!-- Gradient Type Toggle -->
          <div class="form-group">
            <label class="form-label">Gradient Direction Flow</label>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-primary w-full" id="btn-type-linear" style="padding:10px;">Linear Gradient</button>
              <button class="btn btn-secondary w-full" id="btn-type-radial" style="padding:10px;">Radial Gradient</button>
            </div>
          </div>

          <!-- Linear Options Area -->
          <div id="linear-controls-area">
            <div class="form-group mb-16">
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
                <span>Linear Angle</span>
                <span><span id="grad-angle-val">135</span>&deg;</span>
              </div>
              <input type="range" id="grad-angle-input" class="form-control" min="0" max="360" value="135" style="padding:0; height:6px;">
            </div>

            <!-- Compass Quick Clicks -->
            <div class="form-group">
              <label class="form-label" style="font-size:12px;">Quick Direction Presets</label>
              <div class="compass-grid">
                <button class="btn btn-secondary btn-sm" onclick="setGradientAngle(90)" style="font-size:11px; padding:6px;">To Right</button>
                <button class="btn btn-secondary btn-sm" onclick="setGradientAngle(180)" style="font-size:11px; padding:6px;">To Bottom</button>
                <button class="btn btn-secondary btn-sm" onclick="setGradientAngle(135)" style="font-size:11px; padding:6px;">To Bottom R</button>
                <button class="btn btn-secondary btn-sm" onclick="setGradientAngle(45)" style="font-size:11px; padding:6px;">To Top R</button>
              </div>
            </div>
          </div>

          <!-- Radial Options Area -->
          <div id="radial-controls-area" style="display:none;" class="form-group">
            <label class="form-label">Radial Center Shape Position</label>
            <select id="radial-pos-select" class="form-control form-select">
              <option value="circle at center" selected>Center Circle</option>
              <option value="circle at top left">Top Left</option>
              <option value="circle at top right">Top Right</option>
              <option value="circle at bottom left">Bottom Left</option>
              <option value="circle at bottom right">Bottom Right</option>
              <option value="ellipse at center">Center Ellipse</option>
            </select>
          </div>

          <div style="border-top:1px solid var(--border-color); padding-top:20px; margin-top:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center;" class="mb-12">
              <h4 style="margin:0; font-size:16px;">Color Stops Management</h4>
              <button class="btn btn-secondary btn-sm" id="btn-add-stop" style="padding:4px 10px; font-size:12px;"><i data-lucide="plus" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> Add Stop</button>
            </div>
            
            <!-- Dynamic Color Stops Wrapper -->
            <div id="color-stops-list"></div>
          </div>
        </div>

        <!-- Right Column: Live View, Presets & Outputs -->
        <div style="display:flex; flex-direction:column; gap:24px;">
          <!-- Visual Preview Block -->
          <div class="card" style="padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:center;" class="mb-12">
              <h3 style="margin:0;">Interactive Preview Canvas</h3>
              <div style="display:flex; gap:8px;">
                <button class="btn btn-secondary btn-sm" id="btn-random-grad" style="padding:4px 8px; font-size:11px; display:flex; align-items:center; gap:4px;"><i data-lucide="sparkles" style="width:13px; height:13px;"></i> Harmonious Random</button>
                <button class="btn btn-secondary btn-sm" id="btn-toggle-grid" style="padding:4px 8px; font-size:11px;">Toggle Grid</button>
              </div>
            </div>
            
            <div class="canvas-stage canvas-grid-bg mb-20" id="preview-canvas-container">
              <div class="canvas-overlay" id="gradient-layer-view" style="background: linear-gradient(135deg, #3b82f6 0%, #ec4899 100%);"></div>
            </div>

            <!-- Interactive Visual Stop Slider -->
            <div class="mb-16">
              <label class="form-label" style="font-size:11px; margin-bottom:6px; display:block; font-weight:600; text-transform:uppercase; color:var(--text-muted);">Visual Stop Editor (Click track to add, Drag handle, Click to select)</label>
              <div style="position:relative; padding-bottom:12px;">
                <div id="visual-slider-track" style="height:24px; border-radius:var(--radius-sm); border:1px solid var(--border-color); cursor:crosshair; box-shadow:var(--shadow-sm); overflow:hidden; position:relative;">
                  <div id="visual-slider-bar" style="position:absolute; inset:0;"></div>
                </div>
                <!-- Handles Container -->
                <div id="visual-slider-handles" style="position:absolute; left:0; right:0; top:0; height:24px; pointer-events:none;"></div>
              </div>
            </div>

            <!-- Active Stop Slider Controls -->
            <div id="active-stop-controls" style="background:var(--bg-surface-secondary); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-color); display:flex; gap:16px; align-items:center; min-height:60px;">
              <div style="position:relative; width:34px; height:34px; border-radius:var(--radius-sm); overflow:hidden; border:1px solid var(--border-color); flex-shrink:0;">
                <input type="color" id="active-stop-color" style="position:absolute; top:-10px; left:-10px; width:54px; height:54px; border:none; cursor:pointer;" value="#3b82f6">
              </div>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:600; margin-bottom:2px;">
                  <span>Selected Stop position</span>
                  <span><span id="active-stop-pos-lbl">0</span>%</span>
                </div>
                <input type="range" id="active-stop-pos-range" class="form-control" min="0" max="100" style="padding:0; height:6px;">
              </div>
              <button class="btn btn-secondary" id="active-stop-delete" style="padding:8px; border-color:#ef444430; color:#ef4444;" title="Delete Selected Stop">
                <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
              </button>
            </div>
          </div>

          <!-- Code Outputs -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-16">CSS Code Generator</h3>
            
            <div class="form-group" style="margin-bottom:12px;">
              <label class="form-label" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Standard CSS background</label>
              <div style="display:flex; gap:8px;">
                <input type="text" id="out-css-standard" class="form-control" style="font-family:monospace; font-size:12px; padding:10px 12px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyGradField('out-css-standard', 'CSS')">Copy</button>
              </div>
            </div>

            <div class="form-group" style="margin-bottom:12px;">
              <label class="form-label" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Tailwind CSS Classes</label>
              <div style="display:flex; gap:8px;">
                <input type="text" id="out-css-tailwind" class="form-control" style="font-family:monospace; font-size:12px; padding:10px 12px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyGradField('out-css-tailwind', 'Tailwind')">Copy</button>
              </div>
            </div>

            <div class="form-group" style="margin-bottom:12px;">
              <label class="form-label" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">React Inline Styling object</label>
              <div style="display:flex; gap:8px;">
                <input type="text" id="out-css-react" class="form-control" style="font-family:monospace; font-size:12px; padding:10px 12px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyGradField('out-css-react', 'React')">Copy</button>
              </div>
            </div>

            <div class="form-group" style="margin-bottom:12px;">
              <label class="form-label" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">SVG Markup Gradient</label>
              <div style="display:flex; gap:8px;">
                <input type="text" id="out-svg-markup" class="form-control" style="font-family:monospace; font-size:12px; padding:10px 12px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyGradField('out-svg-markup', 'SVG')">Copy</button>
              </div>
            </div>

            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">HTML5 Canvas JS Code</label>
              <div style="display:flex; gap:8px;">
                <input type="text" id="out-canvas-code" class="form-control" style="font-family:monospace; font-size:12px; padding:10px 12px;" readonly>
                <button class="btn btn-secondary btn-sm" onclick="copyGradField('out-canvas-code', 'Canvas JavaScript')">Copy</button>
              </div>
            </div>
          </div>

          <!-- Curated Premium Presets -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-12">Curated Premium Gradient Presets</h3>
            <p class="mb-16" style="font-size:12px; color:var(--text-muted);">One-click library loaded instantly with high-fidelity, production-grade color flows.</p>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px;" id="presets-grid-container"></div>
          </div>
        </div>
      </div>
    `,
    js: `
      let gradientType = 'linear'; // linear or radial
      let gradientAngle = 135;
      let radialPosition = 'circle at center';
      let isGridActive = true;
      let selectedStopIdx = 0;

      // Color stop models
      let colorStops = [
        { color: '#3b82f6', position: 0 },
        { color: '#ec4899', position: 100 }
      ];

      // Curated Gradient Presets
      const presetsList = [
        { name: 'Sunset Glow', type: 'linear', angle: 45, stops: [{ color: '#f97316', position: 0 }, { color: '#ec4899', position: 100 }] },
        { name: 'Ocean Breeze', type: 'linear', angle: 135, stops: [{ color: '#06b6d4', position: 0 }, { color: '#3b82f6', position: 100 }] },
        { name: 'Neon Fusion', type: 'linear', angle: 90, stops: [{ color: '#10b981', position: 0 }, { color: '#3b82f6', position: 50 }, { color: '#8b5cf6', position: 100 }] },
        { name: 'Berry Bliss', type: 'linear', angle: 135, stops: [{ color: '#ec4899', position: 0 }, { color: '#8b5cf6', position: 100 }] },
        { name: 'Citrus Fresh', type: 'linear', angle: 225, stops: [{ color: '#facc15', position: 0 }, { color: '#f97316', position: 100 }] },
        { name: 'Deep Space', type: 'linear', angle: 180, stops: [{ color: '#0f172a', position: 0 }, { color: '#1e1b4b', position: 50 }, { color: '#311042', position: 100 }] },
        { name: 'Mint Emerald', type: 'linear', angle: 135, stops: [{ color: '#34d399', position: 0 }, { color: '#059669', position: 100 }] },
        { name: 'Soft Lavender', type: 'linear', angle: 45, stops: [{ color: '#e9d5ff', position: 0 }, { color: '#c084fc', position: 100 }] },
        { name: 'Golden Hour', type: 'linear', angle: 135, stops: [{ color: '#e11d48', position: 0 }, { color: '#f97316', position: 50 }, { color: '#facc15', position: 100 }] }
      ];

      // Helper for clipboard copying
      window.copyGradField = (elementId, name) => {
        const input = document.getElementById(elementId);
        if (input && input.value) {
          navigator.clipboard.writeText(input.value);
          window.showToast('Copied ' + name + '!');
        }
      };

      // Set angle helper
      window.setGradientAngle = (deg) => {
        gradientAngle = deg;
        document.getElementById('grad-angle-input').value = deg;
        document.getElementById('grad-angle-val').textContent = deg;
        updateGradientResults();
      };

      // Click to load curated preset
      window.loadGradPreset = (index) => {
        const preset = presetsList[index];
        gradientType = preset.type;
        gradientAngle = preset.angle || 135;
        colorStops = JSON.parse(JSON.stringify(preset.stops));
        selectedStopIdx = 0;
        
        // Sync Buttons
        syncTypeButtons();
        
        // Sync Inputs
        document.getElementById('grad-angle-input').value = gradientAngle;
        document.getElementById('grad-angle-val').textContent = gradientAngle;

        renderStopsList();
        renderVisualHandles();
        updateActiveStopControls();
        updateGradientResults();
        window.showToast('Loaded Gradient preset: ' + preset.name);
      };

      // Set Type Linear/Radial
      const btnLinear = document.getElementById('btn-type-linear');
      const btnRadial = document.getElementById('btn-type-radial');
      const linearArea = document.getElementById('linear-controls-area');
      const radialArea = document.getElementById('radial-controls-area');

      function syncTypeButtons() {
        if (gradientType === 'linear') {
          btnLinear.className = 'btn btn-primary w-full';
          btnRadial.className = 'btn btn-secondary w-full';
          linearArea.style.display = 'block';
          radialArea.style.display = 'none';
        } else {
          btnLinear.className = 'btn btn-secondary w-full';
          btnRadial.className = 'btn btn-primary w-full';
          linearArea.style.display = 'none';
          radialArea.style.display = 'block';
        }
      }

      btnLinear.addEventListener('click', () => {
        gradientType = 'linear';
        syncTypeButtons();
        updateGradientResults();
      });

      btnRadial.addEventListener('click', () => {
        gradientType = 'radial';
        syncTypeButtons();
        updateGradientResults();
      });

      // Angle Input
      const angleInput = document.getElementById('grad-angle-input');
      angleInput.addEventListener('input', (e) => {
        gradientAngle = parseInt(e.target.value);
        document.getElementById('grad-angle-val').textContent = gradientAngle;
        updateGradientResults();
      });

      // Radial select
      const radialSelect = document.getElementById('radial-pos-select');
      radialSelect.addEventListener('change', (e) => {
        radialPosition = e.target.value;
        updateGradientResults();
      });

      // Toggle grid canvas
      const btnToggleGrid = document.getElementById('btn-toggle-grid');
      const previewCanvas = document.getElementById('preview-canvas-container');
      btnToggleGrid.addEventListener('click', () => {
        isGridActive = !isGridActive;
        if (isGridActive) {
          previewCanvas.className = 'canvas-stage canvas-grid-bg mb-20';
        } else {
          previewCanvas.className = 'canvas-stage mb-20';
        }
      });

      // Add color stop
      const btnAddStop = document.getElementById('btn-add-stop');
      btnAddStop.addEventListener('click', () => {
        if (colorStops.length >= 8) {
          window.showToast('Maximum limit of 8 color stops reached!');
          return;
        }
        // Insert new stop at sensible default position (halfway)
        let newPos = 50;
        if (colorStops.length === 2) newPos = 50;
        else if (colorStops.length === 3) newPos = 75;
        else if (colorStops.length === 4) newPos = 90;

        colorStops.push({ color: '#facc15', position: newPos });
        selectedStopIdx = colorStops.length - 1;
        sortColorStops();
      });

      // Track click to add a stop
      const track = document.getElementById('visual-slider-track');
      const visualBar = document.getElementById('visual-slider-bar');
      const handlesContainer = document.getElementById('visual-slider-handles');
      
      track.addEventListener('mousedown', (e) => {
        if (e.target !== track && e.target !== visualBar) return;
        const rect = track.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickPct = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
        
        if (colorStops.length >= 8) {
          window.showToast('Maximum limit of 8 color stops reached!');
          return;
        }
        
        const colorAtPct = getColorAtPercent(clickPct);
        colorStops.push({ color: colorAtPct, position: clickPct });
        selectedStopIdx = colorStops.length - 1;
        sortColorStops();
        window.showToast(\`Added stop at \${clickPct}%\`);
      });

      function getColorAtPercent(pct) {
        const sorted = [...colorStops].sort((a,b) => a.position - b.position);
        if (pct <= sorted[0].position) return sorted[0].color;
        if (pct >= sorted[sorted.length-1].position) return sorted[sorted.length-1].color;
        
        for (let i = 0; i < sorted.length - 1; i++) {
          const s1 = sorted[i];
          const s2 = sorted[i+1];
          if (pct >= s1.position && pct <= s2.position) {
            const range = s2.position - s1.position;
            const factor = range === 0 ? 0 : (pct - s1.position) / range;
            const c1 = parseColorToRGB(s1.color);
            const c2 = parseColorToRGB(s2.color);
            const r = Math.round(c1.r + factor * (c2.r - c1.r));
            const g = Math.round(c1.g + factor * (c2.g - c1.g));
            const b = Math.round(c1.b + factor * (c2.b - c1.b));
            return rgbToHex(r, g, b);
          }
        }
        return '#ffffff';
      }

      function parseColorToRGB(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      function hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
        return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
        };
      }

      // Sort and preserve index
      function sortColorStops() {
        const activeStop = colorStops[selectedStopIdx];
        colorStops.sort((a,b) => a.position - b.position);
        selectedStopIdx = colorStops.indexOf(activeStop);
        renderStopsList();
        renderVisualHandles();
        updateActiveStopControls();
        updateGradientResults();
      }

      // Render Visual Slider handles
      function renderVisualHandles() {
        handlesContainer.innerHTML = '';
        const sortedStops = [...colorStops].sort((a,b) => a.position - b.position);
        let stopString = sortedStops.map(s => \`\${s.color} \${s.position}%\`).join(', ');
        visualBar.style.background = \`linear-gradient(to right, \${stopString})\`;

        colorStops.forEach((stop, idx) => {
          const handle = document.createElement('div');
          handle.style.position = 'absolute';
          handle.style.left = \`calc(\${stop.position}% - 8px)\`;
          handle.style.top = '2px';
          handle.style.width = '18px';
          handle.style.height = '18px';
          handle.style.borderRadius = '50%';
          handle.style.border = idx === selectedStopIdx ? '2.5px solid var(--color-primary)' : '2px solid #ffffff';
          handle.style.backgroundColor = stop.color;
          handle.style.boxShadow = '0 2px 5px rgba(0,0,0,0.4)';
          handle.style.cursor = 'ew-resize';
          handle.style.pointerEvents = 'auto';
          handle.style.zIndex = idx === selectedStopIdx ? '10' : '5';
          handle.title = \`Stop \${idx+1}: \${stop.position}%\`;

          // Mouse down for dragging
          handle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            e.preventDefault();
            selectedStopIdx = idx;
            renderVisualHandles();
            updateActiveStopControls();
            highlightStopItemInList(idx);

            const startX = e.clientX;
            const startPos = stop.position;
            const rect = track.getBoundingClientRect();

            const onMouseMove = (moveEvent) => {
              const deltaX = moveEvent.clientX - startX;
              let newPos = Math.round(startPos + (deltaX / rect.width) * 100);
              newPos = Math.max(0, Math.min(100, newPos));

              colorStops[idx].position = newPos;
              updateGradientResults();
              renderVisualHandles();
              updateActiveStopControls();
              
              const listRowVal = document.getElementById(\`lbl-stop-pos-\${idx}\`);
              if (listRowVal) listRowVal.textContent = newPos + '%';
              const listRangeInput = document.getElementById(\`inp-stop-range-\${idx}\`);
              if (listRangeInput) listRangeInput.value = newPos;
            };

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
              sortColorStops();
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          });

          handlesContainer.appendChild(handle);
        });
      }

      // Highlight active row in left col
      function highlightStopItemInList(activeIdx) {
        const rows = document.querySelectorAll('.stop-item');
        rows.forEach((row, idx) => {
          if (idx === activeIdx) row.classList.add('active');
          else row.classList.remove('active');
        });
      }

      // Active stop control pane updates
      const activeControls = document.getElementById('active-stop-controls');
      const activeColor = document.getElementById('active-stop-color');
      const activePosRange = document.getElementById('active-stop-pos-range');
      const activePosLbl = document.getElementById('active-stop-pos-lbl');
      const activeDelete = document.getElementById('active-stop-delete');

      function updateActiveStopControls() {
        if (colorStops.length === 0) {
          activeControls.style.opacity = '0.5';
          activeControls.style.pointerEvents = 'none';
          return;
        }
        activeControls.style.opacity = '1';
        activeControls.style.pointerEvents = 'auto';

        const stop = colorStops[selectedStopIdx];
        activeColor.value = stop.color;
        activePosRange.value = stop.position;
        activePosLbl.textContent = stop.position;

        if (colorStops.length <= 2) {
          activeDelete.disabled = true;
          activeDelete.style.opacity = '0.4';
        } else {
          activeDelete.disabled = false;
          activeDelete.style.opacity = '1';
        }
      }

      activeColor.addEventListener('input', (e) => {
        colorStops[selectedStopIdx].color = e.target.value;
        updateGradientResults();
        renderVisualHandles();
        renderStopsList();
      });

      activePosRange.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        colorStops[selectedStopIdx].position = val;
        activePosLbl.textContent = val;
        updateGradientResults();
        renderVisualHandles();
      });

      activePosRange.addEventListener('change', () => {
        sortColorStops();
      });

      activeDelete.addEventListener('click', () => {
        if (colorStops.length <= 2) return;
        colorStops.splice(selectedStopIdx, 1);
        selectedStopIdx = Math.max(0, selectedStopIdx - 1);
        sortColorStops();
        window.showToast('Deleted stop');
      });

      // Harmonious Randomizer
      const btnRandomGrad = document.getElementById('btn-random-grad');
      btnRandomGrad.addEventListener('click', () => {
        const baseHue = Math.floor(Math.random() * 360);
        const isComplementary = Math.random() > 0.5;
        const secondaryHue = (baseHue + (isComplementary ? 180 : 35 + Math.floor(Math.random() * 25))) % 360;

        const rgb1 = hslToRgb(baseHue, 85 + Math.floor(Math.random() * 15), 45 + Math.floor(Math.random() * 15));
        const rgb2 = hslToRgb(secondaryHue, 85 + Math.floor(Math.random() * 15), 45 + Math.floor(Math.random() * 15));

        const hex1 = rgbToHex(rgb1.r, rgb1.g, rgb1.b);
        const hex2 = rgbToHex(rgb2.r, rgb2.g, rgb2.b);

        colorStops = [
          { color: hex1, position: 0 },
          { color: hex2, position: 100 }
        ];
        selectedStopIdx = 0;

        renderStopsList();
        renderVisualHandles();
        updateActiveStopControls();
        updateGradientResults();
        window.showToast('Generated harmonious random gradient!');
      });

      // Render the color stops list
      function renderStopsList() {
        const stopsWrapper = document.getElementById('color-stops-list');
        stopsWrapper.innerHTML = '';

        colorStops.forEach((stop, idx) => {
          const item = document.createElement('div');
          item.className = 'stop-item';
          if (idx === selectedStopIdx) item.classList.add('active');
          
          item.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
              selectedStopIdx = idx;
              highlightStopItemInList(idx);
              renderVisualHandles();
              updateActiveStopControls();
            }
          });

          const pickerDiv = document.createElement('div');
          pickerDiv.style.position = 'relative';
          pickerDiv.style.width = '36px';
          pickerDiv.style.height = '36px';
          pickerDiv.style.borderRadius = 'var(--radius-sm)';
          pickerDiv.style.overflow = 'hidden';
          pickerDiv.style.border = '1px solid var(--border-color)';
          pickerDiv.style.cursor = 'pointer';
          pickerDiv.style.flexShrink = '0';

          const colorIn = document.createElement('input');
          colorIn.type = 'color';
          colorIn.value = stop.color;
          colorIn.style.position = 'absolute';
          colorIn.style.top = '-10px';
          colorIn.style.left = '-10px';
          colorIn.style.width = '56px';
          colorIn.style.height = '56px';
          colorIn.style.border = 'none';
          colorIn.style.cursor = 'pointer';
          colorIn.addEventListener('input', (e) => {
            colorStops[idx].color = e.target.value;
            updateGradientResults();
            renderVisualHandles();
            updateActiveStopControls();
          });

          pickerDiv.appendChild(colorIn);

          const sliderGroup = document.createElement('div');
          sliderGroup.style.flex = '1';

          const sliderLabel = document.createElement('div');
          sliderLabel.style.display = 'flex';
          sliderLabel.style.justify = 'space-between';
          sliderLabel.style.fontSize = '11px';
          sliderLabel.style.fontWeight = '600';
          sliderLabel.style.marginBottom = '2px';
          sliderLabel.innerHTML = \`<span>Stop \${idx+1} Position</span><span id="lbl-stop-pos-\${idx}">\${stop.position}%</span>\`;

          const rangeIn = document.createElement('input');
          rangeIn.type = 'range';
          rangeIn.id = \`inp-stop-range-\${idx}\`;
          rangeIn.className = 'form-control';
          rangeIn.min = '0';
          rangeIn.max = '100';
          rangeIn.value = stop.position;
          rangeIn.style.padding = '0';
          rangeIn.style.height = '5px';
          rangeIn.addEventListener('input', (e) => {
            colorStops[idx].position = parseInt(e.target.value);
            document.getElementById(\`lbl-stop-pos-\${idx}\`).textContent = e.target.value + '%';
            updateGradientResults();
            renderVisualHandles();
            updateActiveStopControls();
          });
          rangeIn.addEventListener('change', () => {
            sortColorStops();
          });

          sliderGroup.appendChild(sliderLabel);
          sliderGroup.appendChild(rangeIn);

          // Delete Stop Button
          const delBtn = document.createElement('button');
          delBtn.className = 'btn btn-secondary';
          delBtn.style.padding = '6px';
          delBtn.style.borderRadius = 'var(--radius-sm)';
          delBtn.innerHTML = '<i data-lucide="trash-2" style="width:14px; height:14px; display:block;"></i>';
          
          if (colorStops.length <= 2) {
            delBtn.disabled = true;
            delBtn.style.opacity = '0.4';
          } else {
            delBtn.addEventListener('click', () => {
              colorStops.splice(idx, 1);
              selectedStopIdx = Math.max(0, selectedStopIdx - 1);
              sortColorStops();
            });
          }

          item.appendChild(pickerDiv);
          item.appendChild(sliderGroup);
          item.appendChild(delBtn);

          stopsWrapper.appendChild(item);
        });

        lucide.createIcons();
      }

      // Compute and Update all gradient outputs
      function updateGradientResults() {
        const sortedStops = [...colorStops].sort((a,b) => a.position - b.position);
        let stopString = sortedStops.map(s => \`\${s.color} \${s.position}%\`).join(', ');

        let backgroundValue = '';
        if (gradientType === 'linear') {
          backgroundValue = \`linear-gradient(\${gradientAngle}deg, \${stopString})\`;
        } else {
          backgroundValue = \`radial-gradient(\${radialPosition}, \${stopString})\`;
        }

        document.getElementById('gradient-layer-view').style.background = backgroundValue;

        document.getElementById('out-css-standard').value = \`background: \${backgroundValue};\`;

        let tailwindString = 'bg-gradient';
        if (gradientType === 'linear') {
          if (gradientAngle >= 337.5 || gradientAngle < 22.5) tailwindString += '-to-t';
          else if (gradientAngle >= 22.5 && gradientAngle < 67.5) tailwindString += '-to-tr';
          else if (gradientAngle >= 67.5 && gradientAngle < 112.5) tailwindString += '-to-r';
          else if (gradientAngle >= 112.5 && gradientAngle < 157.5) tailwindString += '-to-br';
          else if (gradientAngle >= 157.5 && gradientAngle < 202.5) tailwindString += '-to-b';
          else if (gradientAngle >= 202.5 && gradientAngle < 247.5) tailwindString += '-to-bl';
          else if (gradientAngle >= 247.5 && gradientAngle < 292.5) tailwindString += '-to-l';
          else if (gradientAngle >= 292.5 && gradientAngle < 337.5) tailwindString += '-to-tl';
        } else {
          tailwindString += '-radial';
        }
        
        if (sortedStops.length >= 2) {
          tailwindString += \` from-[\${sortedStops[0].color}]\`;
          if (sortedStops.length === 3) {
            tailwindString += \` via-[\${sortedStops[1].color}]\`;
          } else if (sortedStops.length > 3) {
            tailwindString += \` via-[\${sortedStops[1].color}]\`;
          }
          tailwindString += \` to-[\${sortedStops[sortedStops.length-1].color}]\`;
        }
        document.getElementById('out-css-tailwind').value = tailwindString;

        document.getElementById('out-css-react').value = \`style={{ background: '\${backgroundValue}' }}\`;

        let svgCode = '';
        if (gradientType === 'linear') {
          const angleRad = (gradientAngle * Math.PI) / 180;
          const x1 = Math.round(50 - Math.cos(angleRad) * 50);
          const y1 = Math.round(50 + Math.sin(angleRad) * 50);
          const x2 = Math.round(50 + Math.cos(angleRad) * 50);
          const y2 = Math.round(50 - Math.sin(angleRad) * 50);

          let svgStops = sortedStops.map(s => \`    <stop offset="\${s.position}%" stop-color="\${s.color}" />\`).join('\\n');
          svgCode = \`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">\\n  <defs>\\n    <linearGradient id="grad" x1="\${x1}%" y1="\${y1}%" x2="\${x2}%" y2="\${y2}%">\\n\s\\n    </linearGradient>\\n  </defs>\\n  <rect width="100%" height="100%" fill="url(#grad)" />\\n</svg>\`.replace('\s', svgStops);
        } else {
          let svgStops = sortedStops.map(s => \`    <stop offset="\${s.position}%" stop-color="\${s.color}" />\`).join('\\n');
          svgCode = \`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">\\n  <defs>\\n    <radialGradient id="grad" cx="50%" cy="50%" r="50%">\\n\s\\n    </radialGradient>\\n  </defs>\\n  <rect width="100%" height="100%" fill="url(#grad)" />\\n</svg>\`.replace('\s', svgStops);
        }
        document.getElementById('out-svg-markup').value = svgCode;

        let canvasCode = \`const canvas = document.getElementById("myCanvas");\\nconst ctx = canvas.getContext("2d");\\n\`;
        if (gradientType === 'linear') {
          canvasCode += \`const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);\\n\`;
        } else {
          canvasCode += \`const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, canvas.width/2, canvas.height/2, canvas.width/2);\\n\`;
        }
        sortedStops.forEach(s => {
          canvasCode += \`grad.addColorStop(\${(s.position/100).toFixed(2)}, "\${s.color}");\\n\`;
        });
        canvasCode += \`ctx.fillStyle = grad;\\nctx.fillRect(0, 0, canvas.width, canvas.height);\`;
        document.getElementById('out-canvas-code').value = canvasCode;
      }

      function renderPresetsGrid() {
        const grid = document.getElementById('presets-grid-container');
        grid.innerHTML = '';
        
        presetsList.forEach((preset, idx) => {
          const stopStr = preset.stops.map(s => \`\${s.color} \${s.position}%\`).join(', ');
          const bg = preset.type === 'linear' ? \`linear-gradient(\${preset.angle}deg, \${stopStr})\` : \`radial-gradient(circle, \${stopStr})\`;
          
          const card = document.createElement('div');
          card.className = 'preset-item';
          card.style.background = bg;
          card.textContent = preset.name;
          card.onclick = () => loadGradPreset(idx);
          grid.appendChild(card);
        });
      }

      renderStopsList();
      renderPresetsGrid();
      renderVisualHandles();
      updateActiveStopControls();
      updateGradientResults();
    `
  },
  {
    id: 'css-box-shadow-generator',
    title: 'CSS Layered Box Shadow Studio',
    desc: 'An advanced web utility for constructing deep, soft, and organic CSS shadow effects. Combine up to 4 independent layered shadows (ambient occlusion style) with full offset, blur, spread, color, and inset controls.',
    category: 'design',
    badgeClass: 'badge-design',
    icon: 'shadow',
    html: `
      <style>
        .shadow-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .shadow-grid {
            grid-template-columns: 1fr;
          }
        }
        .stage-box {
          height: 240px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: background 0.15s ease;
          overflow: hidden;
        }
        .stage-checkerboard {
          background-image: linear-gradient(45deg, var(--border-color) 25%, transparent 25%), 
                            linear-gradient(-45deg, var(--border-color) 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, var(--border-color) 75%), 
                            linear-gradient(-45deg, transparent 75%, var(--border-color) 75%);
          background-size: 16px 16px;
          background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
        }
        .preview-card {
          width: 120px;
          height: 120px;
          background: #ffffff;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 13px;
          color: var(--text-muted);
          transition: border-radius 0.15s ease, background 0.15s ease;
          border: 1px solid rgba(0,0,0,0.02);
        }
        .layer-pill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: var(--bg-surface-secondary);
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-sm);
          margin-bottom: 8px;
          cursor: pointer;
          transition: border-color 0.1s ease, background 0.1s ease;
        }
        .layer-pill.active {
          border-color: var(--color-primary);
          background: rgba(var(--color-primary-rgb), 0.05);
        }
        .preset-badge {
          padding: 8px;
          background: var(--bg-surface-secondary);
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
          transition: all 0.15s ease;
          color: var(--text-secondary);
        }
        .preset-badge:hover {
          background: var(--color-primary);
          color: #fff;
          border-color: var(--color-primary);
          transform: translateY(-1px);
        }
      </style>

      <div class="shadow-grid">
        <!-- Left Side: Layer Manager & Selected Sliders -->
        <div class="card" style="padding: 24px;">
          <h3 class="mb-12">Box Shadow Layers</h3>
          <p class="mb-16" style="font-size:12px; color:var(--text-muted);">Manage multiple shadow layers to generate organic, hyper-smooth professional depth, similar to Tailwind's shadow-2xl.</p>
          
          <div style="display:flex; justify-content:space-between; align-items:center;" class="mb-12">
            <span style="font-size:12px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Layer Stack</span>
            <button class="btn btn-secondary btn-sm" id="btn-add-layer" style="padding:4px 8px; font-size:11px;"><i data-lucide="plus" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> Add Layer</button>
          </div>

          <!-- Dynamic Layers Stack -->
          <div id="layers-stack-container" class="mb-24"></div>

          <!-- Selected Layer Parameters Controls -->
          <div style="border-top:1px solid var(--border-color); padding-top:20px;">
            <h3 class="mb-16" id="selected-layer-title" style="font-size:16px; color:var(--color-primary);">Adjusting Layer 1</h3>
            
            <div class="grid grid-2 mb-12">
              <div class="form-group" style="margin-bottom:0;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>Horizontal Offset</span>
                  <span><span id="shd-h-val">0</span>px</span>
                </div>
                <input type="range" id="slide-shd-h" class="form-control" min="-50" max="50" value="0" style="padding:0; height:5px;">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>Vertical Offset</span>
                  <span><span id="shd-v-val">8</span>px</span>
                </div>
                <input type="range" id="slide-shd-v" class="form-control" min="-50" max="50" value="8" style="padding:0; height:5px;">
              </div>
            </div>

            <div class="grid grid-2 mb-16">
              <div class="form-group" style="margin-bottom:0;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>Blur Radius</span>
                  <span><span id="shd-b-val">24</span>px</span>
                </div>
                <input type="range" id="slide-shd-b" class="form-control" min="0" max="100" value="24" style="padding:0; height:5px;">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>Spread Radius</span>
                  <span><span id="shd-s-val">-4</span>px</span>
                </div>
                <input type="range" id="slide-shd-s" class="form-control" min="-30" max="30" value="-4" style="padding:0; height:5px;">
              </div>
            </div>

            <div class="grid grid-2 mb-12">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Shadow Color</label>
                <input type="color" id="picker-shd-color" class="form-control" value="#000000" style="padding:0; height:34px; border:none; border-radius:var(--radius-sm); cursor:pointer;">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>Shadow Opacity</span>
                  <span><span id="shd-op-val">15</span>%</span>
                </div>
                <input type="range" id="slide-shd-op" class="form-control" min="0" max="100" value="15" style="padding:0; height:5px;">
              </div>
            </div>

            <div style="display:flex; gap:16px; margin-top:16px;">
              <label style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; cursor:pointer;">
                <input type="checkbox" id="chk-shd-inset"> Inset Shadow
              </label>
            </div>
          </div>
        </div>

        <!-- Right Side: Arena, Presets & Output Code -->
        <div style="display:flex; flex-direction:column; gap:24px;">
          <!-- Visual Interactive Arena -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-12">Interactive Shadow Arena</h3>
            
            <div class="stage-box mb-16" id="shd-stage" style="background:#f1f5f9;">
              <div class="preview-card" id="shd-preview-card" style="background:#ffffff;">Preview</div>
            </div>

            <div class="grid grid-3" style="gap:10px;">
              <div>
                <label class="form-label" style="font-size:11px;">Stage Background</label>
                <select id="sel-stage-bg" class="form-control form-select" style="padding:8px 12px; font-size:12px;">
                  <option value="#f1f5f9" selected>Slate light</option>
                  <option value="#ffffff">Pure White</option>
                  <option value="#0f172a">Slate Dark</option>
                  <option value="checkerboard">Grid Checker</option>
                </select>
              </div>
              <div>
                <label class="form-label" style="font-size:11px;">Card Background</label>
                <select id="sel-card-bg" class="form-control form-select" style="padding:8px 12px; font-size:12px;">
                  <option value="#ffffff" selected>White Card</option>
                  <option value="#e2e8f0">Slate Light</option>
                  <option value="#1e293b">Slate Dark</option>
                </select>
              </div>
              <div>
                <label class="form-label" style="font-size:11px;">Card Roundness</label>
                <input type="range" id="slide-card-radius" min="0" max="40" value="12" class="form-control" style="padding:0; height:5px;">
              </div>
            </div>
          </div>

          <!-- Code Outputs -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-16">CSS Shadow Code</h3>
            
            <div class="form-group" style="margin-bottom:12px;">
              <label class="form-label" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">CSS box-shadow property</label>
              <textarea id="out-shd-css" class="form-control" style="font-family:monospace; font-size:12px; height:80px;" readonly></textarea>
            </div>
            
            <div style="display:flex; gap:12px;">
              <button class="btn btn-primary w-full" id="btn-copy-css">Copy Property Rule</button>
            </div>
          </div>

          <!-- Curated Presets -->
          <div class="card" style="padding: 24px;">
            <h3 class="mb-12">Curated Box Shadow Presets</h3>
            <p class="mb-16" style="font-size:12px; color:var(--text-muted);">Load expert designer layered shadow presets instantly with a single tap.</p>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
              <div class="preset-badge" onclick="loadShadowPreset(0)">Smooth Ambient Lift</div>
              <div class="preset-badge" onclick="loadShadowPreset(1)">Extreme Deep 3D Lift</div>
              <div class="preset-badge" onclick="loadShadowPreset(2)">Subtle Tailwind XL</div>
              <div class="preset-badge" onclick="loadShadowPreset(3)">Glass Inner Bevel</div>
              <div class="preset-badge" onclick="loadShadowPreset(4)">Retro Sharp Popout</div>
              <div class="preset-badge" onclick="loadShadowPreset(5)">Neumorphic Soft Emboss</div>
            </div>
          </div>
        </div>
      </div>
    `,
    js: `
      let activeLayerIndex = 0;

      // In Multi-layered shadows, each layer has active params
      let shadowLayers = [
        { h: 0, v: 4, b: 6, s: -1, color: '#000000', opacity: 10, inset: false, enabled: true },
        { h: 0, v: 10, b: 15, s: -3, color: '#000000', opacity: 10, inset: false, enabled: true }
      ];

      // Curated expert shadow presets
      const shadowPresets = [
        {
          name: 'Smooth Ambient Lift',
          layers: [
            { h: 0, v: 4, b: 6, s: -1, color: '#000000', opacity: 8, inset: false, enabled: true },
            { h: 0, v: 12, b: 20, s: -3, color: '#000000', opacity: 12, inset: false, enabled: true }
          ]
        },
        {
          name: 'Extreme Deep 3D Lift',
          layers: [
            { h: 0, v: 1, b: 3, s: 0, color: '#000000', opacity: 12, inset: false, enabled: true },
            { h: 0, v: 8, b: 16, s: -4, color: '#000000', opacity: 15, inset: false, enabled: true },
            { h: 0, v: 24, b: 48, s: -8, color: '#000000', opacity: 20, inset: false, enabled: true }
          ]
        },
        {
          name: 'Subtle Tailwind XL',
          layers: [
            { h: 0, v: 10, b: 15, s: -3, color: '#000000', opacity: 4, inset: false, enabled: true },
            { h: 0, v: 4, b: 6, s: -2, color: '#000000', opacity: 5, inset: false, enabled: true }
          ]
        },
        {
          name: 'Glass Inner Bevel',
          layers: [
            { h: 2, v: 2, b: 5, s: 0, color: '#ffffff', opacity: 80, inset: true, enabled: true },
            { h: -2, v: -2, b: 5, s: 0, color: '#000000', opacity: 15, inset: true, enabled: true },
            { h: 4, v: 4, b: 10, s: 0, color: '#000000', opacity: 10, inset: false, enabled: true }
          ]
        },
        {
          name: 'Retro Sharp Popout',
          layers: [
            { h: 6, v: 6, b: 0, s: 0, color: '#0f172a', opacity: 100, inset: false, enabled: true }
          ]
        },
        {
          name: 'Neumorphic Soft Emboss',
          layers: [
            { h: 6, v: 6, b: 12, s: 0, color: '#000000', opacity: 8, inset: false, enabled: true },
            { h: -6, v: -6, b: 12, s: 0, color: '#ffffff', opacity: 80, inset: false, enabled: true }
          ]
        }
      ];

      // Elements
      const layersContainer = document.getElementById('layers-stack-container');
      const selectedTitle = document.getElementById('selected-layer-title');

      const slideH = document.getElementById('slide-shd-h');
      const slideV = document.getElementById('slide-shd-v');
      const slideB = document.getElementById('slide-shd-b');
      const slideS = document.getElementById('slide-shd-s');
      const pickerColor = document.getElementById('picker-shd-color');
      const slideOp = document.getElementById('slide-shd-op');
      const chkInset = document.getElementById('chk-shd-inset');

      const valH = document.getElementById('shd-h-val');
      const valV = document.getElementById('shd-v-val');
      const valB = document.getElementById('shd-b-val');
      const valS = document.getElementById('shd-s-val');
      const valOp = document.getElementById('shd-op-val');

      const stage = document.getElementById('shd-stage');
      const card = document.getElementById('shd-preview-card');
      const codeOutput = document.getElementById('out-shd-css');

      // Click preset load
      window.loadShadowPreset = (index) => {
        const preset = shadowPresets[index];
        shadowLayers = JSON.parse(JSON.stringify(preset.layers));
        activeLayerIndex = 0;
        
        syncSlidersToActiveLayer();
        renderLayersStack();
        updateShadowResults();
        window.showToast('Loaded preset: ' + preset.name);
      };

      // Set active layer index
      window.setActiveLayer = (idx) => {
        activeLayerIndex = idx;
        syncSlidersToActiveLayer();
        renderLayersStack();
      };

      // Delete layer
      window.deleteShadowLayer = (idx, event) => {
        event.stopPropagation();
        if (shadowLayers.length <= 1) return;
        shadowLayers.splice(idx, 1);
        if (activeLayerIndex >= shadowLayers.length) {
          activeLayerIndex = shadowLayers.length - 1;
        }
        syncSlidersToActiveLayer();
        renderLayersStack();
        updateShadowResults();
      };

      // Toggle Layer checkbox state
      window.toggleShadowLayer = (idx, event) => {
        event.stopPropagation();
        shadowLayers[idx].enabled = event.target.checked;
        renderLayersStack();
        updateShadowResults();
      };

      // Sync active sliders from models
      function syncSlidersToActiveLayer() {
        const layer = shadowLayers[activeLayerIndex];
        selectedTitle.textContent = 'Adjusting Layer ' + (activeLayerIndex + 1);

        slideH.value = layer.h;
        slideV.value = layer.v;
        slideB.value = layer.b;
        slideS.value = layer.s;
        pickerColor.value = layer.color;
        slideOp.value = layer.opacity;
        chkInset.checked = layer.inset;

        valH.textContent = layer.h;
        valV.textContent = layer.v;
        valB.textContent = layer.b;
        valS.textContent = layer.s;
        valOp.textContent = layer.opacity;
      }

      // Sync changes from sliders back to models
      function updateActiveLayerFromSliders() {
        const layer = shadowLayers[activeLayerIndex];
        layer.h = parseInt(slideH.value);
        layer.v = parseInt(slideV.value);
        layer.b = parseInt(slideB.value);
        layer.s = parseInt(slideS.value);
        layer.color = pickerColor.value;
        layer.opacity = parseInt(slideOp.value);
        layer.inset = chkInset.checked;

        valH.textContent = layer.h;
        valV.textContent = layer.v;
        valB.textContent = layer.b;
        valS.textContent = layer.s;
        valOp.textContent = layer.opacity;

        // update stack labels quickly without full redraw
        const pillText = document.getElementById('layer-text-' + activeLayerIndex);
        if (pillText) {
          pillText.textContent = \`Layer \${activeLayerIndex+1} (\${layer.inset ? 'Inset ' : ''}\${layer.h}px \${layer.v}px...)\`;
        }

        updateShadowResults();
      }

      // Bind Listeners
      [slideH, slideV, slideB, slideS, pickerColor, slideOp].forEach(el => {
        el.addEventListener('input', updateActiveLayerFromSliders);
      });
      chkInset.addEventListener('change', updateActiveLayerFromSliders);

      // Add new layer click
      document.getElementById('btn-add-layer').addEventListener('click', () => {
        if (shadowLayers.length >= 4) {
          window.showToast('Up to 4 layers maximum is recommended for performance.');
          return;
        }
        shadowLayers.push({
          h: 0,
          v: Math.round(5 * (shadowLayers.length + 1)),
          b: Math.round(10 * (shadowLayers.length + 1)),
          s: -1,
          color: '#000000',
          opacity: 10,
          inset: false,
          enabled: true
        });
        activeLayerIndex = shadowLayers.length - 1;
        syncSlidersToActiveLayer();
        renderLayersStack();
        updateShadowResults();
      });

      // Render the Layer Stack HTML
      function renderLayersStack() {
        layersContainer.innerHTML = '';
        shadowLayers.forEach((layer, idx) => {
          const pill = document.createElement('div');
          pill.className = 'layer-pill' + (idx === activeLayerIndex ? ' active' : '');
          pill.onclick = () => setActiveLayer(idx);

          const leftGroup = document.createElement('div');
          leftGroup.style.display = 'flex';
          leftGroup.style.alignItems = 'center';
          leftGroup.style.gap = '10px';

          const chk = document.createElement('input');
          chk.type = 'checkbox';
          chk.checked = layer.enabled;
          chk.onclick = (e) => toggleShadowLayer(idx, e);
          leftGroup.appendChild(chk);

          const label = document.createElement('span');
          label.id = 'layer-text-' + idx;
          label.style.fontSize = '12px';
          label.style.fontWeight = '600';
          label.textContent = \`Layer \${idx+1} (\${layer.inset ? 'Inset ' : ''}\${layer.h}px \${layer.v}px \${layer.b}px)\`;
          leftGroup.appendChild(label);

          const delBtn = document.createElement('button');
          delBtn.className = 'btn btn-secondary';
          delBtn.style.padding = '4px 6px';
          delBtn.innerHTML = '<i data-lucide="trash-2" style="width:13px; height:13px;"></i>';
          
          if (shadowLayers.length <= 1) {
            delBtn.style.opacity = '0.3';
            delBtn.disabled = true;
          } else {
            delBtn.onclick = (e) => deleteShadowLayer(idx, e);
          }

          pill.appendChild(leftGroup);
          pill.appendChild(delBtn);

          layersContainer.appendChild(pill);
        });

        lucide.createIcons();
      }

      // Hex to RGBA conversion helper
      function hexToRgbValues(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }

      // Calculate and render interactive results
      function updateShadowResults() {
        const activeRules = [];

        shadowLayers.forEach(layer => {
          if (!layer.enabled) return;
          const rgb = hexToRgbValues(layer.color);
          const alpha = (layer.opacity / 100).toFixed(2);
          const shadowRule = \`\${layer.inset ? 'inset ' : ''}\${layer.h}px \${layer.v}px \${layer.b}px \${layer.s}px rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, \${alpha})\`;
          activeRules.push(shadowRule);
        });

        const combinedShadowString = activeRules.join(', ');
        
        // Apply shadows to preview card
        card.style.boxShadow = combinedShadowString;

        // Apply text to outputs
        codeOutput.value = combinedShadowString ? \`box-shadow: \${combinedShadowString};\` : 'box-shadow: none;';
      }

      // Customizations (Background stage etc)
      const selStageBg = document.getElementById('sel-stage-bg');
      selStageBg.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'checkerboard') {
          stage.className = 'stage-box mb-16 stage-checkerboard';
          stage.style.backgroundColor = 'transparent';
        } else {
          stage.className = 'stage-box mb-16';
          stage.style.backgroundColor = val;
        }
      });

      const selCardBg = document.getElementById('sel-card-bg');
      selCardBg.addEventListener('change', (e) => {
        card.style.backgroundColor = e.target.value;
      });

      const slideRadius = document.getElementById('slide-card-radius');
      slideRadius.addEventListener('input', (e) => {
        card.style.borderRadius = e.target.value + 'px';
      });

      // Copy to clipboard
      document.getElementById('btn-copy-css').addEventListener('click', () => {
        if (codeOutput.value) {
          navigator.clipboard.writeText(codeOutput.value);
          window.showToast('Copied layered CSS box-shadow code!');
        }
      });

      // Kickstart
      syncSlidersToActiveLayer();
      renderLayersStack();
      updateShadowResults();
      card.style.borderRadius = '12px';
    `
  },
  {
    id: 'image-compressor',
    title: 'Client-side Image Compressor',
    desc: 'Compress and resize images completely inside your browser using hardware-accelerated HTML5 canvases. Adjust formatting types (WebP, PNG, JPG), percentage scaling, or pixel custom dimensions with instant relative visual feedback.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'image',
    html: `
      <style>
        .compressor-dropzone {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          background: var(--bg-surface-secondary);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .compressor-dropzone:hover, .compressor-dropzone.dragover {
          border-color: var(--color-primary);
          background: rgba(var(--color-primary-rgb), 0.05);
        }
        .compress-split-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .compress-split-view {
            grid-template-columns: 1fr;
          }
        }
        .preview-pane-wrapper {
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        .preview-img-container {
          aspect-ratio: 4/3;
          width: 100%;
          background: #111;
          border-radius: var(--radius-sm);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          border: 1px solid var(--border-color);
        }
        .preview-img-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .stats-table {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          width: 100%;
          border-collapse: collapse;
        }
        .stats-table td {
          padding: 6px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .stats-table td:last-child {
          text-align: right;
          font-weight: 700;
        }
      </style>

      <div class="card mb-24" style="padding:24px;">
        <h3 class="mb-16">Upload Image File</h3>
        
        <!-- Drag & Drop Dropzone -->
        <div class="compressor-dropzone" id="img-dropzone">
          <input type="file" id="img-file-hidden" accept="image/*" style="display:none;">
          <i data-lucide="upload-cloud" style="width:48px; height:48px; color:var(--text-muted); margin: 0 auto 16px;"></i>
          <h4 class="mb-6">Drag and drop your image here</h4>
          <p class="mb-0" style="font-size:13px; color:var(--text-muted);">Supports PNG, JPEG, WebP up to 20MB. Standard local compression.</p>
        </div>
      </div>

      <!-- Settings & Results Dashboard -->
      <div id="compression-dashboard" style="display:none;" class="fade-in">
        <div class="grid grid-2 mb-24" style="gap:20px; align-items: stretch;">
          
          <!-- Compressor Settings -->
          <div class="card" style="padding:24px;">
            <h3 class="mb-16">Compression Parameters</h3>
            
            <div class="form-group mb-16">
              <label class="form-label">Output File Format</label>
              <select id="sel-img-format" class="form-control form-select">
                <option value="original" selected>Maintain Original</option>
                <option value="image/jpeg">Convert to JPEG</option>
                <option value="image/png">Convert to PNG</option>
                <option value="image/webp">Convert to WebP</option>
              </select>
            </div>

            <!-- Dimensions Scaling Controls -->
            <div class="form-group mb-16">
              <label class="form-label">Resize Dimensions (Scaling)</label>
              <select id="sel-img-scale" class="form-control form-select mb-12">
                <option value="1" selected>No Scaling (100% size)</option>
                <option value="0.75">Scale down 75% size</option>
                <option value="0.5">Half size (50% scale)</option>
                <option value="0.25">Quarter size (25% scale)</option>
                <option value="custom">Custom resolution inputs</option>
              </select>
              
              <!-- Custom Width/Height inputs (hidden by default) -->
              <div id="custom-res-inputs" class="grid grid-2" style="display:none; gap:12px; margin-top:12px;">
                <div>
                  <label class="form-label" style="font-size:11px;">Width (px)</label>
                  <input type="number" id="inp-custom-w" class="form-control" placeholder="Width">
                </div>
                <div>
                  <label class="form-label" style="font-size:11px;">Height (px)</label>
                  <input type="number" id="inp-custom-h" class="form-control" placeholder="Height">
                </div>
              </div>
            </div>

            <div class="form-group mb-0">
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
                <span>Compression Quality Level</span>
                <span><span id="inp-quality-lbl">75</span>%</span>
              </div>
              <input type="range" id="inp-quality-range" class="form-control" min="5" max="100" value="75" style="padding:0; height:6px;">
              <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">Lower quality values shrink file size further but introduce JPEG/WebP compression blocks.</p>
            </div>
          </div>

          <!-- Total Metrics Card -->
          <div class="card" style="padding:24px; display:flex; flex-direction:column; justify-content:space-between; background:rgba(16, 185, 129, 0.05); border-color:#10b981;">
            <div>
              <h3 class="mb-12">Compression Savings</h3>
              <p style="font-size:14px; color:var(--text-secondary); margin-bottom:16px;">These files are processed directly inside your browser cache. No uploads happen.</p>
            </div>
            
            <div style="text-align:center; padding:24px 12px; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-md);" class="mb-16">
              <h4 style="font-size:13px; text-transform:uppercase; color:var(--text-muted); letter-spacing:1px; margin-bottom:8px;">File Size Reduced By</h4>
              <h1 style="font-size:44px; color:#10b981;" id="savings-percent">0.0%</h1>
              <p style="font-size:13px; color:var(--text-secondary); margin-top:6px;" id="savings-bytes-desc">Saved 0 KB</p>
            </div>

            <button class="btn btn-primary w-full" id="btn-download-compressed" style="padding:14px;"><i data-lucide="download" style="width:18px; height:18px;"></i> Download Compressed Image</button>
          </div>
        </div>

        <!-- Split Screen Comparative Views -->
        <div class="compress-split-view">
          
          <!-- Left pane: Original -->
          <div class="preview-pane-wrapper">
            <h4 class="mb-12" style="font-size:14px; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Original Image</h4>
            <div class="preview-img-container">
              <img id="img-orig-view" alt="Original Image View">
            </div>
            <table class="stats-table">
              <tr>
                <td>Dimensions</td>
                <td id="lbl-orig-dim">0 x 0 px</td>
              </tr>
              <tr>
                <td>File Size</td>
                <td id="lbl-orig-size">0 KB</td>
              </tr>
              <tr>
                <td>Mime Format</td>
                <td id="lbl-orig-type">image/jpeg</td>
              </tr>
            </table>
          </div>

          <!-- Right pane: Compressed -->
          <div class="preview-pane-wrapper" style="border-color: #10b98120;">
            <h4 class="mb-12" style="font-size:14px; text-transform:uppercase; font-weight:700; color:#10b981;">Compressed Result</h4>
            <div class="preview-img-container">
              <img id="img-comp-view" alt="Compressed Image View">
            </div>
            <table class="stats-table">
              <tr>
                <td>Dimensions</td>
                <td id="lbl-comp-dim">0 x 0 px</td>
              </tr>
              <tr>
                <td>Compressed Size</td>
                <td id="lbl-comp-size" style="color:#10b981;">0 KB</td>
              </tr>
              <tr>
                <td>Output Format</td>
                <td id="lbl-comp-type">image/jpeg</td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    `,
    js: `
      const dropzone = document.getElementById('img-dropzone');
      const hiddenInput = document.getElementById('img-file-hidden');
      
      const dashboard = document.getElementById('compression-dashboard');
      
      const selFormat = document.getElementById('sel-img-format');
      const selScale = document.getElementById('sel-img-scale');
      const customResInputs = document.getElementById('custom-res-inputs');
      
      const customW = document.getElementById('inp-custom-w');
      const customH = document.getElementById('inp-custom-h');
      
      const qualityRange = document.getElementById('inp-quality-range');
      const qualityLbl = document.getElementById('inp-quality-lbl');
      
      const origView = document.getElementById('img-orig-view');
      const compView = document.getElementById('img-comp-view');
      
      const lblOrigDim = document.getElementById('lbl-orig-dim');
      const lblOrigSize = document.getElementById('lbl-orig-size');
      const lblOrigType = document.getElementById('lbl-orig-type');
      
      const lblCompDim = document.getElementById('lbl-comp-dim');
      const lblCompSize = document.getElementById('lbl-comp-size');
      const lblCompType = document.getElementById('lbl-comp-type');
      
      const savingsPercent = document.getElementById('savings-percent');
      const savingsBytesDesc = document.getElementById('savings-bytes-desc');
      const dlBtn = document.getElementById('btn-download-compressed');

      let originalImage = null;
      let originalFileSize = 0;
      let originalMimeType = '';
      let originalFileName = 'image.jpg';
      let originalWidth = 0;
      let originalHeight = 0;
      let ratioLock = true;
      let compressedBlob = null;

      // Click dropzone to open browser selector
      dropzone.addEventListener('click', () => hiddenInput.click());

      // Drag over effect
      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
        }, false);
      });

      // Handle file drops
      dropzone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file) handleUploadedFile(file);
      });

      hiddenInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleUploadedFile(file);
      });

      function handleUploadedFile(file) {
        if (!file.type.startsWith('image/')) {
          window.showToast('Please upload a valid image file!');
          return;
        }

        originalFileSize = file.size;
        originalMimeType = file.type;
        originalFileName = file.name;

        // Set labels
        lblOrigSize.textContent = formatBytes(originalFileSize);
        lblOrigType.textContent = originalMimeType;

        const reader = new FileReader();
        reader.onload = (event) => {
          origView.src = event.target.result;
          
          originalImage = new Image();
          originalImage.src = event.target.result;
          originalImage.onload = () => {
            originalWidth = originalImage.naturalWidth;
            originalHeight = originalImage.naturalHeight;
            
            lblOrigDim.textContent = \`\${originalWidth} x \${originalHeight} px\`;
            
            // Setup custom numeric limits
            customW.value = originalWidth;
            customH.value = originalHeight;

            // Trigger compilation compression
            dashboard.style.display = 'block';
            compressImage();
          };
        };
        reader.readAsDataURL(file);
      }

      // Settings Listeners
      selFormat.addEventListener('change', compressImage);
      
      selScale.addEventListener('change', () => {
        if (selScale.value === 'custom') {
          customResInputs.style.display = 'grid';
        } else {
          customResInputs.style.display = 'none';
        }
        compressImage();
      });

      qualityRange.addEventListener('input', (e) => {
        qualityLbl.textContent = e.target.value;
        compressImage();
      });

      // Custom dimensions aspect ratio sync inputs
      customW.addEventListener('input', () => {
        if (!originalImage) return;
        const width = parseInt(customW.value) || 0;
        if (width > 0 && ratioLock) {
          const ratio = originalHeight / originalWidth;
          customH.value = Math.round(width * ratio);
        }
        compressImage();
      });

      customH.addEventListener('input', () => {
        if (!originalImage) return;
        const height = parseInt(customH.value) || 0;
        if (height > 0 && ratioLock) {
          const ratio = originalWidth / originalHeight;
          customW.value = Math.round(height * ratio);
        }
        compressImage();
      });

      // Compressor function core
      function compressImage() {
        if (!originalImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 1. Calculate Target Dimensions
        let targetW = originalWidth;
        let targetH = originalHeight;
        
        const scaleOption = selScale.value;
        if (scaleOption === 'custom') {
          targetW = parseInt(customW.value) || originalWidth;
          targetH = parseInt(customH.value) || originalHeight;
        } else {
          const scale = parseFloat(scaleOption);
          targetW = Math.round(originalWidth * scale);
          targetH = Math.round(originalHeight * scale);
        }

        canvas.width = targetW;
        canvas.height = targetH;
        ctx.drawImage(originalImage, 0, 0, targetW, targetH);

        // 2. Select Output format and quality params
        let format = selFormat.value;
        if (format === 'original') {
          format = originalMimeType;
        }

        const quality = parseInt(qualityRange.value) / 100;

        // Perform canvas exports using accurate blobs
        canvas.toBlob((blob) => {
          if (!blob) return;

          compressedBlob = blob;
          const compressedSize = blob.size;

          // Display statistics
          lblCompDim.textContent = \`\${targetW} x \${targetH} px\`;
          lblCompSize.textContent = formatBytes(compressedSize);
          lblCompType.textContent = blob.type;

          const savedBytes = originalFileSize - compressedSize;
          const pct = Math.max(0, ((savedBytes / originalFileSize) * 100).toFixed(1));

          savingsPercent.textContent = pct + '%';
          savingsBytesDesc.textContent = savedBytes > 0 
            ? 'Reduced size by ' + formatBytes(savedBytes) + '!' 
            : 'Result file size is similar to original.';

          // Color change if savings positive
          if (savedBytes > 0) {
            savingsPercent.style.color = '#10b981';
          } else {
            savingsPercent.style.color = 'var(--text-primary)';
          }

          // Object URL for compressed image element view
          if (compView.src && compView.src.startsWith('blob:')) {
            URL.revokeObjectURL(compView.src);
          }
          compView.src = URL.createObjectURL(blob);

        }, format, quality);
      }

      // Download Compressed action
      dlBtn.addEventListener('click', () => {
        if (!compressedBlob) return;

        let format = selFormat.value;
        if (format === 'original') format = originalMimeType;
        
        const ext = format === 'image/webp' ? '.webp' : format === 'image/png' ? '.png' : '.jpg';
        // strip original extension and attach new one
        const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;

        const a = document.createElement('a');
        a.href = compView.src;
        a.download = 'compressed-' + baseName + ext;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.showToast('Downloaded compressed file!');
      });

      // Utility file size formatter
      function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 1;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }
    `
  }
];
