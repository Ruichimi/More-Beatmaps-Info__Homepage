import "@scss/main.scss";

document.addEventListener('DOMContentLoaded', () => {
    const MOBILE_BREAKPOINT = 640;
    const navbar = document.querySelector('nav');
    const mainContent = document.querySelector('main');

    function adjustMainHeight() {
        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

        if (!isMobile) {
            mainContent.style.height = '';
            return;
        }

        const navbarHeight = navbar.offsetHeight;
        const viewportHeight = window.innerHeight;
        const contentHeight = mainContent.scrollHeight;
        const availableHeight = viewportHeight - navbarHeight;

        if (availableHeight > contentHeight) {
            mainContent.style.height = `${availableHeight}px`;
        } else {
            mainContent.style.height = '';
        }
    }

    adjustMainHeight();
    window.addEventListener('resize', adjustMainHeight);
});
