import { headword } from "./words"

/** Converts number to percent if number is not a string */
export const percent = (value: number | string, variableName = 'value') => {
  if (typeof value == 'number') { return `${value}%` }
  if (value.endsWith('%')) { return value }
  
  throw new Error(`${headword(variableName)} must be string number in percents or just a number. For example 40%.`)
}
/** Converts number to px if number is not a string */
export const px = (value: number | string, variableName = 'value') => {
  if (typeof value == 'number') { return `${value}px` }
  if (value.endsWith('px')) { return value }
  
  throw new Error(`${headword(variableName)} must be string number in pixels or just a number. For example 200px`)
}