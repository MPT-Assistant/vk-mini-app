import React, { useEffect, useState } from "react";
import {
  Button,
  FormItem,
  FormLayout,
  Group,
  ModalCard,
  Placeholder,
  Select,
  Spinner,
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import api from "../../TS/api";
import session from "../../TS/store/session";
import router from "../../TS/store/router";

const GroupSelect = ({ id }: { id: string }) => {
  const [isLoad, setIsLoad] = useState(true);
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);

  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    void api.groups.getSpecialtiesList().then((specialities) => {
      setSpecialities(specialities);
      setIsLoad(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedSpecialty) {
      return;
    }
    setIsLoad(true);

    void api.groups
      .getList({
        specialty: selectedSpecialty,
      })
      .then((groups) => {
        setGroups(groups);
        setIsLoad(false);
      });
  }, [selectedSpecialty]);

  return (
    <ModalCard
      id={id}
      header="Выбор группы"
      actions={
        <Button
          size="l"
          disabled={selectedGroup === null}
          onClick={async () => {
            setIsLoad(true);
            await api.app.setUserGroup(selectedGroup as string);
            await session.loadUser();
            router.activeModal = null;
          }}
        >
          Установить
        </Button>
      }
    >
      {isLoad && (
        <Group separator="hide">
          <Placeholder>
            <Spinner size="large" />
          </Placeholder>
        </Group>
      )}
      {!isLoad && (
        <FormLayout>
          <FormItem top="Выберите специальность">
            {specialities.length > 0 && (
              <Select
                value={selectedSpecialty || undefined}
                placeholder="Не выбрана"
                options={specialities.map((specialty) => ({
                  label: specialty,
                  value: specialty,
                }))}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              />
            )}
          </FormItem>
          {selectedSpecialty && (
            <FormItem top="Выберите группу">
              {groups.length > 0 && (
                <Select
                  value={selectedGroup || undefined}
                  placeholder="Не выбрана"
                  options={groups.map((group) => ({
                    label: group,
                    value: group,
                  }))}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                />
              )}
            </FormItem>
          )}
        </FormLayout>
      )}
    </ModalCard>
  );
};

export default observer(GroupSelect);
