/*
 * custom.js - interaksi tampilan (navbar, animasi). Memakai jQuery di dalam scope sendiri.
 * Logika fess + localStorage ada di js/app.js (dipisah agar tidak saling bentrok).
 */
(function ($) {
  'use strict';

  $(function () {
    // Animate On Scroll
    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true, offset: 60 });
    }

    // Navbar sticky: tambah bayangan & rapatkan saat halaman di-scroll
    var $nav = $('.site-nav');
    function onScroll() {
      $nav.toggleClass('is-scrolled', $(window).scrollTop() > 40);
    }
    $(window).on('scroll', onScroll);
    onScroll();

    // Tutup menu mobile setelah salah satu tautan diklik
    $('#mainNav .nav-link').on('click', function () {
      var menu = document.getElementById('mainNav');
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})(window.jQuery);
