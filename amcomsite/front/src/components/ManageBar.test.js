import React from "react";
import { create } from "react-test-renderer";
import { ManageBar } from "./ManageBar";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<ManageBar/>);
    expect(button.toJSON()).toMatchSnapshot();
  });
});