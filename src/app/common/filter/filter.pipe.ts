import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter'
})
export class FilterPipe implements PipeTransform {
  transform(list: Array<any> = [], searchValue: string): any[] {

    if (!searchValue) return list;

    return list.filter(
      (obj: any) =>{
        const props = Object.values(obj).map(item => String(item).toLowerCase());
        return props.find( value=> value.includes(searchValue.toLowerCase()) );
      })
  }
}