class Factor {
    numero:number;
    factores:number[];
    subcompuestos:number[];
    
    constructor(numero:number, factores:number[], subcompuestos:number[]) {
        this.numero = numero;
        this.factores = factores;
        this.subcompuestos = subcompuestos;
    }

    tablaFactores():string{
        let tabla = '<table class="factor-table">';
        for(let r = 0; r < this.factores.length; r++){
            tabla += `<tr><td>${this.subcompuestos[r]}</td><td>${this.factores[r]}</td></tr>`;
        }
        tabla += '<tr><td>1</td></tr>';
        return tabla + '</table>';
    }

    factorizacion():string {
        let r = '<span>';
        for(let f of this.factores){
            r += `${f}&times;`;
        }
        
        return r.substr(0,r.length-7) + '</span>';
    }
    
    factorizacionCorta():string{
        let fc = '<span>';
        
        let bases:number[] = [];
        for(var f of this.factores){
            if(bases.indexOf(f) == -1)
                bases.push(f);
        }

        let exp:number[] = [];
        for(var f of this.factores){
            let index = bases.indexOf(f);
            if(!exp[index]){
                exp.push(1);
            }else{
                exp[index]++;
            }
        }

        for(var i = 0; i < bases.length; i++)
            if(exp[i] > 1){
                fc += `${bases[i]}<sup>${exp[i]}</sup>&times;`;
            }else{
                fc += `${bases[i]}&times;`;
            }

        return fc.substr(0,fc.length-7) + '</span>';
    }
}

