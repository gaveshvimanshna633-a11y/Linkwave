// Example: Horizontal scroll for carousels with mouse wheel
document.querySelectorAll('.movie-carousel').forEach(carousel=>{
  carousel.addEventListener('wheel', e=>{
    e.preventDefault();
    carousel.scrollLeft += e.deltaY;
  });
});
