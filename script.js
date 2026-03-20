let movies = JSON.parse(localStorage.getItem("movies")) || [];

const container = document.getElementById("movies");

function save() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function showMovies(list) {
  container.innerHTML = "";

  list.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "movie";

    div.innerHTML = `
      <img src="${m.img}">
      <h3>${m.name}</h3>
    `;

    div.onclick = () => openDetails(m);

    container.appendChild(div);
  });
}

function openDetails(m) {
  document.getElementById("details").style.display = "flex";
  document.getElementById("d-img").src = m.img;
  document.getElementById("d-title").innerText = m.name;
  document.getElementById("d-year").innerText = m.year;
  document.getElementById("d-desc").innerText = m.desc;
  document.getElementById("d-link").href = m.link;
}

document.getElementById("close").onclick = () => {
  document.getElementById("details").style.display = "none";
};

// search
document.getElementById("search").oninput = e => {
  const val = e.target.value.toLowerCase();
  const filtered = movies.filter(m =>
    m.name.toLowerCase().includes(val)
  );
  showMovies(filtered);
};

// admin open
document.getElementById("adminBtn").onclick = () => {
  document.getElementById("admin").style.display = "flex";
};

// close admin
document.getElementById("closeAdmin").onclick = () => {
  document.getElementById("admin").style.display = "none";
};

// add movie
document.getElementById("add").onclick = () => {
  const m = {
    name: name.value,
    img: img.value,
    year: year.value,
    link: link.value,
    desc: desc.value
  };

  movies.push(m);
  save();
  showMovies(movies);
};

showMovies(movies);
