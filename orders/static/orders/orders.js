  // variables
var orderList = {"pizza":[],"sub":[],"pasta":[],"salad":[],"dinnner":[]}; // track order
var orderPizza = {}; // pizza object
var orderTopp = []; //track Topp selected
var topp = {}; //topp object
var selected = {'link_pizza':undefined, 'selected':false, 'nbr':0, 'link_subb': [], 'nbr_sel':0}; // track if pizza is selected and nbr of topp authorized
localStorage.setItem('orderList', '');

document.addEventListener('DOMContentLoaded', () => { // on DOM loaded

  //initial state
  hide('.hide'); hide('.hide3');

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
    for (var i=0; i<orderTopp.length; i++)
        remove_topp(i);
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

  // on actions
  document.querySelectorAll('.add-order').forEach(link => {
    link.onclick = () => {
      if (selected.link_pizza == link){
        remove_pizza_all(link);
        return false;
      }
<<<<<<< HEAD
      else if (selected.selected == true){ //if click on another element
        let a = JSON.parse(link.dataset.order);
        selected.nbr=parseInt(a.type[0]);
        if (orderTopp.length>selected.nbr){ // if click on element with less topp
          for (let i=orderTopp.length;i > selected.nbr;i--) {
            document.querySelector("#selected-subb").lastElementChild.remove();// remove the last ones
            orderTopp.pop();//remove from list
          }
        }
        document.querySelectorAll('.add-order').forEach(link => {
          link.parentElement.style.backgroundColor = "";
        });
      }
      link.parentElement.style.backgroundColor = "lightgrey"; //highlight selected pizza
      selected.selected = true;//remember that one is selected
      let a = JSON.parse(link.dataset.order); // select number of subbs
      if (a.type[0] == "1" || a.type[0] == "2" || a.type[0] == "3"){
        selected.nbr=parseInt(a.type[0]); //nbr of subbs in variable
        document.querySelector("#nbr-subb").innerHTML = selected.nbr-orderTopp.length; //display
        if(selected.nbr-orderTopp.length>0)
          unhide('.hide')
      }
      else if (a.type == "Special"){
        selected.nbr=5;//nbr of subbs in variable
        document.querySelector("#nbr-subb").innerHTML = selected.nbr-orderTopp.length;//display
        if(selected.nbr-orderTopp.length>0)
          unhide('.hide');} //unhide
      else {
        selected.nbr=0;
        document.querySelector("#nbr-subb").innerHTML = selected.nbr-orderTopp.length; //nbr of subbs in variable
        hide('.hide');} //unhide
      orderPizza = JSON.parse(link.dataset.order); // convert html data in Json object
      document.querySelector("#selected-pizza").innerHTML = `<b>${orderPizza.kind}, ${orderPizza.type}, ${orderPizza.size}</b>`
      //orderList.push(orderPizza);// add order to list of orders a placer plus tard
      localStorage.setItem('orderList',JSON.stringify(orderList)); // store list of orders in local storage
      var OrderDisplay = JSON.parse(localStorage.getItem('orderList')); // create a json object of localstorage orderlist
=======
      add_pizza(link);
      add_pizza_display(link);
>>>>>>> 2nd_pizza_options
    };
  });
  document.querySelectorAll('.add-topp').forEach(link => {
<<<<<<< HEAD
      link.onclick = () => {
        if (link.parentElement.children[0].classList.contains("fa-minus")) { //if already selected
          link.classList.replace("fa-minus", "fa-plus"); // change icon to plus
          topp = JSON.parse(link.dataset.order);
          let toppList = document.querySelector("#selected-subb").children;
          for (let i=0;i<toppList.length;i++){ //remove element
            if (toppList[i].innerHTML == topp.name){
              toppList[i].remove();}
          };
          for (let i=0;i<orderTopp.length;i++){//remove from list
            if (topp.name==orderTopp[i].name){
              orderTopp.splice(i,1);}
          };
          unhide('.hide2'); // unhide instruction
          unhide('.fa-plus'); // unhide +
          return false; //exit function
        }
        //else if (orderTopp.length > selected.nbr-1){
        //  hide('.hide2')
        //  return false;
        //}
        link.classList.replace("fa-plus", "fa-minus"); //replace + per -
        topp = JSON.parse(link.dataset.order);
        orderTopp.push(topp); // add topp to list of topp selected
        let li = document.createElement('li'); // create html element
        li.innerHTML = topp.name;
        document.querySelector("#selected-subb").append(li); // add subb selected in html
        if (orderTopp.length >= selected.nbr) {
          hide('.hide2'); // If no more item to select hide the instruction
          hide('.fa-plus'); // hide + items
        }
        //orderList.push(orderTopp); plus tard
      };
=======
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
    return false;
    };
>>>>>>> 2nd_pizza_options
  });
  document.querySelector('#pizza-order').onclick = () => {
    debugger;
    orderList.pizza.push({"pizza":orderPizza.ID,"topping":[]});
    var orderToBeStored = {};
    var i=orderList.pizza.length-1;
      for (var j=0;j<orderTopp.length;j++){
        orderList.pizza[i].topping.push(orderTopp[j].ID);
      }
    try {
    orderToBeStored=JSON.parse(localStorage.getItem("orderList"));
    ordertobestored.push(orderList);
    }
    catch{
      orderToBeStored = orderList;
    }
    localStorage.setItem("orderList",JSON.stringify(orderToBeStored));
    remove_topp_all();
    remove_pizza_all(selected.link_pizza);
    orderList = {"pizza":[],"sub":[],"pasta":[],"salad":[],"dinnner":[]};
    selected = {'link_pizza':undefined, 'selected':false, 'nbr':0, 'link_subb': [], 'nbr_sel':0};
  }


}); // end
