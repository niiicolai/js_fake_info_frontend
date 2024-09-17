const baseUrl = 'http://localhost/hp_fake_info';

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
        console.log('Hey');
        if (!response.ok) {
            handleError();
        } else {
            return response.json();
        }
    })
    .then(handlePersonData)
    .catch(handleError);
});

const handlePersonData = (data) => {
    console.log(data);

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