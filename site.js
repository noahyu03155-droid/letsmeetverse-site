// LetsMeetVerse landing page: English / 中文 toggle, screenshot lightbox, download sizes. No dependencies.
(function () {
  var ZH = {
    skip: '跳到正文',
    navFeatures: '特色', navShots: '截图', navDownload: '下载', navPlay: '开始玩',
    eyebrow: '以真实洛杉矶为舞台的治愈系生活模拟',
    tagline: '捏一个小小的你，搬进自己的公寓，找份工作，逛逛街区，结识新朋友。',
    ctaPlay: '在浏览器中玩', ctaPlaySub: '免费 · 无需安装',
    ctaWin: '下载 Windows 版', ctaWinSub: 'Windows 10 / 11 · 免安装',
    heroNote: '电脑、平板、手机都能玩（手机请横屏）。',
    featTitle: '一点一点，过上新生活',
    featLead: '街道照着真实城市布置——走去咖啡店，就像在洛杉矶散步。',
    f1t: '真实的洛杉矶街区', f1d: '韩国城、好莱坞、中城、市中心、威尼斯和圣莫尼卡——真实的街道、店铺和地标。',
    f2t: '属于你的小公寓', f2d: '选一栋公寓楼和户型，用沙发、台灯、绿植把小窝布置成你的样子。',
    f3t: '有工资的工作', f3d: '做咖啡、站收银、在后厨掌勺。赚金币、练技能、一步步升职。',
    f4t: '逛街和穿搭', f4d: '咖啡、超市、服装和家具店。花掉工资，在衣柜前换个新造型。',
    f5t: '朋友和邻居', f5d: '打招呼、聊天、加好友，用手机给他们发消息。和朋友联机一起玩即将上线。',
    f6t: '狗狗、单车和公交', f6d: '领养一只小狗，骑单车、坐公交，或者买辆车穿越城市。',
    shotsTitle: '先睹为快',
    s1: '韩国城的早晨', s2: '捏你的角色', s3: '你的小公寓', s4: '咖啡时间', s5: '手机和城市地图', s6: '选择你的街区',
    s1a: '有棕榈树和小店的韩国城街道', s2a: '角色创建界面', s3a: '你的小公寓', s6a: '选择街区和公寓楼', s4a: '咖啡店内部', s5a: '显示城市地图的手机',
    dlTitle: '想怎么玩都行',
    dlWebT: '在浏览器里', dlWebD: '电脑、平板或手机上的 Chrome、Edge、Safari、Firefox 都可以。你的小镇保存在这个浏览器里。',
    dlWinT: 'Windows 电脑版', dlWinD: '免安装：把文件夹解压到任意位置，双击 LetsMeetVerse.exe。可离线游玩，进度保存在电脑上。',
    dlWinFine: '首次打开时如果出现“Windows 已保护你的电脑”，点击“更多信息”→“仍要运行”。需要 WebView2 运行库（Windows 11 和已更新的 Windows 10 自带）。',
    dlOtherT: 'Mac、Linux 和 Chromebook', dlOtherD: '直接在浏览器里玩，是同一个游戏。Linux 玩家也可以下载电脑版。', dlLinux: 'Linux 版（.zip，测试版）',
    previewNote: '抢先体验：网页版和电脑版会在你的设备上运行一个单人小镇。和朋友联机即将上线。',
    backTop: '回到顶部', footMade: '© 2026 LetsMeetVerse · 在真实的洛杉矶，过一段治愈的生活。', footCredits: '字体：Nunito 与 Fredoka（SIL OFL）。电脑版基于 Neutralinojs。'
  };
  var EN = {};
  var nodes = document.querySelectorAll('[data-i18n]'), alts = document.querySelectorAll('[data-i18n-alt]');
  nodes.forEach(function (n) { EN[n.dataset.i18n] = n.innerHTML; });
  alts.forEach(function (n) { EN[n.dataset.i18nAlt] = n.alt; });
  var titles = { en: document.title, zh: 'LetsMeetVerse · 在真实的洛杉矶过治愈生活' };

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function apply(lang) {
    var d = lang === 'zh' ? ZH : EN;
    nodes.forEach(function (n) { var v = d[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
    alts.forEach(function (n) { var v = d[n.dataset.i18nAlt]; if (v != null) n.alt = v; });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = titles[lang] || titles.en;
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }
  var q = new URLSearchParams(location.search).get('lang');
  var lang = q === 'zh' || q === 'en' ? q : store('lmv_lang') || ((navigator.languages || [navigator.language || '']).some(function (l) { return /^zh/i.test(l); }) ? 'zh' : 'en');
  if (lang !== 'en') apply(lang);
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { lang = b.dataset.lang; store('lmv_lang', lang); apply(lang); });
  });

  // screenshots open large
  var box = document.querySelector('.lightbox');
  if (box && box.showModal) {
    document.querySelectorAll('[data-full]').forEach(function (b) {
      b.addEventListener('click', function () { var im = box.querySelector('img'); im.src = b.dataset.full; im.alt = b.querySelector('img').alt; box.showModal(); });
    });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  }

  // download sizes from the files themselves (no numbers to keep in sync)
  function size(sel, url) {
    var els = document.querySelectorAll(sel); if (!els.length || !window.fetch) return;
    fetch(url, { method: 'HEAD' }).then(function (r) {
      var n = +r.headers.get('content-length');
      if (!r.ok) { if (sel === '[data-linux]') els.forEach(function (e) { e.hidden = true; }); return; }
      if (n) document.querySelectorAll(sel === '[data-win]' ? '[data-win] [data-size]' : '[data-none]').forEach(function (e) { e.textContent = Math.round(n / 1048576) + ' MB'; });
    }).catch(function () {});
  }
  if (location.protocol !== 'file:') { size('[data-win]', 'downloads/LetsMeetVerse-Windows-x64.zip'); size('[data-linux]', 'downloads/LetsMeetVerse-Linux-x64.zip'); }
})();
