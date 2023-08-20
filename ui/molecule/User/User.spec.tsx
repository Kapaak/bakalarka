import { render } from "@testing-library/react";

import { UserComponent } from "./User";

describe("User", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UserComponent userName="" />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
