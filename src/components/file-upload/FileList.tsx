function FileList({ files }: { files: File[] }) {
  return (
    <ul>
      {files.map((file) => {
        return <li key={file.name}>{file.name}</li>
      })}
    </ul>
  )
}

export default FileList
