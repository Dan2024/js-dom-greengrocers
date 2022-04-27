const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

const storeItemUl = document.querySelector(".store--item-list");
const cartItemUl = document.querySelector(".cart--item-list");

function renderStoreItems() {
  state.items.forEach((item) => {
    const html = `
    <li class="store-item">
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button class="add-to-cart">Add to cart</button>
    </li>`;

    storeItemUl.insertAdjacentHTML("beforeend", html);
  });
}
renderStoreItems();

const addToCartBtn = document.querySelectorAll(".add-to-cart");
addToCartBtn.forEach((element) => {
  element.addEventListener("click", addItemToCart);
});

function addItemToCart(e) {
  let itemName = e.target.closest("li").querySelector("img").alt;

  const foundItem = state.items.find((item) => item.name === itemName);
  const foundItemCart = state.cart.find((item) => item.item.name === itemName);

  if (!foundItemCart) state.cart.push({ item: foundItem, quantity: 1 });
  else {
    foundItemCart.quantity++;
  }

  renderCartItems();
}

function renderCartItems() {
  cartItemUl.innerHTML = "";

  state.cart.forEach((item) => {
    const cartItem = `
      <li class="cart--item">
        <img
        class="cart--item-icon"
        src="assets/icons/${item.item.id}.svg"
        alt="${item.item.name}"
        />
        <p>${item.item.name}</p>
        <button class="quantity-btn remove-btn center">-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button class="quantity-btn add-btn center">+</button>
      </li>`;

    cartItemUl.insertAdjacentHTML("beforeend", cartItem);
  });

  const incrementQuantityBtn = document.querySelectorAll(".add-btn");
  incrementQuantityBtn.forEach((element) => {
    element.addEventListener("click", incrementQuantity);
  });

  const decrementQuantityBtn = document.querySelectorAll(".remove-btn");
  decrementQuantityBtn.forEach((element) => {
    element.addEventListener("click", decrementQuantity);
  });

  const test = state.cart.reduce((acc, item) => {
    // console.log(state.cart);
    return acc + item.quantity * item.item.price;
  }, 0);

  console.log(test);
}

function decrementQuantity(e) {
  let itemName = e.target.closest("li").querySelector("img").alt;

  const foundItemCart = state.cart.find((item) => item.item.name === itemName);

  if (foundItemCart.quantity > 1) foundItemCart.quantity--;
  else {
    const foundItemCartIndex = state.cart.indexOf(foundItemCart);
    state.cart.splice(foundItemCartIndex, 1);
  }

  renderCartItems();
}

function incrementQuantity(e) {
  let itemName = e.target.closest("li").querySelector("img").alt;

  const foundItemCart = state.cart.find((item) => item.item.name === itemName);
  foundItemCart.quantity++;

  renderCartItems();
}
