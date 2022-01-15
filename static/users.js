const res = require("express/lib/response");

function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const errorElement = document.getElementById('errors');

    var status = 0;

    fetch('http://127.0.0.1:8000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`,
            mode: 'no-cors'
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}, Type: ${el.type}</li>`;
            });
        });

    document.getElementById('btnNew').addEventListener('click', e => {
        e.preventDefault();

        var type = "standard";
        const admin = document.getElementById('admin').checked;
        const moderator = document.getElementById('moderator').checked;

        if(admin) {
            type = "admin";
        } else if(moderator) {
            type = "moderator";
        }

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            type: type
        };

        fetch('http://127.0.0.1:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .catch(err => {
                res.status(500).json(err);
            })
            .then((res) => { 
                status = res.status; 
                return res.json() 
              })
            .then( el => {
                if (status != 200) {
                    if (el['errors'][0]['param'] == 'password') {
                        errors.innerText = "Pasword is too weak";
                    }
                    if (el['errors'][0]['message']) {
                        errors.innerText = el['errors'][0]['message'];
                    }
                } else {
                    window.location.reload();
                }
            })
    });

    document.getElementById('btnUpdate').addEventListener('click', e => {
        e.preventDefault();

        let id = document.getElementById('idUpdate').value;
        let type = 'standard';
        if (document.getElementById('adminUpdate').checked) {
            type = 'admin';
        }
        if (document.getElementById('moderatorUpdate').checked) {
            type = 'moderator';
        }
        var error = false;

        const data = {
            name: document.getElementById('nameUpdate').value,
            email: document.getElementById('emailUpdate').value,
            type: type
        };

        fetch('http://127.0.0.1:8000/admin/users/' + id, {
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
                    console.log("Error updating user.");
                }
            })
            .catch( err => res.status(500).json(err) );
    });

    document.getElementById('btnDelete').addEventListener('click', e => {
        e.preventDefault();

        let id = document.getElementById('idDelete').value;

        fetch('http://127.0.0.1:8000/admin/users/' + id, {
            method: 'DELETE'
        })
            .then( res => res.json() )
            .then( el => {
                window.location.reload();
            })
            .catch( err => res.status(500).json(err) );
    });
}
