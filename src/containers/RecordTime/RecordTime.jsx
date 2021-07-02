import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ScreenWraper from '../../components/ScreenWraper/ScreenWraper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableHead } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField, Button } from '@material-ui/core';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import getProjects from '../../store/actions/recordTime.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axios';
import RecordTimeDataRow from '../../components/RecordTimeDataRow/RecordTimeDataRow';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    selectEmpty: {
        margin: theme.spacing(2),
    },
    loader: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        }
    }
}));

const RecordTime = (props) => {
    const user = props.user;

    const classes = useStyles();

    const [project, setProject] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [startDate, setStartDate] = useState(moment().subtract(3,'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().add(4,'day').format('YYYY-MM-DD'));
    const [showSearch, setShowSearch] = useState(false);
    const [showLoading, setLoading] = useState(false);
    const [dateTH, setDateTH] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        props.getProjects();
    }, []);

    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };
   
    const handleDateChange = (event) => {
        const userSelectedDate = event.target.value;
        setSelectedDate(event.target.value);
        setStartDate(moment(userSelectedDate).subtract(3,'day').format('YYYY-MM-DD'));
        setEndDate(moment(userSelectedDate).add(4,'day').format('YYYY-MM-DD'));
    };
    const handleSearch = () => {

        if(project === ''){
            toast.error('Please select project');
            return;
        }
        setShowSearch(true);
        setLoading(true);
        const searchDate = [];
        for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
            searchDate.push(m.format('YYYY-MMMM-DD'))
        }
        setDateTH(searchDate);
        axiosInstance.get('timesheets/'+project).then((res)=>{
            const data = res.data.data;
            setTableData(data);
            setLoading(false);
        }).catch((err)=>{
            console.error(err);
            toast.error('Unable to get data from DB');
            setShowSearch(false);
            setLoading(false);
        })

    }
    return (
        <ScreenWraper title="Record Time">
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Employee Name:</b> {user.name}</TableCell>
                                    <TableCell ><b>ID#:</b> {user.epID}</TableCell>
                                    <TableCell ><b>Work Type:</b> {user.workType}</TableCell>
                                    <TableCell ><b>Employment Type:</b> {user.epType}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {props.isRequest || props.projects.length === 0 ? 
                <div className={classes.root}>
                    <CircularProgress />
                </div>
                :<Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Date"
                                required
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Project</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={project}
                                onChange={handleProjectChange}
                            >
                                <MenuItem value='' disabled>Select Project</MenuItem>
                                {props.projects.map((row,i)=>{
                                    return (
                                    <MenuItem value={row.id} key={i}>{row.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Button className={classes.selectEmpty} variant="contained" color="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Paper>
                </Grid>}
                {showSearch? 
                <Grid item xs={12} md={12} lg={12}>
                {showLoading? 
                    <div className={classes.root}>
                    <CircularProgress />
                  </div>
                :
                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    TASKS ASSIGNED
                                </TableCell>
                                <TableCell>
                                    Total Time Spent
                                </TableCell>
                                {dateTH.map((row,i) => {
                                   return( <TableCell key={i}>
                                    {row}
                                    </TableCell>)
                                })}
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData?.map((row,i)=>{
                                return (
                                    <RecordTimeDataRow i={i} row={row}/>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper> }
            </Grid>
                : ''}
            </Grid>
            <ToastContainer />
        </ScreenWraper>
    );

}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        projects: state.recordTime.projects,
        isRequest: state.recordTime.isRequest
    }
}
const mapDispatchToProps = dispatch => {
    return {
      getProjects: () => dispatch(getProjects())
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(RecordTime);