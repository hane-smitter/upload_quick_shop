import { useState } from 'react';
import { Box, Avatar } from '@material-ui/core';

const Thumb = ({ file }) => {
    const [image, setImage] = useState({
        bin: ''
    });
    
    if(!file) return null;

    const reader = new FileReader();
    
    reader.onloadend = () => {
        setImage({bin: reader.result});
    }
    reader.readAsDataURL(file);

    return (
        <Box padding={2}>
            <Avatar variant="rounded" src={image.bin} alt={file.name} style={{height: 150, width: 150}} />
        </Box>
    )


}

export default Thumb;