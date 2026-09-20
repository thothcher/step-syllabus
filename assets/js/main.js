/* ==========================================================================
   main.js — wiring
   ========================================================================== */
(function (APP) {
  'use strict';

  var U = APP.u;

  function start() {
    APP.theme.init();
    APP.cursor.init();
    APP.render();
    APP.reveal.init();
    APP.parallax.init();
    APP.hero3d.init();
    APP.deck.init();
    APP.trail.init();
    APP.measure();

    /* highlight the last two words of the hero title with the brand gradient */
    var h1 = U.qs('.hero__title');
    if (h1) {
      var words = U.qsa('.split__w', h1);
      words.slice(-1).forEach(function (w) { w.classList.add('grad'); });
    }

    APP.boot(function () {
      document.body.classList.add('is-live');
      /* fonts change metrics → re-measure the graph once they land */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          APP.measure();
          APP.trail.rebuild();
          APP.parallax.refresh();
        });
      }
    });

    window.addEventListener('load', function () {
      setTimeout(function () {
        APP.measure();
        APP.trail.rebuild();
        APP.parallax.refresh();
      }, 120);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

})(window.APP = window.APP || {});
