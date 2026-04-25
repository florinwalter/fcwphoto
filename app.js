// ─── Your photos ──────────────────────────────────────────────────────────────
// Add one entry per photo. Only 'src' is required; 'title' is optional.
//
// How to get the URL from Flickr:
//   1. Open a photo on Flickr
//   2. Click the download arrow (bottom right) → choose a size → right-click the
//      image → "Copy image address"
//   3. Paste the URL below.
//
const PHOTOS = [
  { src: 'https://www.flickr.com/photo_download.gne?id=55147933695&secret=9e5f83597d&size=l&source=photoPageEngagement', title: 'Mountains' },
  // { src: 'https://live.staticflickr.com/…/photo2_b.jpg', title: 'Sunset'    },
];
// ──────────────────────────────────────────────────────────────────────────────

const gallery  = document.getElementById('gallery');
const status   = document.getElementById('status');
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lightbox-img');
const lbTitle  = document.getElementById('lightbox-title');
const lbClose  = document.getElementById('lightbox-close');
const lbPrev   = document.getElementById('lightbox-prev');
const lbNext   = document.getElementById('lightbox-next');

let currentIndex = 0;

// ─── Render ───────────────────────────────────────────────────────────────────
function init() {
  if (PHOTOS.length === 0) {
    showStatus('Add your photo URLs to the PHOTOS array in app.js.');
    return;
  }

  PHOTOS.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.title || '';
    img.addEventListener('load', () => img.classList.add('loaded'));

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    if (photo.title) {
      const titleEl = document.createElement('span');
      titleEl.className = 'overlay-title';
      titleEl.textContent = photo.title;
      overlay.appendChild(titleEl);
    }

    item.appendChild(img);
    item.appendChild(overlay);
    item.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(item);
  });
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function openLightbox(index) {
  currentIndex = index;
  showPhoto(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

function showPhoto(index) {
  const photo = PHOTOS[index];
  lbImg.src = photo.src;
  lbImg.alt = photo.title || '';
  lbTitle.textContent = photo.title || '';
  lbPrev.style.visibility = index > 0 ? 'visible' : 'hidden';
  lbNext.style.visibility = index < PHOTOS.length - 1 ? 'visible' : 'hidden';
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => { if (currentIndex > 0) showPhoto(--currentIndex); });
lbNext.addEventListener('click', () => { if (currentIndex < PHOTOS.length - 1) showPhoto(++currentIndex); });

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  { if (currentIndex > 0) showPhoto(--currentIndex); }
  if (e.key === 'ArrowRight') { if (currentIndex < PHOTOS.length - 1) showPhoto(++currentIndex); }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showStatus(msg) {
  status.textContent = msg;
}

// ─── Init ─────────────────────────────────────────────────────────────────────
init();
