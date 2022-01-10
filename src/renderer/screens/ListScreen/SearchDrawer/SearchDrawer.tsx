import * as React from "react";
import { CheckOutlined, CloseOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button, Form } from "antd";

import useDrawer from "~/renderer/components/drawer/useDrawer";
import DrawerFooter from "~/renderer/components/drawer/DrawerFooter";
import Favorite from "~/renderer/components/Favorite";
import SelectInput from "~/renderer/components/SelectInput";
import IconText from "~/renderer/components/IconText";
import TagsContext from "~/renderer/contexts/TagsContext";
import AuthorsContext from "~/renderer/contexts/AuthorsContext";
import ListContext from "~/renderer/screens/ListScreen/ListContext";
import useInput from "~/renderer/components/hooks/useInput";

interface Props {
  onClose: (event: any) => void;
}

const mediaTypeOptions = [
  {
    value: "comic",
    label: "Comics",
  },
  {
    value: "video",
    label: "Videos",
  },
];

const SearchForm: React.FC<Props> = ({ onClose }) => {
  const { condition, changeCondition } = React.useContext(ListContext);
  const { tags: allTags } = React.useContext(TagsContext);
  const { authors: allAuthors } = React.useContext(AuthorsContext);

  const [mediaTypeProps, setMediaType] = useInput(condition.mediaType);
  const [titleProps, setTitle] = useInput(
    condition.title,
    (event: React.ChangeEvent<HTMLInputElement>) => event.currentTarget.value
  );
  const [favProps, setFav] = useInput(condition.fav);
  const [authorsProps, setAuthors] = useInput(condition.authors);
  const [tagsProps, setTags] = useInput(condition.tags);

  const handleReset = () => {
    setMediaType([]);
    setTitle("");
    setFav(0);
    setAuthors([]);
    setTags([]);
  };

  const handleApply = async () => {
    const newCondition = {
      mediaType: mediaTypeProps.value,
      title: titleProps.value,
      fav: favProps.value,
      authors: authorsProps.value,
      tags: tagsProps.value,
    };

    changeCondition(newCondition);

    onClose({});
  };

  return (
    <Form layout="vertical">
      <Form.Item label={<IconText icon="appstore" text="Media Type" />}>
        <Checkbox.Group options={mediaTypeOptions} {...mediaTypeProps} />
      </Form.Item>
      <Form.Item label={<IconText icon="read" text="Title" />}>
        <Input {...titleProps} />
      </Form.Item>
      <Form.Item label={<IconText icon="star" text="Favorite" />}>
        <Favorite {...favProps} />
      </Form.Item>

      <Form.Item label={<IconText icon="solution" text="Author (OR)" />}>
        <SelectInput mode="multiple" items={allAuthors} {...authorsProps} />
      </Form.Item>
      <Form.Item label={<IconText icon="tags" text="Tags (AND)" />}>
        <SelectInput mode="multiple" items={allTags} {...tagsProps} />
      </Form.Item>

      <Form.Item>
        <Button block icon={<ThunderboltOutlined />} onClick={handleReset}>
          Reset
        </Button>
      </Form.Item>

      <DrawerFooter>
        {[
          <Button icon={<CloseOutlined />} onClick={onClose} key="apply">
            Cancel
          </Button>,
          <Button icon={<CheckOutlined />} type="primary" onClick={handleApply} key="apply">
            Apply
          </Button>,
        ]}
      </DrawerFooter>
    </Form>
  );
};

const SearchDrawer = useDrawer(SearchForm, {
  title: "Search",
  icon: "search",
  placement: "left",
});

export default SearchDrawer;
