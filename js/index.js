let dataLength;

function fetchMonsters() {

    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then((data) => {
        // console.log(data);
        fetch50(data);
        dataLength = data.length;

    });

}

fetchMonsters();

let monsterContainer = document.getElementById('monster-container');
let monsterForm = document.getElementById('create-monster');
let backButton = document.getElementById('back');
let forwardButton = document.getElementById('forward');
let j=0;

function fetch50(data) {

    monsterContainer.innerHTML = '';

    for (let i=j; i<j+50; i++) {
        let monsterName = document.createElement('h2');
        monsterName.innerText = data[i].name;
        let monsterAge = document.createElement('h4');
        monsterAge.innerText = 'Age: ' + data[i].age;
        let monsterDescription = document.createElement('p');
        monsterDescription.innerText = 'Bio: ' + data[i].description;

        let monsterDiv = document.createElement('div');
        monsterDiv.append(monsterName, monsterAge, monsterDescription);
        monsterContainer.append(monsterDiv);
    }
}


forwardButton.addEventListener('click', ()=> {
    if (j<dataLength) {
        j+=50;
        console.log(j);
        console.log(dataLength);
        fetchMonsters();
    }
});


backButton.addEventListener('click', ()=> {
    if (j>0) {
        j-=50;
        fetchMonsters();
    }
});



function createForm() {
    let form = document.createElement('form');
    form.id = 'monster-form';
    let newName = document.createElement('input');
    newName.id = 'name';
    newName.placeholder = 'name...';
    let newAge = document.createElement('input');
    newAge.id = 'age';
    newAge.placeholder = 'age...';
    let newDescription = document.createElement('input');
    newDescription.id = 'description';
    newDescription.placeholder = 'description...';
    let button = document.createElement('button');
    button.innerText = 'Create';
    
    form.append(newName, newAge, newDescription, button);
    monsterForm.append(form);

    //submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        newMonsterObj = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        
        console.log(newMonsterObj);

        const patchMonster = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(newMonsterObj),
        };
          
        fetch("http://localhost:3000/monsters", patchMonster);
    })
}

createForm();

