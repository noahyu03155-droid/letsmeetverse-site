// letsmeetverse.com pages: English / 中文, the screenshot lightbox. No dependencies.
// English lives in the HTML; Chinese is below. 中文 is the default when the browser prefers Chinese. Another page adds its
// own Chinese strings as window.LMV_I18N = { zh: {…} } before this script, and its Chinese title as <html data-title-zh>.
// Whenever the language is set (also on load) the page gets a 'lmv:lang' event with the language in detail.
(function () {
  var ZH = {
    skip: '跳到正文',
    navHoods: '街区', navWays: '怎么玩', navDownload: '下载', navPlay: '开始玩', navDiary: '开发日志', navEA: '抢先体验', navEnter: '输入邀请码',
    heroTitle: '拿上钥匙，搬进你在洛杉矶的第一个家。',
    heroLede: '搬进属于你的第一间小公寓，交朋友、去咖啡店打工、布置小窝，从圣莫尼卡一路逛到市中心。',
    bannerAlt: 'LetsMeetVerse，洛杉矶治愈系生活模拟：一群Q版朋友走在种满棕榈树、铺着星星的洛杉矶人行道上',
    ctaEA: '获取抢先体验', ctaEASub: '输入邀请码就能玩',
    ctaDiary: '阅读开发日志', ctaDiarySub: '每次更新都有新内容',
    heroNote: '在浏览器里在线玩，电脑、平板、手机都可以（手机请横屏），也可以下载 Windows 版。',
    lifeTitle: '把这座城市过成你的生活',
    lifeLead: '在洛杉矶，日子按你的节奏过：缺钱就去上班，有钱就去逛街，路上遇到人就停下来聊两句。',
    life0t: '搬进新家', life0d: '选好街区、户型和楼层，前台已经把钥匙给你准备好了。',
    lifeA0: '前台把公寓钥匙交给新住户，朋友抱着搬家纸箱',
    life1t: '交朋友', life1d: '在街上打招呼、聊天、加好友，用游戏里的手机给他们发消息。',
    life2t: '去打工', life2d: '做咖啡、站收银、在后厨掌勺。赚金币、练技能，一步步升职。',
    life3t: '布置小窝', life3d: '先选好户型，再摆上沙发、台灯和绿植，还能在衣柜前换上新造型。',
    lifeA1: '两个朋友在海风码头旁的海滨咖啡座喝冰咖啡，第三个朋友挥着手走过来打招呼', lifeA2: '咖啡师隔着柜台递出一杯冰咖啡，窗外是码头', lifeA3: '温馨小公寓的剖面图：床、沙发、小厨房和浴室一应俱全，两个朋友在大窗边的茶几上摆一盆绿植，窗外是城市街景',
    hoodsTitle: '挑一个街区住下',
    hoodsLead: '你的第一间小公寓可以在这四个街区里任选。地图上还有中城和威尼斯，骑单车、坐公交或开车都能到。',
    h1n: '圣莫尼卡', h1d: '海滩、码头和海风。',
    h2n: '好莱坞', h2d: '星星人行道、老剧院和亮闪闪的招牌。',
    h3n: '韩国城', h3d: '宵夜、KTV，还有总是热热闹闹的咖啡店。',
    h4n: '洛杉矶市中心', h4d: '住在 loft 风公寓楼里看天际线。',
    hoodA1: '朋友们开着浅蓝色敞篷车经过码头边的海滨大道', hoodA2: '三个朋友带着一只金毛走在咖啡店外的粉色星星人行道上，身后山坡上是 LetsMeetVerse 字牌和天文台', hoodA3: '从公寓大堂望出去能看到韩国城路牌，朋友们正在领钥匙', hoodA4: '朋友们在小公寓里聚会，窗外是黄昏的市中心天际线',
    gameTitle: '游戏实景',
    gameLead: '上面是宣传插画，下面是网页版的真实截图。',
    shot1: '山脚下的 Lucky Palms', shot2: '码头上的旋转木马', shot3: '好莱坞的 Palm Motors 车行', shot4: '海边步道金币跑酷', shot5: '来一局 21 点', shot6: '你的第一间小公寓',
    shot1a: '阳光下中城街角的 Lucky Palms 赌场，周围是棕榈树，后面是山和天文台', shot2a: '晴天的码头：绿色屋顶的海风旋转木马馆、摩天轮和下面的沙滩', shot3a: '阳光下的好莱坞街角：棕榈树之间的玻璃汽车展厅和停车标志',
    shot4a: '玩家在两排棕榈树之间的海边步道上奔跑吃金币', shot5a: '赌场里面：居民坐在半月形绿色 21 点桌旁，墙边一排老虎机', shot6a: '从上方看温馨的小公寓：粉色的床、沙发、厨房角和墙上的画',
    waysTitle: '怎么玩',
    eaStatus: '抢先体验', diaryStatus: '每次更新',
    w1t: '在浏览器里在线玩', w1d: '和真实的玩家一起生活在洛杉矶：电脑、平板或手机上的 Chrome、Edge、Safari、Firefox 都可以。注册新账号需要抢先体验邀请码。',
    w2t: 'Windows 电脑版', w2d: '电脑版是属于你自己的单人小镇：全窗口，可以离线，进度保存在你的电脑上。还有一个测试中的 Linux 版。', w2b: '获取下载',
    w3t: '关注开发日志', w3d: '新的建筑、和朋友一起做的新事情、新来的邻居：每次更新改了什么，都配着截图写在这里。', w3b: '看看开发日志',
    eaTitle: '抢先体验开放中',
    eaLead: '有邀请码吗？输入后就能和洛杉矶的大家一起在线玩，还能下载 Windows 和 Linux 电脑版。',
    eaEnterSub: '解锁在线游玩和下载',
    eaHow: '还没有邀请码？我们会在<a href="diary/">开发日志</a>和社交账号上发给关注的朋友。',
    eaListLabel: '邀请码可以解锁的内容',
    eaL1: '<b>在线游玩</b>：在浏览器里认识真实的玩家，上班、买房、开店。',
    eaL2: '<b>Windows 版</b>：安装包或便携版 zip，一个可以离线玩的自己的小镇。',
    eaL3: '<b>Linux 版</b>（测试版），同样的电脑版。',
    backTop: '回到顶部', close: '关闭',
    footMade: '© 2026 LetsMeetVerse。在真实的洛杉矶，过一段治愈的生活。',
    footCredits: '插画为宣传美术，截图来自游戏本身。字体：Nunito、Fredoka 与 Bree Serif（SIL OFL）。电脑版基于 Neutralinojs。'
  };
  var PAGE = window.LMV_I18N || {};
  if (PAGE.zh) Object.keys(PAGE.zh).forEach(function (k) { ZH[k] = PAGE.zh[k]; });
  var EN = {};
  var nodes = document.querySelectorAll('[data-i18n]'), alts = document.querySelectorAll('[data-i18n-alt]'), labels = document.querySelectorAll('[data-i18n-label]');
  nodes.forEach(function (n) { EN[n.dataset.i18n] = n.innerHTML; });
  alts.forEach(function (n) { EN['alt:' + n.dataset.i18nAlt] = n.alt; });
  labels.forEach(function (n) { EN['label:' + n.dataset.i18nLabel] = n.getAttribute('aria-label'); });
  var titles = { en: document.title, zh: document.documentElement.getAttribute('data-title-zh') || 'LetsMeetVerse · 在真实的洛杉矶过治愈生活' };
  var LMV = window.LMV = window.LMV || {};
  function announce(lang) { LMV.lang = lang; try { document.dispatchEvent(new CustomEvent('lmv:lang', { detail: lang })); } catch (e) {} }

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function apply(lang) {
    var zh = lang === 'zh';
    nodes.forEach(function (n) { var k = n.dataset.i18n, v = zh ? ZH[k] : EN[k]; if (v != null) n.innerHTML = v; });
    alts.forEach(function (n) { var k = n.dataset.i18nAlt, v = zh ? ZH[k] : EN['alt:' + k]; if (v != null) n.alt = v; });
    labels.forEach(function (n) { var k = n.dataset.i18nLabel, v = zh ? ZH[k] : EN['label:' + k]; if (v != null) n.setAttribute('aria-label', v); });
    document.documentElement.lang = zh ? 'zh-CN' : 'en';
    document.title = titles[lang] || titles.en;
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    announce(lang);
  }
  var q = new URLSearchParams(location.search).get('lang');
  var prefersZh = (navigator.languages || [navigator.language || '']).some(function (l) { return /^zh/i.test(l); });
  var lang = q === 'zh' || q === 'en' ? q : store('lmv_lang') || (prefersZh ? 'zh' : 'en');
  if (lang !== 'en') apply(lang); else announce(lang);
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { lang = b.dataset.lang; store('lmv_lang', lang); apply(lang); });
  });

  // screenshots open large (any [data-full] button, also ones a page draws later)
  var box = document.querySelector('.lightbox');
  if (box && box.showModal) {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-full]'); if (!b) return;
      var im = box.querySelector('img'), small = b.querySelector('img'); im.src = b.dataset.full; im.alt = small ? small.alt : ''; box.showModal();
    });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  }

  // the one bit of motion on the page: the key fobs sway once when their wall scrolls into view
  var wall = document.querySelector('.fobs');
  if (wall && 'IntersectionObserver' in window && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { wall.classList.add('nudge'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(wall);
  }
})();
