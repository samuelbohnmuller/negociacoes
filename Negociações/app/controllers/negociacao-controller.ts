import { domInjector } from '../decorators/dom-injector.js'
import { tempoDeExecucao } from '../decorators/tempo-de-execucao.js'
import { Negociacao } from '../models/negociacao.js'
import { Negociacoes } from '../models/negociacoes.js'
import { NegociacoesService } from '../services/negociacoes-service.js'
import { MensagemView } from '../views/mensagem-view.js'
import { NegociacoesView } from '../views/negociacoes-view.js'

export class NegociacaoController {
    
    @domInjector('#data') //Decorator de atributos.
    private inputData: HTMLInputElement //Tipo do input capturado no formulário.
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement
    @domInjector('#valor')
    private inputValor: HTMLInputElement
    private negociacoes = new Negociacoes()
    private negociacoesView = new NegociacoesView('#negociacoesView') //Passo id do HTML da tabela das negociacoes incluídas.
    private mensagemView = new MensagemView('#mensagemView')
    private negociacoesService = new NegociacoesService()

    constructor() {
        //this.inputData = document.querySelector('#data') //Pego o valor do input de id e passo para o atributo da classe que foi aberta instancia.
        this.negociacoesView.atualizar(this.negociacoes) //Quando a classe foi instanciada, mostrará o HTML do método na div do elemento com id passado no construtor.
    }

    @tempoDeExecucao(true) //Chamada de função decorator(ou anotação no Java) que está fora da classe.
    public adicionar(): void {
        const negociacao = this.criaNegociacao()
        if(negociacao.data.getDay() > 0 && negociacao.data.getDay() < 6){ //Se a data é segunda a sexta.
            this.negociacoes.adicionar(negociacao) //Adiciona na lista de Negociacao a Negociacao criada com os valores dos inputs.
            this.limparFormulario()
            this.atualizaView()
        } else{
            this.mensagemView.atualizar('Apenas em dias úteis chefe.')
        }
    }

    private criaNegociacao(): Negociacao { //Retorno do tipo Nogiciacao.
        const exp = /-/g //Expressão regular que encontra todos os - .
        const date = new Date(this.inputData.value.replace(exp, ',')) //Substitui o - por , .
        const quantidade = parseInt(this.inputQuantidade.value) //Converte para inteiro.
        const valor = parseFloat(this.inputValor.value)
        
        return new Negociacao(date, quantidade, valor) //Valores dos inputs pegos no formulário preenchido que estarão na instancia de NegociacaoController passarão para nova instancia de Negociacao.
    }

    private limparFormulario(): void {
        this.inputData.value = ''
        this.inputQuantidade.value = ''
        this.inputValor.value = ''
        this.inputData.focus()
    }

    private atualizaView(): void{
        this.negociacoesView.atualizar(this.negociacoes) //Toda vez que adicionar um item no formulário, mostrará a tabela com os items.
        this.mensagemView.atualizar('Negociação efetuada com sucesso pai!')
    }

    importarDados(): void{
        this.negociacoesService.obterNegociacoes() //Obtenho o array de Negociacao da API. 
            .then(negociacoesDeHoje => { //Crio variável que contém o array de Negociacao.
                return negociacoesDeHoje.filter(negociacaoDeHoje => { //retorna Filtrando as negociacoesDeHoje usando nova variável.
                    return !this.negociacoes.listaNegociacoes() //Só o retorno se for diferente(negociacoes que não existam na lista). os itens que forem iguais não serão retornados.
                        .some(negociacao => negociacao.ehIgual(negociacaoDeHoje)) //Verifica se cada negociacao(variável criada que representa cada item na lista de negociacoes já existentes) contém a negociacaoDeHoje trazida da API.
                })
            })
            .then(negociacoesDeHoje => { //Com o Array de Negociacao pronto(pego no return acima) em mãos.
                for(let negociacao of negociacoesDeHoje) { //Laço em cada item do Array de Negociacao.
                    this.negociacoes.adicionar(negociacao) //Adiciono cada Negociacao no array de negociacoes.
                }
                this.negociacoesView.atualizar(this.negociacoes) //Coloco a lista de negociacoes no HTML atualizado.
            })
    }
}
