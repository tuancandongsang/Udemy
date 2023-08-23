import { notification } from "antd";

const getNotificationStyle = (type) => {
  return {
    success: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #b7eb8f",
      backgroundColor: "#f6ffed"
    },
    warning: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #ffe58f",
      backgroundColor: "#fffbe6"
    },
    error: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #ffa39e",
      backgroundColor: "#fff1f0"
    },
    info: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #91d5ff",
      backgroundColor: "#e6f7ff"
    }
  }[type];
};

export const openCustomNotificationWithIcon = (type) => {
  notification[type]({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    style: getNotificationStyle(type),
    duration: 0
  });
};

// type: success | info | warning | error

export const Notification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description
  });
};
