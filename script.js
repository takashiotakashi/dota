let lembretes = [
  { tempo: 5, tarefa: "Acorda caralho, é agora que o bicho vai pegar!" },
  { tempo: 20, tarefa: "lalalalalalalalalalalala" },
  { tempo: 105, tarefa: "Runa mid em 15, stack neutrals" },
  { tempo: 165, tarefa: "Bounty em 15, stack neutrals" },
  { tempo: 225, tarefa: "Runa mid em 15, stack neutrals" },
  { tempo: 330, tarefa: "Runa dos 6 em 30, sup rotacione mid, stack neutrals" },
  { tempo: 390, tarefa: "Runa xp em 30, stack neutrals" },
  { tempo: 450, tarefa: "Runa dos 8 em 30, stack neutrals" },
  { tempo: 570, tarefa: "Runa dos 10 em 30, stack neutrals" },
];


// Variáveis para controlar o timer e o estado do som
let timer;
let tempoDeJogo = 0;
let timerAtivo = false;
let somAtivado = false;


// Função para iniciar o timer do jogo
function iniciarTimer() {
  if (!timerAtivo) {
      timer = setInterval(() => {
          tempoDeJogo++;
          verificarLembretes();
          atualizarDisplayTempo();
      }, 1000);
      timerAtivo = true;
  }
}


// Função para pausar o timer do jogo
function pausarTimer() {
  clearInterval(timer);
  timerAtivo = false;
}


// Função para reiniciar o timer do jogo
function reiniciarTimer() {
  tempoDeJogo = 0;
  atualizarDisplayTempo();
  pausarTimer();
  iniciarTimer();
}


// Função para ligar e desligar o som
function toggleSom() {
  somAtivado = !somAtivado;
  const iconeVolumeXmark = document.getElementById('botaoSom').querySelector('.fa-volume-xmark');
  const iconeVolumeHigh = document.getElementById('botaoSom').querySelector('.fa-volume-high');
  
  if (somAtivado) {
      iconeVolumeXmark.style.display = 'none';
      iconeVolumeHigh.style.display = 'inline-block';
  } else {
      iconeVolumeXmark.style.display = 'inline-block';
      iconeVolumeHigh.style.display = 'none';
  }
}


// Função para verificar e anunciar lembretes com base no tempo de jogo
function verificarLembretes() {
  lembretes.forEach(lembrete => {
    if (tempoDeJogo === lembrete.tempo) {
        falar(lembrete.tarefa);
    }
});
}


// Função para atualizar o display do tempo de jogo
function atualizarDisplayTempo() {
  const minutos = Math.floor(tempoDeJogo / 60);
  const segundos = tempoDeJogo % 60;
  document.getElementById('tempoDisplay').textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}


// Função para iniciar o timer do Roshan e calcular tempos de respawn
function iniciarTimerRoshan() {
  document.getElementById('tempoDeCliqueRoshan').textContent = document.getElementById('tempoDisplay').textContent;
  atualizarTempoRoshan('respawnMinimoRoshan', tempoDeJogo + 8 * 60);
  atualizarTempoRoshan('respawnMaximoRoshan', tempoDeJogo + 11 * 60);
}


// Função para atualizar os tempos de respawn do Roshan
function atualizarTempoRoshan(elementoId, tempoEmSegundos) {
  const minutos = Math.floor(tempoEmSegundos / 60);
  const segundos = tempoEmSegundos % 60;
  document.getElementById(elementoId).textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}


// Função para anunciar lembretes usando síntese de voz
function falar(texto) {
  if ('speechSynthesis' in window && somAtivado) {
      let msg = new SpeechSynthesisUtterance();
      msg.text = texto;
      msg.lang = 'pt-BR';
      msg.rate = 1.5;
      window.speechSynthesis.speak(msg);
  }
}


// Dentro do script.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
              .then(registration => {
                  console.log('SW registrado:', registration);
              })
              .catch(registrationError => {
                  console.log('SW falhou:', registrationError);
              });
  });
}
