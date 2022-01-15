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

    // fetch('http://127.0.0.1:8000/users', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .catch(err => {
    //             res.status(403)
    //         })
    //           .then(el => {
    //             if (el.status != 200) {
    //                 // errorElement.innerText = "Forbidden";
    //                 console.log("Forbidden")
    //             } else {
    //                 // var usersBtn = document.createElement("button");
    //                 // usersBtn.id = "users";
    //                 // usersBtn.className = "btn btn-primary";
    //                 // usersBtn.innerText = "Users";
    //                 // var container = document.getElementById("container");
    //                 // container.insertBefore(usersBtn, errorElement);
                    
    //                 document.getElementById('usersBtn').addEventListener('click', e => {
    //                     e.preventDefault();
                        
    //                     try {
    //                         window.location.href = 'users.html';
    //                     } catch(error) {
    //                         res.status(404).send('Not found');
    //                     }
    //                 });
    //             }
    //         });

    // document.getElementById('usersBtn').addEventListener('click', e => {
    //     e.preventDefault();

    //     try {
    //         window.location.href = 'newUsers.html';
    //     } catch(error) {
    //         res.status(404).send('Not found');
    //     }
    // });

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