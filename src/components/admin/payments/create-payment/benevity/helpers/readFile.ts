/**
 * Read file asynchronously
 * @param file File to read
 * @returns
 */
export async function asyncFileReader(file: File): Promise<string | ArrayBuffer> {
  const reader = new FileReader()
  reader.readAsText(file)
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      if (!reader.result) {
        reject(`File couldn't be parsed`)
        return
      }
      resolve(reader.result)
    }
    reader.onerror = function () {
      reject(reader.error)
    }
  })
}
