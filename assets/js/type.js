/* ==========================================================================
   type.js — the hero title writes itself, like text landing on a monitor
   per line: characters settle one by one while the next few keep scrambling
   ========================================================================== */
(function (APP) {
  'use strict';

  var U = APP.u;

  var GLYPHS = '#$%&*+-/<>=[]{}_|01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var CHAR_MS = 42;     /* time per settled character */
  var LINE_MS = 240;    /* pause at the end of a line   */
  var TAIL = 3;         /* how many unsettled glyphs run ahead of the caret */
  var SCRAMBLE_MS = 55; /* how often the tail re-rolls  */

  function glyph() { return GLYPHS.charAt((Math.random() * GLYPHS.length) | 0); }

  function Typer(root) {
    var self = this;
    this.root = root;
    this.host = root.closest('.hero__title') || root;
    this.caret = U.el('i', 'tw__caret');
    this.lines = U.qsa('.tw__l', root).map(function (el) {
      var text = el.textContent;
      el.textContent = '';
      var t = U.el('span', 'tw__t');
      var s = U.el('span', 'tw__s');
      el.appendChild(t);
      el.appendChild(s);
      return { el: el, t: t, s: s, text: Array.from(text) };
    });
    this.li = 0;      /* current line            */
    this.n = 0;       /* settled chars in line   */
    this.acc = 0;     /* time accumulator        */
    this.scr = 0;     /* scramble accumulator    */
    this.pause = 0;
    this.done = false;
    if (!this.lines.length) this.done = true;
    void self;
  }

  Typer.prototype.fill = function () {
    this.lines.forEach(function (l) {
      l.t.textContent = l.text.join('');
      l.s.textContent = '';
    });
    this.finish();
  };

  Typer.prototype.finish = function () {
    this.done = true;
    if (this.caret.parentNode) this.caret.parentNode.removeChild(this.caret);
    var last = this.lines[this.lines.length - 1];
    if (last) last.el.appendChild(this.caret);
    this.host.classList.remove('is-typing');
    this.host.classList.add('is-typed');
  };

  Typer.prototype.tick = function (dt) {
    if (this.done) return;
    var line = this.lines[this.li];

    if (this.pause > 0) {
      this.pause -= dt;
      return;
    }

    /* the unsettled tail keeps flickering while we wait for the next char */
    this.scr += dt;
    if (this.scr >= SCRAMBLE_MS) {
      this.scr = 0;
      var left = line.text.length - this.n;
      var len = Math.min(TAIL, left);
      var out = '';
      for (var i = 0; i < len; i++) out += glyph();
      line.s.textContent = out;
    }

    this.acc += dt;
    while (this.acc >= CHAR_MS) {
      this.acc -= CHAR_MS;
      this.n++;
      line.t.textContent = line.text.slice(0, this.n).join('');

      if (this.n >= line.text.length) {
        line.s.textContent = '';
        this.li++;
        this.n = 0;
        if (this.li >= this.lines.length) { this.finish(); return; }
        this.lines[this.li].el.appendChild(this.caret);
        this.pause = LINE_MS;
        return;
      }
    }
  };

  APP.typer = {
    init: function () {
      var root = U.qs('[data-tw]');
      if (!root) return;
      this.t = new Typer(root);
    },
    start: function () {
      var t = this.t;
      if (!t) return;
      if (APP.reduced) { t.fill(); return; }
      t.host.classList.add('is-typing');
      t.lines[0].el.appendChild(t.caret);
      APP.onTick(function (dt) { t.tick(dt); });
    }
  };

})(window.APP = window.APP || {});
