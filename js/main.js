document.documentElement.classList.add("js");

// EDIT ONLY THE PART BEFORE THE "projects" ARRAY
const projects = [
  {
    name: "CARGO Logistics",
    subname: "A Digital Experience for Smarter Global Shipping",
    badge: "3D Web Design",
    description:
      "CARGO is a premium logistics website concept combining intuitive UX, refined visuals, and modern design to communicate precision and global reliability.",
    steps: [
      "Research & discovery",
      "Information architecture",
      "Wireframing",
      "Visual UI design",
      "Prototyping & responsive design",
      "Testing & handoff",
    ],
    image: "assets/images/1st.png",
  },
  {
    name: "CloudBoiler",
    subname: "Intelligent Water Heating for the AI Era",
    badge: "Web Design",
    description:
      "CloudBoiler is a premium website concept blending AI innovation, energy efficiency, and refined UX to redefine intelligent home heating.",
    steps: [
      "Research & discovery",
      "Information architecture",
      "Wireframing",
      "Visual UI design",
      "Prototyping & responsive design",
      "Testing & handoff",
    ],
    image: "assets/images/2nd.png",
  },
  {
    name: "Culinary Tales",
    subname: "Bringing the Taste of Home to Every Table",
    badge: "Mobile App",
    description:
      "Culinary Tales is a premium food app concept combining intuitive UX, rich food imagery, and seamless shopping to connect people with authentic flavors.",
    steps: [
      "Research & discovery",
      "Information architecture",
      "Wireframing",
      "Visual UI design",
      "Prototyping & responsive design",
      "Testing & handoff",
    ],
    image: "assets/images/3rd.png",
  }
];

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
document.getElementById("pg").innerHTML = projects
  .map(
    (p, i) => `
  <article class="card rv-i" data-p="${esc(p.name)}" data-i="${i}">
    <button type="button" class="pv" data-act="image" aria-label="View ${esc(p.name)} image">
      <img src="${esc(p.image)}" alt="${esc(p.name)} — ${esc(p.subname)}" loading="lazy" />
      <span class="badge">${esc(p.badge)}</span>
    </button>
    <div class="cb">
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.subname)}</p>
      <button type="button" class="go" data-act="open" aria-label="Open ${esc(p.name)} details"><svg class="i" data-i="arrow"></svg></button>
    </div>
  </article>`,
  )
  .join("");
const P = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  left: "M19 12H5M11 6l-6 6 6 6",
  down: "M12 4v12M6 11l6 6 6-6M5 20h14",
  menu: "M4 7h16M4 12h16M4 17h16",
  x: "M6 6l12 12M18 6L6 18",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 00-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 00-4-10z",
  smile:
    "M12 3a9 9 0 100 18 9 9 0 000-18zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  pen: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
  sync: "M20 11a8 8 0 00-14-4M4 4v4h4M4 13a8 8 0 0014 4M20 20v-4h-4",
  users:
    "M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 4a4 4 0 010 7M22 21c0-3-2-5-4-5.5",
  layout: "M4 4h16v16H4zM4 10h16M10 10v10",
  rocket:
    "M5 19c0-3 1-4 3-4l-1-3 5-5c3-3 7-3 8-3 0 1 0 5-3 8l-5 5-3-1c0 2-1 3-4 3zM14 10h.01",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  pin: "M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
};
document.querySelectorAll("svg[data-i]").forEach((s) => {
  s.setAttribute("viewBox", "0 0 24 24");
  s.setAttribute("aria-hidden", "true");
  s.innerHTML = '<path d="' + P[s.dataset.i] + '"/>';
});
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
$("#yr").textContent = new Date().getFullYear();
const hd = $("#hd"),
  nav = $("#nav"),
  mb = $("#mb");
addEventListener("scroll", () => hd.classList.toggle("sc", scrollY > 20), {
  passive: true,
});
function menu(o) {
  nav.classList.toggle("open", o);
  mb.setAttribute("aria-expanded", o);
  mb.setAttribute("aria-label", o ? "Close menu" : "Open menu");
  mb.innerHTML =
    '<svg class="i" viewBox="0 0 24 24"><path d="' +
    (o ? P.x : P.menu) +
    '"/></svg>';
}
mb.onclick = () => menu(!nav.classList.contains("open"));
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menu(false);
    mb.focus();
  }
});
$$("#nav a").forEach((a) => a.addEventListener("click", () => menu(false)));
const links = $$("#nav a");
const spy = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id === "reviews" ? "work" : e.target.id;
        links.forEach((l) =>
          l.classList.toggle("on", l.getAttribute("href") === "#" + id),
        );
      }
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
$$("main section").forEach((s) => spy.observe(s));
const rv = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        rv.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
$$(".rv-i").forEach((el) => rv.observe(el));
const stp = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        stp.unobserve(e.target);
      }
    }),
  { threshold: 0.3 },
);
stp.observe($("#steps"));
const dlg = $("#dlg"),
  idlg = $("#idlg");
function openProject(p) {
  $("#dt").textContent = p.name;
  $("#dsub").textContent = p.subname;
  $("#dd").textContent = p.description;
  $("#dsteps").innerHTML = p.steps.map((s) => "<li>" + esc(s) + "</li>").join("");
  dlg.showModal();
}
function openImage(p) {
  const img = $("#lbi");
  img.src = p.image;
  img.alt = p.name + " — " + p.subname;
  $("#lbc").textContent = p.name + " — " + p.subname;
  idlg.showModal();
}
$("#pg").addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const p = projects[b.closest(".card").dataset.i];
  if (b.dataset.act === "image") openImage(p);
  else openProject(p);
});
$("#dc").onclick = () => dlg.close();
$("#lbx").onclick = () => idlg.close();
[dlg, idlg].forEach((d) =>
  d.addEventListener("click", (e) => {
    if (e.target === d) d.close();
  }),
);
const sc = $("#scene");
if (
  matchMedia("(hover:hover) and (pointer:fine)").matches &&
  !matchMedia("(prefers-reduced-motion:reduce)").matches
) {
  sc.addEventListener("pointermove", (e) => {
    const r = sc.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    $("#ph").style.transform = "translate(" + x * -12 + "px," + y * -8 + "px)";
    $("#lap").style.transform =
      "perspective(1200px) rotateY(" +
      (-14 + x * 3) +
      "deg) rotateX(" +
      (3 - y * 2) +
      "deg)";
  });
  sc.addEventListener("pointerleave", () => {
    $("#ph").style.transform = "";
    $("#lap").style.transform = "";
  });
}
