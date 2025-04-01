import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Restangular} from 'ngx-restangular';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  @ViewChild('top') top: ElementRef;
  color = 'defaultdark';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;
  public appConfig: any;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
      public router: Router,
      private route: ActivatedRoute,
      private restangular: Restangular,
    ) {
    this.appConfig = window.appConfig;
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard/dashboard1']);
    }
    this.route.queryParams.subscribe(params => {
      const notification_id = params['notification_id'];
      if(notification_id){
        setTimeout(()=>{
          this.restangular.one('notifications/admin/view/'+notification_id).put().toPromise().then((res)=>{}) .catch(() => { });
        },1000)
      }
    });
  }

  scrollTop() {
    this.top.nativeElement.scrollTo(0, 0);
  }

}
