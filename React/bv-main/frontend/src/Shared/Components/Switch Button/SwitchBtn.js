import "./switchbtn.scss";

export const SwitchButton = (props) => {
    const handleChangeToggle = (e) => {
        const event = {
            status: e.target.checked,
            value: e.target.value
        }
        props.onHandleCheckBox(event)
    }

    return (
        <>
            {props.isOn ?
                <input
                    defaultChecked={props.isOn}
                    className="cm-toggle"
                    type="checkbox"
                    value={props.value}
                    onClick={(e) => handleChangeToggle(e)}
                    key={props.key}
                />
                :
                <input
                    className="cm-toggle"
                    type="checkbox"
                    value={props.value}
                    onClick={(e) => handleChangeToggle(e)}
                    key={props.key}
                />
            }
        </>
    );
}
