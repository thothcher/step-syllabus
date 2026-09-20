/* ==========================================================================
   deck.js — checkpoints rise out of the floor + the project slider
   ========================================================================== */
(function (APP) {
  'use strict';

  var U = APP.u;

  function smooth(t) { t = U.clamp(t, 0, 1); return t * t * (3 - 2 * t); }

  /* ------------------------------------------------------------ slider */
  function Slider(root) {
    this.root = root;
    this.view = U.qs('.sl__view', root);
    this.track = U.qs('.sl__track', root);
    this.slides = U.qsa('.pj', root);
    this.dots = U.qsa('.sl__dot', root);
    this.count = U.qs('.sl__count', root);
    this.btns = U.qsa('.sl__btn', root);
    this.i = 0;
    this.drag = null;
    this.bind();
    this.go(0, true);
  }

  Slider.prototype.go = function (i, instant) {
    this.i = (i + this.slides.length) % this.slides.length;
    if (instant) this.track.classList.add('is-drag');
    this.track.style.transform = 'translate3d(' + (-this.i * 100) + '%,0,0)';
    if (instant) { void this.track.offsetWidth; this.track.classList.remove('is-drag'); }
    var self = this;
    this.dots.forEach(function (d, di) { d.classList.toggle('is-on', di === self.i); });
    if (this.count) this.count.textContent = U.pad(this.i + 1) + ' / ' + U.pad(this.slides.length);
    this.slides.forEach(function (s, si) { s.setAttribute('aria-hidden', si === self.i ? 'false' : 'true'); });
  };

  Slider.prototype.bind = function () {
    var self = this;

    this.btns.forEach(function (b) {
      b.addEventListener('click', function () { self.go(self.i + parseInt(b.getAttribute('data-dir'), 10)); });
    });
    this.dots.forEach(function (d) {
      d.addEventListener('click', function () { self.go(parseInt(d.getAttribute('data-go'), 10)); });
    });

    /* pointer drag */
    this.view.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return;
      self.drag = { x: e.clientX, y: e.clientY, w: self.view.offsetWidth, moved: false, id: e.pointerId };
      self.track.classList.add('is-drag');
    });
    window.addEventListener('pointermove', function (e) {
      if (!self.drag || e.pointerId !== self.drag.id) return;
      var dx = e.clientX - self.drag.x;
      if (!self.drag.moved && Math.abs(dx) < Math.abs(e.clientY - self.drag.y)) { self.release(); return; }
      if (Math.abs(dx) > 4) self.drag.moved = true;
      var edge = (self.i === 0 && dx > 0) || (self.i === self.slides.length - 1 && dx < 0);
      var shift = dx / self.drag.w * 100 * (edge ? .32 : 1);
      self.track.style.transform = 'translate3d(' + (-self.i * 100 + shift) + '%,0,0)';
      self.last = dx;
    }, { passive: true });

    function up() {
      if (!self.drag) return;
      var dx = self.last || 0;
      self.lastMoved = self.drag.moved;
      self.track.classList.remove('is-drag');
      if (Math.abs(dx) > self.drag.w * .14) self.go(self.i + (dx < 0 ? 1 : -1));
      else self.go(self.i);
      self.drag = null; self.last = 0;
      setTimeout(function () { self.lastMoved = false; }, 0);
    }
    this.release = up;
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);

    this.view.addEventListener('click', function (e) {
      if (self.lastMoved) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  };

  /* -------------------------------------------------------- checkpoints */
  var decks = [];

  function Deck(section) {
    this.el = section;
    this.sticky = U.qs('.cp__sticky', section);
    this.panel = U.qs('.cp__panel', section);
    this.slider = new Slider(U.qs('[data-slider]', section));
    this.open = 0;
    this.bindTilt();
  }

  Deck.prototype.bindTilt = function () {
    if (APP.reduced || !APP.fine) return;
    var self = this;
    this.sticky.addEventListener('pointermove', function (e) {
      if (self.open < .85) return;
      var r = self.panel.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5;
      var y = (e.clientY - r.top) / r.height - .5;
      self.panel.style.setProperty('--tx', (x * 3.2).toFixed(2) + 'deg');
      self.panel.style.setProperty('--ty', (-y * 2.2).toFixed(2) + 'deg');
    }, { passive: true });
    this.sticky.addEventListener('pointerleave', function () {
      self.panel.style.setProperty('--tx', '0deg');
      self.panel.style.setProperty('--ty', '0deg');
    });
  };

  Deck.prototype.update = function (S) {
    var r = this.el.getBoundingClientRect();
    if (r.bottom < -80 || r.top > S.vh + 80) {
      if (this.open !== 0 && r.top > 0) { this.open = 0; this.sticky.style.setProperty('--open', 0); }
      return;
    }
    var range = this.el.offsetHeight - S.vh;
    var p = U.clamp(-r.top / (range || 1), 0, 1);
    var rise = smooth((p - .04) / .34);
    var fall = smooth((.99 - p) / .24);
    var open = Math.min(rise, fall);
    if (Math.abs(open - this.open) > .002) {
      this.open = open;
      this.sticky.style.setProperty('--open', open.toFixed(3));
    }
    this.active = p > .25 && p < .9;
  };

  APP.deck = {
    init: function () {
      decks = U.qsa('.cp').map(function (s) { return new Deck(s); });

      APP.onTick(function (dt, S) {
        for (var i = 0; i < decks.length; i++) decks[i].update(S);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        for (var i = 0; i < decks.length; i++) {
          if (decks[i].active) {
            decks[i].slider.go(decks[i].slider.i + (e.key === 'ArrowRight' ? 1 : -1));
            e.preventDefault();
            return;
          }
        }
      });
    }
  };

})(window.APP = window.APP || {});
