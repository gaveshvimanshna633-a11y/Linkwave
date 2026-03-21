// Menu toggle
function toggleMenu(){document.getElementById("sideMenu").classList.toggle("active");}

// Load Movies
function loadMovies(){
db.collection("movies").get().then(s=>{
let c=document.getElementById("movieList"); c.innerHTML="";
s.forEach(doc=>{
let m=doc.data();
c.innerHTML+=`<div class="card" onclick="openMovie('${doc.id}')"><img src="${m.image}"><h4>${m.title}</h4></div>`;
});});}

// Open Movie Page
function openMovie(id){localStorage.setItem("movieID",id); location="movie.html";}

// Search
function searchMovies(){
let q=search.value.toLowerCase();
db.collection("movies").get().then(s=>{
let c=document.getElementById("movieList"); c.innerHTML="";
s.forEach(doc=>{
let m=doc.data();
if(m.title.toLowerCase().includes(q)){
c.innerHTML+=`<div class="card" onclick="openMovie('${doc.id}')"><img src="${m.image}"><h4>${m.title}</h4></div>`;
}});});}

// Favorites
function addFavorite(){
let u=auth.currentUser;
if(!u){alert("Login first"); return;}
db.collection("favorites").add({user:u.uid,movie:localStorage.getItem("movieID")});
alert("Added ❤️");}

// Comments
function addComment(){
let u=auth.currentUser;
if(!u){alert("Login first"); return;}
db.collection("comments").add({user:u.email,movie:localStorage.getItem("movieID"),text:commentInput.value,time:new Date()});
commentInput.value=""; loadComments();
}

function loadComments(){
let id=localStorage.getItem("movieID");
db.collection("comments").where("movie","==",id).get().then(s=>{
let c=document.getElementById("comments"); c.innerHTML="";
s.forEach(d=>{let x=d.data(); c.innerHTML+=`<p>${x.user}: ${x.text}</p>`;});});
}

// Init
if(document.getElementById("movieList")) loadMovies();
if(document.getElementById("comments")) loadComments();
