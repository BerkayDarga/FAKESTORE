const productsList = document.querySelector(".products");



document.addEventListener('DOMContentLoaded', loadItems);   //ilk açılışta aşağıdaki fonksiyonu otomatik olarak çalıştırıyor


function innerHtml(product) {
   const productDiv = document.createElement("div");
   productDiv.classList.add("product");
   productDiv.innerHTML = `
      <img class="images" src="${product.image}">
      <h3 class="productTitles">${product.title}</h3>
      <p class="description">${product.description}</p>
      <p class="price">Price: $${product.price} </p>
      <p class="rate">Rate: ${product.rating.rate}</p>
`;
   productsList.appendChild(productDiv);
   //ürüne tıklandığında detay sayfası açma
   productDiv.addEventListener('click', function() {
      window.location.href = `file:///Users/dargaberkay/Documents/HTML%20&%20CSS%20&%20JS/JS/FAKESTORE/productDetail.html?id=${product.id}`;
  });
}

// Tüm ürünleri yükleme fonksiyonu
function loadItems() {
   fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then((data) => {
         window.allProduct = data   //bununla bu fonksiyona diğer oluşturduğumuz fonksiyonlardan erişebiliyoruz
         window.filterdata = data   //
         data.forEach(product => {
            innerHtml(product);
         });

      }).catch(error => console.log(error));
}



//kategori kısmı
function filterByCategory(categoryField) {

   // const productsList = document.querySelector(".products");
   const selectedCategory = categoryField.value;

   productsList.innerHTML = ""


   window.filterdata = window.allProduct.filter(filterProduct => filterProduct.category === selectedCategory)
   // allProduct dizi içerisindeki ürünler tek tek gezilir.category değeri selectedCategorye eşit olan değerler 
   // dizi halinde döner ve filterData dizisine atanır.

   window.filterdata.forEach(product => {
      if (product.category === selectedCategory) {
         innerHtml(product)
      }
   });

   console.log()
}

//filtreleme kısmı

function filterButton() {


   //|| değeri değişken tanımlama yaparken veya değer ataması yaparken değer boş gelir ise(kullanıcı boş bırakırsa) ne atanması istendiği belirtilir
   // Infinity sonsuz demek  
   const minimumPrice = document.getElementById("minPrice").value || 0;   //kullanıcı değer girmezse 0 olarak değer al ki hiçbir elemana uymasın boş bırakıldığında ürün çekmesin
   const maximumPrice = document.getElementById("PriceMax").value || Infinity;   //kullanıcının girdiği değeri al veya (değer girilmezse sonsuz girilmiş gibi işlem yap)
   const minimumRate = document.getElementById("minRate").value || 0;
   const maximumRate = document.getElementById("maxRate").value || Infinity;

   productsList.innerHTML = ""
   window.filterdata.forEach(filterData => {
      if (maximumRate > filterData.rating.rate && minimumRate < filterData.rating.rate && minimumPrice < filterData.price && maximumPrice > filterData.price) {
         innerHtml(filterData)
      }
   });
}


// ARRANGEMENT bağlantılarını dinleyen fonksiyon
document.querySelectorAll('.dropdown-content ul a').forEach(link => {
   link.addEventListener('click', arrangement);
});


//ürünleri sıralama
function arrangement(test) {
   test.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

   console.log(test.target.textContent);

   if (test.target.textContent === "From cheap to expensive") {

      window.allProduct.sort(function (a, b) {
         return a.price - b.price
      });
      productsList.innerHTML = ""
      window.allProduct.forEach(dataFilter => {
         innerHtml(dataFilter)

      });
   }

   else if (test.target.textContent === "From expensive to cheap") {

      window.allProduct.sort(function (a, b) {
         return b.price - a.price
      });
      productsList.innerHTML = "";
      window.allProduct.forEach(filterData => {
         innerHtml(filterData)

      })
   }

   else if (test.target.textContent === "Most rated ones") {
      window.allProduct.sort(function (a, b) {
         return b.rating.rate - a.rating.rate
      });
      productsList.innerHTML = "";
      window.allProduct.forEach(filterData => {
         innerHtml(filterData)

      });
   }

   else if (test.target.textContent === "Those who get the least rate") {
      window.allProduct.sort(function (a, b) {
         return a.rating.rate - b.rating.rate
      });
      productsList.innerHTML = "";
      window.allProduct.forEach(filterData => {
         innerHtml(filterData)

      });
   }

}



