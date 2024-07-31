import { useEffect, useMemo, useState } from "react";
import {
  ButtonDataMenu,
  CalendarDateValues,
  Container,
  ContentContainer,
  DataContainer,
  HeaderBoxProfileImage,
  InputContent,
  EditProjectContainer,
} from "./styles";
import HeaderRowAndScrollDownContainer from "~/components/surfaces/ProjectProfileHeader/HeaderRowAndScrollDownContainer";
import { poppins, roboto } from "~/app/fonts";
import Image from "next/image";
import CalendarIcon from "../../../../../public/calendaricon.svg";
import { useAtom } from "jotai";
import {
  type SelectableRangeProps,
  rangesAtom,
} from "~/@atom/ProjectStates/rangesAtom";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";

interface ProjectProfileHeaderProps {
  inputDataMenuClick: (row: string) => void;
}

export function ProjectProfileHeader({
  inputDataMenuClick,
}: ProjectProfileHeaderProps) {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [checked] = useAtom(checkedAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const words =
    projectSelectedValue?.selectedValue[`projectRow-text`]?.split(" ");

  const globalProjectDate = ranges["global-project-data"];
  const globalProjectStartDate = ranges["global-project-data"]?.startDate;
  const globalProjectEndDate = ranges["global-project-data"]?.endDate;
  const initials = words?.map((word) => word.charAt(0));

  const initialsString = initials?.join("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }

  function getMinMaxDates(ranges: { [key: string]: SelectableRangeProps }) {
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
        <HeaderBoxProfileImage>
          {selectedFile ? (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Imagem selecionada"
            />
          ) : (
            <span>{initialsString?.toUpperCase()}</span>
          )}
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </HeaderBoxProfileImage>
        <InputContent checked={checked}>
          {!checked ? (
            <EditProjectContainer>
              <HeaderRowAndScrollDownContainer />
            </EditProjectContainer>
          ) : (
            <DataContainer>
              <strong>Duração:</strong>
              {!globalProjectDate ? (
                <ButtonDataMenu
                  onClick={() => inputDataMenuClick("global-project-data")}
                >
                  <span>Datas</span>
                  <Image
                    src={CalendarIcon}
                    alt="Icone de calendário"
                    width={24}
                    height={24}
                  />
                </ButtonDataMenu>
              ) : (
                <CalendarDateValues>
                  <p className={poppins.className}>
                    {formatDate(globalProjectStartDate)}
                  </p>
                  <span>-</span>
                  <p className={poppins.className}>
                    {formatDate(globalProjectEndDate)}
                  </p>
                </CalendarDateValues>
              )}
            </DataContainer>
          )}
        </InputContent>
      </ContentContainer>
    </Container>
  );
}
