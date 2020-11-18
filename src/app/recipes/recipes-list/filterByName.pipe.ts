import {Pipe,PipeTransform} from'@angular/core';
@Pipe({
    name:'filter'
})
export class FilterByNamePipe implements PipeTransform {
 transform(value:any[],filterString:string,propName:string):any[]{    //filterString is the input user enter,value can be anything but in our case it is array of recipes
    // if(value.length===0 || filterString ===''){
    //     return value;
    // }
    if(!value){
        return [];
    }
    if(!filterString){
        return value;
    }
    filterString=filterString.toLowerCase();
    return value.filter(item=>{
        return item.name.toLowerCase().includes(filterString);
    });
    // const resultArray=[];
    // for(const item of value ){
    //     if(item[propName]===filterString){     //propName is the value type which to be filtered upon like we are filtering on name prop here=> item[prop] is same as item.name
    //         resultArray.push(item);
    //     }
    // }
    // return resultArray;
 }
}