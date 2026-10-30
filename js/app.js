/*

 * UNSOED FESS - logika fess (data disimpan di localStorage browser, tanpa backend/database).
 * Seluruh kode dibungkus IIFE: tidak ada variabel/fungsi global baru, jadi aman berdampingan dengan
 * jquery.min.js, bootstrap.min.js, aos.js, smoothscroll.js, dan custom.js.
 * Kunci penyimpanan sama dengan versi lama, jadi fess lama di browser tetap terbaca
 * (fess lama tanpa kategori tampil tanpa lencana kategori).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'unsoedFessPosts';
  var MAX_LENGTH = 500;
  var NEAR_LIMIT = 450;
  var ENABLE_RESET = true; // ubah ke false untuk menyembunyikan tombol Reset Semua Fess

  // Daftar kategori yang diizinkan. Label & ikon hanya diambil dari sini (bukan dari data pengguna).
  var CATEGORIES = {
    'aspirasi':    { label: 'Aspirasi',    icon: 'fa-bullhorn' },
    'lelucon':     { label: 'Lelucon',     icon: 'fa-face-laugh-beam' },
    'keluh-kesah': { label: 'Keluh Kesah', icon: 'fa-comment-dots' }
  };

  function isCategory(key) {
    return typeof key === 'string' && Object.prototype.hasOwnProperty.call(CATEGORIES, key);
  }

  /* ---------- penyimpanan ---------- */

  function loadPosts() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!Array.isArray(data)) return [];
      return data.filter(function (post) {
        return post && typeof post.text === 'string' && post.text.trim() !== '';
      });
    } catch (err) {
      return [];
    }
  }

  function savePosts(posts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      return true;
    } catch (err) {
      return false; // mis. mode privat / penyimpanan penuh
    }
  }

  /* ---------- tampilan ---------- */

  function isValidDate(iso) {
    return !isNaN(new Date(iso).getTime());
  }

  function formatTime(iso) {
    if (!isValidDate(iso)) return 'Waktu tidak diketahui';
    return new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function buildBadge(key) {
    var cat = CATEGORIES[key];
    var badge = document.createElement('span');
    badge.className = 'cat-badge';

    var icon = document.createElement('i');
    icon.className = 'fa-solid ' + cat.icon;
    icon.setAttribute('aria-hidden', 'true');

    badge.appendChild(icon);
    badge.appendChild(document.createTextNode(' ' + cat.label));
    return badge;
  }

  function buildCard(post) {
    var card = document.createElement('article');
    card.className = 'fess-card';

    if (isCategory(post.category)) card.appendChild(buildBadge(post.category));

    var p = document.createElement('p');
    p.textContent = post.text; // textContent mencegah HTML/script tersisip (XSS)

    var t = document.createElement('time');
    if (isValidDate(post.time)) t.dateTime = post.time;
    t.textContent = formatTime(post.time);

    card.appendChild(p);
    card.appendChild(t);
    return card;
  }

  function buildEmpty(text) {
    var p = document.createElement('p');
    p.className = 'empty-state';
    p.textContent = text;
    return p;
  }

  /* ---------- kotak fess + daftar fess ---------- */

  function initFessBox(form) {
    var input = document.getElementById('fess-text');
    var counter = document.getElementById('counter');
    var msg = document.getElementById('msg');
    var list = document.getElementById('fess-container');
    var resetBtn = document.getElementById('reset-btn');
    var countLabel = document.getElementById('fess-count');
    var picker = document.getElementById('cat-picker');
    var searchWrap = document.getElementById('fess-search');
    var searchInput = document.getElementById('fess-search-input');
    var searchEmpty = document.getElementById('search-empty');
    if (!input || !counter || !msg || !list) return;

    function selectedCategory() {
      var checked = form.querySelector('input[name="category"]:checked');
      return checked ? checked.value : '';
    }

    function clearCategory() {
      var checked = form.querySelector('input[name="category"]:checked');
      if (checked) checked.checked = false;
    }

    // kind: 'error' | 'ok' | undefined ; field: 'text' | 'category' | undefined
    function say(text, kind, field) {
      msg.textContent = text;
      msg.className = 'form-msg' + (kind ? ' is-' + kind : '');
      input.classList.toggle('has-error', kind === 'error' && field === 'text');
      if (picker) picker.classList.toggle('has-error', kind === 'error' && field === 'category');
    }

    function clearError() {
      if (msg.classList.contains('is-error')) say('');
    }

    function updateCounter() {
      var n = input.value.length;
      counter.textContent = n + '/' + MAX_LENGTH;
      counter.classList.toggle('is-near', n >= NEAR_LIMIT);
    }

    // Pencarian: cocokkan teks yang diketik dengan isi tiap kartu, sembunyikan yang tidak cocok.
    // Hanya memakai indexOf + textContent (tanpa innerHTML/RegExp), jadi aman dari injeksi HTML
    // dan karakter khusus seperti ( [ * tidak membuat error.
    function applySearch() {
      var cards = list.querySelectorAll('.fess-card');
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var shown = 0;

      Array.prototype.forEach.call(cards, function (card) {
        var body = card.querySelector('p');
        var match = query === '' || (body !== null && body.textContent.toLowerCase().indexOf(query) !== -1);
        card.hidden = !match;
        if (match) shown++;
      });

      if (countLabel && cards.length > 0) {
        countLabel.textContent = query ? shown + ' dari ' + cards.length + ' fess' : cards.length + ' fess';
      }
      if (searchEmpty) {
        var noMatch = query !== '' && cards.length > 0 && shown === 0;
        searchEmpty.hidden = !noMatch;
        searchEmpty.textContent = noMatch ? 'Tidak ada fess yang cocok dengan \u201C' + searchInput.value.trim() + '\u201D.' : '';
      }
    }

    function clearSearch() {
      if (searchInput) searchInput.value = '';
    }

    function render() {
      var posts = loadPosts();
      var frag = document.createDocumentFragment();

      list.textContent = '';
      if (resetBtn) resetBtn.hidden = !ENABLE_RESET || posts.length === 0;
      if (countLabel) countLabel.textContent = posts.length + ' fess';
      if (searchWrap) searchWrap.hidden = posts.length === 0;
      if (posts.length === 0) clearSearch();

      if (posts.length === 0) {
        frag.appendChild(buildEmpty('Belum ada fess. Tulis yang pertama lewat formulir.'));
      } else {
        posts.slice().reverse().forEach(function (post) {
          frag.appendChild(buildCard(post));
        });
      }
      list.appendChild(frag);
      applySearch(); // fess baru / tab lain berubah -> kata kunci yang sedang diketik tetap berlaku
    }

    input.addEventListener('input', function () {
      updateCounter();
      clearError();
    });

    // real-time: setiap ketikan langsung menyaring kartu
    if (searchInput) searchInput.addEventListener('input', applySearch);

    form.addEventListener('change', function (e) {
      if (e.target && e.target.name === 'category') clearError();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      var category = selectedCategory();

      if (!text) {
        say('Fess tidak boleh kosong. Tulis sesuatu dulu.', 'error', 'text');
        input.focus();
        return;
      }
      if (text.length > MAX_LENGTH) {
        say('Fess terlalu panjang. Maksimal ' + MAX_LENGTH + ' karakter.', 'error', 'text');
        input.focus();
        return;
      }
      if (!isCategory(category)) {
        say('Pilih kategori dulu: Aspirasi, Lelucon, atau Keluh Kesah.', 'error', 'category');
        var firstRadio = form.querySelector('input[name="category"]');
        if (firstRadio) firstRadio.focus();
        return;
      }

      var posts = loadPosts();
      posts.push({ id: Date.now(), text: text, category: category, time: new Date().toISOString() });
      if (!savePosts(posts)) {
        say('Fess gagal disimpan. Penyimpanan browser tidak tersedia atau penuh.', 'error');
        return;
      }

      input.value = '';
      clearCategory();
      updateCounter();
      clearSearch(); // agar fess yang baru dikirim tidak ikut tersembunyi oleh kata kunci lama
      say('Fess terkirim.', 'ok');
      render();
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (confirm('Hapus semua fess di browser ini? Tindakan ini tidak bisa dibatalkan.')) {
          try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* abaikan */ }
          say('Semua fess dihapus.', 'ok');
          render();
        }
      });
    }

    // Tombol "Tulis ..." di section Kategori: pilih kategori di form (scroll ditangani smoothscroll.js)
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest ? e.target.closest('[data-pick-category]') : null;
      if (!trigger) return;
      var key = trigger.getAttribute('data-pick-category');
      if (!isCategory(key)) return;
      var radio = document.getElementById('cat-' + key);
      if (radio) { radio.checked = true; clearError(); }
    });

    // Tab lain mengubah data -> tampilan ikut diperbarui
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY || e.key === null) render();
    });

    updateCounter();
    render(); // otomatis tampil saat index.html dimuat
  }

  /* ---------- mulai ---------- */

  function start() {
    var form = document.getElementById('fess-post-form');
    if (form) initFessBox(form);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
