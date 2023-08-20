import { render } from "@testing-library/react";

import { LabelContainer } from "./LabelContainer";

describe("LabelContainer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LabelContainer label="" />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
