async function getCapital(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v2/name/${countryName}`);
        const data = await response.json();
        return data[0].capital;
    } catch (error) {
        console.error(error);
    }
}

getCapital("United States").then(capital => {
    console.log(`The capital of the United States is ${capital}.`);
});