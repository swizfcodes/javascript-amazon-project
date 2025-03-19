import { cart, removeProductFromCart, updateDeliveryOptions } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';


const today = dayjs();
const deliveryDate = today.add(7, 'days');
deliveryDate.format('dddd, MMMM D');

export function renderOrderSummary(){
  const today = dayjs();
  const deliveryDate = today.add(7, 'days');
  deliveryDate.format('dddd, MMMM D');

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProducts = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionsId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    console.log(today);
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProducts.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProducts.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProducts.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" 
            data-product-id="${matchingProducts.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProducts, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProducts, cartItem) {
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
    
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 
        ? 'FREE Shipping' 
        : `$${formatCurrency(deliveryOption.priceCents)} `;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId 
        ? 'checked' 
        : '';
    
      deliveryOptionsHTML += `
      <div class="delivery-option js-delivery-option" 
        data-product-id="${matchingProducts.id}"
        data-delivery-option-id="${deliveryOption.id}">

        <input type="radio"
        ${isChecked}
          class="delivery-option-input"
          name="delivery-option-${matchingProducts.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
      `;
    });

    return deliveryOptionsHTML;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeProductFromCart(productId);
      
      document.querySelector(`.js-cart-item-container-${productId}`).remove();

    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
