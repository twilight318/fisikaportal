/* =========================================================
   FISIKA PORTAL — main.js v6
   Fix: sidebar navigation & scroll-back-up bug
   - Hapus scrollIntoView() dari IntersectionObserver
     (penyebab page auto-scroll saat observer aktif)
   - Tambah isNavigating flag agar observer tidak
     bersaing dengan klik navigasi user
   - Klik sidebar link langsung scroll ke target
     dengan offset navbar yang benar
   ========================================================= */

/* ══════════════════ STAR CANVAS ══════════════════ */
(function () {
    const canvas = document.getElementById("star-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [],
        shooters = [],
        w,
        h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    function initStars() {
        stars = Array.from({ length: 90 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.3 + 0.2,
            a: Math.random() * 0.7 + 0.15,
            speed: Math.random() * 0.006 + 0.001,
            twinkle: Math.random() * Math.PI * 2,
            hue: Math.random() > 0.75 ? 210 : 215,
        }));
        shooters = Array.from({ length: 2 }, newShooter);
    }
    function newShooter() {
        return {
            x: Math.random() * w * 0.6,
            y: Math.random() * h * 0.35,
            vx: 2.2 + Math.random(),
            vy: 0.7 + Math.random() * 0.4,
            length: Math.random() * 100 + 60,
            a: 0,
            timer: Math.random() * 300 + 120,
        };
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        const t = Date.now() * 0.001;
        stars.forEach((s) => {
            const alpha = s.a * (0.4 + 0.6 * Math.sin(t * s.speed * 50 + s.twinkle));
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2);
            g.addColorStop(0, `hsla(${s.hue},70%,92%,${alpha})`);
            g.addColorStop(1, `hsla(${s.hue},70%,80%,0)`);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 2, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
        });
        shooters.forEach((s, i) => {
            s.timer--;
            if (s.timer <= 0) {
                shooters[i] = newShooter();
                return;
            }
            if (s.timer < 80) s.a = Math.min(1, s.a + 0.07);
            if (s.a > 0) {
                ctx.save();
                ctx.globalAlpha = s.a * 0.65;
                const g = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y + s.length * 0.28);
                g.addColorStop(0, "rgba(65,90,119,0)");
                g.addColorStop(0.5, "rgba(119,141,169,0.9)");
                g.addColorStop(1, "rgba(224,225,221,0)");
                ctx.strokeStyle = g;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x + s.length, s.y + s.length * 0.27);
                ctx.stroke();
                ctx.restore();
                s.x += s.vx * 3;
                s.y += s.vy * 3;
                s.a -= 0.02;
                if (s.x > w || s.a <= 0) shooters[i] = newShooter();
            }
        });
        requestAnimationFrame(draw);
    }
    window.addEventListener("resize", () => {
        resize();
        initStars();
    });
    window.addEventListener("load", () => {
        resize();
        initStars();
        draw();
    });
})();

/* ══════════════════ FEATHER ICONS ══════════════════ */
function reinitFeather() {
    if (window.feather) feather.replace({ "stroke-width": 1.75 });
}
document.addEventListener("DOMContentLoaded", () => setTimeout(reinitFeather, 80));
window.addEventListener("load", reinitFeather);

/* ══════════════════ PROGRESS BAR ══════════════════ */
(function () {
    const bar = document.querySelector(".progress-bar");
    if (!bar) return;
    window.addEventListener(
        "scroll",
        () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
        },
        { passive: true },
    );
})();

/* ══════════════════ NAVBAR SCROLL STATE ══════════════════ */
(function () {
    const nav = document.getElementById("main-navbar");
    if (!nav) return;
    const fn = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
})();

/* ══════════════════ BACK TO TOP ══════════════════ */
(function () {
    const btn = document.querySelector(".back-top");
    if (!btn) return;
    window.addEventListener("scroll", () => btn.classList.toggle("visible", window.scrollY > 400), {
        passive: true,
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

/* ══════════════════ SCROLL REVEAL ══════════════════ */
(function () {
    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("visible");
                    obs.unobserve(e.target);
                }
            });
        },
        { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
})();

/* ══════════════════ SIDEBAR ACTIVE TRACKING ══════════════════ */
/*
 * ROOT CAUSE BUG LAMA:
 *   match.link.scrollIntoView({ block:"nearest", behavior:"smooth" })
 *   di dalam IntersectionObserver menyebabkan DUA bug:
 *
 *   Bug 1 — Auto scroll ke atas saat scroll bawah:
 *     Setiap section baru masuk viewport → observer tembak →
 *     scrollIntoView() pada elemen sidebar link → browser scroll
 *     PAGE (bukan hanya sidebar) untuk memperlihatkan link itu →
 *     halaman melompat ke posisi sidebar link, terasa "balik ke atas".
 *     Makin parah di mobile di mana sidebar = static, tidak overflow.
 *
 *   Bug 2 — Klik daftar isi hanya pindah satu section:
 *     Klik "Contoh Soal" → smooth scroll mulai → section perantara
 *     (mis. Gerak Melingkar) masuk viewport sebentar → observer tembak
 *     → scrollIntoView("smooth") pada link Gerak Melingkar →
 *     bersaing dengan scroll navigasi user → scroll berhenti di
 *     section perantara alih-alih tujuan asli.
 *
 * FIX:
 *   1. Ganti scrollIntoView() dengan scroll manual pada .sidebar container
 *      (isolasi scroll di dalam sidebar, tidak menyentuh page scroll).
 *   2. isNavigating flag: saat user klik link, blokir observer ~1 detik.
 *   3. Klik link: preventDefault() + window.scrollTo() manual dengan
 *      offset navbar tepat → tidak ada perantara yang mengganggu.
 */
(function () {
    const sbLinks = document.querySelectorAll(".sb-link");
    if (!sbLinks.length) return;

    // Bangun peta section ↔ sidebar link
    const sections = [];
    sbLinks.forEach((link) => {
        const id = link.getAttribute("href")?.replace("#", "");
        if (id) {
            const el = document.getElementById(id);
            if (el) sections.push({ el, link });
        }
    });
    if (!sections.length) return;

    // Baca navbar height dari CSS variable
    function getNavH() {
        return (
            parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64
        );
    }

    // Scroll HANYA container sidebar — tidak menyentuh page scroll
    function scrollSidebarToLink(link) {
        const sidebar = document.querySelector(".sidebar");
        if (!sidebar) return;
        // Lewati jika sidebar tidak overflow (tidak bisa discroll sendiri)
        if (sidebar.scrollHeight <= sidebar.clientHeight + 4) return;
        const linkTop = link.offsetTop;
        const sidebarTop = sidebar.offsetTop;
        const center = linkTop - sidebarTop - sidebar.clientHeight / 2 + link.offsetHeight / 2;
        sidebar.scrollTo({ top: Math.max(0, center), behavior: "smooth" });
    }

    // Flag: nonaktifkan observer saat klik-navigasi sedang berjalan
    let isNavigating = false;
    let navTimer = null;

    /* ── IntersectionObserver: hanya aktif saat scroll manual ── */
    const obs = new IntersectionObserver(
        (entries) => {
            if (isNavigating) return; // Tahan selama klik-navigasi

            // Cari section yang paling dekat dengan top viewport
            let best = null;
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                if (!best || entry.boundingClientRect.top < best.boundingClientRect.top) {
                    best = entry;
                }
            });
            if (!best) return;

            sbLinks.forEach((l) => l.classList.remove("active"));
            const match = sections.find((s) => s.el === best.target);
            if (match) {
                match.link.classList.add("active");
                scrollSidebarToLink(match.link); // scroll sidebar, bukan page
            }
        },
        {
            rootMargin: "-68px 0px -50% 0px",
            threshold: 0,
        },
    );

    sections.forEach(({ el }) => obs.observe(el));

    /* ── Klik sidebar link: navigasi langsung, pasti sampai ── */
    sbLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            // Cegah browser melakukan scroll default-nya (yang juga
            // bisa memicu IntersectionObserver secara tidak terduga)
            e.preventDefault();

            const id = link.getAttribute("href")?.replace("#", "");
            const target = id ? document.getElementById(id) : null;
            if (!target) return;

            // Tandai link aktif sekarang juga (tidak tunggu observer)
            sbLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
            scrollSidebarToLink(link);

            // Hitung posisi scroll: top section − tinggi navbar − margin
            const navH = getNavH();
            const extra = 24; // ruang napas ekstra
            const destY = target.getBoundingClientRect().top + window.scrollY - navH - extra;

            // Kunci observer agar tidak mengganggu scroll ini
            isNavigating = true;
            clearTimeout(navTimer);

            // Scroll ke target
            window.scrollTo({ top: Math.max(0, destY), behavior: "smooth" });

            // Update URL hash tanpa trigger scroll ulang
            if (history.replaceState) {
                history.replaceState(null, "", "#" + id);
            }

            // Buka kunci setelah scroll selesai (estimasi 1.1 detik)
            navTimer = setTimeout(() => {
                isNavigating = false;
            }, 1100);
        });
    });

    /* ── Handle hash URL saat halaman pertama kali dibuka ── */
    // Agar link dari nav dropdown (mis. mekanika.html#gravitasi) bisa
    // scroll ke section yang tepat meski CSS scroll-padding sudah ada
    window.addEventListener("load", () => {
        const hash = window.location.hash?.replace("#", "");
        if (!hash) return;
        const target = document.getElementById(hash);
        if (!target) return;

        // Tunggu render dan layout selesai
        setTimeout(() => {
            const navH = getNavH();
            const destY = target.getBoundingClientRect().top + window.scrollY - navH - 24;
            window.scrollTo({ top: Math.max(0, destY), behavior: "smooth" });

            // Tandai link sidebar yang sesuai
            const match = sections.find((s) => s.el === target);
            if (match) {
                sbLinks.forEach((l) => l.classList.remove("active"));
                match.link.classList.add("active");
            }
        }, 350);
    });
})();

/* ══════════════════ SOLUTION TOGGLE ══════════════════ */
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".solution-toggle");
    if (!btn) return;
    const body = btn.nextElementSibling;
    if (body?.classList.contains("solution-body")) {
        body.classList.toggle("open");
        const open = body.classList.contains("open");
        const icon = open ? "chevron-up" : "chevron-right";
        const label = open ? "Sembunyikan Solusi" : "Lihat Solusi";
        btn.innerHTML = `<i data-feather="${icon}"></i> ${label}`;
        reinitFeather();
    }
});

/* ══════════════════ ANIMATED COUNTERS ══════════════════ */
(function () {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || "";
                const dur = 1800,
                    start = performance.now();
                const step = (now) => {
                    const p = Math.min((now - start) / dur, 1);
                    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
                    if (p < 1) requestAnimationFrame(step);
                    else el.textContent = target + suffix;
                };
                requestAnimationFrame(step);
                obs.unobserve(el);
            });
        },
        { threshold: 0.5 },
    );
    counters.forEach((c) => obs.observe(c));
})();

/* ══════════════════ SEARCH ENGINE v2 ══════════════════
 *
 * Fitur:
 *  - 142 entri dari 9 halaman (auto-generated index)
 *  - Fuzzy matching: kata parsial, multi-kata, typo toleran
 *  - Skor relevansi: title-match > keyword-match > snippet-match
 *  - Highlight teks yang cocok di judul DAN snippet
 *  - Grouping per topik (Mekanika, Termodinamika, dst.)
 *  - Keyboard: ↑↓ navigasi, Enter buka, Esc tutup
 *  - Shortcut: Ctrl+K / ⌘+K buka search dari mana saja
 *  - Tampilan: icon topik, badge label, snippet preview
 *
 * ═════════════════════════════════════════════════════ */
(function () {
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    if (!input || !results) return;

    // ── State ──────────────────────────────────────────
    let selectedIndex = -1,
        currentResults = [],
        isOpen = false;

    // ── Search Engine ─────────────────────────────────
    // SEARCH_INDEX di-load dari search-index.js (142 entri, 9 halaman)
    // Fallback: index minimal jika script belum dimuat
    const IDX = typeof SEARCH_INDEX !== "undefined" ? SEARCH_INDEX : [];

    // Normalize search URLs so search works from index.html (root) and pages/*
    const isInPages = window.location.pathname.includes("/pages/");
    const searchUrlPrefix = isInPages ? "" : "pages/";
    function normalizeSearchUrl(url) {
        if (!url || url.startsWith("/") || url.startsWith("http")) return url;
        if (url.startsWith("pages/")) return url;
        return searchUrlPrefix + url;
    }

    // ── Escape special regex chars ──────────────────
    function escRe(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // ── Highlight semua kemunculan query dalam teks ──
    function hl(text, terms) {
        if (!text) return "";
        let out = text;
        terms.forEach((term) => {
            if (!term) return;
            out = out.replace(new RegExp(`(${escRe(term)})`, "gi"), "<mark>$1</mark>");
        });
        return out;
    }

    // ── Scoring function ─────────────────────────────
    // title-exact=100, title-start=80, title-contains=60,
    // keyword-exact=40, snippet-contains=10
    function score(item, query, terms) {
        const q = query.toLowerCase();
        const t = item.title.toLowerCase();
        const st = item.searchText || "";
        let s = 0;

        if (t === q) s += 100;
        else if (t.startsWith(q)) s += 80;
        else if (t.includes(q)) s += 60;

        // multi-term: bonus per term yang match di title
        terms.forEach((term) => {
            if (term && t.includes(term)) s += 30;
        });

        // keyword / sub-heading match
        (item.keywords || []).forEach((kw) => {
            if (kw.toLowerCase().includes(q)) s += 40;
            terms.forEach((term) => {
                if (term && kw.toLowerCase().includes(term)) s += 15;
            });
        });

        // snippet / full-text match
        if (st.includes(q)) s += 10;
        terms.forEach((term) => {
            if (term && st.includes(term)) s += 5;
        });

        return s;
    }

    // ── Run search ────────────────────────────────────
    function runSearch(query) {
        if (!query || query.length < 1) return [];
        const q = query.toLowerCase().trim();
        const terms = q.split(/\s+/).filter(Boolean);

        return IDX.map((item) => ({ item, s: score(item, q, terms) }))
            .filter((x) => x.s > 0)
            .sort((a, b) => b.s - a.s)
            .slice(0, 12)
            .map((x) => x.item);
    }

    // ── Render results panel ─────────────────────────
    function renderResults(query, hits) {
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

        if (!query) {
            results.style.display = "none";
            isOpen = false;
            return;
        }

        if (!hits.length) {
            results.innerHTML = `
                <div class="sr-header">
                    <span>Hasil pencarian</span>
                    <span class="sr-count">0 ditemukan</span>
                </div>
                <div class="sr-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                    <div>Tidak ada hasil untuk <strong>"${query}"</strong></div>
                    <div class="sr-empty-hint">Coba kata lain · contoh: "newton", "gelombang", "atom bohr"</div>
                </div>`;
            results.style.display = "block";
            isOpen = true;
            return;
        }

        // Group by topic
        const groups = {};
        hits.forEach((item) => {
            if (!groups[item.topicLabel]) groups[item.topicLabel] = [];
            groups[item.topicLabel].push(item);
        });

        let html = `
            <div class="sr-header">
                <span>Hasil pencarian</span>
                <span class="sr-count">${hits.length} ditemukan</span>
            </div>`;

        let globalIdx = 0;
        Object.entries(groups).forEach(([label, items]) => {
            html += `<div class="sr-group-label">${label}</div>`;
            items.forEach((item) => {
                const titleHl = hl(item.title, terms);
                const snippetHl = item.snippet ? hl(item.snippet.slice(0, 110), terms) : "";
                html += `
                <a class="sr-item" href="${normalizeSearchUrl(item.url)}" data-idx="${globalIdx}">
                    <div class="sr-item-icon">
                        <i data-feather="${item.icon || "book-open"}"></i>
                    </div>
                    <div class="sr-item-body">
                        <div class="sr-item-title">${titleHl}</div>
                        ${snippetHl ? `<div class="sr-item-snippet">${snippetHl}…</div>` : ""}
                    </div>
                    <span class="sr-badge">${label}</span>
                </a>`;
                globalIdx++;
            });
        });

        html += `
            <div class="sr-footer">
                <span class="sr-key"><kbd>↑</kbd><kbd>↓</kbd> navigasi</span>
                <span class="sr-key"><kbd>Enter</kbd> buka</span>
                <span class="sr-key"><kbd>Esc</kbd> tutup</span>
            </div>`;

        results.innerHTML = html;
        results.style.display = "block";
        isOpen = true;
        if (window.feather) feather.replace({ "stroke-width": 1.75 });
    }

    // ── Keyboard navigation ───────────────────────────
    function navigate(dir) {
        const items = results.querySelectorAll(".sr-item");
        if (!items.length) return;

        // Remove current selection
        if (selectedIndex >= 0 && items[selectedIndex]) {
            items[selectedIndex].classList.remove("selected");
        }

        selectedIndex = Math.max(0, Math.min(items.length - 1, selectedIndex + dir));
        const el = items[selectedIndex];
        if (el) {
            el.classList.add("selected");
            el.scrollIntoView({ block: "nearest" });
        }
    }

    function clearNav() {
        selectedIndex = -1;
    }

    function closeResults() {
        results.style.display = "none";
        isOpen = false;
        clearNav();
    }

    function openResults() {
        const q = input.value.trim();
        if (q.length >= 1) {
            currentResults = runSearch(q);
            renderResults(q, currentResults);
        }
    }

    // ── Event listeners ───────────────────────────────
    let debounceTimer;
    input.addEventListener("input", () => {
        clearNav();
        clearTimeout(debounceTimer);
        const q = input.value.trim();
        debounceTimer = setTimeout(() => {
            currentResults = runSearch(q);
            renderResults(q, currentResults);
        }, 80);
    });

    input.addEventListener("focus", openResults);

    input.addEventListener("keydown", (e) => {
        if (!isOpen && e.key !== "Escape") {
            if (e.key === "ArrowDown") {
                openResults();
                return;
            }
        }
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                navigate(selectedIndex < 0 ? 0 : 1);
                break;
            case "ArrowUp":
                e.preventDefault();
                navigate(-1);
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    const items = results.querySelectorAll(".sr-item");
                    if (items[selectedIndex]) window.location.href = items[selectedIndex].href;
                } else if (currentResults.length === 1) {
                    window.location.href = currentResults[0].url;
                }
                break;
            case "Escape":
                closeResults();
                input.blur();
                break;
        }
    });

    // Close on outside click
    document.addEventListener("pointerdown", (e) => {
        if (!input.contains(e.target) && !results.contains(e.target)) {
            closeResults();
        }
    });

    // ── Global shortcut: Ctrl+K / Cmd+K ──────────────
    // Hanya aktifkan untuk hero search di index.html.
    // Halaman lain: Ctrl+K ditangani oleh nav.js (navbar search).
    const isIndex =
        (window.location.pathname.split("/").pop() || "index.html") === "index.html" ||
        window.location.pathname.split("/").pop() === "";
    if (isIndex) {
        document.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                input.focus();
                input.select();
                openResults();
            }
        });
    }
})();

/* ══════════════════ TABLE WRAPPER AUTO-INJECT ══════════════════ */
/* Membungkus semua .data-table dalam scroll container agar tidak 
   ter-clip di mobile dan tablet (tanpa mengubah HTML satu-per-satu) */
(function () {
    function wrapTables() {
        document.querySelectorAll("table.data-table").forEach((table) => {
            // Jangan wrap dua kali
            if (table.parentElement?.classList.contains("table-scroll-wrap")) return;
            const wrapper = document.createElement("div");
            wrapper.className = "table-scroll-wrap";
            wrapper.setAttribute("role", "region");
            wrapper.setAttribute(
                "aria-label",
                "Tabel data — geser ke kanan untuk melihat semua kolom",
            );
            wrapper.setAttribute("tabindex", "0");
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }
    // Jalankan setelah DOM siap dan setelah semua konten ter-render
    document.addEventListener("DOMContentLoaded", wrapTables);
    window.addEventListener("load", wrapTables);
    // Jalankan juga segera jika DOM sudah siap
    if (document.readyState !== "loading") wrapTables();
})();
