import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import User from '../models/User';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: Array<User> = [];
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

}
