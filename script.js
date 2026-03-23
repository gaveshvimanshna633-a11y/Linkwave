// 🔥 Firebase Config (oya eka dapan)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB",
  projectId: "YOUR_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

let currentUser = null;

// 🔐 AUTH
function register() {
  auth.createUserWithEmailAndPassword(
    document.getElementById("email").value,
    document.getElementById("password").value
  );
}

function login() {
  auth.signInWithEmailAndPassword(
    document.getElementById("email").value,
    document.getElementById("password").value
  );
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    document.getElementById("authBox").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("form").style.display = "block";
    loadProfile();
  }
});

// 👤 PROFILE
function saveProfile() {
  let name = document.getElementById("username").value;
  let avatar = "https://api.dicebear.com/7.x/initials/svg?seed=" + name;

  db.ref("users/" + currentUser.uid).set({ name, avatar });
}

function loadProfile() {
  db.ref("users/" + currentUser.uid).once("value", snap => {
    let d = snap.val();
    if (d) {
      document.getElementById("username").value = d.name;
      document.getElementById("avatar").src = d.avatar;
    }
  });
}

// 🔔 NOTIFICATION
function sendNotification(text) {
  db.ref("notifications").push({ text });
}

function toggleNoti() {
  let box = document.getElementById("notiList");
  box.style.display = box.style.display === "none" ? "block" : "none";
  document.getElementById("notiCount").innerText = 0;
}

db.ref("notifications").on("value", snap => {
  let data = snap.val() || {};
  let html = "";
  let count = 0;

  for (let id in data) {
    html += `<div class="noti">${data[id].text}</div>`;
    count++;
  }

  document.getElementById("notiList").innerHTML = html;
  document.getElementById("notiCount").innerText = count;
});

// ➕ ADD LINK
function addLink() {
  let title = document.getElementById("title").value;
  let url = document.getElementById("url").value;

  let preview = "https://image.thum.io/get/" + url;

  db.ref("links").push({
    title,
    url,
    preview,
    user: currentUser.uid,
    likes: 0
  });

  sendNotification("New link added: " + title);
}

// ❤️ LIKE
function like(id) {
  db.ref("links/" + id).once("value", snap => {
    let l = snap.val().likes || 0;
    db.ref("links/" + id).update({ likes: l + 1 });
  });
}

// 💬 COMMENT
function comment(id) {
  let text = prompt("Comment");
  if (!text) return;

  db.ref("comments/" + id).push({
    text,
    user: currentUser.uid
  });

  sendNotification("New comment added 💬");
}

// 🚨 REPORT
function report(id) {
  db.ref("reports").push({ id, user: currentUser.uid });
  sendNotification("Link reported 🚨");
}

// 🌗 THEME
function toggleTheme() {
  document.body.classList.toggle("light");
}

// 📡 LOAD LINKS
db.ref("links").on("value", snap => {
  let data = snap.val();
  let html = "";

  for (let id in data) {
    let l = data[id];

    html += `
      <div class="card">
        <img src="${l.preview}" class="preview">
        <h3>${l.title}</h3>
        <a href="${l.url}" target="_blank">Open</a>
        <p>❤️ ${l.likes}</p>
        <button onclick="like('${id}')">Like</button>
        <button onclick="comment('${id}')">Comment</button>
        <button onclick="report('${id}')">Report</button>
      </div>
    `;
  }

  document.getElementById("links").innerHTML = html;
});
