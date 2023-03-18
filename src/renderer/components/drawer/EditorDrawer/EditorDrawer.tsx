import * as React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, InputNumber, Button, Drawer, Form } from "antd";

import Favorite from "~/renderer/components/Favorite";
import SelectInput from "~/renderer/components/SelectInput";
import IconText from "~/renderer/components/IconText";
import DrawerFooter from "~/renderer/components/drawer/DrawerFooter";
import useInput from "~/renderer/components/hooks/useInput";
import TagsContext from "~/renderer/contexts/TagsContext";
import AuthorsContext from "~/renderer/contexts/AuthorsContext";
import MediumContext from "~/renderer/contexts/MediumContext";

type Props = unknown;

const useCurrentMedia = () => {
  const { title, fav, authors, tags, viewedCount } = React.useContext(MediumContext);

  const [titleProps, setTitle] = useInput(
    title,
    (event: React.ChangeEvent<HTMLInputElement>) => event.currentTarget.value
  );
  const [favProps, setFav] = useInput(fav);
  const [authorsProps, setAuthors] = useInput(authors, (val: Array<string>) => val.slice(-1));
  const [tagsProps, setTags] = useInput(tags);
  const [viewedCountProps, setViewedCount] = useInput(viewedCount);

  React.useEffect(() => {
    setTitle(title);
  }, [title]);
  React.useEffect(() => {
    setFav(fav);
  }, [fav]);
  React.useEffect(() => {
    setAuthors(authors);
  }, [authors]);
  React.useEffect(() => {
    setTags(tags);
  }, [tags]);
  React.useEffect(() => {
    setViewedCount(viewedCount);
  }, [viewedCount]);

  return {
    titleProps,
    favProps,
    authorsProps,
    tagsProps,
    viewedCountProps,
  };
};

const EditorDrawer: React.FC<Props> = () => {
  const [processing, setProcessing] = React.useState(false);
  const { isEditing, editCancel, update } = React.useContext(MediumContext);
  const { tags: allTags, add: addTags } = React.useContext(TagsContext);
  const { authors: allAuthors, add: addAuthors } = React.useContext(AuthorsContext);

  const { titleProps, favProps, authorsProps, tagsProps, viewedCountProps } = useCurrentMedia();

  const handleSave = async () => {
    setProcessing(true);
    const newTags = tagsProps.value.sort();

    await Promise.all([
      addTags(newTags),
      addAuthors(authorsProps.value),
      update({
        title: titleProps.value,
        fav: favProps.value,
        authors: authorsProps.value,
        tags: newTags,
        viewedCount: viewedCountProps.value,
      }),
    ]);

    setProcessing(false);
  };

  const handleClose = () => {
    editCancel();
  };

  return (
    <Drawer
      title={<IconText icon="edit" text="Edit" />}
      closable={false}
      destroyOnClose
      onClose={handleClose}
      placement="left"
      width={400}
      open={isEditing}
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
        <Form.Item label={<IconText icon="eye" text="Viewed Count" />}>
          <InputNumber min={0} {...viewedCountProps} />
        </Form.Item>

        <DrawerFooter>
          {[
            <Button loading={processing} icon={<CloseOutlined />} onClick={handleClose} key="cancel">
              Cancel
            </Button>,
            <Button loading={processing} onClick={handleSave} icon={<CheckOutlined />} type="primary" key="save">
              Save
            </Button>,
          ]}
        </DrawerFooter>
      </Form>
    </Drawer>
  );
};

export default EditorDrawer;
