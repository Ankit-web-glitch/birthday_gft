// Extracted JavaScript from bday.html
// Login functionality
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginError = document.getElementById('loginError');

  // Set your desired username and password here
  const correctUsername = 'MANSI_PATEL';
  const correctPassword = '120619';

  if (username === correctUsername && password === correctPassword) {
    document.getElementById('loginPortal').style.display = 'none';
    document.getElementById('mainContent').classList.add('show');
    initializeGallery();
    // Try to play background audio (will only play after user interaction)
    const bgAudio = document.getElementById('bgAudio');
    if (bgAudio) {
      bgAudio.play().catch(() => {});
    }
  } else {
    loginError.style.display = 'block';
    document.getElementById('password').value = '';
  }
}

// Attach audio toggle once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const audioToggle = document.getElementById('audioToggle');
  const bgAudio = document.getElementById('bgAudio');
  if (audioToggle && bgAudio) {
    // reflect current state
    audioToggle.textContent = bgAudio.paused ? '🔈' : '🔊';
    audioToggle.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
        audioToggle.textContent = '🔊';
        audioToggle.setAttribute('aria-pressed', 'true');
      } else {
        bgAudio.pause();
        audioToggle.textContent = '🔈';
        audioToggle.setAttribute('aria-pressed', 'false');
      }
    });
  }
});

function initializeGallery() {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const revealSound = document.getElementById('revealSound');

  // Add click event to each image
  gallery.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  // Hide lightbox on click
  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // Initialize reveal cards
  const revealCards = document.querySelectorAll('.reveal-card');
  revealCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      if (revealSound) { revealSound.currentTime = 0; revealSound.play().catch(() => {}); }
    });

    // Also support touch/tap
    card.addEventListener('touchend', (e) => {
      e.preventDefault();
      card.classList.toggle('flipped');
      if (revealSound) { revealSound.currentTime = 0; revealSound.play().catch(() => {}); }
    });
  });
}
