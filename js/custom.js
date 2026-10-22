/*
 * custom.js - interaksi tampilan: animasi AOS, bayangan navbar saat scroll, menu aktif (scrollspy),
 * dan menutup menu mobile. Memakai jQuery di dalam scope sendiri (tidak ada global baru).
 * Logika fess + localStorage ada di js/app.js; scroll halus ada di js/smoothscroll.js.
 */
(function ($) {
  'use strict';

  $(function () {
    // Animate On Scroll
    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true, offset: 60 });
    }

    var $nav = $('.site-nav');
    var $links = $('#mainNav .nav-link');
    var sections = $links.map(function () {
      var id = (this.getAttribute('href') || '').replace('#', '');
      return id ? document.getElementById(id) : null;
    }).get();
    var ticking = false;

    function navOffset() {
      return ($nav.outerHeight() || 0) + 40;
    }

    // Tandai menu sesuai section yang sedang dilihat
    function update() {
      ticking = false;
      var y = $(window).scrollTop();
      $nav.toggleClass('is-scrolled', y > 40);

      var current = null;
      var line = y + navOffset();
      for (var i = 0; i < sections.length; i++) {
        if (sections[i] && sections[i].offsetTop <= line) current = sections[i];
      }
      var atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) current = sections[sections.length - 1];

      $links.each(function () {
        var active = !!current && this.getAttribute('href') === '#' + current.id;
        $(this).toggleClass('active', active);
        if (active) this.setAttribute('aria-current', 'location');
        else this.removeAttribute('aria-current');
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    $(window).on('scroll resize', onScroll);
    update();

    // Tutup menu mobile setelah salah satu tautan diklik
    $('#mainNav .nav-link').on('click', function () {
      var menu = document.getElementById('mainNav');
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})(window.jQuery);
