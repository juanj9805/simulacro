import * as Api from "./src/services/api.js";

const container = document.querySelector("#container");

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
const renderProducts = function (products) {
  container.innerHTML = "";

  products.forEach((product) => {
    const html = `
      <div class="col-4">
        <div class="card">
          <img class="card-img-top" src="${product.image}" alt="" />
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h4 class="card-title">${product.name}</h4>
              <p class="card-text text-success fw-bolder">${product.price}</p>
            </div>
            <p class="card-text">${product.description}</p>
            <button data-id="${product.id}" class="btn btn-success">
              Add to order
            </button>
            <button data-id="${product.id}" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
  });
};

let allProducts = [];

window.addEventListener("DOMContentLoaded", async function () {
  allProducts = await Api.getData("products");
  renderProducts(allProducts);
});

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase().trim();

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query),
  );

  renderProducts(filteredProducts);
});
