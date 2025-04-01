import { NgModule } from "@angular/core";
import { customCurrencyPipe } from "./pips/custom-currency.pipe";
import { CurrencyService } from "./services/currency.service";
import {TimelineDatePipe} from './pips/timelineDate.pipe';


@NgModule({
  declarations: [
    customCurrencyPipe,
    TimelineDatePipe,
  ],
  providers: [
    CurrencyService
  ],
  exports: [customCurrencyPipe, TimelineDatePipe]
})
export class UtilsModule {
  constructor() {
    console.log("UtilsModule loaded");

  }
  // static forRoot() {
  //   return {
  //     ngModule: UtilsModule,
  //     providers: [],
  //   };
  // }
}
