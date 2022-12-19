const form = document.querySelector("#novoItem");
const lista = document.querySelector(".lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((e) => {
  createElement(e);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = e.target.elements["nome"];
  const quantidade = e.target.elements["quantidade"];

  const exists = itens.find((element) => element.nome === nome.value);

  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value,
  };

  if (exists) {
    itemAtual.id = exists.id;
  } else {
    itemAtual.id = itens.length + 1;

    createElement(itemAtual);
    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

// cria um elemento na lista
function createElement(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;

  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;

  lista.appendChild(novoItem);
}
