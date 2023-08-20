import { render } from "@testing-library/react";

import { TableHeaderCell } from "./TableHeaderCell";

describe("TableHeaderCell", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TableHeaderCell title="" icon={null} />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
