import * as Api from "./../services/api.js";

const login = document.querySelector("#login");

login.addEventListener("submit", async function (e) {
  e.preventDefault();
  const mail = document.querySelector("#mail");
  const password = document.querySelector("#password");
  const rol = document.querySelector("#rol");
  console.log(rol.value);

  const users = await Api.getData("users");

  const found = users.find(
    (user) =>
      user.email === mail.value.trim() &&
      user.password === password.value.trim() &&
      user.rol === rol.value.trim(),
  );

  if (!found) return;

  if (found.rol === "admin") {
    window.location = "./../pages/admin.html";
  }

  if (found.rol === "user") {
    window.location = "./../pages/index.html";
  }
});
