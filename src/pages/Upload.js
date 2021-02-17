import React, { useContext } from 'react';

import GlobalState from '../contexts/GlobalState';

const FileInput = () => {
    const [state, setState] = useContext(GlobalState);
    
  return (
    <input id="file" name="file" type="file" onChange={(event) => {
      setState(state => ({...state, image: event.currentTarget.files[0]}) )
    }} />
  );
};

export default FileInput;
