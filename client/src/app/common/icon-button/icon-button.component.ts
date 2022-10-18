import { Component, Input, OnInit } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "app-icon-button",
  template: ` <span [ngClass]="spanClasses"><i [ngClass]="iconClasses"></i></span> `,
  styles: [],
})
export class IconButtonComponent implements OnInit {
  @Input() icon = "";

  @Input() span: string[] = [];

  iconClasses: string;

  spanClasses: string;

  constructor() {}

  ngOnInit(): void {
    this.iconClasses = `bi ${this.icon}`;
    this.spanClasses = _.isEmpty(this.span) ? "" : this.span.join(" ");
  }
}
