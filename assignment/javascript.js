//filter different product type
function checkUrl(){
  const url = new URL(window.location.href);
  const currentFilter = url.searchParams.get('filter');

  if (currentFilter != null){
    document.getElementById('filtered').value = currentFilter;
    filter(currentFilter);
  }
}

function filter(object){

  var x = document.getElementsByClassName(object);
  var y = document.getElementsByClassName('featured');
  for (var i = 0; i < y.length; i++){
    y[i].style.display = 'block';
  }
  if (object != "featured"){
    for (var i = 0; i < y.length; i++){
      y[i].style.display = 'none';
    }
    for (var i = 0; i < x.length; i++){
      x[i].style.display = 'block';
    }
  }
}

//photo gallery on
function showProduct(productPic){
  document.getElementById("mainProduct").src = productPic.src;
}

//get first name and put it in localstorage
function login(){
  var input = document.getElementById("firstName").value;
  localStorage.setItem('firstName', input);
  var input2 = document.getElementById("lastName").value;
  localStorage.setItem('lastName', input2);
  var input3 = document.getElementById("email2").value;
  localStorage.setItem('email', input3);
}

function loginbtn(){
  if (localStorage.getItem("firstName") !== null){
    document.querySelectorAll('#signinbtn').forEach(el => {el.style.display = 'none';});
  }
}

function checkBadge(){
  var title = JSON.parse(localStorage.getItem('title'));
  document.querySelectorAll('.badge').forEach(el => {el.style.display = 'block';});
  if (localStorage.getItem("title") === null || title.length === 0){
    document.querySelectorAll('.badge').forEach(el => {
      el.style.display = 'none';
    });
  }
  else{
    count = 0;
    for (key in title){
      count += title[key]['quantity'];
    }
    document.querySelector('.badge').textContent = count;

  }
}

//hero slideshow
// function SlideShow(){
//
// }

//add to cart
function addCart(){
  //change the button
  document.getElementById('button').textContent = "Added to cart";
  setTimeout(() => {document.getElementById('button').textContent = "Add to cart";}, 800);
  setTimeout(() => {window.location.reload();}, 800);
  //add to cart
  var productArr = [];
  //get element to put in array
  title = document.title;
  productSrc = document.getElementById('mainProduct').src;
  price = document.getElementById('price').textContent.slice(1,);
  url = location.href;
  quantity = 1;
  //check if it is there in the first place
  localTitle = localStorage.getItem('title')
  if (localStorage.getItem('title')){
    productArr = JSON.parse(localTitle);
  }
  for (var key = 0, n = productArr.length; key < n; key++){
    if (productArr[key]['title'] !== undefined){
      arrTitle = productArr[key]['title'];
      if (title == productArr[key]['title']){
        productArr[key]['quantity'] += 1;
        localStorage.setItem('title', JSON.stringify(productArr));
        location.reload;
        return 0;
      }
    }
  }
  productArr.push({'title': title, 'productSrc': productSrc, 'price': price, 'quantity': quantity, 'url': url});
  localStorage.setItem('title', JSON.stringify(productArr));
  location.reload;
}

//delete either cart title or empty cart
function checkCart(){
  var title = JSON.parse(localStorage.getItem('title'));
  //Add all items first
  document.querySelectorAll('.checkout').forEach(el => {el.style.display = 'block';});
  document.querySelectorAll('.cartTitle').forEach(el => {el.style.display = 'block';});
  document.querySelectorAll('.shoppingCart').forEach(el => {el.style.display = 'block';});
  document.querySelectorAll('.emptyCart').forEach(el => {el.style.display = 'block';});
  // remove items in cart page
  if (localStorage.getItem("title") === null || title.length === 0){
    document.querySelectorAll('.cartTitle').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.checkout').forEach(el => {
      el.style.display = 'none';
    });
  }
  else{
    document.querySelectorAll('.emptyCart').forEach(el => {
      el.style.display = 'none';
    });
    addProduct();
  }
}

//add products to cart page
function addProduct(){
  var title = JSON.parse(localStorage.getItem('title'));
  for (var key in title){
    var cartTitle = title[key]['title'];
    var cartPic = title[key]['productSrc'];
    var cartPrice = title[key]['price'];
    var cartQuantity = title[key]['quantity'];
    // var cartUrl = title[key]['url'];
    localStorage.setItem('title', JSON.stringify(title));
    var node = document.querySelector('.items');
    var node2 = document.createElement('img');
    var node3 = document.querySelector('.title');
    var node4 = document.createElement('p');
    var node5 = document.createElement('a');
    var node6 = document.querySelector('.price');
    var node7 = document.createElement('p');
    var node8 = document.querySelector('.quantity');
    var node9 = document.createElement('p');
    var node10 = document.createElement('a')
    var node11 = document.createElement('a')
    node4.setAttribute('id', cartTitle);
    node4.setAttribute('onclick', 'cartUrl(this.id)')
    node5.setAttribute('id', cartTitle);
    node5.setAttribute('onclick', 'deleteEle(this.id)');
    node10.setAttribute('class', cartTitle);
    node10.setAttribute('id', 'minus');
    node10.setAttribute('onclick', 'minusEle(this.className)');
    node11.setAttribute('id', 'plus');
    node11.setAttribute('onclick', 'plusEle(this.className)');
    node11.setAttribute('class', cartTitle);
    node2.src = cartPic;
    node4.textContent = cartTitle;
    node7.textContent = '$' + (cartPrice*cartQuantity).toFixed(2);
    node9.textContent = cartQuantity;
    node5.textContent = "Delete item";
    node10.textContent = '-';
    node11.textContent = '+';
    node.appendChild(node2);
    node3.appendChild(node4);
    node3.appendChild(node5);
    node6.appendChild(node7);
    node8.appendChild(node9);
    node8.appendChild(node10);
    node8.appendChild(node11);
  }
}

function cartUrl(product){
  var title = JSON.parse(localStorage.getItem('title'));
  for (var key in title){
    if (title[key]['title'] == product){
      console.log('test');
      window.location.href = title[key]['url'];
    }
  }
}

function minusEle(product){
  console.log("minus");
  var title = JSON.parse(localStorage.getItem('title'));
  for (var key in title){
    if (title[key]['title'] == product){
      if (title[key]['quantity'] > 1){
        title[key]['quantity'] -= 1;
        localStorage.setItem('title', JSON.stringify(title));
        setTimeout(() => {window.location.reload();}, 0);
      }
      else{
        if (confirm("Do you want to remove this item?")){
          if (title[key]['title'] == product){
            var product = title[key]['title'];
            title = title.filter((el) => el.title !== product);
            localStorage.setItem('title', JSON.stringify(title));
            setTimeout(() => {window.location.reload();}, 0);
            checkCart();
          }
        }
      }
    }
  }
  location.reload;
}

function plusEle(product){
  console.log('plus');
  var title = JSON.parse(localStorage.getItem('title'));
  for (var key in title){
    if (title[key]['title'] == product){
      title[key]['quantity'] += 1;
      localStorage.setItem('title', JSON.stringify(title));
      setTimeout(() => {window.location.reload();}, 0);
    }
  }
}

function deleteEle(product){
  var title = JSON.parse(localStorage.getItem('title'));
    for (var key in title){
      if (title[key]['title'] == product){
        var product = title[key]['title'];
        title = title.filter((el) => el.title !== product);
        localStorage.setItem('title', JSON.stringify(title));
        setTimeout(() => {window.location.reload();}, 0);
        checkCart();
      }
    }
  setTimeout(() => {window.location.reload();}, 0);
}

function clearStorage(){
  location.reload();
  localStorage.removeItem('title');
  history.scrollRestoration = 'manual';
}

function calTotal(){
  var subTotal = 0.00;
  var title = JSON.parse(localStorage.getItem('title'));
  for (var key in title){
    var cartPrice = title[key]['price'] * title[key]['quantity'];
    subTotal += parseFloat(cartPrice);
  }
  document.getElementById('subTotal').textContent = subTotal.toFixed(2);
}

function countItems(){
  var title = JSON.parse(localStorage.getItem('title'));
  document.getElementById('items').textContent = title.length;
}

function fillForm(){
  if (localStorage.getItem('firstName') !== null){
    var firstName = localStorage.getItem('firstName');
    var lastName = localStorage.getItem('lastName');
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
  }
}

function paymentMethods(methods){
  //scroll to payment methods
  if (methods == 'Paylah'){
    document.querySelectorAll('.paylah').forEach(el => {el.style.display = 'block';});
    document.querySelectorAll('.paynow').forEach(el => {el.style.display = 'none';});
    document.querySelectorAll('.card').forEach(el => {el.style.display = 'none';});
  }
  else if (methods == 'Paynow'){
    document.querySelectorAll('.paynow').forEach(el => {el.style.display = 'block';});
    document.querySelectorAll('.paylah').forEach(el => {el.style.display = 'none';});
    document.querySelectorAll('.card').forEach(el => {el.style.display = 'none';});
  }
  else if (methods == 'card') {
    document.querySelectorAll('.card').forEach(el => {el.style.display = 'block';});
    document.querySelectorAll('.paynow').forEach(el => {el.style.display = 'none';});
    document.querySelectorAll('.paylah').forEach(el => {el.style.display = 'none';});
  }
}

function jump(){
  el = document.getElementById('scroll');
  scrollTo(document.body, el.offsetTop, 500);
}

function hideAll(){
  document.querySelectorAll('.paynow').forEach(el => {el.style.display = 'none';});
  document.querySelectorAll('.paylah').forEach(el => {el.style.display = 'none';});
  document.querySelectorAll('.card').forEach(el => {el.style.display = 'none';});
}

function checkout(){
  localStorage.removeItem('title');
}

function redirect(){
  setTimeout(() => {location.href = 'homepage.html';}, 1500);
}
