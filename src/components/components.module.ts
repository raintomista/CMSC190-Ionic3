import { MyApp } from './../app/app.component';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { HeaderWithMenuComponent } from './header-with-menu/header-with-menu';

@NgModule({
	declarations: [HeaderWithMenuComponent],
	imports: [
    IonicModule.forRoot(MyApp)
  ],
	exports: [HeaderWithMenuComponent]
})
export class ComponentsModule {}
