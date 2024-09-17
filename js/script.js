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
        personCard.querySelector('.cprValue').innerText = data.CPR;
        personCard.querySelector('.cpr').classList.remove('hidden');
    }
    if (data.firstName !== undefined) {
        personCard.querySelector('.firstNameValue').innerText = data.firstName;
        personCard.querySelector('.lastNameValue').innerText = data.lastName;
        personCard.querySelector('.firstName').classList.remove('hidden');
        personCard.querySelector('.lastName').classList.remove('hidden');
    }    
    if (data.gender !== undefined) {
        personCard.querySelector('.genderValue').innerText = data.gender;
        personCard.querySelector('.gender').classList.remove('hidden');
    }        
    if (data.birthDate !== undefined) {
        personCard.querySelector('.dobValue').innerText = data.birthDate;
        personCard.querySelector('.dob').classList.remove('hidden');
    }
    if (data.address !== undefined) {
        personCard.querySelector('.streetValue').innerText = `${data.address.street} ${data.address.number}, ${data.address.floor}.${data.address.door}`;
        personCard.querySelector('.townValue').innerText = `${data.address.postal_code} ${data.address.town_name}`;
        personCard.querySelector('.address').classList.remove('hidden');
    }
    if (data.phoneNumber !== undefined) {
        personCard.querySelector('.phoneNumberValue').innerText = data.phoneNumber;
        personCard.querySelector('.phoneNumber').classList.remove('hidden');
    }

    output.appendChild(personCard);
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