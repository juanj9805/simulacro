import * as Api from "./../services/api.js";

const container = document.querySelector("#container");
const cartProducts = [];

const renderProducts = async function () {
  const products = await Api.getData("products");
  let cardId = "";

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
    cardId = product.id;
  });
};

window.addEventListener("DOMContentLoaded", renderProducts);

container.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-success")) {
    const id = e.target.dataset.id;
    addOrder(id);
  }
});

container.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-danger")) {
    const id = e.target.dataset.id;
    alert(id);
    deleteOrder(id);
  }
});

const deleteOrder = async function (id) {
  Api.deleteData("products", id);
};

const storeOrder = async function (product) {
  cartProducts.push(product);

  const justIds = cartProducts.map((product) => product.id);
  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price,
    0,
  );

  localStorage.setItem(
    "shoppingCart",
    JSON.stringify({
      date: Date(),
      productsId: justIds,
      userId: "1",
      total: cartTotal,
    }),
  );
};

const addOrder = async function (id) {
  const containerOrders = document.querySelector("#containerOrders");

  const product = await Api.getDataById("products", id);

  storeOrder(product);

  //   await Api.sendData("shoppingCart", {
  //     productsId: [product.id],
  //     UserId: "1",
  //     total: 0,
  //   });

  const { productsId } = JSON.parse(localStorage.getItem("shoppingCart"));

  const html = `
  <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <div class="me-3">
          <img class+"img-fluid" src="${product.image}" style="width: 70px;" alt="" />
        </div>
        <div class="d-flex flex-column">
          <h4>${product.name}</h4>
          <p>no onion</p>
        </div>
      </div>
      <div>
        <p>${product.price}</p>
      </div>
    </div>
      `;

  containerOrders.insertAdjacentHTML("beforeend", html);
};

const confirmOrder = document.querySelector("#confirmOrder");

confirmOrder.addEventListener("click", async function () {
  //   const cartTotal = 0;
  const justIds = cartProducts.map((product) => product.id);
  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price,
    0,
  );

  localStorage.setItem(
    "shoppingCart",
    JSON.stringify({
      date: Date(),
      productsId: justIds,
      userId: "1",
      total: cartTotal,
    }),
  );

  Api.sendData("shoppingCart", {
    date: Date(),
    productsId: justIds,
    userId: "1",
    total: cartTotal,
  });
});
