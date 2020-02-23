import { isPlainObject } from "lodash";
import * as React from "react";
import { Drawer } from "antd";

import IconText from "~/components/text/IconText";
import AppContext from "~/contexts/AppContext";

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

const useDrawer = (Comp: any, options: DrawerProps) => (props: Props) => {
  const { update } = React.useContext(AppContext);

  const handleClose = async extraAttrs => {
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
    <Drawer closable destroyOnClose onClose={handleClose} {...drawerProps} visible={props.visible}>
      <Comp autoFocus onClose={handleClose} {...props} />
    </Drawer>
  );
};

export default useDrawer;
