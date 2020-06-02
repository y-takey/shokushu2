import * as React from "react";
import { Modal } from "antd";

import SelectInput from "~/components/SelectInput";
import AuthorsContext from "~/contexts/AuthorsContext";

import ListContext from "./ListContext";

type Props = unknown;

const AuthorFilterModal: React.FC<Props> = () => {
  const { isAuthorFilter, toggleAuthorFilter, filterAuthor } = React.useContext(ListContext);
  const { authors: allAuthors } = React.useContext(AuthorsContext);

  const handleCancel = () => {
    toggleAuthorFilter();
  };

  const handleChange = (value) => {
    filterAuthor(value);
  };

  if (!isAuthorFilter) return null;

  return (
    <Modal
      centered
      closable
      closeIcon={<></>}
      destroyOnClose
      footer={null}
      maskClosable
      onCancel={handleCancel}
      visible
    >
      <SelectInput
        autoFocus
        defaultOpen
        defaultValue={[]}
        value={[]}
        items={allAuthors}
        mode="multiple"
        onChange={handleChange}
      />
    </Modal>
  );
};

export default AuthorFilterModal;
