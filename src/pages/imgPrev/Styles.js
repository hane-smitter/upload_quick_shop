import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    imageField: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '270px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
});

export default useStyles;