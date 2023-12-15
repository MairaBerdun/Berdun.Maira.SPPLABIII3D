import {Personaje} from "./personaje.js";

export default class Monstruo extends Personaje{
    constructor(id, nombre, alias, defensa, miedo, tipo){
        super(id, nombre, tipo);
        this.Alias= alias;
        this.Defensa = defensa;
        this.Miedo = miedo;
        
    }
}