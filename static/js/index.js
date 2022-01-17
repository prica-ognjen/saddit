function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btnLogout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = '/';
    })
    document.getElementById('btnDashboard').addEventListener('click', e => {
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = '/admin';
    })
}