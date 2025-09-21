let mobileMenuDisplayed = false;

function toggleMenu(menu) {
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    } else {
        menu.classList.remove('hidden');
    }

    mobileMenuDisplayed = !mobileMenuDisplayed;
}

function navbarMobileStyleUpdate(navbarLogo, navbarBar) {
    navbarBar.classList.toggle('border-l-0');
    navbarBar.classList.toggle('border-l-2');
    navbarBar.classList.toggle('rounded-bl-none');
    navbarBar.classList.toggle('right-[0.125rem]');
    navbarLogo.classList.toggle('rounded-br-none');
    navbarLogo.classList.toggle('border-r-0');
    navbarLogo.classList.toggle('z-50');
    navbarLogo.classList.toggle('left-[0.125rem]');
}

document.addEventListener('DOMContentLoaded', () => {
    const navbarLogo = document.getElementById('navbar-logo');
    const navbarBar = document.getElementById('navbar-bar');
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('menu-btn');


    function updateWidth() {
        console.log(window.innerWidth);
        const width = window.innerWidth;
        if (mobileMenuDisplayed === true && width > 768) {
            toggleMenu(menu);
            navbarMobileStyleUpdate(navbarLogo, navbarBar);
        }
    }

    window.addEventListener('resize', updateWidth);

    updateWidth();

    btn.addEventListener('click', () => {
        toggleMenu(menu);
        navbarMobileStyleUpdate(navbarLogo, navbarBar);
    });
});
