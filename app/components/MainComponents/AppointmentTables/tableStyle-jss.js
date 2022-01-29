import { lighten, darken, fade } from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
const styles = theme => ({
    root: {
        paddingRight: theme.spacing(1),
    },
    rootTable: {
        width: '100%',
        marginTop: theme.spacing(1),
        // overflowX: 'auto',
    },
    container: {
        maxHeight: 'calc(100vh - 325px)',
        minHeight: 'calc(100vh - 325px)',
        '&::-webkit-scrollbar': {
            width: 8,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0)',
        },
        '&:hover': {
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
            }
        }
    },
    blueButton: {
        background: 'cornflowerblue',
        marginLeft: theme.spacing(1),
        '&:hover': {
            background: 'cornflowerblue',
        }
    },
    popover: {
        padding: 20,
        background: '#f5f5f5',
        '& .MuiTypography-body1': {
            fontSize: 12
        }
    },
    highlight:
        theme.palette.type === 'light' ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        } : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
        flex: '1 1 100%',
    },
    avatar: {
        marginRight: theme.spacing(1),
        borderRadius: 5
    },
    flex: {
        display: 'flex'
    },
    customTitle: {
        display: 'flex',
        alignItems: 'center',
        '& small': {
            fontWeight: 700,
            textDecoration: 'underline',
            color: 'blue',
            cursor: 'pointer'
        }
    },
    actionsToolbar: {
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
    },
    textField: {
        flexBasis: 200,
        width: 300,
        // marginTop: 4,
    },
    searchField: {
        flexBasis: 200,
        width: 220,
        marginTop: 4,
    },
    table: {
        minWidth: 460,
        margin: 0
    },
    tableSmall: {
        minWidth: 500,
    },
    actions: {
        color: theme.palette.text.secondary,
        // display: 'flex'
    },
    toolbar: {
        backgroundColor: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.6) : theme.palette.primary.light,
        minHeight: 48,
        marginBottom: theme.spacing(2)
    },
    title: {
        flex: '0 0 auto',
        '& h6': {
            fontSize: 16,
            color: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.2) : darken(theme.palette.primary.dark, 0.2),
            marginRight: 15
        }
    },
    button: {
        margin: `${theme.spacing(1)}px 0`,
    },
    iconSmall: {
        fontSize: 20,
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    tableChip: {
        margin: theme.spacing(1),
        color: theme.palette.common.white
    },
    /*
    -----------------------
    ** Table Style **
    ** - Odd Even Stripped
    ** - Hover Style
    ** - Bordered Style
    ** - Empty Table
    ** - Table SIze
    -----------------------
    */
    stripped: {
        '& tbody tr:nth-child(even)': {
            background: theme.palette.type === 'dark' ? fade(theme.palette.grey[900], 0.5) : theme.palette.grey[50]
        }
    },
    hover: {
        '& tbody tr:hover': {
            background: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.8) : theme.palette.grey[50]
        }
    },
    bordered: {
        border: theme.palette.type === 'dark' ? `1px solid ${theme.palette.grey[900]}` : `1px solid ${theme.palette.primary.light}`,
        '& thead tr': {
            background: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.primary.light
        },
        '& td, th': {
            border: theme.palette.type === 'dark' ? `1px solid ${theme.palette.grey[900]}` : `1px solid ${theme.palette.primary.light}`
        },
        '& tr td, tr th': {
            '&:first-child': {
                borderLeft: 'none'
            },
            '&:last-child': {
                borderRight: 'none'
            }
        }
    },
    nodata: {
        textAlign: 'center',
        padding: '10px 10px 40px',
        fontSize: 24,
        lineHeight: '16px',
        color: theme.palette.grey[500],
        '& svg': {
            position: 'relative',
            top: -2,
            width: 26,
            height: 26,
            margin: '0 6px',
            fill: theme.palette.grey[500],
        }
    },
    small: {
        '& tr': {
            height: 24,
            '& td, th': {
                padding: '4px 10px',
                fontSize: 12
            }
        }
    },
    medium: {
        '& tr': {
            height: 48,
            '& td, th': {
                padding: '4px 6px 4px 24px',
                fontSize: 14
            }
        }
    },
    big: {
        '& tr': {
            height: 64,
            '& td, th': {
                padding: '8px 56px 8px 24px',
                fontSize: 18
            }
        }
    },
    settings: {
        background: theme.palette.background.default,
        padding: 20,
        borderRadius: theme.rounded.medium
    },
    up: {
        color: green[500],
        '& svg': {
            fill: green[500],
        }
    },
    down: {
        color: red[500],
        '& svg': {
            fill: red[500],
        }
    },
    flat: {
        color: theme.palette.divider,
        '& svg': {
            fill: theme.palette.divider,
        }
    },
    chartTable: {
        '& svg': {
            '& [class*="recharts-bar-rectangle"] path': {
                fill: fade(theme.palette.primary.main, 0.5)
            }
        }
    },
    datepicker: {
        display: 'contents',
        '& >div': {
            verticalAlign: 'middle'
        }
    },
    datePicker: {
        marginLeft: 8,
        display: 'flex',
        float: 'right',
        alignItems: 'center',
        border: '1px solid #bdbdbd',
        background: '#fff',
        borderRadius: 10,
        '& .MuiInput-root': {
            border: 'none',
        },
        '& .MuiInput-underline:after': {
            border: 'none',
            boxShadow: 'none'
        },
        '& .MuiIcon-root': {
            cursor: 'pointer'
        }
    },
    dateRangePicker: {
        marginLeft: 8,
        marginTop: 6,
        display: 'flex',
        float: 'right',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 10,
    },
    navigation: {
        margin: 'auto 0',
        display: 'flex',
        '& span': {
            width: '2rem',
            height: '2rem',
            textAlign: 'center',
            verticalAlign: 'middle',
            border: '1px solid #dedede',
            borderRadius: 5,
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#eeeeee'
        }
    },
    success: {
        background: 'lightgreen',
        color: '#fff',
        fontWeight: 600,
        borderRadius: 8
    },
    warning: {
        background: 'lightsalmon',
        color: '#fff',
        fontWeight: 600,
        borderRadius: 8
    },
    bgVideo: {
        backgroundColor: '#a4caef',
        display: 'inherit',
        padding: '5px 10px',
        borderRadius: 5,
        '& p': {
            margin: 0
        }
    },
    bgAudio: {
        backgroundColor: '#f080806e',
        display: 'inherit',
        padding: '5px 10px',
        borderRadius: 5,
        '& p': {
            margin: 0
        }
    },
    bgChat: {
        backgroundColor: '#808080ad',
        display: 'inherit',
        padding: '5px 10px',
        borderRadius: 5,
        '& p': {
            margin: 0
        }
    },
    bgWalkIn: {
        backgroundColor: '#00800054',
        display: 'inherit',
        padding: '5px 10px',
        borderRadius: 5,
        '& p': {
            margin: 0
        }
    },
    noDetails: {
        color: 'rgb(224, 224, 224)',
        padding: 60,
        height: 'calc(100vh - 400px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pagination: {
        float: 'right',
        paddingTop: 20
    },
    hide: {
        position: 'absolute',
        zIndex: -1,
        width: '100vw'
    }
});

export default styles;
