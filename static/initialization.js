const res = require("express/lib/response");

function init() {
    // const errorElement = document.getElementById("errors"); 

    document.getElementById('usersBtn').addEventListener('click', e => {
        e.preventDefault();
        
        fetch('http://127.0.0.1:8000/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .catch(err => {
                res.status(403)
            })
              .then(el => {
                if (el.status != 200) {
                    console.log("Forbidden")
                } else {
                    window.location.href = 'newUsers.html';
                }
              });
    });

    document.getElementById('stations').addEventListener('click', e => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/stations', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .catch(err => {
                res.status(403)
            })
              .then(el => {
                if (el.status != 200) {
                    console.log("Forbidden")
                } else {
                    window.location.href = 'stations.html';
                }
              });
    });

    document.getElementById('trains').addEventListener('click', e => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/trains', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .catch(err => {
                res.status(403)
            })
              .then(el => {
                if (el.status != 200) {
                    console.log("Forbidden")
                } else {
                    window.location.href = 'trains.html';
                }
              });
    });

    document.getElementById('rides').addEventListener('click', e => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/rides', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .catch(err => {
                res.status(403)
            })
              .then(el => {
                if (el.status != 200) {
                    console.log("Forbidden")
                } else {
                    window.location.href = 'newRides.html';
                }
              });
    });
}