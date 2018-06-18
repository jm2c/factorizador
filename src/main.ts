// Guarda una lista de los números primos que se vayan usando
var primerosPrimos:number[] = [2,3,5,7,11,13,17,19,23,29];

/* PROCESO PRINCIPAL **************************************************************
* Ciclo principal del método "factorizar" aquí es donde ocurre toda la magia.    *
* Mientras el número a fatorizar no llegue al 1, continua con el proceso de      *
* factorización como sigue:  Comprueba si el número es divisible entre el primo  *
* actual, si lo es, lo divide y guarda un registro de lo que pasó, si no lo      *
* divide, lo intenta con el siguientePrimo.                                      *
**********************************************************************************/
let factorizar = function(numero:number, limite:number):Factor{
    limite = limite || 12;
    if(numero < 1 || !esEntero(numero))
        throw 'Sólo números enteros positivos';

    if(numero.toString().length > limite)
        throw 'Un número muy grande podría alentar tu equipo.';

    if(numero == 1)
        throw 'El número "uno" por definición no se considera primo ni compuesto';

    const n:number = numero;
    // Con la raíz cuadrada del número se limíta el número de calculos del proceso,
    // con lo cual obtendremos un mejor rendimiento en los cálculos
    let raizNumero:number = Math.ceil(Math.sqrt(numero));

    // Primer número primo de la lista, los cosecuentes se calcularán con el método "siguientePrimo"
    let primo:number = 2;

    // Crea una lista de los factores del número, este es el resultado que queremos obtener
    let factores:number[] = [];

    // Crea una lista de los números en los que se va descomponiendo el número, esto es
    // parte del resultado
    let subcompuestos:number[] = [];

    while(numero > 1){
        if(primo > raizNumero){
            primo = numero;
        }
        if(primerosPrimos.indexOf(numero) != -1){
            factores.push(numero);
            subcompuestos.push(numero);
            break;
        }

        while(numero % primo == 0){
            factores.push(primo);
            subcompuestos.push(numero);
            numero /= primo;
            raizNumero = Math.ceil(Math.sqrt(numero));
        }
        primo = siguientePrimo(primo);
    }
    subcompuestos.push(1);

    /**********************************************************************************
    * Este método es importante, ya que basado en el número primo actual, buscará al  *
    * número primo consecuente a él. Esto se realizará primero, sumandole 1 al primo  *
    * actual, y luego viendo si es divisible entre los primos anteriores, si ninguno  *
    * lo divide, entonces es primo, pero si alguno le llegara a dividir entonces se   *
    * interrumpe el proceso, se le suma 1 de nuevo y se vuelve a hacer la             *
    * comprobación.                                                                   *
    ***********************************************************************************/
    function siguientePrimo(primoActual:number):number {
        let pos:number = primerosPrimos.indexOf(primoActual);
        if(pos < primerosPrimos.length - 1)
            return primerosPrimos[++pos];

        let testPrimo:number = primerosPrimos[pos] + 2;
        let primoEncontrado:boolean = false;
        while(!primoEncontrado){
            var raizTestPrimo:number = Math.ceil(Math.sqrt(testPrimo));
            for(let p of primerosPrimos){
                if(p > raizTestPrimo){
                    primoEncontrado = true;
                    break;
                }
                if(testPrimo % p == 0){
                    testPrimo += 2;
                    break;
                }
            }
        }
        primerosPrimos.push(testPrimo);
        return testPrimo;
    }

    //Regresa un objeto con los datos de la factorización ya realizada
    return new Factor(n, factores, subcompuestos);
}

function esEntero(numero:any):boolean{
    const n:number = parseInt(numero);
    return (numero == n && numero % 1 == 0);
}
