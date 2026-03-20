// Placeholder movies
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

// Populate carousels
function populateCarousel(id, movies){
  const container=document.getElementById(id);
  movies.forEach(m=>{
    const div=document.createElement('div');
    div.className='movie-card';
    div.innerHTML=`<img src="${m.img}" alt="${m.name}"><p>${m.name}</p>`;
    container.appendChild(div);
  });
}

populateCarousel('trendingCarousel', trendingMovies);
populateCarousel('newCarousel', newMovies);

// Scroll horizontally with mouse wheel
document.querySelectorAll('.movie-carousel').forEach(carousel=>{
  carousel.addEventListener('wheel', e=>{
    e.preventDefault();
    carousel.scrollLeft += e.deltaY;
  });
});
