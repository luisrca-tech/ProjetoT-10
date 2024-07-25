"use client";

import { type ReactNode, useEffect } from "react";
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
  const [reqLoading] = useAtom(loadingAtom);

  useEffect(() => {
    document.body.style.overflow = loadingAtom ? "hidden" : "unset";
  }, []);

  return (
    <>
      {children}
      {reqLoading && (
        <Content>
          <Modal>
            <LoadingIndicator />
          </Modal>
        </Content>
      )}
    </>
  );
}
