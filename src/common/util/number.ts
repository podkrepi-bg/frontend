/**
 * Used to add a space every 3 characters in given number
 *
 * @param number number
 */
export const toNumberWithSpacesBetween = (number?: string | number): string | undefined => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
