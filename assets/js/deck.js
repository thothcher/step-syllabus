/* ==========================================================================
   deck.js — checkpoints rise out of the floor, then take off through the roof
             + the live-site slider
   ========================================================================== */
(function (APP) {
  'use strict';

  var U = APP.u;
  var FRAME_W = 1280;   /* the desktop width every embedded site renders at */
  var SLOW_MS = 9000;   /* after this, admit the embed is taking its time */

  function smooth(t) { t = U.clamp(t, 0, 1); return t * t * (3 - 2 * t); }

  /* ------------------------------------------------------------ slider */
  function Slider(root, onGo) {
    this.root = root;
    this.view = U.qs('.sl__view', root);
    this.track = U.qs('.sl__track', root);
    this.slides = U.qsa('.pj', root);
    this.dots = U.qsa('.sl__dot', root);
    this.count = U.qs('.sl__count', root);
    this.btns = U.qsa('.sl__btn', root);
    this.onGo = onGo || null;
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
    if (this.onGo) this.onGo(this.i);
  };

  Slider.prototype.bind = function () {
    var self = this;

    this.btns.forEach(function (b) {
      b.addEventListener('click', function () { self.go(self.i + parseInt(b.getAttribute('data-dir'), 10)); });
    });
    this.dots.forEach(function (d) {
      d.addEventListener('click', function () { self.go(parseInt(d.getAttribute('data-go'), 10)); });
    });

    /* pointer drag — the shield over each embed keeps this reachable */
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
    var self = this;
    this.el = section;
    this.sticky = U.qs('.cp__sticky', section);
    this.panel = U.qs('.cp__panel', section);
    this.frames = U.qsa('.pj__frame', section);
    this.open = 0;
    this.exit = 0;
    this.armed = false;
    this.slider = new Slider(U.qs('[data-slider]', section), function (i) { self.onSlide(i); });
    this.bindFrames();
    this.fit();
  }

  /* every embed renders at FRAME_W and is scaled down into the card, so the
     card shows the desktop layout of the site instead of its mobile one */
  Deck.prototype.fit = function () {
    this.frames.forEach(function (f) {
      var w = f.clientWidth;
      if (w > 0) f.style.setProperty('--fs', (w / FRAME_W).toFixed(4));
    });
  };

  Deck.prototype.load = function (i) {
    var f = this.frames[i];
    if (!f || f.getAttribute('data-state')) return;
    var fr = U.qs('.pj__if', f);
    var src = fr && fr.getAttribute('data-src');
    if (!src) return;

    f.setAttribute('data-state', 'loading');
    var slow = setTimeout(function () {
      if (f.getAttribute('data-state') === 'loading') f.setAttribute('data-state', 'slow');
    }, SLOW_MS);
    fr.addEventListener('load', function () {
      clearTimeout(slow);
      f.setAttribute('data-state', 'ready');
    });
    fr.src = src;
  };

  /* only one embed may take the pointer, and never one you slid away from */
  Deck.prototype.live = function (i) {
    this.frames.forEach(function (f, fi) {
      var on = fi === i;
      if (on === f.classList.contains('is-interactive')) return;
      f.classList.toggle('is-interactive', on);
      var b = U.qs('[data-live-toggle]', f);
      if (!b) return;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var label = U.qs('span', b);
      if (label) label.textContent = on ? 'Esc — გამოსვლა' : 'ინტერაქცია';
    });
  };

  Deck.prototype.onSlide = function (i) {
    if (!this.frames || !this.frames.length) return;
    this.live(-1);
    if (this.armed) this.load(i);
  };

  Deck.prototype.bindFrames = function () {
    var self = this;
    this.frames.forEach(function (f, i) {
      var b = U.qs('[data-live-toggle]', f);
      if (b) {
        b.addEventListener('click', function (e) {
          e.preventDefault();
          self.live(f.classList.contains('is-interactive') ? -1 : i);
        });
      }
      /* while the embed holds the pointer, a click aimed back at the toggle
         lands inside the embedded site — so leaving the card is the exit */
      f.addEventListener('pointerleave', function () {
        if (f.classList.contains('is-interactive')) self.live(-1);
      });
    });
  };

  /* the panel used to tilt a degree or two towards the pointer. Under the
     perspective ancestor that tilt made the browser route clicks past the
     slider buttons — you could see the arrow under the cursor and nothing
     happened, while the keyboard (which skips hit-testing) still worked.
     The scroll-driven rise and take-off keep the 3D; the pointer no longer
     touches the transform. */

  Deck.prototype.set = function (k, v) {
    if (Math.abs(v - this[k]) <= .002) return false;
    this[k] = v;
    this.sticky.style.setProperty('--' + k, v.toFixed(3));
    return true;
  };

  Deck.prototype.update = function (S) {
    var r = this.el.getBoundingClientRect();
    if (r.bottom < -80 || r.top > S.vh + 80) {
      /* below the viewport again → park it back under the floor */
      if (r.top > 0 && (this.open !== 0 || this.exit !== 0)) {
        this.set('open', 0); this.set('exit', 0); this.live(-1);
      }
      this.active = false;
      return;
    }
    var range = this.el.offsetHeight - S.vh;
    var p = U.clamp(-r.top / (range || 1), 0, 1);

    /* p .04 → .38  rises out of the floor
       p .38 → .74  holds — this is where you read it and use the embed
       p .74 → 1    takes off through the roof */
    this.set('open', smooth((p - .04) / .34));
    var exit = smooth((p - .74) / .26);
    if (this.set('exit', exit) && exit > .05) this.live(-1);

    this.active = this.open > .55 && this.exit < .25;

    if (!this.armed && this.open > .9) {
      this.armed = true;
      this.fit();
      this.load(this.slider.i);
    }
  };

  APP.deck = {
    init: function () {
      decks = U.qsa('.cp').map(function (s) { return new Deck(s); });

      APP.onTick(function (dt, S) {
        for (var i = 0; i < decks.length; i++) decks[i].update(S);
      });

      APP.onResize(function () {
        for (var i = 0; i < decks.length; i++) decks[i].fit();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          for (var d = 0; d < decks.length; d++) decks[d].live(-1);
          return;
        }
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
