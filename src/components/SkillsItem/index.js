import './index.css'

const SkillsItem = props => {
  const {each} = props
  const {name, imageUrl} = each

  return (
    <li className="individual_skill">
      <img src={imageUrl} alt={`${name}`} className="skill_image" />
      <p>{name}</p>
    </li>
  )
}

export default SkillsItem
