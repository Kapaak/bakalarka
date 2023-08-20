import { render } from "@testing-library/react";

import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Tooltip content={null}>some tooltip</Tooltip>
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
