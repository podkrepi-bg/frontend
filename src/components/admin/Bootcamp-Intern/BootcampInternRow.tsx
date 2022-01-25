export default function BootcampInternRow(props: any) {
  console.log(props)
  return (
    <tr key={props.intern.id}>
      <td style={{ border: 'solid 2px blue', margin: '12px' }}>{props.intern.firstName}</td>
      <td style={{ border: 'solid 2px red', margin: '12px' }}>{props.intern.lastName}</td>
      <td style={{ border: 'solid 2px green', margin: '12px' }}>{props.intern.email}</td>
    </tr>
  )
}
