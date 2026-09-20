/* ==========================================================================
   hero3d.js — dependency-free 3D renderer: a growing node tree in the hero
   perspective projection + depth sorting + energy particles on branches
   ========================================================================== */
(function (APP) {
  'use strict';

  var U = APP.u;

  function rand(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  function Hero3D(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.segs = [];
    this.nodes = [];
    this.paths = [];
    this.parts = [];
    this.rotY = 0;
    this.tiltX = 0; this.tiltY = 0;
    this.px = 0; this.py = 0;
    this.t = 0;
    this.build();
    this.resize();
    this.bind();
  }

  /* ---------------------------------------------------------- geometry */
  Hero3D.prototype.build = function () {
    var self = this, R = rand(20260920), segs = [], nodes = [], paths = [];

    function rot(v, ax, ay) {
      var cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      var y = v.y * cx - v.z * sx, z = v.y * sx + v.z * cx;
      var x = v.x * cy + z * sy; z = -v.x * sy + z * cy;
      return { x: x, y: y, z: z };
    }

    function grow(p, dir, len, depth, trail) {
      var b = { x: p.x + dir.x * len, y: p.y + dir.y * len, z: p.z + dir.z * len };
      var seg = { a: p, b: b, d: depth, w: Math.max(.6, depth * .9) };
      segs.push(seg);
      nodes.push({ p: b, d: depth, r: Math.max(1.1, depth * 1.05) });
      var path = trail.concat([seg]);

      if (depth <= 0) { paths.push(path); return; }
      var kids = depth > 2 ? 2 : (R() > .42 ? 3 : 2);
      for (var i = 0; i < kids; i++) {
        var spread = .52 + R() * .46;
        var around = (i / kids) * Math.PI * 2 + R() * 1.8;
        var nd = rot(dir, spread * (.55 + R() * .8), around);
        var m = Math.sqrt(nd.x * nd.x + nd.y * nd.y + nd.z * nd.z) || 1;
        nd = { x: nd.x / m, y: nd.y / m, z: nd.z / m };
        grow(b, nd, len * (.66 + R() * .12), depth - 1, path);
      }
    }

    var root = { x: 0, y: -1.45, z: 0 };
    nodes.push({ p: root, d: 4, r: 3.4 });
    grow(root, { x: 0, y: 1, z: 0 }, .95, 4, []);

    this.segs = segs; this.nodes = nodes; this.paths = paths;

    /* energy particles travelling root → leaf */
    var count = window.innerWidth < 760 ? 9 : 20;
    for (var i = 0; i < count; i++) {
      this.parts.push({
        path: paths[Math.floor(R() * paths.length)] || paths[0],
        t: R(),
        sp: .00016 + R() * .00026
      });
    }
    this.R = R;
  };

  /* ------------------------------------------------------------ canvas */
  Hero3D.prototype.resize = function () {
    var r = this.c.getBoundingClientRect();
    this.w = r.width; this.h = r.height;
    this.c.width = Math.round(r.width * this.dpr);
    this.c.height = Math.round(r.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.scale = Math.min(this.w, this.h) * (this.w < 760 ? .40 : .46);
    this.cx = this.w * (this.w < 980 ? .5 : .68);
    this.cy = this.h * .52;
  };

  Hero3D.prototype.bind = function () {
    var self = this;
    APP.onResize(function () { self.resize(); });
    window.addEventListener('mousemove', function (e) {
      self.px = (e.clientX / window.innerWidth - .5) * 2;
      self.py = (e.clientY / window.innerHeight - .5) * 2;
    }, { passive: true });
    document.addEventListener('themechange', function () { self.readColors(); });
    this.readColors();
  };

  Hero3D.prototype.readColors = function () {
    var cs = getComputedStyle(document.documentElement);
    this.cHi = (cs.getPropertyValue('--brand-hi') || '#3E7BFF').trim();
    this.cMid = (cs.getPropertyValue('--brand-mid') || '#1B44CE').trim();
    this.cGlow = (cs.getPropertyValue('--brand-glow') || '#8FB8FF').trim();
    this.light = document.documentElement.getAttribute('data-theme') === 'light';
  };

  /* ---------------------------------------------------------- projection */
  Hero3D.prototype.project = function (p) {
    var cy = Math.cos(this.rotY), sy = Math.sin(this.rotY);
    var x = p.x * cy + p.z * sy;
    var z = -p.x * sy + p.z * cy;
    var y = p.y;

    var cx2 = Math.cos(this.tiltX), sx2 = Math.sin(this.tiltX);
    var y2 = y * cx2 - z * sx2;
    var z2 = y * sx2 + z * cx2;

    var camZ = 3.35;
    var f = 2.25 / (z2 + camZ);
    return {
      x: this.cx + x * f * this.scale,
      y: this.cy - y2 * f * this.scale,
      z: z2,
      f: f
    };
  };

  Hero3D.prototype.hex = function (hex, a) {
    var h = (hex || '#3E7BFF').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  };

  /* -------------------------------------------------------------- draw */
  Hero3D.prototype.frame = function (dt) {
    var ctx = this.ctx;
    if (!this.w) return;
    ctx.clearRect(0, 0, this.w, this.h);

    this.t += dt;
    if (!APP.reduced) this.rotY += dt * .00013;
    this.tiltX = U.lerp(this.tiltX, -this.py * .28 + .1, .04);

    var i, n, p, drawn = [];

    /* project + depth sort */
    for (i = 0; i < this.segs.length; i++) {
      var s = this.segs[i];
      var a = this.project(s.a), b = this.project(s.b);
      drawn.push({ a: a, b: b, d: s.d, z: (a.z + b.z) * .5 });
    }
    drawn.sort(function (x, y) { return x.z - y.z; });

    ctx.lineCap = 'round';
    for (i = 0; i < drawn.length; i++) {
      var g = drawn[i];
      var depthA = U.clamp((g.z + 1.8) / 3.4, 0, 1);      /* 0 far → 1 near */
      var alpha = (.10 + depthA * .55) * (this.light ? .85 : 1);
      ctx.strokeStyle = this.hex(depthA > .55 ? this.cHi : this.cMid, alpha);
      ctx.lineWidth = (.5 + g.d * .55) * (.55 + depthA * .85);
      ctx.beginPath();
      ctx.moveTo(g.a.x, g.a.y);
      ctx.lineTo(g.b.x, g.b.y);
      ctx.stroke();
    }

    /* nodes */
    for (i = 0; i < this.nodes.length; i++) {
      n = this.nodes[i];
      p = this.project(n.p);
      var dz = U.clamp((p.z + 1.8) / 3.4, 0, 1);
      var rr = n.r * p.f * .95;
      if (rr < .3) continue;
      var puls = .7 + .3 * Math.sin(this.t * .0016 + i);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, 6.2832);
      ctx.fillStyle = this.hex(this.cGlow, (.16 + dz * .62) * puls);
      if (n.d >= 3 && dz > .5) { ctx.shadowBlur = 16 * dz; ctx.shadowColor = this.hex(this.cHi, .9); }
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    /* energy particles */
    if (!APP.reduced) {
      for (i = 0; i < this.parts.length; i++) {
        var pt = this.parts[i];
        pt.t += pt.sp * dt * 16;
        if (pt.t > 1) { pt.t = 0; pt.path = this.paths[Math.floor(this.R() * this.paths.length)] || pt.path; }
        var path = pt.path;
        if (!path || !path.length) continue;
        var fi = pt.t * path.length;
        var idx = Math.min(path.length - 1, Math.floor(fi));
        var lt = fi - idx;
        var seg = path[idx];
        var wp = {
          x: seg.a.x + (seg.b.x - seg.a.x) * lt,
          y: seg.a.y + (seg.b.y - seg.a.y) * lt,
          z: seg.a.z + (seg.b.z - seg.a.z) * lt
        };
        var sp = this.project(wp);
        var sz = Math.max(.8, 2.6 * sp.f);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sz, 0, 6.2832);
        ctx.fillStyle = this.hex(this.cGlow, .95);
        ctx.shadowBlur = 14; ctx.shadowColor = this.hex(this.cHi, 1);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  };

  APP.hero3d = {
    init: function () {
      var cv = U.qs('#tree3d');
      if (!cv) return;
      var h = new Hero3D(cv);
      var hero = U.qs('#hero'), visible = true;
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(hero);
      }
      APP.onTick(function (dt) { if (visible) h.frame(dt); });
    }
  };

})(window.APP = window.APP || {});
