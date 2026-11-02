const GAMES=[
{id:"snake",title:"Snake",category:"arcade",playable:true,file:"games/snake.html",popular:true},
{id:"tetris",title:"Tetris",category:"puzzle",playable:true,file:"games/tetris.html",popular:true},
{id:"pong",title:"Pong",category:"arcade",playable:true,file:"games/pong.html",popular:true},
{id:"breakout",title:"Breakout",category:"arcade",playable:true,file:"games/breakout.html",popular:true},
{id:"g2048",title:"2048",category:"puzzle",playable:true,file:"games/2048.html",popular:true},
{id:"minesweeper",title:"Minesweeper",category:"puzzle",playable:true,file:"games/minesweeper.html",popular:true},
{id:"flappy",title:"Flappy Bird",category:"arcade",playable:true,file:"games/flappy.html",popular:true},
{id:"dino",title:"Chrome Dino",category:"arcade",playable:true,file:"games/dino.html",popular:true},
{id:"memory",title:"Memory Match",category:"puzzle",playable:true,file:"games/memory.html",popular:true},
{id:"ttt",title:"Tic Tac Toe",category:"strategy",playable:true,file:"games/tictactoe.html",popular:false},
{id:"stack",title:"Stack",category:"arcade",playable:true,file:"games/stack.html",popular:true},
{id:"geometry",title:"Geometry Dash",category:"arcade",playable:true,file:"games/geometry.html",popular:true},
{id:"slope",title:"Slope",category:"arcade",playable:true,file:"games/slope.html",popular:false},
{id:"subway",title:"Subway Rush",category:"arcade",playable:true,file:"games/subway.html",popular:false}
];

function drawPreview(id,cv){
  var ctx=cv.getContext("2d");
  var W=cv.width,H=cv.height;
  ctx.clearRect(0,0,W,H);
  if(id==="snake"){
    ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);
    for(var i=0;i<8;i++){ctx.fillStyle=i===0?"#4ade80":"#22c55e";ctx.fillRect(30+i*18,H/2-8,16,16);}
    ctx.fillStyle="#ef4444";ctx.beginPath();ctx.arc(W-50,H/2,10,0,Math.PI*2);ctx.fill();
  }else if(id==="tetris"){
    ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);
    var cols=["#22d3ee","#eab308","#a855f7","#22c55e","#ef4444"];
    var shapes=[[1,1,1,1],[1,1,0,0,1,1],[0,1,0,1,1,1]];
    for(var s=0;s<3;s++){
      ctx.fillStyle=cols[s];
      for(var n=0;n<shapes[s].length;n++)if(shapes[s][n]){
        var x=40+s*55+(n%2)*18,y=30+Math.floor(n/2)*18;
        ctx.fillRect(x,y,16,16);
      }
    }
  }else if(id==="pong"){
    ctx.fillStyle="#000";ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#fff";ctx.fillRect(12,H/2-30,8,60);ctx.fillRect(W-20,H/2-20,8,50);
    ctx.beginPath();ctx.arc(W/2+20,H/2-10,8,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,.3)";ctx.setLineDash([6,8]);ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();
  }else if(id==="breakout"){
    ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);
    var bc=["#f43f5e","#f97316","#eab308","#22c55e"];
    for(var r=0;r<4;r++)for(var c=0;c<6;c++){ctx.fillStyle=bc[r];ctx.fillRect(16+c*36,20+r*18,32,14);}
    ctx.fillStyle="#e2e8f0";ctx.fillRect(W/2-35,H-28,70,10);
    ctx.fillStyle="#fbbf24";ctx.beginPath();ctx.arc(W/2,H-50,7,0,Math.PI*2);ctx.fill();
  }else if(id==="g2048"){
    ctx.fillStyle="#bbada0";ctx.fillRect(0,0,W,H);
    var tiles=[[2,4,8,16],[32,64,2,4],[8,16,32,2],[4,2,8,16]];
    var tc={2:"#eee4da",4:"#ede0c8",8:"#f2b179",16:"#f59563",32:"#f67c5f",64:"#f65e3b"};
    var cell=Math.min(W,H)/4-6,pad=8;
    for(var r=0;r<4;r++)for(var c=0;c<4;c++){
      var v=tiles[r][c];ctx.fillStyle=tc[v]||"#edc22e";
      ctx.fillRect(pad+c*(cell+4),pad+r*(cell+4),cell,cell);
      ctx.fillStyle=v>4?"#f9f6f2":"#776e65";ctx.font="bold 14px system-ui";ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.fillText(String(v),pad+c*(cell+4)+cell/2,pad+r*(cell+4)+cell/2);
    }
  }else if(id==="flappy"){
    ctx.fillStyle="#70c5ce";ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#5ea512";ctx.fillRect(W*0.55,0,40,H*0.35);ctx.fillRect(W*0.55,H*0.55,40,H*0.3);
    ctx.fillStyle="#ded895";ctx.fillRect(0,H*0.85,W,H*0.15);
    ctx.fillStyle="#f8e71c";ctx.beginPath();ctx.ellipse(W*0.3,H*0.45,16,14,0,0,Math.PI*2);ctx.fill();
  }else if(id==="dino"){
    ctx.fillStyle="#f7f7f7";ctx.fillRect(0,0,W,H);
    ctx.strokeStyle="#535353";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,H*0.75);ctx.lineTo(W,H*0.75);ctx.stroke();
    ctx.fillStyle="#535353";ctx.fillRect(W*0.25,H*0.55,28,H*0.2);ctx.fillRect(W*0.55,H*0.6,12,H*0.15);ctx.fillRect(W*0.7,H*0.58,14,H*0.17);
  }else if(id==="minesweeper"){
    ctx.fillStyle="#1e293b";ctx.fillRect(0,0,W,H);
    for(var r=0;r<5;r++)for(var c=0;c<6;c++){
      ctx.fillStyle=(r+c)%3===0?"#0f172a":"#334155";
      ctx.fillRect(12+c*30,12+r*28,26,24);
      if((r+c)%4===0){ctx.fillStyle="#f87171";ctx.font="12px system-ui";ctx.fillText("*",20+c*30,28+r*28);}
    }
  }else if(id==="memory"){
    ctx.fillStyle="#1e1b4b";ctx.fillRect(0,0,W,H);
    var em=["🍎","⭐","🔥","💎"];
    for(var i=0;i<8;i++){
      var x=16+(i%4)*48,y=20+Math.floor(i/4)*60;
      ctx.fillStyle=i%3===0?"#312e81":"#4c1d95";
      ctx.fillRect(x,y,42,50);
      if(i%3===0){ctx.font="22px system-ui";ctx.fillText(em[i%4],x+8,y+34);}
    }
  }else if(id==="ttt"){
    ctx.fillStyle="#0f172a";ctx.fillRect(0,0,W,H);
    ctx.strokeStyle="#475569";ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(W/3,16);ctx.lineTo(W/3,H-16);ctx.moveTo(2*W/3,16);ctx.lineTo(2*W/3,H-16);
    ctx.moveTo(16,H/3);ctx.lineTo(W-16,H/3);ctx.moveTo(16,2*H/3);ctx.lineTo(W-16,2*H/3);ctx.stroke();
    ctx.fillStyle="#38bdf8";ctx.font="bold 28px system-ui";ctx.textAlign="center";ctx.fillText("X",W/6,H/3-10);
    ctx.fillStyle="#f472b6";ctx.fillText("O",W/2,H/2+10);ctx.fillStyle="#38bdf8";ctx.fillText("X",5*W/6,2*H/3+20);
  }else if(id==="stack"){
    ctx.fillStyle="#1e1b4b";ctx.fillRect(0,0,W,H);
    for(var i=0;i<5;i++){
      ctx.fillStyle="hsl("+((i*40)%360)+",80%,55%)";
      ctx.fillRect(40+i*6,H-30-i*22,W-80-i*12,20);
    }
  }else if(id==="geometry"){
    ctx.fillStyle="#0a0a2e";ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#facc15";ctx.save();ctx.translate(60,H/2);ctx.rotate(0.3);ctx.fillRect(-12,-12,24,24);ctx.restore();
    ctx.fillStyle="#111";for(var i=0;i<4;i++){ctx.beginPath();ctx.moveTo(120+i*40,H/2+20);ctx.lineTo(132+i*40,H/2-10);ctx.lineTo(144+i*40,H/2+20);ctx.fill();}
    ctx.fillStyle="#22c55e";ctx.fillRect(0,H*0.7,W,H*0.3);
  }else if(id==="slope"){
    ctx.fillStyle="#020617";ctx.fillRect(0,0,W,H);
    ctx.strokeStyle="#22d3ee";ctx.lineWidth=3;ctx.shadowColor="#22d3ee";ctx.shadowBlur=8;
    ctx.beginPath();ctx.moveTo(0,H*0.3);ctx.quadraticCurveTo(W*0.4,H*0.8,W,H*0.4);ctx.stroke();
    ctx.shadowBlur=0;ctx.fillStyle="#f43f5e";ctx.beginPath();ctx.arc(W*0.45,H*0.55,12,0,Math.PI*2);ctx.fill();
  }else if(id==="subway"){
    ctx.fillStyle="#1e3a5f";ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#334155";ctx.fillRect(0,H*0.55,W,H*0.45);
    ctx.fillStyle="#f59e0b";ctx.fillRect(W*0.4,H*0.4,30,50);
    ctx.fillStyle="#64748b";ctx.fillRect(W*0.15,H*0.35,50,80);ctx.fillRect(W*0.65,H*0.3,55,90);
  }else{
    ctx.fillStyle="#6366f1";ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#fff";ctx.font="bold 32px system-ui";ctx.textAlign="center";ctx.fillText("?");
  }
}

var searchInput=document.getElementById("searchInput");
var categoryPills=document.getElementById("categoryPills");
var featuredGrid=document.getElementById("featuredGrid");
var gamesGrid=document.getElementById("gamesGrid");
var gameCountEl=document.getElementById("gameCount");
var noResults=document.getElementById("noResults");
var gamePlayer=document.getElementById("gamePlayer");
var playerBack=document.getElementById("playerBack");
var playerTitle=document.getElementById("playerTitle");
var playerDiff=document.getElementById("playerDiff");
var playArea=document.getElementById("playArea");
var gameFrame=document.getElementById("gameFrame");
var currentCategory="all",searchQuery="",currentGame=null;

function getDiff(){try{return localStorage.getItem("phDiff")||"mid";}catch(e){return "mid";}}
function setDiff(d){try{localStorage.setItem("phDiff",d);}catch(e){}}

function createCard(g){
  var c=document.createElement("div");
  c.className="game-card";c.tabIndex=0;
  var thumb=document.createElement("div");thumb.className="game-thumb";
  var cv=document.createElement("canvas");cv.width=320;cv.height=220;
  drawPreview(g.id,cv);
  thumb.appendChild(cv);
  var info=document.createElement("div");info.className="game-info";
  var t=document.createElement("div");t.className="game-title";t.textContent=g.title;
  var b=document.createElement("span");b.className="game-badge"+(g.playable?" playable":"");
  b.textContent=g.playable?"Hratelne":g.category;
  info.appendChild(t);info.appendChild(b);
  c.appendChild(thumb);c.appendChild(info);
  c.onclick=function(){openGame(g);};
  return c;
}

function renderGames(){
  var filtered=GAMES.filter(function(g){
    return (currentCategory==="all"||g.category===currentCategory)&&(!searchQuery||g.title.toLowerCase().indexOf(searchQuery.toLowerCase())!==-1);
  });
  if(featuredGrid){featuredGrid.innerHTML="";GAMES.filter(function(g){return g.popular;}).forEach(function(g){featuredGrid.appendChild(createCard(g));});}
  if(gamesGrid){
    gamesGrid.innerHTML="";
    if(!filtered.length){if(noResults)noResults.hidden=false;}
    else{if(noResults)noResults.hidden=true;filtered.forEach(function(g){gamesGrid.appendChild(createCard(g));});}
  }
  if(gameCountEl)gameCountEl.textContent=filtered.length+" her";
}
function syncDiff(){if(!playerDiff)return;var d=getDiff();playerDiff.querySelectorAll(".diff-btn").forEach(function(b){b.classList.toggle("active",b.dataset.diff===d);});}
function startPlay(){
  if(!currentGame||!gameFrame)return;
  var g=currentGame,d=getDiff();
  if(g.playable&&g.file){gameFrame.src=g.file+(g.file.indexOf("?")>=0?"&":"?")+"diff="+d;gamePlayer.classList.add("is-playing");}
}
function openGame(g){
  if(!gamePlayer)return;
  currentGame=g;if(playerTitle)playerTitle.textContent=g.title;syncDiff();
  if(gameFrame)gameFrame.src="";gamePlayer.classList.remove("is-playing");
  if(playArea){
    playArea.innerHTML="";
    var cv=document.createElement("canvas");cv.width=320;cv.height=200;cv.style.borderRadius="12px";cv.style.maxWidth="90%";
    drawPreview(g.id,cv);playArea.appendChild(cv);
    var desc=document.createElement("p");desc.className="modal-desc";desc.textContent=g.playable?"Vyber obtiznost a stiskni Hrat":"Brzy";playArea.appendChild(desc);
    if(g.playable){
      var dLabel=getDiff()==="easy"?"Easy":(getDiff()==="hard"?"Hard":"Mid");
      var btn=document.createElement("button");btn.type="button";btn.className="play-btn";btn.id="startPlayBtn";
      btn.textContent="Hrat - "+dLabel;btn.onclick=startPlay;playArea.appendChild(btn);
    }
  }
  gamePlayer.hidden=false;gamePlayer.classList.add("is-open");document.body.style.overflow="hidden";
}
function closePlayer(){
  if(!gamePlayer)return;
  gamePlayer.classList.remove("is-open","is-playing");gamePlayer.hidden=true;
  if(gameFrame)gameFrame.src="";if(playArea)playArea.innerHTML="";document.body.style.overflow="";currentGame=null;
}
if(playerBack)playerBack.onclick=closePlayer;
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&gamePlayer&&!gamePlayer.hidden)closePlayer();});
if(playerDiff){
  playerDiff.onclick=function(e){
    if(e.target.classList.contains("diff-btn")){
      setDiff(e.target.dataset.diff);syncDiff();
      var btn=document.getElementById("startPlayBtn");
      if(btn){var dLabel=getDiff()==="easy"?"Easy":(getDiff()==="hard"?"Hard":"Mid");btn.textContent="Hrat - "+dLabel;}
      if(gamePlayer.classList.contains("is-playing")&&currentGame&&currentGame.playable)startPlay();
    }
  };
}
if(categoryPills){
  categoryPills.onclick=function(e){
    if(e.target.classList.contains("pill")){
      categoryPills.querySelectorAll(".pill").forEach(function(p){p.classList.remove("active");});
      e.target.classList.add("active");currentCategory=e.target.dataset.cat;renderGames();
    }
  };
}
if(searchInput){searchInput.oninput=function(e){searchQuery=e.target.value.trim();renderGames();};}
renderGames();
