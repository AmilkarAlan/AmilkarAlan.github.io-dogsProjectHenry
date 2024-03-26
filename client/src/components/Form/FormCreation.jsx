import { useState } from 'react';
import style from './FormCreation.module.css'
import { useValidate } from '../../hooks/FormHooks';

export const FormCreation = ({ temperaments }) => {
  const [ formInputs, setFormInputs ] = useState({
    name: '',
    system_type: '',
    min_weight: '',
    max_weight: '',
    min_height: '',
    max_height: '',
    min_years: '',
    max_years: '',
    temperaments: [],
  });
  const [ formErrors, setFormErrors ] = useState({});
  const [ tempOpen, setTempOpen ] = useState(false);

  const handleOpenOptions = (e) => {
    setTempOpen(!tempOpen);
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedTemperaments = checked
      ? [ ...formInputs.temperaments, { name: value } ]
      : formInputs.temperaments.filter(temp => temp.name !== value);
    setFormInputs(prevState => ({ ...prevState, temperaments: updatedTemperaments }));
  };

  const handleInput = (e) => {
    const { value, name, } = e.target;
    setFormInputs(prevState => ({ ...prevState, [ name ]: value }))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // checkboxes.forEach(checkbox => {
    //   checkbox.checked = false;
    // });
    const errors = useValidate(formInputs)
    setFormErrors(errors)
    // setFormInputs({
    //   name: '',
    //   min_weight: '',
    //   max_weight: '',
    //   min_height: '',
    //   max_height: '',
    //   min_years: '',
    //   max_years: '',
    //   temperaments: [],
    // })
  }
  return (
    <form className={ style.form_wrapper } onSubmit={ handleSubmit }>
      <label htmlFor='name'>Breed Name: </label>
      <input name="name" type="text" value={ formInputs.name } onChange={ handleInput } />
      { formErrors.name ? formErrors.name : null }
      <label htmlFor="years">What is the life expectancy of this breed?</label>
      <input name='min_years' type="number" value={ formInputs.min_years } onChange={ handleInput } /> <span>to</span>
      <input name='max_years' type="number" value={ formInputs.max_years } onChange={ handleInput } />
      { formErrors.years ? formErrors.years : null }
      <label htmlFor="system_type">
        Which measurement system do you want to use?
      </label>
      <select name="system_type" onChange={ handleInput }>
        <option value=""></option>
        <option value="imperial">imperial (in, lb)</option>
        <option value="metric">metric (cm, kg)</option>
      </select>
      { formInputs.system_type.length ?
        (
          <>
            <label htmlFor="weight">
              What weights does the breed fall into?
            </label>
            <input type="number" name='min_weight' value={ formInputs.min_weight } onChange={ handleInput } /> <span>to</span>
            <input type="number" name='max_weight' value={ formInputs.max_weight } onChange={ handleInput } />
            { formErrors.weight ? formErrors.weight : null }
            <label htmlFor="height">
              What is the height range of the breed?
            </label>
            <input type="number" name='min_height' value={ formInputs.min_height } onChange={ handleInput } /> <span>to</span>
            <input type="number" name='max_height' value={ formInputs.max_height } onChange={ handleInput } />
            { formErrors.height ? formErrors.height : null }
          </>
        )
        : null }


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
                    name='temperaments'
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
      <button type='submit'>submit</button>
    </form>
  )
}
