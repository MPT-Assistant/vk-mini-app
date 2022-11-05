import React from "react";
import { ModalRoot } from "@vkontakte/vkui";
import router from "../TS/store/router";
import { observer } from "mobx-react";
import GroupSelect from "../modals/card/GroupSelect";

const ModalRootComponent = (): JSX.Element => {
  return (
    <ModalRoot
      activeModal={router.activeModal}
      onClose={(modalId): void => {
        router.activeModal = null;
        router.events.emit("onModalClose", modalId);
      }}
      onClosed={(modalId): void => {
        router.events.emit("onModalClosed", modalId);
      }}
      onOpen={(modalId): void => {
        router.events.emit("onModalOpen", modalId);
      }}
      onOpened={(modalId): void => {
        router.events.emit("onModalOpened", modalId);
      }}
    >
      <GroupSelect id="group-select-card" />
    </ModalRoot>
  );
};

export default observer(ModalRootComponent);
