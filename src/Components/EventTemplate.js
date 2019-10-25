import React from 'react';
import 'rbx/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Content, Field, Label, Control, Input, Radio, Textarea, File } from 'rbx';

const EventTemplate = ({ hostID }) => {
    return (
        <Card>
            <Card.Content>
                <Field>
                    <Label>Event Name</Label>
                    <Control>
                        <Input type="text" placeholder="Name of Event" />
                    </Control>
                </Field>
                <Field>
                    <Label>Food Type</Label>
                    <Control>
                        <Input type="text" placeholder="Food Type" />
                    </Control>
                </Field>
                <Field>
                    <Label>Dietary Restrictions</Label>
                    <Control>
                        <Input type="text" placeholder="Dietary Restrictions" />
                    </Control>
                </Field>
                <Field>
                    <Label>Organization</Label>
                    <Control>
                        <Input type="text" placeholder="Organization Name" />
                    </Control>
                </Field>
                <Field>
                    <Label>Location</Label>
                    <Control>
                        <Input type="text" placeholder="Location" />
                    </Control>
                </Field>
                <Field>
                    <Label>Dietary Restrictions</Label>
                    <Control>
                        <Input type="text" placeholder="Dietary Restrictions" />
                    </Control>
                </Field>
                <Field >
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
                        <Textarea placeholder="Description" />
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
