const GAMES=[
{id:'snake',title:'Snake',emoji:'🐍',category:'arcade',playable:true,file:'games/snake.html',popular:true},
{id:'2048',title:'2048',emoji:'🔢',category:'puzzle',playable:true,file:'games/2048.html',popular:true},
{id:'tetris',title:'Tetris',emoji:'🧱',category:'puzzle',playable:true,file:'games/tetris.html',popular:true},
{id:'flappy',title:'Flappy Bird',emoji:'🐦',category:'arcade',playable:true,file:'games/flappy.html',popular:true},
{id:'pong',title:'Pong',emoji:'🏓',category:'arcade',playable:true,file:'games/pong.html',popular:true},
{id:'breakout',title:'Breakout',emoji:'💥',category:'arcade',playable:true,file:'games/breakout.html',popular:true},
{id:'minesweeper',title:'Minesweeper',emoji:'💣',category:'puzzle',playable:true,file:'games/minesweeper.html',popular:true},
{id:'memory',title:'Memory Match',emoji:'🧠',category:'puzzle',playable:true,file:'games/memory.html',popular:false},
{id:'tic-tac-toe',title:'Tic Tac Toe',emoji:'❌',category:'strategy',playable:true,file:'games/tictactoe.html',popular:false},
{id:'dino',title:'Chrome Dino',emoji:'🦖',category:'arcade',playable:true,file:'games/dino.html',popular:true},
{id:'subway',title:'Subway Surfers',emoji:'🚇',category:'action',playable:false,popular:true},
{id:'temple',title:'Temple Run 2',emoji:'🏃',category:'action',playable:false,popular:true},
{id:'slope',title:'Slope',emoji:'⛷️',category:'arcade',playable:false,popular:true},
{id:'geometry',title:'Geometry Dash',emoji:'🔷',category:'arcade',playable:false,popular:true},
{id:'stickman-hook',title:'Stickman Hook',emoji:'🪝',category:'arcade',playable:false,popular:true},
{id:'drive-mad',title:'Drive Mad',emoji:'🚗',category:'racing',playable:false,popular:true},
{id:'drift-boss',title:'Drift Boss',emoji:'🏎️',category:'racing',playable:false,popular:true},
{id:'moto-x3m',title:'Moto X3M',emoji:'🏍️',category:'racing',playable:false,popular:true},
{id:'hill-climb',title:'Hill Climb Racing',emoji:'🛻',category:'racing',playable:false,popular:true},
{id:'smash-karts',title:'Smash Karts',emoji:'🏎️',category:'racing',playable:false,popular:true},
{id:'retro-bowl',title:'Retro Bowl',emoji:'🏈',category:'sports',playable:false,popular:true},
{id:'chess',title:'Master Chess',emoji:'♟️',category:'strategy',playable:false,popular:true},
{id:'agar',title:'Agar.io',emoji:'🟢',category:'io',playable:false,popular:true},
{id:'slither',title:'Slither.io',emoji:'🐍',category:'io',playable:false,popular:true},
{id:'krunker',title:'Krunker.io',emoji:'🔫',category:'io',playable:false,popular:true},
{id:'1v1-lol',title:'1v1.LOL',emoji:'🏗️',category:'io',playable:false,popular:true},
{id:'monkey-mart',title:'Monkey Mart',emoji:'🐵',category:'strategy',playable:false,popular:true},
{id:'cookie',title:'Cookie Clicker',emoji:'🍪',category:'strategy',playable:false,popular:true},
{id:'wordle',title:'Wordle',emoji:'📝',category:'puzzle',playable:false,popular:true},
{id:'pacman',title:'Pac-Man',emoji:'👻',category:'arcade',playable:false,popular:true},
{id:'candy',title:'Candy Crush',emoji:'🍬',category:'puzzle',playable:false,popular:true},
{id:'angry-birds',title:'Angry Birds',emoji:'🐦',category:'action',playable:false,popular:true},
{id:'crossy',title:'Crossy Road',emoji:'🐔',category:'arcade',playable:false,popular:true},
{id:'helix',title:'Helix Jump',emoji:'🌀',category:'arcade',playable:false,popular:true},
];
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
  c.innerHTML='<div class="game-thumb">'+g.emoji+'<div class="game-play-icon">▶️</div></div><div class="game-info"><div class="game-title">'+g.title+'</div><div class="game-meta"><span class="game-badge '+(g.playable?'playable':'')+'">'+(g.playable?'Hratelné':g.category)+'</span></div></div>';
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
    gameFrame.srcdoc='<!DOCTYPE html><html><body style="margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f4f6fb;color:#1a1d2e;font-family:system-ui;text-align:center;padding:2rem"><div style="font-size:5rem">'+g.emoji+'</div><h2 style="margin:.5rem 0">'+g.title+'</h2><p style="color:#6b7289;max-width:320px">Tato hra je v katalogu. Plná verze brzy.</p></body></html>';
  }
  gameModal.hidden=false;
  document.body.style.overflow='hidden';
}
function closeModal(){
  if(!gameModal)return;
  gameModal.hidden=true;
  gameFrame.src='';
  gameFrame.srcdoc='';
  document.body.style.overflow='';
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
