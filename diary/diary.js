// LetsMeetVerse Dev Diary: diary/entries.json drawn as postcards, one postmark per day, newest first, with topic filters
// (?tag=… keeps the choice in the address). The language follows the site toggle: site.js (loaded after this file) takes
// the page's own strings from window.LMV_I18N and fires 'lmv:lang' whenever the language is set.
//
// Adding an entry: put a new object at the top of entries.json —
//   { "date": "2026-11-12", "title": { "en", "zh" }, "body": { "en": [paragraphs], "zh": [paragraphs] },
//     "tags": [buildings | interactions | characters | audio | ui | world | systems],
//     "images": [{ "src": "assets/diary/name.webp", "w": 1200, "h": 675, "alt": { "en", "zh" } }] }
// Pictures are in-game screenshots, about 1200 px wide; an optional name-640.webp next to one is used on phones.
// The first picture fills the card, a second one is tucked into its corner. web/site/assemble.mjs checks the file.
(function () {
  window.LMV_I18N = {
    zh: {
      navDiary: '开发日志', navEA: '抢先体验', home: '首页',
      dTitle: '开发日志',
      dLede: 'LetsMeetVerse 每次更新都写在这里：新的去处、和朋友一起做的新事情，还有新来的邻居。',
      hiTitle: '嗨，我是 Noah',
      hi1: '我是一名设计师，以前从没做过游戏，只是特别爱玩。于是我自学用 AI 来开发，开始搭建那个我一直想住进去的世界。',
      hi2: 'LetsMeetVerse 是一个设定在真实洛杉矶的线上生活模拟游戏：和真实的人一起，过一段治愈的第二人生。交朋友、找工作、搬进第一间小公寓，买房产、做投资、开自己的小店，有一天还能结婚。',
      hi3: '每次更新，我都会在这里记下变化。谢谢你一路关注。',
      hiSign: 'Noah',
      filterLabel: '按主题筛选',
      dEmpty: '这个主题下还没有内容。换一个，或者显示全部。',
      dNoJs: '开发日志需要开启 JavaScript 才能显示。',
      dEnd: '这就是第一天了。更多更新，敬请期待。', dEndBtn: '获取抢先体验',
      footShots: '日志里的每张图都是游戏截图。', shotLabel: '截图'
    }
  };

  var TAGS = {
    buildings: { en: 'Buildings', zh: '建筑', icon: 'apartment', c: '#FFD98A' },
    interactions: { en: 'Interactions', zh: '互动', icon: 'handshake', c: '#F9B4CB' },
    characters: { en: 'Characters', zh: '角色', icon: 'face_smile', c: '#CDBDF7' },
    audio: { en: 'Music & sound', zh: '音乐音效', icon: 'music_notes', c: '#A9DCF8' },
    ui: { en: 'Interface', zh: '界面', icon: 'sparkles', c: '#FFCFAE' },
    world: { en: 'World', zh: '世界', icon: 'palm_tree', c: '#BCE5C4' },
    systems: { en: 'Systems', zh: '玩法系统', icon: 'coins', c: '#C9D3F2' }
  };
  var ORDER = ['buildings', 'interactions', 'characters', 'audio', 'ui', 'world', 'systems'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var S = {
    en: { all: 'All', topics: 'Topics', count: function (n, d) { return n + ' updates since ' + d; }, open: 'Open the screenshot larger' },
    zh: { all: '全部', topics: '主题', count: function (n, d) { return '自' + d + '以来共 ' + n + ' 条更新'; }, open: '放大查看截图' }
  };

  var days = document.getElementById('d-days'), bar = document.getElementById('d-filters'), empty = document.getElementById('d-empty'), countEl = document.getElementById('d-count');
  var entries = null, lang = 'en', tag = 'all', seen = null;
  try { var q = new URLSearchParams(location.search).get('tag'); if (q && TAGS[q]) tag = q; } catch (e) {}

  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var pick = function (v) { return v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] != null ? v[lang] : v.en) : v; };
  var paras = function (v) { v = pick(v); return Array.isArray(v) ? v : String(v || '').split(/\n\s*\n/); };
  var ymd = function (d) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d) || [0, 0, 1, 1]; return { y: +m[1], m: +m[2], d: +m[3] }; };
  var dateText = function (d) { var t = ymd(d); return lang === 'zh' ? t.y + '年' + t.m + '月' + t.d + '日' : MONTHS[t.m - 1] + ' ' + t.d + ', ' + t.y; };

  // the day's postmark: a double ring, LOS ANGELES CA over the top, the year under it, month and day in the middle,
  // and the wavy cancellation lines running off to the right
  function postmark(d) {
    var t = ymd(d), id = 'pm' + d.replace(/\D/g, ''), mon = lang === 'zh' ? t.m + '月' : MONTHS[t.m - 1].slice(0, 3).toUpperCase();
    var waves = [44, 60, 76, 92].map(function (y) { return '<path d="M126 ' + y + 'q7.5-7 15 0t15 0t15 0t15 0t15 0t15 0"/>'; }).join('');
    return '<svg class="pm" viewBox="0 0 222 132" aria-hidden="true" focusable="false"><defs>' +
      '<path id="' + id + 't" d="M20 66a46 46 0 0 1 92 0"/><path id="' + id + 'b" d="M14 66a52 52 0 0 0 104 0"/></defs>' +
      '<circle cx="66" cy="66" r="62"/><circle cx="66" cy="66" r="55"/><g class="pm-waves">' + waves + '</g>' +
      '<text class="pm-arc"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">LOS ANGELES CA</textPath></text>' +
      '<text class="pm-arc"><textPath href="#' + id + 'b" startOffset="50%" text-anchor="middle">' + t.y + '</textPath></text>' +
      '<text class="pm-mon" x="66" y="58" text-anchor="middle">' + mon + '</text><text class="pm-day" x="66" y="94" text-anchor="middle">' + t.d + '</text></svg>';
  }
  function photo(im, kind) {
    var src = '../' + im.src, small = im.small ? '../' + im.small : '', alt = esc(pick(im.alt));
    var size = kind === 'tuck' ? '(min-width: 900px) 260px, 44vw' : '(min-width: 900px) 600px, 92vw';
    return '<button type="button" class="ph ph-' + kind + '" data-full="' + esc(src) + '" aria-label="' + esc(S[lang].open) + ': ' + alt + '">' +
      '<img src="' + esc(small || src) + '"' + (small ? ' srcset="' + esc(small) + ' 640w, ' + esc(src) + ' ' + (im.w || 1200) + 'w" sizes="' + size + '"' : '') +
      (im.w && im.h ? ' width="' + im.w + '" height="' + im.h + '"' : '') + ' loading="lazy" decoding="async" alt="' + alt + '"></button>';
  }
  function card(e) {
    var tags = (e.tags || []).filter(function (t) { return TAGS[t]; }), main = TAGS[tags[0]] || TAGS.world, ims = (e.images || []).slice(0, 2);
    return '<li class="pc' + (ims.length ? '' : ' pc-text') + (ims[1] ? ' has-tuck' : '') + '" data-tags="' + tags.join(' ') + '" style="--c:' + main.c + '"><article>' +
      (ims.length ? '<div class="pc-pic">' + photo(ims[0], 'main') + (ims[1] ? photo(ims[1], 'tuck') : '') + '</div>' : '') +
      '<div class="pc-back"><span class="stamp" aria-hidden="true"><i><b><img src="../assets/icons/' + main.icon + '.png" alt="" width="40" height="40"></b></i></span>' +
      '<h3>' + esc(pick(e.title)) + '</h3>' + paras(e.body).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '<ul class="pc-tags" aria-label="' + esc(S[lang].topics) + '">' + tags.map(function (t) { return '<li style="--c:' + TAGS[t].c + '">' + esc(TAGS[t][lang]) + '</li>'; }).join('') + '</ul></div></article></li>';
  }

  function render() {
    if (!entries) return;
    var groups = [], by = {};
    entries.forEach(function (e) { if (!by[e.date]) groups.push(by[e.date] = { date: e.date, items: [] }); by[e.date].items.push(e); });
    groups.sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    var counts = {}; entries.forEach(function (e) { (e.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
    bar.innerHTML = ['all'].concat(ORDER.filter(function (t) { return counts[t]; })).map(function (t) {
      var T = TAGS[t];
      return '<button type="button" class="chip" data-tag="' + t + '" aria-pressed="' + (t === tag) + '"' + (T ? ' style="--c:' + T.c + '"' : '') + '>' +
        (T ? '<img src="../assets/icons/' + T.icon + '.png" alt="" width="26" height="26">' : '') + '<span>' + esc(T ? T[lang] : S[lang].all) + '</span><b>' + (T ? counts[t] : entries.length) + '</b></button>';
    }).join('');
    days.innerHTML = groups.map(function (g) {
      return '<li class="day"><div class="pm-wrap">' + postmark(g.date) + '<h2 class="pm-date">' + esc(dateText(g.date)) + '</h2></div><ol class="cards">' + g.items.map(card).join('') + '</ol></li>';
    }).join('');
    if (countEl && groups.length) countEl.textContent = S[lang].count(entries.length, dateText(groups[groups.length - 1].date));
    filter(); stampIn();
  }
  function filter() {
    var any = false;
    days.querySelectorAll('.day').forEach(function (d) {
      var vis = 0;
      d.querySelectorAll('.pc').forEach(function (c) { var on = tag === 'all' || (' ' + c.dataset.tags + ' ').indexOf(' ' + tag + ' ') >= 0; c.hidden = !on; if (on) vis++; });
      d.hidden = !vis; if (vis) any = true;
    });
    empty.hidden = any;
    bar.querySelectorAll('.chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.tag === tag)); });
  }
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    tag = b.dataset.tag === tag ? 'all' : b.dataset.tag; filter();
    try { var u = new URL(location.href); if (tag === 'all') u.searchParams.delete('tag'); else u.searchParams.set('tag', tag); history.replaceState(null, '', u.pathname + u.search + u.hash); } catch (err) {}
  });

  // the one bit of motion: each day's postmark is stamped on as it scrolls into view
  function stampIn() {
    if (seen) seen.disconnect();
    if (!('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    days.classList.add('stamping');
    seen = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('stamped'); seen.unobserve(x.target); } }); }, { threshold: 0.6 });
    days.querySelectorAll('.pm').forEach(function (p) { seen.observe(p); });
  }

  // the big title is the puffy wordmark: swap its words (and their outline copies) with the language
  function title() {
    var w = document.querySelectorAll('.d-title .word > span'), t = lang === 'zh' ? ['开发', '日志'] : ['Dev', 'Diary'];
    w.forEach(function (s, i) { s.textContent = t[i]; s.dataset.t = t[i]; });
  }

  document.addEventListener('lmv:lang', function (e) { lang = e.detail === 'zh' ? 'zh' : 'en'; title(); render(); });
  var raw = document.getElementById('diary-data'), text = raw && raw.textContent.trim();
  var ready = function (list) { entries = Array.isArray(list) ? list : []; render(); };
  if (text) { try { ready(JSON.parse(text)); } catch (e) { text = ''; } }
  if (!text && window.fetch) fetch('entries.json').then(function (r) { return r.json(); }).then(ready).catch(function () { empty.hidden = false; });
})();
