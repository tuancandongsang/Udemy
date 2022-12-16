import { useToast } from "vue-toastification";

const toast = useToast();

export function toastError(msg: string) {
  return toast.error(msg, {
    position: "top-right",
    closeOnClick: true,
    timeout: 873,
    pauseOnHover: true,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
  });
}

export function toastSuccess(msg: string) {
  return toast.success(msg, {
    position: "top-right",
    closeOnClick: true,
    timeout: 873,
    pauseOnHover: true,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
  });
}
