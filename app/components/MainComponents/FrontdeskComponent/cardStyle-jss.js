import pink from '@material-ui/core/colors/pink';
import lightGreen from '@material-ui/core/colors/lightGreen';
import dark from '@material-ui/core/colors/blueGrey';
import { fade } from '@material-ui/core/styles/colorManipulator';
import frontdesk1Banner from 'enl-images/new-icons/frontdesk-banner-white.png';

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
  textField: {
    flexBasis: 200,
    width: 300,
    marginTop: 4,
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
    padding: '5.5rem',
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
  frontdeskBanner: {
    backgroundImage: `url(${frontdesk1Banner})`,
    backgroundPosition: 'bottom'
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
  fdSearch: {
    width: '100%',
    borderRadius: 8,
    border: '1px solid rgba(0,0,0,0.32)',
    padding: 7,
    fontSize: 14
  },
  searchResults: {
    position: 'absolute',
    width: '100%',
    boxShadow: '0 3px 10px rgb(0 0 0 / 20%)',
    backgroundColor: '#fff',
    maxHeight: 110,
    overflowY: 'scroll',
    top: 44,
    borderRadius: 8,
    zIndex: 3,
    textAlign: 'left',
    '& p': {
      padding: 10,
      borderBottom: '1px solid #f5f5f5'
    }
  },
  listbox: {
    width: '100%',
    margin: 0,
    padding: 0,
    zIndex: 50,
    height: 100,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    boxShadow: '0 3px 10px rgb(0 0 0 / 20%)',
    border: '1px solid rgba(0,0,0,.25)',
    // marginTop: 8,
    borderRadius: 8,
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
    },
    '& li': {
      borderBottom: '1px solid #f5f5f5',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      textAlign: 'left'
    },
    '& li[data-focus="true"]': {
      backgroundColor: '#ff2100',
      color: 'white',
      cursor: 'pointer'
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
  },
});

export default styles;
