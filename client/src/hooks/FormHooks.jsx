const useValidate = (values) => {
  const errors = {};
  const letters = /^[A-Za-z]+$/;
  if (!values.name) {
    errors.name = <p>Your dog breed should have a name.</p>;
  } else if (!values.name.match(letters)) {
    errors.name = <p>The name should only contain letters.</p>;
  }
  if (!values.min_years || !values.max_years) {
    errors.years = <p>The life expectancy of the breed is necessary.</p>;
  } else if (values.min_years < 5 || values.min_years > 13 || values.max_years < 14 || values.max_years > 20) {
    errors.years = <p>I dont think a dog lives that.</p>;
  }

  if (!values.system_type.length) {
    errors.system_type = <p>You must select a measurement system.</p>
  } else if (values.system_type === "metric") { //kilo, cm
    if (!values.min_weight || !values.max_weight) {
      errors.weight = <p>It is necessary to include the weight of the breed.</p>;
    } else if (values.min_weight < 1 || values.min_weight > 34 || values.max_weight > 6 || values.max_weight < 85) {
      errors.weight = <p>I dont think a dog can weigh that.</p>;
    }
    if (!values.min_height || !values.max_height) {
      errors.height = <p>It is necessary to include the height of the breed.</p>;
    } else if (values.min_height < 5 || values.min_height > 40 || values.max_height > 10 || values.max_height < 88) {
      errors.height = <p>I dont think a dog can be that tall.</p>;
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



  // if (!values.rating_top) {
  //   errors.rating_top = 'La calificación es requerida';
  // }
  // if (!values.playtime) {
  //   errors.playtime = 'El tiempo de juego es requerido';
  // } else if (isNaN(Number(values.playtime))) {
  //   errors.playtime = 'El tiempo de juego debe ser un número';
  // } else if (Number(values.playtime) < 0) {
  //   errors.playtime = 'El tiempo de juego no puede ser negativo';
  // } else if (Number(values.playtime) > 800) {
  //   errors.playtime = 'El tiempo de juego no puede ser tan alto, prueba menos de 800';
  // }
  // if (!values.platforms || !values.platforms.length) {
  //   errors.platforms = 'Debes elegir almenos una plataforma';
  // }
  // if (!values.tags || !values.tags.length) {
  //   errors.tags = 'Debes elegir almenos una etiqueta';
  // }
  return errors;
};

export {
  useValidate
}

//   || values.min_height || values.max_height || values.min_years || values.max_years