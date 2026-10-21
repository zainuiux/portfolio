
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const NS = 'http://www.w3.org/2000/svg';
  const root = document.documentElement;

  const bar = document.createElement('div');
  bar.id = 'prog'; bar.setAttribute('aria-hidden', 'true'); document.body.prepend(bar);
  let tick = false;
  const prog = () => { const h = root.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')'; tick = false; };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(prog); } }, { passive: true });
  prog();

  const rg = document.getElementById('ribbons');
  if (rg) for (let i = 0; i < 16; i++) {
    const dy = i * 4.5, p = document.createElementNS(NS, 'path');
    p.setAttribute('d', `M-20 ${150 + dy} C70 ${70 + dy * 1.1} 150 ${90 + dy * .7} 220 ${150 + dy} S340 ${200 - dy * .2} 420 ${110 + dy * .9}`);
    p.setAttribute('class', 'rib'); p.setAttribute('opacity', (.75 - i * .035).toFixed(2));
    p.style.setProperty('--k', i); rg.appendChild(p);
  }

  if (RM) { const w = document.getElementById('waveSvg'); if (w && w.pauseAnimations) w.pauseAnimations(); return; }
  root.classList.add('anim');

  ['.pg .card', '.steps .step', '.sg .st'].forEach(s => $$(s).forEach((e, i) => { e.style.setProperty('--d', i); e.style.setProperty('--k', i); }));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  ['.sk-card', '.ap li', '.chips span', '.ci li'].forEach(s => $$(s).forEach((e, i) => { e.classList.add('rv-i'); e.style.setProperty('--d', i); io.observe(e); }));

  const h1 = document.querySelector('h1');
  if (h1) {
    let k = 0; const frag = document.createDocumentFragment();
    h1.childNodes.forEach(n => {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(t => {
        if (!t) return;
        if (/^\s+$/.test(t)) frag.appendChild(document.createTextNode(' '));
        else { const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--k', k++); s.textContent = t; frag.appendChild(s); }
      });
      else if (n.nodeType === 1) { const s = document.createElement('span'); s.className = 'w ' + n.className; s.style.setProperty('--k', k++); s.textContent = n.textContent; frag.appendChild(s); }
    });
    h1.replaceChildren(frag);
  }

  const sigT = document.querySelector('.sig-t');
  if (sigT) {
    const txt = sigT.textContent.trim(); sigT.textContent = ''; let k = 0;
    [...txt].forEach(c => {
      if (c === ' ') { sigT.append(' '); return; }
      const t = document.createElementNS(NS, 'tspan'); t.setAttribute('class', 'ch'); t.style.setProperty('--k', k++); t.textContent = c; sigT.appendChild(t);
    });
  }

  $$('.hand').forEach(el => {
    const keep = el.querySelector('svg'); const lines = []; let cur = '';
    el.childNodes.forEach(n => { if (n.nodeType === 3) cur += n.textContent; else if (n.nodeName === 'BR') { lines.push(cur); cur = ''; } });
    if (cur.trim()) lines.push(cur);
    el.textContent = '';
    lines.forEach((t, i) => { const s = document.createElement('span'); s.className = 'ln'; s.style.setProperty('--k', i); s.textContent = t.trim(); el.appendChild(s); });
    if (keep) el.appendChild(keep);
  });
  const wio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wr'); wio.unobserve(e.target); } }), { threshold: .6 });
  $$('.hand, .sig').forEach(e => wio.observe(e));

  function count(el, delay) {
    const m = el.textContent.trim().match(/^(\d+(?:\.\d+)?)(.*)$/); if (!m) return;
    const t = parseFloat(m[1]), dec = (m[1].split('.')[1] || '').length, w = m[1].split('.')[0].length, suf = m[2];
    const fmt = v => { const [a, b] = v.toFixed(dec).split('.'); return a.padStart(w, '0') + (b !== undefined ? '.' + b : '') + suf; };
    el.textContent = fmt(0);
    const run = () => { const s = performance.now(); const f = n => { const p = Math.min(1, (n - s) / 1800); el.textContent = fmt(t * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
    const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { o.disconnect(); setTimeout(run, delay); } }, { threshold: .6 });
    o.observe(el);
  }
  $$('.st b').forEach(b => count(b, 200));
  $$('.kp b').forEach((b, i) => count(b, 1100 + i * 150));

  $$('.card,.ap,.tc,.sk-card').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px');
      if (FINE && el.dataset.p) { el.style.setProperty('--ry', ((x / r.width - .5) * 7) + 'deg'); el.style.setProperty('--rx', (-(y / r.height - .5) * 7) + 'deg'); }
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });

  const steps = document.getElementById('steps');
  if (steps) {
    const dot = document.createElement('i'); dot.className = 'dot'; dot.setAttribute('aria-hidden', 'true'); steps.appendChild(dot);
    const ics = $$('.ic', steps), mq = matchMedia('(max-width:900px)');
    let on = false, t0 = 0, c = [], vert = false, a0 = 0, a1 = 0;
    const measure = () => {
      vert = mq.matches; const sr = steps.getBoundingClientRect();
      c = ics.map(e => { const r = e.getBoundingClientRect(); return vert ? r.top + r.height / 2 - sr.top : r.left + r.width / 2 - sr.left; });
      a0 = c[0] - 36; a1 = c[c.length - 1] + 36;
    };
    new ResizeObserver(measure).observe(steps);
    const DUR = 7000;
    const loop = n => {
      if (!on) return;
      if (n >= t0) {
        const p = ((n - t0) % DUR) / DUR, x = a0 + (a1 - a0) * p;
        dot.style.opacity = Math.min(1, p / .06, (1 - p) / .06);
        dot.style.transform = vert ? 'translate(24.5px,' + (x - 2.5) + 'px)' : 'translate(' + (x - 2.5) + 'px,25.5px)';
        ics.forEach((e, i) => e.parentElement.classList.toggle('hit', Math.abs(x - c[i]) < 30));
      }
      requestAnimationFrame(loop);
    };
    new IntersectionObserver(es => {
      on = es[0].isIntersecting;
      if (on) { measure(); t0 = performance.now() + 1400; requestAnimationFrame(loop); }
      else { dot.style.opacity = 0; ics.forEach(e => e.parentElement.classList.remove('hit')); }
    }, { threshold: .2 }).observe(steps);
  }
})();
