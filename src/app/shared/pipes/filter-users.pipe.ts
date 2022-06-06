import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})

export class FilterUsersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(function(item: any) {
      return JSON.stringify(item)
        .includes(args);
    })
  }

}
