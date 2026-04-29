const projects = [
  {
    id: "potion-panic",
    title: "PotionPanic",
    role: "Networking Engineer",
    summary:
      "A chaotic co-op apothecary game where players gather, process, and brew ingredients to fulfill timed potion requests for score.",
    page: "projects/potion-panic.html",
    itchEmbed: {
      src: "https://itch.io/embed/4345652?bg_color=000000&fg_color=ffffff&link_color=7eb8ff&border_color=5a6fa8",
      fallbackUrl: "https://null-forge-studio.itch.io/potionpanic",
      fallbackLabel: "Potion Panic on itch.io"
    }
  },
  {
    id: "operation-starfall",
    title: "Operation StarFall",
    role: "Gameplay Engineer",
    summary: "A fast-paced sci-fi FPS where players use fluid traversal and combat to survive waves, complete objectives, and stop a station-wide catastrophe.",
    page: "projects/operation-starfall.html",
    itchEmbed: {
      src: "https://itch.io/embed/3421201?bg_color=000000&fg_color=ffffff&link_color=7eb8ff&border_color=5a6fa8",
      fallbackUrl: "https://shiznizz.itch.io/operation-starfall",
      fallbackLabel: "Operation Starfall by ShizNizz"
    }
  },
  {
    id: "highway-heat",
    title: "HighwayHeat",
    role: "Systems Engineer",
    summary:
      "An infinite vertical shooter inspired by 1942, focused on survival, escalating enemy pressure, and run-based progression through upgrades.",
    page: "projects/highway-heat.html",
    itchEmbed: {
      src: "https://itch.io/embed/4526796?bg_color=000000&fg_color=ffffff&link_color=7eb8ff&border_color=5a6fa8",
      fallbackUrl: "https://shiznizz.itch.io/highwayheat",
      fallbackLabel: "HighwayHeat by ShizNizz"
    }
  }
];

const grid = document.getElementById("project-grid");

function renderProjects() {
  grid.innerHTML = "";

  projects.forEach((project) => {
    const itchBlock =
      project.itchEmbed != null
        ? `<div class="project-itch-embed">
      <iframe
        title="${project.title} on itch.io"
        frameborder="0"
        src="${project.itchEmbed.src}"
        width="552"
        height="167"
        loading="lazy"
      ><a href="${project.itchEmbed.fallbackUrl}">${project.itchEmbed.fallbackLabel}</a></iframe>
    </div>`
        : "";

    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-card-intro">
        <h3>${project.title}</h3>
        ${project.role ? `<p><strong>Role:</strong> ${project.role}</p>` : ""}
        <p>${project.summary}</p>
      </div>
      ${itchBlock}
      <a class="cta-btn cta-outline project-card-btn" href="${project.page}">View project</a>
    `;
    grid.appendChild(card);
  });
}

renderProjects();

const showcaseSlides = [
  ...[1, 2, 3, 4].map((n) => ({
    projectTitle: "PotionPanic",
    src: `assets/images/potion-panic/Potion_${n}.png`,
    alt: `PotionPanic screenshot ${n}`
  })),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({
    projectTitle: "Operation StarFall",
    src: `assets/images/operation-starfall/OeprationStarfallScreenshot${n}.png`,
    alt: `Operation StarFall screenshot ${n}`
  })),
  ...[1, 2, 3].map((n) => ({
    projectTitle: "HighwayHeat",
    src: `assets/images/highway-heat/Highway_${n}.png`,
    alt: `HighwayHeat screenshot ${n}`
  }))
];

function initProjectShowcase() {
  const titleEl = document.getElementById("showcase-project-title");
  const imgEl = document.getElementById("showcase-image");
  const thumbsEl = document.getElementById("showcase-thumbs");
  const prevBtn = document.getElementById("showcase-prev");
  const nextBtn = document.getElementById("showcase-next");

  if (!titleEl || !imgEl || !thumbsEl || !prevBtn || !nextBtn || showcaseSlides.length === 0) {
    return;
  }

  let index = 0;

  function renderSlide(i) {
    const slide = showcaseSlides[i];
    titleEl.textContent = slide.projectTitle;
    imgEl.src = slide.src;
    imgEl.alt = slide.alt;

    thumbsEl.querySelectorAll(".showcase-thumb").forEach((btn, idx) => {
      btn.classList.toggle("is-active", idx === i);
      btn.setAttribute("aria-selected", idx === i ? "true" : "false");
    });
  }

  showcaseSlides.forEach((slide, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "showcase-thumb";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-label", `${slide.projectTitle}: image ${idx + 1}`);
    btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");
    const thumbImg = document.createElement("img");
    thumbImg.src = slide.src;
    thumbImg.alt = "";
    thumbImg.loading = "lazy";
    btn.appendChild(thumbImg);
    btn.addEventListener("click", () => {
      index = idx;
      renderSlide(index);
    });
    thumbsEl.appendChild(btn);
  });

  function step(delta) {
    index = (index + delta + showcaseSlides.length) % showcaseSlides.length;
    renderSlide(index);
  }

  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  renderSlide(0);
}

initProjectShowcase();
