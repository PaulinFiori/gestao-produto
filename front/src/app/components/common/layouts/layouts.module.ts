import { NgModule } from "@angular/core";
import { CommonModulesModule } from "../common-modules/common-modules.module";
import { FooterComponent } from "../footer/footer.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { BasicLayoutComponent } from "./basicLayout.component";
import { AngularMaterialElementsModule } from "../angular-material-elements/angular-material-elements.module";

@NgModule({
  imports: [
    CommonModulesModule,
    AngularMaterialElementsModule
  ],
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent
  ],
  providers: []
})
export class LayoutsModule { }