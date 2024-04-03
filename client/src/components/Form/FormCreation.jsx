import { useEffect, useState } from 'react';
import style from './FormCreation.module.css'
import { useEstructure, useValidate } from '../../hooks/FormHooks';
import { useDispatch } from 'react-redux'
import { postBreed } from '../../redux/action';
import { useNavigate } from 'react-router-dom';

export const FormCreation = ({ temperaments }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [ created, setCreated ] = useState(false);

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

  useEffect(() => {
    const errors = useValidate(formInputs)
    setFormErrors(errors)
  }, [ formInputs ]);

  const handleInput = (e) => {
    const { value, name, } = e.target;
    setFormInputs(prevState => ({ ...prevState, [ name ]: value }))

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      const newBreed = useEstructure(formInputs)

      setCreated(true)

      setTimeout(() => {
        dispatch(postBreed(newBreed))
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });

        setFormInputs({
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
        navigate("/home")
      }, 4000);
    }
  }

  return (
    <form className={ style.form_wrapper } onSubmit={ handleSubmit }>
      <div className={ style.form_inputs_container }>
        <div className={ style.form_inputs_bioInfo }>
          <div className={ style.form_input_group }>
            <input className={ style.form_input_input } name="name" type="text" value={ formInputs.name } onChange={ handleInput } />
            <span className={ style.form_input_highlight }></span>
            <span className={ style.form_input_bar }></span>
            <label>Breed name</label>
            { formErrors.name ? formErrors.name : null }
          </div>
          <label >Life expectancy</label>
          <div className={ style.form_input_group }>
            <input className={ style.form_input_input }
              name='min_years' type="number" value={ formInputs.min_years } onChange={ handleInput } />
            <span className={ style.form_input_highlight }></span>
            <span className={ style.form_input_bar }></span>
            <label>Min. age</label>
            { formErrors.min_years ? formErrors.min_years : null }
          </div>
          <div className={ style.form_input_group }>
            <input className={ style.form_input_input } name='max_years' type="number" value={ formInputs.max_years } onChange={ handleInput } />
            <span className={ style.form_input_highlight }></span>
            <span className={ style.form_input_bar }></span>
            <label>Max. age </label>
            { formErrors.max_years ? formErrors.max_years : null }
          </div>
          { formErrors.years ? formErrors.years : null }
        </div>
        <div className={ style.form_inputs_measurement }>
          <label>Select a measurement system</label>
          <select name="system_type" onChange={ handleInput } value={ formInputs.system_type }>
            <option value=""></option>
            <option value="imperial">imperial (in, lb)</option>
            <option value="metric">metric (cm, kg)</option>
          </select>
          { formInputs.system_type?.length
            ?
            <div className={ style.form_inputs_bioInfo }>
              <label >Weight</label>
              <div className={ style.form_input_group }>
                <input className={ style.form_input_input } type="number" name='min_weight' value={ formInputs.min_weight } onChange={ handleInput } />
                <span className={ style.form_input_highlight }></span>
                <span className={ style.form_input_bar }></span>
                <label>Min. weight ({ formInputs.system_type === "metric" ? "kg" : "lib" })</label>
                { formErrors.min_weight ? formErrors.min_weight : null }
              </div>
              <div className={ style.form_input_group }>
                <input className={ style.form_input_input } type="number" name='max_weight' value={ formInputs.max_weight } onChange={ handleInput } />
                <span className={ style.form_input_highlight }></span>
                <span className={ style.form_input_bar }></span>
                <label>Max. weight ({ formInputs.system_type === "metric" ? "kg" : "lib" })</label>
                { formErrors.max_weight ? formErrors.max_weight : null }
              </div>
              { formErrors.weight ? formErrors.weight : null }
              <label >Height</label>
              <div className={ style.form_input_group }>
                <input className={ style.form_input_input } type="number" name='min_height' value={ formInputs.min_height } onChange={ handleInput } />
                <span className={ style.form_input_highlight }></span>
                <span className={ style.form_input_bar }></span>
                <label>Min. height ({ formInputs.system_type === "metric" ? "cm" : "in" })</label>
                { formErrors.min_height ? formErrors.min_height : null }
              </div>
              <div className={ style.form_input_group }>
                <input className={ style.form_input_input } type="number" name='max_height' value={ formInputs.max_height } onChange={ handleInput } />
                <span className={ style.form_input_highlight }></span>
                <span className={ style.form_input_bar }></span>
                <label>Max. height ({ formInputs.system_type === "metric" ? "cm" : "in" })</label>
                { formErrors.max_height ? formErrors.max_height : null }
              </div>
              { formErrors.height ? formErrors.height : null }
            </div>
            :
            null
          }
          { formErrors.system_type ? formErrors.system_type : null }
        </div>
        <div className={ style.form_temperaments_container }>
          <label >Breed temperaments</label>
          <div className={ style.form_temperaments_wrapper }>
            <ul className={ style.form_temperaments_list_wrapper }>
              { temperaments.map(temp => (
                <li className={ style.form_temperaments_list_item }>
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
          { formErrors.temperaments ? formErrors.temperaments : null }
        </div>
      </div>
      <button type='submit'>submit</button>
      <div className={ created ? `${style.form_confirm_popup} ${style.confirm_active}` : style.form_confirm_popup }>
        <div className={ style.form_confirm_popup_wrapper }>
          <img src="https://th.bing.com/th/id/OIG3.qGB_V63E.SksgZqHeIaI?pid=ImgGn" alt="dog" />
          <h3>The breed was successfully created!</h3>
        </div>
      </div>
    </form >
  )
}
