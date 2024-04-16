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
    }
}

//Add to cart
async function addToCart(){
    const btn = document.getElementById('addToCart-btn');
    const id = document.getElementById('hiden-elem').innerText.trim();
    
    let name = document.getElementById(`n-${id}`).innerText;
    let img = document.getElementById(`i-${id}`).src;
    let quantity = parseInt(document.getElementById(`quant-${id}`).value);
    let price = parseInt(document.getElementById(`d-${id}`).innerText.trim().substring(1));
    let amount = quantity * price;
    console.log(amount);

    let data = {
      productId: id,
        name : name,
        img : img,
        quantity: quantity,
        amount: amount
    }

    console.log(data);
    await fetch(`/addtocart/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Cart updated successfully.");
            btn.innerText ="In Cart"
            btn.disabled = true;
          } else {
            console.error("Failed to update cart.");
          }
        })
        .catch((error) => {
          console.error("Error occurred while updating cart:", error);
        });
}

//Add eventlistener to addToCart 
const btn = document.getElementById('addToCart-btn');
btn.addEventListener('click',()=>{
    addToCart()
})

document.addEventListener("DOMContentLoaded", async () => {
    eventListenerAdd();
  });