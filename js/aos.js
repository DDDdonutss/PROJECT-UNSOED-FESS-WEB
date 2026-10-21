/*!
 * aos.js - versi ringan, kompatibel dengan API & atribut AOS (Animate On Scroll).
 * Subset yang didukung:
 *   atribut : data-aos, data-aos-delay, data-aos-duration, data-aos-once
 *   metode  : AOS.init(opsi), AOS.refresh(), AOS.refreshHard()
 *   opsi    : duration, delay, once, offset
 * Ingin AOS resmi? Ganti file ini dan css/aos.css dengan AOS 2.3.4 (nama file sama, tanpa ubah HTML).
 */
(function (root) {
  'use strict';

  var defaults = { duration: 700, delay: 0, once: true, offset: 60 };
  var options = {};
  var observer = null;

  function merge(base, extra) {
    var out = {}, k;
    for (k in base) out[k] = base[k];
    for (k in (extra || {})) out[k] = extra[k];
    return out;
  }

  function toInt(value, fallback) {
    var n = parseInt(value, 10);
    return isNaN(n) ? fallback : n;
  }

  function reduceMotion() {
    return !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function reveal(el) { el.classList.add('aos-animate'); }

  function onIntersect(entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      var once = el.hasAttribute('data-aos-once')
        ? el.getAttribute('data-aos-once') !== 'false'
        : options.once;
      if (entry.isIntersecting) {
        reveal(el);
        if (once && observer) observer.unobserve(el);
      } else if (!once && entry.boundingClientRect.top > 0) {
        el.classList.remove('aos-animate'); // keluar lewat bawah layar -> bisa animasi lagi
      }
    });
  }

  function prepare(el) {
    if (el.classList.contains('aos-init')) return;
    el.style.transitionDuration = toInt(el.getAttribute('data-aos-duration'), options.duration) + 'ms';
    el.style.transitionDelay = toInt(el.getAttribute('data-aos-delay'), options.delay) + 'ms';
    el.classList.add('aos-init');
    void el.offsetWidth; // paksa reflow supaya transisi pertama berjalan
    if (observer) observer.observe(el);
  }

  function scan() {
    var nodes = document.querySelectorAll('[data-aos]');
    for (var i = 0; i < nodes.length; i++) {
      if (!observer) { reveal(nodes[i]); continue; }
      prepare(nodes[i]);
    }
  }

  var AOS = {
    init: function (userOptions) {
      options = merge(defaults, userOptions);
      if (observer) { observer.disconnect(); observer = null; }
      if (!reduceMotion() && 'IntersectionObserver' in root) {
        observer = new IntersectionObserver(onIntersect, {
          rootMargin: '0px 0px -' + Math.max(0, options.offset) + 'px 0px',
          threshold: 0
        });
      }
      scan();
    },
    refresh: function () { scan(); },
    refreshHard: function () { scan(); }
  };

  root.AOS = AOS;
})(window);
