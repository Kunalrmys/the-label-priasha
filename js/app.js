
const WHATSAPP = "919066163950";
const PHONE = "+919066163950";

const fallbackSite = {
  email: "hello@thelabelpriasha.com",
  instagram: "",
  facebook: "",
  about: {
    title: "The Label Priasha by Priya",
    intro: "The Label Priasha by Priya is rooted in slow fashion and the beauty of handcrafted textiles.",
    paragraphs: [
      "Each piece is thoughtfully designed with an appreciation for traditional techniques, beautiful fabrics and the hands behind the craft.",
      "The label celebrates clothing that feels personal rather than disposable — pieces made to be worn, loved, restyled and remembered.",
      "From everyday silhouettes to customized designer pieces, Priya works closely with clients to create clothing that reflects their individuality."
    ],
    values: [
      ["Slow fashion", "Thoughtful collections over fast trends, with an emphasis on longevity and intentional buying."],
      ["Handcrafted detail", "A love for textiles, texture and the small details that make a garment feel special."],
      ["Personal design", "Customization and personal conversations are part of the experience — from concept to final piece."]
    ]
  }
};

let DATA = {products: [], lookbook: [], testimonials: [], site: fallbackSite};

async function loadData() {
  try {
    const [products, lookbook, testimonials, site] = await Promise.all([
      fetch("content/products.json").then(r => r.json()),
      fetch("content/lookbook.json").then(r => r.json()),
      fetch("content/testimonials.json").then(r => r.json()),
      fetch("content/site.json").then(r => r.json())
    ]);
    DATA = {products, lookbook, testimonials, site};
  } catch (err) {
    console.warn("CMS data could not be loaded; using fallback content.", err);
  }
}

function whatsappUrl(productTitle = "") {
  const message = productTitle
    ? `Hi, I went through your website and I am interested in this product. Product name: ${productTitle}`
    : "Hi, I went through your website and I would like to enquire.";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function productCard(p) {
  const tags = (p.tags || []).slice(0, 3).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
  return `
    <article class="product-card">
      <a href="product.html?slug=${encodeURIComponent(p.slug)}" aria-label="View ${escapeHtml(p.title)}">
        <div class="product-image-wrap">
          <img class="product-image" src="${escapeAttr(p.images?.[0] || "")}" alt="${escapeAttr(p.title)}" loading="lazy" decoding="async">
        </div>
      </a>
      <div class="product-body">
        <div class="section-kicker">${escapeHtml(p.category || "Collection")}</div>
        <h3 class="product-title">${escapeHtml(p.title)}</h3>
        <p class="product-desc">${escapeHtml(p.short_description || "")}</p>
        <div class="price">${escapeHtml(p.price_range || "Enquire for price")}</div>
        <div class="tags">${tags}</div>
        <div class="card-actions">
          <a class="btn btn-primary" target="_blank" rel="noopener" href="${whatsappUrl(p.title)}">Buy Now</a>
          <a class="btn btn-dark" href="tel:${PHONE}">Call Now</a>
        </div>
      </div>
    </article>`;
}

function header() {
  const path = location.pathname.split("/").pop() || "index.html";
  const category = new URLSearchParams(location.search).get("category");
  const nav = [
    ["index.html", "Home"],
    ["category.html?category=Dresses", "Shop"],
    ["about.html", "About"],
    ["lookbook.html", "Lookbook"],
    ["contact.html", "Contact"]
  ];
  document.querySelector("[data-site-header]").innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="nav container">
      <a class="logo" href="index.html" aria-label="Priasha by Priya – Home">
        <svg class="logo-mark" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <rect width="44" height="44" rx="8" fill="#4a1033"/>
          <!-- P letterform -->
          <text x="9" y="24" font-family="Georgia,serif" font-size="18" font-weight="700" fill="#fff">P</text>
          <!-- आ Devanagari -->
          <text x="11" y="38" font-family="'Noto Sans Devanagari',sans-serif" font-size="16" font-weight="700" fill="#fff">आ</text>
        </svg>
        <span class="logo-wordmark">
          <span class="logo-pri">Pri</span><span class="logo-aa">आशा</span>
          <small>by Priya</small>
        </span>
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links">Menu</button>
      <nav class="nav-links" id="nav-links" aria-label="Main navigation">
        ${nav.map(([href,label]) => `<a href="${href}" ${((href.startsWith("category") && category) || path === href) ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
    </div>`;
  const toggle = document.querySelector(".nav-toggle");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    document.querySelector(".nav-links").classList.toggle("open", !open);
  });
}

function footer() {
  const s = DATA.site || fallbackSite;
  const socials = [
    s.instagram ? `<a href="${escapeAttr(s.instagram)}" target="_blank" rel="noopener">Instagram</a>` : "",
    s.facebook ? `<a href="${escapeAttr(s.facebook)}" target="_blank" rel="noopener">Facebook</a>` : ""
  ].join("");
  document.querySelector("[data-site-footer]").innerHTML = `
    <div class="container footer-grid">
      <div><div class="footer-brand">Pri<span class="footer-brand-aa">आशा</span> <span class="footer-brand-sub">by Priya</span></div><p>Slow fashion. Handcrafted textiles. Thoughtful design.</p></div>
      <div><div class="section-kicker">Explore</div><div class="footer-links">
        <a href="category.html?category=Dresses">Dresses</a><a href="category.html?category=Sarees">Sarees</a>
        <a href="category.html?category=Kaftan">Kaftan</a><a href="category.html?category=Kurtis">Kurtis</a>
        <a href="category.html?category=Crochet">Crochet</a>
        <a href="category.html?category=Designer%20Customized">Customized</a>
      </div></div>
      <div><div class="section-kicker">Contact</div><div class="footer-links">
        <a href="${whatsappUrl()}">WhatsApp</a><a href="tel:${PHONE}">+91 90661 63950</a>
        <a href="mailto:${escapeAttr(s.email)}">${escapeHtml(s.email)}</a>${socials}
      </div></div>
    </div>
    <div class="container footer-bottom">© ${new Date().getFullYear()} The Label Priasha by Priya. All rights reserved.</div>
    <div class="mobile-bottom-bar"><a class="btn btn-primary" href="${whatsappUrl()}" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-dark" href="tel:${PHONE}">Call</a></div>`;
}

function renderFeatured() {
  const el = document.querySelector("[data-featured-products]");
  if (!el) return;
  const featured = DATA.products.filter(p => p.featured);
  el.innerHTML = (featured.length ? featured : DATA.products).slice(0, 6).map(productCard).join("");
}

const categoryDescriptions = {
  Dresses: "Easy, expressive silhouettes made with beautiful fabrics and thoughtful details.",
  Sarees: "Elegant drapes and textile stories for celebrations, occasions and everyday grace.",
  Kaftan: "Fluid, breezy silhouettes made for effortless movement and relaxed elegance.",
  Kurtis: "Versatile handcrafted separates designed for comfort, movement and personal style.",
  Crochet: "Textured handmade pieces that bring craft and character to your wardrobe.",
  Designer_Customized: "Personalized creations developed around your measurements, mood and occasion.",
  Lookbook: "A visual collection of the label's styling, details and seasonal stories."
};

function renderCategory() {
  const grid = document.querySelector("[data-category-products]");
  if (!grid) return;
  const categories = ["Dresses","Sarees","Kaftan","Kurtis","Crochet","Designer Customized"];
  const requested = new URLSearchParams(location.search).get("category") || "Dresses";
  const selected = categories.includes(requested) ? requested : "Dresses";
  const title = document.querySelector("[data-category-title]");
  const intro = document.querySelector("[data-category-intro]");
  if (title) title.textContent = selected;
  if (intro) intro.textContent = categoryDescriptions[selected.replace(" ","_")] || "Explore handcrafted pieces created with intention.";
  document.title = `${selected} | The Label Priasha by Priya`;
  document.querySelector("[data-category-filter]").innerHTML =
    categories.map(c => `<a class="${c === selected ? "active" : ""}" href="category.html?category=${encodeURIComponent(c)}">${escapeHtml(c)}</a>`).join("");
  const items = DATA.products.filter(p => p.category === selected);
  grid.innerHTML = items.map(productCard).join("");
  document.querySelector("[data-empty-state]").hidden = items.length > 0;
}

function renderLookbook() {
  const preview = document.querySelector("[data-lookbook-preview]");
  const grid = document.querySelector("[data-lookbook-grid]");
  const items = DATA.lookbook || [];
  const markup = items.map((item, i) => `
    <a class="lookbook-item" href="lookbook.html" aria-label="${escapeAttr(item.alt || "Lookbook image")}">
      <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.alt || "Lookbook image")}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async">
    </a>`).join("");
  if (preview) preview.innerHTML = items.slice(0,4).map((item,i)=>`
    <a class="lookbook-item" href="lookbook.html"><img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.alt || "Lookbook image")}" loading="lazy"></a>`).join("");
  if (grid) grid.innerHTML = markup;
}

function renderTestimonials() {
  const el = document.querySelector("[data-testimonials]");
  if (!el) return;
  el.innerHTML = DATA.testimonials.slice(0,3).map(t => `
    <article class="testimonial"><blockquote>“${escapeHtml(t.quote)}”</blockquote><cite>— ${escapeHtml(t.name)}</cite></article>
  `).join("");
}

function renderAbout() {
  const el = document.querySelector("[data-about-page]");
  if (!el) return;
  const a = DATA.site?.about || fallbackSite.about;
  el.innerHTML = `
    <div class="about-image"><img src="https://images.unsplash.com/photo-1536867520774-5b4f2628a69b?auto=format&fit=crop&w=1200&q=82" alt="Tape measure and scissors, the maker's tools" loading="lazy"></div>
    <div class="section-kicker">The label</div>
    <h2>${escapeHtml(a.title || "The Label Priasha by Priya")}</h2>
    <p>${escapeHtml(a.intro || "")}</p>
    ${(a.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join("")}
    <div class="value-grid">${(a.values || []).map(v => `<article class="value-card"><div class="section-kicker">${escapeHtml(v.name || v[0] || "")}</div><p>${escapeHtml(v.description || v[1] || "")}</p></article>`).join("")}</div>`;
}

function renderProduct() {
  const el = document.querySelector("[data-product-detail]");
  if (!el) return;
  const slug = new URLSearchParams(location.search).get("slug");
  const p = DATA.products.find(x => x.slug === slug);
  if (!p) { el.innerHTML = `<div class="empty-state"><h1>Piece not found</h1><a class="text-link" href="category.html?category=Dresses">Browse the collection →</a></div>`; return; }
  document.title = `${p.title} | The Label Priasha by Priya`;
  const images = p.images || [];
  el.innerHTML = `
    <div class="detail-grid">
      <div>
        <img class="detail-main-image" id="detail-main-image" src="${escapeAttr(images[0] || "")}" alt="${escapeAttr(p.title)}">
        <div class="detail-thumbs">${images.map((src,i)=>`<img class="detail-thumb ${i===0?"active":""}" src="${escapeAttr(src)}" alt="${escapeAttr(p.title)} view ${i+1}" data-detail-src="${escapeAttr(src)}">`).join("")}</div>
      </div>
      <div class="detail-copy">
        <div class="section-kicker">${escapeHtml(p.category || "")}</div>
        <h1>${escapeHtml(p.title)}</h1>
        <div class="price">${escapeHtml(p.price_range || "Enquire for price")}</div>
        <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
        <p>${escapeHtml(p.long_description || p.short_description || "")}</p>
        ${p.notes ? `<div class="notes"><strong>Notes</strong><br>${escapeHtml(p.notes)}</div>` : ""}
        <div class="hero-actions"><a class="btn btn-primary" href="${whatsappUrl(p.title)}" target="_blank" rel="noopener">Buy Now on WhatsApp</a><a class="btn btn-dark" href="tel:${PHONE}">Call Now</a></div>
      </div>
    </div>`;
  document.querySelectorAll("[data-detail-src]").forEach(t => t.addEventListener("click", () => {
    document.querySelector("#detail-main-image").src = t.dataset.detailSrc;
    document.querySelectorAll(".detail-thumb").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
  }));
  const schema = {
    "@context":"https://schema.org","@type":"Product","name":p.title,
    "description":p.long_description || p.short_description || "",
    "image":images,"brand":{"@type":"Brand","name":"The Label Priasha by Priya"}
  };
  const s = document.createElement("script"); s.type="application/ld+json"; s.textContent=JSON.stringify(schema); document.head.appendChild(s);
}

function applySiteMeta() {
  const email = DATA.site?.email || fallbackSite.email;
  document.querySelectorAll("[data-contact-email]").forEach(e => e.textContent = email);
  document.querySelectorAll("[data-email-link]").forEach(e => e.href = `mailto:${email}`);
}

function escapeHtml(v=""){ return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function escapeAttr(v=""){ return escapeHtml(v); }

async function init(){
  await loadData();
  header(); footer(); applySiteMeta();
  renderFeatured(); renderCategory(); renderLookbook(); renderTestimonials(); renderAbout(); renderProduct();
}
init();
