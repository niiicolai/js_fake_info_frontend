const baseUrl = 'http://localhost/php_fake_info';

document.querySelector('#frmGenerate').addEventListener('submit', (e) => {
    e.preventDefault();

    // The endpoint is inferred from the selected option
    let endpoint = '/';
    if (e.target.chkPerson.checked) {
        endpoint += 'person'
        const numPersons = parseInt(e.target.txtNumberPersons.value);
        if (numPersons > 1) {
            endpoint += '?n=' + numPersons;
        }
    } else {
        endpoint += e.target.cmbPartialOptions.value;
    }

    // API call
    fetch(baseUrl + endpoint)
    .then(response => {
        if (!response.ok) {
            handleError();
        } else {
            return response.json();
        }
    })
    .then(handlePersonData)
    .catch((error) => {
        console.log('Catch');
        handleError();
    });
});

const handlePersonData = (data) => {
    const output = document.querySelector('#output');
    output.innerHTML = '';

    const personCard = document.importNode(document.getElementById('personTemplate').content, true);
    if (data.CPR !== undefined) {
        const cprValue = personCard.querySelector('.cprValue');
        cprValue.innerText = data.CPR;
        cprValue.classList.remove('hidden');
        personCard.querySelector('.cpr').classList.remove('hidden');
    }
    if (data.firstName !== undefined) {
        const firstNameValue = personCard.querySelector('.firstNameValue');
        firstNameValue.innerText = data.firstName;
        firstNameValue.classList.remove('hidden');
        const lastNameValue = personCard.querySelector('.lastNameValue');
        lastNameValue.innerText = data.lastName;
        lastNameValue.classList.remove('hidden');
        personCard.querySelector('.firstName').classList.remove('hidden');
        personCard.querySelector('.lastName').classList.remove('hidden');
    }    
    if (data.gender !== undefined) {
        const genderValue = personCard.querySelector('.genderValue');
        genderValue.innerText = data.gender;
        genderValue.classList.remove('hidden');
        personCard.querySelector('.gender').classList.remove('hidden');
    }        
    if (data.birthDate !== undefined) {
        const dobValue = personCard.querySelector('.dobValue');
        dobValue.innerText = data.birthDate;
        dobValue.classList.remove('hidden');
        personCard.querySelector('.dob').classList.remove('hidden');
    }
    if (data.address !== undefined) {
        const streetValue = personCard.querySelector('.streetValue');
        streetValue.innerText = `${data.address.street} ${data.address.number}, ${data.address.floor}.${data.address.door}`;
        streetValue.classList.remove('hidden');
        const townValue = personCard.querySelector('.townValue');
        townValue.innerText = `${data.address.postal_code} ${data.address.town_name}`;
        townValue.classList.remove('hidden');
        personCard.querySelector('.address').classList.remove('hidden');
    }
    if (data.phoneNumber !== undefined) {
        const phoneNumberValue = personCard.querySelector('.phoneNumberValue');
        phoneNumberValue.innerText = data.phoneNumber;
        phoneNumberValue.classList.remove('hidden');
        personCard.querySelector('.phoneNumber').classList.remove('hidden');
    }

    output.appendChild(personCard);
    output.classList.remove('hidden');
};

const handleError = () => {
    const output = document.querySelector('#output');
    
    output.innerHTML = 
    '<p>There was a problem communicating with the API</p>';
    output.classList.add('error');

    setTimeout(() => {
        output.innerHTML = '';
        output.classList.remove('error');
    }, 2000);
};