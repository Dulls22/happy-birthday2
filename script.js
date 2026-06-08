/* ============================================================
   JAVASCRIPT UTAMA
============================================================ */

// --- LOADING SCREEN ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.lf1').classList.add('flower-bloom');
    document.querySelector('.lf2').classList.add('flower-bloom');
    document.querySelector('.loading-text').style.opacity = '0';

    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
      // Mulai animasi kelopak mawar setelah loading selesai
      createRosePetals();
    }, 800);
  }, 2000); 
});

// --- NAVIGASI ---
function goPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page' + n).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (n === 3) initAlbumPage();
}

// --- DEKORASI BINTANG & MAWAR ---
function createRosePetals() {
  const container = document.getElementById('rosePetals');
  for(let i=0; i<35; i++) {
    let petal = document.createElement('div');
    petal.className = 'rose-petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.animationDuration = (5 + Math.random() * 6) + 's';
    petal.style.setProperty('--s', 0.4 + Math.random() * 0.8);
    // Sedikit variasi warna kelopak
    if(Math.random() > 0.5) petal.style.background = '#be123c';
    container.appendChild(petal);
  }
}

(function initDecorations() {
  // Confetti Page 1
  const cc = document.getElementById('confetti');
  const cColors = ['#fda4af','#fecdd3','#e11d48','#be123c'];
  for (let i = 0; i < 25; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const sz = 4 + Math.random() * 8;
    c.style.cssText = `background:${cColors[Math.floor(Math.random()*cColors.length)]};left:${Math.random()*100}%;top:-20px;width:${sz}px;height:${sz}px;border-radius:${Math.random()>.5?'50%':'2px'};opacity:${0.6+Math.random()*0.4};animation-duration:${3+Math.random()*4}s;animation-delay:${Math.random()*6}s;`;
    cc.appendChild(c);
  }

  // Bintang
  const starContainers = ['stars1', 'stars4'];
  starContainers.forEach(id => {
    const sc = document.getElementById(id);
    if(!sc) return;
    ['✦','✧','⋆','•'].forEach(ch => {
      for (let i = 0; i < 5; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.textContent = ch;
        s.style.cssText = `left:${Math.random()*95}%;top:${Math.random()*90}%;font-size:${8+Math.random()*14}px;animation-delay:${Math.random()*2}s;animation-duration:${1.5+Math.random()*2}s;`;
        sc.appendChild(s);
      }
    });
  });

  // Garis Surat Page 2
  const ll = document.getElementById('letterLines');
  for (let i = 0; i < 15; i++) {
    const line = document.createElement('div');
    line.className = 'letter-line';
    line.style.top = (60 + i * 28) + 'px';
    ll.appendChild(line);
  }
  
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date();
  document.getElementById('letterDate').textContent = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
})();

// --- ALBUM & BOKEH ---
let albumInited = false;
let currentFlip = 0;
const totalPages = 16;

function initAlbumPage() {
  if (albumInited) return;
  albumInited = true;

  // Bokeh Effect
  const bokehCont = document.getElementById('bokehContainer');
  for(let i=0; i<15; i++){
    let b = document.createElement('div');
    b.className = 'bokeh-particle';
    let size = 20 + Math.random()*40;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random()*100 + '%';
    b.style.top = Math.random()*100 + '%';
    b.style.animationDelay = (Math.random()*5) + 's';
    b.style.animationDuration = (4 + Math.random()*4) + 's';
    bokehCont.appendChild(b);
  }

  const intro = document.getElementById('flowerIntro');
  const content = document.getElementById('albumContent');
  setTimeout(() => {
    intro.style.opacity = '0';
    intro.style.pointerEvents = 'none';
    content.style.opacity = '1';
    content.style.pointerEvents = 'auto';
    updateBookPosition(); 
  }, 2500);

  const pages = document.querySelectorAll('.book-page');
  pages.forEach((p, i) => { p.style.zIndex = pages.length - i; });
}

function slideNext() {
  const pages = document.querySelectorAll('.book-page');
  if (currentFlip < pages.length) {
    pages[currentFlip].classList.add('flipped');
    pages[currentFlip].style.zIndex = currentFlip + 1;
    currentFlip++;
    updateBookPosition();
  }
}

function slidePrev() {
  const pages = document.querySelectorAll('.book-page');
  if (currentFlip > 0) {
    currentFlip--;
    pages[currentFlip].classList.remove('flipped');
    pages[currentFlip].style.zIndex = pages.length - currentFlip;
    updateBookPosition();
  }
}

function updateBookPosition() {
  const book = document.getElementById('flipbook');
  if (currentFlip === 0) book.style.transform = 'translateX(-50%)'; 
  else if (currentFlip === totalPages) book.style.transform = 'translateX(50%)'; 
  else book.style.transform = 'translateX(0)'; 
}

// Geser (Swipe) HP
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
document.addEventListener('touchend', e => {
  let touchEndX = e.changedTouches[0].screenX;
  if (document.getElementById('page3').classList.contains('active')) {
    if (touchStartX - touchEndX > 50) slideNext();
    if (touchEndX - touchStartX > 50) slidePrev();
  }
});

// --- HADIAH INTERAKTIF ---
function openGift() {
  const gc = document.getElementById('giftContainer');
  const gb = document.getElementById('giftBox');
  
  if (!gc.classList.contains('opened')) {
    gb.classList.add('shake');
    setTimeout(() => {
      gb.classList.remove('shake');
      gc.classList.add('opened');
      triggerGiftConfetti();
    }, 1000);
  }
}

function triggerGiftConfetti() {
  const page = document.getElementById('page4');
  const cColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const sz = 5 + Math.random() * 8;
    c.style.cssText = `background:${cColors[Math.floor(Math.random()*cColors.length)]};left:${30 + Math.random()*40}%;top:40%;width:${sz}px;height:${sz}px;border-radius:2px;opacity:1;animation: explodeConfetti ${2+Math.random()*2}s forwards cubic-bezier(0.1, 0.8, 0.3, 1);`;
    page.appendChild(c);
  }
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes explodeConfetti {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translate(calc((var(--rx, ${Math.random()}) - 0.5) * 400px), calc((var(--ry, ${Math.random()}) - 0.5) * 400px)) rotate(720deg) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);


// --- MUSIK PLAYER ---
let audioCtx = null;
let isPlaying = false;
let songInterval = null;

const notes = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25 };
const happyBirthdayMelody = [
  ['C4',0.75],['C4',0.25],['D4',1],['C4',1],['F4',1],['E4',2],
  ['C4',0.75],['C4',0.25],['D4',1],['C4',1],['G4',1],['F4',2],
  ['C4',0.75],['C4',0.25],['C5',1],['A4',1],['F4',1],['E4',1],['D4',2],
  ['B4',0.75],['B4',0.25],['A4',1],['F4',1],['G4',1],['F4',2],
];

function playNote(freq, startTime, duration, ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
  gain.gain.linearRampToValueAtTime(0.2, startTime + duration * 0.7);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);
  osc.start(startTime); osc.stop(startTime + duration + 0.05);
}

function playSong() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let t = audioCtx.currentTime + 0.1;
  const beatDur = 0.36;
  happyBirthdayMelody.forEach(([note, beats]) => {
    playNote(notes[note], t, beats * beatDur * 0.9, audioCtx);
    t += beats * beatDur;
  });
  return t - audioCtx.currentTime;
}

function toggleMusic() {
  const btn = document.getElementById('playBtn');
  const noteEl = document.getElementById('musicNote');
  const bar = document.getElementById('musicBar');

  if (isPlaying) {
    isPlaying = false; btn.textContent = '▶'; noteEl.classList.add('paused');
    clearInterval(songInterval); bar.style.width = '0%';
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
  } else {
    isPlaying = true; btn.textContent = '⏸'; noteEl.classList.remove('paused');
    const songDuration = playSong();
    const totalMs = songDuration * 1000;
    const startTime = Date.now();

    clearInterval(songInterval);
    songInterval = setInterval(() => {
      if (!isPlaying) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / totalMs) * 100, 100);
      bar.style.width = pct + '%';
      if (pct >= 100) {
        bar.style.width = '0%';
        if (audioCtx) { audioCtx.close(); audioCtx = null; }
        toggleMusic(); toggleMusic();
      }
    }, 100);
  }
}