"use client";

import React, { useState } from "react";
import {
  Container,
  InsertNameContainer,
  StatusContainer,
  FirstTheadTh,
  Status,
  FirstTbodyTd,
} from "./styles";
import { poppins } from "@/app/fonts";

interface Office {
  id: number;
  office: string;
  workHours: number;
  hourlyPrice: number;
}

export default function Pessoas() {
  const [officeDates, setOfficeDates] = useState<Office[]>([
    { id: 1, office: "Desenvolvedor", workHours: 40, hourlyPrice: 50 },
    { id: 2, office: "Designer", workHours: 30, hourlyPrice: 40 },
    { id: 3, office: "Gerente de Projeto", workHours: 20, hourlyPrice: 60 },
  ]);

  const [officeWithName, setIsOfficeWithName] = useState<{
    [office: string]: string | undefined;
  }>({});

  const [isInputFocused, setIsInputFocused] = useState<{
    [office: string]: boolean;
  }>({});

  const handleNameChange = (office: string, novonName: string) => {
    setIsOfficeWithName({
      ...officeWithName,
      [office]: novonName,
    });
  };

  const handleBlur = (office: string) => {
    setIsInputFocused({
      ...isInputFocused,
      [office]: false,
    });

    if (officeWithName[office] === "") {
      setIsOfficeWithName({
        ...officeWithName,
        [office]: undefined,
      });
    }
  };

  const handleFocus = (office: string) => {
    setIsInputFocused({
      ...isInputFocused,
      [office]: true,
    });
  };

  const calculateTotalValue = () => {
    return officeDates.reduce((total, Office) => {
      return total + Office.workHours * Office.hourlyPrice;
    }, 0);
  };

  return (
    <Container>
      <table className={poppins.className}>
        <thead>
          <tr>
            <FirstTheadTh>Cargo</FirstTheadTh>
            <th>Qtd. Horas</th>
            <th>Valor Hora</th>
          </tr>
        </thead>
        <tbody>
          {officeDates.map((data) => (
            <tr key={data.id}>
              <FirstTbodyTd>
                <span>{data.office}</span>
              </FirstTbodyTd>
              <td>{data.workHours}h</td>

              <StatusContainer>
                <td>R$ {data.hourlyPrice} </td>
                <Status
                  status={
                    isInputFocused[data.office]
                      ? "off"
                      : officeWithName[data.office]
                        ? "on"
                        : "off"
                  }
                ></Status>
              </StatusContainer>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>Valor Total</td>
            <td>R$ {calculateTotalValue()}</td>
          </tr>
        </tbody>
      </table>

      <InsertNameContainer>
        {officeDates.map((data) => (
          <div key={data.id}>
            <span>{data.office}</span>
            <input
              type="text"
              value={officeWithName[data.office] || ""}
              onChange={(e) => handleNameChange(data.office, e.target.value)}
              onFocus={() => handleFocus(data.office)}
              onBlur={() => handleBlur(data.office)}
              placeholder="nName"
            />
          </div>
        ))}
      </InsertNameContainer>
    </Container>
  );
}
