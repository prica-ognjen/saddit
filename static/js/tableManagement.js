function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('tables').addEventListener('click', e => {
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
/*
            let table = document.createElement('table')
            table.className='table'

            let table = document.createElement('table')
            table.className='table'

            res.forEach(e => {
                let li = document.createElement('li')
                li.className = 'list-group-item list-group-item-action list-group-item-light p-3'
    
                let tableName = document.createElement('td')
                tableName.innerText = e
    
                bodyRow.append(id, first_name, last_name, email, password, username, birth_date, country, rank, enabled)
                table.append(bodyRow)
            })
*/
            content.innerHTML += `<table class="table">`
            res.forEach(table => {
                content.innerHTML += `<li class="list-group-item list-group-item-action list-group-item-light p-3" name="${table}">${table}</li>`
            })
        })
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