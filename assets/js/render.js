/* ==========================================================================
   render.js — builds the trail, the rail and the outcome grid from data
   ========================================================================== */
(function (APP) {
  'use strict';

  var U = APP.u;

  var KIND = {
    milestone: 'MILESTONE',
    handout: 'PROJECT HANDOUT',
    review: 'REVIEW'
  };

  function topicsHTML(topics) {
    if (!topics || !topics.length) return '';
    return '<ul class="tps">' + topics.map(function (tp) {
      return '<li class="tp"><b>' + U.esc(tp.t) + '</b>' +
        (tp.d ? '<i>' + U.esc(tp.d) + '</i>' : '') + '</li>';
    }).join('') + '</ul>';
  }

  function lectureHTML(l, i) {
    var kind = l.kind ? '<span class="lec__k">' + KIND[l.kind] + '</span>' : '';
    return '<li class="lec__i" data-lec="' + l.n + '" data-rv="up" data-rv-delay="' + ((i % 4) * 70) + '">' +
      '<span class="lec__n">' + U.pad(l.n) + '</span>' +
      '<h4 class="lec__t">' + U.esc(l.t) + '</h4>' +
      kind +
      topicsHTML(l.topics) +
      '</li>';
  }

  function asideHTML(m) {
    var topics = 0, max = 1, bars = '';
    m.lectures.forEach(function (l) {
      var c = (l.topics || []).length;
      topics += c; if (c > max) max = c;
    });
    m.lectures.forEach(function (l, i) {
      var c = (l.topics || []).length;
      bars += '<i style="--h:' + Math.max(.10, c / max).toFixed(2) + ';--i:' + i + '" ' +
        'title="ლექცია ' + l.n + ' — ' + c + ' თემა"></i>';
    });
    return '<aside class="mod__aside" aria-hidden="true">' +
      '<div class="ms">' +
        '<div class="ms__k">MODULE ' + m.n + ' — DENSITY</div>' +
        '<div class="ms__graph">' + bars + '</div>' +
        '<div class="ms__rows">' +
          '<div class="ms__row"><span>lectures</span><b>' + m.lectures.length + '</b></div>' +
          '<div class="ms__row"><span>topics</span><b>' + topics + '</b></div>' +
          '<div class="ms__row"><span>range</span><b>' + m.range[0] + '–' + m.range[1] + '</b></div>' +
        '</div>' +
      '</div>' +
    '</aside>';
  }

  function moduleHTML(m, side) {
    var meter = '';
    for (var i = 0; i < m.lectures.length; i++) meter += '<i></i>';
    return '<article class="mod" id="' + m.id + '" data-mod="' + m.id + '" data-side="' + side + '">' +
      asideHTML(m) +
      '<div class="mod__col">' +
        '<div class="mod__card" data-rv="' + (side === 'left' ? 'left' : 'right') + '">' +
          '<header class="mod__head">' +
            '<span class="mod__ghost" data-par="0.05" aria-hidden="true">' + m.n + '</span>' +
            '<div class="mod__tagrow">' +
              '<span class="mod__n">MODULE ' + m.n + '</span>' +
              '<span class="mod__range">ლექცია ' + m.range[0] + ' — ' + m.range[1] + '</span>' +
            '</div>' +
            '<h3 class="mod__title">' + U.esc(m.title) + '</h3>' +
            '<p class="mod__en">' + U.esc(m.en) + '</p>' +
            '<p class="mod__sum">' + U.esc(m.summary) + '</p>' +
            '<div class="mod__meter">' + meter + '</div>' +
          '</header>' +
          '<ol class="lec">' + m.lectures.map(lectureHTML).join('') + '</ol>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function mockHTML(kind) {
    var bar = '<div class="mock__bar"><i></i><i></i><i></i><u></u></div>';
    if (kind === 'grid') {
      var cells = '';
      for (var i = 0; i < 6; i++) cells += '<div class="cell"><s></s><u></u></div>';
      return '<div class="mock mock--grid">' + bar + '<div class="mock__body">' + cells + '</div></div>';
    }
    if (kind === 'dash') {
      return '<div class="mock mock--dash">' + bar +
        '<div class="mock__body"><div class="side"><s></s><s></s><s></s><s></s><s></s></div>' +
        '<div class="chart"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>';
    }
    var rows = '';
    for (var r = 0; r < 4; r++) rows += '<div class="row"><b></b><s></s><u></u></div>';
    return '<div class="mock mock--list">' + bar + '<div class="mock__body">' + rows + '</div></div>';
  }

  function demoHTML(d) {
    if (!d || !d.url) return '';
    return '<a class="pj__demo" href="' + U.esc(d.url) + '" target="_blank" rel="noopener noreferrer" ' +
      'draggable="false" data-cursor="go" data-cursor-label="live">' +
      '<span class="pj__demo-k">ცოცხალი დემო</span>' +
      '<span class="pj__demo-u">' + U.esc(d.label || d.url) + '</span>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>' +
    '</a>';
  }

  function frameHTML(p) {
    if (!p.demo || !p.demo.url) return '<div class="pj__mock">' + mockHTML(p.mock) + '</div>';
    var u = U.esc(p.demo.url), t = U.esc(p.title);
    return '<div class="pj__frame" data-frame>' +
      '<div class="pj__skel" aria-hidden="true">' + mockHTML(p.mock) + '</div>' +
      '<iframe class="pj__if" data-src="' + u + '" title="' + t + ' — ცოცხალი დემო" ' +
        'referrerpolicy="no-referrer-when-downgrade" loading="lazy" tabindex="-1"></iframe>' +
      '<div class="pj__shield" data-cursor="drag" data-cursor-label="drag" aria-hidden="true"></div>' +
      '<span class="pj__live" aria-hidden="true"><i></i>LIVE</span>' +
      '<div class="pj__fbar">' +
        '<button class="pj__toggle" type="button" data-live-toggle aria-pressed="false" data-cursor="link">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 9-6 1.5L10.6 20 5 3Z"/></svg>' +
          '<span>ინტერაქცია</span>' +
        '</button>' +
        '<a class="pj__open" href="' + u + '" target="_blank" rel="noopener noreferrer" ' +
          'data-cursor="go" data-cursor-label="open"><span>ახალ ფანჯარაში</span>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>' +
      '</div>' +
      '<span class="pj__slow" aria-hidden="true">იტვირთება…</span>' +
    '</div>';
  }

  function projectHTML(p) {
    return '<article class="pj">' +
      frameHTML(p) +
      '<div class="pj__body">' +
        '<span class="pj__tag">' + U.esc(p.tag) + '</span>' +
        '<h4>' + U.esc(p.title) + '</h4>' +
        '<p class="pj__pitch">' + U.esc(p.pitch) + '</p>' +
        demoHTML(p.demo) +
        '<ul class="pj__pts">' + p.points.map(function (x) { return '<li>' + U.esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="pj__stack">' + p.stack.map(function (x) { return '<span>' + U.esc(x) + '</span>'; }).join('') + '</div>' +
        '<div class="pj__deliver"><b>Deliverable</b><span>' + U.esc(p.deliver) + '</span></div>' +
      '</div>' +
    '</article>';
  }

  function checkpointHTML(c) {
    var dots = c.projects.map(function (_, i) {
      return '<button class="sl__dot' + (i === 0 ? ' is-on' : '') + '" type="button" data-go="' + i +
        '" aria-label="სლაიდი ' + (i + 1) + '"></button>';
    }).join('');

    return '<section class="cp" id="' + c.id + '" data-cp="' + c.id + '">' +
      '<div class="cp__sticky">' +
        '<div class="cp__floor" aria-hidden="true"></div>' +
        '<div class="cp__beam" aria-hidden="true"></div>' +
        '<div class="cp__slot" aria-hidden="true"></div>' +
        '<div class="cp__roof" aria-hidden="true"></div>' +
        '<div class="cp__beam cp__beam--roof" aria-hidden="true"></div>' +
        '<div class="cp__sky" aria-hidden="true">' +
          '<span class="cp__eyebrow">CHECKPOINT</span>' +
          '<b class="cp__big">' + U.esc(c.release) + '</b>' +
          '<span class="cp__sub">' + U.esc(c.label) + '</span>' +
        '</div>' +
        '<div class="cp__stage">' +
          '<div class="cp__panel brackets">' +
            '<header class="cp__head">' +
              '<div class="cp__meta">' +
                '<span class="tag">RELEASE ' + U.esc(c.release) + '</span>' +
                '<span class="cp__when">' + U.esc(c.when) + '</span>' +
                '<span class="cp__when">' + U.esc(c.label) + '</span>' +
                (c.stage ? '<span class="cp__stage-tag">' + U.esc(c.stage) + '</span>' : '') +
              '</div>' +
              '<h3 class="cp__title">' + U.esc(c.title) + '</h3>' +
              '<p class="cp__lead">' + U.esc(c.lead) + '</p>' +
            '</header>' +
            '<div class="sl" data-slider>' +
              '<div class="sl__view" data-cursor="drag" data-cursor-label="drag">' +
                '<div class="sl__track">' + c.projects.map(projectHTML).join('') + '</div>' +
              '</div>' +
              '<div class="sl__ui">' +
                '<button class="sl__btn" type="button" data-dir="-1" aria-label="წინა">' +
                  '<svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button>' +
                '<button class="sl__btn" type="button" data-dir="1" aria-label="შემდეგი">' +
                  '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>' +
                '<div class="sl__dots">' + dots + '</div>' +
                '<span class="sl__hint">drag / ← →</span>' +
                '<span class="sl__count">01 / ' + U.pad(c.projects.length) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  APP.render = function () {
    var flow = U.qs('#trailFlow');
    var rail = U.qs('#rail');
    var html = '', railHtml = '', modIndex = 0;

    APP.TRAIL.forEach(function (b) {
      if (b.type === 'module') {
        var side = modIndex % 2 === 0 ? 'left' : 'right';
        html += moduleHTML(b, side);
        railHtml += '<button class="rail__i" type="button" data-to="' + b.id + '" data-cursor="link" ' +
          'aria-label="მოდული ' + b.n + '"><b>' + b.n + '</b><i></i></button>';
        modIndex++;
      } else {
        html += checkpointHTML(b);
        railHtml += '<button class="rail__i rail__i--cp" type="button" data-to="' + b.id + '" data-cursor="link" ' +
          'aria-label="რელიზი ' + b.release + '"><b>' + b.release + '</b><i></i></button>';
      }
    });

    flow.innerHTML = html;
    rail.innerHTML = railHtml;

    /* outcome grid */
    var og = U.qs('#outGrid');
    if (og) {
      og.innerHTML = APP.OUTCOMES.map(function (o, i) {
        return '<article class="ocard" data-rv="up" data-rv-delay="' + ((i % 4) * 90) + '">' +
          '<span class="ocard__n">' + U.pad(i + 1) + '</span>' +
          '<h4>' + U.esc(o.k) + '</h4>' +
          '<p>' + U.esc(o.v) + '</p>' +
        '</article>';
      }).join('');
    }

    /* rail navigation */
    rail.addEventListener('click', function (e) {
      var b = e.target.closest('[data-to]');
      if (!b) return;
      var t = document.getElementById(b.getAttribute('data-to'));
      if (!t) return;
      var isCp = t.classList.contains('cp');
      var top = t.getBoundingClientRect().top + window.scrollY +
        (isCp ? (t.offsetHeight - window.innerHeight) * .42 : -140);
      window.scrollTo({ top: top, behavior: APP.reduced ? 'auto' : 'smooth' });
    });
  };

})(window.APP = window.APP || {});
