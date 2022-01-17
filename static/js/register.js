function init(){

    document.getElementById('btnRegister').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            first_name: document.getElementById('reg_fname').value,
            last_name: document.getElementById('reg_lname').value,
            email: document.getElementById('reg_email').value,
            password: document.getElementById('reg_pass').value,
            birth_date: document.getElementById('reg_date').value,
            country: document.getElementById('reg_country').value
        }

        fetch('http://localhost:8001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.msg){
                alert(res.msg)
            }else{
                document.cookie = `token=${res.jwt};SameSite=Lax`
                window.location.href = '/'
            }
        })

    })

    document.getElementById('btnLogin').addEventListener('click', e => {
        e.preventDefault()

        window.location.href = '/login'
    })

}