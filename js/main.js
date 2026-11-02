const GAMES = [
  {id:"snake", title:"Snake", category:"arcade", playable:true, file:"games/snake.html", popular:true},
  {id:"tetris", title:"Tetris", category:"puzzle", playable:true, file:"games/tetris.html", popular:true},
  {id:"pong", title:"Pong", category:"arcade", playable:true, file:"games/pong.html", popular:true},
  {id:"breakout", title:"Breakout", category:"arcade", playable:true, file:"games/breakout.html", popular:true},
  {id:"g2048", title:"2048", category:"puzzle", playable:true, file:"games/2048.html", popular:true},
  {id:"minesweeper", title:"Minesweeper", category:"puzzle", playable:true, file:"games/minesweeper.html", popular:true},
  {id:"flappy", title:"Flappy Bird", category:"arcade", playable:true, file:"games/flappy.html", popular:true},
  {id:"memory", title:"Memory Match", category:"puzzle", playable:true, file:"games/memory.html", popular:true},
  {id:"ttt", title:"Tic Tac Toe", category:"strategy", playable:true, file:"games/tictactoe.html", popular:false},
  {id:"stack", title:"Stack", category:"arcade", playable:true, file:"games/stack.html", popular:true},
  {id:"slope", title:"Slope", category:"arcade", playable:true, file:"games/slope.html", popular:false},
  {id:"invaders", title:"Space Invaders", category:"arcade", playable:true, file:"games/invaders.html", popular:true},
  {id:"asteroids", title:"Asteroids", category:"arcade", playable:true, file:"games/asteroids.html", popular:true},
  {id:"connect4", title:"Connect 4", category:"strategy", playable:true, file:"games/connect4.html", popular:true}
];

function drawPreview(id, cv) {
  var ctx = cv.getContext("2d");
  var W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "bold 22px system-ui,sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  var titles = {
    snake:"Snake", tetris:"Tetris", pong:"Pong", breakout:"Breakout", g2048:"2048",
    minesweeper:"Mines", flappy:"Flappy", memory:"Memory", ttt:"TicTacToe",
    stack:"Stack", slope:"Slope", invaders:"Invaders", asteroids:"Asteroids", connect4:"Connect4"
  };
  var colors = {
    snake:"#22c55e", tetris:"#22d3ee", pong:"#f8fafc", breakout:"#f97316", g2048:"#eab308",
    minesweeper:"#94a3b8", flappy:"#38bdf8", memory:"#a78bfa", ttt:"#64748b",
    stack:"#818cf8", slope:"#06b6d4", invaders:"#4ade80", asteroids:"#e2e8f0", connect4:"#3b82f6"
  };
  ctx.fillStyle = colors[id] || "#6366f1";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#0f172a";
  ctx.globalAlpha = 0.25;
  ctx.fillRect(0, H * 0.55, W, H * 0.45);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#fff";
  ctx.fillText(titles[id] || id, W / 2, H / 2);
}

function getDiff() {
  try { return localStorage.getItem("phDiff") || "mid"; } catch (e) { return "mid"; }
}
function setDiff(d) {
  try { localStorage.setItem("phDiff", d); } catch (e) {}
}

var currentCategory = "all";
var searchQuery = "";
var currentGame = null;

function createCard(g) {
  var c = document.createElement("div");
  c.className = "game-card";
  c.setAttribute("tabindex", "0");
  var thumb = document.createElement("div");
  thumb.className = "game-thumb";
  var cv = document.createElement("canvas");
  cv.width = 320;
  cv.height = 200;
  cv.style.width = "100%";
  cv.style.display = "block";
  try { drawPreview(g.id, cv); } catch (e) {}
  thumb.appendChild(cv);
  var info = document.createElement("div");
  info.className = "game-info";
  var t = document.createElement("div");
  t.className = "game-title";
  t.textContent = g.title;
  var b = document.createElement("span");
  b.className = "game-badge playable";
  b.textContent = "Hratelne";
  info.appendChild(t);
  info.appendChild(b);
  c.appendChild(thumb);
  c.appendChild(info);
  c.addEventListener("click", function () { openGame(g); });
  return c;
}

function renderGames() {
  var featuredGrid = document.getElementById("featuredGrid");
  var gamesGrid = document.getElementById("gamesGrid");
  var gameCountEl = document.getElementById("gameCount");
  var noResults = document.getElementById("noResults");
  var filtered = GAMES.filter(function (g) {
    var catOk = currentCategory === "all" || g.category === currentCategory;
    var qOk = !searchQuery || g.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    return catOk && qOk;
  });
  if (featuredGrid) {
    featuredGrid.innerHTML = "";
    GAMES.filter(function (g) { return g.popular; }).forEach(function (g) {
      featuredGrid.appendChild(createCard(g));
    });
  }
  if (gamesGrid) {
    gamesGrid.innerHTML = "";
    if (!filtered.length) {
      if (noResults) noResults.hidden = false;
    } else {
      if (noResults) noResults.hidden = true;
      filtered.forEach(function (g) { gamesGrid.appendChild(createCard(g)); });
    }
  }
  if (gameCountEl) gameCountEl.textContent = filtered.length + " her";
}

function syncDiff() {
  var playerDiff = document.getElementById("playerDiff");
  if (!playerDiff) return;
  var d = getDiff();
  var btns = playerDiff.querySelectorAll(".diff-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.toggle("active", btns[i].getAttribute("data-diff") === d);
  }
}

function startPlay() {
  var gameFrame = document.getElementById("gameFrame");
  var gamePlayer = document.getElementById("gamePlayer");
  if (!currentGame || !gameFrame || !gamePlayer) return;
  var g = currentGame;
  var d = getDiff();
  gameFrame.src = g.file + "?diff=" + d + "&t=" + Date.now();
  gamePlayer.classList.add("is-playing");
}

function openGame(g) {
  var gamePlayer = document.getElementById("gamePlayer");
  var playerTitle = document.getElementById("playerTitle");
  var playArea = document.getElementById("playArea");
  var gameFrame = document.getElementById("gameFrame");
  if (!gamePlayer) return;
  currentGame = g;
  if (playerTitle) playerTitle.textContent = g.title;
  syncDiff();
  if (gameFrame) gameFrame.src = "";
  gamePlayer.classList.remove("is-playing");
  if (playArea) {
    playArea.innerHTML = "";
    var cv = document.createElement("canvas");
    cv.width = 320; cv.height = 160;
    cv.style.borderRadius = "12px";
    cv.style.maxWidth = "90%";
    try { drawPreview(g.id, cv); } catch (e) {}
    playArea.appendChild(cv);
    var desc = document.createElement("p");
    desc.className = "modal-desc";
    desc.textContent = "Vyber obtiznost a stiskni Hrat";
    playArea.appendChild(desc);
    var d = getDiff();
    var dLabel = d === "easy" ? "Easy" : (d === "hard" ? "Hard" : "Mid");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "play-btn";
    btn.id = "startPlayBtn";
    btn.textContent = "Hrat - " + dLabel;
    btn.addEventListener("click", startPlay);
    playArea.appendChild(btn);
  }
  gamePlayer.hidden = false;
  gamePlayer.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closePlayer() {
  var gamePlayer = document.getElementById("gamePlayer");
  var gameFrame = document.getElementById("gameFrame");
  var playArea = document.getElementById("playArea");
  if (!gamePlayer) return;
  gamePlayer.classList.remove("is-open", "is-playing");
  gamePlayer.hidden = true;
  if (gameFrame) gameFrame.src = "";
  if (playArea) playArea.innerHTML = "";
  document.body.style.overflow = "";
  currentGame = null;
}

function init() {
  var playerBack = document.getElementById("playerBack");
  var playerDiff = document.getElementById("playerDiff");
  var categoryPills = document.getElementById("categoryPills");
  var searchInput = document.getElementById("searchInput");
  if (playerBack) playerBack.addEventListener("click", closePlayer);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePlayer();
  });
  if (playerDiff) {
    playerDiff.addEventListener("click", function (e) {
      var t = e.target;
      if (t.classList.contains("diff-btn")) {
        setDiff(t.getAttribute("data-diff"));
        syncDiff();
        var btn = document.getElementById("startPlayBtn");
        if (btn) {
          var d = getDiff();
          btn.textContent = "Hrat - " + (d === "easy" ? "Easy" : (d === "hard" ? "Hard" : "Mid"));
        }
        var gamePlayer = document.getElementById("gamePlayer");
        if (gamePlayer && gamePlayer.classList.contains("is-playing") && currentGame) startPlay();
      }
    });
  }
  if (categoryPills) {
    categoryPills.addEventListener("click", function (e) {
      var t = e.target;
      if (t.classList.contains("pill")) {
        var pills = categoryPills.querySelectorAll(".pill");
        for (var i = 0; i < pills.length; i++) pills[i].classList.remove("active");
        t.classList.add("active");
        currentCategory = t.getAttribute("data-cat") || "all";
        renderGames();
      }
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      searchQuery = e.target.value.trim();
      renderGames();
    });
  }
  renderGames();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
