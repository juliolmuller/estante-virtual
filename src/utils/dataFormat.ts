
export interface TruncateTextOptions {
  clamp?: string
  length?: number
}

const DEFAULT_TRUNC_LENGTH = 60
const DEFAULT_TRUNC_CLAMP = '...'

export function truncateText(value: string, {
  clamp = DEFAULT_TRUNC_CLAMP,
  length = DEFAULT_TRUNC_LENGTH,
}: TruncateTextOptions = {}) {
  if (value.length <= length) {
    return value
  }

  const truncIndex = length - clamp.length
  let shortValue = value.slice(0, truncIndex)
  let indexOfLastChar = shortValue.length - 1

  while (indexOfLastChar > 0 && shortValue[indexOfLastChar] !== ' ' && shortValue[indexOfLastChar] !== clamp[0]) {
    indexOfLastChar--
  }

  indexOfLastChar = indexOfLastChar || truncIndex
  shortValue = shortValue.slice(0, indexOfLastChar)

  return shortValue + clamp
}
