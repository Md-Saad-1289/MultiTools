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
  }
];
