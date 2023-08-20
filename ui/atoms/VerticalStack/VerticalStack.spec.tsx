import { render } from "@testing-library/react";

import { VerticalStack } from "./VerticalStack";

describe("VerticalStack", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<VerticalStack />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
