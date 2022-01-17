function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('content').addEventListener('click', e => {
        clicked = e.target.name
        document.cookie = `token=${token};SameSite=Lax`
        window.location.href = `/admin/${clicked}`    
    })

    document.getElementById('tables').addEventListener('click', e => {
        document.getElementById('dashboard').style.pointerEvents = 'auto';
        document.getElementById('profile').style.pointerEvents = 'auto';
        document.getElementById('tables').style.pointerEvents = 'none';
        e.preventDefault()

        fetch('http://localhost:8002/admin', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(res => {
            const content = document.getElementById('content')
            content.innerText = ""
            const table = document.createElement('table')
            table.className = 'table'

            res.forEach(name => {
                let li = document.createElement('li')
                li.className = 'list-group-item list-group-item-action list-group-item-light p-3'
                li.name = name
                li.innerText = name
                table.append(li)
            })
            content.append(table)
        })
    })

    document.getElementById('dashboard').addEventListener('click', e => {
        document.getElementById('dashboard').style.pointerEvents = 'none';
        document.getElementById('profile').style.pointerEvents = 'auto';
        document.getElementById('tables').style.pointerEvents = 'auto';
        e.preventDefault()

        fetch('http://localhost:8002/admin', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(res => {
            const content = document.getElementById('content')
            content.innerText = ""

            const db = document.createElement('h1')
            db.className = 'label label-default'
            db.innerText = "Just imagine the dashboard"

            content.append(db)
        })
    })
    document.getElementById('profile').addEventListener('click', e => {
        document.getElementById('dashboard').style.pointerEvents = 'auto';
        document.getElementById('profile').style.pointerEvents = 'none';
        document.getElementById('tables').style.pointerEvents = 'auto';
        e.preventDefault()

        fetch('http://localhost:8002/admin', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(res => {
            const content = document.getElementById('content')
            content.innerText = ""

            const db = document.createElement('h1')
            db.className = 'label label-default'
            db.innerText = "Just imagine your profile here"

            content.append(db)
        })
    })

    document.getElementById('mainPage').addEventListener('click', e => {
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = '/';
    })
}

$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

