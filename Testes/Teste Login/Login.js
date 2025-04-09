// document.querySelector(".form")

// .addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = document.getElementById("Email").value;
//   const password = document.getElementById("Senha").value;

//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   const validUser = users.find(user => user.email === email && user.password === password);

//   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//   .then(response => {
//       alert("Login bem-sucedido!");
//     localStorage.setItem("loggedUser", JSON.stringify(validUser)); // Salva o usuário logado
//       window.location.href = "TesteCargo.html";
//   })
//   .catch(error => console.error('Erro!', error.message));

// });



// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.querySelector(".form"); // Certifique-se de que o seletor está correto

//   if (!form) {
//       console.error("Erro: Formulário não encontrado!");
//       return;
//   }

//   form.addEventListener("submit", function (e) {
//       e.preventDefault();

//       const email = document.getElementById("Email").value.trim();
//       const password = document.getElementById("Senha").value.trim();

//       let users = JSON.parse(localStorage.getItem("users")) || [];

//       const validUser = users.find(user => user.email === email && user.password === password);

//       if (validUser) {
//           if (typeof scriptURL === "undefined") {
//               console.error("Erro: scriptURL não está definido!");
//               return;
//           }

//           fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//               .then(response => {
//                   alert("Login bem-sucedido!");
//                   localStorage.setItem("loggedUser", JSON.stringify(validUser)); // Salva o usuário logado
//                   window.location.href = "TesteCargo.html";
//               })
//               .catch(error => console.error("Erro ao enviar dados!", error.message));
//       } else {
//           alert("Usuário não encontrado. Por favor, cadastre-se.");
//           window.location.href = "Cadastro.html"; // Redireciona para a página de cadastro
//       }
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("password").value.trim();

        // Recupera os usuários cadastrados do LocalStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Verifica se o usuário existe
        const user = users.find(user => user.email === email);

        if (!user) {
            alert("Usuário não encontrado! Verifique o e-mail.");
            return;
        }

        // Verifica se a senha está correta
        if (user.senha !== senha) {
            alert("Senha incorreta!");
            return;
        }

        alert("Login realizado com sucesso!");
        window.location.href = "Testecargo.html"; // Redireciona para a página inicial
    });
});
