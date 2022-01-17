function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/roleHasPermissions`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        
        let headers = ['ID','Role id','Permission id']

        const table = document.getElementById('roleHasPermissionTable')

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
            bodyRow.className = 'roleHasPermissionTableBodyRow'

            let id = document.createElement('td')
            id.innerText = e.id

            let roleId = document.createElement('td')
            roleId.innerText = e.role_id

            let permissionId = document.createElement('td')
            permissionId.innerText = e.permission_id

            bodyRow.append(id, roleId, permissionId)
            table.append(bodyRow)
        })
        table.append(tbBody)
    })

    document.getElementById('btnAddRoleHasPermission').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            role_id: document.getElementById('roleIdC').value,
            permission_id: document.getElementById('permissionIdC').value,
        }

        fetch('http://localhost:8002/admin/roleHasPermissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }) 
    
    document.getElementById('btnEditRoleHasPermission').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('roleIdU').value

        const data = {
            permission_id1: document.getElementById('permission1IdU').value,
            permission_id2: document.getElementById('permission2IdU').value,
        }

        fetch(`http://localhost:8002/admin/roleHasPermissions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnDeleteRoleHasPermission').addEventListener('click', e => {
        e.preventDefault()

        const role =  document.getElementById('roleIdD').value
        const permission =  document.getElementById('permissionIdD').value

        fetch(`http://localhost:8002/admin/roleHasPermissions/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({role_id: role, permission_id: permission})
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnGoBack').addEventListener('click', e => {
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = '/admin';
    })

    
}