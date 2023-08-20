import { render } from "@testing-library/react";

import { MainHeadline } from "./MainHeadline";

describe("MainHeadline", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MainHeadline />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
