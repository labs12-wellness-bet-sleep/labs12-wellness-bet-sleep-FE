import React from 'react';
import { withStyles, Typography } from '@material-ui/core';

import AwaitingList from './AwaitingList';
import ApprovedUsers from './ApprovedUsers';

const dummyData = [{name: "Barrett", approved:false}, {name: "Odonnell", approved: false}, "Domenic", "Webb", "Jake", "Norris" ]
const approved = ["Barrett", "Odonnell", "Domenic", "Webb", "Jake", "Norris" ]

const styles = theme => ({

    root: {
        display: 'flex',
        width: '100%',
        height: '500px'
    },

    approvalTypo : {

        width: '100%',
        marginLeft: '20px',
        marginTop: '400px',
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#008BC9',
        textAlign: 'initial'
        
    }

})





class GroupUsers extends React.Component {




    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div>
                <Typography display="4" className={classes.approvalTypo} >
                    Waiting for Approval
                </Typography>
                <div style={{display: 'flex'}}>
                    {dummyData.map(data => {
                        return (
                            <div key={data} style={{margin: '15px'}}>
                                <AwaitingList data={data} />
                            </div>
                        )
                    })}
                </div>
                </div>
                <div className="Approved" style={{position: 'absolute', marginTop: '250px', height:'20px'}}>
                <Typography display="4" className={classes.approvalTypo} >
                    Approved
                </Typography>
                <div style={{display: 'flex'}}>
                {approved.map(data => {
                        return (
                            <div key={data} style={{margin: '15px'}}>
                                <ApprovedUsers data={data} />
                            </div>
                        )
                    })}
                </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(GroupUsers)