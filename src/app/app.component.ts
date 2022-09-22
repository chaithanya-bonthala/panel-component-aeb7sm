import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TRANSITIONS, IPanelConfig } from "./panel/panel.constants";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public title = "Panels";
  position = "right";

  public defaultPanelConfig: IPanelConfig = {
    hasOverlay: true,
    bodyContainerClass: "my-default-body"
  };

  constructor(public breakpointObserver: BreakpointObserver) {}

  onDeafultPanelClose(event): void {}
}
