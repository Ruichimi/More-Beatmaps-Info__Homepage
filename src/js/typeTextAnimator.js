// Rewritten version of the code from https://codepen.io/hi-im-si/pen/ALgzqo

class TypeWriter {
    constructor(element, texts, speed, delay = 2000) {
        this.element = element;                        //DOM element with text
        this.currentIndex = 0;                         //Index of the current text being typed
        this.currentText = '';                         //Current text being typed
        this.texts = texts;                            //Array of texts to be typed

        this.speed = parseInt(speed, 10) || 50;   //Speed of typing and removing in ms
        this.delay = parseInt(delay, 10);         //How long to wait between removing typing each text

        this.typeNext();                               //Start typing
    }

    typeNext() {
        const fullText = this.texts[this.currentIndex % this.texts.length];
        this.addText(fullText, () => {
            setTimeout(() => this.removeText(() => {
                this.currentIndex++;
                setTimeout(() => this.typeNext(), 500); //Little delay before typing the next text
            }), this.delay);
        });
    }

    addText(fullText, callback) {
        if (this.currentText.length < fullText.length) {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
            this.updateElement();
            setTimeout(() => this.addText(fullText, callback), this.speed);
        } else if (callback) {
            callback();
        }
    }

    removeText(callback) {
        if (this.currentText.length > 0) {
            this.currentText = this.currentText.substring(0, this.currentText.length - 1);
            this.updateElement();
            setTimeout(() => this.removeText(callback), this.speed / 3);
        } else if (callback) {
            callback();
        }
    }

    updateElement() {
        this.element.innerHTML = this.currentText || '&nbsp;';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const elements = document.getElementsByClassName('typewrite');

    Array.from(elements).forEach(element => {
        console.log(element);
        const texts = element.getAttribute('data-texts');
        const delay = element.getAttribute('data-delay');
        const speed = element.getAttribute('data-speed');
        const cursorAttr = element.getAttribute('data-cursor');

        const showCursor = cursorAttr !== 'false';
        if (showCursor) element.style.borderRight = '0.08em solid #fff';

        if (texts) {
            new TypeWriter(element, JSON.parse(texts), speed, delay, showCursor);
        }
    });
});
