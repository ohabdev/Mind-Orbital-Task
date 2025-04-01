import { Component, OnInit } from '@angular/core';
import { StatService } from '../shared/services';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {

  public shopStat: any = {};
  public userStat: any = {};
  public productStat: any = {};
  public orderStat: any = {};
  public requestPayout = [];

  constructor(private statService: StatService) { }

  ngOnInit() {
    this.statService.shopStat().then(res => {
      this.shopStat = res.data;
    });
    this.statService.userStat().then(res => {
      this.userStat = res.data;
    });
    this.statService.prodStat().then(res => {
      this.productStat = res.data;
    });
    this.statService.orderStat().then(res => {
      this.orderStat = res.data;
    });

  }
}
