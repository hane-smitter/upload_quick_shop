import { useContext } from 'react';

import GlobalState from '../contexts/GlobalState';

const FileInput = () => {
  const [globState, setGlobState] = useContext(GlobalState);
    
  return (
    <input id="file" accept='image/*' name="file" formEncType="multipart/form-data" type="file" onChange={(event) => {
      setGlobState({...globState, image: event.currentTarget.files[0]} )
    }}/>
  );
};

export default FileInput;
