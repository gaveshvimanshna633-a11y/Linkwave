function loadTV(){
db.collection("tvseries").get().then(s=>{
let c=document.getElementById("tvList");
s.forEach(doc=>{
let m=doc.data();
c.innerHTML+=`<div class="card" onclick="openTV('${doc.id}')"><img src="${m.image}"><p>${m.title}</p></div>`;
});});}

function openTV(id){localStorage.setItem("tvID",id); location="episodes.html";}
loadTV();
