function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/trains', {
        headers: {
            'Authorization': `Bearer ${token}`,
            mode: 'no-cors'
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('trnLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Number of seats: ${el.number_of_seats}</li>`;
            });
        });

    document.getElementById('btnNew').addEventListener('click', e => {
        e.preventDefault();

        var error = false;

        const data = {
            name: document.getElementById('name').value,
            number_of_seats: document.getElementById('seats').value
        };

        fetch('http://127.0.0.1:8000/admin/trains', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => {
                if (res.status != 200) {
                    error = true;
                }
                res.json() })
            .then( el => {
                if (!error) {
                    window.location.reload();
                } else {
                    console.log("Error creating train.");
                }
            })
            .catch( err => res.status(500).json(err) );
    });

    document.getElementById('btnUpdate').addEventListener('click', e => {
        e.preventDefault();

        let id = document.getElementById('idUpdate').value;
        var error = false;

        const data = {
            name: document.getElementById('nameUpdate').value,
            number_of_seats: document.getElementById('seatsUpdate').value
        };

        fetch('http://127.0.0.1:8000/admin/trains/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => {
                if (res.status != 200) {
                    error = true;
                }
                res.json() })
            .then( el => {
                if (!error) {
                    window.location.reload();
                } else {
                    console.log("Error updating train.");
                }
            })
            .catch( err => res.status(500).json(err) );
    });

    document.getElementById('btnDelete').addEventListener('click', e => {
        e.preventDefault();

        let id = document.getElementById('idDelete').value;

        fetch('http://127.0.0.1:8000/admin/trains/' + id, {
            method: 'DELETE'
        })
            .then( res => res.json() )
            .then( el => {
                window.location.reload();
            })
            .catch( err => res.status(500).json(err) );
    });
}
