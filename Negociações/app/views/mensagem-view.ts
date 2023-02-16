import { View } from "./view.js"

export class MensagemView extends View<string>{

    template(model: string): string{ //Método sobescrito da classe mãe.
        return `
            <p class="alert alert-info">${model}</p>
        `
    }

}