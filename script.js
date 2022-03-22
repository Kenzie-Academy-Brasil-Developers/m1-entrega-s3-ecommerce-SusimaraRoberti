let cart = [];
const banco = [
  {
    id: 1,
    srcImg: "imagens/ração1.png",
    altImg: "Ração Gran PLus",
    categoria: "Ração",
    titleProduto: "Ração Gran Plus",
    small:
      "Ideal para felinos castrados, auxiliando na manutenção do peso ideal...",
    parPreco: 150,
    botao: "Adicionar ao carrinho",
  },
  {
    id: 2,
    srcImg: "imagens/Arranhador.png",
    altImg: "Arranhador preto",
    categoria: "Brinquedos",
    titleProduto: "Arranhador",
    small:
      "Brinquedo destinado a incentivar o gato a não arranhar seus móveis...",
    parPreco: 80,
    botao: "Adicionar ao carrinho",
  },
  {
    id: 3,
    srcImg: "imagens/ração2.png",
    altImg: "Ração Premier",
    categoria: "Ração",
    titleProduto: "Ração Premier",
    small:
      "Ideal para felinos castrados de 7 a 12 anos que vivem em ambientes...",
    parPreco: 45,
    botao: "Adicionar ao carrinho",
  },
  {
    id: 4,
    srcImg: "imagens/comedouro.png",
    altImg: "Comedouro",
    categoria: "Acessórios",
    titleProduto: "Comedouro",
    small: "Melhore a qualidade de alimentação do seu pet. Os comedouros...",
    parPreco: 160,
    botao: "Adicionar ao carrinho",
  },
  {
    id: 5,
    srcImg: "imagens/caixa.png",
    altImg: "Caixa de Areia",
    categoria: "Acessórios",
    titleProduto: "Caixa de Areia",
    small:
      "Caixa anti respingos, aumenta a área de proteção e evita a projeção de...",
    parPreco: 186,
    botao: "Adicionar ao carrinho",
  },
  {
    id: 6,
    srcImg: "imagens/Torre.png",
    altImg: "Toca",
    categoria: "Brinquedos",
    titleProduto: "Torre e Toca",
    small:
      "Que tal uma super torre com cama para seu gato, onde ele pode se ...",
    parPreco: 400,
    botao: "Adicionar ao carrinho",
  },
];

//Criando o box e o carrinho
let box = document.getElementById("todos-produtos");

let carrinho = document.getElementById("carrinho");

let botoesCategorias = document.getElementById("botoesCategorias");

let pesquisa = document.getElementById("pesquisa");

//função filtrar por categoria
botoesCategorias.addEventListener("click", filtrarConteudo);
pesquisa.addEventListener("submit", search);

function filtrarConteudo(event) {
  let botao = document.querySelectorAll("button");
  let itemClicado = event.target;

  if (itemClicado.id != "botoesCategorias") {
    botao.forEach((itemButton) => {
      itemButton.classList.remove("botaoPrincipal");
    });
    itemClicado.classList.add("botaoPrincipal");

    let categoriaClicada = itemClicado.innerText;

    const filtrarCategoria = banco.filter((item) => {
      return item.categoria === categoriaClicada;
    });

    box.innerHTML = "";

    if (categoriaClicada == "Todos") {
      mostrarProdutos();
    } else {
      mostrarProdutos(filtrarCategoria);
    }
  }
}

//criando os cards
function createCardsProdutos(
  id,
  srcImg,
  altImg,
  categoria,
  titleProduto,
  small,
  parPreco,
  botao
) {
  let cardsProdutos = document.createElement("article");
  cardsProdutos.setAttribute("class", "cardsProdutos");
  cardsProdutos.innerHTML = `<div class="cardsProdutos-foto">
    <img src=${srcImg} alt=${altImg} />
  </div>
  <div class="cardsProdutos-info">
    <h3 id="cardsProdutos-categoria">${categoria}</h3>
    <h2>${titleProduto}</h2>
    <small
      >${small}</small>
    <p>R$ ${parPreco.toFixed(2)}</p>
    <button onclick='handleAdd(${id})'>${botao}</button>
  </div>`;

  box.appendChild(cardsProdutos);
}
// createCardsProdutos();

//função com banco p/ mostrar produtos
function mostrarProdutos(font = banco) {
  font.forEach((item) =>
    createCardsProdutos(
      item.id,
      item.srcImg,
      item.altImg,
      item.categoria,
      item.titleProduto,
      item.small,
      item.parPreco,
      item.botao
    )
  );
}

//função adicionar ao carrinho
function handleAdd(id) {
  if (cart.filter((item) => item.id === id)[0]) {
    alert("Item já está no carrinho");
    return;
  }

  let selected = banco.filter((item) => item.id === id)[0];
  cart.push(selected);
  createCardCarrinho(
    selected.id,
    selected.srcImg,
    selected.altImg,
    selected.titleProduto,
    selected.parPreco
  );
  atualizaValores();
}

//função criar o card dentro carrinho
function createCardCarrinho(id, srcImg, altImg, titleProduto, parPreco) {
  let cardsProdutos = document.createElement("article");
  cardsProdutos.setAttribute("class", "card");
  cardsProdutos.setAttribute("id", id);
  cardsProdutos.innerHTML = `
    <img src=${srcImg} alt=${altImg} class="card-foto" />
    <div class="card-infoProduto">
      <h3 >${titleProduto}</h3>
      <p>R$ ${parPreco.toFixed(2)}</p>
      <button onclick='handleDelete(${id})'>Remover Produto</button>
    </div>`;

  carrinho.appendChild(cardsProdutos);
}

//função deletar do carrinho
function handleDelete(id) {
  let deletarCarrinho = document.getElementById(id);
  deletarCarrinho.parentNode.removeChild(deletarCarrinho);
  cart = cart.filter((item) => {
    return id !== item.id;
  });
  atualizaValores();
}

function atualizaValores() {
  let qtd = document.getElementById("qtd");
  let valor = document.getElementById("valor");

  qtd.innerHTML = cart.length;
  valor.innerHTML = `R$ ${cart
    .reduce((anterior, atual) => {
      return anterior + atual.parPreco;
    }, 0)
    .toFixed(2)}`;
}

function search(event) {
  event.preventDefault();
  let texto = document.getElementById("texto").value;
  texto = texto.toLowerCase();

  const filtrarTexto = banco.filter((item) => {
    return item.titleProduto.toLowerCase().includes(texto);
  });

  if (filtrarTexto[0]) {
    box.innerHTML = "";
    mostrarProdutos(filtrarTexto);
  } else {
    alert("Produto não encontrado!");
  }
}

//última sempre:mostra tudo
window.onload = mostrarProdutos();
