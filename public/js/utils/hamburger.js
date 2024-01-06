let mobileNav = document.getElementById('mobile-nav');
let openBtn = document.getElementById('mobile-nav-open-btn');
let closeBtn = document.getElementById('mobile-nav-close-btn');

openBtn.addEventListener('click',()=>{
    mobileNav.classList = 'mobile-nav-toggled';
})

closeBtn.addEventListener('click',()=>{
    mobileNav.classList = 'mobile-nav-not-toggled';
})