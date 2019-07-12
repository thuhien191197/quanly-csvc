import React from 'react';
import ScreenDialogs from './RightPane/ScreenDialogs';
import ScrollPaper from './RightPane/ScrollPaper';
import ScollMember from './RightPane/ScollMember';
import {
    Card, ListItem, ListItemText, List, Avatar,
    Paper, Typography
} from '@material-ui/core';
import { Gavel, Help, LocationOn, Call, Email} from '@material-ui/icons'
import { FormattedMessage } from "react-intl";

export default ({styles}) =>
    <div>
            <Card style={styles.card}>
                <ScrollPaper/>
                <List component="nav" style={styles.rootRightList}>
                    <ScollMember/>

                    <ScreenDialogs/>

                    <ListItem button >
                        <Avatar>
                            <Help />
                        </Avatar>
                        <ListItemText primary={<FormattedMessage  id="help.title" defaulMesage="Hỗ Trợ" />} />
                    </ListItem>
                </List>
            </Card>
       
    </div>