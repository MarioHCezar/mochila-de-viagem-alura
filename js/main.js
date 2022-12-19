const form = document.querySelector("#novoItem");
const lista = document.querySelector(".lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((e) =>{
  console.log(e.nome, e.quantidade)
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = e.target.elements["nome"];
  const quantidade = e.target.elements["quantidade"];
  createElement(nome.value, quantidade.value);

  nome.value = "";
  quantidade.value = "";
});

// cria um elemento na lista
function createElement(nome, quantidade) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = quantidade;

  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += nome;

  console.log(novoItem);

  lista.appendChild(novoItem);

  const itemAtual = {
    "nome": nome,
    "quantidade": quantidade,
  }

  itens.push(itemAtual);

  localStorage.setItem("itens", JSON.stringify(itens));
}
