const GAMES=[
{id:'snake',title:'Snake',img:'thumbs/snake.png',category:'arcade',playable:true,file:'games/snake.html',popular:true},
{id:'2048',title:'2048',img:'thumbs/2048.png',category:'puzzle',playable:true,file:'games/2048.html',popular:true},
{id:'tetris',title:'Tetris',img:'thumbs/tetris.png',category:'puzzle',playable:true,file:'games/tetris.html',popular:true},
{id:'flappy',title:'Flappy Bird',img:'thumbs/flappy.png',category:'arcade',playable:true,file:'games/flappy.html',popular:true},
{id:'pong',title:'Pong',img:'thumbs/pong.png',category:'arcade',playable:true,file:'games/pong.html',popular:true},
{id:'breakout',title:'Breakout',img:'thumbs/breakout.png',category:'arcade',playable:true,file:'games/breakout.html',popular:true},
{id:'minesweeper',title:'Minesweeper',img:'thumbs/minesweeper.png',category:'puzzle',playable:true,file:'games/minesweeper.html',popular:true},
{id:'memory',title:'Memory Match',img:'thumbs/memory.png',category:'puzzle',playable:true,file:'games/memory.html',popular:false},
{id:'tic-tac-toe',title:'Tic Tac Toe',img:'thumbs/tictactoe.png',category:'strategy',playable:true,file:'games/tictactoe.html',popular:false},
{id:'dino',title:'Chrome Dino',img:'thumbs/dino.png',category:'arcade',playable:true,file:'games/dino.html',popular:true},
{id:'subway',title:'Subway Surfers',img:'thumbs/subway.png',category:'action',playable:false,popular:true},
{id:'temple',title:'Temple Run 2',img:'thumbs/temple.png',category:'action',playable:false,popular:true},
{id:'slope',title:'Slope',img:'thumbs/slope.png',category:'arcade',playable:false,popular:true},
{id:'geometry',title:'Geometry Dash',img:'thumbs/geometry.png',category:'arcade',playable:false,popular:true},
{id:'stickman-hook',title:'Stickman Hook',img:'thumbs/stickman.png',category:'arcade',playable:false,popular:true},
{id:'drive-mad',title:'Drive Mad',img:'thumbs/drive-mad.png',category:'racing',playable:false,popular:true},
{id:'drift-boss',title:'Drift Boss',img:'thumbs/drift-boss.png',category:'racing',playable:false,popular:true},
{id:'moto-x3m',title:'Moto X3M',img:'thumbs/moto-x3m.png',category:'racing',playable:false,popular:true},
{id:'hill-climb',title:'Hill Climb Racing',img:'thumbs/hill-climb.png',category:'racing',playable:false,popular:true},
{id:'smash-karts',title:'Smash Karts',img:'thumbs/smash-karts.png',category:'racing',playable:false,popular:true},
{id:'retro-bowl',title:'Retro Bowl',img:'thumbs/retro-bowl.png',category:'sports',playable:false,popular:true},
{id:'basketball-stars',title:'Basketball Stars',img:'thumbs/basketball.png',category:'sports',playable:false,popular:true},
{id:'chess',title:'Master Chess',img:'thumbs/chess.png',category:'strategy',playable:false,popular:true},
{id:'agar',title:'Agar.io',img:'thumbs/agar.png',category:'io',playable:false,popular:true},
{id:'slither',title:'Slither.io',img:'thumbs/slither.png',category:'io',playable:false,popular:true},
{id:'krunker',title:'Krunker.io',img:'thumbs/krunker.png',category:'io',playable:false,popular:true},
{id:'1v1-lol',title:'1v1.LOL',img:'thumbs/1v1lol.png',category:'io',playable:false,popular:true},
{id:'shell-shockers',title:'Shell Shockers',img:'thumbs/shell.png',category:'io',playable:false,popular:true},
{id:'monkey-mart',title:'Monkey Mart',img:'thumbs/monkey.png',category:'strategy',playable:false,popular:true},
{id:'cookie',title:'Cookie Clicker',img:'thumbs/cookie.png',category:'strategy',playable:false,popular:true},
{id:'wordle',title:'Wordle',img:'thumbs/wordle.png',category:'puzzle',playable:false,popular:true},
{id:'pacman',title:'Pac-Man',img:'thumbs/pacman.png',category:'arcade',playable:false,popular:true},
{id:'candy',title:'Candy Crush',img:'thumbs/candy.png',category:'puzzle',playable:false,popular:true},
{id:'angry-birds',title:'Angry Birds',img:'thumbs/angry.png',category:'action',playable:false,popular:true},
{id:'crossy',title:'Crossy Road',img:'thumbs/crossy.png',category:'arcade',playable:false,popular:true},
{id:'helix',title:'Helix Jump',img:'thumbs/helix.png',category:'arcade',playable:false,popular:true},
{id:'tunnel-rush',title:'Tunnel Rush',img:'thumbs/tunnel.png',category:'action',playable:false,popular:true},
{id:'fireboy',title:'Fireboy & Watergirl',img:'thumbs/fireboy.png',category:'puzzle',playable:false,popular:true}
];
function getDiff(){return localStorage.getItem('playhubDiff')||'mid'}
function setDiff(d){localStorage.setItem('playhubDiff',d)}
function thumbHtml(g){return '<div class="game-thumb"><img src="'+(g.img||'')+'" alt="'+g.title+'" loading="lazy"/><div class="game-play-icon"><span>▶</span></div></div>'}
var featuredGrid=document.getElementById('featuredGrid');
var gamesGrid=document.getElementById('gamesGrid');
var searchInput=document.getElementById('searchInput');
var categoryPills=document.getElementById('categoryPills');
var noResults=document.getElementById('noResults');
var gameModal=document.getElementById('gameModal');
var modalTitle=document.getElementById('modalTitle');
var gameFrame=document.getElementById('gameFrame');
var modalClose=document.getElementById('modalClose');
var gameCountEl=document.getElementById('gameCount');
var modalDiff=document.getElementById('modalDiff');
var playArea=document.getElementById('playArea');
var currentCategory='all',searchQuery='',currentGame=null;
function createCard(g){
  var c=document.createElement('div');
  c.className='game-card';
  c.setAttribute('role','button');
  c.tabIndex=0;
  c.innerHTML=thumbHtml(g)+'<div class="game-info"><div class="game-title">'+g.title+'</div><div class="game-meta"><span class="game-badge '+(g.playable?'playable':'')+'">'+(g.playable?'Hratelné':g.category)+'</span></div></div>';
  c.addEventListener('click',function(){openGame(g)});
  c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openGame(g)}});
  return c;
}
function renderGames(){
  var filtered=GAMES.filter(function(g){
    return (currentCategory==='all'||g.category===currentCategory)&&(!searchQuery||g.title.toLowerCase().indexOf(searchQuery.toLowerCase())!==-1);
  });
  if(featuredGrid){featuredGrid.innerHTML='';GAMES.filter(function(g){return g.popular}).slice(0,10).forEach(function(g){featuredGrid.appendChild(createCard(g))})}
  if(gamesGrid){
    gamesGrid.innerHTML='';
    if(!filtered.length){if(noResults)noResults.hidden=false}
    else{if(noResults)noResults.hidden=true;filtered.forEach(function(g){gamesGrid.appendChild(createCard(g))})}
  }
  if(gameCountEl)gameCountEl.textContent=GAMES.length+'+';
}
function syncModalDiff(){
  if(!modalDiff)return;
  var d=getDiff();
  modalDiff.querySelectorAll('.diff-btn').forEach(function(b){b.classList.toggle('active',b.dataset.diff===d)});
}
function startPlay(){
  if(!currentGame||!gameFrame)return;
  var g=currentGame,d=getDiff();
  if(g.playable&&g.file){
    gameFrame.src=g.file+(g.file.indexOf('?')>=0?'&':'?')+'diff='+d;
    gameFrame.classList.add('is-playing');
    if(playArea)playArea.hidden=true;
  }
}
function openGame(g){
  if(!gameModal)return;
  currentGame=g;
  if(modalTitle)modalTitle.textContent=g.title;
  syncModalDiff();
  if(gameFrame){
    gameFrame.src='';
    gameFrame.classList.remove('is-playing');
  }
  if(playArea){
    playArea.hidden=false;
    var dLabel=getDiff()==='easy'?'Easy':(getDiff()==='hard'?'Hard':'Mid');
    var html='';
    if(g.img) html+='<img class="modal-preview" src="'+g.img+'" alt="'+g.title+'" onerror="this.style.display=\'none\'"/>';
    else html+='<div class="modal-preview" style="display:flex;align-items:center;justify-content:center;font-size:3rem">🎮</div>';
    html+='<p class="modal-desc">'+(g.playable?'Vyber obtížnost a stiskni Hrát':'Katalogová hra — plná verze brzy')+'</p>';
    if(g.playable)html+='<button type="button" class="play-btn" id="startPlayBtn">Hrát · '+dLabel+'</button>';
    playArea.innerHTML=html;
    var btn=document.getElementById('startPlayBtn');
    if(btn)btn.addEventListener('click',startPlay);
  }
  gameModal.hidden=false;
  requestAnimationFrame(function(){ gameModal.classList.add('is-open'); });
  document.body.classList.add('player-open');
}
function closeModal(){
  if(!gameModal)return;
  gameModal.classList.remove('is-open');
  setTimeout(function(){
    gameModal.hidden=true;
    if(gameFrame){gameFrame.src='';gameFrame.classList.remove('is-playing')}
    if(playArea){playArea.innerHTML='';playArea.hidden=true}
    currentGame=null;
  }, 220);
  document.body.classList.remove('player-open');
}
if(modalClose)modalClose.addEventListener('click',closeModal);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&gameModal&&!gameModal.hidden)closeModal()});
if(modalDiff){
  modalDiff.addEventListener('click',function(e){
    if(e.target.classList.contains('diff-btn')){
      setDiff(e.target.dataset.diff);
      syncModalDiff();
      var btn=document.getElementById('startPlayBtn');
      if(btn){var dLabel=getDiff()==='easy'?'Easy':(getDiff()==='hard'?'Hard':'Mid');btn.textContent='Hrát · '+dLabel}
    }
  });
}
if(categoryPills){
  categoryPills.addEventListener('click',function(e){
    if(e.target.classList.contains('pill')){
      categoryPills.querySelectorAll('.pill').forEach(function(p){p.classList.remove('active')});
      e.target.classList.add('active');
      currentCategory=e.target.dataset.cat;
      renderGames();
    }
  });
}
if(searchInput){searchInput.addEventListener('input',function(e){searchQuery=e.target.value.trim();renderGames()})}
renderGames();
