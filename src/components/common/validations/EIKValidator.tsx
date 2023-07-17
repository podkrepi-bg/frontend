export function validateEIK9(eik: string): boolean {
  const digits = checkInput(eik, 9)
  const ninthDigit = calculateNinthDigitInEIK(digits)
  return ninthDigit === digits[8]
}

export function validateEIK13(eik: string): boolean {
  const digits = checkInput(eik, 13)
  const thirteenDigit = calculateThirteenthDigitInEIK(digits)
  return thirteenDigit === digits[12] && thirteenDigit !== -1
}

function calculateNinthDigitInEIK(digits: number[]): number {
  let sum = 0
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * FIRST_SUM_9DIGIT_WEIGHTS[i]
  }
  const remainder = sum % 11
  if (remainder !== 10) {
    return remainder
  }

  let secondSum = 0
  for (let i = 0; i < 8; i++) {
    secondSum += digits[i] * SECOND_SUM_9DIGIT_WEIGHTS[i]
  }
  const secondRem = secondSum % 11
  if (secondRem !== 10) {
    return secondRem
  }

  return 0
}

function calculateThirteenthDigitInEIK(digits: number[]): number {
  const ninthDigit = calculateNinthDigitInEIK(digits)
  if (ninthDigit !== digits[8]) {
    return -1 // Invalid 9th digit in EIK-13
  }

  let sum = 0
  for (let i = 8, j = 0; j < 4; i++, j++) {
    sum += digits[i] * FIRST_SUM_13DIGIT_WEIGHTS[j]
  }
  const remainder = sum % 11
  if (remainder !== 10) {
    return remainder
  }

  let secondSum = 0
  for (let i = 8, j = 0; j < 4; i++, j++) {
    secondSum += digits[i] * SECOND_SUM_13DIGIT_WEIGHTS[j]
  }
  const secondRem = secondSum % 11
  if (secondRem !== 10) {
    return secondRem
  }

  return 0
}

function checkInput(eik: string, eikLength: number): number[] {
  if (eik && eik.length !== eikLength) {
    return []
  }

  const charDigits = eik.split('')
  const digits: number[] = []
  for (let i = 0; i < charDigits.length; i++) {
    if (/\d/.test(charDigits[i])) {
      digits[i] = parseInt(charDigits[i], 10)
    } else {
      return []
    }
  }

  return digits
}

const FIRST_SUM_9DIGIT_WEIGHTS: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
const SECOND_SUM_9DIGIT_WEIGHTS: number[] = [3, 4, 5, 6, 7, 8, 9, 10]
const FIRST_SUM_13DIGIT_WEIGHTS: number[] = [2, 7, 3, 5]
const SECOND_SUM_13DIGIT_WEIGHTS: number[] = [4, 9, 5, 7]
