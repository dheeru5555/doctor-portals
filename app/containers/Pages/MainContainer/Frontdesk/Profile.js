import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { ManageFrontdeskComponent } from 'enl-components';


function FrontdeskProfile(props) {
    const title = brand.name + ' - Social Media';
    const description = brand.desc;

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <Grid
                container
                alignItems="flex-start"
                justify="flex-start"
                direction="row"
                spacing={3}
            >
                <Grid item md={12} xs={12}>
                    <ManageFrontdeskComponent {...props} />
                </Grid>
            </Grid>
        </div>
    );
}

export default FrontdeskProfile;
