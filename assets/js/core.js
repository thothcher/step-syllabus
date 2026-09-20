/* ==========================================================================
   core.js — engine: ticker, scroll store, cursor, theme, reveal, parallax
   ========================================================================== */
(function (APP) {
  'use strict';

  /* ------------------------------------------------------------- utils */
  var U = APP.u = {
    qs: function (s, c) { return (c || document).querySelector(s); },
    qsa: function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); },
    clamp: function (v, a, b) { return v < a ? a : v > b ? b : v; },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    round: function (v, p) { var m = Math.pow(10, p || 2); return Math.round(v * m) / m; },
    ease: function (t) { return 1 - Math.pow(1 - t, 3); },
    el: function (tag, cls, html) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (html != null) n.innerHTML = html;
      return n;
    },
    svg: function (tag, attrs) {
      var n = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
      return n;
    },
    esc: function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    },
    pad: function (n) { return (n < 10 ? '0' : '') + n; }
  };

  APP.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  APP.fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ------------------------------------------------------ scroll store */
  var S = APP.S = { y: 0, vh: window.innerHeight, vw: window.innerWidth, dir: 1, docH: 0 };

  var tickFns = [], resizeFns = [];
  APP.onTick = function (fn) { tickFns.push(fn); };
  APP.onResize = function (fn) { resizeFns.push(fn); };

  function measure() {
    S.vh = window.innerHeight;
    S.vw = window.innerWidth;
    S.docH = document.documentElement.scrollHeight;
    for (var i = 0; i < resizeFns.length; i++) resizeFns[i](S);
  }
  APP.measure = measure;

  var lastY = 0, rt;
  window.addEventListener('scroll', function () {
    S.y = window.scrollY || window.pageYOffset;
    S.dir = S.y > lastY ? 1 : -1;
    lastY = S.y;
    document.body.classList.toggle('is-scrolled', S.y > 40);
  }, { passive: true });

  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(measure, 140);
  });

  var last = performance.now();
  function frame(now) {
    var dt = Math.min(64, now - last); last = now;
    for (var i = 0; i < tickFns.length; i++) tickFns[i](dt, S);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ------------------------------------------------------------- theme */
  APP.theme = (function () {
    var root = document.documentElement, KEY = 'itstep-roadmap-theme';
    function read() {
      try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }
    function write(v) {
      try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ }
    }
    function set(v) {
      root.setAttribute('data-theme', v);
      write(v);
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute('content', v === 'light' ? '#EFF2F9' : '#04060E');
      document.dispatchEvent(new CustomEvent('themechange', { detail: v }));
    }
    function toggle() { set(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'); }
    function init() {
      var saved = read();
      if (saved) root.setAttribute('data-theme', saved);
      var btn = U.qs('#themeBtn');
      if (btn) btn.addEventListener('click', toggle);
      document.addEventListener('keydown', function (e) {
        if (e.key === 't' || e.key === 'T') {
          var tag = (e.target.tagName || '').toLowerCase();
          if (tag !== 'input' && tag !== 'textarea') toggle();
        }
      });
    }
    return { init: init, set: set, toggle: toggle };
  })();

  /* ------------------------------------------------------------ cursor */
  APP.cursor = (function () {
    var root, dot, ring, label, span;
    var mx = -200, my = -200, dx = -200, dy = -200, rx = -200, ry = -200, on = false;

    function init() {
      if (!APP.fine) return;
      root = U.qs('.cursor');
      if (!root) return;
      dot = U.qs('.cursor__dot', root);
      ring = U.qs('.cursor__ring', root);
      label = U.qs('.cursor__label', root);
      span = U.qs('span', label);
      document.body.classList.add('has-cursor');
      on = true;

      window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        root.classList.remove('is-hide');
      }, { passive: true });
      document.addEventListener('mouseleave', function () { root.classList.add('is-hide'); });

      document.addEventListener('mouseover', function (e) {
        var hot = e.target.closest('a,button,[data-cursor],.tp,.rail__i,.mod__card,input');
        if (!hot) { root.classList.remove('is-hot', 'is-label'); return; }
        root.classList.add('is-hot');
        var l = hot.getAttribute('data-cursor');
        var txt = l === 'go' ? 'ENTER' : l === 'drag' ? 'DRAG' : l === 'link' ? '' : '';
        if (hot.hasAttribute('data-cursor-label')) txt = hot.getAttribute('data-cursor-label');
        if (txt) { span.textContent = txt; root.classList.add('is-label'); }
        else root.classList.remove('is-label');
      });

      APP.onTick(function () {
        dx = U.lerp(dx, mx, .34); dy = U.lerp(dy, my, .34);
        rx = U.lerp(rx, mx, .16); ry = U.lerp(ry, my, .16);
        dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
        ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
        label.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      });
    }
    return { init: init, active: function () { return on; } };
  })();

  /* ------------------------------------------------------ split text */
  APP.split = function (node) {
    if (!node || node.dataset.splitDone) return;
    node.dataset.splitDone = '1';
    var words = node.textContent.trim().split(/\s+/);
    node.textContent = '';
    var i = 0;
    words.forEach(function (w, wi) {
      var wrap = U.el('span', 'split__w');
      var chars = Array.from(w);
      chars.forEach(function (c) {
        var s = U.el('span', 'split__c');
        s.textContent = c;
        s.style.setProperty('--d', (i * 26) + 'ms');
        i++;
        wrap.appendChild(s);
      });
      node.appendChild(wrap);
      if (wi < words.length - 1) node.appendChild(document.createTextNode(' '));
    });
    node.classList.add('split');
  };

  /* ---------------------------------------------------------- reveal */
  APP.reveal = (function () {
    var io;
    function count(node) {
      var target = parseFloat(node.getAttribute('data-count')) || 0;
      var t0 = performance.now(), dur = 1500;
      (function step(now) {
        var p = U.clamp((now - t0) / dur, 0, 1);
        node.textContent = Math.round(target * U.ease(p));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }
    function init() {
      U.qsa('[data-split]').forEach(APP.split);
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var n = en.target;
          var d = n.getAttribute('data-rv-delay');
          if (d) n.style.setProperty('--rv-d', d + 'ms');
          n.classList.add('rv-in');
          U.qsa('[data-count]', n).concat(n.hasAttribute('data-count') ? [n] : [])
            .forEach(function (c) { if (!c.dataset.counted) { c.dataset.counted = '1'; count(c); } });
          io.unobserve(n);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: .12 });

      APP.observe = function (node) { io.observe(node); };
      U.qsa('[data-rv],.split,[data-count]').forEach(function (n) { io.observe(n); });
    }
    return { init: init };
  })();

  /* --------------------------------------------------------- parallax */
  APP.parallax = (function () {
    var items = [];
    function collect() {
      items = U.qsa('[data-par]').map(function (n) {
        return { n: n, f: parseFloat(n.getAttribute('data-par')) || .08, cur: 0, top: 0, h: 0 };
      });
      layout();
    }
    function layout() {
      items.forEach(function (it) {
        var r = it.n.getBoundingClientRect();
        it.top = r.top + (window.scrollY || 0);
        it.h = r.height;
      });
    }
    function init() {
      if (APP.reduced) return;
      collect();
      APP.onResize(layout);
      APP.onTick(function () {
        var mid = S.y + S.vh / 2;
        for (var i = 0; i < items.length; i++) {
          var it = items[i];
          var c = it.top + it.h / 2;
          if (Math.abs(c - mid) > S.vh * 1.4) continue;
          var target = (c - mid) * -it.f;
          it.cur = U.lerp(it.cur, target, .12);
          it.n.style.transform = 'translate3d(0,' + U.round(it.cur, 2) + 'px,0)';
        }
      });
    }
    return { init: init, refresh: collect };
  })();

  /* ------------------------------------------------------------- boot */
  APP.boot = function (done) {
    var bar = U.qs('#bootBar'), pct = U.qs('#bootPct');
    var v = 0, t0 = performance.now(), dur = APP.reduced ? 200 : 1150;
    (function step(now) {
      var p = U.clamp((now - t0) / dur, 0, 1);
      v = U.ease(p) * 100;
      if (bar) bar.style.width = v.toFixed(1) + '%';
      if (pct) pct.textContent = U.pad(Math.round(v));
      if (p < 1) requestAnimationFrame(step);
      else setTimeout(function () {
        document.body.classList.remove('is-booting');
        document.body.classList.add('is-ready');
        done && done();
      }, 160);
    })(t0);
  };

})(window.APP = window.APP || {});
