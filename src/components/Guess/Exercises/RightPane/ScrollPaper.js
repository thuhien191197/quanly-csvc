import React from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions,
    CardActionArea, CardMedia, CardContent, Typography
} from "@material-ui/core";


class ScrollPaper extends React.Component {
    state = {
        open: false,
        scroll: 'paper',
    };

    handleClickOpen = scroll => () => {
        this.setState({ open: true, scroll });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <CardActionArea onClick={this.handleClickOpen('paper')}>
                    <CardMedia
                        style={{height: 160,}}
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Khuon_vien_khu_f.jpg/500px-Khuon_vien_khu_f.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Giới Thiệu
                        </Typography>
                        <Typography component="p">
                            Đại Học Bách Khoa Đà Nẵng
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title"
                    maxWidth = 'lg'
                >
                    <DialogTitle>
                        <Typography component="h2" variant="display2" gutterBottom>
                            Giới Thiệu
                        </Typography>

                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography gutterBottom variant="h6" component="h2">
                                Chức năng, nhiệm vụ phòng Cơ sở vật chất
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                I. Chức năng
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Phòng Cơ sở vật chất là đơn vị trực thuộc Trường Đại học Bách khoa – Đại học Đà Nẵng, có các chức năng tham mưu và giúp Hiệu trưởng trong các công việc sau:
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                1. Xây dựng và quản lý các dự án, các công trình xây dựng; quản lý các cơ sở hạ tầng xây dựng, đất đai của Trường; sửa chữa và phát triển cơ sở vật chất của Trường.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                2. Quản trị toàn bộ hệ thống trang thiết bị, máy móc, vật tư, vật tư tiêu hao, hóa chất,… phục vụ công tác đào tạo, nghiên cứu khoa học và chuyển giao công nghệ của Trường.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                3. Quản trị toàn bộ hệ thống điện, hệ thống mạng, internet, điện thoại, hệ thống cấp thoát nước trong Trường.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                4. Tổng hợp, thống kê, báo cáo và tư vấn về tình hình trang thiết bị, máy móc, vật tư, điện, nước, điện thoại, internet trong Trường.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                5. Triển khai công tác an toàn lao động; PCCC; phòng chống lụt, bão.
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                II. Nhiệm vụ
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                1. Thực hiện chức năng xây dựng và quản lý các dự án, các công trình xây dựng; quản lý các cơ sở hạ tầng xây dựng, đất đai của Trường; sửa chữa và phát triển cơ sở vật chất của Trường.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                2. Thực hiện các thủ tục duyệt xét dự án, tham gia quản lý và thực hiện dự án.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                3. Chuẩn bị hồ sơ để trình cấp có thẩm quyền quyết định và phê duyệt dự án và thực hiện dự án theo kết quả được phê duyệt.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                4. Triển khai thực hiện sửa chữa, nâng cấp các công trình xây dựng. Theo dõi, kiểm tra, nghiệm thu, bàn giao công trình, đưa vào khai thác sử dụng theo quy định hiện hành và hợp đồng đã ký kết.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                5. Quản lý hạ tầng cơ sở của Trường bao gồm: đất đai, nhà cửa, hàng rào, lớp học, phòng làm việc, hội trường, phòng thí nghiệm, xưởng, vườn hoa, cây cảnh, hệ thống giao thông nội bộ, hệ thống cống rãnh, các quầy dịch vụ kinh doanh,…thuộc phạm vi diện tích nhà trường, ngăn ngừa những hành vi xâm phạm đất đai của trường, bảo vệ sự toàn vẹn địa giới thuộc trường quản lý.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                6. Lập kế hoạch, giám sát, sửa chữa, bảo dưỡng nhằm duy trì chức năng, chống xuống cấp của cơ sở hạ tầng được quản lý.
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                7. Quy hoạch và thực hiện công tác trồng và cắt tỉa cây xanh, vườn hoa, cây cảnh, các thảm cỏ đảm bảo cảnh quan môi trường xanh, sạch, đẹp trong toàn trường;
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                8. Quản lý toàn bộ hệ thống nhà: nhà làm việc, nhà xưởng, phòng thí nghiệm, các khu giảng đường, hội trường, phòng khách, nhà khách,... trong khu đất  thuộc trường quản lý.
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ScrollPaper;