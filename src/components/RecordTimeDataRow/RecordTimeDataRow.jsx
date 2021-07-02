import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TextField, Button } from '@material-ui/core';

const RecordTimeDataRow = (props) => {

    const row = props.row;
    const [time1, setTime1] = useState(row.time1);
    const [time2, setTime2] = useState(row.time2);
    const [time3, setTime3] = useState(row.time3);
    const [time4, setTime4] = useState(row.time4);
    const [time5, setTime5] = useState(row.time5);
    const [time6, setTime6] = useState(row.time6);
    const [time7, setTime7] = useState(row.time7);
    const totalHr = () => time1 + time2 + time3 + time4 + time5 + time6 + time7;
    const [editMode, setEditMode] = useState(false);
    const [rowSum, setRowSum] = useState(totalHr);

    const handleEditBtn = () => {
        setRowSum(totalHr);
        setEditMode(!editMode);
    }


    const handleTimeEdit = (e, field) => {
        let hours = e.target.value;
        if (hours === '') {
            hours = 0;
        } else {
            hours = parseInt(hours);
        }
        switch (field) {
            case 'time1':
                setTime1(hours);
                break;
            case 'time2':
                setTime2(hours);
                break;
            case 'time3':
                setTime3(hours);
                break;
            case 'time4':
                setTime4(hours);
                break;
            case 'time5':
                setTime5(hours);
                break;
            case 'time6':
                setTime6(hours);
                break;
            case 'time7':
                setTime7(hours);
                break;

            default:
                break;
        }
    }

    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={props.i}>
            <TableCell>{row.task}</TableCell>
            <TableCell>{rowSum}</TableCell>
            <TableCell >
                <TextField
                    type="number"
                    value={time1}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => { handleTimeEdit(e, 'time1') }}
                />
            </TableCell>
            <TableCell >
                <TextField
                    type="number"
                    value={time2}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => { handleTimeEdit(e, 'time2') }}
                />
            </TableCell>
            <TableCell >
                <TextField
                    type="number"
                    value={time3}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => { handleTimeEdit(e, 'time3') }}
                />
            </TableCell>
            <TableCell >
                <TextField
                    type="number"
                    value={time4}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => { handleTimeEdit(e, 'time4') }}
                />
            </TableCell>
            <TableCell >
                <TextField
                    type="number"
                    value={time5}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => { handleTimeEdit(e, 'time5') }}
                />
            </TableCell>
            <TableCell >
                <TextField
                    type="number"
                    value={time6}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => { handleTimeEdit(e, 'time6') }}
                />
            </TableCell>
            <TableCell >
                <TextField
                    type="number"
                    value={time7}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => { handleTimeEdit(e, 'time7') }}
                />
            </TableCell>
            <TableCell >
                <Button size="small" variant="contained" color={editMode ? 'secondary' : 'primary'} onClick={handleEditBtn}>
                    {editMode ? 'X' : 'Edit'}
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default RecordTimeDataRow