import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopRoutingModule } from './shop.routing';

import { MediaModule } from '../media/media.module';

import {
  ShopListingComponent,
  ShopCreateComponent,
  ShopUpdateComponent,
  ShopBankInfoComponent,
  ShopBasicInfoComponent,
  ShopBusinessInfoComponent,
  ShopNotificationInfoComponent,
  ShopShippingInfoComponent,
  ShopSocialInfoComponent,
  CouponsComponent,
  ShopDocumentInfoComponent
} from './component';

import { ShopService } from './services/shop.service';
import { CouponService } from './services/coupon.service';
import { UserService } from '../user/user.service';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //our custom module
    ShopRoutingModule,
    NgbModule.forRoot(),
    MediaModule,
    UtilsModule
  ],
  declarations: [
    ShopListingComponent,
    ShopCreateComponent,
    ShopUpdateComponent,
    ShopBankInfoComponent,
    ShopBasicInfoComponent,
    ShopBusinessInfoComponent,
    ShopNotificationInfoComponent,
    ShopShippingInfoComponent,
    ShopSocialInfoComponent,
    CouponsComponent,
    ShopDocumentInfoComponent
  ],
  providers: [ShopService, UserService, CouponService],
  exports: []
})
export class ShopModule { }
