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
{id:'geometry',title:'Geometry Dash',img:'thumbs/geometry.png',category:'arcade',playable:true,file:'games/geometry.html',popular:true},
{id:'minecraft',title:'Minecraft Classic',img:'thumbs/minecraft.png',category:'action',playable:false,popular:true},
{id:'subway',title:'Subway Surfers',img:'thumbs/subway.png',category:'action',playable:false,popular:true},
{id:'temple',title:'Temple Run 2',img:'thumbs/temple.png',category:'action',playable:false,popular:true},
{id:'slope',title:'Slope',img:'thumbs/slope.png',category:'arcade',playable:true,file:'games/slope.html',popular:true},
{id:'amongus',title:'Among Us',img:'thumbs/amongus.png',category:'action',playable:false,popular:true},
{id:'stickman-hook',title:'Stickman Hook',img:'thumbs/stickman.png',category:'arcade',playable:false,popular:true},
{id:'fruit',title:'Fruit Ninja',img:'thumbs/fruit.png',category:'arcade',playable:false,popular:true},
{id:'stack',title:'Stack Ball',img:'thumbs/stack.png',category:'arcade',playable:true,file:'games/stack.html',popular:true},
{id:'drive-mad',title:'Drive Mad',img:'thumbs/drive-mad.png',category:'racing',playable:false,popular:true},
{id:'agar',title:'Agar.io',img:'thumbs/agar.png',category:'io',playable:false,popular:true},
{id:'slither',title:'Slither.io',img:'thumbs/slither.png',category:'io',playable:false,popular:true},
{id:'pacman',title:'Pac-Man',img:'thumbs/pacman.png',category:'arcade',playable:false,popular:true},
{id:'candy',title:'Candy Crush',img:'thumbs/candy.png',category:'puzzle',playable:false,popular:true},
{id:'cookie',title:'Cookie Clicker',img:'thumbs/cookie.png',category:'strategy',playable:false,popular:true}
];
function getDiff(){return localStorage.getItem('playhubDiff')||'mid'}
function setDiff(d){localStorage.setItem('playhubDiff',d)}
function thumbHtml(g){
  return '<div class="game-thumb"><img src="'+(g.img||'')+'" alt="'+g.title+'" loading="lazy" onerror="this.style.display=\'none\';this.parentNode.classList.add(\''+ 'no-img\')"/><div class="game-play-icon"><span>\u25B6</span></div></div>';
}
var featuredGrid=document.getElementById('featuredGrid');
var gamesGrid=document.getElementById('gamesGrid');
var searchInput=document.getElementById('searchInput');
var categoryPills=document.getElementById('categoryPills');
var noResults=document.getElementById('noResults');
var gamePlayer=document.getElementById('gamePlayer');
var playerTitle=document.getElementById('playerTitle');
var gameFrame=document.getElementById('gameFrame');
var playerBack=document.getElementById('playerBack');
var playerDiff=document.getElementById('playerDiff');
var playArea=document.getElementById('playArea');
var gameCountEl=document.getElementById('gameCount');
var currentCategory='all',searchQuery='',currentGame=null;
function createCard(g){
  var c=document.createElement('div');c.className='game-card';c.setAttribute('role','button');c.tabIndex=0;
  c.innerHTML=thumbHtml(g)+'<div class="game-info"><div class="game-title">'+g.title+'</div><span class="game-badge'+(g.playable?' playable':'')+'">'+(g.playable?'Hratelne':g.category)+'</span></div>';
  c.addEventListener('click',function(){openGame(g)});
  c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openGame(g)}});
  return c;
}
function renderGames(){
  var filtered=GAMES.filter(function(g){return (currentCategory==='all'||g.category===currentCategory)&&(!searchQuery||g.title.toLowerCase().indexOf(searchQuery.toLowerCase())!==-1)});
  if(featuredGrid){featuredGrid.innerHTML='';GAMES.filter(function(g){return g.popular}).slice(0,14).forEach(function(g){featuredGrid.appendChild(createCard(g))})}
  if(gamesGrid){gamesGrid.innerHTML='';if(!filtered.length){if(noResults)noResults.hidden=false}else{if(noResults)noResults.hidden=true;filtered.forEach(function(g){gamesGrid.appendChild(createCard(g))})}}
  if(gameCountEl)gameCountEl.textContent=filtered.length+' her';
}
function syncDiff(){if(!playerDiff)return;var d=getDiff();playerDiff.querySelectorAll('.diff-btn').forEach(function(b){b.classList.toggle('active',b.dataset.diff===d)})}
function startPlay(){if(!currentGame||!gameFrame)return;var g=currentGame,d=getDiff();if(g.playable&&g.file){gameFrame.src=g.file+(g.file.indexOf('?')>=0?'&':'?')+'diff='+d;gamePlayer.classList.add('is-playing')}}
function openGame(g){
  if(!gamePlayer)return;currentGame=g;if(playerTitle)playerTitle.textContent=g.title;syncDiff();
  if(gameFrame){gameFrame.src='';gameFrame.removeAttribute('srcdoc')}gamePlayer.classList.remove('is-playing');
  if(playArea){var dLabel=getDiff()==='easy'?'Easy':(getDiff()==='hard'?'Hard':'Mid');
    var html='<img class="modal-preview" src="'+(g.img||'')+'" alt="" onerror="this.style.display=\'none\'"/>';
    html+='<p class="modal-desc">'+(g.playable?'Vyber obtiznost a stiskni Hrat':'Katalogova hra — plna verze brzy')+'</p>';
    if(g.playable)html+='<button type="button" class="play-btn" id="startPlayBtn">Hrat \u00b7 '+dLabel+'</button>';
    playArea.innerHTML=html;var btn=document.getElementById('startPlayBtn');if(btn)btn.addEventListener('click',startPlay)}
  gamePlayer.hidden=false;gamePlayer.classList.add('is-open');document.body.style.overflow='hidden';
}
function closePlayer(){if(!gamePlayer)return;gamePlayer.classList.remove('is-open','is-playing');gamePlayer.hidden=true;if(gameFrame)gameFrame.src='';if(playArea)playArea.innerHTML='';document.body.style.overflow='';currentGame=null}
if(playerBack)playerBack.addEventListener('click',closePlayer);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&gamePlayer&&!gamePlayer.hidden)closePlayer()});
if(playerDiff){playerDiff.addEventListener('click',function(e){if(e.target.classList.contains('diff-btn')){setDiff(e.target.dataset.diff);syncDiff();var btn=document.getElementById('startPlayBtn');if(btn){var dLabel=getDiff()==='easy'?'Easy':(getDiff()==='hard'?'Hard':'Mid');btn.textContent='Hrat \u00b7 '+dLabel}if(gamePlayer.classList.contains('is-playing')&&currentGame&&currentGame.playable)startPlay()}})}
if(categoryPills){categoryPills.addEventListener('click',function(e){if(e.target.classList.contains('pill')){categoryPills.querySelectorAll('.pill').forEach(function(p){p.classList.remove('active')});e.target.classList.add('active');currentCategory=e.target.dataset.cat;renderGames()}})}
if(searchInput){searchInput.addEventListener('input',function(e){searchQuery=e.target.value.trim();renderGames()})}
renderGames();
