export const downloadFile = (filename: string, data: Blob | MediaSource) => {
  const url = window.URL.createObjectURL(data)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.dispatchEvent(new MouseEvent('click'))
  window.URL.revokeObjectURL(url)
}
