import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { SortTypes } from '../interfaces/Enums';
import User from '../models/User';

@Component({
  selector: 'user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css']
})
export class UserActionsComponent implements OnInit {
  @Input() users: Array<User> = [];
  @Output() sort: EventEmitter<SortTypes> = new EventEmitter<SortTypes>();
  @Output() showForm: EventEmitter<any> = new EventEmitter<any>();

  public sortType: SortTypes = SortTypes.Default;

  constructor() { }

  ngOnInit() {}

  update() {
    this.sort.emit(this.sortType);
  }

}
