/*!
 * smoothscroll.js - scroll halus untuk menu & tombol anchor (#home, #about, #fess-form, ...), tanpa reload halaman.
 * JavaScript murni (tanpa jQuery), tidak membuat variabel global. Posisi berhenti memakai
 * scroll-margin-top milik elemen tujuan (diatur di style.css) sehingga tidak tertutup navbar
 * dan hasilnya sama dengan lompatan anchor bawaan browser. Menghormati "kurangi gerakan".
 */
(function () {
  'use strict';

  function reduceMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var link = e.target.closest ? e.target.closest('a[href*="#"]') : null;
    if (!link) return;

    var url;
    try { url = new URL(link.href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
    if (url.hash.length < 2) return;

    var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    e.preventDefault();
    var margin = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - margin;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion() ? 'auto' : 'smooth' });

    if (window.history && window.history.pushState) window.history.pushState(null, '', url.hash);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
})();
