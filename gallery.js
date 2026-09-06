// Shared gallery + lightbox logic.
// Each page defines a global PHOTOS array before loading this script.

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
  if (!PHOTOS || PHOTOS.length === 0) {
    showStatus(typeof GALLERY_EMPTY_MSG !== 'undefined' ? GALLERY_EMPTY_MSG : 'No photos yet. Add URLs to the PHOTOS array in this page\'s script block.');
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
  if (photo.flickrURL) {
    lbTitle.innerHTML = (photo.title ? photo.title + ' — ' : '') +
      `<a href="${photo.flickrURL}" target="_blank" rel="noopener" style="color:inherit;opacity:0.6;font-size:0.75em">View on Flickr</a>`;
  } else {
    lbTitle.textContent = photo.title || '';
  }
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
