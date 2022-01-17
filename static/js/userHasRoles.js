function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/userHasRoles`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        
        let headers = ['ID','User id','Role id']

        const table = document.getElementById('userHasRoleTable')

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
            bodyRow.className = 'userHasRoleTableBodyRow'

            let id = document.createElement('td')
            id.innerText = e.id

            let userId = document.createElement('td')
            userId.innerText = e.user_id

            let roleId = document.createElement('td')
            roleId.innerText = e.role_id

            bodyRow.append(id, userId, roleId)
            table.append(bodyRow)
        })
        table.append(tbBody)
    })

    document.getElementById('btnAddUserHasRole').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            user_id: document.getElementById('userIdC').value,
            role_id: document.getElementById('roleIdC').value,
        }

        fetch('http://localhost:8002/admin/userHasRoles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }) 
    
    document.getElementById('btnEditUserHasRole').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('userIdU').value

        const data = {
            role_id2: document.getElementById('roleId2U').value,
        }

        fetch(`http://localhost:8002/admin/userHasRoles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnDeleteUserHasRole').addEventListener('click', e => {
        e.preventDefault()

        const userId =  document.getElementById('userIdD').value
        const roleId =  document.getElementById('roleIdD').value

        fetch(`http://localhost:8002/admin/userHasRoles/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({user_id: userId, role_id: roleId})
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnGoBack').addEventListener('click', e => {
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = '/admin';
    })

    
}