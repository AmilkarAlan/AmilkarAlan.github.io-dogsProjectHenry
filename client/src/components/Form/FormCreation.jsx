import { useState } from 'react';
import style from './FormCreation.module.css'

export const FormCreation = ({ temperaments }) => {
  const [ formData, setFormData ] = useState({
    name: '',
    weigh: '',
    height: '',
    lifeSpan: '',
    temperaments: [],
  });
  const [ tempOpen, setTempOpen ] = useState(false);
  const handleOpenOptions = (e) => {
    setTempOpen(!tempOpen);
  }
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedTemperaments = checked
      ? [ ...formData.temperaments, name ]
      : formData.temperaments.filter(temp => temp !== name);
    setFormData({ ...formData, temperaments: updatedTemperaments });
  };


  return (
    <form className={style.form_wrapper}>
      <label >Name: </label>
      <input type="text" />
      <div className={ style.form_temperament_wrapper }>
        <label onClick={ handleOpenOptions }>
          Select some temperaments for your dog
        </label>
        <div className={tempOpen ? `${style.form_temperament_popup} ${style.open}` : style.form_temperament_popup}>
        <ul className={ style.form_temperament_list_wrapper }>
          { temperaments.map(temp => (
            <li key={ temp.id } className={ style.form_temperament_list }>
              <label>
                <input
                  type="checkbox"
                  name="temperaments"
                  value={ temp.name }
                  onChange={ handleCheckboxChange }
                />
                { temp.name }
              </label>
            </li>
          )) }
        </ul>
        </div>
      </div>
    </form>
  )
}
