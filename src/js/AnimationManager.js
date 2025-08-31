import ImageSwitcherAnimator from "@/js/imageSwitcherAnimator.js";
import TypeWriter from "@/js/typeTextAnimator.js";

class AnimationManager {
    constructor() {
        this.currentAnimInstance = null;
        this.currentTypeWriterInstance = null;
        this.currentBlock = null;
    }

    init() {
        this.enableTypeAnimation();

        this.currentBlock = document.getElementById("cards-animated-block");
        this.cardStacksInit(this.currentBlock);
        this.animateCardsTexts(this.currentBlock, 'typewrite-cards');

        setInterval(() => {
            if (!this.currentBlock) return;
            if (this.currentAnimInstance) this.currentAnimInstance.resetStyles();

            const parent = this.currentBlock.parentNode;
            if (parent) parent.removeChild(this.currentBlock);

            const newBlock = this.currentBlock.cloneNode(true);

            setTimeout(() => {
                parent.appendChild(newBlock);

                this.cardStacksInit( newBlock);
                this.animateCardsTexts(newBlock, 'typewrite-cards');

                this.currentBlock = newBlock;
            }, 5);

        }, 31300);
    }

    cardStacksInit(container) {
        const cardStacks = container.querySelectorAll(".card-stack");

        cardStacks.forEach(cardStack => {
            let switchTime = parseFloat(cardStack.getAttribute('data-switch-time')) || 5000;
            let animationTime = parseFloat(cardStack.getAttribute('data-animation-time')) || 2000;

            if (this.currentAnimInstance) this.currentAnimInstance.stop();
            this.currentAnimInstance = new ImageSwitcherAnimator(cardStack, switchTime, animationTime);
        });
    };

    getElementAndItsParamsForTypeAnimation(container = document, className = 'typewrite', callback) {
        const elements = container.getElementsByClassName(className);

        Array.from(elements).forEach(element => {
            const texts = element.getAttribute('data-texts');
            const delay = element.getAttribute('data-delay');
            const speed = element.getAttribute('data-speed');
            const cursorAttr = element.getAttribute('data-cursor');
            const showCursor = cursorAttr !== 'false';

            if (texts) {
                callback(element, JSON.parse(texts), speed, delay, showCursor);
            }
        });
    }

    animateCardsTexts(container) {
        this.getElementAndItsParamsForTypeAnimation(container, 'typewrite-cards',
            (element, texts, speed, delay, showCursor) => {
                if (this.currentTypeWriterInstance) this.currentTypeWriterInstance.stop();
            this.currentTypeWriterInstance = new TypeWriter(element, texts, speed, delay, showCursor);
        })
    }

    enableTypeAnimation() {
        this.getElementAndItsParamsForTypeAnimation(document, 'typewrite', (element, texts, speed, delay, showCursor) => {
            new TypeWriter(element, texts, speed, delay, showCursor);
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new AnimationManager().init();
});