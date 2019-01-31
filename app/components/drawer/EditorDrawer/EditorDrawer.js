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
  const [value, set] = React.useState(initialValue);
  const onChange = (val: any) => set(getValue ? getValue(val) : val);

  return [{ value, onChange }, set];
};

const useCurrentMedia = () => {
  const { currentMedia } = React.useContext(MediaContext);
  const { title, fav, authors, tags } = currentMedia || {}

  const [titleProps, setTitle] = useInput(
    title,
    (event: SyntheticEvent<HTMLInputElement>) => event.currentTarget.value
  );
  const [favProps, setFav] = useInput(fav);
  const [authorsProps, setAuthors] = useInput(authors, (val: Array<string>) =>
    val.slice(-1)
  );
  const [tagsProps, setTags] = useInput(tags);

  React.useEffect(
    () => {
      setTitle(title);
    },
    [title]
  );
  React.useEffect(
    () => {
      setFav(fav);
    },
    [fav]
  );
  React.useEffect(
    () => {
      setAuthors(authors);
    },
    [authors]
  );
  React.useEffect(
    () => {
      setTags(tags);
    },
    [tags]
  );

  return { titleProps, favProps, authorsProps, tagsProps };
};

const EditorDrawer = ({ visible, onClose }: Props) => {
  const { update } = React.useContext(MediaContext);
  const { tags: allTags, add: addTags } = React.useContext(TagsContext);
  const { authors: allAuthors, add: addAuthors } = React.useContext(
    AuthorsContext
  );

  const { titleProps, favProps, authorsProps, tagsProps } = useCurrentMedia();

  const handleSave = async () => {
    const newTags = tagsProps.value.sort();

    await Promise.all([
      addTags(newTags),
      addAuthors(authorsProps.value),
      update({
        title: titleProps.value,
        fav: favProps.value,
        authors: authorsProps.value,
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
          <SelectInput items={allAuthors} {...authorsProps} />
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
