export abstract class View<T>{ //T é genérics. Métodos que sobescreverem em outras classes, poderão receber model de variados tipo. Abstrato pois não pode criar instância.

    protected elemento: HTMLElement

    constructor(seletor: string){ //Recebo o id do elemento HTML na instancia da classe.
        this.elemento = document.querySelector(seletor) //Pego no DOM o elemento e passo para atributo do tipo HTMLElement.
    }

    atualizar(model: T): void{ //Transforma a string em elemento HTML. A div de id passada no construtor terá o HTML do método template.
        const template = this.template(model)
        this.elemento.innerHTML = template //Passo o template montado com o valor do modelo para o elemento de id informado no controller.
    }

    abstract template(model: T): string //Abstrato nao tem implementação. Classe filha será obrigada a implementar.

}

