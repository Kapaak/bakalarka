import { render } from "@testing-library/react";

import { GoogleAutocomplete } from "./GoogleAutocomplete";

describe("GoogleAutocomplete", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoogleAutocomplete
        name=""
        inputRef={null}
        value=""
        onChange={() => null}
      />
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
