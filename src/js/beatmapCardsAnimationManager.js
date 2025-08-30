import ImageSwitcherAnimator from "@/js/imageSwitcherAnimator.js";
import TypeWriter from "@/js/typeTextAnimator.js";

class BeatmapCardsAnimationManager {
    constructor() {
        this.currentAnimInstance = null;
        this.currentTypeWriterInstance = null;

        this.currentBlock = null;
    }

    init() {
        this.currentBlock = document.getElementById("cards-animated-block");
        this.cardStacksInit(this.currentBlock);
        this.typeAnimInit(this.currentBlock);

        setInterval(() => {
            if (!this.currentBlock) return;
            if (this.currentAnimInstance) this.currentAnimInstance.resetStyles();

            const parent = this.currentBlock.parentNode;
            if (parent) parent.removeChild(this.currentBlock);

            const newBlock = this.currentBlock.cloneNode(true);

            setTimeout(() => {
                parent.appendChild(newBlock);

                this.cardStacksInit( newBlock);
                this.typeAnimInit(newBlock);

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

    typeAnimInit(container) {
        const elements = container.getElementsByClassName('typewrite');

        Array.from(elements).forEach(element => {
            const texts = element.getAttribute('data-texts');
            const delay = element.getAttribute('data-delay');
            const speed = element.getAttribute('data-speed');
            const cursorAttr = element.getAttribute('data-cursor');

            const showCursor = cursorAttr !== 'false';
            if (showCursor) element.style.borderRight = '0.08em solid #fff';

            if (texts) {
                if (this.currentTypeWriterInstance) this.currentTypeWriterInstance.stop();
                this.currentTypeWriterInstance =
                    new TypeWriter(element, JSON.parse(texts), speed, delay, showCursor);
            }
        });
    };
}
document.addEventListener("DOMContentLoaded", () => {
    new BeatmapCardsAnimationManager().init();
});