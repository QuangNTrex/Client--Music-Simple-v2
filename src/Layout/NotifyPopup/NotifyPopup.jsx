import { useDispatch, useSelector } from "react-redux";
import "./NotifyPopup.css";
import { NotifyActions } from "../../store/notify";
import { useRef } from "react";

const NotifyPopup = () => {
  const { show, text, type } = useSelector((state) => state.notify);
  const timeoutRef = useRef();
  const dispatch = useDispatch();
  if (show) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      dispatch(NotifyActions.hide());
    }, 3000);
  }

  return (
    <div className={`NotifyPopup ${!show ? "hide" : "show"} ${type}`}>
      <p className={`text ${!show && "hidden"}`}>{text}</p>
    </div>
  );
};

export default NotifyPopup;
