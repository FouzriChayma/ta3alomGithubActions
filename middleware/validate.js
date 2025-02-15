const yup = require("yup");
const validate = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            titre: yup.string().required('titre is required').min(3, "Le titre doit contenir au moins 3 caractères"),
            auteur: yup.string().required('auteur  is required').min(3, "L'auteur doit contenir au moins 3 caractères"),
            date_publication : yup.date().required("La date de publication est requise").min(new Date(), "La date de publication ne peut pas être dans le passé"),
           
        });
    
  
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });

  }
};


module.exports = validate;