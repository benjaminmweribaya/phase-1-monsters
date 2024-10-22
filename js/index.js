document.addEventListener('DOMContentLoaded', () => {
    fetchMonsters(1);
});

function fetchMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            const monsterContainer = document.getElementById('monster-container');
            monsterContainer.innerHTML = '';
            monsters.forEach(monster => {
                monsterContainer.appendChild(createMonsterElement(monster));
            });
        });
}

function createMonsterElement(monster) {
    const monsterDiv = document.createElement('div');
    monsterDiv.innerHTML = `
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>${monster.description}</p>
    `;
    return monsterDiv;
}

document.getElementById('monster-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;

    createMonster({ name, age, description });
});

function createMonster(monster) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(monster)
    })
        .then(response => response.json())
        .then(newMonster => {
            const monsterContainer = document.getElementById('monster-container');
            monsterContainer.appendChild(createMonsterElement(newMonster));
        });
}

let currentPage = 1;

document.getElementById('load-more').addEventListener('click', () => {
  currentPage++;
  fetchMonsters(currentPage);
});
