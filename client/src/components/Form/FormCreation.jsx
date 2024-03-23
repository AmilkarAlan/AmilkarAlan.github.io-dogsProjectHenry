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
    <form className={ style.form_wrapper }>
      <label htmlFor='name'>Breed Name: </label>
      <input name="name" type="text" />
      <label htmlFor="years">What is the life expectancy of this breed?</label>
      <input name='years' type="number" /> <span>to</span>
      <input name='years' type="number" />
      <label htmlFor="type_weitght">
        What kind of measurement do you want to use for weight?
      </label>
      <select name="type_weight" id="weight_type">
        <option value=""></option>
        <option value="imperial">Lbs</option>
        <option value="metric">Kg</option>
      </select>
      <label htmlFor="weight">
        What weights does the breed fall into?
      </label>
      <input type="number" /> <span>to</span>
      <input type="number" />
      <label htmlFor="type_heitght">
        What kind of measurement do you want to use for height?
      </label>
      <select name="type_height" id="height_type">
        <option value=""></option>
        <option value="imperial">Imperial</option>
        <option value="metric">Metric</option>
      </select>
      <label htmlFor="height">
        What is the height range of the breed?
      </label>
      <input type="number" /> <span>to</span>
      <input type="number" />
      <div className={ style.form_temperament_wrapper }>
        <label onClick={ handleOpenOptions }>
          Select a tag that describes the temperament of the breed
        </label>
        <div className={ tempOpen ? `${style.form_temperament_popup} ${style.open}` : style.form_temperament_popup }>
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
