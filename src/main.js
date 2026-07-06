const cards = document.querySelectorAll('.deck-card');
let active = 0;
let animating = false;

function getSlotClass(position) {
  return `deck-slot-${position}`;
}

function updateCards() {
  cards.forEach((card, i) => {
    const pos = (i - active + 3) % 3;
    card.className = `deck-card deck-card-${i} ${getSlotClass(pos)}`;
  });
}

document.getElementById('next-card').addEventListener('click', () => {
  if (animating) return;
  animating = true;

  const leaving = active;
  active = (active + 1) % 3;

  cards[leaving].className = `deck-card deck-card-${leaving} deck-leaving`;

  cards.forEach((card, i) => {
    if (i === leaving) return;
    const pos = (i - active + 3) % 3;
    card.className = `deck-card deck-card-${i} ${getSlotClass(pos)}`;
  });

  setTimeout(() => {
    cards[leaving].className = `deck-card deck-card-${leaving} deck-entering-back`;
    setTimeout(() => {
      cards[leaving].className = `deck-card deck-card-${leaving} deck-slot-2`;
      animating = false;
    }, 60);
  }, 480);
});

document.getElementById('prev-card').addEventListener('click', () => {
  if (animating) return;
  animating = true;

  const to = (active + 2) % 3;
  cards[to].className = `deck-card deck-card-${to} deck-entering-front`;

  setTimeout(() => {
    active = to;
    updateCards();
    setTimeout(() => {
      animating = false;
    }, 580);
  }, 60);
});
