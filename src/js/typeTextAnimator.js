// Rewritten version of the code from https://codepen.io/hi-im-si/pen/ALgzqo

class TypeWriter {
    constructor(element, texts, speed = 15, delay = 2000, showCursor = true) {
        this.element = element;                        //DOM element with text
        this.currentIndex = 0;                         //Index of the current text being typed
        this.currentText = '';                         //Current text being typed
        this.texts = texts;                            //Array of texts to be typed

        this.speed = parseInt(speed, 10) || 50;   //Speed of typing and removing in ms
        this.delay = parseInt(delay, 10);         //How long to wait between removing typing each text

        this.timeoutId = null;

        this.enableTextCursorIfNeeded(showCursor);

        this.typeNext();                               //Start typing
    }

    typeNext() {
        const fullText = this.texts[this.currentIndex % this.texts.length];
        this.addText(fullText, () => {
            this.timeoutId = setTimeout(() => {
                this.removeText(() => {
                    this.currentIndex++;
                    this.timeoutId = setTimeout(() => this.typeNext(), 500);
                });
            }, this.delay);
        });
    }

    addText(fullText, callback) {
        this.clearTimeoutIfExists();
        if (this.currentText.length < fullText.length) {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
            this.updateElement();
            this.timeoutId = setTimeout(() => this.addText(fullText, callback), this.speed);
        } else if (callback) {
            callback();
        }
    }

    removeText(callback) {
        this.clearTimeoutIfExists();
        if (this.currentText.length > 0) {
            this.currentText = this.currentText.substring(0, this.currentText.length - 1);
            this.updateElement();
            this.timeoutId = setTimeout(() => this.removeText(callback), this.speed / 3);
        } else if (callback) {
            callback();
        }
    }

    updateElement() {
        this.element.innerHTML = this.currentText || '&nbsp;';
    }

    enableTextCursorIfNeeded(showCursor) {
        console.log('meow', showCursor);
        console.log(this.element);
        if (showCursor) this.element.style.border = '0.08em solid #fff';
    }

    clearTimeoutIfExists() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    stop() {
        this.clearTimeoutIfExists();
        this.currentText = '';
        this.updateElement();
    }
}

export default TypeWriter;
