import { toast } from "sonner";
import ToastAlert from "~/components/widgets/ToastAlert";

export function showToast(
  status: "error" | "success" | "warning",
  message: string,
  justifyMessage?: string
) {
  toast(
    <ToastAlert
      status={status}
      message={message}
      justifyMessage={justifyMessage}
    />,
    { duration: 4000, unstyled: true }
  );
}
