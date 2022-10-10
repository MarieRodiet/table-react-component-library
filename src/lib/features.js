export function SortList(list, key, order, type) {
  if (type === 'date') {
    if (order) {
      return SortDateAZ(list, key)
    } else {
      return SortDateZA(list, key)
    }
  }
  if (type === 'string')
    if (order) {
      return SortStringAZ(list, key)
    } else {
      return SortStringZA(list, key)
    }
  else {
    console.log('type of column object is not date or string')
    return list
  }
}

function SortStringAZ(list, key) {
  return list.sort(function (a, b) {
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
  })
}

function SortStringZA(list, key) {
  return list.sort(function (a, b) {
    return b[key] < a[key] ? -1 : b[key] > a[key] ? 1 : 0
  })
}

function SortDateAZ(list, key) {
  return list.sort(function (a, b) {
    return new Date(a[key]) - new Date(b[key])
  })
}

function SortDateZA(list, key) {
  return list.sort(function (a, b) {
    return new Date(b[key]) - new Date(a[key])
  })
}

export function SearchList(list, inputSearch) {
  const result = []
  list.map((el) => {
    let match = false
    Object.keys(el).map((key) => {
      const value = el[key].toLowerCase()
      if (value.includes(inputSearch)) match = true
    })
    if (match) {
      result.push(el)
    }
  })
  return result
}

export function ShowList(data, rowsPerPage, currentPage) {
  const trimStart = (currentPage - 1) * rowsPerPage
  const trimEnd = +trimStart + +rowsPerPage
  const newSlice = data.slice(trimStart, trimEnd)
  return newSlice
}

export function OrderData(columnFields, data) {
  let ordered = []
  data.map((object) => {
    let newObject = {}
    columnFields.map((field) => {
      Object.entries(object).map(([key, value]) => {
        if (field === key) {
          newObject[key] = value
        }
      })
    })
    ordered.push(newObject)
  })
  return ordered
}

export function FindObjectInArray(object, array) {
  let found = []
  array.map((el) => {
    let allMatch = []
    Object.entries(el).map(([arrayElKey]) => {
      if (object[arrayElKey] === el[arrayElKey]) {
        allMatch.push(true)
      } else {
        allMatch.push(false)
      }
    })
    let allMatchResult = allMatch.every((bool) => bool === true)
    found.push(allMatchResult)
  })
  return found.some((bool) => bool === true)
}

export function FindObjectIndexInArray(object, array) {
  let found = []
  let indexFound = -1
  array.map((el, index) => {
    let allMatch = []
    Object.entries(el).map(([arrayElKey]) => {
      if (object[arrayElKey] === el[arrayElKey]) {
        allMatch.push(true)
      } else {
        allMatch.push(false)
      }
    })

    let allMatchResult = allMatch.every((bool) => bool === true)
    if (allMatchResult) {
      indexFound = index
    }
    found.push(allMatchResult)
  })
  return indexFound
}
