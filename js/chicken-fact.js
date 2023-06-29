// Random chicken fact

const chickenFactUrl = 'https://chickenfacts.io/api/v1/facts/13.json';

async function getChickenFact() {
    const response = await fetch(chickenFactUrl);

    const chickenFact = await response.json();

    return chickenFact;
}
