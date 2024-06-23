var cadList = [];
var count = 1;

class Usuario {
  constructor () {
    this.arrayAdmin = [];
  }

  lerValores(){
    let nome = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();

    if (nome === '' || email === '') {
      return null;
    }

    let cadastro = {
      nome_admin: nome,
      email_admin: email,
      date: new Date().toLocaleString()
    };

    return cadastro;
  }

  adicionarArray(cadastro){
    this.arrayAdmin.push(cadastro);
  }

  cadastrarUsuario(event) {
    event.preventDefault();

    let cadastro = this.lerValores();

    if (cadastro === null) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.adicionarArray(cadastro);
    this.listarTabela();
    this.limparName();
    this.limparEmail();
  }

  listarTabela() {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    this.arrayAdmin.forEach((admin, index) => {
      let tr = tbody.insertRow();

      let td_date = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_email = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_date.innerText = admin.date;
      td_nome.innerText = admin.nome_admin;
      td_email.innerText = admin.email_admin;

      td_date.classList.add('center');
      td_nome.classList.add('center');
      td_email.classList.add('center');
      td_acoes.classList.add('center');

      let icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-circle-xmark', 'icon');
      icon.addEventListener('click', () => this.excluirUsuario(index));
      td_acoes.appendChild(icon);
    });
  }

  limparName() {
    document.getElementById('name').value = '';
  }

  limparEmail() {
    document.getElementById('email').value = '';
  }

  excluirUsuario(index) {
    this.arrayAdmin.splice(index, 1);
    this.listarTabela();
  }

  excluirLista() {
    this.arrayAdmin = [];
    this.listarTabela();
  }

  pesquisarUsuario(campo) {
    const inputId = `search${campo.charAt(0).toUpperCase() + campo.slice(1)}`;
    const valor = document.getElementById(inputId).value.toLowerCase().trim();

    if (valor === '') {
      alert('Por favor, digite um valor para pesquisar.');
      this.listarTabela();
      return;
    }

    let foundIndex = null;
    this.arrayAdmin.forEach((admin, index) => {
      if ((campo === 'name' && admin.nome_admin.toLowerCase().includes(valor)) ||
          (campo === 'email' && admin.email_admin.toLowerCase().includes(valor))) {
        foundIndex = index;
      }
    });

    if (foundIndex !== null) {
      this.marcarLinhaEncontrada(foundIndex);
    } else {
      alert('Nenhum usuário encontrado com esse critério de pesquisa.');
      this.listarTabela();
    }
  }

  marcarLinhaEncontrada(index) {
    let tbody = document.getElementById('tbody');
    let rows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      rows[i].classList.remove('destacado');
    }

    rows[index].classList.add('destacado');
  }

  excluirUsuarioEncontrado() {
    let tbody = document.getElementById('tbody');
    let highlightedRow = tbody.querySelector('.destacado');

    if (highlightedRow) {
      let index = Array.from(tbody.children).indexOf(highlightedRow);
      this.arrayAdmin.splice(index, 1);
      this.listarTabela();
    } else {
      alert('Nenhum usuário selecionado para exclusão.');
    }
  }

  
}

var usuario = new Usuario();

function getCadList() {
  var storedList = JSON.parse(localStorage.getItem('arrayAdmin')); //converte a string JSON para objeto JavaScript
  arrayAdmin = storedList || []; //se storedList for um valor válido (não seja nulo ou indefinido). é atribuido a patientList. Caso contrário, patientList recebe um array vazio
}

getCadList();
