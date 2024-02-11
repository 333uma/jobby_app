import './index.css'

const EmploymentJobsType = props => {
  const {eachType, onChangeEmploymentTypeId} = props
  const {label, employmentTypeId} = eachType

  const onClickChangeEmploymentType = event => {
    if (event.target.checked) {
      onChangeEmploymentTypeId(employmentTypeId)
    }
  }

  return (
    <li>
      <input
        type="checkbox"
        id="filterItem"
        onClick={onClickChangeEmploymentType}
        value={label}
      />
      <label htmlFor="filterItem">{label}</label>
    </li>
  )
}

export default EmploymentJobsType
