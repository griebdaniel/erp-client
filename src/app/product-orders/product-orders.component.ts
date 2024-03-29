import { Component, OnInit } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';

import { TableOptions } from 'gdr-data-table';

@Component({
  selector: 'app-supply-orders',
  templateUrl: './product-orders.component.html',
  styleUrls: ['./product-orders.component.scss']
})
export class ProductOrdersComponent implements OnInit {
  productOrders: Promise<object[]>;
  tableOptions = new TableOptions();

  options: Promise<TableOptions>;

  constructor(private crudService: CrudService) {
    this.productOrders = this.crudService.find('product_order')
      .pipe(
        map(products => Lodash.sortBy(products, ['name']))
      ).toPromise();
  }

  ngOnInit() {
    const productsOptions = new TableOptions();

    const options = [];

    this.crudService.find('product').subscribe(products => {
      options.push(...products);
    });

    const map2 = (product: any) => product.name;
    const remap = (originalValue: any, mappedValue: any) => options.find(option => map2(option) === mappedValue);

    productsOptions.columnTypes = [
      { name: 'product', type: 'Text', options: { map: map2, remap, options } },
      { name: 'count', type: 'Number' }
    ];

    productsOptions.cancel = false;

    this.tableOptions.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'deadLine', type: 'Date' },
      { name: 'products', type: 'Table', options: productsOptions },
      { name: 'delivered', type: 'Boolean' }
    ];

    this.options = this.crudService.getTypes('product_order').pipe(map(columnTypes => ({ columnTypes, close: false }))).toPromise();

  }

  onModification(modification: any) {
    this.crudService.modify('product_order', modification).then(result => console.log(result));
  }
}
