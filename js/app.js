/*
 * UNSOED FESS - logika fess (data disimpan di localStorage browser, tanpa backend/database).
 * Seluruh kode dibungkus IIFE: tidak ada variabel global baru, jadi aman berdampingan dengan
 * jquery.min.js, bootstrap.min.js, aos.js, smoothscroll.js, dan custom.js.
 * Kunci penyimpanan sama dengan versi lama, jadi fess lama di browser tetap terbaca.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'unsoedFessPosts';
  var MAX_LENGTH = 500;
  var NEAR_LIMIT = 450;
  var PREVIEW_COUNT = 3;
  var ENABLE_RESET = true; // ubah ke false untuk menyembunyikan tombol Reset Semua

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

  function buildCard(post) {
    var card = document.createElement('article');
    card.className = 'fess-card';

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

  /* ---------- halaman fess.html ---------- */

  function initFessPage(form) {
    var input = document.getElementById('fess-text');
    var counter = document.getElementById('counter');
    var msg = document.getElementById('msg');
    var list = document.getElementById('fess-container');
    var resetBtn = document.getElementById('reset-btn');
    var countLabel = document.getElementById('fess-count');
    if (!input || !counter || !msg || !list) return;

    function say(text, kind) {
      msg.textContent = text;
      msg.className = 'form-msg' + (kind ? ' is-' + kind : '');
      input.classList.toggle('has-error', kind === 'error');
    }

    function updateCounter() {
      var n = input.value.length;
      counter.textContent = n + '/' + MAX_LENGTH;
      counter.classList.toggle('is-near', n >= NEAR_LIMIT);
    }

    function render() {
      var posts = loadPosts();
      var frag = document.createDocumentFragment();

      list.textContent = '';
      if (resetBtn) resetBtn.hidden = !ENABLE_RESET || posts.length === 0;
      if (countLabel) countLabel.textContent = posts.length + ' fess';

      if (posts.length === 0) {
        frag.appendChild(buildEmpty('Belum ada fess. Tulis yang pertama lewat formulir.'));
      } else {
        posts.slice().reverse().forEach(function (post) {
          frag.appendChild(buildCard(post));
        });
      }
      list.appendChild(frag);
    }

    input.addEventListener('input', function () {
      updateCounter();
      if (msg.classList.contains('is-error')) say('');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();

      if (!text) {
        say('Fess tidak boleh kosong. Tulis sesuatu dulu.', 'error');
        input.focus();
        return;
      }
      if (text.length > MAX_LENGTH) {
        say('Fess terlalu panjang. Maksimal ' + MAX_LENGTH + ' karakter.', 'error');
        input.focus();
        return;
      }

      var posts = loadPosts();
      posts.push({ id: Date.now(), text: text, time: new Date().toISOString() });
      if (!savePosts(posts)) {
        say('Fess gagal disimpan. Penyimpanan browser tidak tersedia atau penuh.', 'error');
        return;
      }

      input.value = '';
      updateCounter();
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

    // Tab lain mengubah data -> tampilan ikut diperbarui
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY || e.key === null) render();
    });

    updateCounter();
    render(); // otomatis tampil saat halaman dimuat
  }

  /* ---------- cuplikan di index.html ---------- */

  function initHomePreview(box) {
    var note = document.getElementById('terbaru-note');
    var posts = loadPosts();
    if (posts.length === 0) return; // biarkan kartu contoh statis dari HTML

    var frag = document.createDocumentFragment();
    posts.slice(-PREVIEW_COUNT).reverse().forEach(function (post) {
      frag.appendChild(buildCard(post));
    });
    box.textContent = '';
    box.appendChild(frag);
    if (note) note.textContent = 'Tiga fess terbaru yang tersimpan di browser ini.';
  }

  /* ---------- mulai ---------- */

  function start() {
    var form = document.getElementById('fess-form');
    if (form) initFessPage(form);

    var preview = document.getElementById('fess-terbaru');
    if (preview) initHomePreview(preview);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
