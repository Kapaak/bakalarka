import { render } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Button />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
