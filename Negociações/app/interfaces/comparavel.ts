export interface comparavel<T>{ //T é para quando for usado o método ehIgual, só possa ser comparado com mesma classe, ex: Negociacao ehIgual Negociacao.
    
    ehIgual(objeto: T): boolean //Classes que implementarem dessa interface, serão obrigadas a implementar esse método.
}