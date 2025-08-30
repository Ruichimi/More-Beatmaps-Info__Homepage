class ImageSwitcherAnimator {
    constructor(cardStack, switchTime = 5000, animationTime = 3000) {
        this.injectStyles();
        this.timers = [];

        this.switchCards(cardStack, switchTime, animationTime);
        this.cardStack = cardStack;
    }

    switchCards(cardStack, switchTime, animationTime) {
        const cards = Array.from(cardStack.querySelectorAll(".card"));
        if (!cards.length) return;

        const total = cards.length;
        let current = 0;

        cards[current].classList.add('show');

        const interval = setInterval(() => {
            const prevCard = cards[current];
            current = (current + 1) % total;
            const nextCard = cards[current];

            if (!prevCard || !nextCard) return;

            prevCard.classList.remove('show');

            const timeout = setTimeout(() => {
                nextCard.classList.add('show');
            }, 300);
            this.timers.push(timeout);

            cards.forEach(card => card.style.transition = `opacity ${animationTime / 1000}s ease`);
        }, switchTime);
        this.timers.push(interval);
    }

    injectStyles() {
        if (document.getElementById('image-switcher-styles')) return;

        const style = document.createElement('style');
        style.id = 'image-switcher-styles';
        style.textContent = `
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


    resetStyles() {
        if (!this.cardStack) return;

        const cards = Array.from(this.cardStack.querySelectorAll(".card"));

        cards.forEach(card => {
            card.style.transition = '';
            card.style.opacity = '';
        });

        cards.forEach(card => card.classList.remove('show'));
    }

    stop() {
        this.timers.forEach(timer => {
            clearTimeout(timer);
            clearInterval(timer);
        });
    }
}

export default ImageSwitcherAnimator;
