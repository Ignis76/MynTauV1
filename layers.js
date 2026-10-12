'use strict';
(() => {
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const hero=document.querySelector('.layered-hero');
 const houseData={aframe:{image:(window.MYNTAU_ROOT + 'assets/aframe-reference.png'),alt:'A-frame - треугольный дом',capacity:'До 3 гостей',area:'32 м²',url:(window.MYNTAU_ROOT + 'cabins/a-frame.html'),caption:'ПОД ВЫСОКИМ ПОТОЛКОМ',title:'Больше воздуха<br>Больше вас',text:'Треугольный силуэт, тёплое дерево и большое окно. Собственное пространство для отдыха вдвоём или втроём.'},shell:{image:(window.MYNTAU_ROOT + 'assets/shell-reference.png'),alt:'Shell House - дом с овальным фасадом',capacity:'До 4 гостей',area:'38 м²',url:(window.MYNTAU_ROOT + 'cabins/shell.html'),caption:'АРХИТЕКТУРА ПЛАВНЫХ ЛИНИЙ',title:'Своя форма<br>Свой ритм',text:'Скульптурная оболочка, овальный стеклянный фасад и отдельная терраса. Необычный дом для компании до четырёх гостей.'}};
 let currentHouse='aframe',currentView='outside';
 const stage=document.querySelector('.lab-stage');
 function updateLab(){
  const d=houseData[currentHouse];
  document.querySelector('#lab-exterior-image').src=d.image;document.querySelector('#lab-exterior-image').alt=d.alt;
  document.querySelector('#lab-capacity').textContent=d.capacity;document.querySelector('#lab-area').textContent=d.area;document.querySelector('#lab-house-link').href=d.url;
  document.querySelector('.lab-caption').textContent=d.caption;document.querySelector('.lab-description h3').innerHTML=d.title;document.querySelector('.lab-description p').textContent=d.text;
  document.querySelector('.lab-exterior').hidden=currentView!=='outside';
  document.querySelectorAll('[data-lab-plan]').forEach(p=>p.hidden=currentView!=='plan'||p.dataset.labPlan!==currentHouse);
  document.querySelectorAll('[data-lab-house]').forEach(b=>{const active=b.dataset.labHouse===currentHouse;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));b.querySelector('.house-choice-state').textContent=active?'Сейчас открыт':'Посмотреть';b.querySelector('.house-choice-arrow').textContent=active?'✓':'→';});
  document.querySelectorAll('[data-lab-view]').forEach(b=>{const active=b.dataset.labView===currentView;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  stage.classList.remove('is-updating');requestAnimationFrame(()=>stage.classList.add('is-updating'));
 }
 document.querySelectorAll('[data-lab-house]').forEach(b=>b.addEventListener('click',()=>{currentHouse=b.dataset.labHouse;updateLab();}));
 document.querySelectorAll('[data-lab-view]').forEach(b=>b.addEventListener('click',()=>{currentView=b.dataset.labView;updateLab();}));
 const zones={sleep:'Большая кровать, мягкое бельё и утро, которое можно начать попозже.',cook:'Мини-кухня, посуда, чайник, чай и кофе. Готовьте любимые завтраки в своём ритме.',terrace:'Собственная терраса: выпить кофе, почитать книгу и просто побыть с видом на природу.'};
 document.querySelectorAll('[data-lab-zone]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#lab-zone-copy').textContent=zones[b.dataset.labZone];document.querySelectorAll('[data-lab-zone]').forEach(el=>{const active=el===b;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});}));
 if(matchMedia('(pointer:fine)').matches){let frame;hero.addEventListener('pointermove',event=>{if(reduce.matches)return;const r=hero.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{hero.style.setProperty('--pan-x',`${x*-13}px`);hero.style.setProperty('--pan-y',`${y*-10}px`);});},{passive:true});hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);hero.style.setProperty('--pan-x','0px');hero.style.setProperty('--pan-y','0px');});}
 let pending=false;
 function scrollLayers(){pending=false;if(reduce.matches)return;const r=hero.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)hero.style.setProperty('--landscape-lift',`${Math.max(0,-r.top)*-.055}px`);}
 window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(scrollLayers);}},{passive:true});
})();
