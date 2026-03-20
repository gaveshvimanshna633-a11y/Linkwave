// SIDE MENU
const menu = document.getElementById("sideMenu");
document.getElementById("menuBtn").onclick = () => menu.classList.add("active");
document.getElementById("closeMenu").onclick = () => menu.classList.remove("active");

// ADMIN PANEL
const adminPanel = document.getElementById("adminPanel");
document.getElementById("adminBtnMenu").onclick = () => adminPanel.style.display = "flex";
document.getElementById("closeAdmin").onclick = () => adminPanel.style.display = "none";

// MOVIES GRID
let movies = JSON.parse(localStorage.getItem("movies")) || [];
const container = document.getElementById("movies");

function renderMovies() {
  container.innerHTML = "";
  movies.forEach(m => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `<img src="${m.img}" alt="${m.name}"><p>${m.name}</p>`;
    container.appendChild(div);
  });
}
renderMovies();

// ADD MOVIE
document.getElementById("addMovieBtn").onclick = () => {
  const name = document.getElementById("movieName").value;
  const img = document.getElementById("movieImg").value;
  const year = document.getElementById("movieYear").value;
  const link = document.getElementById("movieLink").value;
  const desc = document.getElementById("movieDesc").value;

  if (!name || !img) return alert("Enter movie name and image");

  const movie = { name, img, year, link, desc };
  movies.push(movie);
  localStorage.setItem("movies", JSON.stringify(movies));

  renderMovies();

  // Clear inputs
  document.getElementById("movieName").value = "";
  document.getElementById("movieImg").value = "";
  document.getElementById("movieYear").value = "";
  document.getElementById("movieLink").value = "";
  document.getElementById("movieDesc").value = "";

  adminPanel.style.display = "none";
};

// SEARCH FUNCTIONALITY
document.getElementById("searchInput").addEventListener("input", (e)=>{
  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".movie").forEach(m=>{
    const title = m.querySelector("p").textContent.toLowerCase();
    m.style.display = title.includes(value) ? "block" : "none";
  });
});
