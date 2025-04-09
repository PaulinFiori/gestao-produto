import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonModulesModule } from "../common/common-modules/common-modules.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [CommonModule, CommonModulesModule],
  declarations: [HomeComponent]
})
export class HomeModule { }