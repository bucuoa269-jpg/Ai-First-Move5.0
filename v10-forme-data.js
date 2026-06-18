(function(){
  const d = window.AI_FIRSTMOVE_V8 || {};
  const $ = (s,r=document)=>r.querySelector(s);
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function after(sel, html){ const el=$(sel); if(el) el.insertAdjacentHTML('afterend', html); }
  function updateBrand(){
    document.title = d.naming?.title || 'AI先机｜AI淘金图谱';
    const meta = document.querySelector('meta[name="description"]'); if(meta) meta.content='AI先机｜AI淘金图谱：用神农需求证据引擎，把AI热点、社群线索、深度访谈和城市资源转成可验证的青年搞钱机会。';
    document.querySelectorAll('.brand small').forEach(x=>x.textContent='AI To Money Map');
    const h1=document.querySelector('.hero h1'); if(h1) h1.innerHTML='AI时代不是只看热闹，<span>而是找到可验证的淘金线索。</span>';
    const p=document.querySelector('.hero-copy p'); if(p) p.textContent='AI先机升级为 AI淘金图谱：聚合线上社群、线下沙龙、小红书/抖音商业化、国内深度访谈、一手官方入口和城市资源，用神农证据引擎扫描真假机会。';
    const nav=document.querySelector('.desktop-nav');
    if(nav && !nav.querySelector('[href="#v8-shennong"]')) nav.insertAdjacentHTML('afterbegin','<a href="#v8-map">淘金图谱</a><a href="#v8-shennong">神农扫描</a><a href="#v8-communities">社群/沙龙</a>');
  }
  function renderIntro(){
    after('.hero', `<section class="section container" id="v8-map"><div class="v8-hero"><span class="v8-kicker">${esc(d.version)}</span><h2>${esc(d.naming?.title)}</h2><p>${esc(d.naming?.decision)}</p><div class="v8-chipline"><span>线上社群不是洪水猛兽，但必须核验</span><span>线下沙龙是高质量连接入口</span><span>深度访谈是矿脉，不是结论</span><span>用神农先杀伪需求</span></div></div></section>`);
  }
  function renderMoneyMap(){
    const cards=(d.moneyMap||[]).map(x=>`<article class="v8-card v8-money-card"><div class="v8-title-row"><div><span class="v8-level">${esc(x.level)} · ${esc(x.platform)}</span><h3>${esc(x.title)}</h3></div><div><strong>${esc(x.heat)}</strong><small>热度</small></div></div><div class="v8-hot" style="--heat:${Number(x.heat||0)}"><b></b></div><p><b>谁付钱：</b>${esc(x.payer)}</p><p><b>交付物：</b>${esc(x.deliverable)}</p><div class="v8-mini"><div><b>证据栈</b><span>${esc((x.evidenceStack||[]).join(' / '))}</span></div><div><b>第一步</b><span>${esc(x.firstMove)}</span></div><div><b>停止条件</b><span>${esc(x.killRule)}</span></div></div><div class="v8-links">${(x.sourceUrls||[]).map((u,i)=>`<a href="${esc(u)}" target="_blank" rel="noopener">来源${i+1} ↗</a>`).join('')}</div></article>`).join('');
    after('#v8-map', `<section class="section container"><div class="section-head"><div><h2>淘金线索地图</h2><p>重点不是“项目大全”，而是每条都写清付款人、交付物、证据栈和停止条件。</p></div></div><div class="v8-grid">${cards}</div></section>`);
  }
  function modeCards(){ return (d.shennongModes||[]).map(x=>`<article><b>${esc(x.name)}</b><p>${esc(x.samples)}</p><small>${esc(x.decision)}</small></article>`).join(''); }
  function analyzeIdea(text){
    const q=text.toLowerCase(); let score=42; const plus=[]; const minus=[];
    const rules=[['小红书|抖音|视频|内容|漫画|IP',14,'平台内容可小样本测试'],['商家|客户|付费|接单|商单|订单',18,'出现付款人/交易词'],['城市|成都|杭州|长沙|深圳|上海|北京|线下|沙龙',12,'有城市/线下触达场景'],['官网|官方|链接|数据|访谈|播客|评论',12,'意识到证据来源'],['模板|服务|诊断|样片|报告|PPT|BP',12,'有可交付物'],['7天|测试|验证|访谈|定金|预售',12,'有验证动作']];
    rules.forEach(([re,pts,why])=>{ if(new RegExp(re).test(q)){score+=pts;plus.push(why);} });
    const bad=[['保证|稳赚|躺赚|暴富|月入',18,'出现收益承诺词，必须降级'],['矩阵|搬运|洗稿|侵权|爬取',18,'可能涉及平台/版权风险'],['app|小程序|开发一个平台',10,'可能过早进入开发'],['社群',4,'社群可用，但不能当作付款证明']];
    bad.forEach(([re,pts,why])=>{ if(new RegExp(re).test(q)){score-=pts;minus.push(why);} });
    score=Math.max(5,Math.min(96,score));
    let decision=score>=78?'做15分钟初筛或30分钟证据扫描':score>=58?'继续调查，不要开发':score>=38?'只做内容测试或访谈':'先杀死/暂缓';
    return {score,decision,plus,minus};
  }
  function renderScanner(){
    const gates=(d.shennong?.gates||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    after('#v8-map', `<section class="section container" id="v8-shennong"><div class="section-head"><div><h2>神农机会扫描器</h2><p>${esc(d.shennong?.promise)}</p></div></div><div class="v8-scanner"><article class="v8-card"><span class="v8-level">${esc(d.shennong?.name)}</span><h3>输入你的搞钱/创业想法</h3><textarea id="v8Idea" placeholder="例如：我想在成都做AI短视频样片服务，面向本地咖啡店和活动主理人，先免费做3个样板，看有没有人愿意付诊断费。"></textarea><div class="v8-chipline"><button class="v8-btn" id="v8ScanBtn">开始扫描</button><button class="v8-btn light" id="v8ExampleBtn">填入示例</button></div><div class="v8-mode-row">${modeCards()}</div></article><article class="v8-scan-result" id="v8ScanResult"><h3>扫描结果</h3><p>输入想法后，系统会按神农原则输出：结论、证据门槛、反证风险、下一步实验。</p><ul>${gates}</ul></article></div></section>`);
    const idea=$('#v8Idea'), result=$('#v8ScanResult');
    $('#v8ExampleBtn').onclick=()=>{idea.value='我想在杭州做GEO/AI搜索可见度诊断，面向AI工具站和独立开发者，先做3份免费诊断报告，验证有没有人愿意付费。'};
    $('#v8ScanBtn').onclick=()=>{ const text=idea.value.trim(); if(!text){idea.focus();return} const r=analyzeIdea(text); result.innerHTML=`<h3>${esc(r.decision)}</h3><div class="score">${r.score}</div><p>这是本地启发式扫描，不代表市场结论。下一步必须补证据账本。</p><h4>支持信号</h4><ul>${(r.plus.length?r.plus:['暂未发现强支持信号']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h4>反方风险</h4><ul>${(r.minus.length?r.minus:['仍需主动搜索失败案例、差评、退款、替代方案']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h4>下一步</h4><p>选择15分钟初筛：找20-30个样本、50条评论、5个竞品；若没有付款人或可交付物，只做内容测试，不开发产品。</p>`; };
  }
  function renderCommunities(){
    const cards=(d.salonsAndCommunities||[]).map(x=>`<article class="v8-card v8-salon-card"><span class="v8-level">${esc(x.level)} · ${esc(x.city)}</span><h3>${esc(x.title)}</h3><p><b>${esc(x.type)}</b>：${esc(x.angle)}</p><p><b>风险边界：</b>${esc(x.risk)}</p></article>`).join('');
    after('#v8-shennong', `<section class="section container" id="v8-communities"><div class="section-head"><div><h2>线上社群 / 线下沙龙 / 搭子活动，不排斥，只核验</h2><p>社群可以是信息场、连接场、案例场；粗门这类同城活动平台可以是沙龙组织工具。但本站不替任何社群、课程或活动背书。</p></div></div><div class="v8-grid">${cards}</div></section>`);
  }
  function renderInterviews(){
    const rows=(d.interviews||[]).map(x=>`<div class="v8-bar-row"><span>${esc(x.show)}</span><div class="v8-track"><span style="--score:${x.level==='B'?76:86}"></span></div><b>${esc(x.level)}</b></div><p><b>${esc(x.topic)}</b>：${esc(x.value)}；验证：${esc(x.verification)}</p>`).join('');
    after('#v8-communities', `<section class="section container"><div class="v8-radar"><article class="v8-card"><h2>深度访谈矿脉</h2><p>访谈给方向，不给结论；要把嘉宾路径拆成付款人、交付物、渠道、风险和7天测试。</p>${rows}</article><article class="v8-card"><h2>证据层级可视化</h2><div class="v8-bar-row"><span>官方入口</span><div class="v8-track"><span style="--score:95"></span></div><b>S</b></div><div class="v8-bar-row"><span>媒体/研究</span><div class="v8-track"><span style="--score:82"></span></div><b>A</b></div><div class="v8-bar-row"><span>深访/案例</span><div class="v8-track"><span style="--score:72"></span></div><b>B</b></div><div class="v8-bar-row"><span>社交线索</span><div class="v8-track"><span style="--score:48"></span></div><b>C</b></div><div class="v8-bar-row"><span>高风险承诺</span><div class="v8-track"><span style="--score:20"></span></div><b>D</b></div></article></div></section>`);
  }
  function renderDisclaimer(){
    after('#v8-communities', `<section class="section container"><div class="v8-disclaimer"><h3>社群/课程/项目免责声明</h3><ul><li>本站不会因为某个社群、课程或博主有影响力，就把它标成“必买”。</li><li>线上社群和AI项目确实可能产生机会：信息、人脉、案例、工具、交易和合作；但也可能存在夸大收益、交付不清、退款困难和情绪营销。</li><li>所有社群信息只作为“信息差线索”，你需要自行核验公开口碑、交付内容、价格、退款规则、适配度和机会成本。</li><li>本站的目标不是让你少见人，而是让你更高质量地见人：线上筛选，线下连接，证据决策。</li></ul></div></section>`);
  }
  function init(){ updateBrand(); renderIntro(); renderMoneyMap(); renderScanner(); renderCommunities(); renderDisclaimer(); renderInterviews(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
