// ── Skills data ──────────────────────────────────────────────
const SKILLS = [
  {
    id: "csharp",
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    desc: "Linguagem de programação orientada a objetos desenvolvida pela Microsoft, ideal para APIs, aplicações desktop e serviços.",
  },
  {
    id: "dotnet",
    name: ".NET / ASP.NET Core",
    icon: "https://raw.githubusercontent.com/dotnet/brand/main/logo/dotnet-logo.svg",
    desc: "Plataforma de desenvolvimento da Microsoft para aplicações web, APIs e serviços de alta performance e escalabilidade.",
  },
  {
    id: "microsoftsqlserver",
    name: "SQL Server",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    desc: "SGBD relacional da Microsoft com foco em otimização de queries, procedures e integração com o ecossistema .NET.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    desc: "Banco de dados relacional open-source de alta performance e confiabilidade.",
  },
  {
    id: "docker",
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    desc: "Containerização de aplicações para deploy consistente e portátil entre ambientes.",
  },
  {
    id: "git",
    name: "Git / GitLab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    desc: "Controle de versionamento, branches, Pull Requests e colaboração em equipe.",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    desc: "Editor de código-fonte com suporte a debug, extensões e integração com .NET.",
  },
  {
    id: "apis",
    name: "APIs REST / SOAP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    desc: "Desenvolvimento e integração de APIs RESTful e serviços SOAP para comunicação entre sistemas.",
  },
];

// ── Render skill cards ────────────────────────────────────────
function criarIconesHabilidades() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  SKILLS.forEach((skill) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", skill.name);
    card.innerHTML = `
      <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
      <span class="skill-name">${skill.name}</span>
    `;
    card.addEventListener("click", () => exibirHabilidade(skill.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") exibirHabilidade(skill.id);
    });
    grid.appendChild(card);
  });
}

// ── Modal ─────────────────────────────────────────────────────
function exibirHabilidade(id) {
  const skill = SKILLS.find((s) => s.id === id);
  if (!skill) return;

  document.getElementById("skill-modal-title").textContent = skill.name;
  document.getElementById("skill-modal-description").textContent = skill.desc;

  const iconEl = document.getElementById("skill-modal-icon");
  iconEl.src = skill.icon;
  iconEl.alt = skill.name;

  const modal = document.getElementById("skill-modal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  const modal = document.getElementById("skill-modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.pageYOffset > 40);
});

// ── Smooth scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((ancora) => {
  ancora.addEventListener("click", function (e) {
    const alvo = document.querySelector(this.getAttribute("href"));
    if (alvo) {
      e.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ── Back to top ───────────────────────────────────────────────
const botaoTopo = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  botaoTopo.classList.toggle("visible", window.pageYOffset > 300);
});
botaoTopo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  criarIconesHabilidades();

  // Modal close handlers
  document.getElementById("skill-modal-close").addEventListener("click", fecharModal);
  document.getElementById("skill-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) fecharModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
  });

  // Contact form
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const originalText = btn.textContent;
      btn.textContent = "Enviando...";
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        if (data.ok) {
          btn.textContent = "Mensagem enviada! ✓";
          btn.style.background = "#9B4F96";
          form.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = "";
            btn.disabled = false;
          }, 3500);
        } else {
          throw new Error();
        }
      } catch {
        btn.textContent = "Erro ao enviar. Tente novamente.";
        btn.style.background = "#f87171";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 3500);
      }
    });
  }

  // Scroll-reveal animation via IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".skill-card, .timeline-item, .project-card, .stat-card")
    .forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 0.5s ${i * 0.05}s ease, transform 0.5s ${i * 0.05}s ease`;
      observer.observe(el);
    });
});