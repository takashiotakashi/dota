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

let timer;
let tempoDeJogo = 0;
let timerAtivo = false;

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

function pausarTimer() {
  clearInterval(timer);
  timerAtivo = false;
}

function reiniciarTimer() {
  tempoDeJogo = 0;
  atualizarDisplayTempo();
  pausarTimer();
  iniciarTimer();
}

function falar(texto) {
  if ('speechSynthesis' in window) {
      let msg = new SpeechSynthesisUtterance();
      msg.text = texto;
      msg.lang = 'pt-BR'; // Português Brasileiro
      msg.rate = 1.5;     // Velocidade da fala
      window.speechSynthesis.speak(msg);
  }
}

function verificarLembretes() {
  lembretes.forEach(lembrete => {
      if (tempoDeJogo === lembrete.tempo) {
          falar(lembrete.tarefa);
      }
  });
}

function atualizarDisplayTempo() {
  const minutos = Math.floor(tempoDeJogo / 60);
  const segundos = tempoDeJogo % 60;
  document.getElementById('tempoDisplay').textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
