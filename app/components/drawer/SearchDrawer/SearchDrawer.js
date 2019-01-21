// @flow
import * as React from "react";
import { Button } from "antd";

import useDrawer from "~/components/drawer/useDrawer";

type Props = {
  onClose: Function
};

const SearchForm = ({ onClose }: Props) => (
  <div>
    <p>search...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <Button type="primary" onClick={onClose}>
      Close
    </Button>
  </div>
);

const SearchDrawer = useDrawer(SearchForm, {
  title: "Search",
  icon: "search",
  placement: "left"
});

export default SearchDrawer;
