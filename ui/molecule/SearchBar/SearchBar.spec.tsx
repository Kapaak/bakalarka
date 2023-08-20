import { render } from "@testing-library/react";

import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SearchBar options={[]} />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
