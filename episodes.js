function loadEpisodes(){
let id=localStorage.getItem("tvID");
db.collection("tvseries").doc(id).get().then(doc=>{
let data=doc.data(); let c=document.getElementById("episodes");
data.seasons.forEach(s=>{
c.innerHTML+=`<h2>Season ${s.season}</h2>`;
s.episodes.forEach(e=>{
c.innerHTML+=`<div onclick="play('${e.video}')">▶ ${e.title}</div>`;
});});});}

function play(v){localStorage.setItem("video",v); location="player.html";}
loadEpisodes();
