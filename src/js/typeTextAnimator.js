// Rewritten version of the code from https://codepen.io/hi-im-si/pen/ALgzqo

class TypeWriter {
    constructor(element, texts, speed = 50, delay = 2000, showCursor = true) {
        this.element = element;                        //DOM element with text
        this.currentIndex = 0;                         //Index of the current text being typed
        this.currentText = '';                         //Current text being typed
        this.texts = texts;                            //Array of texts to be typed

        this.speed = parseInt(speed, 10) || 50;   //Speed of typing and removing in ms
        this.delay = parseInt(delay, 10);         //How long to wait between removing typing each text

        this.rafId = null;                             //requestAnimationFrame id
        this.lastTime = 0;                             //Last timestamp for step()

        this.enableTextCursorIfNeeded(showCursor);

        this.typeNext();                               //Start typing
    }

    typeNext() {
        const fullText = this.texts[this.currentIndex % this.texts.length];
        this.addText(fullText, () => {
            setTimeout(() => {
                this.removeText(() => {
                    this.currentIndex++;
                    setTimeout(() => this.typeNext(), 500);
                });
            }, this.delay);
        });
    }

    addText(fullText, callback) {
        this.cancelAnimationIfExists();
        this.lastTime = performance.now();

        const step = (now) => {
            if (now - this.lastTime >= this.speed) {
                this.currentText = fullText.substring(0, this.currentText.length + 1);
                this.updateElement();
                this.lastTime = now;
            }

            if (this.currentText.length < fullText.length) {
                this.rafId = requestAnimationFrame(step);
            } else if (callback) {
                callback();
            }
        };

        this.rafId = requestAnimationFrame(step);
    }

    removeText(callback) {
        this.cancelAnimationIfExists();
        this.lastTime = performance.now();

        const step = (now) => {
            if (now - this.lastTime >= this.speed / 3) {
                this.currentText = this.currentText.substring(0, this.currentText.length - 1);
                this.updateElement();
                this.lastTime = now;
            }

            if (this.currentText.length > 0) {
                this.rafId = requestAnimationFrame(step);
            } else if (callback) {
                callback();
            }
        };

        this.rafId = requestAnimationFrame(step);
    }

    updateElement() {
        this.element.innerHTML = this.currentText || '&nbsp;';
    }

    enableTextCursorIfNeeded(showCursor) {
        if (showCursor) this.element.style.border = '0.08em solid #fff';
    }

    cancelAnimationIfExists() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    stop() {
        this.cancelAnimationIfExists();
        this.currentText = '';
        this.updateElement();
    }
}

export default TypeWriter;
