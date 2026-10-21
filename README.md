# Zain Ul Abideen - UI/UX Portfolio

Plain HTML, CSS and vanilla JS. No build step.

## Run locally
    cd site
    python3 -m http.server 8000     # then open http://localhost:8000
or `npx serve`, or the VS Code Live Server extension.

## Structure
    index.html
    css/style.css        base, components, sections
    css/responsive.css   breakpoints + prefers-reduced-motion
    js/main.js           icons, menu, scrollspy, reveal, dialog, carousel
    assets/              add CV + images here

## Placeholders to replace
- CV: assets/Muneeb-Ul-Haq-CV.pdf (file does not exist yet)
- Portrait (SVG silhouette in the About section)
- Email, phone, social URLs (Contact section)
- Stats, testimonials, project previews and case studies (sample content)
Search index.html for "Placeholder" / "Sample" comments.

## Animation layer (added)
- css/animations.css, js/animations.js (loaded after the base files)
- Word-by-word headline, letter-by-letter signature (Zain Ul Abideen), handwritten notes that ink in, count-up stats,
  animated chart/phone/plant/chips in the hero, morphing wave + ribbons in contact, card spotlight/tilt, scroll progress bar.
- Everything is disabled automatically with prefers-reduced-motion.

## Update
- Brand lockup (assets/images/icon.png + name + role) shared by header and footer (.brand).
- Skills section is a Figma-only expertise panel (.fg) — edit the <li> items in index.html.
- Process: icons glow only while the travelling dot passes; ping waves stay continuous.

## Update
- Skills: "Software and Expertise" grid (Figma + 6 expertise cards, .sk-grid in index.html).
- Project dialog centred (global reset had removed its auto margin).
- Footer rebuilt (brand, nav, socials, copyright, back-to-top); responsive.

## Update: projects from JavaScript
- Add/edit projects in the `projects` array at the top of js/main.js (name, subname, badge, description, steps, image).
- Cards are built from that array. The arrow button opens the dialog (description + steps); clicking the picture opens it full size.
