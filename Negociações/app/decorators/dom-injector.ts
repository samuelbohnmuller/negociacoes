export function domInjector(seletor: string){ 

    return function(target: any, propertyKey: string){ //Atributo a qual foi colocado o decarator.
        
        let elemento: HTMLElement

        const getter = function(){  
            if(!elemento){ //Se o elemento tiver vazio(para criar um cash e não precisar indo ao DOM buscar o elemento sempre).
                elemento = <HTMLElement> document.querySelector(seletor) //Forço o seletor a ser HTMLElement.
            }
           
            return elemento
        }

        Object.defineProperty( //Acesso ao prototype da classe.
            target, propertyKey,{get: getter} //As propriedades executarão a função getter(que busca o elemento do DOM).
        )
    }   
    }
