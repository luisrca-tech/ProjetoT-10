"use client";

import { poppins } from "~/app/fonts";

import { Skeleton } from "~/components/widgets/Skeleton";
import {
  CardContentDescriptions,
  Container,
  ImageSkeletonContainer,
  SkeletonWrapper,
} from "./styles";

export function CardContentSkeleton() {
  return (
    <Container>
      <ImageSkeletonContainer>
        <Skeleton width="100%" height="100%" />
      </ImageSkeletonContainer>
      <CardContentDescriptions className={poppins.className}>
        <Skeleton width="100%" height="1rem" />

        <SkeletonWrapper>
          <span>Duração:</span>
          <Skeleton width="5rem" height="1rem" />
          <span>-</span>
          <Skeleton width="5rem" height="1rem" />
        </SkeletonWrapper>
      </CardContentDescriptions>
    </Container>
  );
}
