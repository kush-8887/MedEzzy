function deleteCookie(name) {
    console.log(document.cookie);
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

async function fetchEmail(){
    const data = await fetch('http://localhost:8080/getusername');
    const email = await data.text();
    
    let cont = document.getElementById('hiEmail');
    cont.innerHTML += `Hi, ${email} <br>`

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
    fetchEmail();
})

