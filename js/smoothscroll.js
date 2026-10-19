/*!
 * smoothscroll.js - scroll halus untuk tautan anchor di halaman yang sama (mis. href="#daftar-fess").
 * JavaScript murni (tanpa jQuery), tidak membuat variabel global. Memperhitungkan tinggi navbar sticky
 * dan menghormati preferensi "kurangi gerakan" milik pengguna.
 */
(function () {
  'use strict';

  function reduceMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function navHeight() {
    var nav = document.querySelector('.site-nav');
    return nav ? nav.offsetHeight : 0;
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
    var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight() - 12;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion() ? 'auto' : 'smooth' });

    if (window.history && window.history.pushState) window.history.pushState(null, '', url.hash);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
})();
