import React from 'react';
import 'rbx/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Content, Field, Label, Control, Input, Radio, Textarea, File, Select } from 'rbx';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export function DatePickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Pick Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export function TimePickers() {
  // The first commit of Material-UI
  const [selectedTimeFrom, setSelectedTimeFrom] = React.useState(new Date('2014-08-18T21:11:54'));
  const [selectedTimeTo, setSelectedTimeTo] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleTimeChangeFrom = date => {
    setSelectedTimeFrom(date);
  };
  const handleTimeChangeTo = date => {
    setSelectedTimeTo(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-from"
          label="From"
          value={selectedTimeFrom}
          onChange={handleTimeChangeFrom}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-to"
          label="To"
          value={selectedTimeTo}
          onChange={handleTimeChangeTo}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}


const EventTemplate = ({ hostID }) => {
  const [EventName, setEventName] = React.useState('');
  const [FoodType, setFoodType] = React.useState('');
  const [DietaryRestrictions, setDietaryRestrictions] = React.useState('');
  const [Organization, setOrganization] = React.useState('');
  const [Location, setLocation] = React.useState('');
  
  const [Description, setDescription] = React.useState('');
    return (
        <Card>
            <Card.Content>
                <Field>
                    <Label>Event Name</Label>
                    <Control>
                        <Input type="text" placeholder="Name of Event" value={EventName}
        onChange={e => setEventName(e.target.value)} />
                    </Control>
                </Field>
                <DatePickers/>
                <TimePickers/>
                <Field>
                    <Label>Food Type</Label>
                    <Control>
                        <Input type="text" placeholder="Food Type" value={FoodType}
        onChange={e => setFoodType(e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Label>Dietary Restrictions</Label>
                    <Control>
                        <Input type="text" placeholder="Dietary Restrictions" value={DietaryRestrictions}
        onChange={e => setDietaryRestrictions(e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Label>Organization</Label>
                    <Control>
                        <Input type="text" placeholder="Organization Name" value={Organization}
        onChange={e => setOrganization(e.target.value)} />
                    </Control>
                </Field>
                <Field>
                  <Label>Event Type</Label>
                  <Select.Container>
                    <Select>
                      <Select.Option>Social</Select.Option>
                      <Select.Option>Professional</Select.Option>
                    </Select>
                  </Select.Container>
                </Field>
                <Field>
                    <Label>Member Only?</Label>
                    <Control>
                        <Label>
                            <Radio name="exclusive" /> Yes
                        </Label>
                        <Label>
                            <Radio name="exclusive" /> No
                        </Label>
                    </Control>
                </Field>
                <Field>
                    <Label>Description</Label>
                    <Control>
                        <Textarea placeholder="Description" value={Description}
        onChange={e => setDescription(e.target.value)}/>
                    </Control>
                </Field>
                <File >
                    <File.Label>
                        <File.Input name="resume" />
                        <File.CTA>
                            <File.Icon>
                                <FontAwesomeIcon icon={faUpload} />
                            </File.Icon>
                            <File.Label as="span">Choose a File</File.Label>
                        </File.CTA>
                        <File.Name> placeholder </File.Name>
                    </File.Label>
                </File>
                <Field kind="group" align="left">
                    <Control>
                        <Button color="primary">Confirm Event</Button>
                    </Control>
                </Field>
            </Card.Content>
        </Card>
    )
}

export default EventTemplate;
