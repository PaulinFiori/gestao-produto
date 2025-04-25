import { NgModule } from "@angular/core";
import { CommonModulesModule } from "../common-modules/common-modules.module";
import { FooterComponent } from "../footer/footer.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { BasicLayoutComponent } from "./basicLayout.component";
import { AngularMaterialElementsModule } from "../angular-material-elements/angular-material-elements.module";
import { BlankLayoutComponent } from "./blankLayout.component";

@NgModule({
  imports: [
    CommonModulesModule,
    AngularMaterialElementsModule
  ],
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent,
    BlankLayoutComponent
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent,
    BlankLayoutComponent
  ],
  providers: []
})
export class LayoutsModule { }