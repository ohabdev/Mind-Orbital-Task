import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyService } from "../services/currency.service";

@Pipe({
  name: 'currency', // Hijacks the 'currencya' pipe
  pure: true
})
export class customCurrencyPipe implements PipeTransform {
  constructor(private service: CurrencyService) {
    console.log("CustomCurrencyPipe");
  }

  transform(value: any, currency = 'BDT'): any {
    const symbol = this.service.getSymbol(currency);
    const p = (parseFloat(value) || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `${symbol} ${p}`;
  }
}