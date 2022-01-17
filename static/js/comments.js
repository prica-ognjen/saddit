function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch(`http://localhost:8002/admin/comments`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        
        let headers = ['ID','UserId','PostId','Content', 'Date Commented', 'Likes', 'Dislikes']

        const table = document.getElementById('commentTable')

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
            bodyRow.className = 'commentTableBodyRow'

            let id = document.createElement('td')
            id.innerText = e.id

            let postId = document.createElement('td')
            postId.innerText = e.post_id

            let userId = document.createElement('td')
            userId.innerText = e.user_id

            let content = document.createElement('td')
            content.innerText = e.content

            let date_commented = document.createElement('td')
            date_commented.innerText = e.date_commented

            let likes = document.createElement('td')
            likes.innerText = e.likes

            let dislikes = document.createElement('td')
            dislikes.innerText = e.dislikes

            bodyRow.append(id, userId, postId, content, date_commented, likes, dislikes)
            table.append(bodyRow)
        })
        table.append(tbBody)
    })

    document.getElementById('btnAddComment').addEventListener('click', e => {
        e.preventDefault()

        const data = {
            user_id: document.getElementById('userIdC').value,
            post_id: document.getElementById('postIdC').value,
            content: document.getElementById('contentC').value
        }

        fetch('http://localhost:8002/admin/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {

            if(res.success){

                const obj = res.success
                const table = document.getElementById('commentTable')

                let bodyRow = document.createElement('tr')
                bodyRow.className = 'commentTableBodyRow'
    
                let id = document.createElement('td')
                id.innerText = obj.id
    
                let postId = document.createElement('td')
                postId.innerText = obj.post_id
    
                let userId = document.createElement('td')
                userId.innerText = obj.user_id
    
                let content = document.createElement('td')
                content.innerText = obj.content
    
                let date_commented = document.createElement('td')
                date_commented.innerText = obj.date_commented
    
                let likes = document.createElement('td')
                likes.innerText = obj.likes
    
                let dislikes = document.createElement('td')
                dislikes.innerText = obj.dislikes
    
                bodyRow.append(id, userId, postId, content, date_commented, likes, dislikes)
                table.append(bodyRow)
                
            }

        })
    }) 
    
    document.getElementById('btnEditComment').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('commentIdU').value

        const data = {
            content: document.getElementById('contentU').value,
        }

        fetch(`http://localhost:8002/admin/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {res.json()})
        .then(res => {

            if(res){

                const obj = res
                const table = document.getElementById('commentTable')

                document.getElementsByTagName('')

                let bodyRow = document.createElement('tr')
                bodyRow.className = 'commentTableBodyRow'
    
                let id = document.createElement('td')
                id.innerText = obj.id
    
                let postId = document.createElement('td')
                postId.innerText = obj.post_id
    
                let userId = document.createElement('td')
                userId.innerText = obj.user_id
    
                let content = document.createElement('td')
                content.innerText = obj.content
    
                let date_commented = document.createElement('td')
                date_commented.innerText = obj.date_commented
    
                let likes = document.createElement('td')
                likes.innerText = obj.likes
    
                let dislikes = document.createElement('td')
                dislikes.innerText = obj.dislikes
    
                bodyRow.append(id, userId, postId, content, date_commented, likes, dislikes)
                table.append(bodyRow)
                
            }

        })
    })

    document.getElementById('btnDeleteComment').addEventListener('click', e => {
        e.preventDefault()

        const id =  document.getElementById('commentIdD').value

        fetch(`http://localhost:8002/admin/comments/${id}`, {
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