import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import Identicon from "../src/";

const stories = storiesOf("Identicon", module);

stories.addDecorator(withKnobs);

stories
  .add("defaults", () => (
    <div style={{ width: "100px" }}>
      <Identicon />
    </div>
  ))
  .add("with hash specified", () => (
    <div style={{ width: "100px" }}>
      <Identicon
        hash={text("Hash", "47419ab5e63b2ed07767a5208c1bd658")}
        size={number("Size", 100)}
      />
    </div>
  ));
