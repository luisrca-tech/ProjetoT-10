import { poppins } from "~/app/fonts";
import { Container } from "./styles";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { useAtom } from "jotai";

type CalendarDateValuesProps = {
  row?: string;
  taskCustomFields?: {
    taskId: string;
    chargeName: string;
    fieldName: string;
    hours: number | string[];
    valueByHour: number | string[];
    taskStartDate: Date;
    taskDueDate: Date;
  };
};
export function RowCalendarValues({
  row,
  taskCustomFields,
}: CalendarDateValuesProps) {
  const [ranges] = useAtom(rangesAtom);
  const startDateRangeInCurrentRow =
    !!row && formatDate(ranges[row]?.startDate);
  const endDateRangeInCurrentRow = !!row && formatDate(ranges[row]?.endDate);

  const taskStartDate = taskCustomFields?.taskStartDate;
  const taskEndDate = taskCustomFields?.taskDueDate;
  const startDateInCurrentTask =
    !!taskCustomFields && formatDate(taskStartDate);
  const endDateInCurrentTask = !!taskCustomFields && formatDate(taskEndDate);

  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }

  return (
    <Container className={poppins.className}>
      <p>
        {taskCustomFields ? startDateInCurrentTask : startDateRangeInCurrentRow}
      </p>
      <span>-</span>
      <p>
        {taskCustomFields ? endDateInCurrentTask : endDateRangeInCurrentRow}
      </p>
    </Container>
  );
}
