import { getMonthEng, getMonthRu, listMonths } from "./listOfMonth"

export const getDateNow = () => {
  let date = new Date();

  return getConvertedDate(date);
}

// export const getStandartDate = date => {
//   return
// }

export const getConvertedDate = date => {
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  let month = listMonths[date.getMonth()];
  let year = date.getFullYear();  

  return day + " " + month + " " + year;
}