import * as React from "react";
import { CheckOutlined, CloseOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button, Form } from "antd";

import useDrawer from "~/components/drawer/useDrawer";
import DrawerFooter from "~/components/drawer/DrawerFooter";
import Favorite from "~/components/input/Favorite";
import SelectInput from "~/components/input/SelectInput";
import IconText from "~/components/text/IconText";
import TagsContext from "~/contexts/TagsContext";
import AuthorsContext from "~/contexts/AuthorsContext";

import ListContext from "~/containers/ListContainer/ListContext";
import useInput from "~/components/hooks/useInput";

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
  const { condition, pager } = React.useContext(ListContext);
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

    onClose({
      condition: newCondition,
      pager: {
        ...pager,
        current: 1,
      },
    });
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
