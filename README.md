# The Label Priasha by Priya — static showcase site

A lightweight, mobile-first fashion showcase built with plain HTML, CSS and JavaScript.

## Included

- Homepage with hero, story, featured products, lookbook and testimonials
- Category catalog for Dresses, Sarees, Kurtis, Crochet and Designer Customized
- Reusable product cards
- Product detail pages with image thumbnails
- WhatsApp "Buy Now" links with the product title pre-filled
- Direct phone "Call Now" links
- About, Lookbook and Contact pages
- Decap CMS (formerly Netlify CMS) configuration
- JSON content files that are easy for a non-technical owner to edit through the CMS
- Lazy-loaded images, semantic HTML, responsive layout and basic Product JSON-LD
- No payment gateway or checkout

## Folder structure

```text
/
├── index.html
├── category.html
├── product.html
├── about.html
├── lookbook.html
├── contact.html
├── admin/
│   ├── index.html
│   └── config.yml
├── content/
│   ├── products.json
│   ├── lookbook.json
│   ├── testimonials.json
│   └── site.json
├── css/style.css
├── js/app.js
└── images/uploads/
```

## Recommended deployment: Netlify + GitHub + Decap CMS

This is the easiest path for Priya because the CMS can commit edits to the GitHub repository and Netlify can automatically publish the changes.

### 1. Create the GitHub repository

Create a repository such as:

`the-label-priasha`

Upload the contents of this folder to the repository's `main` branch.

### 2. Connect the repository to Netlify

In Netlify, import the GitHub repository.

Build command: leave blank.

Publish directory: `/`

The site is completely static, so there is no Node/React build step.

### 3. Configure CMS authentication

The supplied `admin/config.yml` uses the Decap GitHub backend.

Replace:

`YOUR_GITHUB_USERNAME/the-label-priasha`

with the actual GitHub repository.

For GitHub authentication, use an OAuth provider supported by Decap CMS. The exact provider setup depends on the deployment/authentication service you choose; keep the OAuth client secret server-side and never place it in `config.yml`.

For a simpler owner experience, Netlify-hosted OAuth/authentication can be used if available in the chosen Netlify/Decap setup. Do not commit OAuth client secrets to GitHub.

### 4. Open the CMS

After deployment:

`https://YOUR-SITE.netlify.app/admin/`

Priya signs in through the configured authentication provider. No custom backend or password database is required.

## Important CMS note

Decap CMS is the maintained successor to Netlify CMS. The admin UI is still a static `/admin/` page, while edits are committed to the repository.

The site reads:

- `content/products.json`
- `content/lookbook.json`
- `content/testimonials.json`
- `content/site.json`

After a CMS change is committed, Netlify automatically republishes the updated static files.

## How Priya adds a product

1. Open `/admin/`.
2. Sign in.
3. Open **Products → Product catalog**.
4. Add or edit a product.
5. Upload one or more images.
6. Enter title, slug, category, price range, description, tags and notes.
7. Toggle **Featured** if it should appear on the homepage.
8. Publish the change.
9. Netlify republishes the site automatically.

### Product fields

- Title
- Slug
- Category
- Images
- Price range
- Short description
- Long description
- Tags
- Notes
- Featured

## How to edit About/contact/testimonials

Open `/admin/`:

- **Site content** → About, email and social links
- **Testimonials** → client quotes
- **Lookbook** → gallery images and alt text

## WhatsApp / phone

All product buttons use:

`https://wa.me/919066163950`

with an automatically encoded message containing the product title.

Calls use:

`tel:+919066163950`

No checkout or payment gateway is implemented.

## Image recommendations

For the best speed:

- Prefer WebP or AVIF where possible.
- Product images: roughly 1200–1600px on the long edge.
- Keep individual images around 150–300 KB when practical.
- Use descriptive alt text.
- The CMS upload folder is `images/uploads/`.

The sample site currently uses Unsplash image URLs so the demo works immediately. Replace these with Priya's own licensed/product photography before launch.

## SEO launch checklist

- Replace the sample email/social links in `content/site.json`.
- Add the real domain to Search Console.
- Add a real favicon.
- Replace sample image URLs with brand photography.
- Add real social profile URLs.
- Confirm the final brand description.
- Test every WhatsApp and phone CTA.
- Test keyboard navigation and mobile layouts.

## GitHub Pages alternative

The static frontend can also run on GitHub Pages, but the CMS authentication flow is less convenient. For this project, Netlify + GitHub is recommended because it provides a simple continuous deployment workflow.

## Maintenance

The owner should normally use `/admin/` rather than editing code.

Developers only need to edit:

- `css/style.css` for visual changes
- `js/app.js` for behavior
- HTML pages for structural changes
- `admin/config.yml` when changing CMS fields


## Visual refresh
The latest version includes a more editorial fashion direction: oversized serif typography, an asymmetric collection gallery, a textile/atelier feature section, stronger mobile presentation, hover motion, a trust ribbon, and curated fashion imagery. The remote Unsplash images are intended as starter/demo imagery; replace them with Priya's own campaign/product photography before production.
