// Shared header, footer and product data for the draft. In Shopify these become
// the header/footer sections and real products; this just lets the pages click through.

const PHOTO = (n) => `assets/photos/${n}.jpg`;
const DOTS = [1, 2, 3, 4, 5].map((n) => `assets/dots/dot-${n}.svg`);

// Placeholder products: names, prices, photos and sold status are stand-ins until Kenzie's listings are in.
const PRODUCTS = [
  { slug: 'the-eye', name: 'The Eye', series: 'Bugs', price: 185, img: ['held-wide', 'sweater-dots', 'hero-main', 'eye-two-bags'], tag: 'New' },
  { slug: 'spot-check', name: 'Spot Check', series: 'Dots', price: 165, img: ['face-dots', 'wine-dots', 'mg-dotset'], tag: 'New' },
  { slug: 'window-pane', name: 'Window Pane', series: 'Color', price: 195, img: ['plaid-hold', 'plaid-stack', 'green-wall', 'orange-wall'], tag: 'New' },
  { slug: 'swirl-no-4', name: 'Swirl No. 4', series: 'Bugs', price: 185, img: ['bag-swirl', 'two-hands', 'held-wide-2'] },
  { slug: 'neon-pillow', name: 'Neon Pillow', series: 'Color', price: 175, img: ['walking', 'neon-hold'] },
  { slug: 'big-stack', name: 'Big Stack', series: 'Color', price: 210, img: ['hero-stack', 'mg-holding'], sold: true },
  { slug: 'wave', name: 'Wave', series: 'Bugs', price: 185, img: ['held-wide-2', 'two-hands', 'hero-wide'] },
  { slug: 'plaid-again', name: 'Plaid Again', series: 'Color', price: 195, img: ['green-wall', 'orange-wall', 'plaid-stack'], sold: true },
];
const productUrl = (p) => `product.html?p=${p.slug}`;

const page = document.body.dataset.page;
const money = (n) => `$${n}`;

// ── Header ──────────────────────────────────────────────
const NAV = [['shop.html', 'Shop'], ['about.html', 'About'], ['contact.html', 'Contact']];

document.querySelector('[data-header]').outerHTML = `
  <div class="announce"><a href="popup.html">Pop-up in Austin · Saturday, Dec 5</a></div>
  <header class="site-header">
    <a class="logo mark-greck" href="index.html" aria-label="GRECK home"></a>
    <nav class="nav" id="nav" aria-label="Main">
      ${NAV.map(([href, label]) => `<a href="${href}"${href.startsWith(page === 'product' ? 'shop' : page) ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
    </nav>
    <div class="header-end">
      <button class="bag-btn" type="button" aria-controls="bag">Bag (<span class="bag-count">0</span>)</button>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    </div>
  </header>`;

// ── Signup + footer ─────────────────────────────────────
document.querySelector('[data-footer]').outerHTML = `
  <footer class="site-footer">
    <div class="footer-signup">
      <p class="footer-lede">Be first to the next drop. There's only ever one of each.</p>
      <form class="signup-form" novalidate>
        <label class="sr-only" for="signup-first">First name</label>
        <input id="signup-first" placeholder="First name" autocomplete="given-name">
        <label class="sr-only" for="signup-email">Email address</label>
        <input id="signup-email" type="email" placeholder="Email address" autocomplete="email" required>
        <button class="link-cta" type="submit">Subscribe</button>
      </form>
      <p class="form-note" role="status" aria-live="polite"></p>
    </div>
    <div>
      <h3>Customer care</h3>
      <ul><li><a href="contact.html">Contact</a></li><li><a href="care.html">Care + FAQ</a></li><li><a href="care.html#care">Bag care</a></li><li><a href="care.html#shipping">Shipping</a></li><li><a href="care.html#returns">Returns</a></li></ul>
    </div>
    <div>
      <h3>About</h3>
      <ul><li><a href="about.html">Our story</a></li><li><a href="shop.html">The series</a></li><li><a href="popup.html">Pop-ups</a></li></ul>
    </div>
    <div>
      <h3>Follow</h3>
      <ul><li><a href="https://www.instagram.com/greckdotcom/" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://www.depop.com/greckbags/" target="_blank" rel="noopener">Depop</a></li><li><a href="mailto:greck.inquiry@gmail.com">Email</a></li></ul>
    </div>
    <div class="footer-base">
      <a class="footer-mark mark-greck" href="index.html" aria-label="GRECK home"></a>
      <span>© 2026 GRECK · Houston, Texas · Howelln Web Design</span>
    </div>
  </footer>`;

// ── Product cards ───────────────────────────────────────
const card = (p) => `
  <article class="card${p.sold ? ' is-sold' : ''}" data-slug="${p.slug}" data-series="${p.series.toLowerCase()}" data-sold="${!!p.sold}">
    <div class="card-media">
      ${p.sold ? '<span class="card-tag">Sold</span>' : p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
      <a class="card-link" href="${productUrl(p)}" aria-label="${p.name}"></a>
      <img src="${PHOTO(p.img[0])}" alt="${p.name}, a hand-painted GRECK bag" loading="lazy">
      <img src="${PHOTO(p.img[1])}" alt="" loading="lazy">
      ${p.sold ? '' : '<button class="card-add" type="button">Add to bag</button>'}
    </div>
    <div class="card-meta">
      <div><p class="card-name"><a href="${productUrl(p)}">${p.name}</a></p><p class="card-series">${p.series} · One of one</p></div>
      <p class="card-price">${p.sold ? 'Sold' : money(p.price)}</p>
    </div>
  </article>`;

// ── Product page ────────────────────────────────────────
const pdp = document.querySelector('[data-pdp]');
const current = pdp && (PRODUCTS.find((p) => p.slug === new URLSearchParams(location.search).get('p')) || PRODUCTS[0]);
if (current) {
  const p = current;
  document.title = `${p.name} · GRECK`;
  pdp.outerHTML = `
    <section class="pdp" data-slug="${p.slug}">
      <div class="pdp-gallery">
        ${p.img.map((n, i) => `<figure class="pdp-shot" data-i="${i + 1}"><img src="${PHOTO(n)}" alt="${i ? '' : `${p.name}, a hand-painted GRECK bag from the ${p.series} series`}"${i ? ' loading="lazy"' : ' fetchpriority="high"'}></figure>`).join('')}
        <p class="pdp-count"><span>1</span> of ${p.img.length}</p>
      </div>
      <div class="pdp-info">
        <div class="pdp-sticky">
          <p class="pdp-crumb"><a href="shop.html">Shop</a> / <a href="shop.html#${p.series.toLowerCase()}">${p.series}</a></p>
          <h1 class="pdp-name">${p.name}</h1>
          <p class="pdp-sub">${p.series} series · One of one</p>
          <p class="pdp-price">${p.sold ? 'Sold' : money(p.price)}</p>
          ${p.sold
            ? '<button class="btn pdp-add" type="button" disabled>Sold</button><p class="pdp-note">This one found its home. <a href="#more">See what\'s still here</a>.</p>'
            : '<button class="btn pdp-add" type="button">Add to bag</button><p class="pdp-note">Only one made. When it\'s gone, it\'s gone.</p>'}
          <div class="pdp-more">
            <details>
              <summary>Details</summary>
              <p>Hand-sewn and hand-painted by MacKenzie in acrylic paint and marker. The bag in the photos is the exact bag you'll get.</p>
              <p class="tbc">Kenzie to add size, closure, strap and lining details.</p>
            </details>
            <details>
              <summary>Shipping + returns</summary>
              <p class="tbc">Kenzie to confirm processing time, carrier and returns policy.</p>
              <p><a href="care.html#shipping">Read the FAQ</a></p>
            </details>
            <details>
              <summary>Aftercare</summary>
              <p>Made to be lived in. Keep it out of long stretches of direct sun and away from excess heat (hot cars count). Don't machine wash; spot clean gently with a damp cloth if needed.</p>
              <p><a href="care.html#care">Full care guide</a></p>
            </details>
          </div>
        </div>
      </div>
    </section>`;

  const counter = document.querySelector('.pdp-count span');
  const shots = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) counter.textContent = e.target.dataset.i;
  }, { threshold: 0.55 });
  document.querySelectorAll('.pdp-shot').forEach((f) => shots.observe(f));
  // On phones the photos swipe sideways instead.
  const gallery = document.querySelector('.pdp-gallery');
  gallery.addEventListener('scroll', () => {
    if (gallery.scrollWidth > gallery.clientWidth) counter.textContent = Math.round(gallery.scrollLeft / gallery.clientWidth) + 1;
  }, { passive: true });
}

document.querySelectorAll('[data-products]').forEach((el) => {
  const n = Number(el.dataset.products) || PRODUCTS.length;
  const list = PRODUCTS.filter((p) => p !== current && !(current && p.sold));
  el.insertAdjacentHTML('afterbegin', list.slice(0, n).map(card).join(''));
});

// ── Bag ─────────────────────────────────────────────────
// Slide-out bag. Kept in this browser so it follows you between pages; in Shopify the
// cart does this and CHECKOUT goes to Shopify's checkout. Every bag is one of one, so no quantities.
const BAG_KEY = 'greck-bag';
const readBag = () => {
  try { return (JSON.parse(localStorage.getItem(BAG_KEY)) || []).filter((slug) => PRODUCTS.some((p) => p.slug === slug && !p.sold)); }
  catch { return []; }
};
let bag = readBag();
const saveBag = () => { try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch {} };

document.body.insertAdjacentHTML('beforeend', `
  <div class="bag-scrim" hidden></div>
  <aside class="bag-drawer" id="bag" role="dialog" aria-modal="true" aria-labelledby="bag-title" hidden>
    <div class="bag-head">
      <h2 id="bag-title">Your bag (<span class="bag-n">0</span>)</h2>
      <button class="bag-close" type="button">Close</button>
    </div>
    <div class="bag-items"></div>
    <div class="bag-foot">
      <p class="bag-total"><span>Subtotal</span><span class="bag-sum">$0</span></p>
      <p class="bag-fine">Shipping and taxes calculated at checkout. Every bag is one of one, so it isn't held until you check out.</p>
      <button class="btn bag-checkout" type="button">Checkout</button>
      <p class="bag-fine bag-draft" hidden>Draft only: in the live store this opens Shopify checkout.</p>
    </div>
  </aside>`);

const drawer = document.getElementById('bag');
const scrim = document.querySelector('.bag-scrim');
const count = document.querySelector('.bag-count');
let opener = null;

const renderBag = () => {
  const items = bag.map((slug) => PRODUCTS.find((p) => p.slug === slug));
  count.textContent = items.length;
  drawer.querySelector('.bag-n').textContent = items.length;
  drawer.querySelector('.bag-sum').textContent = money(items.reduce((t, p) => t + p.price, 0));
  drawer.querySelector('.bag-foot').hidden = !items.length;
  drawer.querySelector('.bag-items').innerHTML = items.length
    ? items.map((p) => `
      <div class="bag-item">
        <a class="bag-thumb" href="${productUrl(p)}"><img src="${PHOTO(p.img[0])}" alt=""></a>
        <div class="bag-info">
          <p class="bag-name"><a href="${productUrl(p)}">${p.name}</a></p>
          <p class="bag-meta">${p.series} · One of one</p>
          <button class="bag-remove" type="button" data-slug="${p.slug}">Remove</button>
        </div>
        <p class="bag-price">${money(p.price)}</p>
      </div>`).join('')
    : `<div class="bag-empty"><p>Your bag is empty.</p><a class="link-cta" href="shop.html">Shop the drop</a></div>`;
  // Bags already in the bag say so on every page.
  document.querySelectorAll('.card, .pdp').forEach((el) => {
    const btn = el.querySelector('.card-add, .pdp-add');
    if (!btn || btn.disabled) return;
    const inBag = bag.includes(el.dataset.slug);
    btn.classList.toggle('is-added', inBag);
    btn.textContent = inBag ? 'In your bag' : 'Add to bag';
  });
};

const openBag = () => {
  opener = document.activeElement;
  scrim.hidden = drawer.hidden = false;
  requestAnimationFrame(() => document.body.classList.add('bag-open'));
  drawer.querySelector('.bag-close').focus();
};
const closeBag = () => {
  document.body.classList.remove('bag-open');
  setTimeout(() => { scrim.hidden = drawer.hidden = true; }, 400);
  opener?.focus();
};

document.addEventListener('click', (e) => {
  const add = e.target.closest('.card-add, .pdp-add');
  if (add && !add.disabled) {
    const slug = add.closest('[data-slug]').dataset.slug;
    if (!bag.includes(slug)) {
      bag.push(slug); saveBag(); renderBag();
      count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
    }
    openBag();
    return;
  }
  const remove = e.target.closest('.bag-remove');
  if (remove) { bag = bag.filter((s) => s !== remove.dataset.slug); saveBag(); renderBag(); return; }
  if (e.target.closest('.bag-btn')) { openBag(); return; }
  if (e.target.closest('.bag-close') || e.target === scrim) { closeBag(); return; }
  if (e.target.closest('.bag-checkout')) drawer.querySelector('.bag-draft').hidden = false;
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) closeBag(); });
addEventListener('storage', (e) => { if (e.key === BAG_KEY) { bag = readBag(); renderBag(); } });
renderBag();

// ── Shop filters ────────────────────────────────────────
const chips = document.querySelectorAll('.chip');
if (chips.length) {
  const cards = [...document.querySelectorAll('.shop-grid .card')];
  const total = document.querySelector('.shop-count');
  const apply = (f) => {
    chips.forEach((c) => c.classList.toggle('is-on', c.dataset.filter === f));
    let shown = 0;
    cards.forEach((c) => {
      const show = f === 'all' || (f === 'available' ? c.dataset.sold === 'false' : c.dataset.series === f);
      c.hidden = !show; shown += show;
    });
    total.textContent = `${shown} bag${shown === 1 ? '' : 's'}`;
  };
  chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter)));
  const fromHash = location.hash.slice(1);
  apply([...chips].some((c) => c.dataset.filter === fromHash) ? fromHash : 'all');
}

// ── Forms (draft: no sending yet) ───────────────────────
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.parentElement.querySelector('.form-note');
    if (!form.checkValidity()) { note.textContent = 'Check the highlighted fields.'; form.reportValidity(); return; }
    note.textContent = form.classList.contains('signup-form')
      ? "You're on the list. We'll be in touch."
      : 'Thanks! Kenzie will get back to you soon.';
    form.reset();
  });
});

// ── Header behavior ─────────────────────────────────────
const menu = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
const onScroll = () => header.classList.toggle('is-over',
  !!hero && !nav.classList.contains('is-open') && scrollY < hero.offsetHeight - header.offsetHeight);
addEventListener('scroll', onScroll, { passive: true });

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? 'Close' : 'Menu';
  onScroll();
});
onScroll();

// ── About: pinned section menu follows the panel in view ─
const storyLinks = [...document.querySelectorAll('.story-nav a')];
if (storyLinks.length) {
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      storyLinks.forEach((a) => a.classList.toggle('is-on', a.hash === `#${e.target.id}`));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.story-panel').forEach((p) => spy.observe(p));
}

// ── Reveal on scroll ────────────────────────────────────
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
