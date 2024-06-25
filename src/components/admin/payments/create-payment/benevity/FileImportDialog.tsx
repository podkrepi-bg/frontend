import { BenevityCSVParser } from './helpers/benevityCsvParser'
import { asyncFileReader } from './helpers/readFile'
import { useField } from 'formik'
import { useRef, useState } from 'react'

export function FileImportDialog() {
  const [isDragging, setIsDragging] = useState(false)
  const inputFile = useRef<HTMLInputElement | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)
  const [field, meta, { setValue }] = useField('benevityData')

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
    event.dataTransfer.dropEffect = 'copy'
  }
  const onDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }
  const onDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    const fileAsText = await asyncFileReader(file)
    const csvToJSON = BenevityCSVParser(fileAsText as string)
    setValue(csvToJSON)
    submitButtonRef.current?.click()
  }
  const onClick = () => {
    inputFile.current?.click()
  }

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setIsDragging(false)

    const filelist = event.target.files
    if (!filelist) return
    const file = filelist[0]
    if (file.type !== 'text/csv')
      throw new Error('Unsupported file format. Only csv files are allowed')
    const fileAsText = await asyncFileReader(file)
    const csvToJSON = BenevityCSVParser(fileAsText as string)
    setValue(csvToJSON)
    submitButtonRef.current?.click()
  }

  return (
    <>
      <div
        style={{
          width: '50vw',
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          draggable
          onClick={onClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          style={{
            width: '90%',
            height: '90%',
            border: 3,
            borderStyle: 'dashed',
            color: 'gray',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 20,
            cursor: 'pointer',
          }}>
          Провлачете файла в квадрата
        </div>
      </div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept=".csv"
        onChange={onChange}
      />
      <button type="submit" id="file" ref={submitButtonRef} style={{ display: 'none' }} />
    </>
  )
}
