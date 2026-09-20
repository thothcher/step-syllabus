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
    APP.typer.init();
    APP.measure();

    APP.boot(function () {
      document.body.classList.add('is-live');
      APP.typer.start();
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
