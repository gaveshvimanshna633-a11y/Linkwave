const sidebar = document.getElementById("sidebar");
document.getElementById("menuBtn").onclick = () => {
  sidebar.classList.toggle("active");
};

const movies = [
  { name: "KGF 2", img: "https://via.placeholder.com/150" },
  { name: "Iron Man", img: "https://via.placeholder.com/150" },
  { name: "Avatar", img: "https://via.placeholder.com/150" }
];

const container = document.getElementById("movies");

movies.forEach(m => {
  const div = document.createElement("div");
  div.className = "movie";

  div.innerHTML = `
    <img src="${m.img}">
    <p>${m.name}</p>
  `;

  container.appendChild(div);
});
