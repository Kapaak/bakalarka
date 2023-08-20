import { render } from "@testing-library/react";

import { MainSubheadline } from "./MainSubheadline";

describe("MainSubheadline", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MainSubheadline />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
