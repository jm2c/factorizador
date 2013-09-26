window.onload = function(){
	var input = document.getElementById('numero');
	var boton = document.getElementById('btn');
	var resultado = document.getElementById('resultado');
	
	boton.onclick = function(){
		var numero = input.value;
		factor = ARIT.factorizar(numero,8);
		resultadoLargo = factor.factores.length > 1 ? '<div>Los factores de '+numero+' son: '+factor.factores.join('&times;')+'</div>' : '';
		resultado.innerHTML = factor.tabla+resultadoLargo+factor.factorizacion;
	}
}
