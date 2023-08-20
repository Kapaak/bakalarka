import { render } from "@testing-library/react";

import { HorizontalStack } from "./HorizontalStack";

describe("HorizontalStack", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<HorizontalStack />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
