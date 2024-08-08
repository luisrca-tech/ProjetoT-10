import { useEffect, useMemo, useState } from "react";
import { Container, ContentContainer } from "./styles";
import HeaderBoxProfileImage from "./HeaderBoxProfileImage";
import InputContent from "./InputContent";

import { useAtom } from "jotai";
import {
  type SelectableRangePropsType,
  rangesAtom,
} from "~/@atom/ProjectStates/rangesAtom";
import { roboto } from "~/app/fonts";

export function ProjectProfileHeader({}) {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [, setInputValue] = useState("");

  function getMinMaxDates(ranges: { [key: string]: SelectableRangePropsType }) {
    let minStartDate = undefined;
    let maxEndDate = undefined;

    for (let key in ranges) {
      const range = ranges[key];
      if (range?.startDate) {
        const startDate = range.startDate.getTime();
        if (minStartDate === undefined || startDate < minStartDate) {
          minStartDate = startDate;
        }
      }
      if (range?.endDate) {
        const endDate = range.endDate.getTime();
        if (maxEndDate === undefined || endDate > maxEndDate) {
          maxEndDate = endDate;
        }
      }
    }

    return { minStartDate, maxEndDate };
  }

  const { minStartDate, maxEndDate } = getMinMaxDates(ranges);

  const minStartDateObj = useMemo(
    () => (minStartDate !== undefined ? new Date(minStartDate) : undefined),
    [minStartDate]
  );
  const maxEndDateObj = useMemo(
    () => (maxEndDate !== undefined ? new Date(maxEndDate) : undefined),
    [maxEndDate]
  );

  useEffect(() => {
    setRanges((prevRanges) => ({
      ...prevRanges,
      "global-project-data": {
        ...prevRanges["global-project-data"],
        startDate: minStartDateObj,
        endDate: maxEndDateObj,
      },
    }));
  }, [minStartDateObj, maxEndDateObj, setRanges]);

  useEffect(() => {
    const storedValue = localStorage.getItem("ProjectProfileInputHeader");
    if (storedValue !== null) {
      setInputValue(storedValue);
    }
  }, []);

  return (
    <Container className={roboto.className}>
      <ContentContainer>
        <HeaderBoxProfileImage />
        <InputContent />
      </ContentContainer>
    </Container>
  );
}
