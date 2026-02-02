import * as Api from "./src/services/api.js";

// const regModal = document.querySelector("#regModal");
// const editModal = document.querySelector("#editModal");
const registerForm = document.querySelector("#registerForm");
const editForm = document.querySelector("#editForm");

registerForm.addEventListener("submit", async function () {
  const modalEmail = document.querySelector("#modalEmail");
  const modalPass = document.querySelector("#modalPass");
  await Api.sendData("users", {
    email: modalEmail.value,
    password: modalPass.value,
    rol: "user",
  });
});

const edit = document.querySelector("#edit");

edit.addEventListener("click", async function () {
  const user = await Api.getDataById("users", "95c1");
  console.log(user);

  console.log(user.email);
  console.log(user.password);

  editModalEmail.value = user.email;
  editModalPass.value = user.password;
});

editForm.addEventListener("submit", async function () {
  const editModalEmail = document.querySelector("#editModalEmail");
  const editModalPass = document.querySelector("#editModalPass");
  await Api.patchData("users", "95c1", {
    email: editModalEmail.value,
    password: editModalPass.value,
  });
});
