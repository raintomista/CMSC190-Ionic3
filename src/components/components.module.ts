import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonComponent } from './button/button';
import { CheckboxComponent } from './checkbox/checkbox';
import { FloatingActionButtonComponent } from './floating-action-button/floating-action-button';
import { HeaderWithBackComponent } from './header-with-back/header-with-back';
import { HeaderWithMenuComponent } from './header-with-menu/header-with-menu';
import { ListItemComponent } from './list-item/list-item';
import { ImageComponent } from './image/image';
import { PasswordInputComponent } from './password-input/password-input';
import { RadioComponent } from './radio/radio';
import { TextInputComponent } from './text-input/text-input';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
@NgModule({
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    FloatingActionButtonComponent,
    HeaderWithBackComponent,
    HeaderWithMenuComponent,
    ImageComponent,
    ListItemComponent,
    PasswordInputComponent,
    RadioComponent,
    TextInputComponent
  ],
	imports: [CommonModule, IonicModule],
	exports: [
    ButtonComponent,
    CheckboxComponent,
    FloatingActionButtonComponent,
    HeaderWithBackComponent,
    HeaderWithMenuComponent,
    ImageComponent,
    ListItemComponent,
    PasswordInputComponent,
    RadioComponent,
    TextInputComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ComponentsModule {}
