import { isPlainObject } from "lodash";
import * as React from "react";
import { Drawer } from "antd";

import IconText from "~/renderer/components/IconText";
import AppContext from "~/renderer/contexts/AppContext";

type Placement = "bottom" | "left" | "right" | "top";

type DrawerProps = {
  title?: string;
  icon?: string;
  placement?: Placement;
  width?: number | string;
};

type Props = {
  visible: boolean;
};

const useDrawer = (Comp: React.ElementType, options: DrawerProps) => (props: Props) => {
  const { update } = React.useContext(AppContext);

  const handleClose = async (extraAttrs) => {
    const attrs = isPlainObject(extraAttrs) ? extraAttrs : {};
    await update({
      mode: "list",
      ...attrs,
    });
  };

  const { title, icon, placement, width = 400 } = options;
  const drawerProps = {
    title: <IconText icon={icon} text={title} />,
    placement,
    width,
  };

  return (
    <Drawer closable destroyOnClose onClose={handleClose} {...drawerProps} open={props.visible}>
      <Comp autoFocus onClose={handleClose} {...props} />
    </Drawer>
  );
};

export default useDrawer;
