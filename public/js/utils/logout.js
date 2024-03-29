function deleteCookie(name) {
    console.log(document.cookie);
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

document.addEventListener('DOMContentLoaded',()=>{
    const logoutBtn = document.getElementById('logoutBtn');

    if (!logoutBtn) {
        console.log("Logout btn not found!");
    } else {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
    
            deleteCookie("access-token");
            window.location.reload();
        });
    }
})

