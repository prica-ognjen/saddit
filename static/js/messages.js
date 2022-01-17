function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/messages`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {

        let headers = ['ID','From id','To id','Message', 'Date Messageed', 'isLiked', 'isRead']

        const table = document.getElementById('messageTable')

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
            bodyRow.className = 'messageTableBodyRow'

            let id = document.createElement('td')
            id.innerText = e.id

            let from = document.createElement('td')
            from.innerText = e.from

            let to = document.createElement('td')
            to.innerText = e.to

            let message = document.createElement('td')
            message.innerText = e.message

            let sent_time = document.createElement('td')
            sent_time.innerText = e.sent_time

            let isLiked = document.createElement('td')
            isLiked.innerText = e.isLiked

            let isRead = document.createElement('td')
            isRead.innerText = e.isRead

            bodyRow.append(id, from, to, message, sent_time, isLiked, isRead)
            table.append(bodyRow)
        })
        table.append(tbBody)
    })

    document.getElementById('btnAddMessage').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            to: document.getElementById('toC').value,
            from: document.getElementById('fromC').value,
            message: document.getElementById('messageC').value
        }

        fetch('http://localhost:8002/admin/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }) 
    
    document.getElementById('btnEditMessage').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('messageIdU').value

        const data = {
            message: document.getElementById('messageU').value,
        }

        fetch(`http://localhost:8002/admin/messages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
    })

    document.getElementById('btnDeleteMessage').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('messageIdD').value

        fetch(`http://localhost:8002/admin/messages/${id}`, {
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