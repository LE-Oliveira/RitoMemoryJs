let cartas = [];
let cartasSelecionadas = [];
let clickable = true;
const tabuleiro = document.querySelector('.tabuleiro');
tabuleiro.classList.add('facil');

const skins = [
  'img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg',
  'img/img4.jpg', 'img/img5.jpg', 'img/img6.jpg',
  'img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg',
  'img/img4.jpg', 'img/img5.jpg', 'img/img6.jpg',
];

skins.sort(() => Math.random() - 0.5);

skins.forEach((skin, i) => {
    const carta = document.createElement('div');
    carta.id = `carta-${i}`;
    carta.classList.add('carta');
    carta.dataset.revelada = 'false';
    carta.dataset.index = i;
    carta.style.backgroundImage = 'url(img/default.png)';

    const handler = cardHandleClick(i);
    carta._handler = handler;
    carta.addEventListener('click', handler);

    cartas.push({ el: carta, src: skin, revelada: false });
    tabuleiro.appendChild(carta);
});

function cardHandleClick(index) {
    return function handleClick() {
        if (!clickable) return;

        const cartaObj = cartas[index];
        const carta = cartaObj.el;
        if (cartaObj.revelada){
            cartaObj.revelada = false;
            carta.style.backgroundImage = `url(img/default.png)`;
            cartasSelecionadas.pop(cartasSelecionadas.findIndex((id)=>{id==index;}));
            return;
        }
        carta.style.backgroundImage = `url(${cartaObj.src})`;
        cartaObj.revelada = true;
        cartasSelecionadas.push(index);

        handleChange();
    };
}

function handleChange() {
    if (cartasSelecionadas.length < 2) return;

    const [i1, i2] = cartasSelecionadas;
    const c1 = cartas[i1];
    const c2 = cartas[i2];

    if (c1.src === c2.src) {
        c1.el.removeEventListener('click', c1.el._handler);
        c2.el.removeEventListener('click', c2.el._handler);
        c1.el.classList.add('revelada');
        c2.el.classList.add('revelada');
    } else {
        clickable = false;
        setTimeout(() => {
            c1.el.style.backgroundImage = 'url(img/default.png)';
            c2.el.style.backgroundImage = 'url(img/default.png)';
            c1.el.classList.remove('revelada');
            c2.el.classList.remove('revelada');
            c1.revelada = false;
            c2.revelada = false;

            clickable = true;
        }, 800);
    }

    cartasSelecionadas = [];
}
