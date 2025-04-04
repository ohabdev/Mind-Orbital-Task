import { Component, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { RestangularModule, Restangular } from 'ngx-restangular';

declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu: any = '';
  showSubMenu: any = '';
  public notifications = {total: 0, data: [], page: 0, loading: false, notificationHas: false};
  public isShowMenu: any = false;
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private restangular: Restangular,
  ) {
  }
  // End open close
  ngOnInit() {
    this.findNotificationQuery();
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    $(function () {
      $('.sidebartoggler').on('click', function () {
        if ($('#main-wrapper').hasClass('mini-sidebar')) {
          $('body').trigger('resize');
          $('#main-wrapper').removeClass('mini-sidebar');
        } else {
          $('body').trigger('resize');
          $('#main-wrapper').addClass('mini-sidebar');
        }
      });
    });
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/auth/login']);
  }

  showDropdown() {
    this.isShowMenu = !this.isShowMenu;
  }
  findNotificationQuery(){
    this.notifications = { ...this.notifications, loading: true };
    this.restangular.one('notifications/admin?page='+ (this.notifications.page + 1)).get().toPromise().then((res)=>{
      const data = { total: res.data.total, data: [...this.notifications.data, ...res.data.notifications], page: parseInt(res.data.page), loading: false, notificationHas: false };
      if(res.data.notifications.length >= res.data.per_page){
        data.notificationHas = true
      }
      this.notifications = data;
    }) .catch(() => {});
  }


  seeMore(event){
    event.preventDefault();
    event.stopPropagation();
    this.notifications.loading = true;
    this.findNotificationQuery()
  }
}
