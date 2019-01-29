// @flow
import * as React from "react";
import { Form, Input, Button, Drawer } from "antd";
import styled from "@emotion/styled";

import Favorite from "~/components/input/Favorite";
import SelectInput from "~/components/input/SelectInput";
import IconText from "~/components/text/IconText";
import TagsContext from "~/contexts/TagsContext";
import AuthorsContext from "~/contexts/AuthorsContext";
import MediaContext from "~/contexts/MediaContext";

type Props = {
  visible: boolean,
  onClose: Function
};

const FormFooter = styled("div")`
  background: #fff;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid #e8e8e8;
  bottom: 0;
  left: 0;
  position: absolute;
  padding: 10px 16px;
  text-align: right;
  width: 100%;
`;

const useInput = (initialValue: any, getValue?: (val: any) => any) => {
  const [value, update] = React.useState(initialValue);
  const onChange = (val: any) => update(getValue ? getValue(val) : val);

  return { value, onChange };
};

const EditorDrawer = ({ visible, onClose }: Props) => {
  const {
    currentMedia: { title, fav, author, tags },
    update,
  } = React.useContext(MediaContext);
  const { tags: allTags, add: addTags } = React.useContext(TagsContext);
  const { authors: allAuthors, add: addAuthors } = React.useContext(
    AuthorsContext
  );

  const titleProps = useInput(
    title,
    (event: SyntheticEvent<HTMLInputElement>) => event.currentTarget.value
  );
  const favProps = useInput(fav);
  const authorProps = useInput(author, (val: Array<string>) => val.slice(-1));
  const tagsProps = useInput(tags);

  const handleSave = async () => {
    const newTags = tagsProps.value.sort();

    await Promise.all([
      addTags(newTags),
      addAuthors(authorProps.value),
      update({
        title: titleProps.value,
        fav: favProps.value,
        author: authorProps.value,
        tags: newTags,
      }),
    ]);

    onClose();
  };

  return (
    <Drawer
      title={<IconText icon="eidt" text="Edit" />}
      closable={false}
      destroyOnClose
      onClose={onClose}
      placement="right"
      width={320}
      visible={visible}
    >
      <Form layout="vertical">
        <Form.Item label={<IconText icon="read" text="Title" />}>
          <Input {...titleProps} />
        </Form.Item>
        <Form.Item label={<IconText icon="star" text="Favorite" />}>
          <Favorite {...favProps} />
        </Form.Item>

        <Form.Item label={<IconText icon="solution" text="Author" />}>
          <SelectInput items={allAuthors} {...authorProps} />
        </Form.Item>
        <Form.Item label={<IconText icon="tags" text="Tags" />}>
          <SelectInput items={allTags} {...tagsProps} />
        </Form.Item>

        <FormFooter>
          <Button style={{ marginRight: 8 }} icon="close" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} icon="check" type="primary">
            Save
          </Button>
        </FormFooter>
      </Form>
    </Drawer>
  );
};

export default EditorDrawer;
