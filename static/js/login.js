function init(){

    document.getElementById('btnLogin').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            email: document.getElementById('log_email').value,
            password: document.getElementById('log_pass').value
        }

        fetch('http://localhost:8001/login', {
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
                window.location.href = '/admin'
            }
        })

    })

    document.getElementById('btnRegister').addEventListener('click', e => {
        e.preventDefault()

        window.location.href = '/register'
    })

}