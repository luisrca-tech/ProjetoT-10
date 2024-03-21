import {
  CardContentDescriptions,
  CardContentContainer,
  Container,
  ProjectContainer,
  ProgressBarContainer,
  BackgroundProgressBar,
  ProgressBar,
} from "./styles";

import GoogleImage from "../../../../public/google img.svg";
import CardPhoto from "../../../../public/bg-photo.svg";
import Mastercard from "../../../../public/mastercard.svg";
import Image from "next/image";

export function ProjectCard() {
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
            <ProgressBar />
          </BackgroundProgressBar>
        </ProgressBarContainer>
      </ProjectContainer>

      <ProjectContainer>
        <CardContentContainer>
          <Image src={CardPhoto} alt="" />
          <CardContentDescriptions>
            <strong>Projeto exemplo 1</strong>
            <p>
              <span>Duração</span>: 15/08/23 - 29/10/23
            </p>
          </CardContentDescriptions>
        </CardContentContainer>
        <ProgressBarContainer>
          <BackgroundProgressBar>
            <ProgressBar />
          </BackgroundProgressBar>
        </ProgressBarContainer>
      </ProjectContainer>

      <ProjectContainer>
        <CardContentContainer>
          <Image src={Mastercard} alt="" width={50} height={50} />
          <CardContentDescriptions>
            <strong>Projeto exemplo 1</strong>
            <p>
              <span>Duração</span>: 15/08/23 - 29/10/23
            </p>
          </CardContentDescriptions>
        </CardContentContainer>
        <ProgressBarContainer>
          <BackgroundProgressBar>
            <ProgressBar />
          </BackgroundProgressBar>
        </ProgressBarContainer>
      </ProjectContainer>
    </Container>
  );
}
