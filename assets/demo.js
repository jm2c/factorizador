const $boton      = document.getElementById('btn');
const $formulario = document.getElementById('formulario');
const $input      = document.getElementById('numero');
const $resultado  = document.getElementById('resultado');

	
$formulario.addEventListener('submit', function(evt){
    evt.preventDefault();
    const numero = parseInt($input.value);
    factor = factorizar(numero);

    $resultado.innerHTML = factor.tablaFactores();
    const $r = document.createElement('p');
    $r.innerHTML = `${numero} = ${factor.factorizacion()} = ${factor.factorizacionCorta()}`;
    $resultado.appendChild($r);
});
