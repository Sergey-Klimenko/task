import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppSearchResultComponent} from './app.search.result/app.search.result.component';

import { registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {ru_RU} from 'ng-zorro-antd/i18n';
import {NzButtonModule} from 'ng-zorro-antd/button';
import ru from '@angular/common/locales/ru';
import {NgZorroAntdModule} from './ng-zorro-antd.module';
import {NZ_ICONS} from 'ng-zorro-antd';
import {IconDefinition} from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

registerLocaleData(ru);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [
    AppComponent,
    AppSearchResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NgZorroAntdModule,
    BrowserModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    ScrollingModule,
    DragDropModule
  ],
  providers: [{provide: NZ_I18N, useValue: ru_RU}, {provide: NZ_ICONS, useValue: icons}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
