// Renders the photo column from PHOTOS (photos.js) and runs a minimal lightbox.

const src = (p) => `https://www.flickr.com/photo_download.gne?id=${p.id}&secret=${p.secret}&size=l&source=photoPageEngagement`;
const page = (p) => `https://www.flickr.com/photos/flello/${p.id}`;

const PHOTOS = PHOTO_SETS[document.body.dataset.set] || [];
const list = document.getElementById('photos');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbLink = document.getElementById('lightbox-link');
let current = 0;

PHOTOS.forEach((photo, i) => {
  const img = document.createElement('img');
  img.src = src(photo);
  img.alt = '';
  img.loading = i < 2 ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.addEventListener('load', () => img.classList.add('loaded'));
  if (img.complete) img.classList.add('loaded');
  img.addEventListener('click', () => open(i));
  list.appendChild(img);
});

function show(i) {
  current = (i + PHOTOS.length) % PHOTOS.length;
  lbImg.src = src(PHOTOS[current]);
  lbLink.href = page(PHOTOS[current]);
}

function open(i) {
  show(i);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function close() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lbImg) close();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

