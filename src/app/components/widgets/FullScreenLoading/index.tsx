"use client";

import { ReactNode, useEffect } from "react";
import Modal from "../../surfaces/Modal";
import { Content } from "./styles";

import LoadingIndicator from "../LoadingIndicator";
import { useAtom } from "jotai";
import { loading } from "@/@atom/LoadingState/loadingAtom";
type FullScreenLoadingProps = {
  children: ReactNode;
};

export default function FullScreenLoading({
  children,
}: FullScreenLoadingProps) {
  const [reqLoading] = useAtom(loading);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "unset";
    // console.log(loading, `loading`);
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
