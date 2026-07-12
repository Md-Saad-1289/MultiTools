// Extra Premium Tools: SHA-256 and MD5 Hash Generator
export const extraTools = [
  {
    id: 'hash-generator',
    title: 'SHA-256 & MD5 Hash Generator',
    desc: 'Compute secure SHA-256 and MD5 cryptographic hashes instantly from your text or file input, entirely in your browser.',
    category: 'dev',
    badgeClass: 'badge-dev',
    icon: 'hash',
    html: `
      <style>
        .input-mode-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        .drag-drop-zone {
          border: 2.5px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 40px 20px;
          text-align: center;
          background: var(--bg-surface-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .drag-drop-zone:hover, .drag-drop-zone.dragover {
          border-color: var(--color-primary);
          background: rgba(59, 130, 246, 0.04);
        }
        .hash-output-container {
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-top: 24px;
          box-shadow: var(--shadow-sm);
        }
        .hash-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }
        .hash-row:last-of-type {
          margin-bottom: 0;
        }
        .hash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hash-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }
        .hash-input-group {
          display: flex;
          gap: 8px;
        }
        .hash-field {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 13px;
          background: var(--bg-surface);
        }
        .info-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }
        .verification-box {
          border-top: 1px solid var(--border-color);
          margin-top: 24px;
          padding-top: 20px;
        }
      </style>

      <div class="input-mode-tabs">
        <button id="tab-text" class="btn btn-primary btn-sm" style="flex: 1; border-radius: var(--radius-md);">Text Hashing</button>
        <button id="tab-file" class="btn btn-secondary btn-sm" style="flex: 1; border-radius: var(--radius-md);">File Hashing</button>
      </div>

      <!-- Text Input Panel -->
      <div id="panel-text" class="fade-in">
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label class="form-label" for="hash-text-input" style="margin-bottom: 0;">Input Text</label>
            <span id="text-counters" style="font-size: 12px; font-family: var(--font-mono, monospace); color: var(--text-muted); font-weight: 500;">0 chars | 0 bytes</span>
          </div>
          <textarea id="hash-text-input" class="form-control" style="height: 120px;" placeholder="Type or paste your text here to get instant hashes..."></textarea>
        </div>
      </div>

      <!-- File Input Panel -->
      <div id="panel-file" class="fade-in" style="display: none;">
        <div class="form-group">
          <label class="form-label">Upload File</label>
          <div id="file-drop-zone" class="drag-drop-zone">
            <i data-lucide="file-text" style="width: 44px; height: 44px; color: var(--text-muted); margin: 0 auto 12px; display: block;"></i>
            <p style="font-weight: 600; font-size: 15px; margin-bottom: 4px; color: var(--text-primary);">Drag and drop file here</p>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">or click to browse files from your device</p>
            <input type="file" id="hash-file-input" style="display: none;">
            <span class="badge" style="background: var(--border-color); color: var(--text-secondary); font-size: 11px; padding: 4px 10px; border-radius: var(--radius-full);">100% Browser-Safe Client Hashing</span>
          </div>
        </div>
        <div id="file-details" class="card" style="display: none; padding: 14px; margin-bottom: 20px; background: var(--bg-surface); border-color: var(--border-color); border-radius: var(--radius-md);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i data-lucide="file" style="color: var(--color-primary); width: 24px; height: 24px;"></i>
            <div style="flex: 1; overflow: hidden;">
              <p id="file-name" style="font-weight: 600; font-size: 14px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-bottom: 2px; color: var(--text-primary);"></p>
              <p id="file-size" style="font-size: 12px; color: var(--text-muted); font-family: var(--font-mono, monospace);"></p>
            </div>
            <button id="btn-remove-file" class="btn btn-secondary btn-sm" style="padding: 4px 10px; border-radius: var(--radius-sm); font-size: 12px;" title="Remove file">Remove</button>
          </div>
        </div>
      </div>

      <!-- Common Controls -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">Hex Case:</span>
          <button id="btn-case-lower" class="btn btn-primary btn-sm" style="padding: 4px 12px; font-size: 12px; border-radius: var(--radius-sm);">lowercase</button>
          <button id="btn-case-upper" class="btn btn-secondary btn-sm" style="padding: 4px 12px; font-size: 12px; border-radius: var(--radius-sm);">UPPERCASE</button>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--text-secondary); user-select: none;">
            <input type="checkbox" id="chk-live" checked style="width: 15px; height: 15px; cursor: pointer;"> Live Hashing
          </label>
          <button id="btn-hash-now" class="btn btn-primary btn-sm" style="display: none; padding: 6px 14px; font-size: 12px; border-radius: var(--radius-sm);">Generate Hashes</button>
        </div>
      </div>

      <!-- Generated Hashes Output Container -->
      <div class="hash-output-container">
        <!-- MD5 Row -->
        <div class="hash-row">
          <div class="hash-header">
            <span class="hash-label">MD5 Hash</span>
            <span class="info-badge" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">128-bit checksum</span>
          </div>
          <div class="hash-input-group">
            <input type="text" id="hash-md5-output" class="form-control hash-field" readonly placeholder="MD5 hash will appear here...">
            <button id="btn-copy-md5" class="btn btn-secondary" style="padding: 10px 16px; border-radius: var(--radius-sm);" title="Copy MD5 to clipboard">
              <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>

        <!-- SHA-256 Row -->
        <div class="hash-row">
          <div class="hash-header">
            <span class="hash-label">SHA-256 Hash</span>
            <span class="info-badge" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">256-bit secure hash</span>
          </div>
          <div class="hash-input-group">
            <input type="text" id="hash-sha256-output" class="form-control hash-field" readonly placeholder="SHA-256 hash will appear here...">
            <button id="btn-copy-sha256" class="btn btn-secondary" style="padding: 10px 16px; border-radius: var(--radius-sm);" title="Copy SHA-256 to clipboard">
              <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>

        <!-- Hash Match Verifier Section -->
        <div class="verification-box">
          <h4 class="mb-8" style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Compare with Checksum</h4>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5;">Paste an expected hash below to automatically compare it with the generated MD5 or SHA-256 checksums.</p>
          <div class="form-group" style="margin-bottom: 10px;">
            <input type="text" id="hash-compare-input" class="form-control hash-field" placeholder="Paste expected checksum here to verify..." style="font-size: 13px;">
          </div>
          <div id="compare-result" style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; min-height: 24px;">
            <span style="color: var(--text-muted); font-style: italic; font-weight: normal; font-size: 12px;">Enter expected hash above to compare.</span>
          </div>
        </div>
      </div>
    `,
    js: `
      // Elements
      const tabText = document.getElementById('tab-text');
      const tabFile = document.getElementById('tab-file');
      const panelText = document.getElementById('panel-text');
      const panelFile = document.getElementById('panel-file');

      const textInput = document.getElementById('hash-text-input');
      const fileInput = document.getElementById('hash-file-input');
      const fileDropZone = document.getElementById('file-drop-zone');
      const btnRemoveFile = document.getElementById('btn-remove-file');

      const chkLive = document.getElementById('chk-live');
      const btnHashNow = document.getElementById('btn-hash-now');

      const btnCaseLower = document.getElementById('btn-case-lower');
      const btnCaseUpper = document.getElementById('btn-case-upper');

      const btnCopyMD5 = document.getElementById('btn-copy-md5');
      const btnCopySHA256 = document.getElementById('btn-copy-sha256');
      const compareInput = document.getElementById('hash-compare-input');
      const compareResult = document.getElementById('compare-result');
      const textCounters = document.getElementById('text-counters');

      let activeTab = 'text'; // 'text' or 'file'
      let currentBytes = null;
      let computedMD5Val = '';
      let computedSHA256Val = '';
      let useUppercase = false;

      // MD5 Implementation (Self-contained Byte Array Hashing)
      function computeMD5(bytes) {
        function k(i) {
          return Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
        }
        function rol(v, s) {
          return (v << s) | (v >>> (32 - s));
        }
        function add(x, y) {
          return (x + y) | 0;
        }
        function f(x, y, z) { return (x & y) | (~x & z); }
        function g(x, y, z) { return (x & z) | (y & ~z); }
        function h(x, y, z) { return x ^ y ^ z; }
        function i(x, y, z) { return y ^ (x | ~z); }
        function r1(a, b, c, d, x, s, t) {
          return add(rol(add(add(a, f(b, c, d)), add(x, t)), s), b);
        }
        function r2(a, b, c, d, x, s, t) {
          return add(rol(add(add(a, g(b, c, d)), add(x, t)), s), b);
        }
        function r3(a, b, c, d, x, s, t) {
          return add(rol(add(add(a, h(b, c, d)), add(x, t)), s), b);
        }
        function r4(a, b, c, d, x, s, t) {
          return add(rol(add(add(a, i(b, c, d)), add(x, t)), s), b);
        }

        const T = [];
        for (let idx = 0; idx < 64; idx++) {
          T[idx] = k(idx);
        }

        const origLen = bytes.length;
        const padLen = ((origLen + 8) >> 6) + 1 << 6;
        const padded = new Uint8Array(padLen);
        padded.set(bytes);
        padded[origLen] = 0x80;
        
        const bitsLen = origLen * 8;
        padded[padLen - 8] = bitsLen & 0xff;
        padded[padLen - 7] = (bitsLen >>> 8) & 0xff;
        padded[padLen - 6] = (bitsLen >>> 16) & 0xff;
        padded[padLen - 5] = (bitsLen >>> 24) & 0xff;
        
        let h0 = 0x67452301;
        let h1 = 0xefcdab89;
        let h2 = 0x98badcfe;
        let h3 = 0x10325476;
        
        const w = new Int32Array(16);
        
        for (let offset = 0; offset < padLen; offset += 64) {
          let a = h0, b = h1, c = h2, d = h3;
          
          for (let j = 0; j < 16; j++) {
            const bo = offset + j * 4;
            w[j] = padded[bo] | (padded[bo+1] << 8) | (padded[bo+2] << 16) | (padded[bo+3] << 24);
          }
          
          // Round 1
          a = r1(a, b, c, d, w[0], 7, T[0]);
          d = r1(d, a, b, c, w[1], 12, T[1]);
          c = r1(c, d, a, b, w[2], 17, T[2]);
          b = r1(b, c, d, a, w[3], 22, T[3]);
          a = r1(a, b, c, d, w[4], 7, T[4]);
          d = r1(d, a, b, c, w[5], 12, T[5]);
          c = r1(c, d, a, b, w[6], 17, T[6]);
          b = r1(b, c, d, a, w[7], 22, T[7]);
          a = r1(a, b, c, d, w[8], 7, T[8]);
          d = r1(d, a, b, c, w[9], 12, T[9]);
          c = r1(c, d, a, b, w[10], 17, T[10]);
          b = r1(b, c, d, a, w[11], 22, T[11]);
          a = r1(a, b, c, d, w[12], 7, T[12]);
          d = r1(d, a, b, c, w[13], 12, T[13]);
          c = r1(c, d, a, b, w[14], 17, T[14]);
          b = r1(b, c, d, a, w[15], 22, T[15]);
          
          // Round 2
          a = r2(a, b, c, d, w[1], 5, T[16]);
          d = r2(d, a, b, c, w[6], 9, T[17]);
          c = r2(c, d, a, b, w[11], 14, T[18]);
          b = r2(b, c, d, a, w[0], 20, T[19]);
          a = r2(a, b, c, d, w[5], 5, T[20]);
          d = r2(d, a, b, c, w[10], 9, T[21]);
          c = r2(c, d, a, b, w[15], 14, T[22]);
          b = r2(b, c, d, a, w[4], 20, T[23]);
          a = r2(a, b, c, d, w[9], 5, T[24]);
          d = r2(d, a, b, c, w[14], 9, T[25]);
          c = r2(c, d, a, b, w[3], 14, T[26]);
          b = r2(b, c, d, a, w[8], 20, T[27]);
          a = r2(a, b, c, d, w[13], 5, T[28]);
          d = r2(d, a, b, c, w[2], 9, T[29]);
          c = r2(c, d, a, b, w[7], 14, T[30]);
          b = r2(b, c, d, a, w[12], 20, T[31]);
          
          // Round 3
          a = r3(a, b, c, d, w[5], 4, T[32]);
          d = r3(d, a, b, c, w[8], 11, T[33]);
          c = r3(c, d, a, b, w[11], 16, T[34]);
          b = r3(b, c, d, a, w[14], 23, T[35]);
          a = r3(a, b, c, d, w[1], 4, T[36]);
          d = r3(d, a, b, c, w[4], 11, T[37]);
          c = r3(c, d, a, b, w[7], 16, T[38]);
          b = r3(b, c, d, a, w[10], 23, T[39]);
          a = r3(a, b, c, d, w[13], 4, T[40]);
          d = r3(d, a, b, c, w[0], 11, T[41]);
          c = r3(c, d, a, b, w[3], 16, T[42]);
          b = r3(b, c, d, a, w[6], 23, T[43]);
          a = r3(a, b, c, d, w[9], 4, T[44]);
          d = r3(d, a, b, c, w[12], 11, T[45]);
          c = r3(c, d, a, b, w[15], 16, T[46]);
          b = r3(b, c, d, a, w[2], 23, T[47]);
          
          // Round 4
          a = r4(a, b, c, d, w[0], 6, T[48]);
          d = r4(d, a, b, c, w[7], 10, T[49]);
          c = r4(c, d, a, b, w[14], 15, T[50]);
          b = r4(b, c, d, a, w[5], 21, T[51]);
          a = r4(a, b, c, d, w[12], 6, T[52]);
          d = r4(d, a, b, c, w[3], 10, T[53]);
          c = r4(c, d, a, b, w[10], 15, T[54]);
          b = r4(b, c, d, a, w[1], 21, T[55]);
          a = r4(a, b, c, d, w[8], 6, T[56]);
          d = r4(d, a, b, c, w[15], 10, T[57]);
          c = r4(c, d, a, b, w[6], 15, T[58]);
          b = r4(b, c, d, a, w[13], 21, T[59]);
          a = r4(a, b, c, d, w[4], 6, T[60]);
          d = r4(d, a, b, c, w[11], 10, T[61]);
          c = r4(c, d, a, b, w[2], 15, T[62]);
          b = r4(b, c, d, a, w[9], 21, T[63]);
          
          h0 = add(h0, a);
          h1 = add(h1, b);
          h2 = add(h2, c);
          h3 = add(h3, d);
        }
        
        function toHexString(value) {
          let hex = '';
          for (let i = 0; i < 4; i++) {
            const byte = (value >>> (i * 8)) & 0xff;
            hex += byte.toString(16).padStart(2, '0');
          }
          return hex;
        }
        
        return toHexString(h0) + toHexString(h1) + toHexString(h2) + toHexString(h3);
      }

      // SHA-256 Implementation (using browser Crypto API)
      async function computeSHA256(bytes) {
        const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
      }

      // Hash processor
      async function processBytes(bytes) {
        currentBytes = bytes;
        const md5Field = document.getElementById('hash-md5-output');
        const sha256Field = document.getElementById('hash-sha256-output');

        if (!bytes || bytes.length === 0) {
          computedMD5Val = '';
          computedSHA256Val = '';
          updateOutputs();
          return;
        }

        md5Field.value = 'Computing MD5...';
        sha256Field.value = 'Computing SHA-256...';

        setTimeout(async () => {
          try {
            computedMD5Val = computeMD5(bytes);
            computedSHA256Val = await computeSHA256(bytes);
            updateOutputs();
          } catch (err) {
            md5Field.value = 'Error computing MD5';
            sha256Field.value = 'Error computing SHA-256';
          }
        }, 50);
      }

      function processText() {
        const text = textInput.value;
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);

        const charCount = text.length;
        const byteCount = bytes.length;
        textCounters.textContent = charCount + ' char' + (charCount === 1 ? '' : 's') + ' | ' + byteCount + ' byte' + (byteCount === 1 ? '' : 's');

        processBytes(bytes);
      }

      function processFile(file) {
        if (!file) return;

        fileDropZone.style.display = 'none';
        const detailsCard = document.getElementById('file-details');
        detailsCard.style.display = 'block';

        document.getElementById('file-name').textContent = file.name;

        const sz = file.size;
        let formattedSize = '';
        if (sz < 1024) {
          formattedSize = sz + ' bytes';
        } else if (sz < 1048576) {
          formattedSize = (sz / 1024).toFixed(2) + ' KB';
        } else {
          formattedSize = (sz / 1048576).toFixed(2) + ' MB';
        }
        document.getElementById('file-size').textContent = formattedSize;

        const reader = new FileReader();
        reader.onload = function(e) {
          const arrayBuffer = e.target.result;
          const bytes = new Uint8Array(arrayBuffer);
          processBytes(bytes);
        };
        reader.onerror = function() {
          window.showToast('Error reading file.');
        };
        reader.readAsArrayBuffer(file);
      }

      function updateOutputs() {
        const md5Field = document.getElementById('hash-md5-output');
        const sha256Field = document.getElementById('hash-sha256-output');

        let md5Display = computedMD5Val;
        let sha256Display = computedSHA256Val;

        if (useUppercase) {
          md5Display = md5Display.toUpperCase();
          sha256Display = sha256Display.toUpperCase();
        } else {
          md5Display = md5Display.toLowerCase();
          sha256Display = sha256Display.toLowerCase();
        }

        md5Field.value = md5Display;
        sha256Field.value = sha256Display;

        runComparison();
      }

      function runComparison() {
        const val = compareInput.value.trim().toLowerCase();

        if (!val) {
          compareResult.innerHTML = '<span style="color: var(--text-muted); font-style: italic; font-weight: normal; font-size: 12px;">Enter expected hash above to compare.</span>';
          return;
        }

        if (computedMD5Val && val === computedMD5Val.toLowerCase()) {
          compareResult.innerHTML = '<span style="color: #10b981; display: flex; align-items: center; gap: 6px;"><i data-lucide="check-circle-2" style="width: 16px; height: 16px;"></i> Matches MD5 Checksum!</span>';
        } else if (computedSHA256Val && val === computedSHA256Val.toLowerCase()) {
          compareResult.innerHTML = '<span style="color: #10b981; display: flex; align-items: center; gap: 6px;"><i data-lucide="check-circle-2" style="width: 16px; height: 16px;"></i> Matches SHA-256 Checksum!</span>';
        } else {
          compareResult.innerHTML = '<span style="color: #ef4444; display: flex; align-items: center; gap: 6px;"><i data-lucide="x-circle" style="width: 16px; height: 16px;"></i> Checksum Mismatch! Does not match calculated hashes.</span>';
        }

        if (window.lucide) {
          window.lucide.createIcons();
        }
      }

      function switchTab(tab) {
        activeTab = tab;
        if (tab === 'text') {
          tabText.classList.remove('btn-secondary');
          tabText.classList.add('btn-primary');
          tabFile.classList.remove('btn-primary');
          tabFile.classList.add('btn-secondary');
          panelText.style.display = 'block';
          panelFile.style.display = 'none';
          
          processText();
        } else {
          tabFile.classList.remove('btn-secondary');
          tabFile.classList.add('btn-primary');
          tabText.classList.remove('btn-primary');
          tabText.classList.add('btn-secondary');
          panelFile.style.display = 'block';
          panelText.style.display = 'none';
          
          if (fileInput.files && fileInput.files[0]) {
            processFile(fileInput.files[0]);
          } else {
            processBytes(null);
          }
        }
      }

      // Event Listeners
      tabText.addEventListener('click', () => switchTab('text'));
      tabFile.addEventListener('click', () => switchTab('file'));

      textInput.addEventListener('input', () => {
        if (chkLive.checked) {
          processText();
        }
      });

      chkLive.addEventListener('change', () => {
        if (chkLive.checked) {
          btnHashNow.style.display = 'none';
          if (activeTab === 'text') {
            processText();
          } else if (fileInput.files && fileInput.files[0]) {
            processFile(fileInput.files[0]);
          }
        } else {
          btnHashNow.style.display = 'inline-block';
        }
      });

      btnHashNow.addEventListener('click', () => {
        if (activeTab === 'text') {
          processText();
        } else if (fileInput.files && fileInput.files[0]) {
          processFile(fileInput.files[0]);
        }
      });

      fileDropZone.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          processFile(e.target.files[0]);
        }
      });

      fileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropZone.classList.add('dragover');
      });

      fileDropZone.addEventListener('dragleave', () => {
        fileDropZone.classList.remove('dragover');
      });

      fileDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          fileInput.files = e.dataTransfer.files;
          processFile(e.dataTransfer.files[0]);
        }
      });

      btnRemoveFile.addEventListener('click', () => {
        fileInput.value = '';
        document.getElementById('file-details').style.display = 'none';
        fileDropZone.style.display = 'block';
        processBytes(null);
      });

      btnCaseLower.addEventListener('click', () => {
        useUppercase = false;
        btnCaseLower.classList.remove('btn-secondary');
        btnCaseLower.classList.add('btn-primary');
        btnCaseUpper.classList.remove('btn-primary');
        btnCaseUpper.classList.add('btn-secondary');
        updateOutputs();
      });

      btnCaseUpper.addEventListener('click', () => {
        useUppercase = true;
        btnCaseUpper.classList.remove('btn-secondary');
        btnCaseUpper.classList.add('btn-primary');
        btnCaseLower.classList.remove('btn-primary');
        btnCaseLower.classList.add('btn-secondary');
        updateOutputs();
      });

      btnCopyMD5.addEventListener('click', () => {
        const md5Field = document.getElementById('hash-md5-output');
        if (md5Field.value && !md5Field.value.startsWith('Computing') && !md5Field.value.startsWith('MD5')) {
          navigator.clipboard.writeText(md5Field.value);
          window.showToast('MD5 hash copied to clipboard!');
        }
      });

      btnCopySHA256.addEventListener('click', () => {
        const sha256Field = document.getElementById('hash-sha256-output');
        if (sha256Field.value && !sha256Field.value.startsWith('Computing') && !sha256Field.value.startsWith('SHA-256')) {
          navigator.clipboard.writeText(sha256Field.value);
          window.showToast('SHA-256 hash copied to clipboard!');
        }
      });

      compareInput.addEventListener('input', runComparison);

      // Initialize
      processText();
    `
  },
  {
    id: 'typing-speed-calculator',
    title: 'Typing Speed Calculator',
    desc: 'An interactive premium typing speed test featuring real-time WPM/accuracy tracking, mechanical keyboard click synthesizers, custom time limits, different difficulty and programming language prose modes, and progress visualizers.',
    category: 'calculators',
    badgeClass: 'badge-calculator',
    icon: 'keyboard',
    html: `
      <style>
        .typing-card-wrapper {
          position: relative;
        }
        .typing-card {
          background: var(--bg-surface-secondary);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
          position: relative;
          cursor: text;
          transition: all 0.2s ease;
          user-select: none;
          min-height: 160px;
        }
        .typing-card.focused {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .typing-passage {
          font-size: 19px;
          line-height: 1.6;
          letter-spacing: 0.5px;
          font-family: var(--font-sans);
          color: var(--text-muted);
          word-break: break-word;
          max-height: 130px;
          overflow: hidden;
          position: relative;
        }
        .typing-passage.code-font {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 15px;
          line-height: 1.5;
        }
        .char-correct {
          color: var(--color-primary);
          background: rgba(59, 130, 246, 0.08);
          border-radius: 2px;
        }
        .char-incorrect {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.12);
          text-decoration: underline;
          border-radius: 2px;
        }
        .char-current {
          color: var(--text-primary);
          background: var(--border-color);
          position: relative;
          border-radius: 2px;
        }
        .char-current::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 2px;
          height: 100%;
          background-color: var(--color-primary);
          animation: typing-blink 1s infinite;
        }
        @keyframes typing-blink {
          50% { opacity: 0; }
        }
        .typing-input-hidden {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }
        .focus-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(2px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          z-index: 10;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
          color: var(--text-secondary);
          transition: opacity 0.2s;
          text-align: center;
          padding: 20px;
        }
        .theme-dark .focus-overlay {
          background: rgba(15, 23, 42, 0.85);
        }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 600px) {
          .stat-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        .stat-card-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .stat-card-value {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .stat-card-unit {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .results-card {
          background: var(--bg-surface);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 32px;
          text-align: center;
          box-shadow: var(--shadow-md);
          margin-bottom: 24px;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin: 24px 0;
        }
        @media (max-width: 600px) {
          .results-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .chart-container {
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-bottom: 24px;
        }
        .chart-svg {
          width: 100%;
          height: 120px;
        }
      </style>

      <!-- Configuration Panel -->
      <div class="card mb-24" style="padding: 20px;">
        <h3 class="mb-16" style="font-size: 16px;">Test Preferences</h3>
        <div class="grid grid-2" style="gap: 16px;">
          <div class="form-group">
            <label class="form-label">Duration</label>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-primary btn-sm flex-1 duration-btn" data-time="15">15s</button>
              <button class="btn btn-secondary btn-sm flex-1 duration-btn" data-time="30">30s</button>
              <button class="btn btn-secondary btn-sm flex-1 duration-btn" data-time="60">60s</button>
              <button class="btn btn-secondary btn-sm flex-1 duration-btn" data-time="120">2m</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Difficulty / Material</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm flex-1 mode-btn" data-mode="easy">Easy Words</button>
              <button class="btn btn-secondary btn-sm flex-1 mode-btn" data-mode="medium">Medium Prose</button>
              <button class="btn btn-secondary btn-sm flex-1 mode-btn" data-mode="hard">Hard Paragraphs</button>
              <button class="btn btn-secondary btn-sm flex-1 mode-btn" data-mode="code">Programming Code</button>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--text-secondary); user-select: none;">
              <input type="checkbox" id="chk-sound" checked style="width: 16px; height: 16px; cursor: pointer;"> Mechanical Keyboard Sound (Synth)
            </label>
          </div>
          <button id="btn-reset-preferences" class="btn btn-secondary btn-sm">Reset</button>
        </div>
      </div>

      <!-- Live Stats Panel -->
      <div class="stat-grid" id="live-stats-bar">
        <div class="stat-card">
          <div class="stat-card-title">WPM (Speed)</div>
          <div class="stat-card-value" id="live-wpm">0</div>
          <div class="stat-card-unit">words / min</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">Accuracy</div>
          <div class="stat-card-value" id="live-accuracy">100<span style="font-size: 18px;">%</span></div>
          <div class="stat-card-unit">correct keys</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">Time Left</div>
          <div class="stat-card-value" id="live-timer" style="color: var(--color-primary);">15<span style="font-size: 18px;">s</span></div>
          <div class="stat-card-unit">seconds left</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">Keystrokes</div>
          <div class="stat-card-value" id="live-keys">0</div>
          <div class="stat-card-unit">correct / error</div>
        </div>
      </div>

      <!-- Interactive Typing Playground -->
      <div class="typing-card-wrapper">
        <input type="text" id="typing-input-hidden" class="typing-input-hidden" autocomplete="off" autocapitalize="off" spellcheck="false">
        
        <div id="typing-card" class="typing-card">
          <div id="focus-overlay" class="focus-overlay">
            <i data-lucide="keyboard" style="width: 36px; height: 36px; color: var(--color-primary); margin-bottom: 12px;"></i>
            <span>Click here or press any key to start typing test</span>
            <span style="font-size: 12px; color: var(--text-muted); font-weight: normal; margin-top: 6px;">Focus is required to capture keystrokes</span>
          </div>
          <div id="typing-passage" class="typing-passage">
            <!-- Populated dynamically -->
          </div>
        </div>
      </div>

      <!-- Live Restart Button -->
      <div style="display: flex; justify-content: center; margin-bottom: 24px;">
        <button id="btn-restart-test" class="btn btn-primary" style="padding: 12px 30px; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="refresh-cw" style="width: 18px; height: 18px;"></i> Restart Typing Test (Esc)
        </button>
      </div>

      <!-- Test Completed Results Dashboard -->
      <div id="results-dashboard" class="results-card fade-in" style="display: none;">
        <i data-lucide="trophy" style="width: 48px; height: 48px; color: var(--color-accent); margin: 0 auto 12px; display: block;"></i>
        <h2 style="font-size: 28px; margin-bottom: 8px;">Test Completed!</h2>
        <p id="performance-feedback" style="color: var(--text-secondary); font-size: 15px; max-width: 500px; margin: 0 auto;"></p>

        <div class="results-grid">
          <div class="stat-card" style="background: var(--bg-surface-secondary);">
            <div class="stat-card-title">Net Speed</div>
            <div class="stat-card-value" id="res-wpm" style="color: var(--color-primary);">0</div>
            <div class="stat-card-unit">Words Per Minute</div>
          </div>
          <div class="stat-card" style="background: var(--bg-surface-secondary);">
            <div class="stat-card-title">Accuracy</div>
            <div class="stat-card-value" id="res-accuracy">0%</div>
            <div class="stat-card-unit">Based on correct keys</div>
          </div>
          <div class="stat-card" style="background: var(--bg-surface-secondary);">
            <div class="stat-card-title">CPM</div>
            <div class="stat-card-value" id="res-cpm">0</div>
            <div class="stat-card-unit">Characters Per Minute</div>
          </div>
          <div class="stat-card" style="background: var(--bg-surface-secondary);">
            <div class="stat-card-title">Key Errors</div>
            <div class="stat-card-value" id="res-errors" style="color: #ef4444;">0</div>
            <div class="stat-card-unit">Incorrect key presses</div>
          </div>
        </div>

        <!-- Progress Chart -->
        <div class="chart-container" id="chart-container" style="display: none;">
          <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; text-align: left; margin-bottom: 12px; color: var(--text-muted);">Speed Timeline (WPM over time)</h4>
          <svg id="chart-svg" class="chart-svg"></svg>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button id="btn-copy-score" class="btn btn-secondary" style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="copy" style="width: 16px; height: 16px;"></i> Copy Score Card
          </button>
          <button id="btn-retry" class="btn btn-primary" style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="refresh-cw" style="width: 16px; height: 16px;"></i> Take Another Test
          </button>
        </div>
      </div>
    `,
    js: `
      // State Variables
      let testDuration = 15; // default 15s
      let selectedMode = 'easy'; // easy, medium, hard, code
      let isTestRunning = false;
      let isTestFinished = false;
      let timeLeft = testDuration;
      let timerInterval = null;
      let activePassage = "";
      
      let keystrokesCorrect = 0;
      let keystrokesIncorrect = 0;
      let totalKeystrokes = 0;
      
      let completedCharsCount = 0; // Cumulative from previous passages in same session
      let performanceHistory = []; // { sec: second, wpm: currentWpm }
      let testStartTime = null;

      const passages = {
        easy: [
          "the quick brown fox jumps over the lazy dog",
          "be yourself everyone else is already taken",
          "you only live once but if you do it right once is enough",
          "be the change that you wish to see in the world",
          "in three words I can sum up everything I have learned about life it goes on",
          "no one can make you feel inferior without your consent",
          "if you tell the truth you do not have to remember anything",
          "a friend is someone who knows all about you and still loves you",
          "to be yourself in a world that is constantly trying to make you something else is the greatest accomplishment",
          "it is better to be hated for what you are than to be loved for what you are not"
        ],
        medium: [
          "Success is not final, failure is not fatal: it is the courage to continue that counts. The best way to predict your future is to create it.",
          "Do not go where the path may lead, go instead where there is no path and leave a trail. Every strike brings me closer to the next home run.",
          "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma, which is living with the results of other people's thinking.",
          "If you look at what you have in life, you will always have more. If you look at what you don't have in life, you will never have enough.",
          "The future belongs to those who believe in the beauty of their dreams. Go confidently in the direction of your dreams. Live the life you have imagined."
        ],
        hard: [
          "The only limit to our realization of tomorrow will be our doubts of today. Let us move forward with strong and active faith! Under-estimated challenges, although daunting at first glance, usually lead to the most substantial breakthroughs. Try to complete one hundred percent of your targets.",
          "In 1969, Apollo 11 landed on the Moon, a monumental event that redefined human history. \\"That's one small step for man, one giant leap for mankind,\\" said Neil Armstrong as his boots touched the lunar dust. Who would have thought such a feat was possible just 50 years prior?",
          "Whether you think you can or you think you can't, you are right! This famous quote by Henry Ford illustrates the immense power of our psychological frame. When 99% of people quit, that's exactly when the final 1% succeed."
        ],
        code: [
          "const fetchUser = async (id) => { const response = await fetch(\\\`/api/user/\\\\\\\${id}\\\`); return response.json(); };",
          "function calculateEmi(p, r, n) { const monthlyRate = r / 12 / 100; return (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1); }",
          "import React, { useState, useEffect } from 'react';",
          "const sorted = Array.from(new Set(items)).sort((a, b) => b.score - a.score);",
          "if (loading) { return <Spinner size=\\"large\\" color=\\"var(--color-primary)\\" />; }"
        ]
      };

      // Elements
      const hiddenInput = document.getElementById('typing-input-hidden');
      const typingCard = document.getElementById('typing-card');
      const focusOverlay = document.getElementById('focus-overlay');
      const passageContainer = document.getElementById('typing-passage');
      
      const liveWpm = document.getElementById('live-wpm');
      const liveAccuracy = document.getElementById('live-accuracy');
      const liveTimer = document.getElementById('live-timer');
      const liveKeys = document.getElementById('live-keys');
      const liveStatsBar = document.getElementById('live-stats-bar');

      const resultsDashboard = document.getElementById('results-dashboard');
      const resWpm = document.getElementById('res-wpm');
      const resAccuracy = document.getElementById('res-accuracy');
      const resCpm = document.getElementById('res-cpm');
      const resErrors = document.getElementById('res-errors');
      const performanceFeedback = document.getElementById('performance-feedback');

      const btnRestart = document.getElementById('btn-restart-test');
      const btnRetry = document.getElementById('btn-retry');
      const btnCopyScore = document.getElementById('btn-copy-score');
      const chkSound = document.getElementById('chk-sound');

      // Setup audio synth click sound
      function playClickSound(isCorrect) {
        if (!chkSound.checked) return;
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!AudioContext) return;
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          if (isCorrect) {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
          } else {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
          }
        } catch(e) {}
      }

      // Initialize Test setup
      function initTest() {
        clearInterval(timerInterval);
        timerInterval = null;
        isTestRunning = false;
        isTestFinished = false;
        timeLeft = testDuration;
        
        keystrokesCorrect = 0;
        keystrokesIncorrect = 0;
        totalKeystrokes = 0;
        completedCharsCount = 0;
        performanceHistory = [];
        testStartTime = null;

        hiddenInput.value = "";
        
        // Pick random passage
        const list = passages[selectedMode];
        activePassage = list[Math.floor(Math.random() * list.length)];
        
        renderPassage();
        updateLiveStats();

        resultsDashboard.style.display = 'none';
        liveStatsBar.style.display = 'grid';
        typingCard.style.display = 'block';
        focusOverlay.style.display = 'flex';
        
        // Apply monospace font for programming code mode
        if (selectedMode === 'code') {
          passageContainer.classList.add('code-font');
        } else {
          passageContainer.classList.remove('code-font');
        }
      }

      function renderPassage() {
        passageContainer.innerHTML = '';
        for (let i = 0; i < activePassage.length; i++) {
          const span = document.createElement('span');
          span.textContent = activePassage[i];
          span.className = i === 0 ? 'char-current' : 'char-pending';
          passageContainer.appendChild(span);
        }
      }

      // Live WPM and accuracy calculators
      function calculateWpm() {
        const elapsedMinutes = (testDuration - timeLeft) / 60;
        if (elapsedMinutes <= 0) return 0;
        const netChars = completedCharsCount + keystrokesCorrect;
        const wpm = Math.round((netChars / 5) / elapsedMinutes);
        return Math.max(0, wpm);
      }

      function calculateAccuracy() {
        if (totalKeystrokes === 0) return 100;
        return Math.round((keystrokesCorrect / totalKeystrokes) * 100);
      }

      function updateLiveStats() {
        const wpm = calculateWpm();
        const acc = calculateAccuracy();
        liveWpm.textContent = wpm;
        liveAccuracy.innerHTML = acc + '<span style=\\"font-size: 18px;\\">%</span>';
        liveTimer.innerHTML = timeLeft + '<span style=\\"font-size: 18px;\\">s</span>';
        liveKeys.textContent = keystrokesCorrect + ' / ' + keystrokesIncorrect;
      }

      // Input Focus handling
      typingCard.addEventListener('click', () => {
        hiddenInput.focus();
      });

      hiddenInput.addEventListener('focus', () => {
        typingCard.classList.add('focused');
        focusOverlay.style.opacity = '0';
        setTimeout(() => {
          if (typingCard.classList.contains('focused')) {
            focusOverlay.style.display = 'none';
          }
        }, 200);
      });

      hiddenInput.addEventListener('blur', () => {
        typingCard.classList.remove('focused');
        if (!isTestFinished) {
          focusOverlay.style.display = 'flex';
          focusOverlay.style.opacity = '1';
        }
      });

      // Handle Key events & typing logic
      hiddenInput.addEventListener('input', (e) => {
        if (isTestFinished) return;
        
        if (!isTestRunning) {
          startTimer();
        }

        const typedText = hiddenInput.value;
        const typedLength = typedText.length;
        const passageLength = activePassage.length;
        
        totalKeystrokes++;

        // Determine if last keystroke was correct or incorrect
        const spans = passageContainer.querySelectorAll('span');
        let correctSoFar = true;
        let lastCharCorrect = true;

        for (let i = 0; i < passageLength; i++) {
          const span = spans[i];
          if (i < typedLength) {
            const isCharCorrect = typedText[i] === activePassage[i];
            if (isCharCorrect) {
              span.className = 'char-correct';
            } else {
              span.className = 'char-incorrect';
              correctSoFar = false;
              if (i === typedLength - 1) {
                lastCharCorrect = false;
              }
            }
          } else if (i === typedLength) {
            span.className = 'char-current';
          } else {
            span.className = 'char-pending';
          }
        }

        if (lastCharCorrect) {
          keystrokesCorrect++;
          playClickSound(true);
        } else {
          keystrokesIncorrect++;
          playClickSound(false);
        }

        updateLiveStats();

        // Check if passage completed
        if (typedLength >= passageLength && correctSoFar) {
          completedCharsCount += passageLength;
          hiddenInput.value = "";
          
          const list = passages[selectedMode];
          activePassage = list[Math.floor(Math.random() * list.length)];
          renderPassage();
        }
      });

      // Timer control loop
      function startTimer() {
        isTestRunning = true;
        testStartTime = Date.now();
        
        timerInterval = setInterval(() => {
          timeLeft--;
          
          // Save performance slice
          const currentWpm = calculateWpm();
          performanceHistory.push({
            sec: testDuration - timeLeft,
            wpm: currentWpm
          });

          updateLiveStats();

          if (timeLeft <= 0) {
            finishTest();
          }
        }, 1000);
      }

      // Finish test & render scorecard
      function finishTest() {
        clearInterval(timerInterval);
        timerInterval = null;
        isTestRunning = false;
        isTestFinished = true;
        
        hiddenInput.blur();
        typingCard.style.display = 'none';
        liveStatsBar.style.display = 'none';
        focusOverlay.style.display = 'none';
        
        const finalWpm = calculateWpm();
        const finalAcc = calculateAccuracy();
        const finalCpm = Math.round((completedCharsCount + keystrokesCorrect) / (testDuration / 60));

        resWpm.textContent = finalWpm;
        resAccuracy.textContent = finalAcc + '%';
        resCpm.textContent = finalCpm;
        resErrors.textContent = keystrokesIncorrect;

        // Feedback evaluation text
        let rating = "Turtle 🐢";
        let message = "Keep practicing! Regular typing exercises will quickly enhance your muscle memory and finger positioning.";
        
        if (finalWpm >= 80) {
          rating = "Speed Demon ⚡🚀";
          message = "Incredible! Your typing speed ranks in the top 1% globally. You have amazing command over your keyboard layout.";
        } else if (finalWpm >= 60) {
          rating = "Professional Typist ⌨️🏅";
          message = "Fantastic speed! You type with professional-grade velocity and stellar accuracy. Highly efficient!";
        } else if (finalWpm >= 40) {
          rating = "Fluent / Average 🧑‍💻✨";
          message = "Nice job! You type faster than the average person. With a bit more practice on difficult sentences, you'll cross 60 WPM!";
        } else if (finalWpm >= 25) {
          rating = "Intermediate Typist 🚶‍♂️";
          message = "Good start! Focus on maintaining consistent hand postures and keyboard shortcuts to boost your words per minute.";
        }

        performanceFeedback.innerHTML = \`Speed Level: <strong>\${rating}</strong><br><span style="font-size: 13px; font-weight: normal; margin-top: 6px; display: inline-block;">\${message}</span>\`;
        
        resultsDashboard.style.display = 'block';
        
        // Draw the line chart of WPM
        setTimeout(() => {
          drawChart(performanceHistory);
        }, 150);

        window.showToast('Test completed successfully!');
      }

      // SVG Chart rendering
      function drawChart(history) {
        const chartEl = document.getElementById('chart-container');
        if (!history || history.length === 0) {
          chartEl.style.display = 'none';
          return;
        }
        chartEl.style.display = 'block';
        const svg = document.getElementById('chart-svg');
        svg.innerHTML = '';
        
        const width = svg.clientWidth || 500;
        const height = 120;
        const padding = 20;
        
        const minWpm = 0;
        const maxWpm = Math.max(80, ...history.map(h => h.wpm)) + 15;
        
        const points = history.map((h, i) => {
          const x = padding + (i / (history.length - 1)) * (width - 2 * padding);
          const y = height - padding - ((h.wpm - minWpm) / (maxWpm - minWpm)) * (height - 2 * padding);
          return { x, y, wpm: h.wpm, sec: h.sec };
        });
        
        let d = \`M \${points[0].x} \${points[0].y}\`;
        for (let i = 1; i < points.length; i++) {
          d += \` L \${points[i].x} \${points[i].y}\`;
        }
        
        // Area
        let dArea = d + \` L \${points[points.length - 1].x} \${height - padding} L \${points[0].x} \${height - padding} Z\`;
        
        const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        areaPath.setAttribute('d', dArea);
        areaPath.setAttribute('fill', 'rgba(59, 130, 246, 0.08)');
        svg.appendChild(areaPath);

        const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        linePath.setAttribute('d', d);
        linePath.setAttribute('fill', 'none');
        linePath.setAttribute('stroke', 'var(--color-primary)');
        linePath.setAttribute('stroke-width', '2.5');
        svg.appendChild(linePath);
        
        points.forEach((p, idx) => {
          // Highlight every 3-5s depending on test duration to avoid clustering
          if (history.length > 20 && idx % 3 !== 0 && idx !== history.length - 1) return;
          
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', p.x);
          circle.setAttribute('cy', p.y);
          circle.setAttribute('r', '4');
          circle.setAttribute('fill', 'var(--bg-surface)');
          circle.setAttribute('stroke', 'var(--color-primary)');
          circle.setAttribute('stroke-width', '2');
          
          const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          title.textContent = \`\${p.sec}s: \${p.wpm} WPM\`;
          circle.appendChild(title);
          
          svg.appendChild(circle);
        });
      }

      // Dynamic chart resize observer
      const resizeObserver = new ResizeObserver(() => {
        if (isTestFinished && performanceHistory.length > 0) {
          drawChart(performanceHistory);
        }
      });
      resizeObserver.observe(document.getElementById('chart-container'));

      // Copy Score Card
      btnCopyScore.addEventListener('click', () => {
        const finalWpm = calculateWpm();
        const finalAcc = calculateAccuracy();
        const scoreText = \`🏆 MultiTools Typing Speed Test Score Card 🏆\\n\` +
                          \`----------------------------------------\\n\` +
                          \`Speed: \${finalWpm} Words Per Minute (WPM)\\n\` +
                          \`Accuracy: \${finalAcc}%\\n\` +
                          \`Time: \${testDuration} seconds\\n\` +
                          \`Mode: \${selectedMode.toUpperCase()} difficulty\\n\` +
                          \`Errors: \${keystrokesIncorrect} keystrokes\\n\` +
                          \`----------------------------------------\\n\` +
                          \`Take the test securely online at MultiTools!\`;
        
        navigator.clipboard.writeText(scoreText).then(() => {
          window.showToast('Typing scorecard copied to clipboard!');
        });
      });

      // Quick Preferences configuration
      document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (isTestRunning) {
            if (!confirm('This will reset your current test. Continue?')) return;
          }
          document.querySelectorAll('.duration-btn').forEach(b => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-secondary');
          });
          btn.classList.add('btn-primary');
          btn.classList.remove('btn-secondary');
          
          testDuration = parseInt(btn.getAttribute('data-time'));
          initTest();
          window.showToast('Duration updated to ' + testDuration + ' seconds');
        });
      });

      document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (isTestRunning) {
            if (!confirm('This will reset your current test. Continue?')) return;
          }
          document.querySelectorAll('.mode-btn').forEach(b => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-secondary');
          });
          btn.classList.add('btn-primary');
          btn.classList.remove('btn-secondary');
          
          selectedMode = btn.getAttribute('data-mode');
          initTest();
          window.showToast('Material set to: ' + selectedMode.toUpperCase());
        });
      });

      document.getElementById('btn-reset-preferences').addEventListener('click', () => {
        // Reset defaults
        testDuration = 15;
        selectedMode = 'easy';
        chkSound.checked = true;
        
        document.querySelectorAll('.duration-btn').forEach(b => {
          b.className = b.getAttribute('data-time') === '15' ? 'btn btn-primary btn-sm flex-1 duration-btn' : 'btn btn-secondary btn-sm flex-1 duration-btn';
        });
        document.querySelectorAll('.mode-btn').forEach(b => {
          b.className = b.getAttribute('data-mode') === 'easy' ? 'btn btn-primary btn-sm flex-1 mode-btn' : 'btn btn-secondary btn-sm flex-1 mode-btn';
        });
        
        initTest();
        window.showToast('Preferences restored to factory defaults');
      });

      btnRestart.addEventListener('click', initTest);
      btnRetry.addEventListener('click', initTest);

      // Listen for Escape key to restart quickly
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          initTest();
          hiddenInput.focus();
          e.preventDefault();
        }
      });

      // Quick kickoff
      initTest();
    `
  },
  {
    id: 'qr-code-scanner',
    title: 'QR Code Scanner',
    desc: 'Instantly decode QR codes in real-time using your webcam/device camera or by uploading any image file. Operates 100% client-side for maximum privacy.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'scan',
    html: `
      <style>
        .qr-scanner-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }
        .scanner-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }
        .scanner-tab-btn {
          padding: 8px 16px;
          font-weight: 600;
          font-size: 14px;
          color: var(--text-secondary);
          border: none;
          background: transparent;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s;
        }
        .scanner-tab-btn:hover {
          background: var(--bg-surface-secondary);
          color: var(--text-primary);
        }
        .scanner-tab-btn.active {
          background: var(--bg-surface-secondary);
          color: var(--color-primary);
          box-shadow: inset 0 -2px 0 0 var(--color-primary);
        }
        .scanner-container {
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        .camera-view-wrapper {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          aspect-ratio: 4/3;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #000;
          border: 2px solid var(--border-color);
        }
        #reader {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
        }
        #reader video {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }
        /* Scanning overlay effect */
        .scan-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          display: none;
          align-items: center;
          justify-content: center;
        }
        .scan-overlay.active {
          display: flex;
        }
        .scan-frame {
          width: 200px;
          height: 200px;
          border: 2px dashed var(--color-primary);
          box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.4);
          position: relative;
          border-radius: var(--radius-sm);
          z-index: 10;
        }
        .scan-laser {
          position: absolute;
          width: 200px;
          height: 2px;
          background: var(--color-primary);
          box-shadow: 0 0 8px var(--color-primary);
          animation: laser-scan 2s linear infinite;
          z-index: 15;
        }
        @keyframes laser-scan {
          0% { transform: translateY(-100px); }
          50% { transform: translateY(100px); }
          100% { transform: translateY(-100px); }
        }
        .upload-dropzone {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-lg);
          padding: 40px 20px;
          text-align: center;
          background: var(--bg-surface-secondary);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .upload-dropzone:hover, .upload-dropzone.dragover {
          border-color: var(--color-primary);
          background: rgba(59, 130, 246, 0.04);
        }
        .dropzone-title {
          font-weight: 600;
          font-size: 16px;
          color: var(--text-primary);
        }
        .result-card {
          margin-top: 24px;
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .result-text-area {
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 14px;
          font-family: var(--font-mono);
          font-size: 14px;
          word-break: break-all;
          white-space: pre-wrap;
          margin: 16px 0;
          color: var(--text-primary);
          max-height: 240px;
          overflow-y: auto;
        }
        .action-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .history-container {
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .empty-history-text {
          text-align: center;
          color: var(--text-muted);
          font-size: 14px;
          padding: 24px 0;
          font-style: italic;
        }
        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          gap: 16px;
        }
        .history-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 0;
        }
        .history-text {
          font-weight: 500;
          font-size: 14px;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
        .history-time {
          font-size: 11px;
          color: var(--text-muted);
        }
        .history-actions {
          display: flex;
          gap: 6px;
        }
      </style>

      <div class="qr-scanner-wrapper">
        <div class="scanner-tabs">
          <button id="tab-btn-camera" class="scanner-tab-btn active">
            <i data-lucide="camera" style="width: 14px; height: 14px; display: inline-block; vertical-align: text-bottom; margin-right: 6px;"></i>Camera Scan
          </button>
          <button id="tab-btn-upload" class="scanner-tab-btn">
            <i data-lucide="upload" style="width: 14px; height: 14px; display: inline-block; vertical-align: text-bottom; margin-right: 6px;"></i>Upload Image
          </button>
        </div>

        <div class="scanner-container">
          <!-- Camera Scan Panel -->
          <div id="camera-panel" class="fade-in">
            <div class="form-group" style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <label class="form-label" for="camera-select">Select Camera Device</label>
                <select id="camera-select" class="form-control" style="padding: 10px;"></select>
              </div>
              <div style="display: flex; gap: 8px; margin-top: auto; padding-bottom: 2px;">
                <button id="btn-toggle-camera" class="btn btn-primary" style="white-space: nowrap;">
                  <i data-lucide="play" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Start Camera
                </button>
                <button id="btn-switch-camera" class="btn btn-secondary" style="padding: 10px 14px;" title="Switch camera facing mode">
                  <i data-lucide="refresh-cw" style="width: 16px; height: 16px;"></i>
                </button>
              </div>
            </div>

            <div id="camera-instructions" style="text-align: center; padding: 24px 12px; background: var(--bg-surface-secondary); border: 1px dashed var(--border-color); border-radius: var(--radius-md); margin-bottom: 20px;">
              <i data-lucide="camera-off" style="width: 32px; height: 32px; color: var(--text-muted); margin-bottom: 8px;"></i>
              <p style="font-size: 14px; color: var(--text-secondary); margin: 0;">Camera is currently stopped. Click 'Start Camera' to begin scanning in real-time.</p>
            </div>

            <div id="camera-preview-box" class="camera-view-wrapper" style="display: none;">
              <div id="reader"></div>
              <div id="scan-laser-line" class="scan-overlay">
                <div class="scan-laser"></div>
                <div class="scan-frame"></div>
              </div>
            </div>
          </div>

          <!-- Upload Image Panel -->
          <div id="upload-panel" style="display: none;" class="fade-in">
            <div id="file-dropzone" class="upload-dropzone">
              <i data-lucide="image" style="width: 48px; height: 48px; color: var(--color-primary); margin-bottom: 8px;"></i>
              <span class="dropzone-title">Drag & drop your QR code image here</span>
              <p>Supports PNG, JPG, JPEG, WebP, GIF</p>
              <span style="font-size: 13px; color: var(--text-muted);">or</span>
              <button class="btn btn-secondary btn-sm" id="btn-browse-file">Browse File</button>
              <input type="file" id="file-input" accept="image/*" style="display: none;">
            </div>

            <div id="upload-preview-container" style="display: none; text-align: center; margin-top: 20px; padding: 16px; background: var(--bg-surface-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <p class="form-label" style="text-align: left;">Uploaded QR Image Preview</p>
              <img id="upload-preview" style="max-height: 200px; max-width: 100%; object-fit: contain; border-radius: var(--radius-sm); margin: 12px 0;">
              <div style="display: flex; gap: 8px; justify-content: center;">
                <button id="btn-clear-upload" class="btn btn-secondary btn-sm">
                  <i data-lucide="trash" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>Remove Image
                </button>
              </div>
            </div>
          </div>

          <!-- Scanned Decoded Results -->
          <div id="result-panel" style="display: none;" class="result-card fade-in">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="badge badge-success" style="font-size: 11px; padding: 4px 8px; text-transform: uppercase;">Decoded Successfully</span>
              <span id="result-type-badge" class="badge" style="background: rgba(59, 130, 246, 0.12); color: #3b82f6; font-size: 11px; padding: 4px 8px; text-transform: uppercase;">TEXT</span>
            </div>
            
            <div id="result-text" class="result-text-area"></div>

            <div class="action-buttons">
              <button id="btn-copy-result" class="btn btn-primary" style="flex: 1; min-width: 140px;">
                <i data-lucide="copy" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Copy Text
              </button>
              <a id="btn-open-link" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1; min-width: 140px; display: none;">
                <i data-lucide="external-link" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Open Link
              </a>
              <a id="btn-search-web" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1; min-width: 140px;">
                <i data-lucide="search" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Search Google
              </a>
            </div>
          </div>
        </div>

        <!-- History Section -->
        <div class="history-container">
          <div class="history-header">
            <h3 style="margin: 0; font-size: 18px; font-weight: 700;">Scan History</h3>
            <button id="btn-clear-history" class="btn btn-secondary btn-sm" style="display: none;">
              <i data-lucide="trash-2" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>Clear History
            </button>
          </div>

          <div id="history-list" class="history-list">
            <div class="empty-history-text">No scans recorded yet. Scanned QR codes will appear here automatically.</div>
          </div>
        </div>
      </div>
    `,
    js: `
      // Elements
      const tabCamera = document.getElementById('tab-btn-camera');
      const tabUpload = document.getElementById('tab-btn-upload');
      const panelCamera = document.getElementById('camera-panel');
      const panelUpload = document.getElementById('upload-panel');
      
      const selectCamera = document.getElementById('camera-select');
      const btnToggleCamera = document.getElementById('btn-toggle-camera');
      const btnSwitchCamera = document.getElementById('btn-switch-camera');
      const cameraInstructions = document.getElementById('camera-instructions');
      const cameraPreviewBox = document.getElementById('camera-preview-box');
      const scanLaserLine = document.getElementById('scan-laser-line');
      
      const fileDropzone = document.getElementById('file-dropzone');
      const btnBrowseFile = document.getElementById('btn-browse-file');
      const fileInput = document.getElementById('file-input');
      const uploadPreviewContainer = document.getElementById('upload-preview-container');
      const uploadPreview = document.getElementById('upload-preview');
      const btnClearUpload = document.getElementById('btn-clear-upload');
      
      const panelResult = document.getElementById('result-panel');
      const badgeResultType = document.getElementById('result-type-badge');
      const textResult = document.getElementById('result-text');
      const btnCopyResult = document.getElementById('btn-copy-result');
      const btnOpenLink = document.getElementById('btn-open-link');
      const btnSearchWeb = document.getElementById('btn-search-web');
      
      const historyList = document.getElementById('history-list');
      const btnClearHistory = document.getElementById('btn-clear-history');

      let html5QrCode = null;
      let isScanning = false;
      let currentFacingMode = 'environment'; // 'user' or 'environment'
      let camerasList = [];

      // Tab Switching
      tabCamera.addEventListener('click', () => {
        tabCamera.classList.add('active');
        tabUpload.classList.remove('active');
        panelCamera.style.display = 'block';
        panelUpload.style.display = 'none';
      });

      tabUpload.addEventListener('click', () => {
        tabUpload.classList.add('active');
        tabCamera.classList.remove('active');
        panelUpload.style.display = 'block';
        panelCamera.style.display = 'none';
        stopCameraScan();
      });

      // Browser Notification Beep using Web Audio API
      function playScanBeep() {
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // 1000 Hz tone
          gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime); // subtle volume
          
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.15); // beep duration 150ms
        } catch (e) {
          console.warn('Audio Context failed:', e);
        }
      }

      // Initialize HTML5 QR Code Scanner
      function initHtml5QrCode() {
        if (!html5QrCode) {
          html5QrCode = new Html5Qrcode("reader");
        }
      }

      // Populate camera dropdown list
      function loadCameras() {
        if (typeof Html5Qrcode === 'undefined') {
          setTimeout(loadCameras, 150);
          return;
        }
        
        Html5Qrcode.getCameras().then(devices => {
          camerasList = devices;
          selectCamera.innerHTML = '';
          
          if (devices && devices.length > 0) {
            devices.forEach((device, index) => {
              const option = document.createElement('option');
              option.value = device.id;
              option.textContent = device.label || 'Camera ' + (index + 1);
              selectCamera.appendChild(option);
            });
            selectCamera.disabled = false;
            btnToggleCamera.disabled = false;
          } else {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No camera found';
            selectCamera.appendChild(option);
            selectCamera.disabled = true;
            btnToggleCamera.disabled = true;
          }
        }).catch(err => {
          console.error("Error getting cameras", err);
          selectCamera.innerHTML = '<option value="">Permission denied / No device</option>';
          selectCamera.disabled = true;
        });
      }

      // Start/Stop Real-time Camera scan
      btnToggleCamera.addEventListener('click', () => {
        if (isScanning) {
          stopCameraScan();
        } else {
          startCameraScan();
        }
      });

      function startCameraScan() {
        if (typeof Html5Qrcode === 'undefined') {
          window.showToast('Scanner library still loading. Please wait.');
          return;
        }
        initHtml5QrCode();
        
        const cameraId = selectCamera.value;
        const config = {
          fps: 12,
          qrbox: (width, height) => {
            const minDim = Math.min(width, height);
            const boxDim = Math.floor(minDim * 0.65);
            return { width: boxDim, height: boxDim };
          }
        };

        // If no cameras populated yet, use facing mode
        const targetSource = cameraId ? { deviceId: { exact: cameraId } } : { facingMode: currentFacingMode };

        cameraInstructions.style.display = 'none';
        cameraPreviewBox.style.display = 'block';
        scanLaserLine.classList.add('active');
        
        btnToggleCamera.innerHTML = '<i data-lucide="square" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Stop Camera';
        lucide.createIcons();
        isScanning = true;

        html5QrCode.start(
          targetSource,
          config,
          (decodedText, decodedResult) => {
            handleScanSuccess(decodedText);
            stopCameraScan();
          },
          (errorMessage) => {
            // Keep scanning, silent matching errors
          }
        ).catch(err => {
          console.error("Camera start failure:", err);
          window.showToast("Could not access camera. Check permissions.");
          stopCameraScan();
        });
      }

      function stopCameraScan() {
        if (html5QrCode && isScanning) {
          html5QrCode.stop().then(() => {
            isScanning = false;
            btnToggleCamera.innerHTML = '<i data-lucide="play" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Start Camera';
            cameraInstructions.style.display = 'block';
            cameraPreviewBox.style.display = 'none';
            scanLaserLine.classList.remove('active');
            lucide.createIcons();
          }).catch(err => {
            console.error("Stop error:", err);
          });
        } else {
          isScanning = false;
          btnToggleCamera.innerHTML = '<i data-lucide="play" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Start Camera';
          cameraInstructions.style.display = 'block';
          cameraPreviewBox.style.display = 'none';
          scanLaserLine.classList.remove('active');
          lucide.createIcons();
        }
      }

      // Switch camera source (facing direction)
      btnSwitchCamera.addEventListener('click', () => {
        currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
        window.showToast("Facing mode changed to: " + (currentFacingMode === 'user' ? 'Front' : 'Back'));
        if (isScanning) {
          html5QrCode.stop().then(() => {
            isScanning = false;
            startCameraScan();
          }).catch(e => {
            isScanning = false;
            startCameraScan();
          });
        }
      });

      // Handle Decoded Code Data
      function handleScanSuccess(text) {
        playScanBeep();
        
        // Show result card
        textResult.textContent = text;
        panelResult.style.display = 'block';
        
        // Check if text is URL
        const isUrl = /^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(:\\d+)?(\\/\\S*)?$/.test(text.trim());
        
        if (isUrl) {
          let fullUrl = text.trim();
          if (!/^https?:\\/\\//i.test(fullUrl)) {
            fullUrl = 'http://' + fullUrl;
          }
          btnOpenLink.href = fullUrl;
          btnOpenLink.style.display = 'inline-flex';
          badgeResultType.textContent = 'URL / LINK';
          badgeResultType.className = 'badge badge-primary';
        } else {
          btnOpenLink.style.display = 'none';
          badgeResultType.textContent = 'TEXT';
          badgeResultType.className = 'badge';
          badgeResultType.style.background = 'rgba(156, 163, 175, 0.12)';
          badgeResultType.style.color = 'var(--text-secondary)';
        }

        // Configure search web link
        btnSearchWeb.href = 'https://www.google.com/search?q=' + encodeURIComponent(text.trim());

        // Add to history list
        addToHistory(text);
        
        window.showToast('QR Code decoded successfully!');
        
        // Scroll to result panel
        panelResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Copy decoded text output
      btnCopyResult.addEventListener('click', () => {
        const text = textResult.textContent;
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            window.showToast('Copied decoded value to clipboard!');
          });
        }
      });

      // File Drag & Drop + Browse scanning
      btnBrowseFile.addEventListener('click', () => fileInput.click());
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          processUploadFile(file);
        }
      });

      // Drag Over Class
      fileDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropzone.classList.add('dragover');
      });

      fileDropzone.addEventListener('dragleave', () => {
        fileDropzone.classList.remove('dragover');
      });

      fileDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropzone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          processUploadFile(file);
        } else {
          window.showToast('Please upload a valid image file!');
        }
      });

      function processUploadFile(file) {
        // Show local preview
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadPreview.src = e.target.result;
          uploadPreviewContainer.style.display = 'block';
          
          // Execute decoding
          decodeImageFile(file);
        };
        reader.readAsDataURL(file);
      }

      function decodeImageFile(file) {
        initHtml5QrCode();
        window.showToast('Scanning uploaded image file...');
        
        html5QrCode.scanFile(file, true)
          .then(decodedText => {
            handleScanSuccess(decodedText);
          })
          .catch(err => {
            console.error(err);
            window.showToast('No readable QR code found in this image.');
          });
      }

      btnClearUpload.addEventListener('click', () => {
        fileInput.value = '';
        uploadPreview.src = '';
        uploadPreviewContainer.style.display = 'none';
        panelResult.style.display = 'none';
      });

      // History Management with LocalStorage
      function getHistory() {
        const raw = localStorage.getItem('qr_scan_history');
        return raw ? JSON.parse(raw) : [];
      }

      function saveHistory(history) {
        localStorage.setItem('qr_scan_history', JSON.stringify(history));
      }

      function addToHistory(text) {
        const history = getHistory();
        
        // Remove duplicate text if exists to bring it to top
        const filtered = history.filter(item => item.text !== text);
        
        const newItem = {
          text: text,
          timestamp: new Date().toLocaleString(),
          id: Date.now()
        };
        
        filtered.unshift(newItem);
        
        // Cap history to 50 entries
        if (filtered.length > 50) {
          filtered.pop();
        }
        
        saveHistory(filtered);
        renderHistory();
      }

      function deleteHistoryItem(id) {
        const history = getHistory();
        const updated = history.filter(item => item.id !== id);
        saveHistory(updated);
        renderHistory();
        window.showToast('History item removed.');
      }

      function renderHistory() {
        const history = getHistory();
        
        if (history.length === 0) {
          historyList.innerHTML = '<div class="empty-history-text">No scans recorded yet. Scanned QR codes will appear here automatically.</div>';
          btnClearHistory.style.display = 'none';
          return;
        }

        btnClearHistory.style.display = 'inline-flex';
        historyList.innerHTML = '';
        
        history.forEach(item => {
          const isUrl = /^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(:\\d+)?(\\/\\S*)?$/.test(item.text.trim());
          let clickLink = item.text.trim();
          if (isUrl && !/^https?:\\/\\//i.test(clickLink)) {
            clickLink = 'http://' + clickLink;
          }

          const itemEl = document.createElement('div');
          itemEl.className = 'history-item fade-in';
          
          let actionBtnsHtml = '';
          if (isUrl) {
            actionBtnsHtml += \`
              <a href="\\\${clickLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="padding: 6px 10px;" title="Open link">
                <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
              </a>
            \`;
          }
          
          itemEl.innerHTML = \`
            <div class="history-meta">
              <span class="history-text" title="\\\${item.text}">\\\${item.text}</span>
              <span class="history-time">\\\${item.timestamp}</span>
            </div>
            <div class="history-actions">
              \\\${actionBtnsHtml}
              <button class="btn btn-secondary btn-sm btn-copy-history" style="padding: 6px 10px;" title="Copy to clipboard">
                <i data-lucide="copy" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="btn btn-secondary btn-sm btn-delete-history" style="padding: 6px 10px; color: var(--color-danger);" title="Delete entry">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          \`;

          // Event Listeners
          itemEl.querySelector('.btn-copy-history').addEventListener('click', () => {
            navigator.clipboard.writeText(item.text).then(() => {
              window.showToast('Copied: ' + (item.text.length > 20 ? item.text.substring(0, 20) + '...' : item.text));
            });
          });

          itemEl.querySelector('.btn-delete-history').addEventListener('click', () => {
            deleteHistoryItem(item.id);
          });

          historyList.appendChild(itemEl);
        });

        lucide.createIcons();
      }

      btnClearHistory.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your entire QR scan history?')) {
          saveHistory([]);
          renderHistory();
          window.showToast('Scan history cleared successfully!');
        }
      });

      // Quick Setup
      loadCameras();
      renderHistory();
    `
  },
  {
    id: 'decision-wheel',
    title: 'Decision Wheel & Random Picker',
    desc: 'Unsure about a choice? Enter your options on the wheel, choose premium palettes, and spin with realistic physics and satisfying sound effects!',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'pie-chart',
    html: `
      <style>
        .wheel-tool-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }
        .wheel-grid {
          display: grid;
          grid-template-columns: 1.12fr 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 991px) {
          .wheel-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        .wheel-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          box-shadow: var(--shadow-sm);
          position: relative;
        }
        .wheel-stage-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 1/1;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .canvas-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          position: relative;
        }
        #wheel-canvas {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12), 0 0 0 8px var(--bg-surface-secondary);
        }
        .wheel-pointer {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%) rotate(0deg);
          width: 26px;
          height: 36px;
          background: #f59e0b;
          clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
          z-index: 25;
          transform-origin: 50% 15%;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));
          transition: transform 0.04s ease-out;
        }
        .wheel-pointer.ticking {
          transform: translateX(-50%) rotate(-18deg);
        }
        .center-spin-btn {
          position: absolute;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: #ffffff;
          color: #1e293b;
          border: 5px solid #1e293b;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.5px;
          cursor: pointer;
          z-index: 20;
          box-shadow: 0 6px 16px rgba(0,0,0,0.22), inset 0 2px 4px rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          user-select: none;
        }
        .center-spin-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 20px rgba(0,0,0,0.26), inset 0 2px 4px rgba(255,255,255,0.4);
        }
        .center-spin-btn:active {
          transform: scale(0.95);
          box-shadow: 0 4px 10px rgba(0,0,0,0.18);
        }
        .center-spin-btn:disabled {
          background: #cbd5e1 !important;
          color: #94a3b8 !important;
          border-color: #cbd5e1 !important;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        html[data-theme="dark"] .center-spin-btn {
          background: #1e293b;
          color: #ffffff;
          border-color: #334155;
        }
        html[data-theme="dark"] .center-spin-btn:disabled {
          background: #334155 !important;
          color: #475569 !important;
          border-color: #475569 !important;
        }

        .wheel-action-row {
          display: flex;
          gap: 12px;
          width: 100%;
          max-width: 400px;
          margin-top: 24px;
        }
        .wheel-action-row button {
          flex: 1;
        }

        .options-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .control-card {
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 16px;
          box-shadow: var(--shadow-sm);
        }
        .options-list-container {
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 16px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          max-height: 380px;
        }
        .options-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
          flex: 1;
          padding-right: 4px;
          margin-top: 12px;
        }
        .option-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all 0.2s;
        }
        .option-item:hover {
          border-color: var(--color-primary);
        }
        .option-color-block {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          cursor: pointer;
          border: 1.5px solid rgba(0,0,0,0.12);
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .opt-color-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .option-name-span {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .option-name-input {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          background: var(--bg-surface-primary);
          border: 1px solid var(--color-primary);
          border-radius: var(--radius-sm);
          padding: 2px 6px;
          outline: none;
        }
        .option-action-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .option-action-btn:hover {
          background: var(--border-color);
          color: var(--text-primary);
        }
        .option-action-btn.btn-delete:hover {
          color: var(--color-danger);
          background: rgba(239, 68, 68, 0.08);
        }

        /* Winner Modal Overlay */
        .winner-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .winner-modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .winner-modal-content {
          width: 90%;
          max-width: 380px;
          padding: 28px 24px;
          text-align: center;
          background: var(--bg-surface-primary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
          transform: scale(0.9);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .winner-modal-overlay.active .winner-modal-content {
          transform: scale(1);
        }
        .winner-modal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
        }
        .winner-header-icon {
          width: 44px;
          height: 44px;
          color: #f59e0b;
        }
        .winner-modal-header h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
        }
        .winner-name {
          font-size: 26px;
          font-weight: 800;
          color: var(--color-primary);
          margin: 12px 0 20px 0;
          word-break: break-all;
        }
        .winner-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .winner-modal-actions button {
          width: 100%;
        }
      </style>

      <div class="wheel-tool-wrapper">
        <div class="wheel-grid">
          <!-- Left Column: The Wheel Container -->
          <div class="wheel-column">
            <div class="wheel-stage-container" id="wheel-stage-container">
              <!-- Physical Pin Tick Arrow Pointer -->
              <div class="wheel-pointer" id="wheel-pointer"></div>
              <!-- High-res Scaled Canvas wrapper -->
              <div class="canvas-wrapper">
                <canvas id="wheel-canvas"></canvas>
              </div>
              <!-- Center Pin Spin Button -->
              <button class="center-spin-btn" id="btn-spin-center">SPIN</button>
            </div>
            
            <div class="wheel-action-row">
              <button class="btn btn-primary" id="btn-spin-main">
                <i data-lucide="play" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>Spin Wheel
              </button>
              <button class="btn btn-secondary" id="btn-reset-options">
                <i data-lucide="rotate-ccw" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>Reset Default
              </button>
            </div>
          </div>
          
          <!-- Right Column: Options Control Panels -->
          <div class="options-column">
            <!-- Preset & Settings Card -->
            <div class="control-card">
              <div class="form-group mb-12">
                <label class="form-label" for="preset-select">Select Dynamic Preset</label>
                <select id="preset-select" class="form-control">
                  <option value="yes_no">Yes / No / Maybe</option>
                  <option value="dinner">Dinner Choice (Pizza, Sushi, Burger...)</option>
                  <option value="truth_dare">Truth or Dare Picker</option>
                  <option value="numbers">Dice Roll Simulator (1 - 6)</option>
                  <option value="activities">Weekend Activity Picker</option>
                  <option value="custom">Custom Wheel Options</option>
                </select>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 12px;">
                <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; cursor: pointer; user-select: none;">
                  <input type="checkbox" id="chk-sound" checked style="width: 15px; height: 15px;">
                  Sound Effects
                </label>
                <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; cursor: pointer; user-select: none;">
                  <input type="checkbox" id="chk-remove-winner" style="width: 15px; height: 15px;">
                  Auto-Remove Winner
                </label>
              </div>
            </div>

            <!-- Add Segment Card -->
            <div class="control-card">
              <label class="form-label" for="new-option-input">Add Custom Segment</label>
              <form id="add-option-form" style="display: flex; gap: 8px;">
                <input type="text" id="new-option-input" class="form-control" placeholder="Type name..." maxlength="40" required style="flex: 1;">
                <input type="color" id="new-option-color" class="color-picker-input" value="#3b82f6" title="Pick color" style="width: 38px; height: 38px; padding: 0; border: 1.5px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; background: transparent; flex-shrink: 0;">
                <button type="submit" class="btn btn-primary" style="padding: 0 14px; flex-shrink: 0;" title="Add option">
                  <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                </button>
              </form>
            </div>

            <!-- Color Theme Card -->
            <div class="control-card">
              <div class="form-group" style="margin: 0;">
                <label class="form-label" for="palette-select">Color Theme Palette</label>
                <select id="palette-select" class="form-control">
                  <option value="rainbow">Vibrant Rainbow</option>
                  <option value="pastel">Soft Pastels</option>
                  <option value="neon">Midnight Neon</option>
                  <option value="ocean">Cool Ocean Waves</option>
                  <option value="sunset">Warm Sunset Glow</option>
                  <option value="monochrome">Minimalist Slate</option>
                </select>
              </div>
            </div>

            <!-- Segment List Card -->
            <div class="options-list-container">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0; font-size: 14px; font-weight: 700;">Segments (<span id="option-count">0</span>)</h4>
                <button class="btn btn-secondary btn-sm" id="btn-clear-all" style="padding: 2px 6px; font-size: 11px; color: var(--color-danger); border-radius: var(--radius-sm);">
                  <i data-lucide="trash-2" style="width: 11px; height: 11px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;"></i>Clear All
                </button>
              </div>
              <div id="options-list" class="options-list">
                <!-- Dynamically filled list -->
              </div>
            </div>
          </div>
        </div>

        <!-- Pop-up Overlay Winner Reveal -->
        <div class="winner-modal-overlay" id="winner-modal">
          <div class="winner-modal-content card">
            <div class="winner-modal-header">
              <i data-lucide="party-popper" class="winner-header-icon"></i>
              <h3>Result Decided!</h3>
            </div>
            <div class="winner-name" id="winner-display-name">Winner!</div>
            <div class="winner-modal-actions">
              <button class="btn btn-primary" id="winner-btn-close">Fantastic!</button>
              <button class="btn btn-secondary" id="winner-btn-remove" style="color: var(--color-danger); font-weight: 600;">Remove and Spin Again</button>
            </div>
          </div>
        </div>
      </div>
    `,
    js: `
      const PRESETS = {
        yes_no: [
          { name: 'Yes', color: '#22c55e' },
          { name: 'No', color: '#ef4444' },
          { name: 'Maybe', color: '#3b82f6' },
          { name: 'Yes', color: '#10b981' },
          { name: 'No', color: '#dc2626' },
          { name: 'Ask Again', color: '#eab308' }
        ],
        dinner: [
          { name: 'Pizza 🍕', color: '#ef4444' },
          { name: 'Sushi 🍣', color: '#3b82f6' },
          { name: 'Burger 🍔', color: '#f97316' },
          { name: 'Tacos 🌮', color: '#eab308' },
          { name: 'Pasta 🍝', color: '#10b981' },
          { name: 'Salad 🥗', color: '#a855f7' }
        ],
        truth_dare: [
          { name: 'Truth 📜', color: '#3b82f6' },
          { name: 'Dare 🔥', color: '#ef4444' },
          { name: 'Truth 📜', color: '#10b981' },
          { name: 'Dare 🔥', color: '#f97316' },
          { name: 'Truth 📜', color: '#8b5cf6' },
          { name: 'Dare 🔥', color: '#ec4899' }
        ],
        numbers: [
          { name: 'One (1)', color: '#3b82f6' },
          { name: 'Two (2)', color: '#ef4444' },
          { name: 'Three (3)', color: '#10b981' },
          { name: 'Four (4)', color: '#eab308' },
          { name: 'Five (5)', color: '#f97316' },
          { name: 'Six (6)', color: '#a855f7' }
        ],
        activities: [
          { name: 'Read a Book 📚', color: '#3b82f6' },
          { name: 'Watch a Movie 🎬', color: '#ef4444' },
          { name: 'Outdoor Walk 🌳', color: '#10b981' },
          { name: 'Play Video Games 🎮', color: '#eab308' },
          { name: 'Bake Something 🧁', color: '#f97316' },
          { name: 'Work on Side Project 💻', color: '#a855f7' }
        ]
      };

      const PALETTES = {
        rainbow: ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'],
        pastel: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e8ceff', '#ffc6ff', '#cbd5e1'],
        neon: ['#ff007f', '#00f3ff', '#39ff14', '#ff073a', '#e0b0ff', '#fff01f', '#fe019a', '#08e8de'],
        ocean: ['#0284c7', '#0369a1', '#075985', '#0c4a6e', '#0e7490', '#155e75', '#164e63', '#0891b2'],
        sunset: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#f97316', '#f59e0b', '#eab308', '#f87171'],
        monochrome: ['#475569', '#334155', '#1e293b', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#f8fafc']
      };

      let options = [];
      let currentAngle = 0;
      let angleSpeed = 0;
      let lastSegmentIndex = -1;
      let state = 'IDLE'; // IDLE, SPINNING, CELEBRATING
      let currentWinnerIdx = -1;
      let confettiParticles = [];
      let audioCtx = null;

      const canvas = document.getElementById('wheel-canvas');
      const ctx = canvas.getContext('2d');
      const canvasWrapper = canvas.parentElement;

      function getHistory() {
        const raw = localStorage.getItem('decision_wheel_options');
        return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(PRESETS.yes_no));
      }

      function saveHistory(data) {
        localStorage.setItem('decision_wheel_options', JSON.stringify(data));
      }

      function isDarkTheme() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
      }

      function getContrastYIQ(hexcolor){
        if (!hexcolor || hexcolor.charAt(0) !== '#') return '#ffffff';
        const r = parseInt(hexcolor.substr(1,2),16);
        const g = parseInt(hexcolor.substr(3,2),16);
        const b = parseInt(hexcolor.substr(5,2),16);
        const yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? '#1e293b' : '#ffffff';
      }

      function playTickSound() {
        if (!document.getElementById('chk-sound').checked) return;
        try {
          if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          }
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(420, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.04);
          
          gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
          
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.start();
          osc.stop(audioCtx.currentTime + 0.04);
        } catch (e) {
          console.warn('Audio click failed:', e);
        }
      }

      function playWinSound() {
        if (!document.getElementById('chk-sound').checked) return;
        try {
          if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          }
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
          const now = audioCtx.currentTime;
          const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 arpeggio
          notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.09);
            
            gain.gain.setValueAtTime(0.12, now + idx * 0.09);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.09 + 0.25);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start(now + idx * 0.09);
            osc.stop(now + idx * 0.09 + 0.25);
          });
        } catch (e) {
          console.warn('Audio fanfare failed:', e);
        }
      }

      function initConfetti(cx, cy) {
        confettiParticles = [];
        const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#f43f5e', '#14b8a6'];
        for (let i = 0; i < 90; i++) {
          const angle = Math.random() * 2 * Math.PI;
          const speed = Math.random() * 5 + 3;
          confettiParticles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (Math.random() * 1.5 + 1.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 7 + 4,
            rotation: Math.random() * 2 * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.18,
            opacity: 1,
            decay: Math.random() * 0.009 + 0.006
          });
        }
      }

      function drawConfetti(cx, cy, size) {
        let activeParticles = 0;
        for (let i = 0; i < confettiParticles.length; i++) {
          const p = confettiParticles[i];
          if (p.opacity <= 0) continue;
          activeParticles++;
          
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
          
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // Gravity
          p.vx *= 0.98;
          p.rotation += p.rotationSpeed;
          p.opacity -= p.decay;
        }
        ctx.globalAlpha = 1.0;
        
        if (activeParticles > 0 && state === 'CELEBRATING') {
          setTimeout(() => {
            if (state === 'CELEBRATING') {
              drawWheel();
            }
          }, 16);
        }
      }

      function drawWheel() {
        const dpr = window.devicePixelRatio || 1;
        const size = Math.min(canvasWrapper.clientWidth, 400);
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
        
        const cx = size / 2;
        const cy = size / 2;
        const radius = size / 2 - 10;
        
        const len = options.length;
        if (len === 0) {
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
          ctx.fillStyle = isDarkTheme() ? '#1e293b' : '#f1f5f9';
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = isDarkTheme() ? '#334155' : '#cbd5e1';
          ctx.lineWidth = 4;
          ctx.stroke();
          
          ctx.fillStyle = isDarkTheme() ? '#64748b' : '#94a3b8';
          ctx.font = 'bold 15px var(--font-sans)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('Please add some options!', cx, cy);
          return;
        }
        
        const arc = 2 * Math.PI / len;
        
        // Render Slices
        for (let i = 0; i < len; i++) {
          const angle = currentAngle + i * arc;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, angle, angle + arc);
          ctx.fillStyle = options[i].color;
          ctx.fill();
          
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
          ctx.strokeStyle = 'rgba(0,0,0,0.18)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          // Slice Text
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle + arc / 2);
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = getContrastYIQ(options[i].color);
          
          let fontSize = 14;
          if (len > 12) fontSize = 10;
          else if (len > 8) fontSize = 12;
          ctx.font = \`bold \${fontSize}px var(--font-sans)\`;
          
          const maxTextWidth = radius * 0.65;
          let text = options[i].name;
          if (ctx.measureText(text).width > maxTextWidth) {
            while (text.length > 0 && ctx.measureText(text + '...').width > maxTextWidth) {
              text = text.slice(0, -1);
            }
            text += '...';
          }
          
          ctx.fillText(text, radius - 20, 0);
          ctx.restore();
        }
        
        // Outer Rim Ring
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = isDarkTheme() ? '#334155' : '#1e293b';
        ctx.lineWidth = 6;
        ctx.stroke();
        
        // Silver-Golden Divider Stud Jewels
        const dots = Math.max(len * 2, 12);
        const dotArc = 2 * Math.PI / dots;
        for (let i = 0; i < dots; i++) {
          const dAngle = currentAngle + i * dotArc;
          const dx = cx + radius * Math.cos(dAngle);
          const dy = cy + radius * Math.sin(dAngle);
          ctx.beginPath();
          ctx.arc(dx, dy, 3.5, 0, 2 * Math.PI);
          ctx.fillStyle = '#f59e0b';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        }
        
        // Central Metallic Peg Cap
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.16, 0, 2 * Math.PI);
        ctx.fillStyle = isDarkTheme() ? '#1e293b' : '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.22)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 1.5;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.16, 0, 2 * Math.PI);
        ctx.strokeStyle = isDarkTheme() ? '#cbd5e1' : '#1e293b';
        ctx.lineWidth = 3.5;
        ctx.stroke();
        
        if (state === 'CELEBRATING') {
          drawConfetti(cx, cy, size);
        }
      }

      function triggerPointerTick() {
        const pointer = document.getElementById('wheel-pointer');
        if (pointer) {
          pointer.classList.add('ticking');
          setTimeout(() => {
            pointer.classList.remove('ticking');
          }, 50);
        }
      }

      function spinLoop() {
        if (state !== 'SPINNING') return;
        
        currentAngle += angleSpeed;
        angleSpeed *= 0.985; // smooth friction deceleration
        
        const len = options.length;
        if (len > 0) {
          const arc = 2 * Math.PI / len;
          const topPointerOffset = -Math.PI / 2;
          const pointerOnWheel = topPointerOffset - currentAngle;
          const normAngle = (pointerOnWheel % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
          const currentSegment = Math.floor(normAngle / arc);
          
          if (currentSegment !== lastSegmentIndex) {
            lastSegmentIndex = currentSegment;
            playTickSound();
            triggerPointerTick();
          }
        }
        
        drawWheel();
        
        if (angleSpeed < 0.001) {
          state = 'CELEBRATING';
          angleSpeed = 0;
          evaluateWinner();
        } else {
          requestAnimationFrame(spinLoop);
        }
      }

      function triggerSpin() {
        if (state === 'SPINNING') return;
        if (options.length === 0) {
          window.showToast('Add some segments first!');
          return;
        }
        
        state = 'SPINNING';
        angleSpeed = Math.random() * 0.14 + 0.23; // dynamic randomized speed
        lastSegmentIndex = -1;
        
        document.getElementById('winner-modal').classList.remove('active');
        setControlState(true);
        spinLoop();
      }

      function setControlState(disabled) {
        document.getElementById('btn-spin-center').disabled = disabled;
        document.getElementById('btn-spin-main').disabled = disabled;
        document.getElementById('btn-reset-options').disabled = disabled;
        document.getElementById('btn-clear-all').disabled = disabled;
        document.getElementById('preset-select').disabled = disabled;
        document.getElementById('palette-select').disabled = disabled;
        document.getElementById('new-option-input').disabled = disabled;
        document.querySelector('.options-list-container').style.opacity = disabled ? '0.6' : '1';
        document.querySelector('.options-list-container').style.pointerEvents = disabled ? 'none' : 'auto';
      }

      function evaluateWinner() {
        setControlState(false);
        const len = options.length;
        if (len === 0) return;
        
        const arc = 2 * Math.PI / len;
        const topPointerOffset = -Math.PI / 2;
        const pointerOnWheel = topPointerOffset - currentAngle;
        const normAngle = (pointerOnWheel % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const winnerIndex = Math.floor(normAngle / arc) % len;
        
        currentWinnerIdx = winnerIndex;
        const winner = options[winnerIndex];
        
        const size = Math.min(canvasWrapper.clientWidth, 400);
        initConfetti(size / 2, size / 2);
        playWinSound();
        drawWheel();
        
        setTimeout(() => {
          const autoRemove = document.getElementById('chk-remove-winner').checked;
          if (autoRemove) {
            window.showToast(\`Winner: "\${winner.name}"! Removing option...\`);
            setTimeout(() => {
              removeOptionByIndex(winnerIndex);
              state = 'IDLE';
              drawWheel();
            }, 1200);
          } else {
            document.getElementById('winner-display-name').textContent = winner.name;
            document.getElementById('winner-modal').classList.add('active');
          }
        }, 300);
      }

      function removeOptionByIndex(idx) {
        options.splice(idx, 1);
        saveHistory(options);
        renderOptionsList();
        drawWheel();
      }

      function getNextColor() {
        const paletteKey = document.getElementById('palette-select').value;
        const colors = PALETTES[paletteKey];
        return colors[options.length % colors.length];
      }

      function renderOptionsList() {
        const listEl = document.getElementById('options-list');
        const countEl = document.getElementById('option-count');
        
        countEl.textContent = options.length;
        listEl.innerHTML = '';
        
        if (options.length === 0) {
          listEl.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 16px; font-style: italic; font-size: 13px;">No segments added yet.</div>';
          return;
        }
        
        options.forEach((opt, idx) => {
          const item = document.createElement('div');
          item.className = 'option-item';
          item.dataset.index = idx;
          
          item.innerHTML = \`
            <div class="option-color-block" style="background: \${opt.color};">
              <input type="color" class="opt-color-input" value="\${opt.color}" title="Change color">
            </div>
            <span class="option-name-span" title="Double click to rename">\${opt.name}</span>
            <button class="option-action-btn btn-edit" title="Rename segment">
              <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i>
            </button>
            <button class="option-action-btn btn-delete" title="Remove segment">
              <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
            </button>
          \`;
          
          const colorInput = item.querySelector('.opt-color-input');
          colorInput.addEventListener('input', (e) => {
            opt.color = e.target.value;
            item.querySelector('.option-color-block').style.background = opt.color;
            saveHistory(options);
            drawWheel();
          });
          
          const nameSpan = item.querySelector('.option-name-span');
          const editBtn = item.querySelector('.btn-edit');
          
          const triggerRename = () => {
            if (item.classList.contains('editing')) return;
            item.classList.add('editing');
            
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'option-name-input';
            input.value = opt.name;
            input.maxLength = 40;
            
            item.replaceChild(input, nameSpan);
            input.focus();
            input.select();
            
            const saveRename = () => {
              const val = input.value.trim();
              if (val) {
                opt.name = val;
                saveHistory(options);
              }
              renderOptionsList();
              drawWheel();
            };
            
            input.addEventListener('blur', saveRename);
            input.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') saveRename();
              else if (e.key === 'Escape') renderOptionsList();
            });
          };
          
          nameSpan.addEventListener('dblclick', triggerRename);
          editBtn.addEventListener('click', triggerRename);
          
          item.querySelector('.btn-delete').addEventListener('click', () => {
            removeOptionByIndex(idx);
          });
          
          listEl.appendChild(item);
        });
        
        lucide.createIcons();
      }

      function applyPaletteTheme() {
        const key = document.getElementById('palette-select').value;
        const colors = PALETTES[key];
        options.forEach((opt, idx) => {
          opt.color = colors[idx % colors.length];
        });
        saveHistory(options);
        renderOptionsList();
        drawWheel();
      }

      // Event Listeners setup
      document.getElementById('btn-spin-center').addEventListener('click', triggerSpin);
      document.getElementById('btn-spin-main').addEventListener('click', triggerSpin);
      
      canvas.addEventListener('click', () => {
        if (state === 'IDLE' || state === 'CELEBRATING') {
          triggerSpin();
        }
      });

      document.getElementById('palette-select').addEventListener('change', applyPaletteTheme);

      document.getElementById('preset-select').addEventListener('change', (e) => {
        const val = e.target.value;
        if (val !== 'custom' && PRESETS[val]) {
          options = JSON.parse(JSON.stringify(PRESETS[val]));
          saveHistory(options);
          renderOptionsList();
          drawWheel();
          window.showToast('Preset loaded successfully!');
        }
      });

      document.getElementById('add-option-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('new-option-input');
        const colorInput = document.getElementById('new-option-color');
        const name = input.value.trim();
        
        if (name) {
          if (options.length >= 24) {
            window.showToast('Keep segments under 24 for optimal legibility.');
            return;
          }
          
          options.push({ name, color: colorInput.value });
          saveHistory(options);
          renderOptionsList();
          drawWheel();
          
          input.value = '';
          colorInput.value = getNextColor();
          document.getElementById('preset-select').value = 'custom';
        }
      });

      document.getElementById('btn-reset-options').addEventListener('click', () => {
        if (confirm('Reset wheel back to default Yes/No/Maybe configuration?')) {
          options = JSON.parse(JSON.stringify(PRESETS.yes_no));
          document.getElementById('preset-select').value = 'yes_no';
          saveHistory(options);
          renderOptionsList();
          drawWheel();
          window.showToast('Wheel reset.');
        }
      });

      document.getElementById('btn-clear-all').addEventListener('click', () => {
        if (confirm('Clear all segments from the wheel?')) {
          options = [];
          document.getElementById('preset-select').value = 'custom';
          saveHistory(options);
          renderOptionsList();
          drawWheel();
          window.showToast('Wheel cleared.');
        }
      });

      document.getElementById('winner-btn-close').addEventListener('click', () => {
        document.getElementById('winner-modal').classList.remove('active');
        state = 'IDLE';
        drawWheel();
      });

      document.getElementById('winner-btn-remove').addEventListener('click', () => {
        document.getElementById('winner-modal').classList.remove('active');
        if (currentWinnerIdx !== -1) {
          const name = options[currentWinnerIdx]?.name || 'Segment';
          removeOptionByIndex(currentWinnerIdx);
          window.showToast(\`Removed "\${name}" from the wheel.\`);
        }
        state = 'IDLE';
        drawWheel();
      });

      window.addEventListener('themechanged', () => {
        drawWheel();
      });

      // ResizeObserver to scale elegantly on resize
      const resizeObs = new ResizeObserver(() => {
        drawWheel();
      });
      resizeObs.observe(canvasWrapper);

      // Initial Setup
      options = getHistory();
      renderOptionsList();
      drawWheel();
    `
  },
  {
    id: 'fake-data-generator',
    title: 'Fake Data Generator',
    desc: 'Generate highly realistic random data for testing and development, including names, emails, phones, addresses, UUIDs, passwords, products, prices, and text.',
    category: 'utility',
    badgeClass: 'badge-utility',
    icon: 'database',
    html: `
      <style>
        .generator-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }
        .generator-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 991px) {
          .generator-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        .config-card {
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .field-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          margin-bottom: 8px;
        }
        .field-row-drag {
          cursor: grab;
          color: var(--text-muted);
          display: flex;
          align-items: center;
        }
        .field-row-drag:active {
          cursor: grabbing;
        }
        .field-key-input {
          flex: 1;
          font-family: var(--font-mono);
          font-size: 13px;
        }
        .field-type-select {
          flex: 1.1;
          font-size: 13px;
        }
        .btn-field-delete {
          color: var(--color-danger);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .btn-field-delete:hover {
          background: rgba(239, 68, 68, 0.08);
        }
        .preview-card {
          background: var(--bg-surface-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }
        .preview-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }
        .preview-tab-btn {
          padding: 6px 12px;
          font-weight: 600;
          font-size: 13px;
          color: var(--text-secondary);
          border: none;
          background: transparent;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s;
        }
        .preview-tab-btn:hover {
          background: var(--bg-surface-secondary);
          color: var(--text-primary);
        }
        .preview-tab-btn.active {
          background: var(--bg-surface-secondary);
          color: var(--color-primary);
          box-shadow: inset 0 -2px 0 0 var(--color-primary);
        }
        .preview-content-area {
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 16px;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
          height: 480px;
          overflow: auto;
          position: relative;
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto;
          font-family: var(--font-sans);
        }
        .fake-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
          text-align: left;
        }
        .fake-table th {
          background: var(--bg-surface-primary);
          color: var(--text-secondary);
          font-weight: 600;
          padding: 10px 12px;
          border-bottom: 2px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .fake-table td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .fake-table tr:hover td {
          background: rgba(59, 130, 246, 0.03);
        }
        .action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .action-buttons-group {
          display: flex;
          gap: 8px;
        }
        .status-badge {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .preset-badge {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 9999px;
          background: var(--bg-surface-secondary);
          border: 1px solid var(--border-color);
          cursor: pointer;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.15s;
        }
        .preset-badge:hover {
          background: var(--border-color);
          color: var(--text-primary);
        }
        .json-pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .csv-pre {
          margin: 0;
          white-space: pre;
          overflow-x: auto;
        }
      </style>

      <div class="generator-wrapper">
        <div class="generator-grid">
          <!-- Left Configuration Side -->
          <div class="config-card">
            <div>
              <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700;">Data Schema Configuration</h3>
              <p style="margin: 0; font-size: 12px; color: var(--text-muted);">Customize the structure and format of fake records.</p>
            </div>

            <!-- Quick Presets -->
            <div>
              <label class="form-label" style="font-size: 12px; margin-bottom: 6px;">Schema Presets</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="preset-badge" data-preset="users">👤 Users Database</span>
                <span class="preset-badge" data-preset="ecommerce">🛒 Products / Store</span>
                <span class="preset-badge" data-preset="companies">🏢 Organizations</span>
                <span class="preset-badge" data-preset="simple">📄 Simple Contact</span>
              </div>
            </div>

            <!-- Field Rows Container -->
            <div>
              <label class="form-label" style="font-size: 12px; margin-bottom: 8px; display: flex; justify-content: space-between;">
                <span>Schema Fields</span>
                <span id="fields-count" style="font-weight: normal; color: var(--text-muted);">0 fields</span>
              </label>
              <div id="fields-container">
                <!-- Dynamically filled with active field rows -->
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-add-field" style="width: 100%; margin-top: 8px;">
                <i data-lucide="plus" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>Add Custom Field
              </button>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 4px 0;">

            <!-- Settings -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="records-count-input">Records to Generate</label>
                <input type="number" id="records-count-input" class="form-control" value="50" min="1" max="1000">
              </div>
              <div class="form-group">
                <label class="form-label" for="export-format-select">Primary Format</label>
                <select id="export-format-select" class="form-control">
                  <option value="json">JSON Array</option>
                  <option value="csv">CSV Spreadsheet</option>
                </select>
              </div>
            </div>

            <button class="btn btn-primary" id="btn-generate-fake" style="width: 100%; font-weight: 700; padding: 12px;">
              <i data-lucide="sparkles" style="width: 16px; height: 16px; margin-right: 8px; display: inline-block; vertical-align: text-bottom;"></i>Generate Fake Data
            </button>
          </div>

          <!-- Right Preview Side -->
          <div class="preview-card">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700;">Data Preview Panel</h3>
                <span id="generation-stats" class="status-badge">Click "Generate" to create mock records</span>
              </div>
              <div class="preview-tabs">
                <button class="preview-tab-btn active" data-tab="table">Table View</button>
                <button class="preview-tab-btn" data-tab="json">JSON View</button>
                <button class="preview-tab-btn" data-tab="csv">CSV View</button>
              </div>
            </div>

            <div class="preview-content-area" id="preview-box">
              <div style="text-align: center; color: var(--text-muted); padding: 80px 20px;">
                <i data-lucide="database" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5;"></i>
                <p style="margin: 0; font-size: 14px; font-weight: 500;">No active dataset generated</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.8;">Choose your options on the left and click "Generate Fake Data"</p>
              </div>
            </div>

            <div class="action-bar">
              <span class="status-badge" id="data-size-indicator"></span>
              <div class="action-buttons-group">
                <button class="btn btn-secondary" id="btn-copy-data" title="Copy dataset to clipboard" disabled>
                  <i data-lucide="copy" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>Copy
                </button>
                <button class="btn btn-secondary" id="btn-download-json" title="Download as JSON file" disabled>
                  <i data-lucide="download" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>JSON
                </button>
                <button class="btn btn-secondary" id="btn-download-csv" title="Download as CSV spreadsheet" disabled>
                  <i data-lucide="file-spreadsheet" style="width: 14px; height: 14px; margin-right: 6px; display: inline-block; vertical-align: text-bottom;"></i>CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    js: `
      const PRESETS_FIELDS = {
        users: [
          { key: 'id', type: 'uuid' },
          { key: 'name', type: 'name' },
          { key: 'email', type: 'email' },
          { key: 'phone', type: 'phone' },
          { key: 'username', type: 'username' },
          { key: 'password', type: 'password' }
        ],
        ecommerce: [
          { key: 'productId', type: 'uuid' },
          { key: 'productName', type: 'product' },
          { key: 'price', type: 'price' },
          { key: 'category', type: 'category' },
          { key: 'inStock', type: 'boolean' },
          { key: 'description', type: 'lorem' }
        ],
        companies: [
          { key: 'companyId', type: 'uuid' },
          { key: 'companyName', type: 'company' },
          { key: 'industry', type: 'category' },
          { key: 'jobTitle', type: 'job' },
          { key: 'streetAddress', type: 'address' },
          { key: 'city', type: 'city' }
        ],
        simple: [
          { key: 'firstName', type: 'firstname' },
          { key: 'lastName', type: 'lastname' },
          { key: 'email', type: 'email' },
          { key: 'phoneNumber', type: 'phone' }
        ]
      };

      const DATA_POOL = {
        firstnames: ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Jessica', 'James', 'Olivia', 'Robert', 'Emma', 'William', 'Sophia', 'Joseph', 'Isabella', 'Thomas', 'Mia', 'Charles', 'Charlotte', 'Daniel', 'Amelia', 'Matthew', 'Harper', 'Anthony', 'Evelyn', 'Mark', 'Abigail', 'Donald', 'Elizabeth', 'Paul', 'Sofia', 'Steven', 'Avery', 'Andrew', 'Ella', 'Kenneth', 'Madison', 'Joshua', 'Scarlett'],
        lastnames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'],
        domains: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'prototype.io', 'enterprise.com', 'techcorp.com', 'dynamiclabs.org', 'cloudwave.net', 'sparksolutions.co'],
        streets: ['Maple', 'Oak', 'Pine', 'Cedar', 'Elm', 'Spruce', 'Birch', 'Walnut', 'Willow', 'Hickory', 'Sunset', 'Broadway', 'Park', 'Main', 'Cherry', 'Forest', 'Lake', 'Hill', 'Valley', 'Ridge', 'Meadow', 'River', 'View', 'Highland', 'Bridge', 'Mill', 'Grove', 'Spring', 'Garden', 'School'],
        streetTypes: ['St', 'Ave', 'Rd', 'Blvd', 'Ln', 'Dr', 'Way', 'Ct', 'Pl', 'Ter'],
        cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Fort Worth', 'Indianapolis', 'Charlotte', 'Seattle', 'Denver', 'Boston', 'El Paso', 'Detroit', 'Nashville', 'Portland', 'Memphis', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore', 'Milwaukee'],
        companies: ['TechCorp', 'Innovate Solutions', 'CloudWave', 'Apex Labs', 'Global Trade', 'Delta Dynamics', 'Alpha Group', 'Synergy Inc', 'FutureSoft', 'Venture Partners', 'Horizon Media', 'Peak Performance', 'Omni Industries', 'Nexus Systems', 'Core Technologies'],
        jobs: ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'Account Executive', 'Marketing Manager', 'Financial Analyst', 'HR Specialist', 'Operations Lead', 'Sales Director', 'Customer Success Specialist', 'Devops Engineer', 'Chief Executive Officer', 'Art Director', 'Content Writer'],
        adjectives: ['Premium', 'Wireless', 'Ergonomic', 'Portable', 'Eco-friendly', 'Smart', 'Ultra', 'Sleek', 'Compact', 'High-performance', 'Heavy-duty', 'Lightweight', 'Modern', 'Classic', 'Hybrid', 'Retro'],
        nouns: ['Keyboard', 'Headphones', 'Mouse', 'Speaker', 'Water Bottle', 'Backpack', 'Desk Lamp', 'Monitor', 'Smartwatch', 'Charger', 'Notebook', 'Phone Case', 'Sunglasses', 'Wallet', 'Umbrella', 'Coffee Mug'],
        categories: ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Entertainment', 'Automotive', 'Real Estate', 'Logistics', 'Travel'],
        loremWords: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'aliquam', 'nec', 'diam', 'vel', 'nunc', 'efficitur', 'pretium', 'mauris', 'vulputate', 'justo', 'vitae', 'mi', 'dictum', 'tristique', 'proin', 'ac', 'libero', 'eu', 'diam', 'porta', 'cursus', 'sodales', 'non', 'tellus', 'vestibulum', 'tristique', 'sapien', 'in', 'tristique', 'elementum', 'phasellus', 'feugiat', 'felis', 'ex', 'ut', 'posuere', 'nisl', 'porta', 'et', 'ut', 'vitae', 'justo', 'lorem', 'praesent', 'id', 'interdum', 'metus', 'quisque', 'interdum', 'ante', 'ligula', 'id', 'luctus', 'dolor', 'porta', 'vel', 'nam', 'tristique', 'id', 'ex', 'eu', 'tempus']
      };

      let activeFields = [];
      let generatedDataset = [];
      let activeTab = 'table';

      function getHistoryPreferences() {
        const raw = localStorage.getItem('fake_gen_fields');
        return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(PRESETS_FIELDS.users));
      }

      function saveHistoryPreferences(fields) {
        localStorage.setItem('fake_gen_fields', JSON.stringify(fields));
      }

      // Generate single value based on type
      function generateFakeValue(type) {
        const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const randFloat = (min, max, dec = 2) => (Math.random() * (max - min) + min).toFixed(dec);

        switch (type) {
          case 'uuid':
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          case 'name':
            return \`\${randItem(DATA_POOL.firstnames)} \${randItem(DATA_POOL.lastnames)}\`;
          case 'firstname':
            return randItem(DATA_POOL.firstnames);
          case 'lastname':
            return randItem(DATA_POOL.lastnames);
          case 'email': {
            const f = randItem(DATA_POOL.firstnames).toLowerCase();
            const l = randItem(DATA_POOL.lastnames).toLowerCase();
            return \`\${f}.\${l}\${randInt(10, 99)}@\${randItem(DATA_POOL.domains)}\`;
          }
          case 'phone':
            return \`+1 (\${randInt(200, 999)}) 555-\${randInt(1000, 9999)}\`;
          case 'username': {
            const f = randItem(DATA_POOL.firstnames).toLowerCase();
            return \`\${f}_\${randItem(DATA_POOL.lastnames).toLowerCase().substring(0, 4)}\${randInt(100, 999)}\`;
          }
          case 'password': {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
            let pass = '';
            for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
            return pass;
          }
          case 'company':
            return randItem(DATA_POOL.companies);
          case 'job':
            return randItem(DATA_POOL.jobs);
          case 'address':
            return \`\${randInt(100, 9999)} \${randItem(DATA_POOL.streets)} \${randItem(DATA_POOL.streetTypes)}\`;
          case 'city':
            return randItem(DATA_POOL.cities);
          case 'product':
            return \`\${randItem(DATA_POOL.adjectives)} \${randItem(DATA_POOL.nouns)}\`;
          case 'price':
            return \`$\${randFloat(10, 500)}\`;
          case 'category':
            return randItem(DATA_POOL.categories);
          case 'boolean':
            return Math.random() > 0.3 ? 'true' : 'false';
          case 'number':
            return randInt(1, 10000).toString();
          case 'lorem': {
            let s = [];
            const count = randInt(8, 15);
            for (let i = 0; i < count; i++) s.push(randItem(DATA_POOL.loremWords));
            const sent = s.join(' ');
            return sent.charAt(0).toUpperCase() + sent.slice(1) + '.';
          }
          default:
            return '';
        }
      }

      function renderFieldsList() {
        const container = document.getElementById('fields-container');
        const countIndicator = document.getElementById('fields-count');
        
        container.innerHTML = '';
        countIndicator.textContent = \`\${activeFields.length} field\${activeFields.length === 1 ? '' : 's'}\`;

        activeFields.forEach((field, idx) => {
          const row = document.createElement('div');
          row.className = 'field-row';
          row.dataset.index = idx;

          row.innerHTML = \`
            <div class="field-row-drag" title="Reorder field">
              <i data-lucide="grip-vertical" style="width: 14px; height: 14px;"></i>
            </div>
            <input type="text" class="form-control field-key-input" value="\${field.key}" placeholder="key_name" required>
            <select class="form-control field-type-select">
              <option value="uuid" \${field.type === 'uuid' ? 'selected' : ''}>ID (UUID)</option>
              <option value="name" \${field.type === 'name' ? 'selected' : ''}>Full Name</option>
              <option value="firstname" \${field.type === 'firstname' ? 'selected' : ''}>First Name</option>
              <option value="lastname" \${field.type === 'lastname' ? 'selected' : ''}>Last Name</option>
              <option value="email" \${field.type === 'email' ? 'selected' : ''}>Email Address</option>
              <option value="phone" \${field.type === 'phone' ? 'selected' : ''}>Phone Number</option>
              <option value="username" \${field.type === 'username' ? 'selected' : ''}>Username</option>
              <option value="password" \${field.type === 'password' ? 'selected' : ''}>Password</option>
              <option value="company" \${field.type === 'company' ? 'selected' : ''}>Company Name</option>
              <option value="job" \${field.type === 'job' ? 'selected' : ''}>Job Title</option>
              <option value="address" \${field.type === 'address' ? 'selected' : ''}>Street Address</option>
              <option value="city" \${field.type === 'city' ? 'selected' : ''}>City</option>
              <option value="product" \${field.type === 'product' ? 'selected' : ''}>Product Name</option>
              <option value="price" \${field.type === 'price' ? 'selected' : ''}>Price Range</option>
              <option value="category" \${field.type === 'category' ? 'selected' : ''}>Category</option>
              <option value="boolean" \${field.type === 'boolean' ? 'selected' : ''}>Boolean (T/F)</option>
              <option value="number" \${field.type === 'number' ? 'selected' : ''}>Random Number</option>
              <option value="lorem" \${field.type === 'lorem' ? 'selected' : ''}>Lorem Ipsum Text</option>
            </select>
            <button class="btn-field-delete" title="Remove Field">
              <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
            </button>
          \`;

          const keyInput = row.querySelector('.field-key-input');
          const typeSelect = row.querySelector('.field-type-select');

          keyInput.addEventListener('change', (e) => {
            field.key = e.target.value.trim().replace(/\\s+/g, '_');
            saveHistoryPreferences(activeFields);
          });

          typeSelect.addEventListener('change', (e) => {
            field.type = e.target.value;
            saveHistoryPreferences(activeFields);
          });

          row.querySelector('.btn-field-delete').addEventListener('click', () => {
            activeFields.splice(idx, 1);
            saveHistoryPreferences(activeFields);
            renderFieldsList();
          });

          container.appendChild(row);
        });

        lucide.createIcons();
      }

      function convertToCSV(data) {
        if (data.length === 0) return '';
        const headers = Object.keys(data[0]);
        const csvRows = [
          headers.join(','),
          ...data.map(row => 
            headers.map(field => {
              const val = row[field] === null ? '' : String(row[field]);
              // Escape double quotes and wrap values containing commas, quotes, or newlines
              if (val.includes(',') || val.includes('"') || val.includes('\\n')) {
                return \`"\${val.replace(/"/g, '""')}"\`;
              }
              return val;
            }).join(',')
          )
        ];
        return csvRows.join('\\n');
      }

      function renderPreview() {
        const previewBox = document.getElementById('preview-box');
        const count = generatedDataset.length;

        if (count === 0) {
          previewBox.innerHTML = \`
            <div style="text-align: center; color: var(--text-muted); padding: 80px 20px;">
              <i data-lucide="database" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5;"></i>
              <p style="margin: 0; font-size: 14px; font-weight: 500;">No active dataset generated</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.8;">Choose your options on the left and click "Generate Fake Data"</p>
            </div>
          \`;
          lucide.createIcons();
          return;
        }

        if (activeTab === 'table') {
          let headers = Object.keys(generatedDataset[0]);
          let tableHtml = \`
            <div class="table-responsive">
              <table class="fake-table">
                <thead>
                  <tr>
                    \${headers.map(h => \`<th>\${h}</th>\`).join('')}
                  </tr>
                </thead>
                <tbody>
                  \${generatedDataset.map(row => \`
                    <tr>
                      \${headers.map(h => \`<td title="\${row[h]}">\${row[h]}</td>\`).join('')}
                    </tr>
                  \`).join('')}
                </tbody>
              </table>
            </div>
          \`;
          previewBox.innerHTML = tableHtml;
        } else if (activeTab === 'json') {
          previewBox.innerHTML = \`<pre class="json-pre"><code>\${JSON.stringify(generatedDataset, null, 2)}</code></pre>\`;
        } else if (activeTab === 'csv') {
          const csvText = convertToCSV(generatedDataset);
          previewBox.innerHTML = \`<pre class="csv-pre"><code>\${csvText}</code></pre>\`;
        }
      }

      function performGeneration() {
        const recordCountInput = document.getElementById('records-count-input');
        let count = parseInt(recordCountInput.value, 10);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 1000) count = 1000;
        recordCountInput.value = count;

        if (activeFields.length === 0) {
          window.showToast('Please add at least one field to your schema!');
          return;
        }

        const start = performance.now();
        generatedDataset = [];

        for (let i = 0; i < count; i++) {
          let row = {};
          activeFields.forEach(field => {
            row[field.key || 'field'] = generateFakeValue(field.type);
          });
          generatedDataset.push(row);
        }

        const end = performance.now();
        const duration = (end - start).toFixed(1);

        // Update stats
        document.getElementById('generation-stats').textContent = \`Generated \${count} records in \${duration}ms\`;
        
        // Update size indicator
        const jsonStr = JSON.stringify(generatedDataset);
        const kbSize = (jsonStr.length / 1024).toFixed(1);
        document.getElementById('data-size-indicator').textContent = \`Dataset Size: \${kbSize} KB\`;

        // Enable buttons
        document.getElementById('btn-copy-data').disabled = false;
        document.getElementById('btn-download-json').disabled = false;
        document.getElementById('btn-download-csv').disabled = false;

        renderPreview();
        window.showToast(\`Successfully generated \${count} records!\`);
      }

      // Add Field Event
      document.getElementById('btn-add-field').addEventListener('click', () => {
        const keySug = \`field_\${activeFields.length + 1}\`;
        activeFields.push({ key: keySug, type: 'name' });
        saveHistoryPreferences(activeFields);
        renderFieldsList();
      });

      // Generation trigger
      document.getElementById('btn-generate-fake').addEventListener('click', performGeneration);

      // Presets triggers
      document.querySelectorAll('.preset-badge').forEach(badge => {
        badge.addEventListener('click', (e) => {
          const presetName = e.currentTarget.dataset.preset;
          if (PRESETS_FIELDS[presetName]) {
            activeFields = JSON.parse(JSON.stringify(PRESETS_FIELDS[presetName]));
            saveHistoryPreferences(activeFields);
            renderFieldsList();
            window.showToast(\`Loaded "\${presetName}" schema template!\`);
          }
        });
      });

      // Tabs mechanism
      document.querySelectorAll('.preview-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.preview-tab-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          activeTab = e.currentTarget.dataset.tab;
          renderPreview();
        });
      });

      // Copy Action
      document.getElementById('btn-copy-data').addEventListener('click', () => {
        if (generatedDataset.length === 0) return;
        
        let textToCopy = '';
        if (activeTab === 'csv') {
          textToCopy = convertToCSV(generatedDataset);
        } else {
          textToCopy = JSON.stringify(generatedDataset, null, 2);
        }

        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            window.showToast('Copied dataset to clipboard!');
          })
          .catch(() => {
            window.showToast('Copy failed. Try manual copy.');
          });
      });

      // Download JSON
      document.getElementById('btn-download-json').addEventListener('click', () => {
        if (generatedDataset.length === 0) return;
        const blob = new Blob([JSON.stringify(generatedDataset, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`fake-data-\${Date.now()}.json\`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        window.showToast('Downloaded JSON successfully.');
      });

      // Download CSV
      document.getElementById('btn-download-csv').addEventListener('click', () => {
        if (generatedDataset.length === 0) return;
        const csvText = convertToCSV(generatedDataset);
        const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`fake-data-\${Date.now()}.csv\`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        window.showToast('Downloaded CSV successfully.');
      });

      // Initialize
      activeFields = getHistoryPreferences();
      renderFieldsList();
    `
  }
];



