export function tempoDeExecucao(emSegundos: boolean = false){ //Decorator que pode ser usado em outras classes. Pode ou não(padrão) usar parâmetros na chamada do decorator na classe.
    return function(
        target: any, //Se é método da classe(static) ou da instancia(objeto).
        propertyKey: string, //Nome do método.
        descriptor: PropertyDescriptor //Executa tudo.
    ){
        const metodoOriginal = descriptor.value //Guardo método original.
        descriptor.value = function(...args: Array<any>){ //Sobescrevo comportament do método original. Pode receber vários parâmetros, no caso do método que chama o decorator tiver 0 ou mais parâmetros.
            const tempo1 = performance.now() //tempo de execução.
            const retorno = metodoOriginal.apply(this, args) //Método original que estará abaixo da anotação do decorator quando chamado. O this é o contexto da classe(Negociacao-Controller) a qual vai se chamado
            const tempo2 = performance.now()
            console.log(`${propertyKey}, tempo de execução: ${(tempo1 - tempo2/1000)} segundos`)
            retorno //Chamo método original.
        }
        return descriptor
    }
}
