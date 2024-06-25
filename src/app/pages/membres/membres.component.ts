import {Component, OnInit} from '@angular/core';
import {SeoService} from "../../utils/seo.service";
import {UserEntity, UsersService} from "../../apis/litopia-api";
import { map, merge, Observable, ReplaySubject, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss']
})
export class MembresComponent implements OnInit {

  membersObs = new ReplaySubject<UserEntity[]>()
  membersFinalObs: Observable<UserEntity[]>
  uniqueGodObs: Observable<UserEntity[]>
  litogodObs: Observable<UserEntity[]>;
  searchControl = new FormControl<string>('');

  constructor(private seo: SeoService, public userService: UsersService) {
    this.seo.generateTags({
      title: 'Litopia - Membres',
      description: 'Retrouvez la liste des membres de Litopia',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
    this.userService.usersControllerGetUserByRoles(['inactive-litopien', 'pretopien', 'litopien', 'active-litopien'])
      .subscribe(this.membersObs)
    this.uniqueGodObs = this.userService.usersControllerGetUserByRoles(['unique-god'])
    this.litogodObs = this.userService.usersControllerGetUserByRoles(['litogod'])
    this.membersFinalObs = merge(
      this.searchControl.valueChanges.pipe(
        map((s) => s as string | null),
        switchMap((search) => {
          return this.membersObs.pipe(map((users) => {
            if (!search || search && search?.length < 3) {
              return users;
            }
            return users.filter((user) => {
              return user.discordNickname.toLowerCase().includes(search.toLowerCase()) ||
                (user.minecraftUser && user.minecraftUser.minecraftNickname.toLowerCase().includes(search.toLowerCase()));
            });
          }))
        })
      ),
      this.membersObs.asObservable()
    );
  }

  ngOnInit(): void {
  }

}
