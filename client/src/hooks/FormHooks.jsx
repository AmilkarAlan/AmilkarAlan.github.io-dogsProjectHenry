const useValidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = <p>Your dog breed should have a name.</p>;
  }
  if (!values.min_years || !values.max_years) {
    errors.years = <p>The life expectancy of the breed is necessary.</p>;
  } else if (values.min_years < 10 || values.min_years > 12 || values.max_years < 14 || values.max_years > 20) {
    errors.years = <p>I dont think a dog lives that.</p>;
  }

  if (!values.system_type.length) {
    errors.system_type = <p>You must select a measurement system.</p>
  } else if (values.system_type === "metric") {
    if (!values.min_weight || !values.max_weight) {
      errors.weight = <p>It is necessary to include the weight of the breed.</p>;
    } else if (values.min_weight < 10 || values.min_weight > 25 || values.max_weight > 190 || values.max_weight < 75) {
      errors.weight = <p>I dont think a dog can weigh that.</p>;
    }
    if (!values.min_height || !values.max_height) {
      errors.height = <p>It is necessary to include the height of the breed.</p>;
    } else if (values.min_height < 10 || values.min_height > 25 || values.max_height > 190 || values.max_height < 75) {
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