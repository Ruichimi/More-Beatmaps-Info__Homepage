let mobileMenuDisplayed = false;

function toggleMenu(menu) {
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    } else {
        menu.classList.remove('hidden');
    }

    mobileMenuDisplayed = !mobileMenuDisplayed;
}

function navbarMobileStyleUpdate(navbarLogo, navbarBar, borderHider) {
    navbarBar.classList.toggle('border-l-0');
    navbarBar.classList.toggle('border-l-3');
    navbarBar.classList.toggle('rounded-bl-none');

    navbarLogo.classList.toggle('rounded-br-none');
    navbarLogo.classList.toggle('border-r-0');
    navbarLogo.classList.toggle('z-50');
    navbarLogo.classList.toggle('left-[3px]');

    borderHider.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const navbarLogo = document.getElementById('navbar-logo');
    const navbarBar = document.getElementById('navbar-bar');
    const borderHider = document.getElementById('border-hider');
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('menu-btn');

    function updateWidth() {
        console.log(window.innerWidth);
        const width = window.innerWidth;
        if (mobileMenuDisplayed === true && width > 768) {
            toggleMenu(menu);
            navbarMobileStyleUpdate(navbarLogo, navbarBar, borderHider);
        }
    }

    window.addEventListener('resize', updateWidth);

    updateWidth();

    btn.addEventListener('click', () => {
        toggleMenu(menu);
        navbarMobileStyleUpdate(navbarLogo, navbarBar, borderHider);
    });
});
