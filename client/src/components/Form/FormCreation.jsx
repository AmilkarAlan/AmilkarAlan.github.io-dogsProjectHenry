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
  const handlesubmit =()=>{
    
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedTemperaments = checked
      ? [...formData.temperaments, name]
      : formData.temperaments.filter(temp => temp !== name);
    setFormData({ ...formData, temperaments: updatedTemperaments });
  };

  return (
    <form >
      <label >Name: </label>
      <input type="text" / >
      <label>Temperament:</label>
      { temperaments.map((temp,i) => (
        <label key={ i }>
          <input
            type="checkbox"
            name="temperaments"
            value={ temp.name }
            onChange={ handleCheckboxChange }
          />
          { temp.name }
        </label>
      )) }
    </form>
  )
}
