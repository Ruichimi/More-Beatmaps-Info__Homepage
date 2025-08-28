class ImageSwitcherAnimator {
    constructor(cardStack, switchTime = 5000, animationTime = 3000) {
        this.injectStyles();
        this.switchCards(cardStack, switchTime, animationTime);
    }

    switchCards(cardStack, switchTime, animationTime) {
        const cards = Array.from(cardStack.querySelectorAll(".card"));
        const total = cards.length;
        let current = 0;

        cards[current].classList.add('show');
        cards.forEach((card, i) => card.style.zIndex = i);

        setInterval(() => {
            const prevCard = cards[current];
            current = (current + 1) % total;
            const nextCard = cards[current];

            prevCard.classList.remove('show');

            setTimeout(() => {
                nextCard.classList.add('show');
            }, 300);

            //To make the cards hidden when the page loads without animation setting this property here
            cards.forEach(card => card.style.transition = `opacity ${animationTime / 1000}s ease`);

        }, switchTime);
    }

    injectStyles() {
        if (document.getElementById('image-switcher-styles')) return;

        const style = document.createElement('style');
        style.id = 'image-switcher-styles';
        style.textContent = `
            .card-stack {
                position: relative;
            }
            .card-stack .card {
                position: absolute;
                opacity: 0;
            }
            .card.show {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const cardStacks = document.querySelectorAll(".card-stack");

    cardStacks.forEach(cardStack => {
        let switchTime = parseFloat(cardStack.getAttribute('data-switch-time')) || 5000;
        let animationTime = parseFloat(cardStack.getAttribute('data-animation-time')) || 2000;
        new ImageSwitcherAnimator(cardStack, switchTime, animationTime);
    });
});
