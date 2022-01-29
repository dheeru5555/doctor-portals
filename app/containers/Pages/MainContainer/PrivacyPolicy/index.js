import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const TopSection = styled('div')`
    height: 200px;
    width: 100%; 
    background-color: #ff4a2f;
    padding-top: 26px;
    padding-bottom: 26px;
`;

const MainSection = styled('div')`
    width: 75%;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    p {
        font-size: 26px;
    }
`;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    title: {
        color: 'white',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        fontSize: 22,
        marginBottom: theme.spacing(2),
        color: theme.palette.common.white,
        textDecoration: 'none',
        fontWeight: 600,
        '&$centerFlex': {
            justifyContent: 'center'
        },
        '&$outer': {
            color: theme.palette.common.white,
        },
        [theme.breakpoints.down('md')]: {
            margin: `${theme.spacing(2)}px 0`
        },
        '& img': {
            width: 30,
            marginRight: 10,
        },
        '&$invert': {
            color: theme.palette.text.primary,
        }
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        marginRight: theme.spacing(1),
        cursor: 'pointer',
        color: 'white',
        borderRadius: 0,
        backgroundColor: "#ffffff5c"
    }
});

function PrivacyPolicy(props) {
    const title = brand.name + ' - Privacy Policy';
    const description = brand.desc;
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <TopSection>
                <Grid container justify="center">
                    <Grid item md={11} style={{marginBottom: 30}}>
                        <div className={classes.spaceBetween}>
                            <div className={classes.brand}>
                                {/* <img src={logo} alt={brand.name} /> */}
                                {brand.name}
                            </div>
                            {/* <div>
                                <Button className={classes.button}>Login</Button>
                                <Button variant="contained" className={classes.button}>Sign Up</Button>
                            </div> */}
                        </div>
                    </Grid>
                    <Grid item md={10}>
                        <Typography variant="h3" className={classes.title}>Privacy Policy</Typography>
                    </Grid>
                </Grid>
            </TopSection>
            <MainSection>
                <Typography variant="subtitle1" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in tristique nisi. Duis dapibus arcu at massa accumsan eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sagittis ipsum sem, a semper mauris lacinia sit amet. Curabitur venenatis, dolor et lacinia imperdiet, nisi justo semper dui, vitae sollicitudin enim nisl eget sem. Mauris pharetra lacus lorem. Donec eleifend felis lectus, pulvinar ultricies turpis finibus malesuada. Vestibulum viverra massa in nisi congue ultrices.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Aliquam eget auctor orci. Nunc placerat felis eu dui faucibus efficitur. Aliquam mattis ultrices ipsum, elementum facilisis dui auctor nec. Suspendisse egestas leo vitae volutpat posuere. In a tempor urna. In bibendum elit nisl, nec aliquet erat tempus eget. Vestibulum eu eros a est imperdiet dignissim. Aliquam placerat vitae quam sit amet mollis. Pellentesque vitae neque rhoncus, congue nibh pretium, bibendum mi. Sed vehicula ipsum eu vulputate facilisis. Donec auctor nulla id mauris venenatis feugiat eu ac enim.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Nam facilisis, sapien vel fringilla tempus, libero dolor mattis nulla, faucibus hendrerit augue leo sed magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent ut ex lobortis est rutrum sagittis. Integer consequat sem a tellus consequat viverra. Suspendisse quis nisl vel urna dignissim tincidunt. Vestibulum est lorem, feugiat ut sem bibendum, lobortis dapibus neque. Aenean porta est arcu, ut pellentesque nisl blandit quis. Aliquam eget ornare velit. Donec commodo vulputate sollicitudin. Nunc dictum et felis quis pretium. Aenean erat ipsum, eleifend sed elit ac, aliquet ornare lectus. Mauris felis turpis, pharetra sed elit vel, egestas dignissim libero. Cras maximus eros tellus, et gravida mi laoreet eu.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Aenean in urna varius, eleifend lacus euismod, volutpat ligula. Nullam auctor accumsan sem, pellentesque dictum dui eleifend quis. Maecenas gravida, diam a pulvinar pulvinar, velit risus finibus urna, vel egestas massa felis eu elit. Donec vel sollicitudin erat. Fusce rutrum consectetur porta. Nunc consectetur, nunc sed laoreet pellentesque, est erat imperdiet tortor, vitae eleifend enim velit egestas felis. Vivamus egestas mi risus, vel pellentesque neque porta quis. Morbi volutpat sapien sed felis pharetra, ut egestas ipsum maximus. Fusce vel efficitur leo, interdum lacinia orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu vehicula, dictum turpis sed, interdum arcu. Proin ut accumsan mauris. Vestibulum ac augue aliquet, commodo felis feugiat, lobortis sem. Nulla ut justo turpis.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Vestibulum dictum nunc eget urna varius hendrerit. In auctor elit quis ante ullamcorper cursus. Nullam nec felis in eros ultricies lacinia vitae sed nunc. Aliquam erat volutpat. Vestibulum eget nisi sapien. Nulla vitae metus eu libero rutrum aliquam et laoreet nulla. Mauris quis commodo mauris, vitae bibendum tellus. Quisque in lacus euismod, dapibus nunc tincidunt, aliquam magna. Sed eu quam finibus, laoreet dolor in, scelerisque felis. Vestibulum interdum ante in est porttitor, nec pellentesque leo facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam eros tellus, lacinia varius purus eget, eleifend eleifend neque. Aliquam lectus augue, ultrices commodo molestie et, suscipit ac ex. Proin sit amet nisl id nisi dapibus mollis vitae vitae mauris. Vivamus lacinia finibus risus, et interdum libero interdum ac.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in tristique nisi. Duis dapibus arcu at massa accumsan eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sagittis ipsum sem, a semper mauris lacinia sit amet. Curabitur venenatis, dolor et lacinia imperdiet, nisi justo semper dui, vitae sollicitudin enim nisl eget sem. Mauris pharetra lacus lorem. Donec eleifend felis lectus, pulvinar ultricies turpis finibus malesuada. Vestibulum viverra massa in nisi congue ultrices.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Aliquam eget auctor orci. Nunc placerat felis eu dui faucibus efficitur. Aliquam mattis ultrices ipsum, elementum facilisis dui auctor nec. Suspendisse egestas leo vitae volutpat posuere. In a tempor urna. In bibendum elit nisl, nec aliquet erat tempus eget. Vestibulum eu eros a est imperdiet dignissim. Aliquam placerat vitae quam sit amet mollis. Pellentesque vitae neque rhoncus, congue nibh pretium, bibendum mi. Sed vehicula ipsum eu vulputate facilisis. Donec auctor nulla id mauris venenatis feugiat eu ac enim.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Nam facilisis, sapien vel fringilla tempus, libero dolor mattis nulla, faucibus hendrerit augue leo sed magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent ut ex lobortis est rutrum sagittis. Integer consequat sem a tellus consequat viverra. Suspendisse quis nisl vel urna dignissim tincidunt. Vestibulum est lorem, feugiat ut sem bibendum, lobortis dapibus neque. Aenean porta est arcu, ut pellentesque nisl blandit quis. Aliquam eget ornare velit. Donec commodo vulputate sollicitudin. Nunc dictum et felis quis pretium. Aenean erat ipsum, eleifend sed elit ac, aliquet ornare lectus. Mauris felis turpis, pharetra sed elit vel, egestas dignissim libero. Cras maximus eros tellus, et gravida mi laoreet eu.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Aenean in urna varius, eleifend lacus euismod, volutpat ligula. Nullam auctor accumsan sem, pellentesque dictum dui eleifend quis. Maecenas gravida, diam a pulvinar pulvinar, velit risus finibus urna, vel egestas massa felis eu elit. Donec vel sollicitudin erat. Fusce rutrum consectetur porta. Nunc consectetur, nunc sed laoreet pellentesque, est erat imperdiet tortor, vitae eleifend enim velit egestas felis. Vivamus egestas mi risus, vel pellentesque neque porta quis. Morbi volutpat sapien sed felis pharetra, ut egestas ipsum maximus. Fusce vel efficitur leo, interdum lacinia orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu vehicula, dictum turpis sed, interdum arcu. Proin ut accumsan mauris. Vestibulum ac augue aliquet, commodo felis feugiat, lobortis sem. Nulla ut justo turpis.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Vestibulum dictum nunc eget urna varius hendrerit. In auctor elit quis ante ullamcorper cursus. Nullam nec felis in eros ultricies lacinia vitae sed nunc. Aliquam erat volutpat. Vestibulum eget nisi sapien. Nulla vitae metus eu libero rutrum aliquam et laoreet nulla. Mauris quis commodo mauris, vitae bibendum tellus. Quisque in lacus euismod, dapibus nunc tincidunt, aliquam magna. Sed eu quam finibus, laoreet dolor in, scelerisque felis. Vestibulum interdum ante in est porttitor, nec pellentesque leo facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam eros tellus, lacinia varius purus eget, eleifend eleifend neque. Aliquam lectus augue, ultrices commodo molestie et, suscipit ac ex. Proin sit amet nisl id nisi dapibus mollis vitae vitae mauris. Vivamus lacinia finibus risus, et interdum libero interdum ac.
                </Typography>
            </MainSection>
        </div>
    );
}

PrivacyPolicy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivacyPolicy);
