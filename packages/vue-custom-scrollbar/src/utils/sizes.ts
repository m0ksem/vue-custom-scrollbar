import upperFirst from 'lodash/upperFirst'

/** Converts number to percent if number is not a string */
export const percent = (value: number | string, variableName = 'value') => {
  if (typeof value == 'number') { return `${value}%` }
  if (value.endsWith('%')) { return value }
  
  throw new Error(`${upperFirst(variableName)} must be string number in percents or just a number. For example 40%.`)
}

/** Converts number to px if number is not a string */
export const px = (value: number | string, variableName = 'value') => {
  if (typeof value == 'number') { return `${value}px` }
  if (value.endsWith('px')) { return value }
  
  throw new Error(`${upperFirst(variableName)} must be string number in pixels or just a number. For example 200px`)
}

export const number = (value: number | string) => {
  return typeof value === 'number' ? value : parseFloat(value)
}