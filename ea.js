// Early Access: the code box. One component, two homes: a modal <dialog> that every [data-ea] link or button (and the
// landing page's Early Access panel, [data-ea-panel]) opens on the same page, and inline on /early-access/ (#ea-inline),
// the page to share. Without this script the links simply go to /early-access/.
// The code goes to the game server (server/ea.js), which answers with a download token good for 14 days; the token is
// kept in localStorage (best effort) so a returning visitor opens straight to the unlocked state. Load after site.js:
// the language comes from it (window.LMV.lang and the 'lmv:lang' event).
(function () {
  var API = 'https://play.letsmeetverse.com';
  // local testing only: a page served from localhost may talk to a local game server (?api=http://localhost:3000)
  try { if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) { var a = new URLSearchParams(location.search).get('api'); if (a && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(a)) API = a; } } catch (e) {}
  var me = document.currentScript, ROOT = me ? new URL('./', me.src).href : location.origin + '/';
  var KEY = 'lmv_ea';
  var DL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m-5-5 5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var STR = {
    en: {
      title: 'Enter your Early Access code', lead: 'LetsMeetVerse is in Early Access. Your code unlocks the online game and the desktop downloads.',
      label: 'Early Access code', ph: 'Your code', submit: 'Unlock', checking: 'Checking…',
      bad: 'That code isn’t right — check it and try again', empty: 'Type your code first',
      wait: function (s) { return 'Too many tries. Wait ' + (s >= 90 ? Math.ceil(s / 60) + ' minutes' : s + ' seconds') + ', then try again.'; },
      net: 'Couldn’t reach the game server. Check your connection and try again.',
      expired: 'Your saved code has expired or changed. Enter the current one.',
      how: 'No code yet? We share codes with people who follow the', howLink: 'Dev Diary', howEnd: 'and our socials.',
      inTitle: 'You’re in!', inLead: 'Play online with everyone in LA, or download the desktop app.', openLead: 'No code needed right now: everyone can play.',
      play: 'Play online in your browser', playSub: 'Make your character at play.letsmeetverse.com',
      dlTitle: 'Desktop app', dlNote: 'Your own single-player town: plays offline and saves on your computer.',
      files: { setup: ['Windows installer', 'Windows 10 and 11, 64-bit'], zip: ['Windows zip (portable)', 'Unzip anywhere, run LetsMeetVerse.exe'], linux: ['Linux zip (beta)', '64-bit'] },
      noFiles: 'The desktop downloads will be here soon. Play online in the meantime.',
      until: function (d) { return 'These download links work until ' + d + '.'; },
      smart: 'Seeing “Windows protected your PC”? The app isn’t code-signed yet: click More info, then Run anyway.',
      other: 'Use a different code', close: 'Close', dialog: 'Early Access'
    },
    zh: {
      title: '输入抢先体验邀请码', lead: 'LetsMeetVerse 正在抢先体验中。输入邀请码，就能在线游玩并下载电脑版。',
      label: '邀请码', ph: '你的邀请码', submit: '解锁', checking: '正在验证…',
      bad: '邀请码不对，检查一下再试', empty: '请先输入邀请码',
      wait: function (s) { return '尝试次数太多了，请' + (s >= 90 ? Math.ceil(s / 60) + ' 分钟' : ' ' + s + ' 秒') + '后再试。'; },
      net: '连不上游戏服务器，请检查网络后再试。',
      expired: '之前保存的邀请码已过期或已更换，请输入新的邀请码。',
      how: '还没有邀请码？我们会在', howLink: '开发日志', howEnd: '和社交账号上发给关注的朋友。',
      inTitle: '欢迎加入！', inLead: '和洛杉矶的大家一起在线玩，或者下载电脑版。', openLead: '现在不需要邀请码，所有人都能玩。',
      play: '在浏览器里在线玩', playSub: '在 play.letsmeetverse.com 创建你的角色',
      dlTitle: '电脑版', dlNote: '你自己的单人小镇：可以离线玩，进度保存在你的电脑上。',
      files: { setup: ['Windows 安装包', 'Windows 10 和 11，64 位'], zip: ['Windows 便携版 .zip', '解压到任意位置，运行 LetsMeetVerse.exe'], linux: ['Linux 版 .zip（测试版）', '64 位'] },
      noFiles: '电脑版下载马上就来，先在线玩吧。',
      until: function (d) { return '这些下载链接在 ' + d + ' 前有效。'; },
      smart: '看到“Windows 已保护你的电脑”？应用暂时还没有代码签名：点“更多信息”，再点“仍要运行”。',
      other: '换一个邀请码', close: '关闭', dialog: '抢先体验'
    }
  };
  var lang = (window.LMV && window.LMV.lang) || (document.documentElement.lang === 'zh-CN' ? 'zh' : 'en');
  var T = function () { return STR[lang] || STR.en; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var load = function () { try { var v = JSON.parse(localStorage.getItem(KEY) || 'null'); return v && v.token && v.exp > Date.now() ? v : null; } catch (e) { return null; } };
  var keep = function (v) { try { if (v) localStorage.setItem(KEY, JSON.stringify(v)); else localStorage.removeItem(KEY); } catch (e) {} };

  var saved = load();
  var st = { busy: false, err: null, note: null, code: '' };   // err / note: { k, n }, so they follow the language
  var host = null, dlg = null, trigger = null, checked = false;

  var size = function (b) { return b >= 1048576 ? Math.round(b / 1048576) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; };
  var day = function (ms) { var d = new Date(ms); return lang === 'zh' ? d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); };
  var msg = function (m) { var s = T(); return !m ? '' : typeof s[m.k] === 'function' ? s[m.k](m.n) : s[m.k]; };
  var playUrl = function () { var u = (saved && saved.play) || 'https://play.letsmeetverse.com/'; return saved && saved.code ? u + (u.indexOf('?') < 0 ? '?' : '&') + 'code=' + encodeURIComponent(saved.code) : u; };

  function view() {
    var s = T();
    if (saved) {
      var files = saved.files || [];
      return '<div class="ea-in"><img class="ea-badge" src="' + ROOT + 'assets/icons/unlock.png" alt="" width="72" height="72">' +
        '<h2 id="ea-h" tabindex="-1">' + esc(s.inTitle) + '</h2><p class="ea-lead">' + esc(saved.open ? s.openLead : s.inLead) + '</p>' +
        '<a class="btn btn-pink btn-lg ea-play" href="' + esc(playUrl()) + '"><img src="' + ROOT + 'assets/icons/friends.png" alt="" width="48" height="48"><span><strong>' + esc(s.play) + '</strong><small>' + esc(s.playSub) + '</small></span></a>' +
        '<h3 class="ea-sub">' + esc(s.dlTitle) + '</h3><p class="ea-fine">' + esc(s.dlNote) + '</p>' +
        (files.length ? '<ul class="ea-files">' + files.map(function (f) {
          var L = s.files[f.kind] || [f.label, ''];
          return '<li><a class="ea-file" href="' + esc(API + f.path + '?t=' + encodeURIComponent(saved.token)) + '"><img src="' + ROOT + 'assets/icons/laptop.png" alt="" width="40" height="40"><span><strong>' + esc(L[0]) + '</strong><small>' + esc((L[1] ? L[1] + (lang === 'zh' ? '，' : ', ') : '') + size(f.bytes)) + '</small></span>' + DL + '</a></li>';
        }).join('') + '</ul><p class="ea-fine">' + esc(s.until(day(saved.exp))) + '</p>' + (files.some(function (f) { return f.kind !== 'linux'; }) ? '<p class="ea-smart">' + esc(s.smart) + '</p>' : '')
          : '<p class="ea-note">' + esc(s.noFiles) + '</p>') +
        '<p class="ea-alt"><button type="button" class="ea-link" data-ea-reset>' + esc(s.other) + '</button></p></div>';
    }
    return '<form class="ea-form" novalidate><img class="ea-badge" src="' + ROOT + 'assets/icons/lock.png" alt="" width="72" height="72">' +
      '<h2 id="ea-h" tabindex="-1">' + esc(s.title) + '</h2><p class="ea-lead">' + esc(s.lead) + '</p>' +
      (st.note ? '<p class="ea-note" role="status">' + esc(msg(st.note)) + '</p>' : '') +
      '<label class="ea-label" for="ea-code">' + esc(s.label) + '</label>' +
      '<div class="ea-row"><input class="ea-input" id="ea-code" name="code" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="64" placeholder="' + esc(s.ph) + '" value="' + esc(st.code) + '" aria-describedby="ea-err"' + (st.err ? ' aria-invalid="true"' : '') + '>' +
      '<button type="submit" class="btn btn-blue ea-go"' + (st.busy ? ' disabled' : '') + '>' + esc(st.busy ? s.checking : s.submit) + '</button></div>' +
      '<p class="ea-err" id="ea-err" role="alert">' + esc(msg(st.err)) + '</p>' +
      '<p class="ea-how">' + esc(s.how) + ' <a href="' + ROOT + 'diary/">' + esc(s.howLink) + '</a> ' + esc(s.howEnd) + '</p></form>';
  }
  function render(focus) {
    if (!host) return;
    var inp = host.querySelector('.ea-input'); if (inp) st.code = inp.value;
    var hadFocus = inp && document.activeElement === inp;
    host.innerHTML = view();
    if (dlg) { dlg.setAttribute('aria-label', T().dialog); var x = dlg.querySelector('.ea-x'); if (x) x.setAttribute('aria-label', T().close); }
    var el = focus === 'head' ? host.querySelector('#ea-h') : (focus === 'input' || hadFocus) ? host.querySelector('.ea-input') : null;
    if (el) el.focus();
  }

  function api(path, body) {
    return fetch(API + path, body ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) } : {})
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { s: r.status, j: j }; }); });
  }
  function unlock(code, open) {
    st.busy = true; st.err = null; render();
    api('/api/ea/unlock', { code: code }).then(function (r) {
      st.busy = false;
      if (r.j && r.j.ok) { saved = { token: r.j.token, exp: r.j.exp, code: open ? '' : code, files: r.j.files || [], play: r.j.play, open: !!open }; keep(saved); st.note = null; st.code = ''; render('head'); return; }
      st.err = r.s === 429 ? { k: 'wait', n: r.j.retry || 60 } : { k: 'bad' }; render('input');
    }).catch(function () { st.busy = false; st.err = { k: 'net' }; render('input'); });
  }
  // the first time the box shows: is a code needed at all? Is the saved token still good (the code may have changed)?
  function check() {
    if (checked || !window.fetch) return; checked = true;
    if (saved) {
      api('/api/ea/files?t=' + encodeURIComponent(saved.token)).then(function (r) {
        if (r.s === 401) { saved = null; keep(null); st.note = { k: 'expired' }; render(); }
        else if (r.j && r.j.ok) { saved.files = r.j.files || []; keep(saved); render(); }
      }).catch(function () {});
    } else {
      api('/api/ea/status').then(function (r) { if (r.j && r.j.required === false && !saved) unlock('', true); }).catch(function () {});
    }
  }
  function bind(el) {
    el.addEventListener('submit', function (e) {
      e.preventDefault(); if (st.busy) return;
      var code = (el.querySelector('.ea-input') || {}).value || '';
      if (!code.trim()) { st.err = { k: 'empty' }; render('input'); return; }
      unlock(code.trim());
    });
    el.addEventListener('click', function (e) {
      if (e.target.closest('[data-ea-reset]')) { saved = null; keep(null); st.err = null; st.note = null; checked = true; render('input'); }
    });
    el.addEventListener('input', function (e) { if (e.target.classList.contains('ea-input') && st.err) { st.err = null; e.target.removeAttribute('aria-invalid'); var p = el.querySelector('.ea-err'); if (p) p.textContent = ''; } });
  }

  // ---- the dialog ----
  function focusables() { return [].slice.call(dlg.querySelectorAll('a[href], button:not([disabled]), input, [tabindex="0"]')).filter(function (n) { return n.offsetParent !== null; }); }
  function open(from) {
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.className = 'ea-dialog';
      dlg.innerHTML = '<button type="button" class="ea-x" data-ea-close>×</button><div class="ea-body"></div>';
      document.body.appendChild(dlg); host = dlg.querySelector('.ea-body'); bind(host);
      dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('[data-ea-close]')) dlg.close(); });
      dlg.addEventListener('close', function () { if (trigger && trigger.focus) trigger.focus(); });
      // keep Tab inside the box (the page behind is inert while it is open)
      dlg.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return; var f = focusables(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
    if (typeof dlg.showModal !== 'function') { location.href = ROOT + 'early-access/'; return; }
    trigger = from || null; saved = saved || load();
    render(); if (!dlg.open) dlg.showModal(); render(saved ? 'head' : 'input'); check();
  }

  // every Early Access link or button opens the box; on /early-access/ it is already on the page
  var inline = document.getElementById('ea-inline');
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var t = e.target.closest('[data-ea]'), panel = !t && e.target.closest('[data-ea-panel]');
    if (panel && e.target.closest('a, button, input, label')) return;   // links inside the panel do their own thing
    if (!t && !panel) return;
    e.preventDefault();
    if (inline) { inline.scrollIntoView({ behavior: 'smooth', block: 'center' }); var i = inline.querySelector('.ea-input') || inline.querySelector('#ea-h'); if (i) i.focus({ preventScroll: true }); return; }
    open(t || panel.querySelector('[data-ea]'));
  });
  document.addEventListener('lmv:lang', function (e) { lang = e.detail === 'zh' ? 'zh' : 'en'; render(); });
  if (inline) { host = inline; bind(host); render(); check(); }
  window.LMV_EA = { open: open };
})();
