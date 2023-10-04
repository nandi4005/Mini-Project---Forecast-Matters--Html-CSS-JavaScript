

function login(){
	document.location.href="LOGIN.html";
}
function cart(){
	document.location.href="cart.html";
}
function home(){
	document.location.href="index.html";
}
function ckt(){
	document.location.href="end.html";
}
//-----------------------------------cart---------------------------------

let carts=document.querySelectorAll('.menu');

let products=[
	{name:"Samosa",tag:"samosa", price:30, inCart:0},
	{name:"Pakoda",tag:"pakoda", price:30, inCart:0},
	{name:"Idly",tag:"idly", price:40, inCart:0},
	{name:"Tea",tag:"tea", price:20, inCart:0},
	{name:"Dosa",tag:"dosa", price:50, inCart:0},
	{name:"Upma",tag:"upma", price:45, inCart:0},
	{name:"Ice Cream",tag:"ice cream", price:50, inCart:0},
	{name:"Mango Juice",tag:"mango juice", price:35, incart:0},
	{name:"Lassi",tag:"lassi", price:30, inCart:0},
	{name:"Chicken Biryani",tag:"chicken biryani", price:220, inCart:0},
	{name:"Veg Fried Rice",tag:"veg fried rice", price:110, inCart:0},
	{name:"Gobi Manchurian",tag:"gobi manchurian", price:120, inCart:0}
	
];
for (let i = 0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
	  cartNumbers(products[i]);
	  totalCost(products[i]);
	});
  }
  
  function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if (productNumbers) {
	  document.querySelector('.cart span').textContent = productNumbers;
	}
  }
  
  function cartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	
	productNumbers = parseInt(productNumbers);
  
	if (productNumbers) {
	  localStorage.setItem('cartNumbers', productNumbers + 1);
	  document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
	  localStorage.setItem('cartNumbers', 1);
	  document.querySelector('.cart span').textContent = 1;
	}
	setItems(product);
  }
  
  function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
  
	if (cartItems != null) {
	  if (cartItems[product.tag] == undefined) {
		cartItems = {
		  ...cartItems,
		  [product.tag]: product
		};
	  }
	  cartItems[product.tag].inCart += 1;
	} else {
	  product.inCart = 1;
	  cartItems = {
		[product.tag]: product
	  }
	}
  
	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  }
  
  function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
  
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalCost', cartCost + product.price);
	  
	  
	} else {
		localStorage.setItem('totalCost', product.price);
	  
	}
  }
  
  function displayCart() {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
  
	let productContainer = document.querySelector('.products');
	let cartCost = localStorage.getItem('totalCost')

    console.log(cartItems);
	if (cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
				<ion-icon name="close-circle"></ion-icon>
				<img src="./images/${item.tag}.jpg" />
				<span>${item.name}</span>

			</div>
	  
			<div class="price">&#8377;${item.price}.00</div>
			<div class="quantity">
				<ion-icon class="decrease "
				name="arrow-dropleft-circle"></ion-icon>
				<span>${item.inCart}</span>
				<ion-icon class="increase "
				name="arrow-dropright-circle"></ion-icon>
				   
			</div>
			<div class="total">
			&#8377;${item.inCart * item.price}.00
			</div>
			`;
	  });
  
		productContainer.innerHTML += `
	  		<div class="basketTotalContainer">
	  			<h4 class="basketTotalTitle">
	  				Basket Total
				</h4>
				<h4 class="basketTotal">
				&#8377;${cartCost}.00
				</h4>
		`;
	 
	 
	 
	}
}
    
onLoadCartNumbers();
displayCart();