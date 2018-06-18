"use strict";
var Factor = (function () {
    function Factor(numero, factores, subcompuestos) {
        this.numero = numero;
        this.factores = factores;
        this.subcompuestos = subcompuestos;
    }
    Factor.prototype.tablaFactores = function () {
        var tabla = '<table class="factor-table">';
        for (var r = 0; r < this.factores.length; r++) {
            tabla += "<tr><td>" + this.subcompuestos[r] + "</td><td>" + this.factores[r] + "</td></tr>";
        }
        tabla += '<tr><td>1</td></tr>';
        return tabla + '</table>';
    };
    Factor.prototype.factorizacion = function () {
        var r = '<span>';
        for (var _i = 0, _a = this.factores; _i < _a.length; _i++) {
            var f = _a[_i];
            r += f + "&times;";
        }
        return r.substr(0, r.length - 7) + '</span>';
    };
    Factor.prototype.factorizacionCorta = function () {
        var fc = '<span>';
        var bases = [];
        for (var _i = 0, _a = this.factores; _i < _a.length; _i++) {
            var f = _a[_i];
            if (bases.indexOf(f) == -1)
                bases.push(f);
        }
        var exp = [];
        for (var _b = 0, _c = this.factores; _b < _c.length; _b++) {
            var f = _c[_b];
            var index = bases.indexOf(f);
            if (!exp[index]) {
                exp.push(1);
            }
            else {
                exp[index]++;
            }
        }
        for (var i = 0; i < bases.length; i++)
            if (exp[i] > 1) {
                fc += bases[i] + "<sup>" + exp[i] + "</sup>&times;";
            }
            else {
                fc += bases[i] + "&times;";
            }
        return fc.substr(0, fc.length - 7) + '</span>';
    };
    return Factor;
}());
var primerosPrimos = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
var factorizar = function (numero, limite) {
    limite = limite || 12;
    if (numero < 1 || !esEntero(numero))
        throw 'Sólo números enteros positivos';
    if (numero.toString().length > limite)
        throw 'Un número muy grande podría alentar tu equipo.';
    if (numero == 1)
        throw 'El número "uno" por definición no se considera primo ni compuesto';
    var n = numero;
    var raizNumero = Math.ceil(Math.sqrt(numero));
    var primo = 2;
    var factores = [];
    var subcompuestos = [];
    while (numero > 1) {
        if (primo > raizNumero) {
            primo = numero;
        }
        if (primerosPrimos.indexOf(numero) != -1) {
            factores.push(numero);
            subcompuestos.push(numero);
            break;
        }
        while (numero % primo == 0) {
            factores.push(primo);
            subcompuestos.push(numero);
            numero /= primo;
            raizNumero = Math.ceil(Math.sqrt(numero));
        }
        primo = siguientePrimo(primo);
    }
    subcompuestos.push(1);
    function siguientePrimo(primoActual) {
        var pos = primerosPrimos.indexOf(primoActual);
        if (pos < primerosPrimos.length - 1)
            return primerosPrimos[++pos];
        var testPrimo = primerosPrimos[pos] + 2;
        var primoEncontrado = false;
        while (!primoEncontrado) {
            var raizTestPrimo = Math.ceil(Math.sqrt(testPrimo));
            for (var _i = 0, primerosPrimos_1 = primerosPrimos; _i < primerosPrimos_1.length; _i++) {
                var p = primerosPrimos_1[_i];
                if (p > raizTestPrimo) {
                    primoEncontrado = true;
                    break;
                }
                if (testPrimo % p == 0) {
                    testPrimo += 2;
                    break;
                }
            }
        }
        primerosPrimos.push(testPrimo);
        return testPrimo;
    }
    return new Factor(n, factores, subcompuestos);
};
function esEntero(numero) {
    var n = parseInt(numero);
    return (numero == n && numero % 1 == 0);
}
