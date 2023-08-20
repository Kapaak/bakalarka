import { render } from "@testing-library/react";

import { MaxWidth } from "./MaxWidth";

describe("MaxWidth", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MaxWidth />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
