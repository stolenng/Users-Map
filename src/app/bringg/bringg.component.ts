import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

import User from './models/User';
import Actions from './models/Actions';
import { ActionsEnum } from './interfaces/IActions';
import { SortTypes } from './interfaces/Enums';

@Component({
  selector: 'bringg',
  templateUrl: './bringg.component.html',
  styleUrls: ['./bringg.component.css']
})
export class BringgComponent implements OnInit {
  public users: Array<User> = [];
  public mapActions: Actions;
  public hideForm: boolean = true;

  constructor(private userSrv: UserService) { }

  ngOnInit() {
    this.userSrv.get().then(res => {
      this.users = res.map(user => new User(user.id, user.isActive, user.age, user.firstName, user.lastName, user.picture, user.email, user.latitude, user.longitude));
      this.sort(SortTypes.Default);
      this.mapActions = this.makeAction(ActionsEnum.Init, null);
    });
  }

  add(user: User) {
    this.users = [user, ...this.users];

    this.mapActions = this.makeAction(ActionsEnum.Add, user);
    this.hideForm = true;
  }

  remove(index: number) {
    this.mapActions = this.makeAction(ActionsEnum.Remove, this.users.splice(index, 1)[0]);
  }

  toggleForm() {
    this.hideForm = !this.hideForm;
  }

  sort(type: SortTypes) {
    switch (type) {
      case SortTypes.Age:
        this.users.sort((a, b) => a.age - b.age);

        break;
      case SortTypes.Name:
        this.users.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });

        break;
      case SortTypes.Default:
        this.users.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        break;
    }

  }

  makeAction(action: ActionsEnum, item: any): Actions {
    return new Actions(action, item);
  }
}
