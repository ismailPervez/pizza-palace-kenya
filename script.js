// get cart items from local storage, if any - when web app first runs
function updateCart() {
    if (localStorage.getItem('pizza-palace-cart')) {
        var inCartItems = JSON.parse(localStorage.getItem('pizza-palace-cart'));
        var cartItemsContainer = $('.cart-container .cart-items');
        var itemsCount = $('.cart-icon .items-count');
        var totalPriceContainer = $('.cart-container .total-price span');
        itemsCount.html(inCartItems.length);
    
        var containerInnerHtml = '';
        var totalPrice = 0;
        var id = 1;
        for (let i = 0; i < inCartItems.length; i++) {
            containerInnerHtml += `
                <li class="item" id="item-${id}">
                    ${inCartItems[i].size} pizza with ${inCartItems[i].crust} crust and ${inCartItems[i].toppings} toppings total of ksh.${inCartItems[i].totalPrice}
                    <i class="fas fa-times"></i>
                </li>
            `
            id += 1;
            totalPrice += inCartItems[i].totalPrice;
        }
    
        cartItemsContainer.html(containerInnerHtml);
        totalPriceContainer.html(totalPrice);
    }
    
    else {
        localStorage.setItem('pizza-palace-cart', JSON.stringify([]));
    }
}

updateCart();

// clear cart functionality
var clearCartBtn = $('#clear-cart');
clearCartBtn.click(function() {
    localStorage.setItem('pizza-palace-cart', JSON.stringify([]));
    updateCart();
})

// pop up the cart modal if cart button is clicked
var cartIconBtn = $('.cart-icon');
var cartModal = $('.cart-container');
var closeCartModalBtn = $('.cart-close-btn .fa-times');

// opens cart
cartIconBtn.click(function() {
    cartModal.addClass('active');
})

// closes cart
closeCartModalBtn.click(function() {
    cartModal.removeClass('active');
})

// the order pizza functionality - create pizza
// create a pizza object

class Pizza {
    constructor(size, crust, toppings, totalPrice) {
        this.size = size;
        this.crust = crust;
        this.toppings = toppings;
        this.totalPrice = totalPrice;
    }
}

// get the form element
var form = $('form');
form.submit(function(event) {
    event.preventDefault();
    
    var sizeValue = $('.size input:checked').attr('id');
    var sizePrice = parseInt($('.size input:checked').val());
    var crustValue = $('.crust input:checked').attr('id');
    var crustPrice = parseInt($('.crust input:checked').val());
    // get all toppings
    var toppingsList = document.querySelectorAll('.toppings input');
    var toppings = [];
    var toppingsPrice = 0;
    for (let i = 0; i < toppingsList.length; i++) {
        if (toppingsList[i].checked) {
            toppings.push(toppingsList[i].id);
            toppingsPrice += parseInt(toppingsList[i].value);
        }
    }

    if (sizeValue && crustValue && (toppings.length > 0)) {
        var totalPrice = sizePrice + crustPrice + toppingsPrice;
        console.log(totalPrice);
        var pizza = new Pizza(sizeValue, crustValue, toppings, totalPrice);
        // update cart
        var inCart = JSON.parse(localStorage.getItem('pizza-palace-cart'));
        inCart.push(pizza);
        localStorage.setItem('pizza-palace-cart', JSON.stringify(inCart));
        updateCart();
        // reset form
        document.querySelector('form').reset();
        var message = `You have created one ${pizza.size} with ${pizza.crust} crust and ${pizza.toppings} as toppings. Your total for this is ${pizza.totalPrice}`;
        alert(message);
    }

    else {
        alert('all fields are required!');
    }
})

// checkout functionality
var openCheckOutBtn = $('#checkout');
openCheckOutBtn.click(function() {
    $('.cart-container').removeClass('active');
    $('.checkout-container').addClass('active');
})