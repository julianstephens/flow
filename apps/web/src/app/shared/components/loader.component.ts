import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loader",
  template: `
    <div class="d-flex flex-column justify-center">
      <img src="/assets/loader.svg" class="mb-8" />
      <p class="font-sm">Loading...</p>
    </div>
  `,
  styles: [],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
