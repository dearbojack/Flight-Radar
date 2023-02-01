fetch('https://restcountries.com/v2/all')
  .then(response => response.json())
  .then(countries => {
    const countrySelect = document.getElementById('country-select');

    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name;
      option.text = country.name;
      option.style.backgroundImage = `url(${country.flag})`;
      countrySelect.add(option);
    });
  });
