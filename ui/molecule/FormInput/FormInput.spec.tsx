import { render } from "@testing-library/react";

import { FormInput } from "./FormInput";

describe("FormInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FormInput name="" />);

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
