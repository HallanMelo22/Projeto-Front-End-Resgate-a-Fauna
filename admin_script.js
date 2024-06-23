var cadList = [];
var count = 1;

class Usuario {
  constructor () {
    this.name = '';
    this.email = '';
    this.date = '';

    this.arrayAdmin = [];
  }

  lerValores(){
    const form = document.querySelector('.cad_form');

    form.addEventListener('submit', function(event){
      event.preventDefault();
    });
    
    let cadastro = {};
    
    cadastro.nome_admin = document.getElementById('name').value;
    cadastro.email_admin = document.getElementById('email').value;
    cadastro.date = new Date().toLocaleString(); // Pega a data e hora atual

    return cadastro;
  }

  adicionarArray(cadastro){
    this.arrayAdmin.push(cadastro);
  }

  cadastrarUsuario (){
    let cadastro = this.lerValores();

    this.adicionarArray(cadastro);

    this.listarTabela();

    this.limparDados();
  }

  listarTabela() {
    let tbody = document.getElementById('tbody');
    tbody.innerText = ''; // Limpa a tabela antes de listar os valores atualizados

    for(let i = 0; i < this.arrayAdmin.length; i++){
      let tr = tbody.insertRow();

      let td_date = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_email = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_date.innerText = this.arrayAdmin[i].date;
      td_nome.innerText = this.arrayAdmin[i].nome_admin;
      td_email.innerText = this.arrayAdmin[i].email_admin;

      td_date.classList.add('center');
      td_nome.classList.add('center');
      td_email.classList.add('center');
      td_acoes.classList.add('center');

      let icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-circle-xmark', 'icon');
      icon.addEventListener('click', () => this.excluirUsuario(i));
      td_acoes.appendChild(icon);
    }
  }

  
  limparDados(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
  }

  excluirUsuario(index) {
    this.arrayAdmin.splice(index, 1);
    this.listarTabela();
  }
}

function getCadList() {
  var storedList = JSON.parse(localStorage.getItem('arrayAdmin')); //converte a string JSON para objeto JavaScript
  arrayAdmin = storedList || []; //se storedList for um valor válido (não seja nulo ou indefinido). é atribuido a patientList. Caso contrário, patientList recebe um array vazio
}

getCadList();

var usuario = new Usuario();
