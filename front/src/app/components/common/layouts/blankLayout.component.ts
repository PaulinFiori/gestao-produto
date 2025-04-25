import { Component } from "@angular/core";

declare global {
  interface Window {
    fcWidget: any;
  }
}

@Component({
  selector: "blank",
  templateUrl: "blankLayout.template.html"
})
export class BlankLayoutComponent {
  public fcWidget: any = window.fcWidget;
  public alreadyDestroyed: boolean = false;

  ngOnInit() {
    let self = this;
    if (this.fcWidget && this.fcWidget.user) {
      this.fcWidget.user.clear().then(
        function() {
          if (self.alreadyDestroyed) return;
          self.fcWidget.destroy();
        },
        function() {
          // self.fcWidget.destroy();
        }
      );
    }
  }

  ngAfterViewInit() {
    document.body.classList.add("gray-bg");
  }

  ngOnDestroy() {
    this.alreadyDestroyed = true;
    document.body.classList.remove("gray-bg");
  }
}
