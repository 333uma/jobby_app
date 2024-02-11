import './index.css'

const SalaryRanges = props => {
  const {eachSalary, onChangeSalaryRange} = props
  const {salaryRangeId, label} = eachSalary

  const onClickChangeSalary = () => {
    onChangeSalaryRange(salaryRangeId)
  }

  return (
    <li>
      <input
        type="radio"
        id="filterSalary"
        onClick={onClickChangeSalary}
        value={label}
      />
      <label htmlFor="filterSalary">{label}</label>
    </li>
  )
}

export default SalaryRanges
