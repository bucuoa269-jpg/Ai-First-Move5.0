(() => {
  const v6 = window.AI_FIRSTMOVE_V6 || {};
  const $ = (s, r=document) => r.querySelector(s);
  const esc = (v='') => String(v).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
  const gradeClass = g => String(g || 'B').toLowerCase().replace('+','');
  let selectedCity = (v6.cityScores || [])[0]?.city || '成都';
  function insertAfter(anchor, html){ const el = $(anchor); if(el) el.insertAdjacentHTML('afterend', html); }
  function renderFocus(){
    const cards = (v6.firstPrinciples||[]).map(x => `<article class="v6-path-card"><strong>${esc(x.icon)}</strong><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></article>`).join('');
    const reasons = (v6.updatedReasons||[]).map(x=>`<span>${esc(x)}</span>`).join('');
    insertAfter('#stats', `<section class="section container" id="treasure-map"><div class="v6-focus"><span class="eyebrow">V6 · 淘金地图优先 / 城市资源优先</span><h2>不要只追热点，<br>要追“真实付款信号”。</h2><p>这版把网站重心从“比赛导航”升级为“青年AI淘金地图”：城市资源、平台商业化入口、深度访谈、反方风险和7天验证动作放在更前面。</p><div class="v6-update-bar"><span>站点生成：${esc(v6.generatedAt||'')}</span><span>路径：main 保存代码 / GitHub Actions 发布</span><span>频率：约每6小时更新</span></div><div class="v6-path-grid">${cards}</div></div></section>`);
    insertAfter('#treasure-map', `<section class="section container"><div class="v6-name-card"><div class="section-head"><div><h2>名字建议：${esc(v6.brand?.recommendedName||'AI先机')}</h2><p>${esc(v6.brand?.decision||'')}</p></div><span class="xhs-douyin-tag">${esc(v6.brand?.slogan||'一起造浪')}</span></div><p>${esc(v6.brand?.mission||'')}</p><div class="v6-update-bar">${reasons}</div></div></section>`);
  }
  function cityButtons(){return (v6.cityScores||[]).map(c=>`<button data-city="${esc(c.city)}" class="${c.city===selectedCity?'active':''}"><span><b>${esc(c.city)}</b><small>${esc((c.tags||[]).slice(0,2).join(' / '))}</small></span><strong>${c.score}</strong></button>`).join('');}
  function bar(label, value){return `<div class="v6-bar-row"><span>${esc(label)}</span><div class="v6-bar-track"><div class="v6-bar-fill" style="width:${Math.max(0,Math.min(100,value||0))}%"></div></div><b>${value}</b></div>`;}
  function renderCityDetail(){
    const city = (v6.cityScores||[]).find(c=>c.city===selectedCity) || (v6.cityScores||[])[0]; if(!city) return;
    const resource = (v6.cityResourceCards||[]).find(c=>c.city===city.city) || {};
    const tags = (city.tags||[]).map(t=>`<span>${esc(t)}</span>`).join('');
    const days = (resource.sevenDays||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    const html = `<div class="v6-city-head"><div><span class="eyebrow">城市淘金雷达</span><h2>${esc(city.city)}：${esc(resource.angle || 'AI机会')}</h2><p>${esc(resource.opportunity || city.action)}</p><div class="v6-tags">${tags}</div></div><div class="v6-score-ring" style="--score:${city.score}%;"><strong>${city.score}</strong></div></div><div class="v6-bar-set">${bar('内容红利',city.content)}${bar('黑客松',city.hackathon)}${bar('岗位/实习',city.jobs)}${bar('本地客户',city.local)}</div><div class="v6-action-grid"><article><b>第一客户</b><p>${esc(resource.firstCustomer||'本地客户/校园团队')}</p></article><article><b>7天验证</b><ul>${days}</ul></article><article><b>停止条件</b><p>${esc(resource.stop||'没有真实反馈就换方向。')}</p></article></div><div class="v6-side-note" style="margin-top:14px"><b>证据说明：</b>${esc(resource.proof || city.sourceStatus || '编辑评分，需继续核验。')}</div>`;
    const target = $('#v6CityDetail'); if(target) target.innerHTML = html;
    const list = $('#v6CityList'); if(list) list.innerHTML = cityButtons();
  }
  function renderCities(){
    insertAfter('#gold-rush-map', `<section class="section container" id="city-alpha"><div class="section-head"><div><h2>城市淘金地图</h2><p>让成都、杭州、长沙、上海、深圳、北京的大学生看到“自己城市附近的资源”。评分是编辑信号，不是客观排名。</p></div><a href="#cities">旧版城市卡 →</a></div><div class="v6-matrix"><aside class="v6-city-list" id="v6CityList"></aside><article class="v6-city-detail" id="v6CityDetail"></article></div></section>`);
    renderCityDetail();
    document.addEventListener('click', e=>{ const btn = e.target.closest('[data-city]'); if(!btn) return; selectedCity = btn.dataset.city; renderCityDetail(); });
  }
  function renderTrends(){
    const rows = (v6.trackTrends||[]).map(t=>`<div class="v6-chart-row"><div><b>${esc(t.track)}</b><small>${esc(t.verify)}</small></div><div class="v6-chart-track"><div class="v6-chart-fill" style="width:${t.heat}%"></div></div><strong>${t.heat}</strong></div>`).join('');
    const top = (v6.trackTrends||[]).slice(0,3).map(t=>`<li><b>${esc(t.track)}</b>：${esc(t.first)}</li>`).join('');
    insertAfter('#city-alpha', `<section class="section container" id="track-alpha"><div class="section-head"><div><h2>赛道趋势可视化</h2><p>用热度、可信度、执行难度拆开看，避免被单个爆款案例带偏。</p></div></div><div class="v6-trend-grid"><article class="v6-chart-card"><h3>淘金赛道热度 / 编辑评分</h3><div class="v6-chart-list">${rows}</div></article><article class="v6-chart-card"><h3>本周最该做的3个验证</h3><ol>${top}</ol><div class="v6-side-note">热度不是收益承诺；所有赛道都必须用第一客户和付费意愿验证。</div></article></div></section>`);
  }
  function renderInterviews(){
    const cards = (v6.interviewSources||[]).map(x=>`<article class="v6-interview-card"><div class="v6-meta"><span class="grade ${gradeClass(x.level)}">${esc(x.level)}</span><span>${esc(x.platform)}</span><span>${esc(x.publishedAt)}</span></div><h3>${esc(x.title)}</h3><p><b>可迁移价值：</b>${esc(x.value)}</p><p><b>不能照搬：</b>${esc(x.caution)}</p><a class="v6-link" href="${esc(x.url)}" target="_blank" rel="noopener">打开原始来源 →</a></article>`).join('');
    insertAfter('#track-alpha', `<section class="section container" id="interview-alpha"><div class="section-head"><div><h2>国内深度访谈雷达</h2><p>播客、访谈和一手采访不是结论，而是发现机会的矿脉。每条都要标注可迁移价值和不可照搬条件。</p></div></div><div class="v6-interview-grid">${cards}</div></section>`);
  }
  function renderSpecial(){
    const cards = (v6.specialOpportunities||[]).map(x=>`<article class="v6-special-card"><div class="v6-meta"><span class="grade ${gradeClass(x.level)}">${esc(x.level)}</span><span>${esc(x.city)}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.why)}</p><a class="v6-link" href="${esc(x.url)}" target="_blank" rel="noopener">官方/原始入口 →</a></article>`).join('');
    const comp = $('#competition');
    if(comp && !comp.querySelector('.special-competition-note')) comp.insertAdjacentHTML('afterbegin', `<div class="special-competition-note"><b>比赛已降级为“特殊机会”</b>淘金地图负责真实付款与副业验证；比赛/黑客松负责作品集、奖金、官方资源、团队和面试素材。</div>`);
    insertAfter('#interview-alpha', `<section class="section container" id="special-alpha"><div class="section-head"><div><h2>特殊机会：比赛 / 黑客松 / 官方挑战</h2><p>不把比赛当主线，但把它作为大学生最容易拿到官方资源和作品集的入口。</p></div></div><div class="v6-special-grid">${cards}</div></section>`);
  }
  function init(){renderFocus(); renderCities(); renderTrends(); renderInterviews(); renderSpecial();}
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
