import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';





const styles = {
    card: {
        maxWidth: 100,
    },
    media: {
        height: 80,
    },
};






class AwaitingList extends React.Component {

    state = {
        open: false,
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };



    render() {
        const { classes, fullScreen } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        onClick={this.handleClickOpen}
                        className={classes.media}
                        image={require('../../assets/images/fitgirl.png')}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography component="p" style={{ color: '#098FCB' }}>
                            FullName Name Name
                        </Typography>
                    </CardContent>
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{"Name"}</DialogTitle>
                        <DialogContent style={{width: '500px', height:'500px'}}>
                            <DialogContentText>
                                Proof of Payment
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Decline
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Approve
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardActionArea>
            </Card>
        )
    }
}

export default withStyles(styles)(AwaitingList);