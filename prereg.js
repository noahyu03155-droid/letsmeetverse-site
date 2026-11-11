// Pre-registration on letsmeetverse.com: an e-mail address, or a Google account (Google Identity Services, shown only
// once the game server has a Google client ID). Both go to the game server (server/signup.js), which keeps the list.
// Load after site.js: the language comes from it (window.LMV.lang and the 'lmv:lang' event).
(function () {
  var API = 'https://play.letsmeetverse.com';
  try { if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) { var a = new URLSearchParams(location.search).get('api'); if (a && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(a)) API = a; } } catch (e) {}
  var box = document.querySelector('.prereg'); if (!box) return;
  var form = box.querySelector('[data-prereg]'), input = form.querySelector('input[type=email]'), hp = form.querySelector('.pr-hp'), btn = form.querySelector('button');
  var news = box.querySelector('[data-pr-news]'), msg = box.querySelector('[data-pr-msg]'), gWrap = box.querySelector('[data-pr-google]'), gBtn = box.querySelector('[data-pr-gbtn]'), count = box.querySelector('[data-pr-count]');
  var STR = {
    en: { sending: 'Saving your spot…', done: 'You’re on the list! We’ll email you when LA opens up.', already: 'You’re already on the list. We’ll be in touch!',
      gDone: function (e) { return 'You’re on the list with ' + e + '. See you in LA!'; }, bad: 'That email doesn’t look right. Check it and try again.',
      wait: 'Too many tries from here. Wait a few minutes and try again.', net: 'Couldn’t reach the game server. Check your connection and try again.',
      google: 'Google couldn’t confirm that. Try again, or use your email.', n: function (n) { return n.toLocaleString('en') + ' people have pre-registered.'; } },
    zh: { sending: '正在为你预约…', done: '预约成功！洛杉矶开放时我们会发邮件通知你。', already: '你已经预约过啦，到时候见！',
      gDone: function (e) { return '已用 ' + e + ' 预约成功，洛杉矶见！'; }, bad: '邮箱格式好像不对，检查一下再试。',
      wait: '尝试太频繁了，请过几分钟再试。', net: '连不上游戏服务器，请检查网络后再试。',
      google: 'Google 验证没有通过，请再试一次或改用邮箱。', n: function (n) { return '已有 ' + n.toLocaleString('zh') + ' 人预约。'; } }
  };
  var lang = function () { return (window.LMV && window.LMV.lang) === 'zh' ? 'zh' : 'en'; };
  var T = function (k) { return STR[lang()][k]; };
  var cfg = null, last = null;
  var show = function (text, kind) { last = { text: text, kind: kind }; msg.textContent = typeof text === 'function' ? text() : text; msg.className = 'pr-msg' + (kind ? ' ' + kind : ''); };
  var call = function (path, body) {
    return fetch(API + path, body ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) } : {})
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.status = r.status; return j; }); });
  };
  var drawCount = function () { if (cfg && cfg.n >= 20) { count.textContent = T('n')(cfg.n); count.hidden = false; } else count.hidden = true; };
  var finished = function (text) { box.classList.add('pr-done'); show(text, 'ok'); try { localStorage.setItem('lmv_prereg', '1'); } catch (e) {} };
  var fail = function (j) { show(T(j.err === 'email' ? 'bad' : j.err === 'wait' ? 'wait' : j.err === 'google' ? 'google' : 'net'), 'err'); btn.disabled = false; };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { input.classList.add('bad'); input.focus(); return show(T('bad'), 'err'); }
    input.classList.remove('bad'); btn.disabled = true; show(T('sending'));
    call('/api/prereg', { email: email, lang: lang(), news: !!(news && news.checked), website: hp ? hp.value : '', src: 'site' }).then(function (j) {
      if (!j.ok) return fail(j);
      if (cfg) { cfg.n += j.already ? 0 : 1; drawCount(); }
      finished(T(j.already ? 'already' : 'done'));
    }).catch(function () { fail({}); });
  });
  input.addEventListener('input', function () { input.classList.remove('bad'); });

  // Google: Google's own button, in the page's language
  var gisReady = null;
  var loadGis = function () {
    return gisReady || (gisReady = new Promise(function (ok, no) {
      if (window.google && google.accounts && google.accounts.id) return ok();
      var s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true;
      s.onload = function () { ok(); }; s.onerror = function () { gisReady = null; no(); }; document.head.appendChild(s);
    }));
  };
  var onGoogle = function (resp) {
    show(T('sending'));
    call('/api/prereg/google', { credential: resp && resp.credential, lang: lang(), news: !!(news && news.checked), src: 'site' }).then(function (j) {
      if (!j.ok) return fail(j);
      if (cfg) { cfg.n += j.already ? 0 : 1; drawCount(); }
      finished(j.already ? T('already') : T('gDone')(j.email));
    }).catch(function () { fail({}); });
  };
  var drawGoogle = function () {
    if (!cfg || !cfg.google) return;
    loadGis().then(function () {
      google.accounts.id.initialize({ client_id: cfg.google, callback: onGoogle, ux_mode: 'popup', context: 'signup', itp_support: true });
      gBtn.innerHTML = ''; gWrap.hidden = false;
      google.accounts.id.renderButton(gBtn, { type: 'standard', theme: 'outline', size: 'large', shape: 'pill', text: 'signup_with', logo_alignment: 'left', locale: lang() === 'zh' ? 'zh_CN' : 'en' });
    }).catch(function () { gWrap.hidden = true; });
  };

  call('/api/prereg/config').then(function (j) { cfg = { google: j.google || null, n: +j.n || 0 }; drawCount(); drawGoogle(); }).catch(function () {});
  document.addEventListener('lmv:lang', function () { drawCount(); drawGoogle(); if (last) show(last.text, last.kind); });
})();
