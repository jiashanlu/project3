var orderList = [];
var orderPizza = {};
var top = {};
var orderTopp = [];
const selected = {'selected':false, 'nbr':0};
localStorage.setItem('orderList', '');

document.addEventListener('DOMContentLoaded', () => { // on DOM loaded
  // variables


  //initial state
  hide('.hide');

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

  // on actions
  document.querySelectorAll('.add-order').forEach(link => { // on click on pizza
    link.onclick = () => {
      if (link.parentElement.style.backgroundColor == "lightgrey"){ //IF CLICK ON SELECTED ELEMENT
        document.querySelectorAll('.add-order').forEach(link => {
          link.parentElement.style.backgroundColor = "";
        });
        selected.selected = false; // reset everything
        selected.nbr=0;
        hide('.hide');
        orderPizza = {};
        return false;
      }
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
    };
  });



  document.querySelectorAll('.add-topp').forEach(link => {
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
  });





}); // end
