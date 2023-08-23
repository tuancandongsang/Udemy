import { Col, Button } from "reactstrap";

export const ExportFile = (props) => {
    const handleExportExcel = () => {
        window.location.assign(props.url);
    }

    return (
        <Col sm={1} className="end">
            <Button color="primary"
                onClick={() => { handleExportExcel() }}>
                <span className="material-icons">file_download</span> Tải Excel
            </Button>
        </Col>
    )
}