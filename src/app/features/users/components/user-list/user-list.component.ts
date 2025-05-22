import {Component, Input, OnInit} from '@angular/core';
import {ShortUser, User} from '../../../../core/model/user.model';
import {SmallUserCardComponent} from '../small-user-card/small-user-card.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    SmallUserCardComponent,
    FormsModule,
    NzInputGroupComponent,
    NzInputDirective,
    NzIconDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzEmptyComponent,
    NzButtonComponent,
    RouterLink,
    NzPaginationComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: ShortUser[] = [];
  filteredUsers: ShortUser[] = [];
  paginatedUsers: ShortUser[] = [];

  searchQuery = '';
  sortOption = 'name_asc';
  currentPage = 1;
  pageSize = 5;
  @Input() isAdmin!: boolean;

  constructor(private userService: UserService) {}

  /**
   * get users when component is initialized
   * copy array of users to filteredUsers
   */
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = [...this.users];
      this.applyFilters();
      this.updatePaginatedUsers();
    });
  }

  /**
   * update paginated users based on current page and page size
   * calculates start index and slices filteredUsers array
   */
  private updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * handle page change event from pagination component
   * @param page -- new page number
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  /**
   * function to apply filters and sorting
   * filters users by search query and applies selected sorting
   */
  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const searchLower = this.searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        (user.email && user.email.toLowerCase().includes(searchLower))
      );
    });

    /**
     * switch-case for sorting options
     * sorts filtered users based on selected option
     */
    this.filteredUsers.sort((a, b) => {
      switch (this.sortOption) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'email_asc':
          return (a.email || '').localeCompare(b.email || '');
        case 'email_desc':
          return (b.email || '').localeCompare(a.email || '');
        default:
          return 0;
      }
    });

    // reset to first page after applying filters/sorting
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  /**
   * handle page size change event
   * @param size -- new page size
   */
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  handleUserDeleted(deletedUserId: number) {
    this.filteredUsers = this.users.filter(u => u.id !== deletedUserId);
  }
}
