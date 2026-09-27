// =============================================================
// script.js
// Small, calm interactions only — nothing here is required for
// the letter to work, it just adds a couple of cute touches.
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------
  // INTRO -> LETTER
  // Clicking "Open" fades out the cover screen, reveals the
  // letter scene (which then runs its own fade-in animations),
  // and starts the background music.
  // -----------------------------------------------------------
  const intro = document.getElementById('intro');
  const openBtn = document.getElementById('openBtn');
  const letterScene = document.getElementById('letterScene');
  const bgm = document.getElementById('bgm');
  const musicToggle = document.getElementById('musicToggle');

  openBtn.addEventListener('click', () => {
    // play the song — this has to happen inside a click handler,
    // since browsers block audio that starts on its own
    bgm.volume = 0.5;
    bgm.play().catch(() => {
      // if the browser still blocks it, the music toggle button
      // lets Zianne start it manually
    });

    // fade the intro out, then remove it and show the letter
    intro.classList.add('intro--closing');
    setTimeout(() => {
      intro.classList.add('hidden');
      letterScene.classList.remove('hidden');
      musicToggle.classList.remove('hidden');
    }, 550);
  });

  // -----------------------------------------------------------
  // MUSIC ON/OFF TOGGLE
  // -----------------------------------------------------------
  musicToggle.addEventListener('click', () => {
    if (bgm.paused) {
      bgm.play();
      musicToggle.textContent = '🔈';
    } else {
      bgm.pause();
      musicToggle.textContent = '🔇';
    }
  });

  // -----------------------------------------------------------
  // Tiny heart-puff when a sticker is clicked/tapped.
  // Purely decorative — doesn't affect layout or content.
  // -----------------------------------------------------------
  const stickers = document.querySelectorAll('.sticker');

  stickers.forEach((sticker) => {
    sticker.style.cursor = 'pointer';
    sticker.addEventListener('click', (event) => {
      spawnHeartPuff(event.currentTarget);
    });
  });

  function spawnHeartPuff(el) {
    const puff = document.createElement('span');
    puff.className = 'heart-puff';
    puff.textContent = '♡';

    // Position the puff at the sticker's center, relative to
    // the nearest positioned ancestor (.composition).
    const parent = el.closest('.composition');
    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    puff.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
    puff.style.top = `${rect.top - parentRect.top + rect.height / 2}px`;

    parent.appendChild(puff);

    // Clean up after the animation finishes (0.9s, see style.css)
    setTimeout(() => puff.remove(), 900);
  }
});
