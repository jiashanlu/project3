  // variables
var orderList = {"pizza":[],"sub":[],"pasta":[],"salad":[],"dinner":[],"total":0}; // track order
var orderPizza = {}; // pizza object
var orderSubs = {}; // subs object
var orderTopp = []; //track Topp selected
var topp = {}; //topp object
var selected = {'link_pizza':undefined, 'selected':false, 'nbr':0, 'link_subb': [], 'nbr_sel':0}; // track if pizza is selected and nbr of topp authorized
var total = 0;
  //functions
function hide(x){
  document.querySelectorAll(x).forEach(element => {
    element.style.visibility = 'hidden';
  });
}
function unhide(x){
  document.querySelectorAll(x).forEach(element => {
    element.style.visibility = '';
  });
}
function add_pizza_display(link){
  document.querySelectorAll('.add-order').forEach(link => {// remove other highlight
    link.parentElement.style.backgroundColor = "";
  });
  link.parentElement.style.backgroundColor = "lightgrey";//highlight the pizza selected
  selected.link_pizza=link;
  document.querySelector("#selected-pizza").innerHTML = `<b>${orderPizza.kind}, ${orderPizza.type}, ${orderPizza.size}</b>`;// display pizza in order
  document.querySelector("#nbr-subb").innerHTML = selected.nbr;// display max number
  unhide('.hide');//unhide Topp links and instruction
  if (selected.nbr == selected.nbr_sel)
    hide('.hide2')
}
function add_pizza(link){
  orderPizza = JSON.parse(link.dataset.order); // get the pizza object
  selected.selected= true; // change the selected status
  select_numberTopp(orderPizza); // select number Topp
  if (selected.nbr_sel>selected.nbr){
    remove_excess_topp();
    hide('.hide2');
  }
  if (selected.nbr_sel==selected.nbr)
    unhide('.hide3')
  else
    hide('.hide3')
}
function remove_pizza_all(link){//remove pizza from screen and object
  orderPizza={};
  link.parentElement.style.backgroundColor = ""; // remove from screen
  remove_topp_all();
  hide('.hide');// hide screen element
  hide('.hide3');
  selected = {'link_pizza':undefined, 'selected':false, 'nbr':0, 'link_subb': [], 'nbr_sel':0};// reinitialize tracking
}
function select_numberTopp(x){
  if (x.type[0] == "1" || x.type[0] == "2" || x.type[0] == "3")
    selected.nbr=parseInt(x.type[0])
  else if (x.type == "Special")
    selected.nbr=5
  else
    selected.nbr=0
}
function add_topp_display(link){
  selected.link_subb.push(link); //track selected topp link
  link.classList.replace("fa-plus", "fa-minus");
  let li = document.createElement('li');
  li.innerHTML = topp.name;
  document.querySelector("#selected-subb").append(li);

}
function add_topp(link){
  if (selected.nbr_sel>selected.nbr){
    remove_excess_topp();
    return false;
  }
  topp = JSON.parse(link.dataset.order); // update object
  orderTopp.push(topp);// push in list
  selected.nbr_sel++;
  if (selected.nbr_sel==selected.nbr){
    hide('.hide2');
    unhide('.hide3');
  }
}
function remove_excess_topp() {
  while (selected.nbr_sel>selected.nbr){
    document.querySelector("#selected-subb").lastElementChild.remove();
    orderTopp.pop();
    let linkd = selected.link_subb.pop();
    linkd.classList.replace("fa-minus", "fa-plus");
    selected.nbr_sel--;
  };
  unhide('.hide3');
}
function remove_topp_all(){
  let b = orderTopp.length;
  let list = document.querySelector("#selected-subb").children;
  for (var i=b-1  ; i>=0; i--) {
      list[i].remove();
      orderTopp.splice(i,1);
      selected.link_subb[i].classList.replace("fa-minus", "fa-plus");
      selected.link_subb.splice(i,1);
      selected.nbr_sel--;
  };
  topp = {};
  unhide('.hide2');
  hide('.hide3');
  }
function remove_topp(j){
  let list = document.querySelector("#selected-subb").children;
  list[j].remove();
  orderTopp.splice(j,1);
  selected.link_subb[j].classList.replace("fa-minus", "fa-plus");
  selected.link_subb.splice(j,1);
  topp = {};
  selected.nbr_sel--;
  unhide('.hide2');
  hide('.hide3');
}
function loadOrderPizza(data){
  for (var i=0; i<(data.pizza.length); i++){
    let li = document.createElement('li');
    li.innerHTML = `Pizza : ${data.pizza[i].pizza.kind}, ${data.pizza[i].pizza.type}, ${data.pizza[i].pizza.size}`;
      if (data.pizza[i].topping.length>0){
        li.innerHTML += " (";
        var t =data.pizza[i].topping.length;
        for (var j=0; j<t-1; j++){
          li.innerHTML += ` ${data.pizza[i].topping[j].name},`;
        };
        li.innerHTML += ` ${data.pizza[i].topping[t-1].name} `;
        li.innerHTML += ")";
      }
    li.innerHTML += ` $ : ${data.pizza[i].pizza.price}`;
    total = total + data.pizza[i].pizza.price;
    let a = document.createElement('a');
    a.innerHTML = '<a href="#" class="fas fa-minus topp-button add-topp rem" style=""></a>'
    li.append(a);
    document.querySelector("#Checkout").append(li);
  };

}
function deleteOrder(i){
  let data = JSON.parse(localStorage.getItem("orderList"));
  var t =0;
  for (var y=0; y<Object.keys(data).length; y++){ //value of object.length is 5
    var t = t + data[Object.keys(data)[y]].length; //increment t
    if (t >= i) {
      var type = Object.keys(data)[y];
      var x = data[Object.keys(data)[y]].length-(t-i+1);
      if (type == "pizza"){
        total = total - data.pizza[x].pizza.price;
        loadTotal();
      }
      else if (type != "pizza"){
        total = total - data[type][x].price;
        loadTotal();
      };
      data[type].splice(x,1);
      break;
    };
  };
  localStorage.setItem("orderList", JSON.stringify(data));
}
function add_element_basket(type, data){
  orderList[type].push(JSON.parse(data));
  orderToBeStored ={};
  try {
  orderToBeStored=JSON.parse(localStorage.getItem("orderList"));
  for (var i=0; i<orderList[type].length; i++)
    orderToBeStored[type].push(orderList[type][i]);
  }
  catch{
    orderToBeStored = orderList;
  }
  localStorage.setItem("orderList",JSON.stringify(orderToBeStored));
  orderList = {"pizza":[],"sub":[],"pasta":[],"salad":[],"dinner":[],"total":0};
};
function loadOrder(type,data){
  for (var i=0; i<(data[type].length); i++){
    let li = document.createElement('li');
    li.innerHTML = `${type} : ${data[type][i].name}, ${data[type][i].size}, $: ${data[type][i].price}`;
    if (data[type][i].subofsub != ""){
      li.innerHTML = `${data[type][i].subofsub} added to ${data[type][i].name}, $: ${data[type][i].price}`;
    };
    if (type == "salad" || type == "pasta"){
      li.innerHTML = `${type} : ${data[type][i].name}, $: ${data[type][i].price}`;
    };
    total = total + data[type][i].price;
    let a = document.createElement('a');
    a.innerHTML = '<a href="#" class="fas fa-minus topp-button add-topp rem" style=""></a>';
    li.append(a);
    document.querySelector("#Checkout").append(li);
  };
}
function loadTotal(){
  document.querySelector('#total').innerHTML = `Total order : $: ${total}`;
}
function pay(){

}
// on pages
if (document.title=="Pizzas" ){ //on pizza page
  document.addEventListener('DOMContentLoaded', () => {
    hide('.hide'); hide('.hide3'); //initial state
    document.querySelectorAll('.add-order').forEach(link => {
      link.onclick = () => {
        if (selected.link_pizza == link){
          remove_pizza_all(link);
          return false;
        }
        add_pizza(link);
        add_pizza_display(link);
      };
    });
    document.querySelectorAll('.add-topp').forEach(link => {
      link.onclick = () => {
        for (let i=0; i<selected.link_subb.length; i++) {
          if (selected.link_subb[i] == link){
            remove_topp(i);
            return false;
          }
        }
        if (selected.nbr_sel<selected.nbr){
          add_topp(link);
          add_topp_display(link);
        }
      };
    });
    document.querySelector('#pizza-order').onclick = () => {
      orderList.pizza.push({"pizza":orderPizza,"topping":[]}); //add in orderLIst
      var orderToBeStored = {};
      var i=orderList.pizza.length-1;
        for (var j=0;j<orderTopp.length;j++){
          orderList.pizza[i].topping.push(orderTopp[j]);
        };
      try {
      orderToBeStored=JSON.parse(localStorage.getItem("orderList"));
      for (var i=0; i<orderList.pizza.length; i++)
        orderToBeStored.pizza.push(orderList.pizza[i]);
      }
      catch{
        orderToBeStored = orderList;
      }
      localStorage.setItem("orderList",JSON.stringify(orderToBeStored));
      remove_topp_all();
      remove_pizza_all(selected.link_pizza);
      orderList = {"pizza":[],"sub":[],"pasta":[],"salad":[],"dinner":[],"total":0};
      selected = {'link_pizza':undefined, 'selected':false, 'nbr':0, 'link_subb': [], 'nbr_sel':0};
    };
  });
};
if (document.title=="Checkout"){ //on checkout page
  document.addEventListener('DOMContentLoaded', () => {// on DOM loaded
    hide(".hide");
    if (localStorage.getItem("orderList")=="")
      return
    var data = JSON.parse(localStorage.getItem("orderList")); //load data
    total = 0;
    loadOrderPizza(data);// display order list for pizza
    loadOrder("sub",data);
    loadOrder("pasta",data);
    loadOrder("salad",data);
    loadOrder("dinner",data);
    $(".rem").on('click', function(event){
      for (var i=0; i< document.querySelector("#Checkout").childElementCount ;i++){
        if ((this).closest("li") == document.querySelector("#Checkout").children[i])
          deleteOrder(i+1); //delete pizza from order
      }
    $(this).closest("li").remove(); //delete display
    });
    loadTotal();
    if (document.querySelector("#Checkout").childElementCount>0)
      unhide('.hide')
    var handler = StripeCheckout.configure({
      key: 'pk_test_WUmBD14Gz3VhhEXMPm4IZebn',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        document.querySelector("#stripeToken").value = token.id;
        document.querySelector("#stripeEmail").value = token.email;
        document.querySelector("#payment-form").submit();
      }
    });
    document.querySelector('#confirm-checkout').onclick = e => {
      var data = JSON.parse(localStorage.getItem("orderList"));
      data.total=total;
      localStorage.setItem("orderList",JSON.stringify(data));
      document.querySelector('#data').value = localStorage.getItem("orderList");
      var amountInCents = Math.floor($("#amountInDollars").val() * 100);
      var displayAmount = parseFloat(Math.floor($("#amountInDollars").val() * 100) / 100).toFixed(2);
      // Open Checkout with further options
      handler.open({
        name: 'Jiashan Pizza',
        description: 'Many thanks',
        amount: total*100,
      });
      e.preventDefault();
      localStorage.setItem("orderList","");
    };
  });
};
if (document.title=="Subs" || document.title=="Italian" || document.title=="Dinner"){ // on other menu page
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.new-order').forEach(link => {
      link.onclick = () => {
        orderSubs = link.dataset.order;
        var type = link.dataset.type;
        add_element_basket(type, orderSubs);
      };
    });
  });
};
