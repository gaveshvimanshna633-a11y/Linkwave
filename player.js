function loadPlayer(){
let video=localStorage.getItem("video");
if(video){show(video); return;}
let id=localStorage.getItem("movieID");
db.collection("movies").doc(id).get().then(doc=>{show(doc.data().watch);});
}

function show(v){
document.getElementById("player").innerHTML=`<iframe width="100%" height="300" src="${v}" frameborder="0" allowfullscreen></iframe>`;
}
loadPlayer();
