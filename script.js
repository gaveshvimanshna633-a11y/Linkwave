// Sample Movies
const trendingMovies = [
  { name:"Movie 1", img:"https://via.placeholder.com/200x300" },
  { name:"Movie 2", img:"https://via.placeholder.com/200x300" },
  { name:"Movie 3", img:"https://via.placeholder.com/200x300" }
];
const newMovies = [
  { name:"Movie A", img:"https://via.placeholder.com/200x300" },
  { name:"Movie B", img:"https://via.placeholder.com/200x300" },
  { name:"Movie C", img:"https://via.placeholder.com/200x300" }
];

// Populate Carousels
function populateCarousel(id,movies){
  const container=document.getElementById(id);
  movies.forEach(m=>{
    const div=document.createElement('div');
    div.className='movie-card';
    div.innerHTML=`<img src="${m.img}"><p>${m.name}</p>`;
    container.appendChild(div);
  });
}
populateCarousel('trendingCarousel',trendingMovies);
populateCarousel('newCarousel',newMovies);

// Horizontal scroll
document.querySelectorAll('.movie-carousel').forEach(carousel=>{
  carousel.addEventListener('wheel', e=>{
    e.preventDefault();
    carousel.scrollLeft += e.deltaY;
  });
});

// Admin Panel
const adminPanel=document.getElementById('admin-panel');
document.getElementById('menuBtn').onclick=()=>{adminPanel.style.display='flex';};
document.getElementById('close-admin').onclick=()=>{adminPanel.style.display='none';};
document.getElementById('admin-login').onclick=()=>{ alert('Admin login placeholder'); adminPanel.style.display='none'; };
