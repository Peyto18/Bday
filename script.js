// =============================================================
// script.js
// Small, calm interactions only — nothing here is required for
// the letter to work, it just adds a couple of cute touches.
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
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
