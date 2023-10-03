import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";

import { TestableApp } from "../src/App";

describe("TestableApp", () => {
  it("should render the loaded state correctly", () => {
    const { container } = render(<TestableApp />);
    fireEvent.click(screen.getByTestId("register-button"));
    expect(getByTestId(container, "app")).toBeInTheDocument();
  });
});
