const logoutBtn = document.getElementById('logoutBtn');

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

if (!logoutBtn) {
    console.log("Logout btn not found!");
} else {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();

        deleteCookie("access-token");
        window.location.reload();
    });
}
