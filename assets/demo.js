window.onload = function(){
	var input = document.getElementById('numero');
	var boton = document.getElementById('btn');
	var resultado = document.getElementById('resultado');
	
	boton.onclick = function(){
		var numero = input.value;
		factor = ARIT.factorizar(numero);
		resultado.innerHTML = factor.tabla+factor.factorizacion;
	}
}
