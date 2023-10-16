import { getStandartDate } from "./dateСonversion.js"

export const sort = (array, column, sorting) => {
  if (column === 'date' && sorting === 'asc') {
    return array.sort(compareDateAsc)
  } else if (column === 'date' && sorting === 'desc') {
    return array.sort(compareDateDesc)
  } else if (sorting === 'asc') {
    return array.sort(byFieldAsc(column))
  } else if (sorting === 'desc') {
    return array.sort(byFieldDesc(column))
  } else {
    return array
  }
}

const compareDateAsc = (a, b) => {
  let dateA = getStandartDate(a.date)
  let dateB = getStandartDate(b.date)

  return dateA - dateB
}

const compareDateDesc = (a, b) => {
  let dateA = getStandartDate(a.date)
  let dateB = getStandartDate(b.date)

  return dateB - dateA
}

const byFieldAsc = fieldName => {
  return (a, b) => a[fieldName].toLowerCase() > b[fieldName].toLowerCase() ? 1 : -1
}

const byFieldDesc = fieldName => {
  return (a, b) => a[fieldName].toLowerCase() > b[fieldName].toLowerCase() ? -1 : 1
}