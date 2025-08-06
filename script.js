//elements references
const prodcontainer=document.getElementById("productscontainer")
const cartcontainer=document.getElementById('cartcontainer')
const feedback=document.getElementById('feedback')
const clearcartbutton=document.getElementById('ClearCart')
const sortbyprice=document.getElementById('sortbyprice')
//default products
const products=[
    {
        id:1,
        name:"laptop",
        price:50000,
    },
    {
        id:2,
        name:"bag",
        price:500,
    },
    {
        id:3,
        name:"phone",
        price:5000,
    },
    {
        id:4,
        name:"tab",
        price:10000,
    },
    {
        id:5,
        name:"smartwatch",
        price:15000,
    },
    {
        id:6,
        name:"headphones",
        price:500,
    },
];
//empty cart
const cart=[]
//used to resset the timer(for feedback)
let timerid;
clearcartbutton.addEventListener('click', ClearCart);
sortbyprice.addEventListener('click',sortbypricefun)
function ClearCart(){
    cart.length = 0;
    rendercartdetails();
    updateuserfeedback("Cart cleared successfully", "success");

}

function sortbypricefun(){
 cart.sort(function(item1,item2){
        return item1.price-item2.price
 })
 rendercartdetails(); 
}

function renderproductdetails(){
    products.forEach(function(product)
{
    const {id,name,price}=product;
    const prodrow=`<div class="product-row">
    <p>${name} - Rs. ${price}</p>
    <button onclick="addtocart(${id})">Add to cart</button>
    </div>`;
    prodcontainer.insertAdjacentHTML("beforeend",prodrow)
});
}
function rendercartdetails(){
    cartcontainer.innerHTML="";
    cart.forEach(function(product){
        const{id,name,price}=product;
        
        const cartitem=`<div class="product-row">
         <p>${name} - Rs. ${price}</p>
        <button onclick="removefromcart(${id})">Remove</button>
        </div>`;
cartcontainer.insertAdjacentHTML("beforeend",cartitem)
    })
    // 
    console.log(cart)
    // for(let i=0;i<cart.length;i++){
    //     totalprice=totalprice+cart[i].price
    // }
   const totalprice= cart.reduce(function(acc,cumproduct){
        return acc+cumproduct.price;
    },0)
    document.getElementById('totalprice').textContent=`Rs.${totalprice}`;

}

//add to cart
function addtocart(id)
{
    console.log('add to cart clicked',id);
  const isprodavailable=  cart.some((product)=>product.id===id)
   if(isprodavailable){
    updateuserfeedback(`item already added to the cart`,"error")
    return
   }
   const prodtoadd= products.find(function(product){

        return product.id===id;

    });
    // console.log(prodtoadd)
   cart.push(prodtoadd)
    console.log(cart)
    rendercartdetails();

//     const{id:cartid,name,price}=prodtoadd;
//     const cartitem=`<div class="product-row">
//         <p>${name} - Rs. ${price}</p>
//         <button onclick="remove from cart(${id})">Remove</button>
//         </div>`;
// cartcontainer.insertAdjacentHTML("beforeend",cartitem)
// feedback.textContent=`${name} is added to the cart`

updateuserfeedback(`${prodtoadd.name} is added to the cart`,"success")
}

function removefromcart(id) {
    console.log(id)
     const product=cart.find((product)=>product.id===id)
    // const updatedcart = cart.filter(function(product){
    //     return product.id !== id; // ✅ Correct comparison
    // });
    const productIndex=cart.findIndex((product)=>product.id===id);
    cart.splice(productIndex,1);
    // console.log(updatedcart)
    // cart=updatedcart;
   
    updateuserfeedback(`${product.name} is removed from cart`,"error");
    rendercartdetails();
    // cart.length = 0; // clear the original cart
    // cart.push(...updatedcart); // update it with filtered items
    // rendercartdetails(); // re-render the UI
    
}


function updateuserfeedback(msg, type){
    clearTimeout(timerid)
    feedback.style.display="block";
    if(type==="success"){
        feedback.style.backgroundColor="green";
    }
    if(type==="error")
    {
        feedback.style.backgroundColor="red";
    }
    feedback.textContent=msg;
   timerid=  setTimeout(function(){
feedback.style.display="none";
    },3000)
}

 
//rendering product details
renderproductdetails()

