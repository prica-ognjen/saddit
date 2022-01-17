function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/permissions`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        
        let headers = ['ID','Name','Description']

        const table = document.getElementById('permissionTable')

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
            bodyRow.className = 'permissionTableBodyRow'

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

    document.getElementById('btnAddPermission').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            name: document.getElementById('nameC').value,
            description: document.getElementById('descriptionC').value,
        }

        fetch('http://localhost:8002/admin/permissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }) 
    
    document.getElementById('btnEditPermission').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('permissionIdU').value

        const data = {
            name: document.getElementById('nameU').value,
            description: document.getElementById('descriptionU').value
        }

        fetch(`http://localhost:8002/admin/permissions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnDeletePermission').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('permissionIdD').value

        fetch(`http://localhost:8002/admin/permissions/${id}`, {
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