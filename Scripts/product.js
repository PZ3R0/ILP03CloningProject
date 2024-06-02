




// let body = document.querySelector('body');
// openShopping.addEventListener('click', ()=>{
//     body.classList.add('active');
// })
// closeShopping.addEventListener('click', ()=>{
//     body.classList.remove('active');
// })

function openCart() {
    document.body.classList.add('active');
}

function toggleArrow() {
    // var button = document.getElementById('accordion-button');
    // Toggle between up and down arrow classes
    var accordionIconUp = document.getElementById('accordion-icon-up');
    var accordionIconDown = document.getElementById('accordion-icon-down');
    if (accordionIconDown.style.display == "none") {
        console.log("up work")
        accordionIconUp.style.display = "none"
        accordionIconDown.style.display = "block"

    }
    else {
        accordionIconUp.style.display = "block"
        accordionIconDown.style.display = "none"
    }
}


function displayProductDetails() {
    fetch('dummyDataSports.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const productId = localStorage.getItem('selectedCardId')
            console.log(productId);


            for (let product of products) {
                // console.log(product.id)
                if (product.id == productId) {
                    console.log("working")
                    const productDiv = document.getElementById("product-images");

                    let productMoreImg = document.createElement('div');
                    productMoreImg.classList.add("product-more-images");

                    product["images"].forEach(element => {
                        let moreImage = document.createElement('div');
                        moreImage.classList.add('more-image');

                        let moreImageSelect = document.createElement('img');
                        moreImageSelect.src = element;
                        moreImageSelect.classList.add("product-more-img");

                        moreImage.appendChild(moreImageSelect)
                        productMoreImg.appendChild(moreImage);
                    });



                    // console.log(productMoreImg)

                    let productMainImg = document.createElement('div');
                    productMainImg.classList.add("product-main-image");

                    let mainImageSelect = document.createElement('img');
                    mainImageSelect.src = product.thumbnail;
                    mainImageSelect.alt = "product_img";
                    mainImageSelect.classList.add("product-main-img");

                    productMainImg.appendChild(mainImageSelect);

                    let productBlank = document.createElement('div');
                    productBlank.classList.add("blank-space");

                    productDiv.appendChild(productMoreImg);
                    productDiv.appendChild(productMainImg);
                    productDiv.appendChild(productBlank);

                    const vrDiv = document.getElementById("vr-div");

                    let vr = document.createElement('div');
                    vr.classList.add('vr', 'vr-product')

                    vrDiv.appendChild(vr);

                    const productTitleMain = document.getElementById('product-title-main');

                    let productTitle = document.createElement('h3');
                    productTitle.textContent = product.title;

                    productTitleMain.appendChild(productTitle);

                    const productPrice = document.getElementById('product-price');

                    let productRealPrice = document.createElement('p');
                    productRealPrice.classList.add('me-2');
                    // console.log(product.prize)
                    productRealPrice.textContent = "€ " + product.price;
                    let productOriginalPrice = document.createElement('p');
                    productOriginalPrice.style.textDecoration = 'line-through';
                    productOriginalPrice.textContent = "€ " + product['original price'];

                    productPrice.appendChild(productRealPrice);
                    productPrice.appendChild(productOriginalPrice);

                    let productSizeButton = document.getElementById('size-button');
                    // console.log(document.getElementById('size-button'))

                    let selectedSizeButton = null; // Variable to store the currently selected size button

                    product['size'].forEach(size => {
                        let sizeButton = document.createElement('button');
                        sizeButton.type = 'button';
                        sizeButton.classList.add('btn', 'btn-lg', 'btn-size', 'me-2');
                        sizeButton.textContent = size;
                        sizeButton.style.borderColor = "black";

                        sizeButton.addEventListener('click', function () {
                            // If the clicked button is already selected, do nothing
                            if (sizeButton === selectedSizeButton) {
                                return;
                            }

                            // Deselect the previously selected button (if any)
                            if (selectedSizeButton) {
                                selectedSizeButton.style.backgroundColor = 'white';
                                selectedSizeButton.style.color = 'black';
                            }

                            // Select the clicked button
                            sizeButton.style.backgroundColor = 'black';
                            sizeButton.style.color = 'white';
                            selectedSizeButton = sizeButton;
                            localStorage.setItem("selectedSize", selectedSizeButton.textContent)
                            console.log(localStorage.getItem("selectedSize"))

                        });

                        productSizeButton.appendChild(sizeButton);
                    });



                    // product['size'].forEach(size=>{
                    //     console.log(size)
                    // let sizeButton=document.createElement('button');
                    // sizeButton.type='button';
                    // sizeButton.classList.add('btn','btn-lg','btn-size','me-2');
                    // sizeButton.textContent=size;
                    // sizeButton.style.borderColor="black";
                    //     console.log(productSizeButton);

                    // sizeButton.addEventListener('click',function(){
                    //     if(sizeButton.style.backgroundColor==='white'){
                    //         sizeButton.style.backgroundColor='black';
                    //         sizeButton.style.color='white';
                    //     }
                    //     else{
                    //         sizeButton.style.backgroundColor='white';
                    //         sizeButton.style.color='black';
                    //     }

                    // })    

                    // productSizeButton.appendChild(sizeButton);
                    // })

                    const productColorText = document.getElementById('product-color-text');
                    productColorText.textContent = product.color[0];

                    const productColor = document.getElementById('product-color');

                    let productColorBox = document.createElement('button');
                    productColorBox.role = 'option';
                    productColorBox.classList.add('btn-colors', 'mx-2');
                    productColorBox.style.backgroundColor = product.color[0];

                    productColor.appendChild(productColorBox);

                    const productDescription = document.getElementById("product-description");
                    productDescription.textContent = product.description;

                }
            }


        })
}




//related products


// document.addEventListener('DOMContentLoaded', function () {
//     const prevBtn = document.querySelector('.prev');
//     const nextBtn = document.querySelector('.next');
//     const wrapper = document.querySelector('.carousel-wrapper');
//     const cards = document.querySelectorAll('.card');
//     let currentIndex = 0;
//     const cardWidth = cards[0].offsetWidth + 20; // Width of card + margin

//     nextBtn.addEventListener('click', function () {
//         if (currentIndex < cards.length - 4) {
//             currentIndex++;
//             wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
//         }
//     });

//     prevBtn.addEventListener('click', function () {
//         if (currentIndex > 0) {
//             currentIndex--;
//             wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
//         }
//     });
// });


setTimeout(function () {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const wrapper = document.querySelector('.carousel-wrapper');
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;
    const cardWidth = 224 + 20; // Width of card + margin

    nextBtn.addEventListener('click', function () {
        if (currentIndex < cards.length - 4) {
            currentIndex++;
            wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });

    let openShopping = document.getElementById('addToCart');
    console.log(openShopping)
    let closeShopping = document.querySelector('.btn-close');
    closeShopping.addEventListener('click', () => {
        document.body.classList.remove('active');
        console.log(closeShopping)
    })


    document.getElementById('addToCart').addEventListener('click', displayCartItems);
    document.getElementById('plus').addEventListener('click', function () {
        console.log(document.getElementById('count-items').value)
        let count = parseInt(document.getElementById('count-items').value);

        // Increment the integer value
        count = count + 1;

        // Update the element with the new value
        document.getElementById('count-items').value = count;
        document.getElementById('totalCount').textContent = "(" + document.getElementById('count-items').value + ")";
        console.log(document.getElementById('count-items').value);
        document.getElementById('sub-total').textContent = "€ " + (count * localStorage.getItem('currentPrice'));
        document.getElementById('cart-total').textContent = "€ " + (count * localStorage.getItem('currentPrice'));


    })
    document.getElementById('minus').addEventListener('click', function () {
        console.log(document.getElementById('count-items').value)
        let count = parseInt(document.getElementById('count-items').value);

        // Increment the integer value
        if (count > 0) { count = count - 1; }

        if (count == 0) {
            document.getElementById('cartList').textContent = '';
            document.getElementById('totalCount').textContent = "(0)";
            document.getElementById('cart-total').textContent = 0;
            document.getElementById('sub-total').textContent = 0;
        }

        // Update the element with the new value
        document.getElementById('count-items').value = count;
        document.getElementById('totalCount').textContent = "(" + document.getElementById('count-items').value + ")";
        document.getElementById('sub-total').textContent = "€ " + (count * localStorage.getItem('currentPrice'));
        document.getElementById('cart-total').textContent = "€ " + (count * localStorage.getItem('currentPrice'));

    })

    document.getElementById('totalCount').textContent = "(" + document.getElementById('count-items').value + ")";
    function displayCartItems() {
        // console.log(localStorage.getItem('selectedCardId'));
        fetch('dummyDataSports.json')
            .then(response => response.json())
            .then(data => {
                const products = data.products;
                let productId = localStorage.getItem('selectedCardId');
                console.log(productId)

                var currentProduct = products.filter(product => product.id == productId);
                console.log(currentProduct)
                selectedSize = localStorage.getItem('selectedSize');

                console.log(currentProduct[0].thumbnail)
                document.getElementById('cart-item-img').src = currentProduct[0].thumbnail;
                document.getElementById('cart-item-title').textContent = currentProduct[0].title;
                document.getElementById('cart-item-color').textContent = currentProduct[0].color[0];
                document.getElementById('cart-item-size').textContent = selectedSize;
                localStorage.setItem('currentPrice', currentProduct[0].price)
                document.getElementById('total-amount').textContent = "€ " + currentProduct[0].price;
                console.log(document.getElementById('count-items').value)
                document.getElementById('sub-total').textContent = "€ " + (currentProduct[0].price * parseInt(document.getElementById('count-items').value));
                console.log(parseInt(document.getElementById('count-items').value))
                // console.log("Product Price:", currentProduct[0].price);
                // console.log("Quantity:", parseInt(document.getElementById('count-items').value));
                document.getElementById('cart-total').textContent = "€ " + currentProduct[0].price;


            })


    }

    document.getElementById('remove-item').addEventListener('click', function () {
        document.getElementById('cartList').textContent = '';
        document.getElementById('totalCount').textContent = "(0)";
        document.getElementById('cart-total').textContent = 0;
        document.getElementById('sub-total').textContent = 0;
    })

    document.getElementById('cart-icon').addEventListener('click',openCart);

}, 200); // 5000 milliseconds = 5 seconds




function displayRelatedProducts() {

    let query = localStorage.getItem('selectedCardCetogory');
    console.log(query)
    query = query.trim();
    if (!query) {
        return []; // If the query is empty, return an empty array
    }

    fetch('dummyDataSports.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            console.log(query);
            let filteredProducts = products.filter(product => {
                return wordPresent(product.title, query) || wordPresent(product.categorys, query)
                // console.log(wordPresent(product.title, query))
                // ||
                // product.categorys.toLowerCase().includes(query) ||
                // product.gender.toLowerCase().includes(query)

            })
            console.log(filteredProducts)


            displayProducts(filteredProducts);
        }
        )
}

function wordPresent(sentence, word) {
    // Create a regular expression with the word surrounded by word boundaries (\b)
    var regex = new RegExp("\\b" + word + "\\b", "i"); // "i" flag for case-insensitive matching

    // Test if the word exists in the sentence using the regular expression
    return regex.test(sentence);
}

function searchProducts() {
    // let query=document.getElementById('searchButton').value;
    // const query = searchInput.value;
    let query = document.getElementById('searchProducts');
    query = query.trim();
    if (!query) {
        return []; // If the query is empty, return an empty array
    }

    fetch('dummyDataSports.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            console.log(query);
            let filteredProducts = products.filter(product => {
                return wordPresent(product.title, query) || wordPresent(product.categorys, query)
                // console.log(wordPresent(product.title, query))
                // ||
                // product.categorys.toLowerCase().includes(query) ||
                // product.gender.toLowerCase().includes(query)

            })
            console.log(filteredProducts)


            displayProducts(filteredProducts);

        });
}

console.log(document.getElementById('searchProducts'))

function displayProducts(products) {

    document.getElementById('related-product-carousel').innerHTML = ''
    console.log("working");
    // for (let product of products) {
    //   console.log(product.price, product.title);
    // }


    for (let product of products) {
        let productDetailsDiv = document.getElementById('related-product-carousel');

        let cardDiv = document.createElement('div');
        cardDiv.id = product.id;
        cardDiv.classList.add("card");
        cardDiv.style.width = '14rem';
        cardDiv.style.height = '360px';
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
        cardText2.classList.add('card-text', 'fs-15', 'ms-1');
        cardText2.textContent = " € " + product['original price'];
        cardText2.style.textDecoration = 'line-through';

        var anchorElement = document.createElement('a');
        anchorElement.href = 'product.html';
        anchorElement.className = 'clickable-link';
        // Add event listener to handle click on card
        anchorElement.addEventListener('click', function (event) {
            // Store the ID of the clicked card in localStorage
            localStorage.setItem('selectedCardId', product.id);
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
}


displayRelatedProducts();

