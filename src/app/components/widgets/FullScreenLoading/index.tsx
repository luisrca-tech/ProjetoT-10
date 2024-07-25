"use client";

import { type ReactNode } from "react";
import Modal from "../../surfaces/Modal";
import { Content } from "./styles";

import LoadingIndicator from "../LoadingIndicator";
import { useAtom } from "jotai";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
type FullScreenLoadingProps = {
  children: ReactNode;
};

export default function FullScreenLoading({
  children,
}: FullScreenLoadingProps) {
  const [loading] = useAtom(loadingAtom);

  return (
    <>
      {children}
      {loading && (
        <Content>
          <Modal>
            <LoadingIndicator />
          </Modal>
        </Content>
      )}
    </>
  );
}
