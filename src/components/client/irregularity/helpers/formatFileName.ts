export const formatFileName = (fileName: string) => {
  const maxLength = 15
  if (fileName.length <= maxLength) return fileName

  const fileExtension = fileName.split('.').pop()
  if (fileExtension) {
    const nameWithoutExtension = fileName.slice(0, -(fileExtension.length + 1))
    return `${nameWithoutExtension.slice(0, 6)}...${nameWithoutExtension.slice(
      -6,
    )}.${fileExtension}`
  }
}
