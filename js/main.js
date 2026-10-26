const GAMES = [
  {id:'snake',title:'Snake',img:'thumbs/snake.png',category:'arcade',playable:true,file:'games/snake.html',popular:true},
  {id:'tetris',title:'Tetris',img:'thumbs/tetris.png',category:'puzzle',playable:true,file:'games/tetris.html',popular:true},
  {id:'pong',title:'Pong',img:'thumbs/pong.png',category:'arcade',playable:true,file:'games/pong.html',popular:true},
  {id:'breakout',title:'Breakout',img:'thumbs/breakout.png',category:'arcade',playable:true,file:'games/breakout.html',popular:true},
  {id:'2048',title:'2048',img:'thumbs/2048.png',category:'puzzle',playable:true,file:'games/2048.html',popular:true},
  {id:'minesweeper',title:'Minesweeper',img:'thumbs/minesweeper.png',category:'puzzle',playable:true,file:'games/minesweeper.html',popular:true},
  {id:'flappy',title:'Flappy Bird',img:'thumbs/flappy.png',category:'arcade',playable:true,file:'games/flappy.html',popular:true},
  {id:'dino',title:'Chrome Dino',img:'thumbs/dino.png',category:'arcade',playable:true,file:'games/dino.html',popular:true},
  {id:'memory',title:'Memory Match',img:'thumbs/memory.png',category:'puzzle',playable:true,file:'games/memory.html',popular:true},
  {id:'tic-tac-toe',title:'Tic Tac Toe',img:'thumbs/tictactoe.png',category:'strategy',playable:true,file:'games/tictactoe.html',popular:false},
  {id:'stack',title:'Stack',img:'thumbs/stack.png',category:'arcade',playable:true,file:'games/stack.html',popular:true},
  {id:'geometry',title:'Geometry Dash',img:'thumbs/geometry.png',category:'arcade',playable:true,file:'games/geometry.html',popular:true},
  {id:'slope',title:'Slope',img:'thumbs/slope.png',category:'arcade',playable:true,file:'games/slope.html',popular:false},
  {id:'subway',title:'Subway Rush',img:'thumbs/subway.png',category:'arcade',playable:true,file:'games/subway.html',popular:false}
];

var searchInput = document.getElementById('searchInput');
var categoryPills = document.getElementById('categoryPills');
var featuredGrid = document.getElementById('featuredGrid');
var gamesGrid = document.getElementById('gamesGrid');
var gameCountEl = document.getElementById('gameCount');
var noResults = document.getElementById('noResults');
var gamePlayer = document.getElementById('gamePlayer');
var playerBack = document.getElementById('playerBack');
var playerTitle = document.getElementById('playerTitle');
var playerDiff = document.getElementById('playerDiff');
var playArea = document.getElementById('playArea');
var gameFrame = document.getElementById('gameFrame');

var currentCategory = 'all';
var searchQuery = '';
var currentGame = null;

function getDiff() {
  try { return localStorage.getItem('phDiff') || 'mid'; } catch (e) { return 'mid'; }
}
function setDiff(d) {
  try { localStorage.setItem('phDiff', d); } catch (e) {}
}

function thumbHtml(g) {
  var letter = (g.title || '?').charAt(0).toUpperCase();
  var img = '';
  if (g.img) {
    img = '<img src="' + g.img + '" alt="" loading="lazy" onerror="this.style.display='none';var n=this.nextElementSibling;if(n)n.style.display='flex';"/>';
  }
  var fb = '<div class="fallback" style="display:' + (g.img ? 'none' : 'flex') + '">' + letter + '</div>';
  return '<div class="game-thumb">' + img + fb + '</div>';
}

function createCard(g) {
  var c = document.createElement('div');
  c.className = 'game-card';
  c.setAttribute('role', 'button');
  c.tabIndex = 0;
  var badge = g.playable ? 'playable' : '';
  var badgeText = g.playable ? 'Hratelne' : g.category;
  c.innerHTML = thumbHtml(g) + '<div class="game-info"><div class="game-title">' + g.title + '</div><span class="game-badge ' + badge + '">' + badgeText + '</span></div>';
  c.addEventListener('click', function () { openGame(g); });
  c.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGame(g); }
  });
  return c;
}

function renderGames() {
  var filtered = GAMES.filter(function (g) {
    var catOk = currentCategory === 'all' || g.category === currentCategory;
    var qOk = !searchQuery || g.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    return catOk && qOk;
  });
  if (featuredGrid) {
    featuredGrid.innerHTML = '';
    GAMES.filter(function (g) { return g.popular; }).slice(0, 12).forEach(function (g) {
      featuredGrid.appendChild(createCard(g));
    });
  }
  if (gamesGrid) {
    gamesGrid.innerHTML = '';
    if (!filtered.length) {
      if (noResults) noResults.hidden = false;
    } else {
      if (noResults) noResults.hidden = true;
      filtered.forEach(function (g) { gamesGrid.appendChild(createCard(g)); });
    }
  }
  if (gameCountEl) gameCountEl.textContent = filtered.length + ' her';
}

function syncDiff() {
  if (!playerDiff) return;
  var d = getDiff();
  playerDiff.querySelectorAll('.diff-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.diff === d);
  });
}

function startPlay() {
  if (!currentGame || !gameFrame) return;
  var g = currentGame;
  var d = getDiff();
  if (g.playable && g.file) {
    var sep = g.file.indexOf('?') >= 0 ? '&' : '?';
    gameFrame.src = g.file + sep + 'diff=' + d;
    gamePlayer.classList.add('is-playing');
  }
}

function openGame(g) {
  if (!gamePlayer) return;
  currentGame = g;
  if (playerTitle) playerTitle.textContent = g.title;
  syncDiff();
  if (gameFrame) {
    gameFrame.src = '';
    gameFrame.removeAttribute('srcdoc');
  }
  gamePlayer.classList.remove('is-playing');
  if (playArea) {
    var dLabel = getDiff() === 'easy' ? 'Easy' : (getDiff() === 'hard' ? 'Hard' : 'Mid');
    var html = '<img class="modal-preview" src="' + (g.img || '') + '" alt="" onerror="this.style.display='none'"/>';
    html += '<p class="modal-desc">' + (g.playable ? 'Vyber obtiznost a stiskni Hrat' : 'Brzy') + '</p>';
    if (g.playable) {
      html += '<button type="button" class="play-btn" id="startPlayBtn">Hrat · ' + dLabel + '</button>';
    }
    playArea.innerHTML = html;
    var btn = document.getElementById('startPlayBtn');
    if (btn) btn.addEventListener('click', startPlay);
  }
  gamePlayer.hidden = false;
  gamePlayer.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closePlayer() {
  if (!gamePlayer) return;
  gamePlayer.classList.remove('is-open', 'is-playing');
  gamePlayer.hidden = true;
  if (gameFrame) gameFrame.src = '';
  if (playArea) playArea.innerHTML = '';
  document.body.style.overflow = '';
  currentGame = null;
}

if (playerBack) playerBack.addEventListener('click', closePlayer);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && gamePlayer && !gamePlayer.hidden) closePlayer();
});

if (playerDiff) {
  playerDiff.addEventListener('click', function (e) {
    if (e.target.classList.contains('diff-btn')) {
      setDiff(e.target.dataset.diff);
      syncDiff();
      var btn = document.getElementById('startPlayBtn');
      if (btn) {
        var dLabel = getDiff() === 'easy' ? 'Easy' : (getDiff() === 'hard' ? 'Hard' : 'Mid');
        btn.textContent = 'Hrat · ' + dLabel;
      }
      if (gamePlayer.classList.contains('is-playing') && currentGame && currentGame.playable) startPlay();
    }
  });
}

if (categoryPills) {
  categoryPills.addEventListener('click', function (e) {
    if (e.target.classList.contains('pill')) {
      categoryPills.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
      e.target.classList.add('active');
      currentCategory = e.target.dataset.cat;
      renderGames();
    }
  });
}

if (searchInput) {
  searchInput.addEventListener('input', function (e) {
    searchQuery = e.target.value.trim();
    renderGames();
  });
}

renderGames();
