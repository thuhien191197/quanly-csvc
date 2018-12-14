import React from 'react';
import ScreenDialogs from './RightPane/ScreenDialogs';
import ScrollPaper from './RightPane/ScrollPaper';
import {
    Card, ListItem, ListItemText, List, Avatar,
    Paper, Typography
} from '@material-ui/core';
import { Gavel, Help, LocationOn, Call, Email} from '@material-ui/icons'


export default ({styles}) =>
    <div>

            <Card style={styles.card}>

                <ScrollPaper/>


                <List component="nav" style={styles.rootRightList}>
                    <ListItem button>
                        <Avatar>
                            <Gavel />
                        </Avatar>
                        <ListItemText primary="Tổ Chức Nhân Sự" />
                    </ListItem>

                    <ScreenDialogs/>

                    <ListItem button >
                        <Avatar>
                            <Help />
                        </Avatar>
                        <ListItemText primary="Hổ Trơ" />
                    </ListItem>
                </List>
            </Card>
        <Paper style={styles.PaperRight} >
            <Typography variant="h6" gutterBottom>
                THÔNG TIN LIÊN HỆ
            </Typography>
            <Typography>
                Phòng Cơ sở vật chất, Trường Đại học Bách khoa, ĐHĐN
            </Typography>
            <Typography>
                <LocationOn/>
                54 Nguyễn Lương Bằng, Quận Liên Chiểu, Thành phố Đà Nẵng
            </Typography>
            <Typography>
                <Call/>
                +84.0236) 3740719
            </Typography>
            <Typography>
                <Email/>
                csvc.dhbk@dut.udn.vn
            </Typography>
        </Paper>
    </div>