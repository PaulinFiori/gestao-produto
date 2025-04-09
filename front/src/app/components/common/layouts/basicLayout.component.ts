import { Component } from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "basic",
  templateUrl: "basicLayout.template.html",
  host: {
    "(window:resize)": "onResize()"
  }
})
export class BasicLayoutComponent {
  constructor( ) { }
}