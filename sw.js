const request = async (url, params = {}, method = 'GET') => {
    let options = {
        method
    };
    if ('GET' === method) {
        url += '?' + (new URLSearchParams(params)).toString();
    } else {
        options.body = JSON.stringify(params);
    }

    const response = await fetch(url, options);
    return await response.json();
};
const get = (url, params) => request(url, params, 'GET');

document.getElementById('swbutton').addEventListener('click', function () {

    let name = document.querySelector('input[name="name"]').value;

    get('https://www.swapi.tech/api/people/', { name: name })
        .then(response => {

            // Se om anropet ger träff på (ett) namn
            if (response.result && response.result.length > 0) {

                const result = response.result[0];
                const { height, mass, hair_color, skin_color, eye_color, birth_year, gender, name: characterName } = result.properties;

                const characterInfo = `
                        Name: ${characterName}
                        Height: ${height}cm
                        Mass: ${mass}kg
                        Hair color: ${hair_color}
                        Skin color: ${skin_color}
                        Eye color: ${eye_color}
                        Birth year: ${birth_year}
                        Gender: ${gender}
                    `;

                console.log(characterInfo);

                document.getElementById('apiresult').value = characterInfo;
            } else {
                // Slippa fel som nedan om man inte får en träff på namn.
                //TypeError: Cannot read properties of undefined (reading 'properties')
                console.log('No results found for the provided name.');
                document.getElementById('apiresult').value = 'No results found for the provided name.';
            }
        })
        .catch(err => {
            console.error(err);
        });
});
