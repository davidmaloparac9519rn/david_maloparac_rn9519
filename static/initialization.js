const res = require("express/lib/response");

function init() {
    // IDEJA ZA MODERATORA: Users dugme nece biti tu na pocetku, a onda 
    // ovde proverim token (checkRole metoda u app.js), i injectjem u
    // body dugme samo ako je user admin

    const errorElement = document.getElementById("errors"); 

    fetch('http://127.0.0.1:9000/checkRole', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: document.cookie.split('=')[1]})
        })
            .catch(err => {
                res.status(403)
            })
              .then(el => {
                if (el.status != 200) {
                    // errorElement.innerText = "Forbidden";
                    console.log("Users button not shown, because the user is not admin.")
                } else {
                    var usersBtn = document.createElement("button");
                    usersBtn.id = "users";
                    usersBtn.className = "btn btn-primary";
                    usersBtn.innerText = "Users";
                    var container = document.getElementById("container");
                    container.insertBefore(usersBtn, errorElement);
                    
                    usersBtn.addEventListener('click', e => {
                        e.preventDefault();
                        
                        try {
                            window.location.href = 'users.html';
                        } catch(error) {
                            res.status(404).send('Not found');
                        }
                    });
                }
            });

    document.getElementById('stations').addEventListener('click', e => {
        e.preventDefault();

        try {
            window.location.href = 'stations.html';
        } catch(error) {
            res.status(404).send('Not found');
        }
    });

    document.getElementById('trains').addEventListener('click', e => {
        e.preventDefault();

        try {
            window.location.href = 'trains.html';
        } catch(error) {
            res.status(404).send('Not found');
        }
    });

    document.getElementById('rides').addEventListener('click', e => {
        e.preventDefault();

        try {
            window.location.href = 'rides.html';
        } catch(error) {
            res.status(404).send('Not found');
        }
    });
}