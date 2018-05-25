class App {

    constructor() {
        this.canvas = SVG('canvas').size('500', '500').fill('#000');
        this.circleSize = 10;
        this.listParent = document.getElementById('dots');
    }


    /**
     * initialise this shit
     * 
     * @memberof App
     */
    init() {
        this.listenToClick();
    }


    /**
     * listen to f** clicks
     * 
     * @memberof App
     */
    listenToClick() {
        this.canvas.click((e) => {
            const dotLocation = this.getClickLocation(e);
            const { x, y } = dotLocation; // destruction, yay
            this.createNewDot(x, y);
        });
    }


    /**
     * get the f*** click location
     * 
     * @param {obj} event 
     * @returns obj
     * @memberof App
     */
    getClickLocation(event) {
        return {
            x: event.offsetX,
            y: event.offsetY,
        };
    }


    /**
     * creates new f*** dot, you moron
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof App
     */
    createNewDot(x, y) {
        // adjust position to be sure that dot generates precisely on mouse cursor center
        const adjustX = x - (this.circleSize / 2);
        const adjustY = y - (this.circleSize / 2);
        
        const color = this.randomizeColor();
        const dot = this.canvas.circle(this.circleSize).fill(color).move(adjustX, adjustY);
        this.createNewListElement(color, dot.node.id);
    }


    /**
     * as in method name
     * 
     * @param {string} color 
     * @param {number} id 
     * @memberof App
     */
    createNewListElement(color, id) {
        const listItem = document.createElement('li');

        // put new list item
        const putListItem = this.listParent.appendChild(listItem);
        putListItem.setAttribute('class', id);
        putListItem.appendChild(document.createTextNode('Dot #' + id));

        // put delete button
        const deleteBtn = putListItem.appendChild(document.createElement('button'));
        deleteBtn.setAttribute('class', 'delete');
        deleteBtn.appendChild(document.createTextNode('usuń'));

        // put rand color button
        const colorBtn = putListItem.appendChild(document.createElement('button'));
        colorBtn.setAttribute('class', 'randcolor');
        colorBtn.appendChild(document.createTextNode('losuj kolor'));

        // fire some things
        this.popDot();
        this.removeDot();
    }


    /**
     * pops dot on svg and handles some events
     * 
     * @memberof App
     */
    popDot() {
        const createdDotsListEls = this.listParent.getElementsByTagName('li');
        for (let key in createdDotsListEls) {
            if (!createdDotsListEls.hasOwnProperty(key)) continue;
            const el = createdDotsListEls[key];
            el.addEventListener('mousemove', (e) => {
                if(el === e.target) {
                    const target = SVG.get(e.target.className);
                    target.scale(3);
                }
            });
            el.addEventListener('mouseout', (e) => {
                if(el === e.target) {
                    const target = SVG.get(e.target.className);
                    target.scale(1);
                }
            });
            el.addEventListener('mousedown', (e) => {
                const parent = el;
                if(e.target.className == 'randcolor') {
                    const target = SVG.get(el.className);
                    const newColor = this.randomizeColor();
                    target.fill(newColor);
                }
            });
        }
    }


    /**
     * removes f*** dot
     * 
     * @memberof App
     */
    removeDot() {
        const createdDotsListEls = this.listParent.getElementsByTagName('li');

        // Something is seriously f**ked below, but I not have time to deal with it for now
        for (let key in createdDotsListEls) {
            if (!createdDotsListEls.hasOwnProperty(key)) continue;
            const el = createdDotsListEls[key];
            el.addEventListener('mouseup', (e) => {
                if(e.target.className == 'delete') {
                    const target = SVG.get(el.className);
                    target.remove();
                    el.parentNode.removeChild(el);
                }
            });
        }
    }


    /**
     * generates random color
     * 
     * @returns string
     * @memberof App
     */
    randomizeColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

// Run this crap
const app = new App;
app.init();