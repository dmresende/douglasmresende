function showSkill(skill) {
  

  const body = document.body;

  const boxContent = document.querySelector(".skill-modal");

  const skillDescriptions = {
    html: "HTML é uma linguagem de marcação usada para criar páginas da web. Tais tags são usadas para estruturar o conteúdo.",
    css: "CSS é uma linguagem usada para estilizar a apresentação de páginas da web, definindo o design, o layout e a aparência visual dos elementos HTML.",
    js: "JavaScript é uma linguagem de programação, amplamente utilizada para criar interatividade em páginas da web, permitindo a manipulação dinâmica do conteúdo e do comportamento dos elementos da página.",
    typescript: "TypeScript é uma linguagem de programação que estende o JavaScript adicionando tipagem estática. Ela oferece recursos para melhorar o desenvolvimento de aplicações web.",
    react: "React e React-Native são bibliotecas JavaScript para construir interfaces de usuário. Elas são baseadas em componentes reutilizáveis e usam um Virtual DOM para otimizar atualizações de UI, tornando-as populares em aplicativos web dinâmicos e Apps para Android.",
    dotnet: ".NET é uma plataforma de desenvolvimento de software criada pela Microsoft. Ela oferece ferramentas e bibliotecas para criar aplicativos robustos e escaláveis.",
    csharp: "C# é uma linguagem de programação desenvolvida pela Microsoft. Ela oferece recursos para criar aplicativos eficientes e seguros.",
    postgres: "PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto. Ele oferece recursos para garantir desempenho e integridade dos dados.",
    git: "Git é um sistema de controle de versão que registra alterações em arquivos, facilitando o gerenciamento do histórico de um projeto de software.",
    sqlite: "SQLite é um banco de dados relacional leve e de código aberto. Ele oferece características para integração e desempenho em aplicativos de pequeno e médio porte."
  };

  const content = skillDescriptions[skill] || "Descrição não disponível para esta habilidade.";

  if (boxContent.classList.contains("skill-modal-hidden")) {
    body.classList.add("dark-background");
    boxContent.classList.remove("skill-modal-hidden");
  }

  const divContent = `
    <img class="skill-modal-close" src="img/skills/fechar.svg" alt="Btn close modal">
    <p class="skill-modal-text">${content}</p>
  `;

  boxContent.innerHTML = divContent;

  const btnClose = document.querySelector(".skill-modal-close");
  
  btnClose.addEventListener("click", () => {
    boxContent.classList.add("skill-modal-hidden");
    body.classList.remove("dark-background");
  });
}

// Função para alternar o tema
function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.contains('dark-mode');
  
  if (isDarkMode) {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
}

// Adicionar evento de clique ao botão de alternância de tema
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', toggleTheme);

// Verificar e aplicar o tema salvo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
