function limparFormatacao() {
	campoNome.classList.remove("formulario__input--erro");
	campoCapa.classList.remove("formulario__input--erro");
	alertaTexto.classList.remove("formulario__alerta-erro--ativo");
	alertaTexto.classList.remove("formulario__alerta-sucesso--ativo");
	
	campoNome.value = "";
	campoCapa.value = "";
}

function exibirMensagem(tipo, msg) {	
	if (tipo == "erro") {
		alertaTexto.classList.add("formulario__alerta-erro--ativo");
		alertaTexto.innerHTML = msg;
	}
	else if (tipo == "sucesso") {
		alertaTexto.classList.add("formulario__alerta-sucesso--ativo");
		alertaTexto.innerHTML = msg;
	}
}

function validarItem(nome, capa) {	
	let isValid = false;
	
	for (let i = 0; i < listaJogos.length; i++) {
		if (listaJogos[i]["nome"] == nome){
			exibirMensagem("erro", "Jogo já está na biblioteca");		
			return isValid;
		}
	}
	
	if (!capa.endsWith(".jpg") && !capa.endsWith(".jpeg") && !capa.endsWith(".png") && nome == ""){
		limparFormatacao();
		exibirMensagem("erro", "Nome e capa inválidos");
		
		campoNome.classList.add("formulario__input--erro");
		campoCapa.classList.add("formulario__input--erro");
	}
	else if (!capa.endsWith(".jpg") && !capa.endsWith(".jpeg") && !capa.endsWith(".png")) {
		limparFormatacao();
		exibirMensagem("erro", "Capa informada não é uma imagem");
		
		campoCapa.classList.add("formulario__input--erro");
	}
	else if (nome == "") {
		limparFormatacao();
		exibirMensagem("erro", "Nome inválido");
		
		campoNome.classList.add("formulario__input--erro");
	}
	else {
		limparFormatacao();
		exibirMensagem("sucesso", "Jogo adicionado na biblioteca");
		
		isValid = true;
	}
	
	return isValid;
}

function adicionarItem(item) {
	const li = document.createElement("li");
	const img = document.createElement("img");
	const p = document.createElement("p");

	li.classList.add("catalogo__item");
	img.classList.add("capa");
	p.classList.add("titulo-jogo");

	img["src"] = item.capa;
	img["alt"] = "Capa do jogo " + item.nome;
	p.innerHTML = item.nome;

	li.appendChild(img);
	li.appendChild(p);

	listaCatalogo.appendChild(li);	
}

function removerItem(nome) {	
	const lista = document.getElementById("catalogo__lista");
	
	let isFound = false;
	
	for (let i = 0; i < listaJogos.length; i++) {
		if (listaJogos[i].nome === nome){
			listaJogos.splice(i, 1);
			
			isFound = true;
		}
	}
	
	if (isFound) {	
		while (lista.firstChild){
			lista.removeChild(lista.firstChild);	
		}

		listaJogos.forEach(adicionarItem);
		limparFormatacao();
		exibirMensagem("sucesso", "Jogo removido da biblioteca");
	}
	else {
		limparFormatacao();
		exibirMensagem("erro", "O jogo informado não está na lista");
	}
	
}

const listaJogos = [{nome: "alien isolation", capa: "https://upload.wikimedia.org/wikipedia/pt/c/c7/Alien_Isolation_capa.png"},
					{nome: "star wars jedi - Fallen Order", capa: "https://upload.wikimedia.org/wikipedia/pt/d/d6/Star_Wars_Jedi_Fallen_Order_capa.png"},
					{nome: "god of war 2", capa: "https://upload.wikimedia.org/wikipedia/pt/7/7e/God_of_War_2_capa.png"},
					{nome: "god of war", capa: "https://i.dr.com.tr/cache/600x600-0/originals/0001782664001-1.jpg"},
				    {nome: "red dead redemption 2", capa:"https://img.ibxk.com.br/2018/05/03/red-dead-03201115279005.jpg"},
				    {nome: "call of duty: modern warfare", capa:"https://upload.wikimedia.org/wikipedia/pt/thumb/e/e9/CallofDutyModernWarfare%282019%29.jpg/270px-CallofDutyModernWarfare%282019%29.jpg"},
				    {nome: "call of duty: back ops", capa: "https://upload.wikimedia.org/wikipedia/pt/5/54/Call-of-Duty---Black-Ops---Cover-.jpg"},
				    {nome: "ori and the blind forest", capa: "https://bdjogos.com.br/capas/4093-Ori-and-the-Blind-Forest-capa-1.jpg"},
				    {nome: "ori and the will of the wisps", capa: "https://bdjogos.com.br/capas/3441-ori-and-the-will-of-the-wisps-xbox-one-capa-2.jpg"}];

const listaCatalogo = document.querySelector("#catalogo__lista");
const botaoAdicionar = document.querySelector("#adicionar");
const botaoRemover = document.querySelector("#remover");

const campoNome = document.getElementById("nome");
const campoCapa = document.getElementById("capa");
const alertaTexto = document.getElementById("formulario__alerta");

listaJogos.forEach(adicionarItem);

botaoAdicionar.addEventListener("click", function (e) {
	const capa = campoCapa.value;
	const nome = campoNome.value.toLowerCase();
	
	limparFormatacao();
	
	if (validarItem(nome, capa)) {		
		listaJogos.push({nome: nome, capa: capa});
		adicionarItem({nome: nome, capa: capa});
	}
});

botaoRemover.addEventListener("click", function (e) {
	const nome = campoNome.value.toLowerCase();
	
	if (nome != "") {
		removerItem(nome);
	}
	else {
		limparFormatacao();
		exibirMensagem("erro", "Nenhum jogo informado");
	}
});