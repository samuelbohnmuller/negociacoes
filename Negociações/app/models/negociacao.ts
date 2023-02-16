import { comparavel } from "../interfaces/comparavel.js"

export class Negociacao implements comparavel<Negociacao>{

    private _data: Date //atributos privados.
    private _quantidade: number
    private _valor: number

    constructor(data: Date, quantidade: number, valor: number) {
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
    }

    get data(): Date {
        const data = new Date(this._data.getTime()) //Data em milesegundos. Impedindo alteração do atributo data fora dos métodos apropriados.
        return data
    }

    get quantidade(): number {
        return this._quantidade
    }

    get valor(): number {
        return this._valor
    }

    get volume(): number {
        return this._quantidade * this._valor
    }

    public ehIgual(negociacao: Negociacao): boolean{ //Se é verdadeiro o retorno.
        return this.data.getDate() === negociacao.data.getDate() //Se a data da instancia é igual a data passada na chamada do método.
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear()
    }
}