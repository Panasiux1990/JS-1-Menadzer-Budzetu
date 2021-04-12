var incomingsList = document.querySelector('#incomingsList')
var addIncoming = document.querySelector('#addIncoming')
var outgoingsList = document.querySelector('#outgoingsList')
var addOutgoings = document.querySelector('#addOutgoings')
var state = {
  nextId: 3, 
  incomings: [
    {id: 1, name: "Zlecenie", amount: 2050, isEditable: false}, 
    {id: 2, name: "Webinar", amount: 3000, isEditable: false}, 
  ],
 nextId2: 3,
  outgoings: [
    {id: 1, name: "Czynsz", amount: 1000, isEditable: false}, 
    {id: 2, name: "Energia elektryczna", amount: 3000, isEditable: false}, 
  ]
}
    
renderApp()

function renderApp() {
  renderUI()
  renderSumUI()
  sumAllUI()
}


function renderUI() {
  
  incomingsList.innerHTML = ""
  
  
  state.incomings.forEach(item => {
    var liInnerHTML = null; 
    
    if (item.isEditable) {
      liInnerHTML = `
        <div class="item item-incoming">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span>zl   
        </div>
        <button class="confirmEditIncoming" data-id="${item.id}">Tak</button> 
        <button class="cancelEditIncoming" data-id="${item.id}">Nie</button>
      `
    } else {
      liInnerHTML = `
        ${item.name} - ${item.amount}zl 
        <button class="editIncoming" data-id="${item.id}">Edytuj</button> 
        <button class="removeIncoming" data-id="${item.id}">Usun</button>
      `
    }
    let newLi = document.createElement("li")
    newLi.dataset.name = item.name
    newLi.innerHTML = liInnerHTML
    incomingsList.append(newLi)   
  })
  
  let editIncomings = document.querySelectorAll('.editIncoming')
  editIncomings.forEach(i => { 
   
    i.addEventListener('click', makeItemEditable)
  })
  
  let confirmEditIncomings = document.querySelectorAll('.confirmEditIncoming')
  confirmEditIncomings.forEach(i => { 
    i.addEventListener('click', confirmEditItem)
  })
  
 
  let cancelEditIncomings = document.querySelectorAll('.cancelEditIncoming')
  cancelEditIncomings.forEach(i => { 
    i.addEventListener('click', cancelEditItem)
  })
  
  
  let removeIncomings = document.querySelectorAll('.removeIncoming') 
  removeIncomings.forEach(i => { 
    i.addEventListener('click', removeItem)
  })
  outgoingsList.innerHTML = ""
    
  state.outgoings.forEach(item => {
    var liInnerHTML2 = null; 
    
    if (item.isEditable) {
      liInnerHTML2 = `
        <div class="item item-outgoing">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span>zl   
        </div>
        <button class="confirmEditOutgoing" data-id="${item.id}">Tak</button> 
        <button class="cancelEditOutgoing" data-id="${item.id}">Nie</button>
      `
    } else {
      liInnerHTML2 = `
        ${item.name} - ${item.amount}zl 
        <button class="editOutgoing" data-id="${item.id}">Edytuj</button> 
        <button class="removeOutgoing" data-id="${item.id}">Usun</button>
      `
    }
    let newLi2 = document.createElement("li")
    newLi2.dataset.name = item.name
    newLi2.innerHTML = liInnerHTML2
    outgoingsList.append(newLi2)   
  })
  
  let editOutgoing = document.querySelectorAll('.editOutgoing')
  editOutgoing.forEach(i => { 
    i.addEventListener('click', makeItemEditable2)
  })
  
  let confirmEditOutgoing = document.querySelectorAll('.confirmEditOutgoing')
  confirmEditOutgoing.forEach(i => { 
    i.addEventListener('click', confirmEditItem2)
  })
  
  let cancelEditOutgoing = document.querySelectorAll('.cancelEditOutgoing')
  cancelEditOutgoing.forEach(i => { 
    i.addEventListener('click', cancelEditItem2)
  })
  
  let removeOutgoing = document.querySelectorAll('.removeOutgoing') 
  removeOutgoing.forEach(i => { 
    i.addEventListener('click', removeItem2)
  })

}

function renderSumUI() {
 var incomingsSum = document.querySelector('#incomingsSum')
 var sumOfIncomings = sum(state.incomings)
 var stringSumOfIncomings = String(sumOfIncomings)
 incomingsSum.innerHTML = `suma przychodow: ${stringSumOfIncomings}zl`;
 var outgoingsSum = document.querySelector('#outgoingsSum')
 outgoingsSum.innerHTML = `suma kosztow: ${sum(state.outgoings)}zl`
}

function sum(arr) {
  return arr.reduce((acc, item) => acc + item.amount, 0)
}

addIncoming.addEventListener('click', addNewItem)

addOutgoings.addEventListener('click', addNewItem2)

function addNewItem(e) {
  e.preventDefault()
  
  var newName = document.querySelector('#newName')
  var newAmount = document.querySelector('#newAmount')
  var newItem = {
    id: state.nextId, 
    name: newName.value, 
    amount: Number(newAmount.value)
  }
  var x = document.getElementById("newAmount").value;
  if ( x < 0 ) {
    alert('Liczba musi być powyżej 0')
    return;
    
  }
  
  state.incomings.push(newItem) 

  renderApp()

}

function addNewItem2(e) {
    e.preventDefault()

    var newName2 = document.querySelector('#newName2')
  var newAmount2 = document.querySelector('#newAmount2')
  var newItem2 = {
    id: state.nextId2, 
    name: newName2.value, 
    amount: Number(newAmount2.value)
  }
  var x = document.getElementById("newAmount2").value;
  if ( x < 0 ) {
    alert('Liczba musi być powyżej 0')
    return;
  }

  state.outgoings.push(newItem2)

  renderApp()
}

function makeItemEditable(e) {
  var id = Number(e.target.dataset.id) 
  state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: true} : i)
  
  renderApp()
}

function makeItemEditable2(e) {
    var id = Number(e.target.dataset.id)
    state.outgoings = state.outgoings.map(i => i.id === id ? {...i, isEditable: true} : i)
  
  renderApp()

}


function confirmEditItem(e) {
  var id = Number(e.target.dataset.id)
  var spans = document.querySelectorAll(`div.item.item-incoming [data-id="${id}"]`) 
  var newName = spans[0].innerText  
  var newAmount = Number(spans[1].innerText)  
  state.incomings = state.incomings.map(i => i.id === id ? {...i, name: newName, amount: newAmount, isEditable: false} : i)  
  
  renderApp()
}

function confirmEditItem2(e) {

    var id = Number(e.target.dataset.id)
    var spans = document.querySelectorAll(`div.item.item-outgoing [data-id="${id}"]`) 
    var newName = spans[0].innerText  
    var newAmount = Number(spans[1].innerText)  
    state.outgoings = state.outgoings.map(i => i.id === id ? {...i, name: newName, amount: newAmount, isEditable: false} : i)  
        
    renderApp()
    
}

function cancelEditItem(e) {
  var id = Number(e.target.dataset.id)
    state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: false} : i)
  
  renderApp()
}
function cancelEditItem2(e) {
    var id = Number(e.target.dataset.id)
      state.outgoings = state.outgoings.map(i => i.id === id ? {...i, isEditable: false} : i)
    
    renderApp()
  }

function removeItem(e) {
  e.preventDefault()
  
  const idToRemove = Number(e.target.dataset.id);
  state.incomings = state.incomings.filter(i => i.id !== idToRemove)
  
  renderApp()
}

function removeItem2(e) {
    e.preventDefault()
    const idToRemove = Number(e.target.dataset.id);
    state.outgoings = state.outgoings.filter(i => i.id !== idToRemove)
    
    renderApp()
  }

function resetNewForm(name, amount) {
  name.value = ""
  amount.value = ""
}

function sumAllUI   () {
  let sumEnd = document.querySelector('#sumEnd');
  let sum1 = sum(state.incomings);
  let sum2 = sum(state.outgoings);
  let result = sum1 - sum2;
  if ( result < 0) {
     sumEnd.innerHTML = `Brakuje ${result}  zł`;
     sumEnd.style.background='red'; 
  } else {
      sumEnd.innerHTML = `Pozostało ${result} zł`;
      sumEnd.style.background='green';
  
    }
}
