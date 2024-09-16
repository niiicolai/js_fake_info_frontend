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
    .then(response => response.json())
    .then(handlePersonData)

});

const handlePersonData = (data) => {
    console.log(data);
};