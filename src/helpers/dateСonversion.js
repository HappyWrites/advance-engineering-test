import { getMonthEng, listMonths } from "./listOfMonth"

export const getDateNow = () => {
  let date = new Date();

  return getConvertedDate(date);
}

export const getStandartDate = date => {
  let dateArray = date.split(' ')
  dateArray[1] = getMonthEng(dateArray[1])
  let dateString = dateArray.join(' ')
  
  return new Date(dateString)
}

export const getConvertedDate = date => {
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  let month = listMonths[date.getMonth()];
  let year = date.getFullYear();  

  return day + " " + month + " " + year;
}