import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  HostListener
} from "@angular/core";
import { sildeAnimation } from "./panel.animations";
import { TRANSITIONS, IPanelConfig, DEFAULTCONFIG } from "./panel.constants";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
  animations: [sildeAnimation],
  exportAs: "panel"
})
export class PanelComponent implements OnInit {
  private _escKeyUpListener: Function;
  private _clickListener: Function;
  private _visible: boolean = false;
  private backdrop: HTMLElement;

  @Input() config: IPanelConfig = DEFAULTCONFIG;

  @Input() title = "Panel title";

  @Input() position = "right";

  get visible() {
    return this._visible;
  }

  @Output() onClose = new EventEmitter();

  constructor(
    private cd: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _element: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.backdrop = this.createRecaptchaContainer();
  }

  ngOnDestroy() {
    if (this._escKeyUpListener) {
      this._escKeyUpListener();
    }
  }

  open() {
    if (this.config.hasOverlay) {
      this._renderer.appendChild(this._element.nativeElement, this.backdrop);
      this.backdrop.focus();
      this._clickListener = this._renderer.listen(
        this.backdrop,
        "click",
        () => {
          this.close();
        }
      );
      this._escKeyUpListener = this._renderer.listen(
        this.backdrop,
        "keyup.esc",
        () => {
          this.close();
        }
      );
    }
    setTimeout(() => {
      this._visible = true;
    }, 100);
  }

  close() {
    if (this._escKeyUpListener) {
      this._escKeyUpListener();
    }
    if (this._clickListener) {
      this._clickListener();
    }
    this._visible = false;
    this.onClose.emit();
    this._renderer.removeChild(this._element.nativeElement, this.backdrop);
  }

  @HostListener("keydown.esc", ["$event"])
  onEsc(event: KeyboardEvent): void {
    this.close();
  }

  private createRecaptchaContainer(): HTMLElement {
    const recaptchaContainer = this._renderer.createElement("div");
    this._renderer.setAttribute(recaptchaContainer, "tabindex", "-1");
    this._renderer.addClass(recaptchaContainer, "panel-backdrop");
    return recaptchaContainer;
  }
}
