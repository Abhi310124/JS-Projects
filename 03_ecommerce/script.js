document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach(product =>{
    const productDiv=document.createElement('div');
    productDiv.classList.add('product')
    productDiv.innerHTML=`
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id='${product.id}'>Add To Cart</button>`;
    productList.appendChild(productDiv)

  })

  productList.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
      const productId= parseInt(e.target.getAttribute('data-id'))
      const productNumber=products.find(p => p.id == productId)
      addToCart(productNumber)
    }
  })

  function addToCart(product){
    cart.push(product)
    saveLocal()
    renderCart()
  }


  function renderCart(){
    cartItems.innerText="";
    let totalprice=0
    if(cart.length>0){
      emptyCartMessage.classList.add('hidden')
      cartTotalMessage.classList.remove('hidden')
      cart.forEach((item,index) =>{
        totalprice+=item.price
        const cartItem=document.createElement('div')
        cartItem.innerHTML=`<span>${item.name} - ${item.price.toFixed(2)} </span>
        <button>Delete</button>`
        cartItem.querySelector('button').addEventListener('click',(e)=>{
          e.stopPropagation()
          cart.splice(index, 1);
          renderCart();
          saveLocal();
        })
        cartItems.appendChild(cartItem)

        totalPriceDisplay.textContent=`${totalprice.toFixed(2)}`
      
      })
    }
    else{
      cartTotalMessage.classList.add('hidden')
      
    }
  }

  checkOutBtn.addEventListener('click',()=>{
    cart.length=0
    alert('Checkout Successfully')
    saveLocal()
    renderCart();
  })

  function saveLocal(){
    localStorage.setItem('cart',JSON.stringify(cart))
  }


});
