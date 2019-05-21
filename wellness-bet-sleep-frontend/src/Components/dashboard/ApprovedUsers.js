import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';





const styles = {
    card: {
        maxWidth: 100,
    },
    media: {
        height: 80,
    },
};






class ApprovedUsers extends React.Component {

   

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={require('../../assets/images/fitgirl.png')}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography component="p" style={{ color: '#098FCB' }}>
                            FullName Name Name
                        </Typography>
                    </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(ApprovedUsers);