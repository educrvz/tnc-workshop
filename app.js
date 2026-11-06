document.querySelectorAll('.copy').forEach((btn,i)=>{const pre=btn.closest('.prompt').querySelector('pre');btn.setAttribute('aria-label','Copiar prompt '+(i+1));btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pre.textContent.trim());btn.textContent='Copiado';btn.classList.add('copied');document.querySelector('[role=status]').textContent='Prompt copiado.';setTimeout(()=>{btn.textContent='Copiar';btn.classList.remove('copied')},1800)}catch(e){const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Selecionado';document.querySelector('[role=status]').textContent='Texto selecionado. Use Ctrl+C ou Cmd+C para copiar.'}})});document.querySelectorAll('.print').forEach(b=>b.addEventListener('click',()=>window.print()));
(()=>{const rail=document.getElementById('session-rail'),map=document.getElementById('session-map');if(!rail||!map)return;
const links=[...rail.querySelectorAll('a[data-s]')],secs=links.map(a=>document.getElementById(a.dataset.s));
new IntersectionObserver(([e])=>document.body.classList.toggle('rail-scrolled',!e.isIntersecting&&e.boundingClientRect.top<0)).observe(map);
let ticking=false;
function spy(){ticking=false;let cur=0;secs.forEach((el,i)=>{if(el&&el.getBoundingClientRect().top<innerHeight*0.35)cur=i});
links.forEach((a,i)=>{a.classList.toggle('now',i===cur);a.classList.toggle('past',i<cur);if(i===cur)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});
if(innerWidth<1240){const n=links[cur];rail.scrollLeft=n.offsetLeft-rail.clientWidth/2+n.offsetWidth/2}}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(spy)}},{passive:true});addEventListener('resize',spy);spy()})();
