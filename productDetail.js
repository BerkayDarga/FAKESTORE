const details = document.querySelector(".details");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');//fakestore daki url nin sonundaki id yi çektik

document.addEventListener('DOMContentLoaded', initial);

function initial() {
   fetch(`https://fakestoreapi.com/products/${productId}`)
   .then(response => response.json())
   .then((data) => {
     const productDetail = document.createElement("div")
     productDetail.classList.add("detail")
     productDetail.innerHTML = `
     <img class="images" src="${data.image}">
     <h3 class="productTitles">${data.title}</h3>
     <p class="description">${data.description}</p>
     <p class="price">Price: $${data.price} </p>
     <p class="rate">Rate: ${data.rating.rate}</p>
   `;
      details.appendChild(productDetail);
   }).catch(error => console.error());
}
