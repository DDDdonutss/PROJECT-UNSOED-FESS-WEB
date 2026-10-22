/*
 * theme.js - Mode Gelap / Terang (JavaScript murni, tanpa jQuery).
 * - Mengatur atribut data-bs-theme="dark" | "light" pada <html> (dibaca Bootstrap 5.3 dan css/style.css).
 * - Pilihan pengguna disimpan di localStorage (kunci: unsoedFessTheme) sehingga tetap sama setelah refresh.
 * - Kunjungan pertama (belum pernah memilih) mengikuti pengaturan tema perangkat.
 * Dimuat di <head> agar tema langsung terpasang sebelum halaman digambar (tidak berkedip putih).
 * Dibungkus IIFE: tidak ada variabel global baru.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'unsoedFessTheme';
  var root = document.documentElement;
  var query = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function isTheme(value) {
    return value === 'dark' || value === 'light';
  }

  function readSaved() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return isTheme(value) ? value : null;
    } catch (err) {
      return null; // mis. mode privat: tema tetap jalan, hanya tidak tersimpan
    }
  }

  function save(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (err) { /* abaikan */ }
  }

  function currentTheme() {
    return root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
  }

  // Ikon = mode tujuan: bulan saat terang (klik -> gelap), matahari saat gelap (klik -> terang).
  function updateButton(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var dark = theme === 'dark';
    var icon = btn.querySelector('i');
    var label = dark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap';

    if (icon) {
      icon.classList.toggle('fa-sun', dark);
      icon.classList.toggle('fa-moon', !dark);
    }
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  function apply(theme) {
    root.setAttribute('data-bs-theme', theme);
    updateButton(theme);
  }

  // 1) Langsung pasang tema (dipanggil saat <head> dibaca)
  root.setAttribute('data-bs-theme', readSaved() || (query && query.matches ? 'dark' : 'light'));

  // 2) Setelah HTML siap: sambungkan tombol
  function init() {
    var btn = document.getElementById('theme-toggle');
    updateButton(currentTheme());

    if (btn) {
      btn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        apply(next);
        save(next);
      });
    }

    // Tab lain mengganti tema -> tab ini ikut berubah
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY && isTheme(e.newValue)) apply(e.newValue);
    });

    // Selama belum memilih manual, ikuti perubahan tema perangkat
    if (query) {
      var onSystemChange = function (e) {
        if (!readSaved()) apply(e.matches ? 'dark' : 'light');
      };
      if (query.addEventListener) query.addEventListener('change', onSystemChange);
      else if (query.addListener) query.addListener(onSystemChange);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
