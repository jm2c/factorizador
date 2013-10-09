/***************************************************
** - factorizador.js                              **
** - github: jm2c/factorizador                    **
** - librería javaScript que factoriza números    **
**  compuestos en sus factores primos.            **
** - versión: 2.1.1                               **
** - fecha de modificación: 26/09/2013            **
****************************************************/

/*
 __namespace______________________________________________________________________
/ Creamos un objeto ARIT (de aritmética) como un namespace de todas las funciones  \
\ que se necesitan para realizar la factorización.                                 /
 ---------------------------------------------------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||	
*/
var ARIT = ARIT || {};

/*
 __factorizar____________________________________________________________________
/ Inicia el método principal "factorizar" todos los métodos internos a éste son  \
\ métodos privados ya que no se ocuparán fuera del mismo.                        /
 --------------------------------------------------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
*/
ARIT.factorizar = function(numero, limite){
	limite = limite || 10;
	if(numero.toString().length <= limite){
		if(numero != 1){
			//primer número primo de la lista, los cosecuentes se calcularán con el método "siguientePrimo"
			var primo = 2,

			//Con la raíz cuadrada del número se limíta el número de calculos del proceso, con lo cual obtendremos
			//un mejor rendimiento en los cálculos
				raizNumero = raiz(numero),
			
			//guarda una lista de los números primos que se vayan usando
				primosAnteriores = [],
			
			//Crea una lista de los números en los que se va descomponiendo el número, esto es
			//perte del resultado al generar la tabla
				subcompuestos = [],
			
			//Crea una lista de los factores del número, este es el resultado que queremos obtener
				factores = [];
			
			/* 
		 __FACTORIZACIÓN_-_PROCESO_PRINCIPAL_____________________________________________
		/ Ciclo principal del método "factorizar" aquí es donde ocurre toda la magia.    \
		| Mientras el número a fatorizar no llegue al 1, continua con el proceso de      |
		| factorización como sigue:  Comprueba si el número es divisible entre el primo  |
		| actual, si lo es, lo divide y guarda un registro de lo que pasó, si no lo      |
		\ divide, lo intenta con el siguientePrimo.                                      /
		 --------------------------------------------------------------------------------
				\   ^__^
				 \  (oo)\_______
					(__)\       )\/\
						||----w |
						||     ||
			 */
			while(numero != 1){
				if(primo > raizNumero){
					primo = numero;
				}
				while(numero % primo == 0){
					factores.push(primo);
					subcompuestos.push(numero);
					numero /= primo;
					raizNumero = raiz(numero);
				}
				primo = siguientePrimo(primo);
			}
			
			//Regresa un objeto con los datos de la factorización ya realizada
			return {
				'factores' : factores,
				'factorizacion' : factoresHtml(factores),
				'subcompuestos' : subcompuestos,
				'tabla' : tablaHtml(factores, subcompuestos)
			};
		}else{
			return {
				'factores' : '',
				'factorizacion' : '<span class="fact-resultado">El número "uno" por definición no se considera primo ni compuesto</span>',
				'subcompuestos' : '',
				'tabla' : ''
			};
		}
	}else{
		return {
			'factores' : '',
			'factorizacion' : '<span class="fact-resultado">El número es muy grande e intentarlo podría trabar tu equipo.</span>',
			'subcompuestos' : '',
			'tabla' : ''
		};
	}//--- FIN DE LA FUNCIÓN PRINCIPAL---//
	
/*	 __siguientePrimo_________________________________________________________________
	/ Este método es importante, ya que basado en el número primo actual, buscará al  \
	| número primo consecuente a él. Esto se realizará primero, sumandole 1 al primo  |
	| actual, y luego viendo si es divisible entre los primos anteriores, si ninguno  |
	| lo divide, entonces es primo, pero si alguno le llegara a dividir entonces se   |
	| interrumpe el proceso, se le suma 1 de nuevo y se vuelve a hacer la             |
	\ comprobación.                                                                   /
	 ---------------------------------------------------------------------------------
			\   ^__^
			 \  (oo)\_______
				(__)\       )\/\
					||----w |
					||     ||														*/
	function siguientePrimo(primoActual){
		primosAnteriores.push(primoActual);
		primoActual = primoActual == 2 ? primoActual+1 : primoActual+2;
		var cicloInterrumpido = false;
		for(i = 0; i < primosAnteriores.length; i++){
			if(primoActual % primosAnteriores[i] == 0){
				cicloInterrumpido = true;
				break; //Si lo divide un primo anterior, interrumpe el ciclo
			}
		}
		//Si el ciclo fué interrumpido vuelve a hacer la comprobación si no, regresa el primo
		return cicloInterrumpido ? siguientePrimo(primoActual) : primoActual;
	}
	
	function raiz(numero){
		return Math.ceil(Math.sqrt(numero));
	}
	
	//Crea la lista de factores en formato HTML para que se vea bonito
	function factoresHtml(factores){
		if(factores.length > 1){
			//crea un array con los factores que son únicos
			var factoresUnicos = [];
			for(i = 0; i < factores.length; i++){
				if(factoresUnicos.indexOf(factores[i]) == -1) factoresUnicos.push(factores[i]);
			}
			
			//crea un array con el número de veces que se repite un factor, o sea, la potencia
			var potencias = [];
			for(i = 0; i < factoresUnicos.length; i++){
				potencias[i] = 0;
				for(j = 0; j < factores.length; j++){
					if(factores[j] == factoresUnicos[i]) potencias[i]++;
				}
			}
			
			//Finalmente hace un string HTML que es el que la función regresa
			var html = '<span class="fact-resultado">';
			for(i = 0; i < potencias.length; i++){
				html += factoresUnicos[i];
				html += potencias[i] == 1 ? '' : '<sup>'+potencias[i]+'</sup>';
				html += i < potencias.length - 1 ? '&times;' : '';
			}
			html += '</span>';
		
			return html;
		}else{
			return '<span class="fact-resultado">El número '+factores[0]+' es primo</span>';
		}
	}
	
	//Crea una Tabla en HTML para mostrar un resultado más bonito
	function tablaHtml(factores, subcompuestos){
		var tabla = '<table class="fact-tabla" style="border-collapse:collapse;border-spacing:0px">';
		for(i = 0; i < factores.length;i++){
			tabla += '<tr><td class="fact-tabla-subcompuesto" style="text-align:right;border-right:solid .1em black;padding-right:.25em;">'+subcompuestos[i]+'</td><td class="fact-tabla-factor" style="padding-left:.25em;">'+factores[i]+'</td></tr>';
		}
		tabla += '<tr><td class="fact-tabla-subcompuesto" style="text-align:right;border-right:solid .1em black;padding-right:.25em;">1</td><td class="fact-tabla-factor">&nbsp;</td></tr>';
		tabla += '</table>';
		return tabla;
	}
}