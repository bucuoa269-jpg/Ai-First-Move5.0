(function(){
  const v7 = window.AI_FIRSTMOVE_V7 || {};
  const $ = (s, r=document)=>r.querySelector(s);
  const esc = (x)=>String(x ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const insertAfter = (selector, html)=>{ const el = $(selector); if(el && !document.querySelector(html.match(/id="([^"]+)"/)?.[1] ? '#'+html.match(/id="([^"]+)"/)[1] : '__never__')) el.insertAdjacentHTML('afterend', html); };
  let activeCity = '成都';
  function sourceTotal(v){ return (v.official||0)+(v.media||0)+(v.interview||0)+(v.social||0)+(v.risk||0); }
  function bar(label, value, max){ const pct = Math.max(4, Math.min(100, Math.round(value / Math.max(1,max) * 100))); return `<div class="v7-stack-row"><span>${esc(label)}</span><div class="v7-stack-track"><div class="v7-stack-fill" style="width:${pct}%"></div></div><b>${esc(value)}</b></div>`; }
  function renderBrief(){
    const pillars = (v7.firstPrincipleFixes||[]).map((x,i)=>`<article class="v7-pillar"><small>${esc(x.level)} · ${String(i+1).padStart(2,'0')}</small><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></article>`).join('');
    const diag = (v7.deploymentDiagnosis||[]).map(x=>`<li><b>${esc(x.symptom)}</b>：${esc(x.cause)}；${esc(x.fix)}</li>`).join('');
    insertAfter('.hero', `<section class="section container v7-anchor" id="v7-strategy"><div class="v7-brief"><span class="v7-kicker">V7 · 第一性原理重排</span><h2>${esc(v7.naming?.finalName || 'AI先机｜城市青年AI淘金地图')}</h2><p>${esc(v7.naming?.decision || '')}</p><div class="v7-name-row"><article class="v7-name-card"><strong>核心方向：城市 × 付款人 × 深度访谈 × 交叉验证</strong><span>不是追热点，不是推社群，不是比赛导航；先帮助大学生在自己城市附近找到可验证的第一位客户、第一场活动、第一份作品集。</span><div class="v7-actions"><a class="v7-btn v7-primary" href="#v7-city-map">看城市资源</a><a class="v7-btn" href="#v7-social-economy">看社交经济线索</a><a class="v7-btn" href="#v7-interviews">看深度访谈</a></div></article><article class="v7-debug-card"><h3>为什么看起来17小时前没更新？</h3><ul>${diag}</ul></article></div><div class="v7-pillar-grid">${pillars}</div></div></section>`);
  }
  function cityButtons(){ return (v7.cityGoldRadar||[]).map(c=>`<button class="${c.city===activeCity?'active':''}" data-v7-city="${esc(c.city)}"><span><b>${esc(c.city)}</b><small>${esc(c.persona)}</small></span><strong>${esc(c.score)}</strong></button>`).join(''); }
  function renderCity(){
    const city = (v7.cityGoldRadar||[]).find(c=>c.city===activeCity) || (v7.cityGoldRadar||[])[0]; if(!city) return;
    const v = city.verification || {}; const max = Math.max(1, ...Object.values(v));
    const metrics = [bar('官方资源',v.official||0,max),bar('媒体/研究',v.media||0,max),bar('访谈证据',v.interview||0,max),bar('社交线索',v.social||0,max),bar('风险证据',v.risk||0,max)].join('');
    const opportunities = (city.opportunities||[]).map(x=>`<span>${esc(x)}</span>`).join('');
    const resources = (city.resources||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    const days = (city.sevenDays||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    const links = (city.links||[]).map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)} →</a>`).join('');
    const html = `<div class="v7-city-top"><div><span class="v7-kicker">城市淘金雷达 · ${esc(city.city)}</span><h3>${esc(city.persona)}</h3><p>${esc(city.thesis)}</p><div class="v7-chip-row">${opportunities}</div></div><div class="v7-score" style="--score:${city.score}%"><strong>${city.score}</strong></div></div><div class="v7-metric-grid"><article class="v7-metric"><b>${sourceTotal(v)}</b><span>证据节点</span></article><article class="v7-metric"><b>${v.official||0}</b><span>S级/官方</span></article><article class="v7-metric"><b>${v.interview||0}</b><span>深访线索</span></article><article class="v7-metric"><b>${v.social||0}</b><span>社交线索</span></article><article class="v7-metric"><b>${v.risk||0}</b><span>风险证据</span></article></div><div class="v7-verify-grid"><article class="v7-verify-card"><h3>交叉验证栈</h3>${metrics}<p class="muted">${esc(city.sourceNote)}</p></article><article class="v7-verify-card"><h3>城市资源入口</h3><ul>${resources}</ul><div class="v7-links">${links}</div></article></div><div class="v7-section-grid"><article class="v7-mini-card"><b>第一客户</b><p>${esc(city.firstCustomer)}</p></article><article class="v7-mini-card"><b>7天验证</b><ul>${days}</ul></article><article class="v7-mini-card"><b>编辑判断</b><p>优先做低成本样板，拿真实反馈，不先囤课、不先进社群、不先买工具。</p></article></div>`;
    const board = $('#v7CityBoard'); if(board) board.innerHTML = html;
    const panel = $('#v7CityPanel'); if(panel) panel.innerHTML = cityButtons();
  }
  function renderCityMap(){
    insertAfter('#v7-strategy', `<section class="section container v7-anchor" id="v7-city-map"><div class="section-head"><div><h2>城市资源 × 淘金地图</h2><p>重点加强成都、杭州、长沙、上海、深圳、北京：让本地大学生看到附近可触达的客户、活动、访谈和官方资源。</p></div></div><div class="v7-map-grid"><aside class="v7-city-panel" id="v7CityPanel"></aside><article class="v7-city-board" id="v7CityBoard"></article></div></section>`);
    renderCity();
    document.addEventListener('click', e=>{ const btn = e.target.closest('[data-v7-city]'); if(!btn) return; activeCity = btn.dataset.v7City; renderCity(); });
  }
  function renderSocial(){
    const cards = (v7.socialEconomy||[]).map(x=>`<article class="v7-social-card"><span class="v7-level">${esc(x.level)} · ${esc(x.platform)}</span><h3>${esc(x.title)}</h3><p><b>信号：</b>${esc(x.signal)}</p><p><b>可交付物：</b>${esc(x.product)}</p><p><b>第一步：</b>${esc(x.firstMove)}</p><p><b>风险：</b>${esc(x.risk)}</p><div class="v7-links">${(x.sources||[]).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} →</a>`).join('')}</div></article>`).join('');
    insertAfter('#v7-city-map', `<section class="section container v7-anchor" id="v7-social-economy"><div class="section-head"><div><h2>变现线索地图：小红书 / 抖音 / 搭子经济</h2><p>只做信息线索和方法拆解，不推荐任何收费社群；社交平台内容默认C级，必须继续交叉验证。</p></div></div><div class="v7-social-grid">${cards}</div></section>`);
  }
  function renderCharts(){
    const rows = (v7.visualizationSpec?.tracks||[]).map(t=>`<div class="v7-track-row"><div><b>${esc(t.name)}</b><small>${esc(t.cityFit)}</small></div><div class="v7-track"><div class="v7-track-fill" style="width:${esc(t.heat)}%"></div></div><strong>${esc(t.heat)}</strong></div>`).join('');
    const cautions = (v7.visualizationSpec?.tracks||[]).map(t=>`<li><b>${esc(t.name)}</b>：${esc(t.caution)}</li>`).join('');
    insertAfter('#v7-social-economy', `<section class="section container v7-anchor" id="v7-visual"><div class="section-head"><div><h2>赛道趋势可视化</h2><p>图表只显示编辑热度与验证方向，不代表收益承诺。</p></div></div><div class="v7-chart-grid"><article class="v7-chart-card"><h3>淘金赛道热度</h3>${rows}</article><article class="v7-chart-card"><h3>反方风险提示</h3><ul>${cautions}</ul><div class="v7-disclaimer">所有趋势都必须用“第一客户是否愿意付费”来验证。</div></article></div></section>`);
  }
  function renderInterviews(){
    const cards = (v7.interviewMining||[]).map(x=>`<article class="v7-interview-card"><span class="v7-level">${esc(x.level)} · ${esc(x.platform)}</span><h3>${esc(x.title)}</h3><p><b>可迁移价值：</b>${esc(x.value)}</p><p><b>验证方式：</b>${esc(x.verify)}</p></article>`).join('');
    insertAfter('#v7-visual', `<section class="section container v7-anchor" id="v7-interviews"><div class="section-head"><div><h2>国内深度访谈矿脉</h2><p>重点收集近期播客、一手采访、创业者复盘和影响力人物，但不把访谈等同于事实。</p></div></div><div class="v7-interview-grid">${cards}</div></section>`);
  }
  function renderDisclaimer(){
    const lis = (v7.disclaimers||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    insertAfter('#v7-interviews', `<section class="section container"><div class="v7-disclaimer"><h3>社群与信息差免责声明</h3><ul>${lis}</ul></div></section>`);
  }
  function updateNav(){
    const nav = document.querySelector('.desktop-nav');
    if(nav && !nav.querySelector('[href="#v7-city-map"]')){
      nav.insertAdjacentHTML('afterbegin','<a href="#v7-strategy">V7定位</a><a href="#v7-city-map">城市淘金</a><a href="#v7-social-economy">变现线索</a>');
    }
    const title = document.querySelector('title'); if(title) title.textContent = 'AI先机｜城市青年AI淘金地图';
  }
  function init(){ updateNav(); renderBrief(); renderCityMap(); renderSocial(); renderCharts(); renderInterviews(); renderDisclaimer(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
