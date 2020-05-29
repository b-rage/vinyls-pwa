import React, { useEffect, useState } from "react";
import { useAddToHomescreenPrompt } from "../useAddToHomescreenPrompt";



const AddToHomeScreen = () => {

  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = useState(false);

  const hide = () => setVisibleState(false);

  useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );

  if (!isVisible) {
    return <div />;
  }

  return (
    <div onTouchEnd={hide}>
      <button onTouchEnd={hide}>Close</button>
      Hello! Wanna add to homescreen?
      <button onTouchEnd={promptToInstall}>Add to homescreen</button>
    </div>
  );
};

export default AddToHomeScreen;