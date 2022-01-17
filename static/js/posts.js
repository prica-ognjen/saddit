function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/posts`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        
        let headers = ['ID', 'Title', 'Image', 'Description']

        const table = document.getElementById('postTable')

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
            bodyRow.className = 'postTableBodyRow'

            let id = document.createElement('td')
            id.innerText = e.id

            let title = document.createElement('td')
            title.innerText = e.title

            let image = document.createElement('td')
            image.innerText = e.image

            let description = document.createElement('td')
            description.innerText = e.description

            bodyRow.append(id, title, image, description)
            table.append(bodyRow)
        })
        table.append(tbBody)
    })

    document.getElementById('btnAddPost').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            user_id: document.getElementById('userIdC').value,
            title: document.getElementById('titleC').value,
            image: document.getElementById('imageC').value,
            description: document.getElementById('descriptionC').value,
        }

        fetch('http://localhost:8002/admin/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }) 
    
    document.getElementById('btnEditPost').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('postIdU').value

        const data = {
            title: document.getElementById('titleU').value,
            description: document.getElementById('descriptionU').value
        }

        fetch(`http://localhost:8002/admin/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnDeletePost').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('postIdD').value

        fetch(`http://localhost:8002/admin/posts/${id}`, {
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