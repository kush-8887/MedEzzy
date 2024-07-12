//Change array stores channged items
let CHANGE_OBJ = {};

//Fetch cart items
async function getCartItems() {
  const res = await fetch("http://localhost:8080/getCart");
  const data = await res.json();
  return data;
}

//Display cart items
function displayCartItems(data) {
  const cartItemCont = document.getElementById("cart-item-cont");

  if (data.length === 0) {
    cartItemCont.innerText += "No items in cart";
  } else {
    cartItemCont.innerText += "";
    data.forEach((d) => {
      cartItemCont.innerHTML += `
            <div class="cart-item-card">
            <button class="delete-item" id = "d-${d.product_id}">
                <img src="/assets/svgs/shop/cross-svgrepo-com.svg" alt="" srcset="">
            </button>
            <div class="item-info-cont">
                <div class="med-img">
                    <img src="${d.product_img}"
                        alt="">
                </div>
                <div class="med-name mobile-flex">
                    <div class="mobile-label">
                        Name:
                    </div>
                    <a href="/shop/item/${d.product_id}" class="item-link">
                        ${d.product_name}
                    </a>
                </div>
            </div>
            <div class="cart-prices-cont">
                <div class="med-price mobile-flex">
                    <div class="mobile-label">
                        Price:
                    </div>
                    <div id="b-${d.product_id}">
                    ₹${d.product_price}
                    </div>
                </div>
                <div class="item-quantity-cont mobile-flex">
                    <div class="mobile-label">
                        Quantity:
                    </div>
                    <div class="border">
                        <button class="quant-btn increase" id="i-${d.product_id}">+</button>
                        <input type="text" type="number" value="${d.product_quantity}" min="1" class="item-quant"  class="item-quant"
                            id="quant-${d.product_id}" readonly>
                        <button class="quant-btn decrease" id="d-${d.product_id}">-</button>
                    </div>
                </div>
                <div class="item-sub-total mobile-flex">
                    <div class="mobile-label">
                        Subtotal:
                    </div>
                    <div id="sub-${d.product_id}" class="p-sub">
                        ₹${d.product_subtotal}
                    </div>
                </div>
            </div>
        </div>
            `;
    });
  }
}

//Add event listners to quant btns
function eventListenerAdd() {
  const increaseBtn = document.getElementsByClassName("increase");
  const decreaseBtn = document.getElementsByClassName("decrease");
  Array.from(increaseBtn).forEach((btn) => {
    btn.addEventListener("click", () => increaseFunc(btn));
  });
  Array.from(decreaseBtn).forEach((btn) => {
    btn.addEventListener("click", () => decreaseFunc(btn));
  });
}

//Add event listeners to all delete btns
function eventListenerAddDelete() {
  const deleteBtns = document.getElementsByClassName("delete-item");
  Array.from(deleteBtns).forEach((d) => {
    d.addEventListener("click", () => deleteItem(d));
  });
}

//Increase quantity function
function increaseFunc(btn) {
  let id = btn.id;
  let productId = id.substring(2);
  let quantityCont = document.getElementById(`quant-${productId}`);
  let quantity = parseInt(quantityCont.value);
  if (quantity === 3) {
    window.alert("Max quantity!");
  } else {
    quantity += 1;
    quantityCont.value = quantity;
    calcProdSubTotal(productId, quantity);
  }
  quantityCont.value = quantity;
}

//decrease quantity function
function decreaseFunc(btn) {
  let id = btn.id;
  let productId = id.substring(2);
  let quantityCont = document.getElementById(`quant-${productId}`);
  let quantity = parseInt(quantityCont.value);
  if (quantity === 1) {
  } else {
    quantity -= 1;
    quantityCont.value = quantity;
    calcProdSubTotal(productId, quantity);
  }
}

//Delete cart item
async function deleteItem(d) {
  const productId = d.id.substring(2);

  // Check if item is in CHANGE_OBJ if item is removed before update
  if (CHANGE_OBJ.hasOwnProperty(productId)) {
    delete CHANGE_OBJ[productId];
  }

  // Reduce the cart total
  let itemSub = parseInt(
    document.getElementById(`sub-${productId}`).innerText.trim().substring(1)
  );
  console.log(itemSub);

  // Delete from database
  try {
    const response = await fetch("/deleteItem", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        sub_total: itemSub,
      }),
    });

    if (response.ok) {
      console.log("Deleted!");
      window.location.reload();
    } else {
      console.error("Unable to delete");
    }
  } catch (error) {
    console.log("Unexpected error occurred: ", error);
  }
}

// update subtotal of product
function calcProdSubTotal(id, quantity) {
  let subStrCont = document.getElementById(`sub-${id}`);
  let basePriceCont = document.getElementById(`b-${id}`).innerText;
  let basePrice = parseInt(basePriceCont.trim().substring(1));
  let subTotal = basePrice * quantity;
  subStrCont.innerText = `₹${subTotal}`;

  updateCartTotal();
  addtoUpdatedCart(id, quantity, subTotal);
}

//Update cart total
function updateCartTotal() {
  let GRAND_TOTAL = 0;

  let cartSub = document.getElementById("cart-subtotal");
  let cartTotal = document.getElementById("cart-total");
  let prodSub = document.getElementsByClassName("p-sub");

  Array.from(prodSub).forEach((s) => {
    if (s === null) {
      cartSub.innerText = `₹${GRAND_TOTAL}`;
      cartTotal.innerText = `₹${GRAND_TOTAL}`;
    }
    let sub = parseInt(s.innerText.trim().substring(1));
    GRAND_TOTAL += sub;
  });

  cartSub.innerText = `₹${GRAND_TOTAL}`;
  cartTotal.innerText = `₹${GRAND_TOTAL}`;
}

//Add to updated cart array
function addtoUpdatedCart(id, quantity, subTotal) {
  if (CHANGE_OBJ.hasOwnProperty(id)) {
    CHANGE_OBJ[id]["quantity"] = parseInt(quantity);
    CHANGE_OBJ[id]["subtotal"] = parseInt(subTotal);
  } else {
    CHANGE_OBJ[id] = {
      quantity: parseInt(quantity),
      subtotal: parseInt(subTotal),
    };
  }
}

//Get the grand total
function getGrandTotal() {
  let cartTotal = parseInt(
    document.getElementById("cart-total").innerText.trim().substring(1)
  );
  if (cartTotal === "") {
    return 0;
  }
  return cartTotal;
}

//Update cart
const updateBtn = document.getElementById("update-cart");
const alertcontSucess = document.getElementById("alertcontSucess");
const alertcontFail = document.getElementById("alertcontFail");
updateBtn.addEventListener("click", async (e) => {
  let grandTotal = getGrandTotal();
  CHANGE_OBJ["grand"] = grandTotal;
  e.preventDefault(); // Prevent the default form submission behavior

  // Assuming CHANGE_OBJ is a global variable containing the cart data
  await fetch("/updatecart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CHANGE_OBJ),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Cart updated successfully.");
        alertcontSucess.style.display = "flex";
        CHANGE_OBJ = {}; // Clear the CHANGE_OBJ after successful update
      } else {
        alertcontFail.style.display = "flex";
        console.error("Failed to update cart.");
      }
    })
    .catch((error) => {
      console.error("Error occurred while updating cart:", error);
    });
});

//On document load
document.addEventListener("DOMContentLoaded", async () => {
  let cartItems = await getCartItems();
  displayCartItems(cartItems);
  eventListenerAdd();
  eventListenerAddDelete();
  updateCartTotal();

  //Update the total in the db when page is reloaded!

});
