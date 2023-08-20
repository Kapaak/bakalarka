import { ArrowArcLeft } from "@phosphor-icons/react";
import { render } from "@testing-library/react";

import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<IconButton icon={<ArrowArcLeft />} />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
