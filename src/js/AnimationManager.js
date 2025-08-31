import ImageSwitcherAnimator from "@/js/imageSwitcherAnimator.js";
import TypeWriter from "@/js/typeTextAnimator.js";

class AnimationManager {
    constructor() {
        this.currentCardsAnimInstance = null;
        this.currentTypeWriterInstance = null;
        this.currentBlock = null;
    }

    init() {
        this.enableTypeAnimation();

        this.currentBlock = document.getElementById("cards-animated-block");
        this.cardStacksInit(this.currentBlock);
        this.animateCardsTexts(this.currentBlock, 'typewrite-cards');

        this.resetCardsAnimationsInterval();
    }

    resetCardsAnimationsInterval() {
        setInterval(() => {
            if (!this.currentBlock) return;
            if (this.currentCardsAnimInstance) this.currentCardsAnimInstance.resetStyles();

            const newBlock = this.resetBlock();

            this.cardStacksInit(newBlock);
            this.animateCardsTexts(newBlock, 'typewrite-cards');
        }, 31300);
    }

    resetBlock() {
        const parent = this.currentBlock.parentNode;
        if (parent) parent.removeChild(this.currentBlock);

        const newBlock = this.currentBlock.cloneNode(true);
        parent.appendChild(newBlock);
        this.currentBlock = newBlock;

        return newBlock;
    }

    cardStacksInit(container) {
        const cardStacks = container.querySelectorAll(".card-stack");

        cardStacks.forEach(cardStack => {
            let switchTime = parseFloat(cardStack.getAttribute('data-switch-time')) || 5000;
            let animationTime = parseFloat(cardStack.getAttribute('data-animation-time')) || 2000;

            if (this.currentCardsAnimInstance) this.currentCardsAnimInstance.stop();
            this.currentCardsAnimInstance = new ImageSwitcherAnimator(cardStack, switchTime, animationTime);
        });
    };

    getElementsForTypeAnimation(container = document, className = 'typewrite', callback) {
        const elements = container.getElementsByClassName(className);

        Array.from(elements).forEach(element => {
            callback(element);
        });
    }

    animateCardsTexts(container) {
        this.getElementsForTypeAnimation(container, 'typewrite-cards',
            (element) => {
                if (this.currentTypeWriterInstance) this.currentTypeWriterInstance.stop();
                this.currentTypeWriterInstance = new TypeWriter(element);
            })
    }

    enableTypeAnimation() {
        this.getElementsForTypeAnimation(document, 'typewrite', (element) => {
            new TypeWriter(element);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new AnimationManager().init();
});