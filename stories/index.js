import React from "react";
import { storiesOf } from "@storybook/react";
import Identicon from "../src/";

storiesOf("Identicon", module)
  .add("defaults", () => <Identicon />)
  .add("with hash specified", () => (
    <Identicon hash={"47419ab5e63b2ed07767a5208c1bd658"} />
  ));
