class TypeWriter {
    constructor(element) {
        this.element = element;                        //DOM element with text

        this.texts = [];                               //Array of texts to be typed
        this.delay = 5000;                             //How long to wait between removing typing each text
        this.speed = 40;                               //Speed of typing and removing in ms

        this.currentIndex = 0;                         //Index of the current text being typed
        this.currentText = '';                         //Current text being typed
        this.rafId = null;                             //requestAnimationFrame id
        this.lastTime = 0;                             //Last timestamp for step()

        this.getParamsFromElementAttributes(element);
        this.enableTextCursorIfNeeded();
        this.typeNext();                               //Start typing
    }

    getParamsFromElementAttributes(element) {
        const texts = element.getAttribute('data-texts');
        if (!texts) return;

        this.texts = JSON.parse(texts);
        this.delay = Number(element.getAttribute('data-delay')) || 5000;
        this.speed = Number(element.getAttribute('data-speed')) || 40;
        //Show text cursor or not. Any value except 'false' is considered true
        this.showCursor = element.getAttribute('data-cursor') !== 'false';
    }

    parseText(htmlString) {
        const parts = [];
        let i = 0;

        while (i < htmlString.length) {
            if (htmlString[i] === '<') {
                const tagEnd = htmlString.indexOf('>', i);
                if (tagEnd !== -1) {
                    parts.push(htmlString.substring(i, tagEnd + 1));
                    i = tagEnd + 1;
                } else {
                    parts.push(htmlString[i]);
                    i++;
                }
            } else {
                parts.push(htmlString[i]);
                i++;
            }
        }

        return parts;
    }

    typeNext() {
        const fullText = this.texts[this.currentIndex % this.texts.length];
        this.textParts = this.parseText(fullText);
        this.addText(() => {
            setTimeout(() => {
                this.removeText(() => {
                    this.currentIndex++;
                    setTimeout(() => this.typeNext(), 500);
                });
            }, this.delay);
        });
    }

    addText(callback) {
        this.cancelAnimationIfExists();
        this.lastTime = performance.now();
        let partIndex = 0;

        const step = (now) => {
            if (now - this.lastTime >= this.speed) {
                if (partIndex < this.textParts.length) {
                    this.currentText += this.textParts[partIndex];
                    partIndex++;
                    this.updateElement();
                    this.lastTime = now;
                }
            }

            if (partIndex < this.textParts.length) {
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
                this.textParts.pop();
                this.currentText = this.textParts.join('');
                this.updateElement();
                this.lastTime = now;
            }

            if (this.textParts.length > 0) {
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

    enableTextCursorIfNeeded() {
        if (this.showCursor) this.element.style.border = '0.08em solid #fff';
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