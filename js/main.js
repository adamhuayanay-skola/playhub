const GAMES=[
{id:"snake",title:"Snake",category:"arcade",playable:true,file:"games/snake.html",popular:true},
{id:"tetris",title:"Tetris",category:"puzzle",playable:true,file:"games/tetris.html",popular:true},
{id:"pong",title:"Pong",category:"arcade",playable:true,file:"games/pong.html",popular:true},
{id:"breakout",title:"Breakout",category:"arcade",playable:true,file:"games/breakout.html",popular:true},
{id:"g2048",title:"2048",category:"puzzle",playable:true,file:"games/2048.html",popular:true},
{id:"minesweeper",title:"Minesweeper",category:"puzzle",playable:true,file:"games/minesweeper.html",popular:true},
{id:"flappy",title:"Flappy Bird",category:"arcade",playable:true,file:"games/flappy.html",popular:true},
{id:"memory",title:"Memory Match",category:"puzzle",playable:true,file:"games/memory.html",popular:true},
{id:"ttt",title:"Tic Tac Toe",category:"strategy",playable:true,file:"games/tictactoe.html",popular:false},
{id:"stack",title:"Stack",category:"arcade",playable:true,file:"games/stack.html",popular:true},
{id:"slope",title:"Slope",category:"arcade",playable:true,file:"games/slope.html",popular:false},
{id:"invaders",title:"Space Invaders",category:"arcade",playable:true,file:"games/invaders.html",popular:true},
{id:"asteroids",title:"Asteroids",category:"arcade",playable:true,file:"games/asteroids.html",popular:true},
{id:"connect4",title:"Connect 4",category:"strategy",playable:true,file:"games/connect4.html",popular:true}
];
function drawPreview(id,cv){
var ctx=cv.getContext("2d"),W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
if(id==="snake"){ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);for(var i=0;i<7;i++){ctx.fillStyle=i?"#22c55e":"#4ade80";ctx.fillRect(40+i*20,H/2-10,18,18);}ctx.fillStyle="#f43f5e";ctx.beginPath();ctx.arc(W-50,H/2,10,0,6.28);ctx.fill();}
else if(id==="pong"){ctx.fillStyle="#000";ctx.fillRect(0,0,W,H);ctx.fillStyle="#fff";ctx.fillRect(12,H/2-30,8,60);ctx.fillRect(W-20,H/2-20,8,50);ctx.beginPath();ctx.arc(W/2,H/2,8,0,6.28);ctx.fill();}
else if(id==="flappy"){ctx.fillStyle="#70c5ce";ctx.fillRect(0,0,W,H);ctx.fillStyle="#5ea512";ctx.fillRect(W*0.6,0,36,H*0.35);ctx.fillStyle="#f8e71c";ctx.beginPath();ctx.ellipse(W*0.3,H*0.45,16,14,0,0,6.28);ctx.fill();}
else if(id==="stack"){ctx.fillStyle="#1e1b4b";ctx.fillRect(0,0,W,H);for(var i=0;i<5;i++){ctx.fillStyle="hsl("+((i*40)%360)+",80%,55%)";ctx.fillRect(50+i*4,H-30-i*22,W-100-i*8,20);}}
else if(id==="invaders"){ctx.fillStyle="#000";ctx.fillRect(0,0,W,H);ctx.fillStyle="#0f0";for(var i=0;i<5;i++)ctx.fillRect(30+i*40,50,28,18);ctx.fillRect(W/2-16,H-36,32,12);}
else if(id==="asteroids"){ctx.fillStyle="#000";ctx.fillRect(0,0,W,H);ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W/2,H/2-18);ctx.lineTo(W/2-14,H/2+14);ctx.lineTo(W/2+14,H/2+14);ctx.closePath();ctx.stroke();}
else if(id==="connect4"){ctx.fillStyle="#1d4ed8";ctx.fillRect(0,0,W,H);for(var r=0;r<3;r++)for(var c=0;c<4;c++){ctx.fillStyle=(r+c)%2?"#ef4444":"#eab308";ctx.beginPath();ctx.arc(45+c*50,40+r*50,18,0,6.28);ctx.fill();}}
else if(id==="tetris"){ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);var cs=["#22d3ee","#eab308","#a855f7","#22c55e"];for(var i=0;i<4;i++){ctx.fillStyle=cs[i];ctx.fillRect(50+i*40,60,28,28);}}
else if(id==="g2048"){ctx.fillStyle="#bbada0";ctx.fillRect(0,0,W,H);ctx.fillStyle="#eee4da";ctx.fillRect(30,30,80,80);ctx.fillStyle="#776e65";ctx.font="bold 28px system-ui";ctx.textAlign="center";ctx.fillText("2048",W/2,H/2);}
else if(id==="breakout"){ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);for(var r=0;r<3;r++)for(var c=0;c<6;c++){ctx.fillStyle=["#f43f5e","#f97316","#eab308"][r];ctx.fillRect(20+c*40,20+r*20,36,16);}}
else if(id==="minesweeper"){ctx.fillStyle="#1e293b";ctx.fillRect(0,0,W,H);for(var r=0;r<4;r++)for(var c=0;c<5;c++){ctx.fillStyle="#334155";ctx.fillRect(20+c*35,20+r*32,30,28);}}
else if(id==="memory"){ctx.fillStyle="#1e1b4b";ctx.fillRect(0,0,W,H);for(var i=0;i<6;i++){ctx.fillStyle="#4c1d95";ctx.fillRect(20+(i%3)*60,30+Math.floor(i/3)*70,50,60);}}
else if(id==="ttt"){ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);ctx.strokeStyle="#64748b";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(W/3,20);ctx.lineTo(W/3,H-20);ctx.moveTo(2*W/3,20);ctx.lineTo(2*W/3,H-20);ctx.moveTo(20,H/3);ctx.lineTo(W-20,H/3);ctx.moveTo(20,2*H/3);ctx.lineTo(W-20,2*H/3);ctx.stroke();}
else if(id==="slope"){ctx.fillStyle="#030308";ctx.fillRect(0,0,W,H);ctx.strokeStyle="#22d3ee";ctx.beginPath();ctx.moveTo(20,40);ctx.lineTo(W-20,H-40);ctx.stroke();ctx.fillStyle="#ef4444";ctx.beginPath();ctx.arc(W/2,H/2,12,0,6.28);ctx.fill();}
else{ctx.fillStyle="#6366f1";ctx.fillRect(0,0,W,H);}
}
var searchInput=document.getElementById("searchInput"),categoryPills=document.getElementById("categoryPills"),featuredGrid=document.getElementById("featuredGrid"),gamesGrid=document.getElementById("gamesGrid"),gameCountEl=document.getElementById("gameCount"),noResults=document.getElementById("noResults"),gamePlayer=document.getElementById("gamePlayer"),playerBack=document.getElementById("playerBack"),playerTitle=document.getElementById("playerTitle"),playerDiff=document.getElementById("playerDiff"),playArea=document.getElementById("playArea"),gameFrame=document.getElementById("gameFrame");
var currentCategory="all",searchQuery="",currentGame=null;
function getDiff(){try{return localStorage.getItem("phDiff")||"mid";}catch(e){return "mid";}}
function setDiff(d){try{localStorage.setItem("phDiff",d);}catch(e){}}
function createCard(g){var c=document.createElement("div");c.className="game-card";c.tabIndex=0;var thumb=document.createElement("div");thumb.className="game-thumb";var cv=document.createElement("canvas");cv.width=320;cv.height=220;drawPreview(g.id,cv);thumb.appendChild(cv);var info=document.createElement("div");info.className="game-info";var t=document.createElement("div");t.className="game-title";t.textContent=g.title;var b=document.createElement("span");b.className="game-badge"+(g.playable?" playable":"");b.textContent=g.playable?"Hratelne":g.category;info.appendChild(t);info.appendChild(b);c.appendChild(thumb);c.appendChild(info);c.onclick=function(){openGame(g);};return c;}
function renderGames(){var filtered=GAMES.filter(function(g){return (currentCategory==="all"||g.category===currentCategory)&&(!searchQuery||g.title.toLowerCase().indexOf(searchQuery.toLowerCase())!==-1);});if(featuredGrid){featuredGrid.innerHTML="";GAMES.filter(function(g){return g.popular;}).forEach(function(g){featuredGrid.appendChild(createCard(g));});}if(gamesGrid){gamesGrid.innerHTML="";if(!filtered.length){if(noResults)noResults.hidden=false;}else{if(noResults)noResults.hidden=true;filtered.forEach(function(g){gamesGrid.appendChild(createCard(g));});}if(gameCountEl)gameCountEl.textContent=filtered.length+" her";}
function syncDiff(){if(!playerDiff)return;var d=getDiff();playerDiff.querySelectorAll(".diff-btn").forEach(function(b){b.classList.toggle("active",b.dataset.diff===d);});}
function startPlay(){if(!currentGame||!gameFrame)return;var g=currentGame,d=getDiff();if(g.playable&&g.file){gameFrame.src=g.file+(g.file.indexOf("?")>=0?"&":"?")+"diff="+d+"&t="+Date.now();gamePlayer.classList.add("is-playing");}}
function openGame(g){if(!gamePlayer)return;currentGame=g;if(playerTitle)playerTitle.textContent=g.title;syncDiff();if(gameFrame)gameFrame.src="";gamePlayer.classList.remove("is-playing");if(playArea){playArea.innerHTML="";var cv=document.createElement("canvas");cv.width=320;cv.height=200;cv.style.borderRadius="12px";cv.style.maxWidth="90%";drawPreview(g.id,cv);playArea.appendChild(cv);var desc=document.createElement("p");desc.className="modal-desc";desc.textContent="Vyber obtiznost a stiskni Hrat";playArea.appendChild(desc);var dLabel=getDiff()==="easy"?"Easy":(getDiff()==="hard"?"Hard":"Mid");var btn=document.createElement("button");btn.type="button";btn.className="play-btn";btn.id="startPlayBtn";btn.textContent="Hrat - "+dLabel;btn.onclick=startPlay;playArea.appendChild(btn);}gamePlayer.hidden=false;gamePlayer.classList.add("is-open");document.body.style.overflow="hidden";}
function closePlayer(){if(!gamePlayer)return;gamePlayer.classList.remove("is-open","is-playing");gamePlayer.hidden=true;if(gameFrame)gameFrame.src="";if(playArea)playArea.innerHTML="";document.body.style.overflow="";currentGame=null;}
if(playerBack)playerBack.onclick=closePlayer;
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&gamePlayer&&!gamePlayer.hidden)closePlayer();});
if(playerDiff)playerDiff.onclick=function(e){if(e.target.classList.contains("diff-btn")){setDiff(e.target.dataset.diff);syncDiff();var btn=document.getElementById("startPlayBtn");if(btn){var dLabel=getDiff()==="easy"?"Easy":(getDiff()==="hard"?"Hard":"Mid");btn.textContent="Hrat - "+dLabel;}if(gamePlayer.classList.contains("is-playing")&&currentGame)startPlay();}};
if(categoryPills)categoryPills.onclick=function(e){if(e.target.classList.contains("pill")){categoryPills.querySelectorAll(".pill").forEach(function(p){p.classList.remove("active");});e.target.classList.add("active");currentCategory=e.target.dataset.cat;renderGames();}};
if(searchInput)searchInput.oninput=function(e){searchQuery=e.target.value.trim();renderGames();};
renderGames();
