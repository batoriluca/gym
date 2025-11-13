import { toast } from "react-toastify";

export function alertResponseMsgError(msg) {
  try {
    if (Array.isArray(msg)) {
      msg.forEach((item) => toast.error(item || "Something went wrong...!"));
    } else {
      toast.error(msg || "Something went wrong...!");
    }
  } catch (error) {
    toast.error(msg || "Something went wrong...!");
  }
}

export function alertResponseMsgSuccess(msg) {
  try {
    if (Array.isArray(msg)) {
      msg.forEach((item) => toast.success(item || "Something went wrong...!"));
    } else {
      toast.success(msg || "Something went wrong...!");
    }
  } catch (error) {
    toast.success(msg || "Something went wrong...!");
  }
}
