import { notification } from "antd";

export const Notification = (type : object, message : string, description : string) => {
  notification[type]({
    message: message,
    description: description
  });
};
