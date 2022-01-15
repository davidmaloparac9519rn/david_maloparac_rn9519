function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/stations', {
        headers: {
            'Authorization': `Bearer ${token}`,
            mode: 'no-cors'
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('stnLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
            });
        });

    document.getElementById('btnNew').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value
        };

        fetch('http://127.0.0.1:8000/admin/stations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                window.location.reload();
            })
            .catch( err => res.status(500).json(err) );
    });

    document.getElementById('btnUpdate').addEventListener('click', e => {
        e.preventDefault();

        let id = document.getElementById('idUpdate').value;

        const data = {
            name: document.getElementById('nameUpdate').value,
        };

        fetch('http://127.0.0.1:8000/admin/stations/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                window.location.reload();
            })
            .catch( err => res.status(500).json(err) );
    });

    document.getElementById('btnDelete').addEventListener('click', e => {
        e.preventDefault();

        let id = document.getElementById('idDelete').value;

        fetch('http://127.0.0.1:8000/admin/stations/' + id, {
            method: 'DELETE'
        })
            .then( res => res.json() )
            .then( el => {
                window.location.reload();
            })
            .catch( err => res.status(500).json(err) );
    });
}
