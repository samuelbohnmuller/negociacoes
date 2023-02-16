import { NegociacaoDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService{

    public obterNegociacoes(): Promise<Negociacao[]>{ //Retorna uma promise do tipo array.
        return fetch('http://localhost:8080/dados') //Requisição para esse endereço
            .then(resposta => {
                return resposta.json() //Retorna os dados na resposta em json(processamento assíncrono(promisse)).
            .then((dados: Array<NegociacaoDoDia>) => { //Com os dados em mãos, digo que o mesmo é um Array do tipo colocado.
                return dados.map(dado => { //Abro função para cada dado do Array.
                    return new Negociacao(new Date(), dado.vezes, dado.montante) //Retorna nova instancia de Negociacao com os valores do JSON sendo aplicados nos atributos da classe.
                })
            })
            })
    }
}