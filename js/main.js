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
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (exists) {
    itemAtual.id = exists.id;
    updateElement(itemAtual);
    console.log(exists.id);
    itens[itens.findIndexexists(element => element.id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

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
  novoItem.appendChild(deleteButton(item.id));

  lista.appendChild(novoItem);
}

function updateElement(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
}

function deleteButton(id) {
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", function () {
    deleteElement(this.parentNode, id);
  });

  return button;
}

function deleteElement(tag, id) {
  tag.remove();
  itens.splice(
    itens.findIndex((element) => element.id === id),
    1
  );
  localStorage.setItem("itens", JSON.stringify(itens));
}
