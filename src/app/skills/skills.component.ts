import { Component, OnInit} from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';
import { TableOptions } from 'gdr-data-table';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: Promise<object[]>;
  options: any

  constructor(private crudService: CrudService) {
    this.skills = this.crudService.find('skill')
      .pipe(
        map(supplies => Lodash.sortBy(supplies, ['name']))
      ).toPromise();
  }

  ngOnInit() {
    // this.options.columnTypes = [
    //   { name: 'name', type: 'Text' },
    // ];
    this.crudService.getTypes('skill').subscribe(res => console.log(res));
    this.options = this.crudService.getTypes('skill').pipe(map(columnTypes => ({ columnTypes }))).toPromise();
  }

  onModification(modification: any) {
    console.log(modification);
    this.crudService.modify('skill', modification).then(result => console.log(result));
  }

}
