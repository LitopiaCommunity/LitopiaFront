import { Component, OnInit } from '@angular/core';
import { SeoService } from "../../utils/seo.service";
import { UserEntity, UsersService } from "../../apis/litopia-api";
import { combineLatest, Observable, ReplaySubject, startWith, switchMap, map } from "rxjs";
import { FormControl } from "@angular/forms";

export enum SortType {
  LAST_ACTIVITY = 'lastActivity',
  ARIVAL_DATE = 'arivalDate',
  PLAYER_NAME = 'playerName',
  PLAYER_ROLE = 'playerRole',
}

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss']
})
export class MembresComponent implements OnInit {
  membersObs = new ReplaySubject<UserEntity[]>(1);
  membersFinalObs!: Observable<UserEntity[]>;
  uniqueGodObs!: Observable<UserEntity[]>;
  litogodObs!: Observable<UserEntity[]>;
  searchControl = new FormControl<string>('');
  sortControl = new FormControl<SortType>(SortType.LAST_ACTIVITY);
  inputChangeObs!: Observable<{ search: string | null; sort: SortType | null }>;

  constructor(private seo: SeoService, public userService: UsersService) {
    this.initializeSeo();
    this.initializeData();
    this.initializeFormControls();
    this.initializeFinalMembersObservable();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  ngOnInit(): void {}

  private initializeSeo() {
    this.seo.generateTags({
      title: 'Litopia - Membres',
      description: 'Retrouvez la liste des membres de Litopia',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
  }

  private initializeData() {
    this.userService.usersControllerGetUserByRoles([
      'inactive-litopien', 'pretopien', 'litopien', 'active-litopien', 'candidate'
    ]).subscribe(this.membersObs);
    this.uniqueGodObs = this.userService.usersControllerGetUserByRoles(['unique-god']);
    this.litogodObs = this.userService.usersControllerGetUserByRoles(['litogod']);
  }

  private initializeFormControls() {
    const savedSearch = this.isBrowser()?localStorage.getItem('membersSearch'):undefined;
    const savedSort = this.isBrowser()?localStorage.getItem('membersSort') as SortType :undefined;

    this.searchControl.setValue(savedSearch || '');
    this.sortControl.setValue(savedSort || SortType.LAST_ACTIVITY);

    this.inputChangeObs = combineLatest({
      search: this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
      sort: this.sortControl.valueChanges.pipe(startWith(this.sortControl.value)),
    }).pipe(map(({ search, sort }) => ({ search, sort })));

    if (this.isBrowser()) {
      this.searchControl.valueChanges.subscribe(value => {
        localStorage.setItem('membersSearch', value || '');
      });

      this.sortControl.valueChanges.subscribe(value => {
        localStorage.setItem('membersSort', value || SortType.LAST_ACTIVITY);
      });
    }
  }

  private initializeFinalMembersObservable() {
    this.membersFinalObs = this.inputChangeObs.pipe(
      switchMap(({ search, sort }) =>
        this.membersObs.pipe(
          map(users => this.filterUsers(users, search)),
          map(users => this.sortUsers(users, sort))
        )
      )
    );
  }

  private filterUsers(users: UserEntity[], search: string | null): UserEntity[] {
    if (!search || search.length < 3) {
      return users;
    }
    return users.filter(user =>
      user.discordNickname.toLowerCase().includes(search.toLowerCase()) ||
      (user.minecraftUser && user.minecraftUser.minecraftNickname.toLowerCase().includes(search.toLowerCase()))
    );
  }

  private sortUsers(users: UserEntity[], sort: SortType | null): UserEntity[] {
    if (!sort) {
      return users;
    }
    return users.sort((a, b) => this.compareUsers(a, b, sort));
  }

  private compareUsers(a: UserEntity, b: UserEntity, sort: SortType): number {
    switch (sort) {
      case SortType.LAST_ACTIVITY:
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      case SortType.ARIVAL_DATE:
        return new Date(b.candidatureAcceptedAt).getTime() - new Date(a.candidatureAcceptedAt).getTime();
      case SortType.PLAYER_NAME:
        return a.discordNickname.localeCompare(b.discordNickname);
      case SortType.PLAYER_ROLE:
        const order = ['litogod', 'unique-god', 'active-litopien', 'litopien', 'pretopien', 'candidate', 'inactive-litopien'];
        return order.indexOf(a.role) - order.indexOf(b.role);
      default:
        return 0;
    }
  }

  protected readonly SortType = SortType;
}
