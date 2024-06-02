let query;

let searchButton;





fetch('../Json/dummyDataSports.json')
  .then(response => response.json())
  .then(data => {

    let nationList = document.getElementById("nations");
    let sizeList = document.getElementById("sizes");
    let colorList = document.getElementById("colors");
    let genderList = document.getElementById("genders");
    let productTypeList = document.getElementById("productTypes")
    let tournamentList = document.getElementById("tournaments")




    nations = data.nations;
    sizes = data.size;
    colors = data.color;
    genders = data.gender;
    let productTypes = data.product_type;
    tournaments = data.tournament;

    console.log(sizes[0])
    console.log(nations[0])
    console.log(colors[0])
    console.log(genders[0])
    console.log(productTypes[0]);
    console.log(tournaments[0]);

    for (nation of nations) {
      let checkBoxDiv = document.createElement('div');

      let checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = 'nationCheckBox';
      checkBox.name = 'categorys';
      checkBox.value = nation.name;
      checkBox.onclick = filterProducts;
      let checkBoxLabel = document.createElement('label');
      checkBoxLabel.for = "nationCheckBox";
      checkBoxLabel.textContent = nation.name;

      checkBoxDiv.appendChild(checkBox);
      checkBoxDiv.appendChild(checkBoxLabel);

      nationList.appendChild(checkBoxDiv)
    }

    for (size of sizes) {
      let checkBoxDiv = document.createElement('div');

      let checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = 'sizeCheckBox';
      checkBox.name = 'categorys';
      checkBox.value = size.name;
      checkBox.onclick = filterProducts;
      let checkBoxLabel = document.createElement('label');
      checkBoxLabel.for = "sizeCheckBox";
      checkBoxLabel.textContent = size.name;

      checkBoxDiv.appendChild(checkBox);
      checkBoxDiv.appendChild(checkBoxLabel);

      sizeList.appendChild(checkBoxDiv)
    }

    for (color of colors) {
      let checkBoxDiv = document.createElement('div');

      let checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = 'colorCheckBox';
      checkBox.name = 'categorys';
      checkBox.value = color.name;
      checkBox.onclick = filterProducts;
      let checkBoxLabel = document.createElement('label');
      checkBoxLabel.for = "colorCheckBox";
      checkBoxLabel.textContent = color.name;

      checkBoxDiv.appendChild(checkBox);
      checkBoxDiv.appendChild(checkBoxLabel);

      colorList.appendChild(checkBoxDiv)
    }

    for (gender of genders) {
      let checkBoxDiv = document.createElement('div');

      let checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = 'colorCheckBox';
      checkBox.name = 'categorys';
      checkBox.value = gender.name;
      checkBox.onclick = filterProducts;
      let checkBoxLabel = document.createElement('label');
      checkBoxLabel.for = "colorCheckBox";
      checkBoxLabel.textContent = gender.name;

      checkBoxDiv.appendChild(checkBox);
      checkBoxDiv.appendChild(checkBoxLabel);

      genderList.appendChild(checkBoxDiv)
    }

    for (productType of productTypes) {
      let checkBoxDiv = document.createElement('div');

      let checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = 'colorCheckBox';
      checkBox.name = 'categorys';
      checkBox.value = productType.name;
      checkBox.onclick = filterProducts;
      let checkBoxLabel = document.createElement('label');
      checkBoxLabel.for = "colorCheckBox";
      checkBoxLabel.textContent = productType.name;

      checkBoxDiv.appendChild(checkBox);
      checkBoxDiv.appendChild(checkBoxLabel);

      productTypeList.appendChild(checkBoxDiv)
    }

    for (tournament of tournaments) {
      let checkBoxDiv = document.createElement('div');

      let checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = 'colorCheckBox';
      checkBox.name = 'categorys';
      checkBox.value = tournament.name;
      checkBox.onclick = filterProducts;
      let checkBoxLabel = document.createElement('label');
      checkBoxLabel.for = "colorCheckBox";
      checkBoxLabel.classList.add("tournament-label-text")
      checkBoxLabel.textContent = tournament.name;

      checkBoxDiv.appendChild(checkBox);
      checkBoxDiv.appendChild(checkBoxLabel);

      tournamentList.appendChild(checkBoxDiv)
    }

  })

  let filteredDatas;

 function filterProducts() {
 fetch('../Json/dummyDataSports.json')
    .then(response => response.json())
    .then(data => {

      console.log("filter running");
      const products = data.products;
      // let filteredDatas={};

      const categories = Array.from(document.querySelectorAll('input[name="categorys"]:checked')).map(checkbox => checkbox.value);
      if(categories.length===0)
        {
          displayAllProducts();
        }
      console.log(categories)
      filteredData = products.filter(item => (categories.includes(item.nation) || categories.includes(item.Tournament) || categories.includes(item.gender) || categories.includes(item.categorys) || item.size.some(element => categories.includes(element)) || item.color.some(element =>  categories.includes(element)) ));
      

      // filteredDatas.append(filteredData);
      // filteredData = products.filter(item => categories.includes(item.Tournament));
      // filteredDatas.append(filteredData);
      // console.log(filteredData[0]['color'][0]);
      // console.log(filteredDatas)

      displayProducts(filteredData);
    })


}



function sortProducts(sortBy) {
  console.log(sortBy);
  fetch('../Json/dummyDataSports.json')
    .then(response => response.json())
    .then(data => {
      const products = data.products;
let filteredData

      const categories = Array.from(document.querySelectorAll('input[name="categorys"]:checked')).map(checkbox => checkbox.value);
      if(categories.length!=0)
        {
           filteredData = products.filter(item => (categories.includes(item.nation) || categories.includes(item.Tournament) || categories.includes(item.gender) || categories.includes(item.categorys) || item.size.some(element => categories.includes(element)) || item.color.some(element =>  categories.includes(element)) ));
      
        }
        else{
          filteredData=products;
        }

      if (sortBy === 'low-to-high') {
        filteredData.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'high-to-low') {
        filteredData.sort((a, b) => b.price - a.price);
      }
      console.log("sorted");
      console.log(products[0]);

      displayProducts(filteredData);
    });
}


function displayProducts(products) {

  document.getElementById('productCards').innerHTML = ''
  console.log("working");
  // for (let product of products) {
  //   console.log(product.price, product.title);
  // }


  for (let product of products) {
    let productDetailsDiv = document.getElementById('productCards');

    let cardDiv = document.createElement('div');
    cardDiv.id=product.id;
    cardDiv.classList.add("card");
    cardDiv.style.width = '14rem';
    cardDiv.style.height = 'max-content';
    // cardDiv.onclick("redirectToPage()");

    let img = document.createElement('img');
    img.src = product.thumbnail;
    img.classList.add('card-img-top');
    img.alt = product.title;

    let cardTextDiv = document.createElement('div');
    cardTextDiv.classList.add('card-body');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = product.title;
    console.log(product.title)

    let cardPriceDiv = document.createElement('div');
    cardPriceDiv.classList.add('d-flex', 'cardPrice');

    var cardText = document.createElement('p');
    cardText.classList.add('card-text', 'fs-15');
    cardText.textContent = "€ " + product.price;

    var cardText2 = document.createElement('p');
    cardText2.id = "originalPrice";
    cardText2.classList.add('card-text', 'fs-15');
    cardText2.textContent = "€ " + product['original price'];

    var anchorElement = document.createElement('a');
        anchorElement.href = 'product.html';
        anchorElement.className = 'clickable-link';
        // Add event listener to handle click on card
        anchorElement.addEventListener('click', function(event) {
          // Store the ID of the clicked card in localStorage
          localStorage.setItem('selectedCardId', product.id);
          localStorage.setItem('selectedCardCetogory',product.categorys);
          console.log(localStorage.getItem('selectedCardCetogory'))
        });

    cardTextDiv.appendChild(cardTitle);
    cardPriceDiv.appendChild(cardText);
    cardPriceDiv.appendChild(cardText2);
    cardTextDiv.appendChild(cardPriceDiv);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardTextDiv);

    anchorElement.appendChild(cardDiv);
    productDetailsDiv.appendChild(anchorElement);
    // productDetailsDiv.appendChild(cardDiv);
  }

  function updateProductCount(count) {
    document.getElementById('productCount').textContent = count + " products";
  }
  updateProductCount(products.length);
}


function displayAllProducts() {
  fetch('../Json/dummyDataSports.json')
    .then(response => response.json())
    .then(data => {
      const products = data.products;

      for (let product of products) {
        let productDetailsDiv = document.getElementById('productCards');
        let cardDiv = document.createElement('div');
        cardDiv.id = product.id;
        cardDiv.classList.add("card");
        cardDiv.style.width = '14rem';
        cardDiv.style.height = 'max-content';

        let img = document.createElement('img');
        img.src = product.thumbnail;
        img.classList.add('card-img-top');
        img.alt = product.title;

        let cardTextDiv = document.createElement('div');
        cardTextDiv.classList.add('card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = product.title;

        let cardPriceDiv = document.createElement('div');
        cardPriceDiv.classList.add('d-flex', 'cardPrice');

        var cardText = document.createElement('p');
        cardText.classList.add('card-text', 'fs-15');
        cardText.textContent = "€ " + product.price;

        var cardText2 = document.createElement('p');
        cardText2.id = "originalPrice";
        cardText2.classList.add('card-text', 'fs-15');
        cardText2.textContent = "€ " + product['original price'];

        var anchorElement = document.createElement('a');
        anchorElement.href = 'product.html';
        anchorElement.className = 'clickable-link';
        // Add event listener to handle click on card
        anchorElement.addEventListener('click', function(event) {
          // Store the ID of the clicked card in localStorage
          localStorage.setItem('selectedCardId', product.id);
          console.log(product.categorys)
          localStorage.setItem('selectedCardCetogory',product.categorys);
          console.log(localStorage.getItem('selectedCardCetogory'))
        });

        cardTextDiv.appendChild(cardTitle);
        cardPriceDiv.appendChild(cardText);
        cardPriceDiv.appendChild(cardText2);
        cardTextDiv.appendChild(cardPriceDiv);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardTextDiv);
        anchorElement.appendChild(cardDiv);
        productDetailsDiv.appendChild(anchorElement);
        
      }

      // Update product count
      updateProductCount(products.length);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to update product count
function updateProductCount(count) {
  document.getElementById('productCount').textContent = count + " products";
}

// Function to redirect to product.html
function redirectToPage() {
  window.location.href = 'product.html';
}




// searchProducts()


// function handleSearch() {
//   const searchInput = document.getElementById('searchInput');
//   const query = searchInput.value;
//   const searchResults = searchProducts(query);
//   displaySearchResults(searchResults);
// }

// var element = document.querySelector("input[type='search']");
// element.addEventListener("input", searchProducts);

const test=document.getElementById('searchButton');
console.log(test)

setTimeout(function(){
searchButton= document.getElementById('searchButton') 

console.log(searchButton)

searchButton.addEventListener('keydown', function(event) {
  // Check if the pressed key is Enter (key code 13)
  event.preventDefault;
  if (event.code ==="Enter") {
      // Call the searchProducts() function
      searchProducts();
  }
});

function wordPresent(sentence, word) {
  // Create a regular expression with the word surrounded by word boundaries (\b)
  var regex = new RegExp("\\b" + word + "\\b", "i"); // "i" flag for case-insensitive matching
  
  // Test if the word exists in the sentence using the regular expression
  return regex.test(sentence);
}



function searchProducts() {
  // let query=document.getElementById('searchButton').value;
  // const query = searchInput.value;
  // let query="Jersey";
  query=document.getElementById('searchButton').value;
  console.log(query)
  console.log("search working")
  query = query.trim();
  if (!query) {
      return []; // If the query is empty, return an empty array
  }

  fetch('../Json/dummyDataSports.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
  console.log(query);
    let filteredProducts=products.filter(product =>{
       return  wordPresent(product.title, query) || wordPresent(product.categorys, query)
      // console.log(wordPresent(product.title, query))
      // ||
      // product.categorys.toLowerCase().includes(query) ||
      // product.gender.toLowerCase().includes(query)

    })
console.log(filteredProducts)


    displayProducts(filteredProducts);
  
  
});
}
},100)



