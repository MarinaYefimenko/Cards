import {getResource} from '../services/services';

function cards() {
    // Classes for Menu
    class MenuItem {
        constructor(src, alt, subtitle, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.rate = 35;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }
        changeToUAH() {
            this.price *= this.rate;
        }
        render() {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            </div>`;

            this.parent.append(div);
        }
    }

    getResource ('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
}

export default cards;
