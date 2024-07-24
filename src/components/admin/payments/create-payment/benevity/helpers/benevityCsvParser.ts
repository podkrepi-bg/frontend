import camelCase from 'lodash/camelCase'
import Papa from 'papaparse'
import { TBenevityCSVParser, TBenevityDonation } from './benevity.types'

/**
 * Serialize Benevity CSV donation report to JavaScript Object
 * @param csvString CSV string to serialize
 * @returns
 */

export function BenevityCSVParser(csvString: string): TBenevityCSVParser {
  const benevityObj = {} as TBenevityCSVParser
  benevityObj.donations = []

  const EXPECTED_CSV_SECTIONS = 4
  const SECTION_DELIMETER = '#-------------------------------------------,'

  //Some reports include redundant quotes which affects the end result of the parser
  const csvWithoutQuotes = csvString.replace(/["']/gm, '')

  //Get index of Totals inside the string, and prepend SECTION_DELIMETER to split project donations the rest of data inside csv.
  const END_OF_PROJECTS_SECTION = csvWithoutQuotes.lastIndexOf('Totals,')
  const finalString =
    csvWithoutQuotes.substring(0, END_OF_PROJECTS_SECTION) +
    `${SECTION_DELIMETER}` +
    csvWithoutQuotes.substring(END_OF_PROJECTS_SECTION)

  const csvArr = finalString.split(SECTION_DELIMETER).filter((line) => line !== '\n')

  if (csvArr.length !== EXPECTED_CSV_SECTIONS) {
    throw new Error(
      'More or less sections found than expected.\nPlease check your file and try again or import benevity report manually ',
    )
  }

  const donationSummary = csvArr[1].concat(csvArr[3])
  Papa.parse<Record<keyof TBenevityCSVParser, TBenevityCSVParser[keyof TBenevityCSVParser]>>(
    donationSummary,
    {
      skipEmptyLines: true,
      dynamicTyping: true,
      step(row: Papa.ParseStepResult<unknown>) {
        const [key, value] = row.data as [string, string]

        if (!key || !value) return
        const transformedKey = camelCase(key) as keyof TBenevityCSVParser
        ;(benevityObj as BenevtyObj)[transformedKey] = value
      },
    },
  )

  const projectsSummary = csvArr[2]
  Papa.parse(projectsSummary, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping(field) {
      return (
        field === 'merchantFee' ||
        field === 'causeSupportFee' ||
        field === 'matchAmount' ||
        field === 'totalDonationToBeAcknowledged'
      )
    },
    transformHeader(header) {
      return camelCase(header)
    },
    complete: (result: Papa.ParseResult<TBenevityDonation>) => {
      const donationsWithCalculation = result.data.map((result) => {
        const totalFee = result.merchantFee + result.causeSupportFee
        result['totalFee'] = totalFee
        result['totalAmount'] = result.totalDonationToBeAcknowledged + result.matchAmount - totalFee
        return result
      })

      benevityObj.donations = donationsWithCalculation
    },
  })
  return benevityObj
}

type BenevtyObj = Record<keyof TBenevityCSVParser, TBenevityCSVParser[keyof TBenevityCSVParser]>
