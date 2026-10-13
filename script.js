// ============================================================
// Indra Prayoga Saputra — Creative Portfolio
// Main Script: Navigation, Animations, GitHub API, Filters,
//              Project Modal, Accessibility, and more.
// ============================================================

// --------------- CONFIGURATION ---------------
const PORTFOLIO_CONFIG = {
  name: "Indra Prayoga Saputra",
  githubUsername: "indraaps", // ← Username GitHub
  showGithubProjects: true,
  pinnedRepositories: [],          // Nama repo yang diprioritaskan, misal: ["repo-saya", "proyek-keren"]
  excludeRepositories: [],         // Nama repo yang disembunyikan, misal: ["repo-rahasia"]
  repositoryLimit: 12,
  localProjectsPath: "data/projects.json"
};

// --------------- UTILITIES ---------------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --------------- SAFE INITIALIZATION ---------------
// Wrap each feature in try/catch so one error doesn't break everything
function safeInit(name, fn) {
  try { fn(); }
  catch (err) { console.warn(`[Portfolio] Error in ${name}:`, err); }
}

// ============================================================
// 1. MOBILE NAVIGATION
// ============================================================
safeInit('Navigation', () => {
  const menuToggle = $('.menu-toggle');
  const nav = $('.nav');
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
    document.body.classList.toggle('nav-open', !expanded);
  });

  $$('.nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }));

  // Close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      menuToggle.focus();
    }
  });
});

// ============================================================
// 2. SCROLL REVEAL ANIMATIONS
// ============================================================
safeInit('Reveal Animations', () => {
  if (prefersReducedMotion) {
    $$('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach(el => revealObserver.observe(el));
});

// ============================================================
// 3. ACTIVE NAV LINK INDICATOR
// ============================================================
safeInit('Active Nav Link', () => {
  const sections = $$('main section[id]');
  const navLinks = $$('.nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link =>
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach(section => activeObserver.observe(section));
});

// ============================================================
// 4. CURSOR GLOW (desktop only)
// ============================================================
safeInit('Cursor Glow', () => {
  const glow = $('.cursor-glow');
  if (!glow) return;
  if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
    window.addEventListener('pointermove', e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }
});

// ============================================================
// 5. AUTO YEAR IN FOOTER
// ============================================================
safeInit('Auto Year', () => {
  const yearEl = $('.contact-bottom span:last-child');
  if (yearEl) yearEl.textContent = `INDRA PRAYOGA SAPUTRA © ${new Date().getFullYear()}`;
});

// ============================================================
// 6. PROJECT DETAIL MODAL (Dialog)
// ============================================================
safeInit('Project Modal', () => {
  const dialog = $('#project-dialog');
  if (!dialog) return;
  const closeBtn = $('.dialog-close', dialog);

  // Open handler — works for both local cards and dynamically generated GitHub cards
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.project-open');
    if (!btn) return;

    const projectId = btn.dataset.project;
    const projectData = btn.dataset.projectData ? JSON.parse(btn.dataset.projectData) : null;

    if (projectData) {
      // GitHub repo or local JSON project
      fillDialogFromData(projectData);
    } else if (projectId && localProjectDetails[projectId]) {
      // Static local project (hardcoded)
      fillDialogFromLocal(localProjectDetails[projectId]);
    }
    dialog.showModal();
  });

  // Close with button
  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());

  // Close by clicking backdrop
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });

  // Close with Escape is handled natively by <dialog>

  // Trap focus inside dialog for accessibility
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusable = $$('button, a, [tabindex]', dialog).filter(el => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
});

// Static local project details for the existing 3 concept projects
const localProjectDetails = {
  studyspace: {
    kicker: 'KONSEP WEBSITE · CONTOH 001',
    title: 'StudySpace',
    description: 'Konsep dashboard belajar untuk membantu pengguna melihat aktivitas, menyusun tugas, dan menjaga fokus dalam satu tempat.',
    goal: 'Mengeksplorasi hierarki informasi, kartu ringkasan, visualisasi progres, dan tata letak dashboard yang mudah dipindai.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'UI Concept'],
    status: 'Konsep',
    repositoryUrl: '',
    demoUrl: ''
  },
  gearup: {
    kicker: 'KONSEP APLIKASI · CONTOH 002',
    title: 'GearUp Workshop',
    description: 'Konsep antarmuka pengelolaan servis bengkel dengan pendekatan visual yang tegas dan alur kerja yang praktis.',
    goal: 'Mempelajari bagaimana data servis, status pekerjaan, dan informasi pelanggan dapat disajikan secara terstruktur.',
    technologies: ['Web Design', 'Dashboard', 'Prototype'],
    status: 'Konsep',
    repositoryUrl: '',
    demoUrl: ''
  },
  journal: {
    kicker: 'EKSPLORASI UI · CONTOH 003',
    title: 'Idea Journal',
    description: 'Eksplorasi antarmuka aplikasi untuk menyimpan ide, catatan singkat, dan inspirasi sehari-hari.',
    goal: 'Mencoba kombinasi tipografi ekspresif, warna cerah, komponen sederhana, dan identitas visual yang konsisten.',
    technologies: ['UI/UX', 'Design System', 'Prototyping'],
    status: 'Konsep',
    repositoryUrl: '',
    demoUrl: ''
  }
};

function fillDialogFromLocal(project) {
  const d = $('#project-dialog');
  $('#dialog-kicker', d).textContent = project.kicker;
  $('#dialog-title', d).textContent = project.title;
  $('#dialog-description', d).textContent = project.description;
  $('#dialog-goal', d).textContent = project.goal;
  $('#dialog-status', d).textContent = project.status || 'Konsep';

  // Technologies
  const techContainer = $('#dialog-tech', d);
  techContainer.innerHTML = '';
  (project.technologies || []).forEach(t => {
    const span = document.createElement('span');
    span.textContent = t;
    techContainer.appendChild(span);
  });

  // Links
  const linksContainer = $('#dialog-links', d);
  linksContainer.innerHTML = '';
  if (project.repositoryUrl) {
    linksContainer.innerHTML += `<a href="${escapeHtml(project.repositoryUrl)}" target="_blank" rel="noreferrer" class="button button-primary button-sm">Lihat Source Code <span>↗</span></a>`;
  }
  if (project.demoUrl) {
    linksContainer.innerHTML += `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noreferrer" class="button button-light button-sm">Live Demo <span>↗</span></a>`;
  }
  if (!project.repositoryUrl && !project.demoUrl) {
    linksContainer.innerHTML = '<p class="dialog-no-link">Tautan belum tersedia untuk konsep ini.</p>';
  }
}

function fillDialogFromData(data) {
  const d = $('#project-dialog');
  const isExample = data.isExample;
  const kicker = isExample
    ? `${(data.status || 'KONSEP').toUpperCase()} · CONTOH`
    : data.language
      ? `${data.language.toUpperCase()} · REPOSITORY`
      : 'REPOSITORY';

  $('#dialog-kicker', d).textContent = kicker;
  $('#dialog-title', d).textContent = data.name || 'Tanpa Nama';
  $('#dialog-description', d).textContent = data.description || 'Tidak ada deskripsi yang tersedia.';
  $('#dialog-goal', d).textContent = data.goal || (isExample
    ? 'Detail tujuan konsep ini belum ditambahkan.'
    : 'Lihat repository untuk informasi lebih lanjut.');
  $('#dialog-status', d).textContent = data.status || (isExample ? 'Konsep' : 'Aktif');

  // Technologies
  const techContainer = $('#dialog-tech', d);
  techContainer.innerHTML = '';
  const techs = data.technologies || (data.language ? [data.language] : []);
  techs.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t;
    techContainer.appendChild(span);
  });

  // Links
  const linksContainer = $('#dialog-links', d);
  linksContainer.innerHTML = '';
  const repoUrl = data.repositoryUrl || data.html_url || '';
  const demoUrl = data.demoUrl || data.homepage || '';
  if (repoUrl) {
    linksContainer.innerHTML += `<a href="${escapeHtml(repoUrl)}" target="_blank" rel="noreferrer" class="button button-primary button-sm">Lihat Source Code <span>↗</span></a>`;
  }
  if (demoUrl) {
    linksContainer.innerHTML += `<a href="${escapeHtml(demoUrl)}" target="_blank" rel="noreferrer" class="button button-light button-sm">Live Demo <span>↗</span></a>`;
  }
  if (!repoUrl && !demoUrl) {
    linksContainer.innerHTML = '<p class="dialog-no-link">Tautan belum tersedia.</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================
// 7. PROJECT FILTERS
// ============================================================
safeInit('Project Filters', () => {
  const filterContainer = $('.project-filters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const button = e.target.closest('.filter-btn');
    if (!button) return;

    $$('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    $$('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ============================================================
// 8. GITHUB API INTEGRATION
// ============================================================
safeInit('GitHub Integration', () => {
  if (!PORTFOLIO_CONFIG.showGithubProjects) return;
  if (PORTFOLIO_CONFIG.githubUsername === 'GANTI_DENGAN_USERNAME_GITHUB') {
    console.info('[Portfolio] GitHub username belum dikonfigurasi. Menggunakan data lokal saja.');
    return;
  }

  const grid = $('.project-grid');
  if (!grid) return;

  // Add loading indicator
  const loader = document.createElement('div');
  loader.className = 'github-loader';
  loader.id = 'github-loader';
  loader.innerHTML = `
    <div class="loader-spinner"></div>
    <p>Memuat repository dari GitHub...</p>
  `;
  grid.after(loader);

  fetchGitHubRepos();
});

async function fetchGitHubRepos() {
  const loader = $('#github-loader');
  const grid = $('.project-grid');

  try {
    const url = `https://api.github.com/users/${encodeURIComponent(PORTFOLIO_CONFIG.githubUsername)}/repos?sort=updated&per_page=${PORTFOLIO_CONFIG.repositoryLimit}&type=public`;
    const response = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Rate limit tercapai. Coba lagi nanti.');
      }
      if (response.status === 404) {
        throw new Error(`Username "${PORTFOLIO_CONFIG.githubUsername}" tidak ditemukan.`);
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    let repos = await response.json();

    // Filter excluded repos
    repos = repos.filter(r => !PORTFOLIO_CONFIG.excludeRepositories.includes(r.name));

    // Sort: pinned first, then by updated_at
    repos.sort((a, b) => {
      const aPinned = PORTFOLIO_CONFIG.pinnedRepositories.includes(a.name);
      const bPinned = PORTFOLIO_CONFIG.pinnedRepositories.includes(b.name);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    // Limit
    repos = repos.slice(0, PORTFOLIO_CONFIG.repositoryLimit);

    if (repos.length === 0) {
      showGitHubMessage('Tidak ada repository publik yang ditemukan.');
      return;
    }

    // Add GitHub section heading
    const ghHeading = document.createElement('div');
    ghHeading.className = 'github-section-label reveal';
    ghHeading.innerHTML = '<span class="gh-icon">⚙</span> Repository GitHub';
    grid.after(ghHeading);

    // Create cards container
    const ghGrid = document.createElement('div');
    ghGrid.className = 'project-grid github-grid';
    ghGrid.id = 'github-grid';
    ghHeading.after(ghGrid);

    repos.forEach(repo => {
      const card = createGitHubCard(repo);
      ghGrid.appendChild(card);
    });

    // Re-observe new reveals
    if (!prefersReducedMotion) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      $$('.reveal:not(.visible)', ghGrid).forEach(el => obs.observe(el));
      if (!ghHeading.classList.contains('visible')) obs.observe(ghHeading);
    } else {
      $$('.reveal', ghGrid).forEach(el => el.classList.add('visible'));
      ghHeading.classList.add('visible');
    }

    updateFilterCounts();

  } catch (err) {
    console.error('[Portfolio] GitHub API error:', err);
    showGitHubMessage(err.message || 'Gagal memuat repository. Menampilkan proyek lokal saja.');
  } finally {
    if (loader) loader.remove();
  }
}

function createGitHubCard(repo) {
  const card = document.createElement('article');
  card.className = 'project-card github-card reveal';
  card.dataset.category = 'github';

  const langColor = getLanguageColor(repo.language);
  const updatedDate = repo.updated_at ? formatRelativeDate(new Date(repo.updated_at)) : '';

  card.innerHTML = `
    <div class="project-visual visual-github">
      <div class="gh-repo-visual">
        <div class="gh-visual-header">
          <span class="gh-visual-icon">📁</span>
          <span class="gh-visual-name">${escapeHtml(repo.name)}</span>
        </div>
        <div class="gh-visual-desc">${escapeHtml(repo.description || 'Tidak ada deskripsi')}</div>
        <div class="gh-visual-meta">
          ${repo.language ? `<span class="gh-lang"><span class="gh-lang-dot" style="background:${langColor}"></span>${escapeHtml(repo.language)}</span>` : ''}
          ${repo.stargazers_count > 0 ? `<span class="gh-stars">⭐ ${repo.stargazers_count}</span>` : ''}
          ${updatedDate ? `<span class="gh-date">${updatedDate}</span>` : ''}
        </div>
      </div>
      <span class="visual-label">GITHUB</span>
    </div>
    <div class="project-info">
      <div>
        <p class="project-type">GITHUB REPOSITORY${repo.language ? ' · ' + escapeHtml(repo.language).toUpperCase() : ''}</p>
        <h3>${escapeHtml(repo.name)}</h3>
        <p class="project-desc">${escapeHtml(repo.description || 'Tidak ada deskripsi yang tersedia.')}</p>
      </div>
      <button class="project-open" aria-label="Lihat detail ${escapeHtml(repo.name)}" data-project-data='${JSON.stringify({
        name: repo.name,
        description: repo.description || '',
        language: repo.language || '',
        repositoryUrl: repo.html_url,
        demoUrl: repo.homepage || '',
        status: 'Aktif',
        technologies: repo.language ? [repo.language] : [],
        goal: repo.description || 'Lihat repository untuk informasi lebih lanjut.'
      }).replace(/'/g, '&#39;')}'>↗</button>
    </div>
    <div class="tech-tags">
      ${repo.language ? `<span>${escapeHtml(repo.language)}</span>` : ''}
      ${repo.stargazers_count > 0 ? `<span>⭐ ${repo.stargazers_count}</span>` : ''}
      ${repo.fork ? '<span>Fork</span>' : ''}
    </div>
  `;

  return card;
}

function showGitHubMessage(message) {
  const grid = $('.project-grid');
  if (!grid) return;
  const msg = document.createElement('p');
  msg.className = 'github-message';
  msg.innerHTML = `<span>ⓘ</span> ${escapeHtml(message)}`;
  grid.after(msg);
}

function getLanguageColor(lang) {
  const colors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5',
    HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', PHP: '#4f5d95',
    'C++': '#f34b7d', C: '#555555', 'C#': '#178600', Go: '#00add8',
    Rust: '#dea584', Ruby: '#701516', Swift: '#fa7343', Kotlin: '#a97bff',
    Dart: '#00b4ab', Vue: '#41b883', Shell: '#89e051', Lua: '#000080'
  };
  return colors[lang] || '#a98bff';
}

function formatRelativeDate(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays < 1) return 'Hari ini';
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
  return `${Math.floor(diffDays / 365)} tahun lalu`;
}

function updateFilterCounts() {
  const allCards = $$('.project-card');
  const counts = { all: allCards.length };

  allCards.forEach(card => {
    const cat = card.dataset.category;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  // Add "GitHub" filter button if needed
  const filterGroup = $('.project-filters');
  if (!filterGroup) return;

  const existingGhBtn = $('[data-filter="github"]', filterGroup);
  if (!existingGhBtn && counts.github) {
    const ghBtn = document.createElement('button');
    ghBtn.className = 'filter-btn';
    ghBtn.dataset.filter = 'github';
    ghBtn.innerHTML = `GitHub <span>${counts.github}</span>`;
    filterGroup.appendChild(ghBtn);
  }

  // Update existing counts
  $$('.filter-btn', filterGroup).forEach(btn => {
    const f = btn.dataset.filter;
    const countSpan = $('span', btn);
    if (countSpan && counts[f] !== undefined) {
      countSpan.textContent = String(counts[f]).padStart(2, '0');
    }
  });
}

// ============================================================
// 9. LOAD LOCAL PROJECTS (Fallback)
// ============================================================
safeInit('Local Projects Fallback', () => {
  // This loads fallback data from projects.json if GitHub API failed
  // or as supplement. We check after a delay if GitHub cards appeared.
  setTimeout(() => {
    const ghGrid = $('#github-grid');
    // If GitHub was not configured or failed, local data is already shown in HTML
    // If GitHub succeeded, we already have the cards
    // Nothing else needed here for the basic implementation
  }, 5000);
});

// ============================================================
// 10. BACK TO TOP BUTTON
// ============================================================
safeInit('Back to Top', () => {
  const backTop = $('.back-top');
  if (!backTop) return;
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
});

// ============================================================
// 11. SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================================
safeInit('Smooth Scroll', () => {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = $(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

// ============================================================
// 12. IMAGE FALLBACK HANDLER
// ============================================================
safeInit('Image Fallbacks', () => {
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.style.display = 'none';
      const fallback = e.target.nextElementSibling;
      if (fallback && fallback.classList.contains('img-fallback')) {
        fallback.style.display = 'flex';
      }
    }
  }, true);
});

// ============================================================
// 13. TOAST NOTIFICATIONS
// ============================================================
function showToast(message, duration = 3000) {
  const toast = $('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
