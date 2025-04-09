document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Pega os valores do formulário
      let nome = document.getElementById("Nome").value.trim();
      let email = document.getElementById("Email").value.trim();
      let senha = document.getElementById("Senha").value.trim();

      if (!nome || !email || !senha) {
          alert("Preencha todos os campos!");
          return;
      }

      // Pega os usuários salvos no localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Verifica se o e-mail já existe
      if (users.some(user => user.email === email)) {
          let irParaLogin = confirm("E-mail já cadastrado! Deseja ir para a página de login?");
          if (irParaLogin) {
              window.location.href = "login.html";
          }
          return;
      }

      // Adiciona o novo usuário
      users.push({ nome, email, senha });

      // Salva no localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Cadastro realizado com sucesso! Redirecionando para o login...");
      window.location.href = "login.html"; // Redireciona para o login
  });
});
