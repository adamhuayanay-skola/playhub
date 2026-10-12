const GAMES=[
{id:'snake',title:'Snake',img:'https://picsum.photos/seed/snakehub/400/400',category:'arcade',playable:true,file:'games/snake.html',popular:true},
{id:'2048',title:'2048',img:'https://picsum.photos/seed/2048hub/400/400',category:'puzzle',playable:true,file:'games/2048.html',popular:true},
{id:'tetris',title:'Tetris',img:'https://picsum.photos/seed/tetrishub/400/400',category:'puzzle',playable:true,file:'games/tetris.html',popular:true},
{id:'flappy',title:'Flappy Bird',img:'https://picsum.photos/seed/flappyhub/400/400',category:'arcade',playable:true,file:'games/flappy.html',popular:true},
{id:'pong',title:'Pong',img:'https://picsum.photos/seed/ponghub/400/400',category:'arcade',playable:true,file:'games/pong.html',popular:true},
{id:'breakout',title:'Breakout',img:'https://picsum.photos/seed/breakouthub/400/400',category:'arcade',playable:true,file:'games/breakout.html',popular:true},
{id:'minesweeper',title:'Minesweeper',img:'https://picsum.photos/seed/minehub/400/400',category:'puzzle',playable:true,file:'games/minesweeper.html',popular:true},
{id:'memory',title:'Memory Match',img:'https://picsum.photos/seed/memoryhub/400/400',category:'puzzle',playable:true,file:'games/memory.html',popular:false},
{id:'tic-tac-toe',title:'Tic Tac Toe',img:'https://picsum.photos/seed/tichub/400/400',category:'strategy',playable:true,file:'games/tictactoe.html',popular:false},
{id:'dino',title:'Chrome Dino',img:'https://picsum.photos/seed/dinohub/400/400',category:'arcade',playable:true,file:'games/dino.html',popular:true},
{id:'subway',title:'Subway Surfers',img:'https://picsum.photos/seed/subwayhub/400/400',category:'action',playable:false,popular:true},
{id:'temple',title:'Temple Run 2',img:'https://picsum.photos/seed/templehub/400/400',category:'action',playable:false,popular:true},
{id:'slope',title:'Slope',img:'https://picsum.photos/seed/slopehub/400/400',category:'arcade',playable:false,popular:true},
{id:'geometry',title:'Geometry Dash',img:'https://picsum.photos/seed/geometryhub/400/400',category:'arcade',playable:false,popular:true},
{id:'drive-mad',title:'Drive Mad',img:'https://picsum.photos/seed/drivemadhub/400/400',category:'racing',playable:false,popular:true},
{id:'drift-boss',title:'Drift Boss',img:'https://picsum.photos/seed/driftboss/400/400',category:'racing',playable:false,popular:true},
{id:'moto-x3m',title:'Moto X3M',img:'https://picsum.photos/seed/motox3m/400/400',category:'racing',playable:false,popular:true},
{id:'chess',title:'Master Chess',img:'https://picsum.photos/seed/chesshub/400/400',category:'strategy',playable:false,popular:true},
{id:'agar',title:'Agar.io',img:'https://picsum.photos/seed/agarhub/400/400',category:'io',playable:false,popular:true},
{id:'slither',title:'Slither.io',img:'https://picsum.photos/seed/slitherhub/400/400',category:'io',playable:false,popular:true},
{id:'krunker',title:'Krunker.io',img:'https://picsum.photos/seed/krunkerhub/400/400',category:'io',playable:false,popular:true},
{id:'cookie',title:'Cookie Clicker',img:'https://picsum.photos/seed/cookiehub/400/400',category:'strategy',playable:false,popular:true},
{id:'pacman',title:'Pac-Man',img:'https://picsum.photos/seed/pacmanhub/400/400',category:'arcade',playable:false,popular:true},
{id:'candy',title:'Candy Crush',img:'https://picsum.photos/seed/candyhub/400/400',category:'puzzle',playable:false,popular:true},
{id:'angry-birds',title:'Angry Birds',img:'https://picsum.photos/seed/angryhub/400/400',category:'action',playable:false,popular:true},
{id:'crossy',title:'Crossy Road',img:'https://picsum.photos/seed/crossyhub/400/400',category:'arcade',playable:false,popular:true}
];
const COLORS=['#7c5cfc','#00c9a0','#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#fd79a8','#74b9ff'];
function thumbHtml(g){
  const c=COLORS[Math.abs(g.id.split('').reduce(function(a,ch){return a+ch.charCodeAt(0)},0))%COLORS.length];
  const letter=(g.title||'?')[0];
  return '<div class="game-thumb" style="background:linear-gradient(145deg,'+c+'cc,'+c+'88)"><img src="'+g.img+'" alt="'+g.title+'" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.thumb-fallback\').style.display=\'flex\'"/><div class="thumb-fallback">'+letter+'</div><div class="game-play-icon">▶</div><div class="thumb-overlay"><span>'+g.title+'</span></div></div>';
}
const featuredGrid=document.getElementById('featuredGrid');
const gamesGrid=document.getElementById('gamesGrid');
const searchInput=document.getElementById('searchInput');
const categoryPills=document.getElementById('categoryPills');
const noResults=document.getElementById('noResults');
const gameModal=document.getElementById('gameModal');
const modalTitle=document.getElementById('modalTitle');
const gameFrame=document.getElementById('gameFrame');
const modalClose=document.getElementById('modalClose');
const gameCountEl=document.getElementById('gameCount');
let currentCategory='all',searchQuery='';
function createCard(g){
  const c=document.createElement('div');
  c.className='game-card';
  c.innerHTML=thumbHtml(g)+'<div class="game-info"><div class="game-title">'+g.title+'</div><div class="game-meta"><span class="game-badge '+(g.playable?'playable':'')+'">'+(g.playable?'Hratelné':g.category)+'</span></div></div>';
  c.onclick=function(){openGame(g)};
  return c;
}
function renderGames(){
  const filtered=GAMES.filter(function(g){
    return (currentCategory==='all'||g.category===currentCategory)&&(!searchQuery||g.title.toLowerCase().indexOf(searchQuery.toLowerCase())!==-1);
  });
  if(featuredGrid){featuredGrid.innerHTML='';GAMES.filter(function(g){return g.popular&&g.playable}).slice(0,8).forEach(function(g){featuredGrid.appendChild(createCard(g))})}
  if(gamesGrid){
    gamesGrid.innerHTML='';
    if(!filtered.length){if(noResults)noResults.hidden=false}
    else{if(noResults)noResults.hidden=true;filtered.forEach(function(g){gamesGrid.appendChild(createCard(g))})}
  }
  if(gameCountEl)gameCountEl.textContent=GAMES.length+'+';
}
function openGame(g){
  if(!gameModal)return;
  modalTitle.textContent=g.title;
  if(g.playable&&g.file){gameFrame.src=g.file;gameFrame.removeAttribute('srcdoc')}
  else{
    gameFrame.removeAttribute('src');
    gameFrame.srcdoc='<!DOCTYPE html><html><body style="margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f4f6fb;color:#1a1d2e;font-family:system-ui;text-align:center;padding:2rem"><img src="'+g.img+'" style="width:140px;height:140px;border-radius:24px;object-fit:cover;margin-bottom:1rem"/><h2>'+g.title+'</h2><p style="color:#6b7289">Tato hra je v katalogu. Plná verze brzy.</p></body></html>';
  }
  gameModal.hidden=false;
  document.body.style.overflow='hidden';
}
function closeModal(){
  if(!gameModal)return;
  gameModal.hidden=true;gameFrame.src='';gameFrame.srcdoc='';document.body.style.overflow='';
}
if(modalClose)modalClose.onclick=closeModal;
if(gameModal){var b=gameModal.querySelector('.modal-backdrop');if(b)b.onclick=closeModal}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&gameModal&&!gameModal.hidden)closeModal()});
if(categoryPills)categoryPills.onclick=function(e){
  if(e.target.classList.contains('pill')){
    categoryPills.querySelectorAll('.pill').forEach(function(p){p.classList.remove('active')});
    e.target.classList.add('active');
    currentCategory=e.target.dataset.cat;
    renderGames();
  }
};
if(searchInput)searchInput.oninput=function(e){searchQuery=e.target.value.trim();renderGames()};
renderGames();
