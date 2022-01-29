import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { NewFrontdeskComponent } from 'enl-components';


function NewFrontdesk(props) {
    const title = brand.name + ' - Frontdesk';
    const description = brand.desc;

    return (
        <div style={{ marginTop: 10 }}>
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
                justify="center"
                direction="row"
                spacing={3}
            >
                <Grid item md={10} xs={12}>
                    <Paper>
                        <NewFrontdeskComponent {...props} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default NewFrontdesk;
