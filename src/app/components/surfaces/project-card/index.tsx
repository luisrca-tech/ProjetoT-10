"use client";

import {
  CardContentDescriptions,
  CardContentContainer,
  Container,
  ProjectContainer,
  ProgressBarContainer,
  BackgroundProgressBar,
  ProgressBar,
} from "./styles";
import GoogleImage from "../../../../../public/google img.svg";
import CardPhoto from "../../../../../public/bg-photo.svg";
import Mastercard from "../../../../../public/mastercard.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProjectCard() {
  const [progressWidth, setProgressWidth] = useState(0);
  const [passedMinutes, setPassedMinutes] = useState(0);

  const totalHours = 3600000;

  useEffect(() => {
    const calculateProgress = () => {
      setPassedMinutes((prevPassedMinutes) => prevPassedMinutes + 360000);
      const progress = (passedMinutes / totalHours) * 100;
      setProgressWidth(progress);
    };

    const intervalId = setInterval(calculateProgress, 3000);

    return () => clearInterval(intervalId);
  }, [passedMinutes, totalHours]);

  return (
    <Container>
      <ProjectContainer>
        <CardContentContainer>
          <Image src={GoogleImage} alt="" color="#F7F2FA" />
          <CardContentDescriptions>
            <strong>Projeto exemplo 1</strong>
            <p>
              <span>Duração</span>: 15/08/23 - 29/10/23
            </p>
          </CardContentDescriptions>
        </CardContentContainer>
        <ProgressBarContainer>
          <BackgroundProgressBar>
            <ProgressBar style={{ width: `${progressWidth}%` }} />
          </BackgroundProgressBar>
        </ProgressBarContainer>
      </ProjectContainer>

      <ProjectContainer>
        <CardContentContainer>
          <Image src={CardPhoto} alt="" />
          <CardContentDescriptions>
            <strong>Projeto exemplo 2</strong>
            <p>
              <span>Duração</span>: 15/08/23 - 29/10/23
            </p>
          </CardContentDescriptions>
        </CardContentContainer>
        <ProgressBarContainer>
          <BackgroundProgressBar>
            <ProgressBar style={{ width: `${progressWidth}%` }} />
          </BackgroundProgressBar>
        </ProgressBarContainer>
      </ProjectContainer>

      <ProjectContainer>
        <CardContentContainer>
          <Image src={Mastercard} alt="" width={50} height={50} />
          <CardContentDescriptions>
            <strong>Projeto exemplo 3</strong>
            <p>
              <span>Duração</span>: 15/08/23 - 29/10/23
            </p>
          </CardContentDescriptions>
        </CardContentContainer>
        <ProgressBarContainer>
          <BackgroundProgressBar>
            <ProgressBar style={{ width: `${progressWidth}%` }} />
          </BackgroundProgressBar>
        </ProgressBarContainer>
      </ProjectContainer>
    </Container>
  );
}
