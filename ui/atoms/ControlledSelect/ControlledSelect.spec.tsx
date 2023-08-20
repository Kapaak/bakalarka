import { render } from "@testing-library/react";

import { ControlledSelect } from "./ControlledSelect";

describe("ControlledSelect", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ControlledSelect name="Select" options={[]} />
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
