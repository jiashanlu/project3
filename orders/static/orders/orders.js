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
    return false;
    };
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
