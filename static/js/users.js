function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/users`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        
        let headers = ['ID', 'First Name', 'Last Name', 'Email', 'Password', 'Username', 'Birth Date', 'Country', 'Rank', 'Enabled']

        const table = document.getElementById('userTable')

        let tbHead = document.createElement('thead')
        tbHead.className = 'tbHead'

        let tbHeadRow = document.createElement('tr')
        tbHeadRow.className = 'tbHeadRow'

        headers.forEach(header => {
            let head = document.createElement('th')
            head.innerText = header
            tbHeadRow.append(head)
        })

        tbHead.append(tbHeadRow)
        table.append(tbHead)

        let tbBody = document.createElement('tbody')
        tbBody.className = 'table-body'

        res.forEach(e => {
            let bodyRow = document.createElement('tr')
            bodyRow.className = 'userTableBodyRow'

            let id = document.createElement('td')
            id.innerText = e.id

            let first_name = document.createElement('td')
            first_name.innerText = e.first_name

            let last_name = document.createElement('td')
            last_name.innerText = e.last_name

            let email = document.createElement('td')
            email.innerText = e.email

            let password = document.createElement('td')
            password.innerText = e.password

            let username = document.createElement('td')
            username.innerText = e.username

            let birth_date = document.createElement('td')
            birth_date.innerText = e.birth_date

            let country = document.createElement('td')
            country.innerText = e.country

            let rank = document.createElement('td')
            rank.innerText = e.rank

            let enabled = document.createElement('td')
            enabled.innerText = e.enabled

            bodyRow.append(id, first_name, last_name, email, password, username, birth_date, country, rank, enabled)
            table.append(bodyRow)
        })

        table.append(tbBody)
    })

    document.getElementById('btnAddUser').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            email: document.getElementById('emailC').value,
            password: document.getElementById('passwordC').value,
            first_name: document.getElementById('firstC').value,
            last_name: document.getElementById('lastC').value,
            birth_date: document.getElementById('dateC').value,
            country: document.getElementById('countryC').value,
        }

        fetch('http://localhost:8002/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw new Error(res)
            }
        })
        .then(data => {
            //stavi u tabeluuuuu
        })
        .catch(error => {
            alert(error)
        })
    }) 
    
    document.getElementById('btnEditUser').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('userIdU').value

        const data = {
            enabled: document.getElementById('enabledU').value,
            roles: document.getElementById('rolesU').value
        }

        fetch(`http://localhost:8002/admin/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnDeleteUser').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('userIdD').value

        fetch(`http://localhost:8002/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnGoBack').addEventListener('click', e => {
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = '/admin';
    })

    
}