import React, { useContext } from 'react';
import FileBase from "react-file-base64";

import GlobalState from '../contexts/GlobalState';

const FileInput = () => {
    const [state, setState] = useContext(GlobalState);
    
  return (
    <FileBase
      type="file"
      multiple={false}
      value="hello"
      onDone={({ base64 }) => setState(state => ({...state, image: base64}))}
    />
  );
};

export default FileInput;
