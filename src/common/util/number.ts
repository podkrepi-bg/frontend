/**
 * Used to make number to string and add 3 space between
 *
 * @param number number
 */
export const numberWithSpacesBetween = (number?: string | number): string | undefined => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
