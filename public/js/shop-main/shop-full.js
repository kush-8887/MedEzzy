// Elements
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const itemContainer = document.getElementById('itemContainer');

// Fetch link
// let baseUrl = 'http://localhost:8080/shop/v1/getitem/';
let method_GLOBAL = "base";
let filterArray = [];
let categoriesArray = [];

// Page class
class Page {
    getPage() {
        let pageNo = document.getElementById('page-no');
        return parseInt(pageNo.value);
    }
    
    setPage(pageNo) {
        let page = document.getElementById('page-no'); 
        page.value = pageNo;
    }
}

// Page class init
let p = new Page();

// Function to increase page number
increase.addEventListener('click', async () => {
    let page = p.getPage() + 1;
    p.setPage(page);
    if(method_GLOBAL === "base"){
        fetchAndUpdate();
    }
    else{
        fetchSearch()
    }
});

// Function to decrease page number
decrease.addEventListener('click', async () => {
    let page = p.getPage();
    if (page > 1) {
        page -= 1;
        p.setPage(page);
        if(method_GLOBAL === "base"){
            fetchAndUpdate();
        }
        else{
            fetchSearch()
        }
    }
});

// Function to get selected categories
function getCategories() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            addToCat();
        });
    });
}

// Function to add/remove selected categories
function addToCat() {
    categoriesArray = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            categoriesArray.push(checkbox.id);
        }
    });
    fetchAndUpdate();
};

// Function to get selected filters
function getFilters() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="a"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            addToFilt();
        });
    });
}

// Function to add/remove selected filters
function addToFilt() {
    filterArray = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="a"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            filterArray.push(checkbox.id);
        }
    });
    fetchAndUpdate();
};

// Function to fetch data with filters and categories
async function fetchAndUpdate() {
    let page = p.getPage();
    let link = generateLink(page,"base");
    const data = await fetchData(link);
    putData(data, itemContainer);
}

// Function to generate link with filters and categories
// function generateLink(page, method) {
//     let baseUrl;
//     if (method === "base") {
//       baseUrl = "http://localhost:8080/shop/v1/getitem/";
//       let link = baseUrl + `${page}/?d=default`;
//       if (categoriesArray.length > 0 || filterArray.length > 0) {
//         link += '&';
//         if (categoriesArray.length > 0) {
//           link += categoriesArray.map(cat => `cat=${cat}`).join('&');
//         }
//         if (filterArray.length > 0) {
//           link += filterArray.map(fil => `fil=${fil}`).join('&');
//         }
//         method_GLOBAL = "base";
//         return link;
//       }
//       return link; // Return early if no categories or filters
//     }
//     if (method === "search") {
//       baseUrl = `http://localhost:8080/product/v1/search/`;
//       let link = baseUrl + `${page}/?d=default`;
//       method_GLOBAL = "search";
//       console.log(link);
//       return link;
//     }
// }  

//New generate link function
function generateLink(page, method) {
    let baseUrl;
    if (method === "base") {
        baseUrl = "http://localhost:8080/shop/v1/getitem/";
        let link = baseUrl + `${page}/?d=default`;
        let params = [];
        
        if (categoriesArray.length > 0) {
            params.push(categoriesArray.map(cat => `cat=${cat}`).join('&'));
        }
        if (filterArray.length > 0) {
            params.push(filterArray.map(fil => `fil=${fil}`).join('&'));
        }
        
        if (params.length > 0) {
            link += '&' + params.join('&');
            method_GLOBAL = "base";
        }

        return link;
    }

    if (method === "search") {
        baseUrl = `http://localhost:8080/product/v1/search/`;
        let link = baseUrl + `${page}/?d=default`;
        method_GLOBAL = "search";
        return link;
    }
}

// Function to fetch data
async function fetchData(link) {
    const res = await fetch(link);
    const data = await res.json();
    return data;
}

//Fetch search data
async function fetchSearch(){
    let page = p.getPage();
    let searchWord = document.getElementById('searchBox').value;

    let link = generateLink(page,"search")
    const res = await fetch(link,{
        method : "POST",
        headers: {
            'Content-Type': 'application/json' // Set appropriate content type
          },
          body: JSON.stringify({ q: searchWord })
    });
    const data = await res.json();
    putData(data,itemContainer);
}

// Function to populate the page
function putData(data, parent) {
    parent.innerHTML = '';
    if(!Array.isArray(data) || data.length === 0){
        parent.innerHTML = "No items found!"
    }else{
        data.forEach(data => {
            let discountPercentage = data.med_dist !== null ? parseFloat(data.med_dist) : 0;
            let price = (discountPercentage === 0) ? data.med_price : Math.floor(data.med_price - (data.med_price * discountPercentage) / 100);
            parent.innerHTML += `
            <div class="item-card">
                <div class="item-img">
                    <div class="floating-menu">
                        <a href="/shop/item/${data.med_id}" target="_blank">
                        <button id="view-item">
                            <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3.5" stroke="#fff"></circle> <path d="M21 12C21 12 20 4 12 4C4 4 3 12 3 12" stroke="#fff"></path> </g></svg>
                        </button>
                        </a>
                    </div>
                    <div class="item-img-fix-div">
                        <img id="img-${data.med_id}" src="${data["med_image_url"]}" alt="">
                    </div>
                </div>
                <div class="item-info">
                    <div class="item-name">
                        <a href="/shop/item/${data.med_id}" id="name-${data.med_id}" target="_blank" rel="noopener noreferrer">${data.med_name}</a>
                    </div>
                    <div class="item-price-cont">
                        <div class="item-price-util">
                            <div class="original-price" style="color:grey; text-decoration:line-through;">MRP:₹${data.med_price}</div>
                            <div class="discount-percentage" style="color:red;">${discountPercentage}% OFF</div>
                        </div>
                        <div class="discounted-price" id="price-${data.med_id}">
                            ₹${price}
                        </div>
                    </div>
                    <div class="item-action-btns">
                        <button class="action-btn add-to-cart" data-product-id="${data.med_id}" class="addToCart" id="add-${data.med_id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>`;
        });    
    }
    eventListnerAdd();
}

//add addToCart eventlistners.
function eventListnerAdd(){
    const cartBtn = document.querySelectorAll('.add-to-cart');
    cartBtn.forEach(btn => {
        btn.addEventListener('click',()=>{
            console.log("Btn clicked");
            let productId = btn.dataset.productId;
            let btnId = btn.id ;            
            let name = document.getElementById(`name-${productId}`).innerText;
            let img = document.getElementById(`img-${productId}`).src;
            let amount = parseInt(document.getElementById(`price-${productId}`).innerText.trim().substring(1));
            console.log(productId,name,img,amount,btnId);
            addToCart(productId,name,img,amount,btnId);
        })
    })
}

//send data to server
function addToCart(productId,name,img, amount, btnId) {
    fetch(`http://localhost:8080/addtocart/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId: productId,
            name : name,
            img : img,
            quantity: 1,
            amount: amount
        })
    })
    .then(response => {
        if (!response.ok) {
            window.alert('Unable to add to cart!');
            throw new Error('Unable to add to cart');
        }
        if (response.status === 500) {
            window.alert("Item already in cart!");
        }
        // Disable the button after successful addition
        console.log(btnId);
        document.getElementById(btnId).disabled = true;
        document.getElementById(btnId).innerText = "In Cart";
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
        window.alert('Unable to add to cart!');
    });
}

//mobile filter toggle btn
let toggleFilter = document.getElementById('toggle-filter');
toggleFilter.addEventListener('click', (e) => {
    e.preventDefault();
    let filterMenu = document.getElementById('mobile-filter-cont');
    let filterBtn = document.getElementById('toggle-filter');

    if (filterMenu.classList.contains('mobile-filter-not-toggled')) {
        filterMenu.classList.remove('mobile-filter-not-toggled');
        filterMenu.classList.add('mobile-filter-toggled');
        filterBtn.textContent = 'Less';
    } else {
        filterMenu.classList.remove('mobile-filter-toggled');
        filterMenu.classList.add('mobile-filter-not-toggled');
        filterBtn.textContent = 'More';
    }
});

//Search functionalities 
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  let page = p.getPage();
  let searchWord = document.getElementById('searchBox').value;

  if (searchWord === '') {
    window.alert("Search cannot be empty");
    return; // Exit the function if search word is empty
  }
  
  let link = generateLink(page,"search");

  try {
    const response = await fetch(link, {
      method: 'POST', // Use POST for search requests
      headers: {
        'Content-Type': 'application/json' // Set appropriate content type
      },
      body: JSON.stringify({ q: searchWord }) // Send search term as JSON in request body
    });

    if (!response.ok) {
      throw new Error(`Search request failed with status: ${response.status}`);
    }

    const data = await response.json();
    putData(data,itemContainer)
    // Handle the received data (e.g., display search results)
    console.log("Search results:", data); // Replace with your logic to display data
  } catch (error) {
    window.alert("An error occurred during the search: " + error.message);
  }
});


document.addEventListener("DOMContentLoaded", () => {
    getCategories();
    getFilters();
    fetchAndUpdate();
});
