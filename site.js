// LetsMeetVerse landing page: English / 中文, screenshot lightbox, download sizes. No dependencies.
// English lives in the HTML; Chinese is below. 中文 is the default when the browser prefers Chinese.
(function () {
  var ZH = {
    skip: '跳到正文',
    navHoods: '街区', navWays: '怎么玩', navDownload: '下载', navPlay: '开始玩',
    heroTitle: '拿上钥匙，搬进你在洛杉矶的第一个家。',
    heroLede: '搬进属于你的第一间小公寓，交朋友、去咖啡店打工、布置小窝，从圣莫尼卡一路逛到市中心。',
    bannerAlt: 'LetsMeetVerse，洛杉矶治愈系生活模拟：一群Q版朋友走在种满棕榈树、铺着星星的洛杉矶人行道上',
    ctaPlay: '在浏览器中玩', ctaPlaySub: '免费，无需安装',
    ctaWin: '下载 Windows 版', ctaWinSub: '适用于 Windows 10 和 11 的安装包',
    heroNote: '电脑、平板、手机都能玩（手机请横屏）。',
    lifeTitle: '把这座城市过成你的生活',
    lifeLead: '在洛杉矶，日子按你的节奏过：缺钱就去上班，有钱就去逛街，路上遇到人就停下来聊两句。',
    life0t: '搬进新家', life0d: '选好街区、户型和楼层，前台已经把钥匙给你准备好了。',
    lifeA0: '前台把公寓钥匙交给新住户，朋友抱着搬家纸箱',
    life1t: '交朋友', life1d: '在街上打招呼、聊天、加好友，用游戏里的手机给他们发消息。',
    life2t: '去打工', life2d: '做咖啡、站收银、在后厨掌勺。赚金币、练技能，一步步升职。',
    life3t: '布置小窝', life3d: '先选好户型，再摆上沙发、台灯和绿植，还能在衣柜前换上新造型。',
    lifeA1: '三个朋友在咖啡店外铺着星星的人行道上打招呼', lifeA2: '咖啡师隔着柜台递出一杯冰咖啡，窗外是码头', lifeA3: '两个朋友在小公寓里摆抱枕、挑衣服、比色卡',
    hoodsTitle: '挑一个街区住下',
    hoodsLead: '你的第一间小公寓可以在这四个街区里任选。地图上还有中城和威尼斯，骑单车、坐公交或开车都能到。',
    h1n: '圣莫尼卡', h1a: 'Santa Monica', h1d: '海滩、码头和海风。',
    h2n: '好莱坞', h2a: 'Hollywood', h2d: '星星人行道、老剧院和亮闪闪的招牌。',
    h3n: '韩国城', h3a: 'Koreatown', h3d: '宵夜、KTV，还有总是热热闹闹的咖啡店。',
    h4n: '洛杉矶市中心', h4a: 'Downtown LA', h4d: '住在 loft 风公寓楼里看天际线。',
    hoodA1: '朋友们开着浅蓝色敞篷车经过码头边的海滨大道', hoodA2: '两个朋友在铺着粉色星星的人行道上碰面', hoodA3: '从公寓大堂望出去能看到韩国城路牌，朋友们正在领钥匙', hoodA4: '朋友们在小公寓里聚会，窗外是黄昏的市中心天际线',
    gameTitle: '游戏实景',
    gameLead: '上面是宣传插画，下面是网页版的真实截图。',
    shot1: '走上街头', shot2: '你的第一间小公寓', shot3: '咖啡时间',
    shot1a: '游戏里的韩国城街道，有棕榈树、店铺和游戏界面', shot2a: '从上方看新玩家的小公寓', shot3a: '游戏里街区咖啡店的内部',
    waysTitle: '怎么玩',
    ready: '现在就能玩', soon: '即将上线',
    w1t: '在浏览器里', w1d: '电脑、平板或手机上的 Chrome、Edge、Safari、Firefox 都可以。进度保存在这个浏览器里。',
    w2t: 'Windows 电脑版', w2d: '安装电脑版，全窗口游玩，可以离线，进度保存在你的电脑上。', w2b: '获取安装包',
    w3t: '和朋友联机', w3d: '目前每个小镇都是单人模式，运行在你自己的设备上。能互相串门的联机小镇正在路上。',
    dlTitle: 'LetsMeetVerse Windows 版',
    dlLead: '小巧的安装包，只为你自己安装，不需要管理员密码。会添加开始菜单快捷方式，可以离线游玩，在“设置 > 应用”里就能卸载。',
    dlSetup: '下载安装包', dlSetupSub: 'Windows 10 和 11，64 位',
    dlZipPre: '不想安装？下载', dlZip: '便携版 .zip', dlZipPost: '，解压到任意位置，双击 LetsMeetVerse.exe 即可。',
    dlLinux: 'Linux 版（.zip，测试版）',
    dlMac: '用 Mac 或 Chromebook？直接在浏览器里玩，是同一个游戏。',
    ssTitle: '看到“Windows 已保护你的电脑”？',
    ssLead: '这个应用还很新，暂时没有代码签名，所以第一次打开时 Microsoft Defender SmartScreen 会先问你一下。',
    ssMore: '更多信息', ssRun: '仍要运行',
    ss1: '点击<b>“更多信息”</b>', ss2: '再点击<b>“仍要运行”</b>',
    ssFine: '游戏需要 Microsoft Edge WebView2 运行库，Windows 11 和已更新的 Windows 10 都自带。',
    backTop: '回到顶部', close: '关闭',
    footMade: '© 2026 LetsMeetVerse。在真实的洛杉矶，过一段治愈的生活。',
    footCredits: '插画为宣传美术，截图来自游戏本身。字体：Nunito、Fredoka 与 Bree Serif（SIL OFL）。电脑版基于 Neutralinojs。'
  };
  var EN = {};
  var nodes = document.querySelectorAll('[data-i18n]'), alts = document.querySelectorAll('[data-i18n-alt]'), labels = document.querySelectorAll('[data-i18n-label]');
  nodes.forEach(function (n) { EN[n.dataset.i18n] = n.innerHTML; });
  alts.forEach(function (n) { EN['alt:' + n.dataset.i18nAlt] = n.alt; });
  labels.forEach(function (n) { EN['label:' + n.dataset.i18nLabel] = n.getAttribute('aria-label'); });
  var titles = { en: document.title, zh: 'LetsMeetVerse · 在真实的洛杉矶过治愈生活' };

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function apply(lang) {
    var zh = lang === 'zh';
    nodes.forEach(function (n) { var k = n.dataset.i18n, v = zh ? ZH[k] : EN[k]; if (v != null) n.innerHTML = v; });
    alts.forEach(function (n) { var k = n.dataset.i18nAlt, v = zh ? ZH[k] : EN['alt:' + k]; if (v != null) n.alt = v; });
    labels.forEach(function (n) { var k = n.dataset.i18nLabel, v = zh ? ZH[k] : EN['label:' + k]; if (v != null) n.setAttribute('aria-label', v); });
    // the second name on each key fob is in the other language
    document.querySelectorAll('.alt-name').forEach(function (n) { n.lang = zh ? 'en' : 'zh-CN'; });
    document.documentElement.lang = zh ? 'zh-CN' : 'en';
    document.title = titles[lang] || titles.en;
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }
  var q = new URLSearchParams(location.search).get('lang');
  var prefersZh = (navigator.languages || [navigator.language || '']).some(function (l) { return /^zh/i.test(l); });
  var lang = q === 'zh' || q === 'en' ? q : store('lmv_lang') || (prefersZh ? 'zh' : 'en');
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

  // the one bit of motion on the page: the key fobs sway once when their wall scrolls into view
  var wall = document.querySelector('.fobs');
  if (wall && 'IntersectionObserver' in window && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { wall.classList.add('nudge'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(wall);
  }

  // download sizes come from the files themselves, so there are no numbers to keep in sync
  var files = { setup: 'downloads/LetsMeetVerse-Setup-x64.exe', zip: 'downloads/LetsMeetVerse-Windows-x64.zip', linux: 'downloads/LetsMeetVerse-Linux-x64.zip' };
  if (location.protocol !== 'file:' && window.fetch) Object.keys(files).forEach(function (k) {
    fetch(files[k], { method: 'HEAD' }).then(function (r) {
      if (!r.ok) { if (k === 'linux') document.querySelectorAll('[data-dl-row="linux"]').forEach(function (e) { e.hidden = true; }); return; }
      var n = +r.headers.get('content-length');
      if (n) document.querySelectorAll('[data-size="' + k + '"]').forEach(function (e) { e.textContent = Math.round(n / 1048576) + ' MB'; });
    }).catch(function () {});
  });
})();
