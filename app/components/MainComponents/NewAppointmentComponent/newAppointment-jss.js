import pink from '@material-ui/core/colors/pink';
import lightGreen from '@material-ui/core/colors/lightGreen';
import dark from '@material-ui/core/colors/blueGrey';
import { lighten, darken, fade } from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import NewAppointmentBanner from 'enl-images/new-icons/appointment-banner-white.png';

const styles = theme => ({

  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginLeft: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: 'inline-block',
    background: fade(theme.palette.text.primary, 0.05),
    '& $miniInput': {
      width: 70
    },
  },
  searchWrapper: {
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      textAlign: 'right'
    }
  },
  search: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fill: theme.palette.grey[400]
    }
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`
  },
  card: {
    minWidth: 275,
  },
  priceCard: {
    maxWidth: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  liked: {
    color: pink[500]
  },
  shared: {
    color: lightGreen[500]
  },
  num: {
    fontSize: 14,
    marginLeft: 5
  },
  rightIcon: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  cardPlayer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
    height: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  subheading1: {
    display: 'flex'
  },
  subSubheading: {
    display: 'flex',
    flexDirection: 'column'
  },
  Bold: {
    fontWeight: 700
  },
  Divider: {
    marginTop: 20,
    marginBottom: 20
  },
  btnArea: {
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  cardSocmed: {
    minWidth: 275,
    border: '1px solid #dedede',
    textAlign: 'center',
    padding: '4rem',
    backgroundColor: 'rgb(238 224 247)!important',
    backgroundSize: 'cover'
  },
  cardProduct: {
    position: 'relative'
  },
  mediaProduct: {
    height: 0,
    paddingTop: '60.25%', // 16:9
  },
  cardMedia: {
    position: 'relative',
    marginBottom: theme.spacing(3),
  },
  gutterBottom: {
    marginBottom: theme.spacing(3)
  },
  landscapeCard: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  rightAction: {
    '&:not(:first-child)': {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center'
    }
  },
  floatingButtonWrap: {
    position: 'relative',
    paddingTop: 50
  },
  buttonAdd: {
    position: 'absolute',
    right: 20,
    top: -20,
  },
  buttonAddList: {
    display: 'none',
    marginLeft: 10
  },
  title: {
    fontSize: 20,
    height: 30,
    fontWeight: theme.typography.fontWeightMedium
  },
  ratting: {
    margin: '10px 0',
    '& button': {
      width: 24,
      height: 24
    }
  },
  emptyRating: {
    display: 'block',
    height: 26,
  },
  status: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    '& > *': {
      margin: 5
    }
  },
  desc: {
    height: 45,
    overflow: 'hidden'
  },
  chipDiscount: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
  chipSold: {
    background: dark[500],
    color: theme.palette.getContrastText(dark[500]),
  },
  contentProfile: {
    flex: '1 0 auto',
    padding: 25
    // textAlign: 'center',
    // marginTop: -70
  },
  mediaProfile: {
    height: 200,
    marginBottom: theme.spacing(9),
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1)
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    boxShadow: theme.shadows[7]
  },
  avatarBig: {
    width: 80,
    height: 80,
    // margin: '-56px auto 10px',
    background: theme.palette.secondary.dark,
    boxShadow: theme.shadows[7]
  },
  name: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  buttonProfile: {
    margin: 20
  },
  bottomLink: {
    width: '100%',
  },
  price: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(3)}px`
  },
  verified: {
    fontSize: 16,
    color: theme.palette.primary.main
  },
  cardList: {
    display: 'flex',
    justifyContent: 'space-between',
    '& $buttonAddList': {
      display: 'inline-block'
    },
    '& $floatingButtonWrap': {
      flex: 1,
    },
    '& $buttonAdd': {
      display: 'none'
    },
    '& $status': {
      right: 'auto',
      left: 0,
    },
    '& $mediaProduct': {
      width: 300,
      paddingTop: '21.25%'
    },
    '& $price': {
      flexDirection: 'column',
      justifyContent: 'center',
      '& button': {
        marginTop: 20
      }
    },
  },
  media: {
    height: 0,
    position: 'relative',
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.only('sm')]: {
      paddingTop: '26.25%',
    },
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 64,
    height: 64,
    transform: 'translate(-50%, -50%)',
    '& svg': {
      color: theme.palette.common.white,
      fontSize: 64
    }
  },
  newsList: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    }
  },
  newsListContent: {
    padding: theme.spacing(2),
    flex: 1,
    overflow: 'hidden'
  },
  mediaNews: {
    [theme.breakpoints.up('sm')]: {
      width: 150,
    },
    height: 150
  },
  extraRounded: {},
  roundedMedia: {
    width: '92%',
    height: 200,
    borderRadius: theme.spacing(1),
    margin: '4%',
    position: 'relative',
  },
  lightButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    overflow: 'hidden'
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing(2)}px`,
    minHeight: 200,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(6)}px`,
      paddingRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      display: 'flex',
    },
  },
  imageFull: {
    position: 'relative',
    width: '100%',
    '&:hover': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
    },
  },
  imageButton: {
    zIndex: 1,
    position: 'relative',
    top: 0,
    bottom: 0,
    color: theme.palette.common.white,
    whiteSpace: 'normal',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      '& h1': {
        fontSize: 32,
        lineHeight: '42px',
      },
      '& p': {
        fontSize: 16
      }
    },
    [theme.breakpoints.only('sm')]: {
      '& h1': {
        width: '60%'
      },
    }
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  fdHeader: {
    color: '#7367f0!important',
    marginBottom: '.2rem'
  },
  fdSubheader: {
    color: '#6e6b7b',
    marginBottom: '1rem'
  },
  bold: {
    fontWeight: 600
  },
  createButton: {
    marginTop: 10
  },

  // Table Styles
  root: {
    paddingRight: theme.spacing(1),
  },
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
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
  actionsToolbar: {
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
  },
  textField: {
    flexBasis: 200,
    width: 300,
    marginTop: 4,
  },
  table: {
    minWidth: 860,
  },
  tableSmall: {
    minWidth: 500,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  toolbar: {
    backgroundColor: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.6) : theme.palette.primary.light,
    minHeight: 48,
  },
  title: {
    flex: '0 0 auto',
    '& h6': {
      fontSize: 16,
      color: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.2) : darken(theme.palette.primary.dark, 0.2),
    }
  },
  button: {
    margin: `${theme.spacing(1)}px 0`,
  },
  buttonLink: {
    color: '#5A8DEE'
  },
  buttonRed: {
    margin: `${theme.spacing(1)}px 0`,
    backgroundColor: 'indianred',
    color: 'white',
    '&:hover': {
      color: 'gray'
    }
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    color: '#000000ab'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    color: '#000000ab'
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
      background: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.8) : lighten(theme.palette.primary.light, 0.5)
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
        padding: '4px 56px 4px 24px',
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

  // Dependents
  cardProduct: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fafafa'
  },
  cardList: {
    display: 'flex',
    justifyContent: 'space-between',
    '& $buttonAddList': {
      display: 'inline-block'
    },
    '& $floatingButtonWrap': {
      flex: 1,
    },
    '& $buttonAdd': {
      display: 'none'
    },
    '& $status': {
      right: 'auto',
      left: 0,
    },
    '& $mediaProduct': {
      width: '30%',
      paddingTop: '21.25%'
    },
    '& $price': {
      flexDirection: 'column',
      justifyContent: 'center',
      '& button': {
        marginTop: 20
      }
    },
  },
  floatingButtonWrap: {
    position: 'relative',
    paddingTop: 50
  },
  desc: {
    height: 26,
    overflow: 'hidden'
  },
  status: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    '& > *': {
      margin: 5
    }
  },
  mediaProduct: {
    height: 'auto',
    paddingTop: '60.25%', // 16:9
  },
  chipDiscount: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
  appointmentBanner: {
    backgroundImage: `url(${NewAppointmentBanner})`,
  },
  positionRelative: {
    position: 'relative'
  },
  positionAbsolute: {
    position: 'absolute'
  },
  top0: {
    top: 0
  },
  banner: {
    width: '100%',
    background: 'transparent',
    textAlign: 'center',
    height: '100%'
  },
  bannerForms: {
    padding: '0px 25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  shadow1: {
    boxShadow: '0px 1px 3px 0px rgb(142 142 142 / 20%), 0px 1px 1px 0px rgb(243 243 243 / 14%), 0px 2px 1px -1px rgb(204 204 204 / 12%)'
  }
});

export default styles;
