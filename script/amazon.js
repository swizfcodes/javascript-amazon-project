const products = [
  {
    Image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name : 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    priceCents : 1090,
    priceCurrency : 'USD',
    rating : {
      stars : 4.5,
      reviews : 87
    }
  },
    
  {
    Image: 'images/products/intermediate-composite-basketball.jpg',
    name : 'Intermediate Size Basketball',
    priceCents : 2095,
    priceCurrency : 'USD',
    rating : {
      stars : 4.0,
      reviews : 127
    }
  },

  {
    Image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name : ' Adults Plain Cotton T-Shirt - 2 Pack',
    priceCents : 799,
    priceCurrency : 'USD',
    rating : {
      stars : 4.5,
      reviews : 56
    }
  }
];

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
        src="${product.Image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.reviews}
        </div>
      </div>

      <div class="product-price">
       $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;