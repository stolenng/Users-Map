import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BringgComponent } from './bringg/bringg.component';
import { UserListComponent } from './bringg/user-list/user-list.component';
import { UserItemComponent } from './bringg/user-list/user-item/user-item.component';
import { UserService } from './bringg/services/user.service';
import { MapComponent } from './bringg/map/map.component';
import { UserActionsComponent } from './bringg/user-actions/user-actions.component';
import { UserFormComponent } from './bringg/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BringgComponent,
    UserListComponent,
    UserItemComponent,
    MapComponent,
    UserActionsComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
