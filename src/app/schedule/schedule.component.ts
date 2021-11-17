import { Component, OnInit } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';
import { TableOptions } from 'gdr-data-table';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule: Promise<object[]>;
  tableOptions = new TableOptions();
  scheduleForDayOptions: any = new TableOptions();

  constructor(private crudService: CrudService) {
    this.schedule = this.crudService.getSchedule().toPromise();
    this.schedule.then(sch => console.log(sch));
  }

  ngOnInit() {

    const scheduleForEmployeeOptions: any = new TableOptions();
    const scheduleForShiftOptions: any = new TableOptions();
    const scheduleOptions: any = new TableOptions();

    scheduleOptions.columnTypes = [
      { name: 'phase', type: 'string' },
      { name: 'start', type: 'string'},
      { name: 'end', type: 'string'}
    ];

    scheduleForEmployeeOptions.columnTypes = [
      { name: 'employee', type: 'string' },
      { name: 'schedule', type: 'table', options: scheduleOptions }
    ];

    scheduleForShiftOptions.columnTypes = [
      { name: 'shift', type: 'string' },
      { name: 'schedule', type: 'table', options: scheduleForEmployeeOptions },
    ];

    this.scheduleForDayOptions.columnTypes = [
      { name: 'date', type: 'date' },
      { name: 'schedule', type: 'table', options: scheduleForShiftOptions },
    ];

  }

  onModification(modification: any) {

  }
}
