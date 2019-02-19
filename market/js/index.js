var list = []

function getTotal (list) {
  var total = 0

  list.forEach(function (row) {
    total += row.amount * row.price
  })

  return total
}

function setList (list) {
  let table = ''

  saveListStorage(list)

  list.forEach(function (row, key) {
    table += '<div class="card" style="width: 18rem;"><div class="card-body">'
    table += '  <h5 class="card-title">' + formatDesc(row.desc) + '</h5>'
    table += '  <h6 class="card-subtitle mb-2 text-muted">' + formatAmount(row.amount) + ' x </h6>'
    table += '  <p class="card-text">' + formatValue(row.price) + ' = ' + formatValue(row.amount * row.price) + '</p>'
    table += '  <a href="#" class="card-link badge badge-primary" onclick="setUpdate(' + key + ');">Edit</a>'
    table += '  <a href="#" class="card-link badge badge-danger" onclick="deleteData(' + key + ');">Delete</a>'
    table += '</div></div>'
  })

  if (table === '') {
    table = '<span class="text-center">List empty</span>'
  }

  document.getElementById('list').innerHTML = table
  document.getElementById('total').innerHTML = formatValue(getTotal(list))

  return table
}

function formatDesc (desc) {
  let str = desc.toLowerCase()
  str = str.charAt(0).toUpperCase() + str.slice(1)
  return str
}

function formatValue (value) {
  let str = parseFloat(value).toFixed(2) + ''
  str = str.replace('.', ',')
  return str
}

function formatAmount (value) {
  return value
}

function addData () {
  if (!validation()) {
    return
  }

  let desc = document.getElementById('desc').value
  let amount = document.getElementById('amount').value
  let price = document.getElementById('price').value

  list.unshift({
    'desc': desc, 'amount': amount, 'price': price
  })

  resetForm()
  setList(list)
}

function setUpdate (id) {
  let obj = list[id]

  document.getElementById('desc').value = obj.desc
  document.getElementById('amount').value = obj.amount
  document.getElementById('price').value = obj.price

  document.getElementById('btnUpdate').style.display = 'inline-block'
  document.getElementById('btnAdd').style.display = 'none'

  document.getElementById('inputIDUpdate').innerHTML = '<input type="hidden" id="idUpdate" value="' + id + '">'
}

function resetForm () {
  document.getElementById('desc').value = ''
  document.getElementById('amount').value = ''
  document.getElementById('price').value = ''

  document.getElementById('errors').style.display = 'none'
  document.getElementById('btnUpdate').style.display = 'none'
  document.getElementById('btnAdd').style.display = 'inline-block'

  document.getElementById('inputIDUpdate').innerHTML = ''
}

function updateData () {
  if (!validation()) {
    return
  }

  let id = document.getElementById('idUpdate').value
  let desc = document.getElementById('desc').value
  let amount = document.getElementById('amount').value
  let price = document.getElementById('price').value

  list[id] = {
    'desc': desc, 'amount': amount, 'price': price
  }

  resetForm()
  setList(list)
}

function deleteData (id) {
  let obj = list[id]
  if (window.confirm('Delete ' + obj.desc + '?')) {
    if (id === (list.length - 1)) {
      list.pop()
    } else {
      if (id === 0) {
        list.shift()
      } else {
        let arrAuxIni = list.slice(0, id)
        let arrAuxEnd = list.slice(id + 1)

        list = arrAuxIni.concat(arrAuxEnd)
      }
    }

    setList(list)
  }
}

function validation () {
  let desc = document.getElementById('desc').value
  let amount = document.getElementById('amount').value
  let price = document.getElementById('price').value

  let numberTest = /^[0-9]+$/
  let decimalTest = /^[-+]?[0-9]+\.[0-9]+$/

  let errors = ''

  if (desc === '') {
    errors += '<p>Fill out description</p>'
  }

  if (amount === '') {
    errors += '<p>Fill out quantity</p>'
  } else {
    if (!amount.match(numberTest)) {
      errors += '<p>Fill out a valid quantity</p>'
    }
  }

  if (price === '') {
    errors += '<p>Fill out price</p>'
  } else {
    if (!price.match(numberTest)) {
      if (!price.match(decimalTest)) {
        errors += '<p>Fill out a valid price</p>'
      }
    }
  }

  if (errors !== '') {
    document.getElementById('errors').innerHTML = errors
    document.getElementById('errors').style.display = 'inline-block'
    return 0
  } else {
    return 1
  }
}

function deleteList () {
  if (list.length > 0) {
    if (!window.confirm('Delete this list?')) {
      return
    }
  }

  list = []

  resetForm()
  setList(list)
}

function saveListStorage (list) {
  let jsonStr = JSON.stringify(list)
  window.localStorage.setItem('list', jsonStr)
}

function initListStorage () {
  let testList = window.localStorage.getItem('list')
  if (testList) {
    list = JSON.parse(testList)
  }
  setList(list)
}

initListStorage()
