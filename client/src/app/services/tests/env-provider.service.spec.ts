import { TestBed } from "@angular/core/testing";

import { EnvProvider } from "../env-provider.service";

describe("EnvProvider", () => {
  let service: EnvProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvProvider);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
