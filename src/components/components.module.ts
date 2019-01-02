import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MyApp } from './../app/app.component';
import { HeaderWithMenuComponent } from './header-with-menu/header-with-menu';
import { ImageComponent } from './image/image';

@NgModule({
	declarations: [
    HeaderWithMenuComponent,
    ImageComponent
  ],
	imports: [
    IonicModule.forRoot(MyApp)
  ],
	exports: [
    HeaderWithMenuComponent,
    ImageComponent
  ]
})
export class ComponentsModule {}
