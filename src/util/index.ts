import type {Data} from "../types"

export function computeGreatestElementIdx(arr: Data[]): number {
  let maxIdx = -1
  let maxSize = -Infinity
  for (let i = 0; i < arr.length; i++) {
    const size = Object.values(arr[i]).length
    if (size > maxSize) {
      maxSize = size
      maxIdx = i
    }
  }
  return maxIdx
}
