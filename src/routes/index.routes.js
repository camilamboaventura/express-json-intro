const router = require("express").Router();
const countries = require("../countries");

// Nossas listeners de rota ficarão aqui

// req = request, response = res
router.get("/hello", (req, res) => {
  console.log("GET request at /hello route");
  return res.json("Hello world!");
});

// Rota para trazer todos os países
router.get("/countries", (req, res) => {
  console.log("GET request at /countries route");
  return res.json(countries);
});

// Rota para trazer um país específico
router.get("/country/:cca3", (req, res) => {
  console.log("GET request at /country/:cca3 route");
  console.log(req.params);

  const foundCountry = countries.find((country) => {
    return country.cca3 === req.params.cca3;
  });

  if (foundCountry) {
    return res.json(foundCountry);
  } else {
    return res.status(404).json({ msg: "Country not found" });
  }
});

// Rota para pesquisar um país por nome
router.get("/country", (req, res) => {
  console.log("GET request at /country route");
  console.log(req.query);

  const foundCountries = countries.filter((country) => {
    // Verifica o nome em ingles oficial e comum

    if (
      country.name.common
        .toLowerCase()
        .includes(req.query.search.toLowerCase()) ||
      country.name.official
        .toLowerCase()
        .includes(req.query.search.toLowerCase())
    ) {
      return true;
    }

    // Verifica o nome nativo do pais comum
    for (let key in country.name.native) {
      if (
        country.name.native[key].common
          .toLowerCase()
          .includes(req.query.search.toLowerCase())
      ) {
        return true;
      }
    }

    // Verifica as traduções
    for (let key in country.translations) {
      if (
        country.translations[key].common
          .toLowerCase()
          .includes(req.query.search.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  });

  if (foundCountries.length) {
    return res.json(foundCountries);
  } else {
    return res.status(404).json({ msg: "Your search returned no matches." });
  }
});

// "export default router" equivale à:
module.exports = router;
