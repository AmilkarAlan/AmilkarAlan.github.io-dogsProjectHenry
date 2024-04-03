const useValidate = (values) => {
  const errors = {};
  const letters = /^[A-Za-z\s]+$/;

  if (!values.name) {
    errors.name = <p>Your dog breed should have a name.</p>;
  } else if (!values.name.match(letters)) {
    errors.name = <p>The name should only contain letters.</p>;
  }

  if (!values.min_years || !values.max_years) {
    errors.years = <p>The life expectancy of the breed is necessary.</p>;
  } else if (values.min_years < 5 || values.min_years > 13 ) {
    errors.min_years = <p>The minimum range of life expectancy for a healthy dog is 5 to 13 years.</p>;
  } else if ( values.max_years < 12 || values.max_years > 25) {
    errors.max_years = <p>The minimum range of life expectancy for a healthy dog is 12 to 25 years.</p>;
  }

  if (!values.system_type.length) {
    errors.system_type = <p>You must select a measurement system.</p>
  } else if (values.system_type === "metric") { //kilo, cm
    if (!values.min_weight || !values.max_weight) {
      errors.weight = <p>It is necessary to include the weight of the breed.</p>;
    } else if (values.min_weight < 5 || values.min_weight > 34)  {
      errors.min_weight = <p>The minimum weight range in kilograms of a healthy dog is between 5 kg to 34 kg</p>;
    }else if (values.max_weight < 6 || values.max_weight > 85) {
      errors.max_weight = <p>The maximum weight range in kilograms of a healthy dog is between 6 kg to 85 kg</p>;
    }
    if (!values.min_height || !values.max_height) {
      errors.height = <p>It is necessary to include the height of the breed.</p>;
    } else if (values.min_height < 5 || values.min_height > 40 ) {
      errors.min_height = <p>The minimum height range in centimeters of a healthy dog is between 5 cm to 40 cm</p>;
    } else if (values.max_height < 10 || values.max_height > 88) {
      errors.max_height = <p>The maximum height range in centimeters of a healthy dog is between 10 cm to 88 cm</p>;

    }
  } else if (values.system_type === "imperial") { // Libra, pulgada
    if (!values.min_weight || !values.max_weight) {
      errors.weight = <p>It is necessary to include the weight of the breed.</p>;
    } else if (values.min_weight < 2 || values.min_weight > 75 || values.max_weight > 13 || values.max_weight < 187) {
      errors.weight = <p>I dont think a dog can weigh that.</p>;
    }
    if (!values.min_height || !values.max_height) {
      errors.height = <p>It is necessary to include the height of the breed.</p>;
    } else if (values.min_height < 2 || values.min_height > 16 || values.max_height > 4 || values.max_height < 35) {
      errors.height = <p>I dont think a dog can be that tall.</p>;
    }
  }

  if (!values.temperaments || values.temperaments.length < 1) {
    errors.temperaments = <p>You must select at least one temperament.</p>
  } else if (values.temperaments.length > 15) {
    errors.temperaments = <p>I dont think a dog can have so many temperaments.</p>
  }

  return errors;
};
const useEstructure = (form) => {
  let newBreed = {
    name: form.name.replace(/\b\w/g, (letra) => letra.toUpperCase()),
    weight: {
      imperial: "",
      metric: ""
    },
    height: {
      imperial: "",
      metric: ""
    },
    life_span: `${form.min_years} - ${form.max_years}`,
    temperaments: form.temperaments
  }
  if (form.system_type === "metric") {
    newBreed = {
      ...newBreed,
      weight: {
        imperial: `${form.min_weight * 2} - ${form.max_weight * 2}`,
        metric: `${form.min_weight} - ${form.max_weight}`
      },
      height: {
        imperial: `${Math.ceil(form.min_height * .39)} - ${Math.ceil(form.max_height * .39)}`,
        metric: `${form.min_height} - ${form.max_height}`
      }
    }
  } else if (form.system_type === "imperial") {
    newBreed = {
      ...newBreed,
      weight: {
        imperial: `${form.min_weight} - ${form.max_weight}`,
        metric: `${Math.ceil(form.min_weight * .45)} - ${Math.ceil(form.max_weight * .45)}`
      },
      height: {
        imperial: `${form.min_height } - ${form.max_height}`,
        metric: `${form.min_height * 2} - ${form.max_height * 2}`
      }
    }
  }
  return newBreed
}
export {
  useValidate,
  useEstructure
}
