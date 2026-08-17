const photos = [
  "images/photo1.jpg","images/photo2.jpg","images/photo3.jpg",
  "images/photo4.jpg","images/photo5.jpg","images/photo6.jpg","images/photo7.jpg"
];

let current = 0;
const gallery = document.getElementById("gallery");
const dots = document.getElementById("dots");

photos.forEach((src,i)=>{
  const card=document.createElement("div");
  card.className="photo";
  card.dataset.index=i;
  const img=document.createElement("img");
  img.src=src;
  img.alt=`Memory ${i+1}`;
  img.onerror=()=>{
    card.innerHTML=`<div class="placeholder"><strong>Memory ${i+1} ❤️</strong><br><br>Add your photo here:<br><code>${src}</code></div>`;
  };
  card.appendChild(img);
  gallery.appendChild(card);

  const dot=document.createElement("span");
  dot.className="dot";
  dot.onclick=()=>goTo(i);
  dots.appendChild(dot);
});

function renderGallery(){
  [...document.querySelectorAll(".photo")].forEach((el,i)=>{
    el.className="photo";
    if(i===current) el.classList.add("active");
    else if(i===(current-1+photos.length)%photos.length) el.classList.add("prev");
    else if(i===(current+1)%photos.length) el.classList.add("next");
  });
  [...document.querySelectorAll(".dot")].forEach((d,i)=>d.classList.toggle("active",i===current));
}
function goTo(i){current=(i+photos.length)%photos.length;renderGallery()}
function nextPhoto(){goTo(current+1)}
function prevPhoto(){goTo(current-1)}
renderGallery();

let auto=setInterval(nextPhoto,5000);
document.querySelector(".gallery-wrap").addEventListener("mouseenter",()=>clearInterval(auto));
document.querySelector(".gallery-wrap").addEventListener("mouseleave",()=>auto=setInterval(nextPhoto,5000));

function openSurprise(){
  document.querySelector("#anniversary")?.scrollIntoView({behavior:"smooth"});
  document.querySelector(".anniversary").scrollIntoView({behavior:"smooth"});
  burstHearts();
}

function showFinal(){
  document.getElementById("finalMessage").classList.add("show");
  burstHearts(30);
  document.getElementById("finalMessage").scrollIntoView({behavior:"smooth",block:"center"});
}

function burstHearts(amount=16){
  for(let i=0;i<amount;i++){
    const h=document.createElement("div");
    h.textContent=["♡","♥","✨"][Math.floor(Math.random()*3)];
    h.style.position="fixed";
    h.style.left=(45+Math.random()*10)+"%";
    h.style.top=(45+Math.random()*10)+"%";
    h.style.zIndex=100;
    h.style.color="#ff72a9";
    h.style.fontSize=(14+Math.random()*24)+"px";
    h.style.pointerEvents="none";
    document.body.appendChild(h);
    const x=(Math.random()-.5)*500, y=-(100+Math.random()*400);
    h.animate([{transform:"translate(0,0) scale(.4)",opacity:0},{transform:`translate(${x}px,${y}px) scale(1.4)`,opacity:1},{transform:`translate(${x*1.2}px,${y*1.4}px) scale(.5)`,opacity:0}],{duration:1800,easing:"ease-out"}).onfinish=()=>h.remove();
  }
}

for(let i=0;i<35;i++){
  const p=document.createElement("span");
  p.className="particle";
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=(8+Math.random()*15)+"s";
  p.style.animationDelay=(-Math.random()*20)+"s";
  p.style.opacity=.2+Math.random()*.7;
  document.getElementById("particles").appendChild(p);
}

function makePetal(){
  const p=document.createElement("div");
  p.className="petal";
  p.textContent=Math.random()>.35?"♥":"✦";
  p.style.left=Math.random()*100+"%";
  p.style.fontSize=(8+Math.random()*14)+"px";
  p.style.animationDuration=(7+Math.random()*8)+"s";
  document.querySelector(".petals").appendChild(p);
  setTimeout(()=>p.remove(),16000);
}
setInterval(makePetal,700);

document.querySelectorAll("audio").forEach(audio=>{
  audio.addEventListener("play",()=>{
    document.querySelectorAll("audio").forEach(other=>{if(other!==audio)other.pause()});
  });
});
