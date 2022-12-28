import { TestBed } from "@angular/core/testing";

import { EnvService } from "../env-provider.service";

describe("EnvService", () => {
  let service: EnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
