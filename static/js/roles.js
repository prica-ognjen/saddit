function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/roles`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        
        let headers = ['ID','Name','Description']

        const table = document.getElementById('roleTable')

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
            bodyRow.className = 'roleTableBodyRow'

            let id = document.createElement('td')
            id.innerText = e.id

            let name = document.createElement('td')
            name.innerText = e.name

            let description = document.createElement('td')
            description.innerText = e.description

            bodyRow.append(id, name, description)
            table.append(bodyRow)
        })
        table.append(tbBody)
    })

    document.getElementById('btnAddRole').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            name: document.getElementById('nameC').value,
            description: document.getElementById('descriptionC').value,
        }

        fetch('http://localhost:8002/admin/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }) 
    
    document.getElementById('btnEditRole').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('roleIdU').value

        const data = {
            name: document.getElementById('nameU').value,
            description: document.getElementById('descriptionU').value,
        }

        fetch(`http://localhost:8002/admin/roles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnDeleteRole').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('roleIdD').value

        fetch(`http://localhost:8002/admin/roles/${id}`, {
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