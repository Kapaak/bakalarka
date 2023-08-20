import { render } from "@testing-library/react";

import { TextAction } from "./TextAction";

describe("TextAction", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TextAction text="" action="" href="" />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
