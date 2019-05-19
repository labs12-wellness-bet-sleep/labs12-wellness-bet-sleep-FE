import React from 'react';
import { withStyles, Typography, TextField, Button } from '@material-ui/core'


const styles = theme => ({
    container: {
        lineHeight: 4
    },
    welcome: {
        width: '200px',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: '24px',
        margin: '0 auto',
        marginTop: '-100px',
        marginBottom: '50px',
        fontWeight: 'bold',
        color: '#249BD1',
    },
    joinbycode: {
        display: 'flex',
        width: '650px',
        height: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        justifyContent: 'center',
        flexFlow: 'column'
    },
    jointext: {
        fontSize: '40px',
        fontWeight: 'bold',
        color: '#008BC9',
        lineHeight: 2
    },
    textField: {
        width: '330px',
    },
    textColor: {
        borderWidth: '1px',
        color: '#008BC9',
        borderColor: '#008BC9 !important'
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: '#008BC9 !important',
        color: '#008BC9',
    },
    input: {
        color: '#008BC9',
    }

})




class JoinWithCode extends React.Component {
    state = {
        joincode: '',
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div >
                <div className={classes.joinbycode}>
                    <Typography className={classes.jointext}>
                        Join By Code
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField

                            id="outlined-name"
                            label="Secret Group Code"
                            type="search"
                            name="joincode"
                            className={classes.textField}
                            value={this.state.joincode}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline,
                                    input: classes.input,
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                color: '#008BC9'
                                    } }}
                                    >
                        </TextField>
                        <div>
                            <Button variant="outlined" color="primary" style={{ fontSize: '12px' }}>
                                Join Group
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}



export default withStyles(styles)(JoinWithCode);