import './styles/main.scss';

//Puls på sektioner.

const cards = document.querySelectorAll('.card')

cards.forEach(card => {
    card.addEventListener('click' , () => {
        card.classList.add('pulse')
        setTimeout(() => {
            card.classList.remove('pulse')
        }, 600);
    });
});

//Puls på meny.
const menuLinks = document.querySelectorAll('nav ul li a')

menuLinks.forEach(link => {
    link.addEventListener('click' , () => {
        link.classList.add('menu-click')

        link.addEventListener('animationend', () => {
            link.classList.remove('menu-click')
        }, {once: true });
    });
});