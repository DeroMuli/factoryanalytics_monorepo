import React from "react";
import { render } from "@testing-library/react-native";
import VectorIcon from "./VectorIcons";
import type { Icon } from "./VectorIcons";

it("shows the corect color", () => {
    const color = "red";
    const icon : Icon = { iconname : "test", iconlibrary: "MaterialCommunityIcons" };
    const iconstyle={ margin: 5 }
    const {getByTestId} = render(<VectorIcon color={color} icon={icon} iconstyle={iconstyle} />);
    expect(getByTestId("vectoricon").toHaveStyle({ color }));
});

