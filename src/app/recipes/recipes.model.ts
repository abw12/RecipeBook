import { Ingredient } from '../shared/ingredients.model';

export class Recipes{
    
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredient:Ingredient[];
    public email?:string;

    constructor(name: string ,desc:string,imagePath:string,ingredient:Ingredient[],email?:string){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingredient=ingredient;
        this.email=email;

    }

}