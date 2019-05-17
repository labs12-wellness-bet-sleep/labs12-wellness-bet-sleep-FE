import React from 'react';
import { withStyles, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';

import uuid from 'uuid';




const styles = theme => ({
    newgroup: {
        display: 'flex',
        width: '500px',
        height: '500px',
        margin: '0px auto',
        marginTop: '200px',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#008BC9',
        fontSize: '40px',
        letterSpacing: '4px'
    },
    form: {
        width: '110%',
        height: '850px',
        margin: '0 auto',
        marginTop: '-240px',
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




class CreateForm extends React.Component {
    state = {
        userId: null,
        groupName: '',
        joinCode: '',
        startDate: null,
        endDate: null,
        buyInAmt: null,
        groupMessage: null,
        potTotal: null,
        groupPhoto: null
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onChange = event => {
        
        const parsedInt = parseInt(event.target.value)
        if (parsedInt) {
            this.setState({
                [event.target.name]: parsedInt
            })
        }
        return null;
    }

    createGroup = (e) => {
        e.preventDefault();
        console.log("id from createform",this.props.userId.id)
        
        const addGroup = {
            id: new Date().getUTCMilliseconds(),
            userId: '5',
            groupName: this.state.groupName,
            buyInAmt: this.state.buyInAmt,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            groupMessage: this.state.groupMessage
        }
        console.log('addgroup', addGroup)
        axios.post(`http://localhost:8080/api/groups/create`, addGroup)
             .then(res => {
                 console.log("res", res)
             })
             .catch(err => {
                 console.log("err", err)
             })
    }


    render() {
        const { classes } = this.props;
        return (
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                <div style={{ display: 'flex', width: '38%', height: '500px', margin: '0 auto' }}>
                    <Typography className={classes.newgroup} variant="display1">
                        New Group
                    </Typography>
                </div>
                <div stlye={{ display: 'flex' }}>
                    <form className={classes.form} noValidate autoComplete="off">
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <TextField
                                    id="outlined-name"
                                    label="Group Name"
                                    type="search"
                                    name="groupName"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    value={this.state.groupName}
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
                                        }
                                    }}
                                >
                                </TextField>
                                <TextField
                                    id="outlined-name"
                                    label="Join Code"
                                    type="search"
                                    name="joinCode"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    value={this.state.joinCode}
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
                                        }
                                    }}
                                >
                                </TextField>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <TextField
                                    id="outlined-name"
                                    name="startDate"
                                    label="Start Date"
                                    type="date"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    value={this.state.startDate}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        classes: {
                                            notchedOutline: classes.notchedOutline,
                                            input: classes.input,
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            color: '#008BC9',

                                        }
                                    }}
                                >
                                </TextField>
                                <TextField
                                    id="outlined-name"
                                    name="endDate"
                                    label="End Date"
                                    type="date"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    value={this.state.endDate}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        classes: {
                                            notchedOutline: classes.notchedOutline,
                                            input: classes.input,
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            color: '#008BC9',

                                        }
                                    }}
                                >
                                </TextField>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <TextField
                                    id="outlined-name"
                                    label="Buy In Amount $"
                                    name="buyInAmt"
                                    type="number"
                                    className={classes.textField}
                                    onChange={this.onChange}
                                    value={this.state.buyInAmt}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        classes: {
                                            notchedOutline: classes.notchedOutline,
                                            input: classes.input,
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            color: '#008BC9'
                                        }
                                    }}
                                >
                                </TextField>
                                <TextField
                                    id="upload-button"
                                    accept="image/*"
                                    label="Upload Image"
                                    name="photoFile"
                                    type="file"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    value={this.state.photoFile}

                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        classes: {
                                            notchedOutline: classes.notchedOutline,
                                            input: classes.input,
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            color: '#008BC9'
                                        }
                                    }}
                                >
                                </TextField>
                            </div>
                            <TextField
                                id="outlined-name"
                                label="Message to Group"
                                type="search"
                                name="groupMessage"
                                style={{ width: '684px' }}
                                multiline={true}
                                rows={4}
                                rowsMax={4}
                                className={classes.textField}
                                onChange={this.handleChange}
                                value={this.state.groupMessage}
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
                                    }
                                }}
                            >
                            </TextField>
                            <div>
                                <Button onClick={this.createGroup} variant="outlined" color="primary" style={{ fontSize: '12px', marginTop: '25px' }}>
                                    Create
                                    </Button>
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}



const mapStateToProps = state => {
    console.log(state,"createform state")
    return {
        userId: state.auth.user
    }
}
    




export default  connect(mapStateToProps, {})(withStyles(styles)(CreateForm));