function exibirHabilidade(habilidade) {
  const descricaoHabilidades = {
    html5:
      "HTML é uma linguagem de marcação usada para criar páginas da web. Tais tags são usadas para estruturar o conteúdo.",
    css3: "CSS é uma linguagem usada para estilizar a apresentação de páginas da web, definindo o design, o layout e a aparência visual dos elementos HTML.",
    javascript:
      "JavaScript é uma linguagem de programação, amplamente utilizada para criar interatividade em páginas da web, permitindo a manipulação dinâmica do conteúdo e do comportamento dos elementos da página.",
    typescript:
      "TypeScript é uma linguagem de programação que estende o JavaScript adicionando tipagem estática. Ela oferece recursos para melhorar o desenvolvimento de aplicações web.",
    react:
      "React Native é uma biblioteca JavaScript para construir interfaces de usuário. Ela é baseada em componentes reutilizáveis e usa um Virtual DOM para otimizar atualizações de UI, tornando-a popular em aplicativos web dinâmicos.",
    dotnetcore:
      ".NET é uma plataforma de desenvolvimento de software criada pela Microsoft. Ela oferece ferramentas e bibliotecas para criar aplicativos robustos e escaláveis.",
    csharp:
      "C# é uma linguagem de programação desenvolvida pela Microsoft. Ela oferece recursos para criar aplicativos eficientes e seguros.",
    postgresql:
      "PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto. Ele oferece recursos para garantir desempenho e integridade dos dados.",
    microsoftsqlserver:
      "Microsoft SQL Server é um sistema de gerenciamento de banco de dados relacional desenvolvido pela Microsoft. Ele é amplamente utilizado em ambientes corporativos para armazenamento e recuperação eficiente de dados.",
    nodejs:
      "Node.js é um ambiente de execução JavaScript do lado do servidor. Ele permite que os desenvolvedores usem JavaScript para escrever scripts do lado do servidor, possibilitando o desenvolvimento de aplicações web escaláveis e de alto desempenho.",
    jest: "Jest é um framework de testes em JavaScript desenvolvido pelo Facebook. Ele é amplamente utilizado para testar aplicações React e Node.js, oferecendo uma experiência de teste simples e poderosa.",
  };

  const modal = document.getElementById("skill-modal");
  const tituloModal = document.getElementById("skill-modal-title");
  const descricaoModal = document.getElementById("skill-modal-description");

  tituloModal.textContent =
    habilidade.charAt(0).toUpperCase() +
    habilidade
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim();
  descricaoModal.textContent =
    descricaoHabilidades[habilidade] ||
    "Descrição não disponível para esta habilidade.";

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function fecharModal() {
  const modal = document.getElementById("skill-modal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

function criarIconesHabilidades() {
  const containerHabilidades = document.querySelector("#skills .grid");
  const habilidades = [
    { nome: "HTML", icone: "html5" },
    { nome: "CSS", icone: "css3" },
    { nome: "JavaScript", icone: "javascript" },
    { nome: "TypeScript", icone: "typescript" },
    { nome: "React Native", icone: "react" },
    { nome: "Node.js", icone: "nodejs" },
    { nome: "Jest", icone: "jest" },
    { nome: ".NET", icone: "dotnetcore" },
    { nome: "C#", icone: "csharp" },
    { nome: "PostgreSQL", icone: "postgresql" },
    { nome: "SQL Server", icone: "microsoftsqlserver" },
  ];

  containerHabilidades.innerHTML = habilidades
    .map(
      (habilidade) => `
        <div class="skill-icon flex flex-col items-center transition-transform duration-300 transform hover:scale-110" onclick="exibirHabilidade('${
          habilidade.icone
        }')">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${
              habilidade.icone
            }/${habilidade.icone}${
        habilidade.icone === "jest" ? "-plain" : "-original"
      }.svg" 
                 alt="${habilidade.nome}" 
                 class="w-16 h-16 mb-2"
            >
            <span class="text-sm font-medium">${habilidade.nome}</span>
        </div>
    `
    )
    .join("");
}

const alternarTemaBtn = document.getElementById("theme-toggle");
const html = document.documentElement;

alternarTemaBtn.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem(
    "tema",
    html.classList.contains("dark") ? "escuro" : "claro"
  );
});

if (
  localStorage.getItem("tema") === "escuro" ||
  (!localStorage.getItem("tema") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  html.classList.add("dark");
}

document.querySelectorAll('a[href^="#"]').forEach((ancora) => {
  ancora.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const botaoVoltarAoTopo = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    botaoVoltarAoTopo.classList.remove("opacity-0", "invisible");
    botaoVoltarAoTopo.classList.add("opacity-100", "visible");
  } else {
    botaoVoltarAoTopo.classList.add("opacity-0", "invisible");
    botaoVoltarAoTopo.classList.remove("opacity-100", "visible");
  }
});

botaoVoltarAoTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Combinando os dois event listeners de DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Configuração do modal de habilidades
  const modal = document.getElementById("skill-modal");
  const botaoFechar = document.getElementById("skill-modal-close");

  botaoFechar.onclick = fecharModal;
  modal.onclick = (evento) => {
    if (evento.target === modal) {
      fecharModal();
    }
  };

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharModal();
    }
  });

  // Criação dos ícones de habilidades
  criarIconesHabilidades();

  // Configuração do formulário de contato
  const formulario = document.getElementById("contact-form");

  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const dadosFormulario = new FormData(formulario);

      fetch(formulario.action, {
        method: "POST",
        body: dadosFormulario,
        headers: {
          Accept: "application/json",
        },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          if (dados.ok) {
            alert("Mensagem enviada com sucesso!");
            formulario.reset();
          } else {
            alert(
              "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente."
            );
          }
        })
        .catch((erro) => {
          console.error("Erro:", erro);
          alert(
            "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente."
          );
        });
    });
  }
});
