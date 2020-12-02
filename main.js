if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready() {
    var removeCartBtn = document.getElementsByClassName("remove");
    for (var i = 0; i < removeCartBtn.length; i++){
        var btn = removeCartBtn[i];
        btn.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("quantity");
    for (var i = 0; quantityInputs.length; i++){
        var quantity = quantityInputs[i];
        quantity.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName("add");
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }

    document.getElementsByClassName("reset")[0].addEventListener('click', removeAll);
}


function addToCart(event) {
    var btn = event.target;
    var productItem = btn.parentElement;
    var name = productItem.getElementsByClassName("item-name")[0].innerText;
    var price = productItem.getElementsByClassName("item-price")[0].innerText;
    addItemToCart(name, price);
    updateCartTotal();
}

function addItemToCart(name, price){
    var div = document.createElement("div");
    div.classList.add("cart-item");
    var cartContainer = document.getElementsByClassName("box-2")[0];
    var cartItemsName = document.getElementsByClassName("cart-name");
    var cartItemsQuantity = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerText == name) {
                var quantity = cartItemsQuantity[i].value;
                quantity++;
                cartItemsQuantity[i].value = quantity;
                return;
        }
    }
    var contents = 
    `
        <input type="number" value="1" class="cart-quantity"
        min="1" readonly required>
        <span class="cart-name">${name}</span>
        <button class="remove">&#10006;</button>
        <div class="clearfix"></div>
        <p>Price: <span class="cart-price">${price}</span></p>
    `;
    div.innerHTML = contents;
    cartContainer.append(div);
    div.getElementsByClassName("remove")[0].addEventListener('click', removeCartItem);
    div.getElementsByClassName("cart-quantity")[0].addEventListener('click', quantityChanged);
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function removeAll(){
    alert("Everything will be removed");
    var cart = document.getElementsByClassName("box-2")[0];
    while(cart.hasChildNodes()){
        cart.removeChild(cart.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event){
    var btnClicked = event.target;
    btnClicked.parentElement.remove();
    updateCartTotal();
}


function updateCartTotal() {
    var cart = document.getElementsByClassName('box-2')[0];
    var cartItemDiv = cart.getElementsByClassName("cart-item");
    var total = 0;
    for (var i = 0; i < cartItemDiv.length; i++){
        var item = cartItemDiv[i];
        var priceElement = item.getElementsByClassName("cart-price")[0];
        var quantityElement = item.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace(/[$,]/g, ''));
        var quantity = quantityElement.value;
        total = total + ( price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total")[0].innerText = '$' + total;
}

var openCartBtn = document.getElementsByClassName("toCart")[0];
openCartBtn.addEventListener('click', function(){
    var getCart = document.getElementById("cart");
    getCart.classList.add("cart-enlarge");
});

var closeCartBtn = document.getElementsByClassName("close")[0];
closeCartBtn.addEventListener('click', function(){
    var getCart = document.getElementById("cart");
    getCart.classList.remove("cart-enlarge");
});