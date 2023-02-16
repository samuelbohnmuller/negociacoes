import { Negociacao } from './negociacao.js'

export class Negociacoes { //Guarda lista de negociacoes.

    private negociacoes: Array<Negociacao> = [] //Array vazio de Negociacao privada(ninguém de fora da classe pode mexer).

    adicionar(negociacao: Negociacao) { //Recebe como parãmetro objeto do tipo Negociacao.
        this.negociacoes.push(negociacao) //Adiciona no array de Negociacao um objeto do tipo Negociacao.
    }

    listaNegociacoes(): ReadonlyArray<Negociacao> { //Retorna Array do tipo Negociacao(Array que não pode ser modificado).
        return this.negociacoes 
    }
}
