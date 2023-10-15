const matchingMonths = {
  января: 'january',
  февраля: 'february',
  марта: 'march',
  апреля: 'april',
  мая: 'may',
  июня: 'june',
  июля: 'july',
  августа: 'august',
  сентября: 'september',
  октября: 'october',
  ноября: 'november',
  декабря: 'december'
}

export const listMonths = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

export const getMonthEng = month => {
  return matchingMonths[month]
}

export const getMonthRu = month => {
  return Object.keys(matchingMonths).find(key =>
    object[key] === month);
}