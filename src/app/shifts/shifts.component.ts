import { Component, OnInit, ViewChild } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';
import { TableOptions } from 'gdr-data-table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
  shifts: Promise<object[]>;
  shiftOptions = new TableOptions();

  options: Promise<TableOptions>;

  days = new FormControl();
  dayList: string[] = ['Monday', 'Thuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private crudService: CrudService) {
    this.shifts = this.crudService.find('shift')
      .pipe(
        map(supplies => Lodash.sortBy(supplies, ['name']))
      ).toPromise();
  }

  ngOnInit() {
    this.shiftOptions.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'start', type: 'Text' },
      { name: 'end', type: 'Text' },
      { name: 'breakStart', type: 'Text' },
      { name: 'breakEnd', type: 'Text' },
    ];

    this.options = this.crudService.getTypes('shift').pipe(map(columnTypes => ({ columnTypes, close: false }))).toPromise();
  }

  onModification(modification: any) {
    this.crudService.modify('shift', modification).then(result => console.log(result));
  }

}
