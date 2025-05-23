let restauranteId = null; 

function mostrarCadastro() {
  ocultarTodos();
  document.getElementById("formCadastro").style.display = "block";
}

function mostrarLogin() {
  ocultarTodos();
  document.getElementById("formLogin").style.display = "block";
}

function mostrarPainel() {
  ocultarTodos();
  document.getElementById("painel").style.display = "block";

  // Habilita os botões de navegação
  const btnMesas = document.getElementById("btnMesas");
  const btnCardapio = document.getElementById("btnCardapio");
  const btnGarcons = document.getElementById("btnGarcons");

  if (btnMesas) btnMesas.onclick = () => window.location.href = "mesas.html";
  if (btnCardapio) btnCardapio.onclick = () => window.location.href = "cardapio.html";
  if (btnGarcons) btnGarcons.onclick = () => window.location.href = "garcons.html";
}

function voltarInicio() {
  ocultarTodos();
  document.getElementById("inicio").style.display = "block";
}

function ocultarTodos() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("formCadastro").style.display = "none";
  document.getElementById("formLogin").style.display = "none";
  document.getElementById("painel").style.display = "none";
}

function logout() {
  restauranteId = null;
  localStorage.removeItem("restauranteId");
  alert("Logout realizado com sucesso.");
  voltarInicio();
}

async function cadastrarRestaurante() {
  const nome = document.getElementById("cadNome").value;
  const email = document.getElementById("cadEmail").value;
  const senha = document.getElementById("cadSenha").value;
  const telefone = "123456"

  const res = await fetch("http://localhost:3000/api/restaurantes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, telefone, email, senha })
  });

  if (res.ok) {
    alert("Restaurante cadastrado com sucesso!");
    voltarInicio();
  } else {
    alert("Erro ao cadastrar restaurante.");
  }
}

async function loginRestaurante() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const senha = document.getElementById("loginSenha").value.trim();

  const res = await fetch("http://localhost:3000/api/restaurantes");
  const restaurantes = await res.json();

  const encontrado = restaurantes.find(r =>
    r.email && r.senha &&
    r.email.trim().toLowerCase() === email &&
    r.senha.trim() === senha
  );

  if (encontrado) {
    restauranteId = encontrado.id || encontrado.id_restaurante;
    localStorage.setItem("restauranteId", restauranteId); // Persistência de login
    alert("Login realizado com sucesso!");
    mostrarPainel();
  } else {
    alert("Email ou senha incorretos.");
  }
}

// Verifica automaticamente se já está logado
window.onload = () => {
  const id = localStorage.getItem("restauranteId");
  if (id) {
    restauranteId = id;
    mostrarPainel(); // volta direto para o painel
  } else {
    voltarInicio();
  }
};
