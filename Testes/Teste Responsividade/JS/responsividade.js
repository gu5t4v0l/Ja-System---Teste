
// Seleciona o ícone do hambúrguer e o menu
const hamburger = document.getElementById('hamburguer-icon');
const menu = document.getElementById('menu-horizontal');

// Adiciona um evento de clique no ícone do hambúrguer
hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');  // Alterna a classe "open" para exibir/ocultar o menu
});
document.addEventListener("click", function (event) {
  if (!menu.contains(event.target) && event.target !== menuHamburguer) {
      menu.classList.remove("open");
  }
});
