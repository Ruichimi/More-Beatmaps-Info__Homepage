import ImageSwitcherAnimator from "@/js/imageSwitcherAnimator.js";
import TypeWriter from "@/js/typeTextAnimator.js";

class AnimationManager {
    constructor() {
        this.cardAnimInstances = [];
        this.currentTypeWriterInstances = [];
        this.currentBlock = null;
    }

    init() {
        this.enableTypeAnimation();

        this.currentBlock = document.getElementById("cards-animated-block");
        this.cardStacksInit(this.currentBlock);
        this.animateCardsTexts(this.currentBlock);

        this.resetCardsAnimationsInterval();
    }

    resetCardsAnimationsInterval() {
        setInterval(() => {
            if (!this.currentBlock) return;

            // сброс всех анимаций карточек
            this.cardAnimInstances.forEach(anim => anim.resetStyles());

            const newBlock = this.resetBlock();

            this.cardStacksInit(newBlock);
            this.animateCardsTexts(newBlock);
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

        // очищаем старые анимации
        this.cardAnimInstances.forEach(anim => anim.stop());
        this.cardAnimInstances = [];

        cardStacks.forEach(cardStack => {
            let switchTime = parseFloat(cardStack.getAttribute('data-switch-time')) || 5000;
            let animationTime = parseFloat(cardStack.getAttribute('data-animation-time')) || 2000;

            const animInstance = new ImageSwitcherAnimator(cardStack, switchTime, animationTime);
            this.cardAnimInstances.push(animInstance);
        });
    }

    getElementsForTypeAnimation(container = document, className = 'typewrite', callback) {
        const elements = container.getElementsByClassName(className);
        Array.from(elements).forEach(element => callback(element));
    }

    animateCardsTexts(container) {
        this.getElementsForTypeAnimation(container, 'typewrite-cards', (element) => {
            const existingIndex = this.currentTypeWriterInstances.findIndex(inst => inst.element === element);
            if (existingIndex !== -1) {
                this.currentTypeWriterInstances[existingIndex].stop();
                this.currentTypeWriterInstances.splice(existingIndex, 1);
            }

            this.currentTypeWriterInstances.push(new TypeWriter(element));
        });
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

