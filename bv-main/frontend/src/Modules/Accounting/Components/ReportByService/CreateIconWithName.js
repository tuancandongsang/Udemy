import React from "react"
import { SERVICE_TYPE } from "../../Shared";
import { ReactComponent as IconTest } from "../../../../Asset/Icon/test-exam-svgrepo-com.svg";
import { ReactComponent as IconOther } from "../../../../Asset/Icon/reception_hospital.svg";
import { ReactComponent as IconExam } from "../../../../Asset/Icon/doctor-icon.svg";
import { ReactComponent as IconXRay } from "../../../../Asset/Icon/x-ray-svgrepo-com.svg";
import { ReactComponent as IconUtrasound } from "../../../../Asset/Icon/ultrasound.svg";
import { ReactComponent as IconEnt } from "../../../../Asset/Icon/ent.svg";

const ICON = {
    [SERVICE_TYPE.EXAM] : IconExam,
    [SERVICE_TYPE.TEST]: IconTest,
    [SERVICE_TYPE.ENT] : IconEnt,
    [SERVICE_TYPE.ULTRASOUND] : IconUtrasound,
    [SERVICE_TYPE.XRAY] : IconXRay,
    [SERVICE_TYPE.OTHER] : IconOther
}

export const CreateIcon = (props) => {
    const IconComponent = ICON[props.type];
    return React.createElement(IconComponent);
}

