/* =========================================================
   FISIKA PORTAL — nav.js v4
   Hamburger side-panel navigation (semua ukuran layar)
   Pembuat: Faris Umair Hawari
   ========================================================= */

const IS_IN_PAGES = window.location.pathname.includes("/pages/");
const PAGE_PATH_PREFIX = IS_IN_PAGES ? "" : "pages/";
const ROOT_PATH_PREFIX = IS_IN_PAGES ? "../" : "";

const NAV_HTML = `
<nav class="navbar" id="main-navbar">
  <a href="${ROOT_PATH_PREFIX}index.html" class="nav-brand">
    <span class="atom-icon"><i data-feather="cpu"></i></span>
    FisikaPortal
  </a>

  <!-- ── Navbar Search Bar (disembunyikan di index.html) ── -->
  <div class="nav-search-wrap" id="nav-search-wrap" role="search" aria-label="Cari materi fisika">
    <div class="nav-search-inner">
      <span class="nav-search-icon" aria-hidden="true"><i data-feather="search"></i></span>
      <input
        type="text"
        id="nav-search-input"
        class="nav-search-input"
        placeholder="Cari rumus, topik..."
        autocomplete="off"
        aria-label="Cari materi fisika"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="nav-search-results"
      />
      <button class="nav-search-clear" id="nav-search-clear" aria-label="Hapus pencarian" tabindex="-1">
        <i data-feather="x"></i>
      </button>
    </div>
    <div class="nav-search-results" id="nav-search-results" role="listbox" aria-label="Hasil pencarian"></div>
  </div>

  <div class="nav-right">
    <!-- Tombol search icon — hanya tampil di mobile kecil sebagai toggle -->
    <button class="nav-search-btn" id="nav-search-btn" aria-label="Cari materi" title="Cari (Ctrl+K)">
      <i data-feather="search"></i>
    </button>

    <button class="nav-toggle" id="nav-toggle" aria-label="Buka menu" aria-expanded="false" aria-controls="nav-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Overlay backdrop -->
<div class="nav-overlay" id="nav-overlay" role="presentation"></div>

<!-- Side panel menu -->
<nav class="nav-menu" id="nav-menu" aria-label="Menu utama">
  <div class="nav-menu-header">
    <span class="nav-menu-title">Menu</span>
    <button class="nav-close" id="nav-close" aria-label="Tutup menu">
      <i data-feather="x"></i>
    </button>
  </div>

  <div class="nav-items-wrap">
    <ul>
      <li class="nav-item">
        <a href="${ROOT_PATH_PREFIX}index.html" class="nav-link"><i data-feather="home"></i> Beranda</a>
      </li>

      <div class="nav-divider"></div>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}mekanika.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="settings"></i> Mekanika <span class="caret">▾</span>
        </a>
        <div class="dropdown mega">
          <div class="dd-section">
            <div class="dd-title">Kinematika</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#gerak-lurus"><i data-feather="trending-up"></i>Gerak Lurus (GLB & GLBB)</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#gerak-melingkar"><i data-feather="rotate-cw"></i>Gerak Melingkar</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#gerak-parabola"><i data-feather="activity"></i>Gerak Parabola</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#ghs"><i data-feather="radio"></i>Gerak Harmonik Sederhana</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Dinamika</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#hukum-newton"><i data-feather="zap"></i>Hukum Newton</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#momentum"><i data-feather="arrow-right"></i>Momentum & Impuls</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#energi"><i data-feather="battery-charging"></i>Usaha & Energi</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#rotasi"><i data-feather="refresh-cw"></i>Mekanika Rotasi</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Lanjutan</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#gravitasi"><i data-feather="globe"></i>Gravitasi & Orbit</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#fluida"><i data-feather="droplet"></i>Mekanika Fluida</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}mekanika.html#elastisitas"><i data-feather="minimize-2"></i>Elastisitas</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}termodinamika.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="thermometer"></i> Termodinamika <span class="caret">▾</span>
        </a>
        <div class="dropdown mega-2">
          <div class="dd-section">
            <div class="dd-title">Dasar</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}termodinamika.html#teori-kinetik"><i data-feather="wind"></i>Teori Kinetik Gas</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}termodinamika.html#hukum-termo"><i data-feather="layers"></i>Hukum Termodinamika</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}termodinamika.html#proses"><i data-feather="sliders"></i>Proses Termodinamika</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Lanjutan</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}termodinamika.html#mesin-kalor"><i data-feather="cpu"></i>Mesin Kalor & Carnot</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}termodinamika.html#entropi"><i data-feather="shuffle"></i>Entropi</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}termodinamika.html#transfer-kalor"><i data-feather="sun"></i>Transfer Kalor</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}gelombang.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="radio"></i> Gelombang & Bunyi <span class="caret">▾</span>
        </a>
        <div class="dropdown mega-2">
          <div class="dd-section">
            <div class="dd-title">Gelombang Mekanik</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}gelombang.html#gelombang-mekanik"><i data-feather="activity"></i>Sifat & Jenis Gelombang</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}gelombang.html#bunyi"><i data-feather="volume-2"></i>Gelombang Bunyi</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}gelombang.html#doppler"><i data-feather="wifi"></i>Efek Doppler</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Fenomena</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}gelombang.html#superposisi"><i data-feather="layers"></i>Superposisi & Interferensi</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}gelombang.html#stasioner"><i data-feather="bar-chart"></i>Gelombang Stasioner</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}gelombang.html#resonansi"><i data-feather="music"></i>Resonansi</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}elektromagnetisme.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="zap"></i> Elektromagnetisme <span class="caret">▾</span>
        </a>
        <div class="dropdown mega">
          <div class="dd-section">
            <div class="dd-title">Listrik</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#elektrostatika"><i data-feather="zap"></i>Elektrostatika</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#arus-listrik"><i data-feather="git-commit"></i>Arus & Rangkaian DC</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#kapasitor"><i data-feather="server"></i>Kapasitor</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Magnet & Induksi</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#magnetostatika"><i data-feather="anchor"></i>Magnetostatika</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#faraday"><i data-feather="zap-off"></i>Induksi EM</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#rangkaian-ac"><i data-feather="repeat"></i>Rangkaian AC</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Gelombang EM</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#maxwell"><i data-feather="book-open"></i>Persamaan Maxwell</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}elektromagnetisme.html#spektrum-em"><i data-feather="sunset"></i>Spektrum EM</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}optika.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="eye"></i> Optika <span class="caret">▾</span>
        </a>
        <div class="dropdown mega-2">
          <div class="dd-section">
            <div class="dd-title">Optika Geometri</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}optika.html#pemantulan"><i data-feather="corner-up-right"></i>Pemantulan Cahaya</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}optika.html#pembiasan"><i data-feather="triangle"></i>Pembiasan & Snell</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}optika.html#lensa-cermin"><i data-feather="circle"></i>Lensa & Cermin</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}optika.html#alat-optik"><i data-feather="zoom-in"></i>Alat-alat Optik</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Optika Fisis</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}optika.html#interferensi"><i data-feather="grid"></i>Interferensi</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}optika.html#difraksi"><i data-feather="maximize"></i>Difraksi</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}optika.html#polarisasi"><i data-feather="filter"></i>Polarisasi</a>
          </div>
        </div>
      </li>

      <div class="nav-divider"></div>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}fisika-modern.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="clock"></i> Fisika Modern <span class="caret">▾</span>
        </a>
        <div class="dropdown mega-2">
          <div class="dd-section">
            <div class="dd-title">Relativitas</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-modern.html#relativitas"><i data-feather="clock"></i>Relativitas Khusus</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-modern.html#dilatasi"><i data-feather="clock"></i>Dilatasi Waktu</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-modern.html#energi-massa"><i data-feather="star"></i>E = mc²</a>
          </div>
          <div class="dd-section">
            <div class="dd-title">Kuantum</div>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-modern.html#planck"><i data-feather="sun"></i>Radiasi Benda Hitam</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-modern.html#fotolistrik"><i data-feather="zap"></i>Efek Fotolistrik</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-modern.html#de-broglie"><i data-feather="target"></i>Dualisme Gel.-Partikel</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-modern.html#heisenberg"><i data-feather="help-circle"></i>Prinsip Ketidakpastian</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}fisika-atom.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="target"></i> Fisika Atom <span class="caret">▾</span>
        </a>
        <div class="dropdown">
          <div class="dd-section">
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-atom.html#model-atom"><i data-feather="layers"></i>Perkembangan Model Atom</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-atom.html#atom-bohr"><i data-feather="target"></i>Model Atom Bohr</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-atom.html#spektrum"><i data-feather="bar-chart"></i>Spektrum Atom Hidrogen</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-atom.html#bilangan-kuantum"><i data-feather="hash"></i>Bilangan Kuantum</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-atom.html#konfigurasi"><i data-feather="grid"></i>Konfigurasi Elektron</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}fisika-nuklir.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="alert-triangle"></i> Fisika Nuklir <span class="caret">▾</span>
        </a>
        <div class="dropdown">
          <div class="dd-section">
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-nuklir.html#struktur-inti"><i data-feather="circle"></i>Struktur Inti Atom</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-nuklir.html#radioaktivitas"><i data-feather="alert-triangle"></i>Radioaktivitas</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-nuklir.html#peluruhan"><i data-feather="arrow-down"></i>Jenis Peluruhan</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-nuklir.html#waktu-paruh"><i data-feather="clock"></i>Waktu Paruh</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-nuklir.html#reaksi-nuklir"><i data-feather="zap"></i>Fisi & Fusi Nuklir</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="${PAGE_PATH_PREFIX}fisika-partikel.html" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">
          <i data-feather="package"></i> Fisika Partikel <span class="caret">▾</span>
        </a>
        <div class="dropdown">
          <div class="dd-section">
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-partikel.html#model-standar"><i data-feather="layers"></i>Model Standar</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-partikel.html#quark-lepton"><i data-feather="package"></i>Quark & Lepton</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-partikel.html#boson"><i data-feather="zap"></i>Boson & Gaya Fundamental</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-partikel.html#antimateri"><i data-feather="refresh-cw"></i>Antimateri</a>
            <a class="dd-link" href="${PAGE_PATH_PREFIX}fisika-partikel.html#kosmologi"><i data-feather="globe"></i>Kosmologi Partikel</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</nav>

<div class="progress-bar"></div>
<button class="back-top" aria-label="Kembali ke atas"><i data-feather="arrow-up"></i></button>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="brand-logo"><span class="atom">⚛</span> FisikaPortal</div>
      <p>Belajar Fisika dari dasar hingga mahir. Dari mekanika klasik hingga Fisika partikel fundamental. Disajikan dengan rumus, konsep, dan contoh soal yang terstruktur.</p>
      <div class="creator-tag">
        <i data-feather="user"></i>
        <span class="creator-label">Dibuat oleh</span>
        <span class="creator-name">Faris Umair Hawari</span>
      </div>
    </div>
    <div>
      <div class="footer-col-title"><i data-feather="book"></i> Fisika Klasik</div>
      <div class="footer-links">
        <a href="${PAGE_PATH_PREFIX}mekanika.html"><i data-feather="settings"></i>Mekanika</a>
        <a href="${PAGE_PATH_PREFIX}termodinamika.html"><i data-feather="thermometer"></i>Termodinamika</a>
        <a href="${PAGE_PATH_PREFIX}gelombang.html"><i data-feather="radio"></i>Gelombang & Bunyi</a>
        <a href="${PAGE_PATH_PREFIX}elektromagnetisme.html"><i data-feather="zap"></i>Elektromagnetisme</a>
        <a href="${PAGE_PATH_PREFIX}optika.html"><i data-feather="eye"></i>Optika</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title"><i data-feather="cpu"></i> Fisika Modern</div>
      <div class="footer-links">
        <a href="${PAGE_PATH_PREFIX}fisika-modern.html"><i data-feather="clock"></i>Fisika Modern</a>
        <a href="${PAGE_PATH_PREFIX}fisika-atom.html"><i data-feather="target"></i>Fisika Atom</a>
        <a href="${PAGE_PATH_PREFIX}fisika-nuklir.html"><i data-feather="alert-triangle"></i>Fisika Nuklir</a>
        <a href="${PAGE_PATH_PREFIX}fisika-partikel.html"><i data-feather="package"></i>Fisika Partikel</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title"><i data-feather="info"></i> Lainnya</div>
      <div class="footer-links">
        <a href="${ROOT_PATH_PREFIX}index.html"><i data-feather="home"></i>Beranda</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 FisikaPortal · Materi untuk tujuan pendidikan · Dibuat oleh <strong style="color:var(--text-dim)">Faris Umair Hawari</strong></p>
    <p>Dibuat dengan <span class="heart">♥</span> untuk pelajar Fisika Indonesia</p>
  </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    // Inject nav & footer
    const navP = document.getElementById("nav-placeholder");
    if (navP) navP.outerHTML = NAV_HTML;

    const footerP = document.getElementById("footer-placeholder");
    if (footerP) footerP.outerHTML = FOOTER_HTML;

    // Init Feather icons
    if (window.feather) feather.replace({ "stroke-width": 1.75 });

    // ── Sembunyikan nav-search di halaman index ──────────
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const isIndexPage = currentPage === "index.html" || currentPage === "";
    const navSearchWrap = document.getElementById("nav-search-wrap");
    const navSearchBtn = document.getElementById("nav-search-btn");
    const navbar = document.getElementById("main-navbar");

    if (isIndexPage) {
        if (navSearchWrap) navSearchWrap.setAttribute("data-hidden-on-index", "true");
        if (navbar) navbar.classList.add("is-index");
    }

    // ── Active nav link ──────────────────────────
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
        const href = link.getAttribute("href")?.split("#")[0];
        if (href && href === path) link.classList.add("active");
    });

    // ── Hamburger toggle ─────────────────────────
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    const overlay = document.getElementById("nav-overlay");
    const closeBtn = document.getElementById("nav-close");
    if (!toggle || !menu) return;

    function openMenu() {
        menu.classList.add("open");
        overlay.classList.add("open");
        toggle.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }
    function closeMenu() {
        menu.classList.remove("open");
        overlay.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    toggle.addEventListener("click", () => {
        menu.classList.contains("open") ? closeMenu() : openMenu();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });

    // ── Accordion dropdowns ──────────────────────
    menu.querySelectorAll(".nav-item").forEach((item) => {
        const link = item.querySelector(".nav-link");
        const dropdown = item.querySelector(".dropdown");
        if (!dropdown) return;

        link.addEventListener("click", (e) => {
            const isLink =
                link.getAttribute("href") &&
                !link.getAttribute("href").startsWith("#") &&
                link.getAttribute("href") !== window.location.pathname.split("/").pop();

            // If it has a real href AND dropdown, toggle accordion first click, navigate second
            if (item.classList.contains("open")) {
                // already open — let navigation happen
                return;
            }
            e.preventDefault();
            // Close others
            menu.querySelectorAll(".nav-item.open").forEach((other) => {
                if (other !== item) {
                    other.classList.remove("open");
                    other.querySelector(".nav-link")?.setAttribute("aria-expanded", "false");
                }
            });
            item.classList.toggle("open");
            link.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
        });
    });

    // Close menu when a leaf dd-link is clicked
    menu.querySelectorAll(".dd-link").forEach((lnk) => {
        lnk.addEventListener("click", closeMenu);
    });

    // Navbar scroll state
    const nav = document.getElementById("main-navbar");
    if (nav) {
        const fn = () => nav.classList.toggle("scrolled", window.scrollY > 40);
        window.addEventListener("scroll", fn, { passive: true });
        fn();
    }

    // Re-init feather after DOM injection
    setTimeout(() => {
        if (window.feather) feather.replace({ "stroke-width": 1.75 });
    }, 50);

    // ── Navbar Search Engine ─────────────────────
    initNavSearch(isIndexPage);
});

/* ══════════════════════════════════════════════════════════════
   NAVBAR SEARCH ENGINE
   - Muncul di semua halaman KECUALI index.html
   - Di mobile kecil (<600px): tersembunyi di belakang ikon 🔍,
     klik ikon → bar melebar menutupi brand, klik X → kembali
   - Gunakan SEARCH_INDEX dari search-index.js (shared)
   ══════════════════════════════════════════════════════════════ */
function initNavSearch(isIndexPage) {
    const wrap = document.getElementById("nav-search-wrap");
    const input = document.getElementById("nav-search-input");
    const results = document.getElementById("nav-search-results");
    const clearBtn = document.getElementById("nav-search-clear");
    const iconBtn = document.getElementById("nav-search-btn");
    const navbar = document.getElementById("main-navbar");
    if (!wrap || !input || !results) return;

    // ── Shared helpers ────────────────────────────────────────
    function escRe(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function hlText(text, terms) {
        if (!text) return "";
        let out = text;
        terms.forEach((t) => {
            if (!t) return;
            out = out.replace(new RegExp(`(${escRe(t)})`, "gi"), "<mark>$1</mark>");
        });
        return out;
    }
    function scoreItem(item, q, terms) {
        const t = item.title.toLowerCase();
        const st = item.searchText || "";
        let s = 0;
        if (t === q) s += 100;
        else if (t.startsWith(q)) s += 80;
        else if (t.includes(q)) s += 60;
        terms.forEach((term) => {
            if (term && t.includes(term)) s += 30;
        });
        (item.keywords || []).forEach((kw) => {
            const kl = kw.toLowerCase();
            if (kl.includes(q)) s += 40;
            terms.forEach((term) => {
                if (term && kl.includes(term)) s += 15;
            });
        });
        if (st.includes(q)) s += 10;
        terms.forEach((term) => {
            if (term && st.includes(term)) s += 5;
        });
        return s;
    }

    // ── State ─────────────────────────────────────────────────
    let selIdx = -1;
    let hits = [];
    let isOpen = false;
    let expanded = false; // mobile: bar lebar aktif

    // ── Mobile expand/collapse ────────────────────────────────
    function expandSearch() {
        expanded = true;
        navbar.classList.add("search-expanded");
        wrap.classList.add("expanded");
        input.focus();
        if (window.feather) feather.replace({ "stroke-width": 1.75 });
    }
    function collapseSearch() {
        expanded = false;
        navbar.classList.remove("search-expanded");
        wrap.classList.remove("expanded");
        input.value = "";
        closeDropdown();
    }

    // Tombol ikon di kanan: toggle expand (mobile) / fokus (desktop)
    if (iconBtn) {
        iconBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (
                wrap.classList.contains("expanded") ||
                !navbar.classList.contains("mobile-search-mode")
            ) {
                // Desktop: langsung fokus input
                input.focus();
            } else {
                expandSearch();
            }
        });
    }

    // ── Dropdown ──────────────────────────────────────────────
    function closeDropdown() {
        results.style.display = "none";
        isOpen = false;
        selIdx = -1;
        input.setAttribute("aria-expanded", "false");
    }
    function openDropdown() {
        results.style.display = "block";
        isOpen = true;
        input.setAttribute("aria-expanded", "true");
    }

    // Normalize search URLs so search works from index.html (root) and pages/*
    const isInPages = window.location.pathname.includes("/pages/");
    const searchUrlPrefix = isInPages ? "" : "pages/";
    function normalizeSearchUrl(url) {
        if (!url || url.startsWith("/") || url.startsWith("http")) return url;
        if (url.startsWith("pages/")) return url;
        return searchUrlPrefix + url;
    }

    function render(query) {
        const IDX = typeof SEARCH_INDEX !== "undefined" ? SEARCH_INDEX : [];
        if (!query || query.length < 1) {
            closeDropdown();
            return;
        }

        const q = query.toLowerCase().trim();
        const terms = q.split(/\s+/).filter(Boolean);
        hits = IDX.map((item) => ({ item, s: scoreItem(item, q, terms) }))
            .filter((x) => x.s > 0)
            .sort((a, b) => b.s - a.s)
            .slice(0, 8)
            .map((x) => x.item);

        selIdx = -1;

        if (!hits.length) {
            results.innerHTML = `
                <div class="nsr-empty">
                    <span>Tidak ada hasil untuk <strong>"${query}"</strong></span>
                </div>`;
            openDropdown();
            return;
        }

        let html = "";
        hits.forEach((item, idx) => {
            const titleHl = hlText(item.title, terms);
            html += `
            <a class="nsr-item" href="${normalizeSearchUrl(item.url)}" data-nidx="${idx}" role="option">
                <span class="nsr-icon"><i data-feather="${item.icon || "book-open"}"></i></span>
                <span class="nsr-body">
                    <span class="nsr-title">${titleHl}</span>
                    <span class="nsr-topic">${item.topicLabel}</span>
                </span>
            </a>`;
        });
        results.innerHTML = html;
        openDropdown();
        if (window.feather) feather.replace({ "stroke-width": 1.75 });
    }

    // ── Keyboard nav ──────────────────────────────────────────
    function navKey(dir) {
        const items = results.querySelectorAll(".nsr-item");
        if (!items.length) return;
        if (selIdx >= 0 && items[selIdx]) items[selIdx].classList.remove("selected");
        selIdx = Math.max(0, Math.min(items.length - 1, selIdx + dir));
        if (items[selIdx]) {
            items[selIdx].classList.add("selected");
            items[selIdx].scrollIntoView({ block: "nearest" });
        }
    }

    // ── Clear button ──────────────────────────────────────────
    function updateClear() {
        if (clearBtn) clearBtn.style.opacity = input.value ? "1" : "0";
    }
    if (clearBtn) {
        clearBtn.addEventListener("mousedown", (e) => {
            e.preventDefault(); // cegah blur input
            input.value = "";
            closeDropdown();
            updateClear();
            input.focus();
        });
    }

    // ── Events ───────────────────────────────────────────────
    let debounce;
    input.addEventListener("input", () => {
        updateClear();
        clearTimeout(debounce);
        debounce = setTimeout(() => render(input.value.trim()), 80);
    });

    input.addEventListener("focus", () => {
        if (input.value.trim()) render(input.value.trim());
    });

    input.addEventListener("keydown", (e) => {
        if (!isOpen && e.key === "ArrowDown") {
            render(input.value.trim());
            return;
        }
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                navKey(selIdx < 0 ? 0 : 1);
                break;
            case "ArrowUp":
                e.preventDefault();
                navKey(-1);
                break;
            case "Enter":
                e.preventDefault();
                if (selIdx >= 0) {
                    const items = results.querySelectorAll(".nsr-item");
                    if (items[selIdx]) window.location.href = items[selIdx].href;
                } else if (hits.length === 1) {
                    window.location.href = hits[0].url;
                }
                break;
            case "Escape":
                closeDropdown();
                if (expanded) collapseSearch();
                else input.blur();
                break;
        }
    });

    document.addEventListener("pointerdown", (e) => {
        if (!wrap.contains(e.target) && e.target !== iconBtn) {
            closeDropdown();
            if (expanded) collapseSearch();
        }
    });

    // ── Ctrl+K / ⌘+K → fokus navbar search (bukan hero) ──────
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            // Jika di index, cek apakah hero search ada
            const heroInput = document.getElementById("search-input");
            if (heroInput && document.activeElement !== heroInput) {
                // Lebih prioritaskan hero search di index
                if (isIndexPage) {
                    e.preventDefault();
                    heroInput.focus();
                    return;
                }
            }
            // Semua halaman lain: gunakan navbar search
            if (!isIndexPage) {
                e.preventDefault();
                if (navbar.classList.contains("mobile-search-mode")) expandSearch();
                else input.focus();
                input.select();
            }
        }
    });
}

/* ── Deteksi mobile-search-mode saat resize ── */
(function () {
    function checkMode() {
        const nb = document.getElementById("main-navbar");
        if (!nb) return;
        if (window.innerWidth <= 640) {
            nb.classList.add("mobile-search-mode");
        } else {
            nb.classList.remove("mobile-search-mode");
            // Jika bar sedang expanded, kembalikan ke normal
            const wrap = document.getElementById("nav-search-wrap");
            if (wrap) {
                wrap.classList.remove("expanded");
                nb.classList.remove("search-expanded");
            }
        }
    }
    window.addEventListener("resize", checkMode, { passive: true });
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(checkMode, 60);
    });
})();
