/**
 *
 * @param enumType Enumeration type to get the array of options from
 * @returns  Array of options for the given enum type
 * @example
 * enum MyEnum {
 * A = 'ValueA',
 * B = 'ValueB'
 * }
 * getOptionsArrayFromEnum(MyEnum) // [{value: 'ValueA', label: 'A', key: 'A'}, {value: 'ValueB', label: 'B', key: 'B'}]
 */
export const getOptionsArrayFromEnum = (enumType: Record<string, string | number>) => {
  return Object.keys(enumType).map((key) => ({
    value: enumType[key],
    name: key,
    key,
  }))
}
