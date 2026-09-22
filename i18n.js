const TRANSLATIONS = {
  en: {
    'nav.home':      'Home',
    'nav.portrait':  'Portrait',
    'nav.stills':    'Stills',
    'nav.about':     'About',
    'nav.contact':   'Contact',

    'home.tagline':  'Select a category to explore',

    'about.heading': 'About',
    'about.body':    'Write something about yourself here.',

    'contact.heading': 'Contact',
    'contact.intro':   'Get in touch at',

    'gallery.empty': 'No photos yet. Add URLs to the PHOTOS array in this page\'s script block.',
  },
  de: {
    'nav.home':      'Start',
    'nav.portrait':  'Portrait',
    'nav.stills':    'Stills',
    'nav.about':     'Über mich',
    'nav.contact':   'Kontakt',

    'home.tagline':  'Kategorie auswählen',

    'about.heading': 'Über mich',
    'about.body':    'Schreib hier etwas über dich.',

    'contact.heading': 'Kontakt',
    'contact.intro':   'Schreib mir an',

    'gallery.empty': 'Noch keine Fotos. URLs zum PHOTOS-Array im Script-Block dieser Seite hinzufügen.',
  },
};

// _lang is the authoritative language for the current page.
// It is set once on load and only changes when the user explicitly clicks a button.
let _lang = 'en';

function t(key) {
  return (TRANSLATIONS[_lang] || {})[key] || key;
}

function applyLang(lang) {
  _lang = lang;
  const strings = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key] !== undefined) el.textContent = strings[key];
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.setAttribute('aria-current', btn.dataset.lang === lang ? 'true' : 'false');
  });
}

function saveLang(lang) {
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

function initI18n() {
  // Determine initial language: URL param takes priority (set by a previous page's
  // link), then localStorage, then default 'en'.
  const urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang && TRANSLATIONS[urlLang]) {
    _lang = urlLang;
    saveLang(urlLang);
  } else {
    try { _lang = localStorage.getItem('lang') || 'en'; } catch (e) { _lang = 'en'; }
  }

  applyLang(_lang);

  // Language buttons update _lang immediately — no page reload needed.
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.dataset.lang);
      saveLang(btn.dataset.lang);
    });
  });

  // Intercept internal link clicks to carry the current language to the next page.
  // Using _lang (not re-reading the URL) ensures a button click to EN is respected
  // even when the current URL still contains ?lang=de.
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    if (_lang === 'en') return; // default language — no param needed

    e.preventDefault();
    try {
      const url = new URL(href, location.href);
      url.searchParams.set('lang', _lang);
      location.href = url.href;
    } catch (e2) {}
  });
}

initI18n();
