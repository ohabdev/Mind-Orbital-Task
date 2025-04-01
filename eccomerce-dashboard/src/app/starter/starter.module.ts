import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { StatCardComponent } from '../stats/stats-card.component';
import { MediaModule } from '../media/media.module';

import { StatService } from '../shared/services';
import { UtilsModule } from '../utils/utils.module';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Dashboard',
    urls: [{ title: 'Dashboard', url: '/starter' }, { title: 'Admin dashboard' }]
  },
  component: StarterComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MediaModule,
    UtilsModule
  ],
  declarations: [
    StarterComponent,
    StatCardComponent
  ],
  providers: [
    StatService,
  ]
})
export class StarterModule { }
