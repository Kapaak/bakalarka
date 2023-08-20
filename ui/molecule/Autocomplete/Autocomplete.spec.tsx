import { render } from "@testing-library/react";

import { Autocomplete } from "./Autocomplete";

describe("Autocomplete", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Autocomplete options={[]} onSelect={() => null} />
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
