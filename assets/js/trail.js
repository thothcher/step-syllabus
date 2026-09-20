/* ==========================================================================
   trail.js — the spine, the branches, the nodes and the avatar that walks
   ========================================================================== */
(function (APP) {
  'use strict';

  var U = APP.u, NS = 'http://www.w3.org/2000/svg';

  function offsetIn(el, root) {
    var x = 0, y = 0, n = el;
    while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x: x, y: y };
  }

  var Trail = {
    ready: false,
    blocks: [],      /* {el, id, type, node, branch, rail, y, lit} */
    lut: [],         /* {len,x,y} samples along the spine */
    total: 0,
    avY: 0,
    curAv: 0
  };

  /* ---------------------------------------------------------- svg setup */
  function defs(svg) {
    var d = U.svg('defs');
    d.innerHTML =
      '<linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#3E7BFF"/>' +
        '<stop offset="55%" stop-color="#1B44CE"/>' +
        '<stop offset="100%" stop-color="#0B2892"/>' +
      '</linearGradient>' +
      '<filter id="softGlow" x="-120%" y="-120%" width="340%" height="340%">' +
        '<feGaussianBlur stdDeviation="6" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>';
    svg.appendChild(d);
  }

  function avatarGroup() {
    var g = U.svg('g', { 'class': 'g-av' });
    g.innerHTML =
      '<ellipse class="shadow" cx="0" cy="26" rx="20" ry="5"/>' +
      '<circle class="aura" cx="0" cy="0" r="30"/>' +
      '<circle class="spin" cx="0" cy="0" r="18"/>' +
      '<path class="hex" d="M0 -12 10.4 -6 10.4 6 0 12 -10.4 6 -10.4 -6Z"/>' +
      '<path class="tick" d="M0 -5 0 5"/>';
    return g;
  }

  /* ------------------------------------------------------------ measure */
  function build() {
    var trail = U.qs('#trail'), flow = U.qs('#trailFlow'), svg = U.qs('#trailSvg');
    if (!trail || !flow || !svg) return;

    var W = trail.offsetWidth, H = trail.offsetHeight;
    var mobile = window.innerWidth <= 1100;
    var flowPos = offsetIn(flow, trail);
    var centerX = flowPos.x + flow.offsetWidth / 2;

    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.innerHTML = '';
    defs(svg);

    var gBranch = U.svg('g'), gNode = U.svg('g'), gSpine = U.svg('g');
    svg.appendChild(gSpine); svg.appendChild(gBranch); svg.appendChild(gNode);

    Trail.blocks = [];

    var anchors = [];

    U.qsa('[data-mod],[data-cp]', flow).forEach(function (el) {
      var isMod = el.hasAttribute('data-mod');
      var pos = offsetIn(el, trail);
      var b = { el: el, id: el.id, type: isMod ? 'mod' : 'cp', lit: false };

      if (isMod) {
        var card = U.qs('.mod__card', el);
        var head = U.qs('.mod__head', el);
        var cpos = offsetIn(card, trail);
        var side = el.getAttribute('data-side');
        var ay = cpos.y + Math.min(84, head.offsetHeight * .42);
        var ax = mobile ? (flowPos.x + 18) : (centerX + (side === 'left' ? 20 : -20));
        var edge = mobile ? cpos.x : (side === 'left' ? cpos.x + card.offsetWidth : cpos.x);
        b.y = ay; b.x = ax; b.side = mobile ? 'right' : side;
        b.n = U.qs('.mod__n', el) ? el.getAttribute('data-mod') : '';
        b.title = U.qs('.mod__title', el).textContent;
        b.num = U.qs('.mod__ghost', el).textContent;

        /* branch: leaves the spine, elbows into the card */
        var dx = edge - ax;
        var br = U.svg('path', {
          'class': 'g-branch',
          d: 'M' + ax + ' ' + (ay - 46) + ' C' + ax + ' ' + (ay - 14) + ',' +
             (ax + dx * .34) + ' ' + ay + ',' + edge + ' ' + ay
        });
        gBranch.appendChild(br);
        b.branch = br;

        /* sub-rail + twigs, one per lecture (desktop only — no room on phones) */
        var railX = edge + (side === 'left' ? 15 : -15);
        var rows = U.qsa('.lec__i', el);
        var lastY = ay;
        var twigs = [];
        rows.forEach(function (row) {
          var rp = offsetIn(row, trail);
          var ry = rp.y + 24;
          lastY = ry;
          if (mobile) return;
          var tw = U.svg('path', {
            'class': 'g-twig',
            d: 'M' + railX + ' ' + ry + ' L' + edge + ' ' + ry
          });
          gBranch.appendChild(tw);
          twigs.push(tw);
        });
        if (rows.length && !mobile) {
          var sub = U.svg('path', {
            'class': 'g-twig',
            d: 'M' + railX + ' ' + (ay + 4) + ' L' + railX + ' ' + lastY
          });
          gBranch.appendChild(sub);
          twigs.push(sub);
        }
        b.twigs = twigs;

        /* node on the spine */
        var g = U.svg('g', { 'class': 'g-node' });
        g.innerHTML =
          '<circle class="halo" cx="' + ax + '" cy="' + ay + '" r="26"/>' +
          '<circle class="ring" cx="' + ax + '" cy="' + ay + '" r="13"/>' +
          '<circle class="core" cx="' + ax + '" cy="' + ay + '" r="5.5"/>' +
          (mobile ? '' :
            '<text class="lbl" x="' + (ax + (side === 'left' ? 24 : -24)) + '" y="' + (ay + 4) + '" ' +
            'text-anchor="' + (side === 'left' ? 'start' : 'end') + '">' + b.num + '</text>');
        gNode.appendChild(g);
        b.node = g;

      } else {
        var cy = pos.y + el.offsetHeight / 2;
        var cx = mobile ? (flowPos.x + 16) : centerX;
        b.y = cy; b.x = cx; b.title = U.qs('.cp__title', el).textContent;
        b.num = U.qs('.tag', el).textContent.replace('RELEASE', '').trim();

        var gc = U.svg('g', { 'class': 'g-node g-node--cp' });
        gc.innerHTML =
          '<circle class="halo" cx="' + cx + '" cy="' + cy + '" r="34"/>' +
          '<path class="dia" d="M' + cx + ' ' + (cy - 15) + 'L' + (cx + 15) + ' ' + cy +
            'L' + cx + ' ' + (cy + 15) + 'L' + (cx - 15) + ' ' + cy + 'Z"/>' +
          (mobile ? '' :
            '<text class="lbl" x="' + (cx + 28) + '" y="' + (cy + 4) + '">' + b.num + '</text>');
        gNode.appendChild(gc);
        b.node = gc;
      }

      anchors.push({ x: b.x, y: b.y });
      Trail.blocks.push(b);
    });

    if (!anchors.length) return;

    /* smooth spine through every anchor, extended to both ends */
    var pts = [{ x: anchors[0].x, y: 0 }].concat(anchors);
    pts.push({ x: anchors[anchors.length - 1].x, y: H });

    var d = 'M' + pts[0].x + ' ' + pts[0].y;
    for (var i = 1; i < pts.length; i++) {
      var p = pts[i - 1], c = pts[i], my = (p.y + c.y) / 2;
      d += ' C' + p.x + ' ' + my + ',' + c.x + ' ' + my + ',' + c.x + ' ' + c.y;
    }

    var bg = U.svg('path', { 'class': 'g-spine', d: d });
    var lit = U.svg('path', { 'class': 'g-lit', d: d });
    gSpine.appendChild(bg); gSpine.appendChild(lit);
    Trail.lit = lit;

    var tail = U.svg('g');
    for (var k = 0; k < 4; k++) {
      tail.appendChild(U.svg('circle', {
        'class': 'g-tail', cx: -60, cy: -60, r: 3.4 - k * .6,
        fill: 'var(--brand-glow)', opacity: .5 - k * .1
      }));
    }
    svg.appendChild(tail);
    Trail.tail = U.qsa('circle', tail);

    var av = avatarGroup();
    av.setAttribute('transform', 'translate(' + pts[0].x + ',-80)');
    svg.appendChild(av);
    Trail.av = av;

    /* length lookup table */
    Trail.total = lit.getTotalLength();
    lit.style.strokeDasharray = Trail.total;
    lit.style.strokeDashoffset = Trail.total;

    var N = 700, lut = [];
    for (var s = 0; s <= N; s++) {
      var L = Trail.total * (s / N);
      var pt = lit.getPointAtLength(L);
      lut.push({ len: L, x: pt.x, y: pt.y });
    }
    Trail.lut = lut;
    Trail.avScale = mobile ? .74 : 1;
    Trail.H = H;
    Trail.top = trail.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
    Trail.ready = true;
  }

  /* ------------------------------------------------- sample by y (LUT) */
  function atY(y) {
    var lut = Trail.lut, lo = 0, hi = lut.length - 1;
    if (y <= lut[0].y) return lut[0];
    if (y >= lut[hi].y) return lut[hi];
    while (hi - lo > 1) {
      var mid = (lo + hi) >> 1;
      if (lut[mid].y < y) lo = mid; else hi = mid;
    }
    var a = lut[lo], b = lut[hi];
    var t = (y - a.y) / ((b.y - a.y) || 1);
    return { len: a.len + (b.len - a.len) * t, x: a.x + (b.x - a.x) * t, y: y };
  }
  function atLen(L) {
    var lut = Trail.lut;
    var i = U.clamp(Math.round(L / Trail.total * (lut.length - 1)), 0, lut.length - 1);
    return lut[i];
  }

  /* --------------------------------------------------------------- tick */
  var railItems, curBlock = -1;

  function tick() {
    if (!Trail.ready) return;
    var S = APP.S;
    var target = S.y + S.vh * .52 - Trail.top;
    var inside = target > -S.vh * .6 && target < Trail.H + S.vh * .6;
    document.body.classList.toggle('in-trail', target > -S.vh * .2 && target < Trail.H + S.vh * .2);
    if (!inside) return;

    Trail.avY = U.lerp(Trail.avY, U.clamp(target, 0, Trail.H), APP.reduced ? 1 : .18);
    var p = atY(Trail.avY);

    Trail.lit.style.strokeDashoffset = (Trail.total - p.len).toFixed(1);
    Trail.av.setAttribute('transform',
      'translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ') scale(' + Trail.avScale + ')');

    for (var k = 0; k < Trail.tail.length; k++) {
      var tp = atLen(Math.max(0, p.len - (k + 1) * 26));
      Trail.tail[k].setAttribute('cx', tp.x.toFixed(1));
      Trail.tail[k].setAttribute('cy', tp.y.toFixed(1));
    }

    var active = -1;
    for (var i = 0; i < Trail.blocks.length; i++) {
      var b = Trail.blocks[i];
      var on = Trail.avY >= b.y - 40;
      if (on !== b.lit) {
        b.lit = on;
        b.node.classList.toggle('is-lit', on);
        b.el.classList.toggle('is-lit', on);
        if (b.branch) b.branch.classList.toggle('is-lit', on);
        if (b.twigs) b.twigs.forEach(function (t) { t.classList.toggle('is-lit', on); });
      }
      if (on) active = i;
    }

    /* rail */
    if (active !== curBlock) {
      curBlock = active;
      railItems.forEach(function (r, ri) { r.classList.toggle('is-on', ri === active); });
    }
  }

  APP.trail = {
    init: function () {
      railItems = U.qsa('.rail__i');
      build();
      APP.onResize(function () { build(); curBlock = -1; });
      APP.onTick(tick);
    },
    rebuild: build
  };

})(window.APP = window.APP || {});
