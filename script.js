// =============================================
// script.js — InstaAnalyzer
// =============================================

// ─── State ───────────────────────────────────
const state = {
  dataSets: { notFollowingBack: [], fans: [] },
  currentTab: 'notFollowingBack',
  zipFollowersData: null,
  zipFollowingData: null,
  manualFollowersData: null,
  manualFollowingData: null,
  slideIndex: 0,
  totalSlides: 0,
};

// ─── Translations ─────────────────────────────
const translations = {
  en: {
    'hero.badge': 'Free &amp; Private — All processing happens in your browser',
    'hero.title.line1': 'Discover Who',
    'hero.title.line2': 'Really Follows',
    'hero.title.line3': ' You',
    'hero.subtitle': "Upload your Instagram export and instantly see who doesn't follow you back — and who your biggest fans are.",
    'import.heading': 'Import your Instagram data',
    'import.tab.quick': 'Quick Import',
    'import.tab.manual': 'Manual Import',
    'import.quick.title': 'Quick Import via ZIP',
    'import.quick.desc': 'Upload your Instagram export ZIP and InstaAnalyzer will automatically detect the required files.',
    'import.quick.dropLabel': 'Drop Instagram Export ZIP here',
    'import.quick.dropSub': 'or click to browse &nbsp;·&nbsp; .zip files only',
    'import.quick.hint': 'Automatically detects <code>followers_1.json</code> and <code>following.json</code>',
    'import.manual.followers.title': 'Followers List',
    'import.manual.followers.desc': 'Upload',
    'import.manual.following.title': 'Following List',
    'import.manual.following.desc': 'Upload',
    'import.manual.dropSub': 'or click to browse',
    'btn.analyze': 'Start Analysis',
    'btn.reset': 'Analyze Another Export',
    'btn.analyzing': 'Analyzing…',
    'stats.heading': 'Analysis Summary',
    'stats.followers': 'Followers',
    'stats.following': 'Following',
    'stats.notback': 'Not Following Back',
    'stats.fans': 'Fans',
    'results.heading': 'Analysis Results',
    'results.tab.notback': 'Not Following Back',
    'results.tab.fans': 'Fans',
    'results.tip.notback': "People you follow who don't follow you back",
    'results.tip.fans': "People who follow you, but you don't follow back",
    'search.label': 'Search username',
    'search.placeholder': 'Search username…',
    'list.empty.search': 'No results for',
    'list.empty.default': 'No accounts found.',
    'tutorial.label': 'Tutorial',
    'tutorial.title': 'How to Get Your Instagram JSON Files',
    'tutorial.desc': 'Follow these steps to export your followers &amp; following data directly from Meta Accounts Center.',
    'tutorial.badge.label': 'Safe Process',
    'tutorial.badge.value': 'Official Meta Export',
    'tutorial.step1.pre': 'Go to',
    'tutorial.step1.post': '› <strong>Your information and permissions</strong> and select <strong>"Export your information"</strong>.',
    'tutorial.step2': 'Click the <strong>"Create export"</strong> button to start a new request.',
    'tutorial.step3': 'Select the <strong>Instagram profile</strong> you want to analyze.',
    'tutorial.step4': 'Choose <strong>"Export to device"</strong> as your destination.',
    'tutorial.step5.title': 'Configure format:',
    'tutorial.step5.pill1.label': 'Customize information',
    'tutorial.step5.pill1.value': 'Followers &amp; following',
    'tutorial.step5.pill2.label': 'Date Range',
    'tutorial.step5.pill2.value': 'All time',
    'tutorial.step5.pill3.label': 'Format',
    'tutorial.step6': 'Enter your <strong>password</strong> to confirm. Meta will begin processing your data.',
    'tutorial.step7': "Wait for Meta to finish. You'll receive an <strong>email notification</strong>, or you can refresh the page until a <strong>Download</strong> button appears.",
    'tutorial.step8': 'Download the <strong>ZIP file</strong> and upload it directly using <strong>Quick Import</strong>. If needed, you can also extract it and upload <code>followers_1.json</code> and <code>following.json</code> manually.',
    'tutorial.tip1.title': 'Export may take time',
    'tutorial.tip1.desc': 'Meta can take minutes or hours depending on account size.',
    'tutorial.tip2.title': 'Use JSON format',
    'tutorial.tip2.desc': 'Choosing HTML format will not work with this analyzer.',
    'tutorial.slides.label': 'Visual Guide',
    'tutorial.slides.title': 'Step-by-step Screenshots',
    'tutorial.slides.zoom': 'Click to zoom',
    'footer.made': 'Made with',
    'footer.by': 'by',
    'footer.privacy': 'Your data never leaves your device',
    'fab.tutorial': 'Tutorial',
    'toast.noFile': 'Please upload your Instagram export ZIP or both JSON files first.',
    'toast.error': 'An error occurred during analysis. Please check your files.',
    'toast.zipNotFound': 'followers_1.json or following.json not found inside the ZIP.',
    'toast.onlyZip': 'Only ZIP files are allowed.',
    'toast.onlyJson': 'Only JSON files are allowed.',
    'toast.readingZip': 'Reading ZIP…',
  },
  id: {
    'hero.badge': 'Gratis &amp; Privat — Semua pemrosesan terjadi di browser Anda',
    'hero.title.line1': 'Temukan Siapa yang',
    'hero.title.line2': 'Benar-benar Mengikuti',
    'hero.title.line3': ' Anda',
    'hero.subtitle': 'Unggah ekspor Instagram Anda dan langsung lihat siapa yang tidak mengikuti Anda balik — dan siapa penggemar terbesar Anda.',
    'import.heading': 'Impor data Instagram Anda',
    'import.tab.quick': 'Impor Cepat',
    'import.tab.manual': 'Impor Manual',
    'import.quick.title': 'Impor Cepat via ZIP',
    'import.quick.desc': 'Unggah ZIP ekspor Instagram Anda dan InstaAnalyzer akan otomatis mendeteksi file yang diperlukan.',
    'import.quick.dropLabel': 'Seret ZIP Ekspor Instagram ke sini',
    'import.quick.dropSub': 'atau klik untuk pilih file &nbsp;·&nbsp; hanya file .zip',
    'import.quick.hint': 'Otomatis mendeteksi <code>followers_1.json</code> dan <code>following.json</code>',
    'import.manual.followers.title': 'Daftar Pengikut',
    'import.manual.followers.desc': 'Unggah',
    'import.manual.following.title': 'Daftar Mengikuti',
    'import.manual.following.desc': 'Unggah',
    'import.manual.dropSub': 'atau klik untuk pilih file',
    'btn.analyze': 'Mulai Analisis',
    'btn.reset': 'Analisis Ekspor Lain',
    'btn.analyzing': 'Menganalisis…',
    'stats.heading': 'Ringkasan Analisis',
    'stats.followers': 'Pengikut',
    'stats.following': 'Mengikuti',
    'stats.notback': 'Tidak Mengikuti Balik',
    'stats.fans': 'Penggemar',
    'results.heading': 'Hasil Analisis',
    'results.tab.notback': 'Tidak Mengikuti Balik',
    'results.tab.fans': 'Penggemar',
    'results.tip.notback': 'Orang yang Anda ikuti tetapi tidak mengikuti Anda balik',
    'results.tip.fans': 'Orang yang mengikuti Anda, tetapi Anda tidak mengikuti balik',
    'search.label': 'Cari nama pengguna',
    'search.placeholder': 'Cari nama pengguna…',
    'list.empty.search': 'Tidak ada hasil untuk',
    'list.empty.default': 'Tidak ada akun ditemukan.',
    'tutorial.label': 'Tutorial',
    'tutorial.title': 'Cara Mendapatkan File JSON Instagram Anda',
    'tutorial.desc': 'Ikuti langkah-langkah ini untuk mengekspor data pengikut &amp; mengikuti langsung dari Meta Accounts Center.',
    'tutorial.badge.label': 'Proses Aman',
    'tutorial.badge.value': 'Ekspor Resmi Meta',
    'tutorial.step1.pre': 'Buka',
    'tutorial.step1.post': '› <strong>Informasi dan izin Anda</strong> lalu pilih <strong>"Ekspor informasi Anda"</strong>.',
    'tutorial.step2': 'Klik tombol <strong>"Buat ekspor"</strong> untuk memulai permintaan baru.',
    'tutorial.step3': 'Pilih <strong>profil Instagram</strong> yang ingin Anda analisis.',
    'tutorial.step4': 'Pilih <strong>"Ekspor ke perangkat"</strong> sebagai tujuan.',
    'tutorial.step5.title': 'Konfigurasi format:',
    'tutorial.step5.pill1.label': 'Sesuaikan informasi',
    'tutorial.step5.pill1.value': 'Pengikut &amp; mengikuti',
    'tutorial.step5.pill2.label': 'Rentang Tanggal',
    'tutorial.step5.pill2.value': 'Sepanjang waktu',
    'tutorial.step5.pill3.label': 'Format',
    'tutorial.step6': 'Masukkan <strong>kata sandi</strong> Anda untuk konfirmasi. Meta akan mulai memproses data Anda.',
    'tutorial.step7': 'Tunggu Meta selesai. Anda akan menerima <strong>notifikasi email</strong>, atau Anda bisa muat ulang halaman hingga tombol <strong>Unduh</strong> muncul.',
    'tutorial.step8': 'Unduh <strong>file ZIP</strong> dan unggah langsung menggunakan <strong>Impor Cepat</strong>. Jika diperlukan, Anda juga dapat mengekstraknya lalu mengunggah <code>followers_1.json</code> dan <code>following.json</code> secara manual.',
    'tutorial.tip1.title': 'Ekspor mungkin memerlukan waktu',
    'tutorial.tip1.desc': 'Meta bisa memerlukan menit atau jam tergantung ukuran akun.',
    'tutorial.tip2.title': 'Gunakan format JSON',
    'tutorial.tip2.desc': 'Memilih format HTML tidak akan berfungsi dengan penganalisis ini.',
    'tutorial.slides.label': 'Panduan Visual',
    'tutorial.slides.title': 'Screenshot Langkah demi Langkah',
    'tutorial.slides.zoom': 'Klik untuk perbesar',
    'footer.made': 'Dibuat dengan',
    'footer.by': 'oleh',
    'footer.privacy': 'Data Anda tidak pernah meninggalkan perangkat Anda',
    'fab.tutorial': 'Tutorial',
    'toast.noFile': 'Silakan unggah ZIP ekspor Instagram Anda atau kedua file JSON terlebih dahulu.',
    'toast.error': 'Terjadi kesalahan saat analisis. Periksa file Anda.',
    'toast.zipNotFound': 'followers_1.json atau following.json tidak ditemukan di dalam ZIP.',
    'toast.onlyZip': 'Hanya file ZIP yang diizinkan.',
    'toast.onlyJson': 'Hanya file JSON yang diizinkan.',
    'toast.readingZip': 'Membaca ZIP…',
  },
};

// ─── i18n Core ────────────────────────────────
let currentLang = 'en';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) ||
         (translations['en'][key]) ||
         key;
}

function applyTranslations() {
  // data-i18n elements (innerHTML for elements that contain HTML)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (value !== undefined) {
      el.innerHTML = value;
    }
  });

  // data-i18n-placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = t(key);
    if (value !== undefined) {
      el.placeholder = value;
    }
  });

  // data-i18n-tip elements (tooltip data-tip attribute)
  document.querySelectorAll('[data-i18n-tip]').forEach(el => {
    const key = el.getAttribute('data-i18n-tip');
    const value = t(key);
    if (value !== undefined) {
      el.setAttribute('data-tip', value);
    }
  });

  // Restore dynamic dropzone labels that haven't been overridden by a file load
  const nameZip = document.getElementById('name-zip');
  if (nameZip && !nameZip.dataset.fileLoaded) {
    nameZip.innerHTML = t('import.quick.dropLabel');
    nameZip.style.color = '';
  }

  // Update analyze button if not in loading state
  const analyzeBtn = document.getElementById('analyze-btn');
  if (analyzeBtn && !analyzeBtn.classList.contains('loading')) {
    const icon = analyzeBtn.querySelector('i');
    const span = analyzeBtn.querySelector('span[data-i18n]');
    if (span) span.innerHTML = t('btn.analyze');
  }

  // Update html lang attribute
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('ia-lang', lang);
  applyTranslations();

  // Re-render list to update empty state messages
  renderList();
}

function initLang() {
  const saved = localStorage.getItem('ia-lang');
  const lang = (saved && translations[saved]) ? saved : 'en';
  currentLang = lang;

  // Sync radio buttons
  const radios = document.querySelectorAll('input[name="lang"]');
  radios.forEach(radio => {
    radio.checked = radio.value === lang;
    radio.addEventListener('change', () => {
      if (radio.checked) setLang(radio.value);
    });
  });

  applyTranslations();
}

// ─── Scroll Restoration ───────────────────────
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// ─── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  initDropzones();
  initSlideshow();
  initTutorialFab();
  lucide.createIcons();
});

// ─── Theme ────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('ia-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ia-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ─── Dropzone Factory ─────────────────────────
function setupDropzone({ zoneId, inputId, labelId, accept, onLoad }) {
  const zone  = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  const label = document.getElementById(labelId);

  if (!zone || !input) return;

  zone.addEventListener('click', () => input.click());

  zone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });

  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await handleFile(file, zone, label, onLoad);
  });

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', (e) => {
    if (!zone.contains(e.relatedTarget)) {
      zone.classList.remove('drag-over');
    }
  });

  zone.addEventListener('drop', async (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(accept)) {
      showToast(accept === '.zip' ? t('toast.onlyZip') : t('toast.onlyJson'), 'error');
      return;
    }

    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;

    await handleFile(file, zone, label, onLoad);
  });
}

async function handleFile(file, zone, label, onLoad) {
  try {
    await onLoad(file, label);
    zone.classList.add('loaded');
  } catch (err) {
    showToast(err.message, 'error');
    zone.classList.remove('loaded');
  }
}

// ─── JSON Dropzone ────────────────────────────
function setupJsonDropzone(zoneId, inputId, labelId, storageKey) {
  setupDropzone({
    zoneId,
    inputId,
    labelId,
    accept: '.json',
    onLoad: async (file, label) => {
      if (!file.name.toLowerCase().endsWith('.json')) {
        throw new Error(t('toast.onlyJson'));
      }
      const data = await readJSON(file);
      state[storageKey] = data;
      setLabelSuccess(label, file.name);
      return data;
    },
  });
}

// ─── ZIP Dropzone ─────────────────────────────
function setupZipDropzone(zoneId, inputId, labelId) {
  setupDropzone({
    zoneId,
    inputId,
    labelId,
    accept: '.zip',
    onLoad: async (file, label) => {
      if (!file.name.toLowerCase().endsWith('.zip')) {
        throw new Error(t('toast.onlyZip'));
      }

      setLabelLoading(label, t('toast.readingZip'));

      const zip = await JSZip.loadAsync(file);
      let followersEntry = null;
      let followingEntry = null;

      zip.forEach((relativePath, entry) => {
        const name = entry.name.toLowerCase();
        if (name.endsWith('followers_1.json')) followersEntry = entry;
        if (name.endsWith('following.json'))   followingEntry = entry;
      });

      if (!followersEntry || !followingEntry) {
        throw new Error(t('toast.zipNotFound'));
      }

      state.zipFollowersData = JSON.parse(await followersEntry.async('string'));
      state.zipFollowingData = JSON.parse(await followingEntry.async('string'));

      setLabelSuccess(label, `${file.name} — Ready to analyze`);

      // Mark the label as file-loaded so translations don't override it
      if (label) label.dataset.fileLoaded = '1';
    },
  });
}

function setLabelSuccess(label, text) {
  if (!label) return;
  label.textContent = text;
  label.style.color = 'var(--success-text)';
}

function setLabelLoading(label, text) {
  if (!label) return;
  label.textContent = text;
  label.style.color = 'var(--text-secondary)';
}

function initDropzones() {
  setupZipDropzone('drop-zip', 'zipFile', 'name-zip');
  setupJsonDropzone('drop-followers', 'followersFile', 'name-followers', 'manualFollowersData');
  setupJsonDropzone('drop-following', 'followingFile', 'name-following', 'manualFollowingData');
}

// ─── Read JSON ────────────────────────────────
function readJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result));
      } catch {
        reject(new Error(`Invalid JSON format: ${file.name}`));
      }
    };
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsText(file);
  });
}

// ─── Extract Usernames ────────────────────────
function extractUsernames(data) {
  const usernames = new Set();
  const stack = [data];

  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== 'object') continue;

    if (Array.isArray(current)) {
      for (const item of current) stack.push(item);
      continue;
    }

    if (
      Array.isArray(current.string_list_data) &&
      current.string_list_data[0]?.value
    ) {
      const u = String(current.string_list_data[0].value).trim().toLowerCase();
      if (u) usernames.add(u);
    }

    if (
      typeof current.title === 'string' &&
      current.title.trim() &&
      !['Following', 'Followers'].includes(current.title)
    ) {
      usernames.add(current.title.trim().toLowerCase());
    }

    for (const key of Object.keys(current)) {
      stack.push(current[key]);
    }
  }

  return usernames;
}

// ─── Process Data ─────────────────────────────
async function processData() {
  const btn = document.getElementById('analyze-btn');

  let followersRaw;
  let followingRaw;

  if (state.zipFollowersData && state.zipFollowingData) {
    followersRaw = state.zipFollowersData;
    followingRaw = state.zipFollowingData;
  } else if (state.manualFollowersData && state.manualFollowingData) {
    followersRaw = state.manualFollowersData;
    followingRaw = state.manualFollowingData;
  } else {
    const f1 = document.getElementById('followersFile')?.files[0];
    const f2 = document.getElementById('followingFile')?.files[0];

    if (!f1 || !f2) {
      showToast(t('toast.noFile'), 'error');
      return;
    }

    try {
      followersRaw = await readJSON(f1);
      followingRaw = await readJSON(f2);
    } catch (err) {
      showToast(err.message, 'error');
      return;
    }
  }

  // Loading state
  btn.classList.add('loading');
  btn.innerHTML = `<i data-lucide="loader-2"></i> <span>${t('btn.analyzing')}</span>`;
  lucide.createIcons();

  await new Promise(r => setTimeout(r, 50));

  try {
    const followersSet = extractUsernames(followersRaw);
    const followingSet = extractUsernames(followingRaw);

    state.dataSets.notFollowingBack = [...followingSet].filter(u => !followersSet.has(u));
    state.dataSets.fans             = [...followersSet].filter(u => !followingSet.has(u));

    // Update stats
    document.getElementById('stat-followers').textContent = followersSet.size.toLocaleString();
    document.getElementById('stat-following').textContent = followingSet.size.toLocaleString();
    document.getElementById('stat-notback').textContent   = state.dataSets.notFollowingBack.length.toLocaleString();
    document.getElementById('stat-fans').textContent      = state.dataSets.fans.length.toLocaleString();

    // Update tab counts
    document.getElementById('count-notback').textContent = state.dataSets.notFollowingBack.length.toLocaleString();
    document.getElementById('count-fans').textContent    = state.dataSets.fans.length.toLocaleString();

    // Show result sections
    showSection('stats-area');
    showSection('results-area');

    // Hide import section; swap button visibility
    document.getElementById('import-section').classList.add('hidden');
    document.getElementById('analyze-btn').classList.add('hidden');
    document.getElementById('reset-wrapper').classList.remove('hidden');

    renderList();
    lucide.createIcons();

    document.getElementById('stats-area').scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    showToast(t('toast.error'), 'error');
    console.error(err);
  } finally {
    btn.classList.remove('loading');
    btn.innerHTML = `<i data-lucide="bar-chart-2"></i> <span data-i18n="btn.analyze">${t('btn.analyze')}</span>`;
    lucide.createIcons();
  }
}

function showSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('hidden');
  el.classList.add('fade-in');
}

// ─── Reset ────────────────────────────────────
function resetApp() {
  // Reset state
  state.dataSets = { notFollowingBack: [], fans: [] };
  state.currentTab = 'notFollowingBack';
  state.zipFollowersData = null;
  state.zipFollowingData = null;
  state.manualFollowersData = null;
  state.manualFollowingData = null;

  // Reset sections
  document.getElementById('stats-area').classList.add('hidden');
  document.getElementById('results-area').classList.add('hidden');
  document.getElementById('import-section').classList.remove('hidden');

  // Button visibility: show analyze, hide reset
  document.getElementById('analyze-btn').classList.remove('hidden');
  document.getElementById('reset-wrapper').classList.add('hidden');

  // Reset dropzones
  ['drop-zip', 'drop-followers', 'drop-following'].forEach(id => {
    document.getElementById(id)?.classList.remove('loaded', 'drag-over');
  });

  // Reset labels
  const nameZip = document.getElementById('name-zip');
  if (nameZip) {
    nameZip.innerHTML = t('import.quick.dropLabel');
    nameZip.style.color = '';
    delete nameZip.dataset.fileLoaded;
  }

  resetLabel('name-followers', 'Drop <code>followers_1.json</code> here');
  resetLabel('name-following', 'Drop <code>following.json</code> here');

  // Reset file inputs
  ['zipFile', 'followersFile', 'followingFile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Reset search
  const search = document.getElementById('searchInput');
  if (search) search.value = '';

  // Reset result tabs to default
  switchTab('notFollowingBack');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

function resetLabel(id, html) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = html;
  el.style.color = '';
}

// ─── Tab Switching ────────────────────────────
function switchImportTab(tab) {
  const isQuick = tab === 'quick';

  toggleEl('quick-import-panel', isQuick);
  toggleEl('manual-import-panel', !isQuick);

  setTabState('tab-quick-import', isQuick);
  setTabState('tab-manual-import', !isQuick);

  document.getElementById('tab-quick-import').setAttribute('aria-selected', String(isQuick));
  document.getElementById('tab-manual-import').setAttribute('aria-selected', String(!isQuick));
}

function switchTab(tab) {
  state.currentTab = tab;

  const isNotBack = tab === 'notFollowingBack';
  setTabState('tab-notback', isNotBack);
  setTabState('tab-fans', !isNotBack);

  document.getElementById('tab-notback').setAttribute('aria-selected', String(isNotBack));
  document.getElementById('tab-fans').setAttribute('aria-selected', String(!isNotBack));

  const search = document.getElementById('searchInput');
  if (search) search.value = '';

  renderList();
}

function setTabState(id, active) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('tab-active', active);
  el.classList.toggle('tab-inactive', !active);
}

function toggleEl(id, visible) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('hidden', !visible);
}

// ─── Render List ──────────────────────────────
function renderList() {
  const list = document.getElementById('activeList');
  if (!list) return;

  const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const data = state.dataSets[state.currentTab] || [];

  const filtered = searchTerm
    ? data.filter(u => u.includes(searchTerm))
    : data;

  list.innerHTML = '';

  if (filtered.length === 0) {
    const icon = searchTerm
      ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';

    const msg = searchTerm
      ? `${t('list.empty.search')} "${escapeHtml(searchTerm)}"`
      : t('list.empty.default');

    list.innerHTML = `<li class="list-empty">${icon}${msg}</li>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  filtered.forEach(user => {
    const li = document.createElement('li');
    li.className = 'user-item';

    const avatarChar = user.charAt(0).toUpperCase();
    const profileUrl = `https://instagram.com/${encodeURIComponent(user)}`;

    li.innerHTML = `
      <div class="user-item-left">
        <div class="user-avatar" aria-hidden="true">${escapeHtml(avatarChar)}</div>
        <span class="user-name">@${escapeHtml(user)}</span>
      </div>
      <a
        href="${profileUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="user-link"
        aria-label="View @${escapeHtml(user)} on Instagram"
        title="Open Instagram profile"
      >
        <i data-lucide="external-link"></i>
      </a>
    `;

    fragment.appendChild(li);
  });

  list.appendChild(fragment);
  lucide.createIcons();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Slideshow ────────────────────────────────
function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  state.totalSlides = slides.length;

  if (state.totalSlides === 0) return;

  const dotsContainer = document.getElementById('slideDots');
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `slide-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  goToSlide(0);

  document.addEventListener('keydown', (e) => {
    if (document.getElementById('imageModal')?.classList.contains('open')) return;
    if (e.key === 'ArrowRight') plusSlides(1);
    if (e.key === 'ArrowLeft')  plusSlides(-1);
  });
}

function plusSlides(n) {
  const next = (state.slideIndex + n + state.totalSlides) % state.totalSlides;
  goToSlide(next);
}

function goToSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slide-dot');

  if (slides.length === 0) return;

  slides.forEach((s, i) => {
    const active = i === n;
    s.classList.toggle('active-slide', active);
    s.style.display = active ? 'flex' : 'none';
  });

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === n);
    d.setAttribute('aria-selected', i === n ? 'true' : 'false');
  });

  state.slideIndex = n;
}

// ─── Modal ────────────────────────────────────
function openModal(el) {
  const img = el?.querySelector('img');
  if (!img) return;

  const modal    = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');

  modalImg.src = img.src;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === e.currentTarget || e.target.classList.contains('modal-inner')) {
    document.getElementById('imageModal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('imageModal')?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ─── Toast ────────────────────────────────────
function showToast(message, type = 'info') {
  document.querySelectorAll('.ia-toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `ia-toast ia-toast-${type}`;

  const colors = {
    error:   'var(--danger)',
    success: 'var(--success)',
    info:    'var(--accent)',
  };

  const icons = {
    error:   'alert-circle',
    success: 'check-circle',
    info:    'info',
  };

  const color = colors[type] || colors.info;
  const icon  = icons[type]  || icons.info;

  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-surface);
    color: var(--text-primary);
    border: 1px solid var(--border);
    border-left: 4px solid ${color};
    border-radius: 14px;
    padding: 14px 20px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 99999;
    box-shadow: var(--shadow-lg);
    max-width: min(460px, 90vw);
    animation: toastIn 0.35s cubic-bezier(.22,1,.36,1);
  `;

  toast.innerHTML = `<span style="color:${color};flex-shrink:0"><i data-lucide="${icon}" style="width:18px;height:18px;display:block"></i></span><span>${escapeHtml(message)}</span>`;
  document.body.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.25s ease forwards';

    setTimeout(() => {
      toast.remove();
    }, 250);
  }, 4750);
}

// ─── Tutorial FAB ─────────────────────────────
function initTutorialFab() {
  const fab = document.getElementById('tutorialFab');
  const tutorialSection = document.querySelector('section[aria-labelledby="tutorial-heading"]');

  if (!fab || !tutorialSection) return;

  fab.addEventListener('click', () => {
    tutorialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        fab.classList.toggle('hidden-fab', entry.isIntersecting);
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(tutorialSection);
}