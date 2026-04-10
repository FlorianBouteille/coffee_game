console.log('loaded');

const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const airportTxt = document.getElementById('airportTxt');
const params = new URLSearchParams(window.location.search);

if (nameForm && nameInput) {
    nameForm.onsubmit = (event) => {
        event.preventDefault();

        const identity = nameInput.value.trim();
        localStorage.setItem('playerName', identity);
        window.location.href = "step1.html?name=" + encodeURIComponent(identity);
    };
}

if (airportTxt) {
    const nameFromQuery = params.get('name');
    const storedName = localStorage.getItem('playerName');
    const identity = nameFromQuery || storedName || '';

    if (!nameFromQuery && identity) {
        window.history.replaceState({}, '', "step1.html?name=" + encodeURIComponent(identity));
    }

    airportTxt.innerText = identity ? `Bonjour ${identity}` : 'Bonjour';
}