function showSkill(skill) {
  const body = document.body;
  const parameter = skill;
  const boxContent = document.querySelector(".skill-modal");

  let divContent;
  let content;

  if (boxContent.classList.contains("skill-modal-hidden")) {
    body.classList.add("dark-background");
    boxContent.classList.remove("skill-modal-hidden");
  }

  validateParameter();
  showContent();

  function validateParameter() {
    if (parameter == "html") {
      content =
        "HTML é uma linguagem de marcação usada para criar páginas da web. Tais tags são usadas para estruturar o conteúdo.";
    } else if (parameter == "css") {
      content =
        "CSS é uma linguagem usada para estilizar a apresentação de páginas da web, definindo o design, o layout e a aparência visual dos elementos HTML.";
    } else if (parameter == "js") {
      content =
        "JavaScript é uma linguagem de programação, amplamente utilizada para criar interatividade em páginas da web, permitindo a manipulação dinâmica do conteúdo e do comportamento dos elementos da página.";
    } else if (parameter == "typescript") {
      content =
        "TypeScript é uma linguagem de programação que estende o JavaScript adicionando tipagem estática. Quais recursos ela oferece para melhorar o desenvolvimento de aplicações web?.";
    } else if (parameter == "react") {
      content =
        "React e React-Native são bibliotecas JavaScript para construir interfaces de usuário. Ela é baseada em componentes reutilizáveis ​​e usa um Virtual DOM para otimizar atualizações de UI, tornando-a popular em aplicativos web dinâmicos e App para android.";
    } else if (parameter == "dotnet") {
      content =
        ".NET é uma plataforma de desenvolvimento de software criada pela Microsoft. Quais ferramentas e bibliotecas ela oferece para criar aplicativos robustos e escaláveis?";
    } else if (parameter == "csharp") {
      content =
        "C# é uma linguagem de programação desenvolvida pela Microsoft. Quais recursos ela oferece para criar aplicativos eficientes e seguros.";
    } else if (parameter == "postgres") {
      content =
        "PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto. Quais recursos ele oferece para garantir desempenho e integridade dos dados.";
    } else if (parameter == "git") {
      content =
        "Git é um sistema de controle de versão que registra alterações em arquivos, facilitando o gerenciamento do histórico de um projeto de software.";
    } else if (parameter == "sqlite") {
      content =
        "SQLite é um banco de dados relacional leve e de código aberto. Quais características ele oferece para integração e desempenho em aplicativos de pequeno e médio porte.";
    }
  }

  function showContent() {
    divContent = `
            <img class="skill-modal-close" src="img/skills/fechar.svg" alt="Btn close modal">
            <p class="skill-modal-text">${content}</p>
        `;

    boxContent.innerHTML = divContent;

    closeSkill();
  }

  function closeSkill() {
    const btnClose = document.querySelector(".skill-modal-close");

    btnClose.addEventListener("click", hidden);

    function hidden() {
      boxContent.classList.add("skill-modal-hidden");
      body.classList.remove("dark-background");
    }
  }
}
