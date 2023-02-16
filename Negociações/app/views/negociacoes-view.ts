import { Negociacoes } from "../models/negociacoes.js"
import { View } from "./view.js"

export class NegociacoesView extends View<Negociacoes>{ //Herdo de View atributo e contrutor. Devo dizer qual o tipo do model nos métodos da View.

    template(model: Negociacoes): string{
        return `
        <table class="table table-hover table-border">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
        </table>
        <tbody>
            ${model.listaNegociacoes().map(negociacao =>{ //Cada negociacao será uma td com cada negociação no loop. Método join junta cada string do loop em uma só string separando por espaços.
                return `
                    <tr>
                        <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td> 
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                `
            }).join('')} 
        </tbody>
        ` 
    }

}