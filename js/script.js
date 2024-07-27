const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const activeButton = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseButton = document.querySelector('#start-pause');
const iniciarOuPausarButton = document.querySelector('#start-pause span');
const iniciarOuPausarButtonIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const incrementarButton = document.querySelector('#increase-time');
const decrementarButton = document.querySelector('#decrease-time');

const musicaRelaxar = new Audio('/sons/luna-rise-part-one.mp3');
const musicaFimSecao = new Audio('/sons/beep.mp3');
const musicaControl = new Audio('/sons/click-control.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaRelaxar.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musicaRelaxar.paused) {
        musicaRelaxar.play();
    } else {
        musicaRelaxar.pause();
    }
});

focoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoButton.classList.add('active');
});

curtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoButton.classList.add('active');
});

longoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoButton.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    activeButton.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">faça uma pausa curta!</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaFimSecao.play();
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

function controlButton() {
    musicaControl.play();
}

function aumentarTempo() {
    tempoDecorridoEmSegundos -= 60;
    controlButton();
    mostrarTempo();
}

function diminuirTempo() {
    tempoDecorridoEmSegundos += 60;
    if (tempoDecorridoEmSegundos < 0) {
        tempoDecorridoEmSegundos = 0;
    }
    controlButton();
    mostrarTempo();
}

incrementarButton.addEventListener('click', aumentarTempo);
decrementarButton.addEventListener('click', diminuirTempo);
startPauseButton.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        controlButton();
        zerar();
        return;
    }
    controlButton();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarButton.textContent = "Pausar";
    iniciarOuPausarButtonIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarButton.textContent = "Começar";
    iniciarOuPausarButtonIcone.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();