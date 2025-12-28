export default class NavbarController {
    constructor() {
        this.mobileMenuDisplayed = false;
    }

    toggleMenu(menu) {
        if (!menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        } else {
            menu.classList.remove('hidden');
        }

        this.mobileMenuDisplayed = !this.mobileMenuDisplayed;
    }

    navbarMobileStyleUpdate(navbarLogo, navbarBar, borderHider) {
        navbarBar.classList.toggle('border-l-0');
        navbarBar.classList.toggle('border-l-3');
        navbarBar.classList.toggle('rounded-bl-none');

        navbarLogo.classList.toggle('rounded-br-none');
        navbarLogo.classList.toggle('border-r-0');
        navbarLogo.classList.toggle('z-50');
        navbarLogo.classList.toggle('left-[3px]');

        borderHider.classList.toggle('hidden');
    }

    init() {
        window.addEventListener('resize', () => console.log(12312321321));
        const navbarLogo = document.getElementById('navbar-logo');
        const navbarBar = document.getElementById('navbar-bar');
        const borderHider = document.getElementById('border-hider');
        const menu = document.getElementById('mobile-menu');
        const btn = document.getElementById('menu-btn');

        const updateWidth = () => {
            const width = window.innerWidth;
            if (this.mobileMenuDisplayed === true && width > 768) {
                this.toggleMenu(menu);
                this.navbarMobileStyleUpdate(navbarLogo, navbarBar, borderHider);
            }
        }

        window.addEventListener('resize', updateWidth);

        updateWidth();

        btn.addEventListener('click', () => {
            this.toggleMenu(menu);
            this.navbarMobileStyleUpdate(navbarLogo, navbarBar, borderHider);
        });
    }
}
