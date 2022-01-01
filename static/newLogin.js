function init() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const errorElement = document.getElementById('errors');
        var status = 0;

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };

        fetch('http://127.0.0.1:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .catch(err => {
                res.status(500).json(err)
            })
            .then( (res) => { 
                status = res.status; 
                return res.json() 
              })
            .then( el => {
                if(el['errors'] || status != 200) {
                    errorElement.innerText = "Incorrect credentials";
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'home.html';
                }
            });
    });
}