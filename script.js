// ── Skills data ──────────────────────────────────────────────
const SKILLS = [
  {
    id: "dotnet",
    name: ".NET",
    icon: "https://raw.githubusercontent.com/dotnet/brand/main/logo/dotnet-logo.svg",
    desc: "Plataforma de desenvolvimento criada pela Microsoft para construção de aplicações robustas, escaláveis e seguras, com suporte multi-linguagem e vasto ecossistema de bibliotecas.",
  },
  {
    id: "csharp",
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    desc: "Linguagem de programação orientada a objetos desenvolvida pela Microsoft. Fortemente tipada, moderna e ideal para aplicações enterprise, APIs e sistemas desktop.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    desc: "Linguagem de programação amplamente utilizada para criar interatividade em páginas web, manipulação dinâmica do DOM e construção de aplicações modernas no browser e servidor.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    desc: "Superset do JavaScript que adiciona tipagem estática ao código. Melhora a manutenibilidade, facilita a detecção de erros em tempo de desenvolvimento e eleva a qualidade de aplicações.",
  },
  {
    id: "react",
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    desc: "Framework baseado em React para construção de aplicativos móveis nativos usando JavaScript. Permite compartilhar lógica de negócio entre iOS e Android com uma única codebase.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    desc: "Ambiente de execução JavaScript server-side baseado no V8. Permite criar APIs performáticas, microsserviços e aplicações web escaláveis com arquitetura orientada a eventos.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    desc: "Sistema de gerenciamento de banco de dados relacional open-source de alta performance. Reconhecido pela robustez, conformidade com SQL e recursos avançados como JSONB e full-text search.",
  },
  {
    id: "microsoftsqlserver",
    name: "SQL Server",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    desc: "SGBD relacional da Microsoft amplamente adotado em ambientes corporativos. Oferece alta disponibilidade, integração profunda com o ecossistema .NET e ferramentas de BI integradas.",
  },
  {
    id: "jest",
    name: "Jest",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    desc: "Framework de testes em JavaScript criado pelo Meta (Facebook). Simples de configurar, com suporte a mocks, snapshots e cobertura de código. Amplamente usado com React e Node.js.",
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

// ── Theme toggle (keeps system preference) ───────────────────
const themeBtn = document.getElementById("theme-toggle");

function aplicarTema() {
  const salvo = localStorage.getItem("tema");
  const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const deveEscuro = salvo ? salvo === "escuro" : prefereEscuro;
  document.documentElement.classList.toggle("dark", deveEscuro);
}
aplicarTema();

themeBtn.addEventListener("click", () => {
  const escuro = document.documentElement.classList.toggle("dark");
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
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
          btn.style.background = "#34D399";
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