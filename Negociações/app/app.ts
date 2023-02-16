import { NegociacaoController } from './controllers/negociacao-controller.js'
import { NegociacoesView } from './views/negociacoes-view.js'

const controller = new NegociacaoController() //Objeto controller tem os valores dos inputs nos seus atributos.
const form = document.querySelector('.form')
form.addEventListener('submit', event => {  //Ao submeter(event é do tipo submit) o formulário, chama função que chama método da classe.
    event.preventDefault()
    controller.adicionar() //Método adiciona abre nova instância de Negociacao, passando os valores dos inputs preenchidos no formulário.
});

const botaoImportar = document.querySelector('#botao-importa')
botaoImportar.addEventListener('click', function(){
    controller.importarDados()
})