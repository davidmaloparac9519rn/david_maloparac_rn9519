const res = require("express/lib/response");

function init() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        var type = "standard";
        const admin = document.getElementById('admin').checked;
        const moderator = document.getElementById('moderator').checked;

        const errors = document.getElementById('errors');

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
            .then(res => res.json())
            .then(el => {
                if (el['errors']) {
                    console.log(el);
                    if (el['errors'][0]['param'] == 'password') {
                        errors.innerText = "Pasword is too weak";
                    }
                    if (el['errors'][0]['message']) {
                        errors.innerText = el['errors'][0]['message'];
                    }
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'home.html';
                }
            });
    });
}