'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.canvas = SVG('canvas').size('500', '500').fill('#000');
        this.circleSize = 10;
        this.listParent = document.getElementById('dots');
    }

    /**
     * initialise this shit
     * 
     * @memberof App
     */


    _createClass(App, [{
        key: 'init',
        value: function init() {
            this.listenToClick();
        }

        /**
         * listen to f** clicks
         * 
         * @memberof App
         */

    }, {
        key: 'listenToClick',
        value: function listenToClick() {
            var _this = this;

            this.canvas.click(function (e) {
                var dotLocation = _this.getClickLocation(e);
                var x = dotLocation.x,
                    y = dotLocation.y; // destruction, yay

                _this.createNewDot(x, y);
            });
        }

        /**
         * get the f*** click location
         * 
         * @param {obj} event 
         * @returns obj
         * @memberof App
         */

    }, {
        key: 'getClickLocation',
        value: function getClickLocation(event) {
            return {
                x: event.offsetX,
                y: event.offsetY
            };
        }

        /**
         * creates new f*** dot, you moron
         * 
         * @param {number} x 
         * @param {number} y 
         * @memberof App
         */

    }, {
        key: 'createNewDot',
        value: function createNewDot(x, y) {
            // adjust position to be sure that dot generates precisely on mouse cursor center
            var adjustX = x - this.circleSize / 2;
            var adjustY = y - this.circleSize / 2;

            var color = this.randomizeColor();
            var dot = this.canvas.circle(this.circleSize).fill(color).move(adjustX, adjustY);
            this.createNewListElement(color, dot.node.id);
        }

        /**
         * as in method name
         * 
         * @param {string} color 
         * @param {number} id 
         * @memberof App
         */

    }, {
        key: 'createNewListElement',
        value: function createNewListElement(color, id) {
            var listItem = document.createElement('li');

            // put new list item
            var putListItem = this.listParent.appendChild(listItem);
            putListItem.setAttribute('class', id);
            putListItem.appendChild(document.createTextNode('Dot #' + id));

            // put delete button
            var deleteBtn = putListItem.appendChild(document.createElement('button'));
            deleteBtn.setAttribute('class', 'delete');
            deleteBtn.appendChild(document.createTextNode('usuń'));

            // put rand color button
            var colorBtn = putListItem.appendChild(document.createElement('button'));
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

    }, {
        key: 'popDot',
        value: function popDot() {
            var _this2 = this;

            var createdDotsListEls = this.listParent.getElementsByTagName('li');

            var _loop = function _loop(key) {
                if (!createdDotsListEls.hasOwnProperty(key)) return 'continue';
                var el = createdDotsListEls[key];
                el.addEventListener('mousemove', function (e) {
                    if (el === e.target) {
                        var target = SVG.get(e.target.className);
                        target.scale(3);
                    }
                });
                el.addEventListener('mouseout', function (e) {
                    if (el === e.target) {
                        var target = SVG.get(e.target.className);
                        target.scale(1);
                    }
                });
                el.addEventListener('mousedown', function (e) {
                    var parent = el;
                    if (e.target.className == 'randcolor') {
                        var target = SVG.get(el.className);
                        var newColor = _this2.randomizeColor();
                        target.fill(newColor);
                    }
                });
            };

            for (var key in createdDotsListEls) {
                var _ret = _loop(key);

                if (_ret === 'continue') continue;
            }
        }

        /**
         * removes f*** dot
         * 
         * @memberof App
         */

    }, {
        key: 'removeDot',
        value: function removeDot() {
            var createdDotsListEls = this.listParent.getElementsByTagName('li');

            // Something is seriously f**ked below, but I not have time to deal with it for now

            var _loop2 = function _loop2(key) {
                if (!createdDotsListEls.hasOwnProperty(key)) return 'continue';
                var el = createdDotsListEls[key];
                el.addEventListener('mouseup', function (e) {
                    if (e.target.className == 'delete') {
                        var target = SVG.get(el.className);
                        target.remove();
                        el.parentNode.removeChild(el);
                    }
                });
            };

            for (var key in createdDotsListEls) {
                var _ret2 = _loop2(key);

                if (_ret2 === 'continue') continue;
            }
        }

        /**
         * generates random color
         * 
         * @returns string
         * @memberof App
         */

    }, {
        key: 'randomizeColor',
        value: function randomizeColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }]);

    return App;
}();

// Run this crap


var app = new App();
app.init();
//# sourceMappingURL=app-dist.js.map