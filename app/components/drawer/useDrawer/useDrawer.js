// @flow
import * as React from "react";
import { Drawer } from "antd";

import IconText from "~/components/text/IconText";
import AppContext from "~/contexts/AppContext";

type DrawerProps = {
  title?: string,
  icon?: string,
  placement?: string,
  width?: number | string
};

type Props = {
  visible: boolean
};

const useDrawer = (Comp: any, options: DrawerProps) => (props: Props) => {
  const { update, changeHotKeys } = React.useContext(AppContext);

  const handleClose = () => {
    update({ mode: "list" });
  };

  React.useEffect(
    () => {
      if (!props.visible) return;

      changeHotKeys({
        keyMap: { CLOSE: "escape" },
        handlers: { CLOSE: handleClose },
      });
    },
    [props.visible]
  );

  const { title, icon, placement, width = 400 } = options;
  const drawerProps = {
    title: <IconText icon={icon} text={title} />,
    placement,
    width,
  };

  return (
    <Drawer
      closable
      destroyOnClose
      onClose={handleClose}
      {...drawerProps}
      visible={props.visible}
    >
      <Comp autoFocus onClose={handleClose} {...props} />
    </Drawer>
  );
};

export default useDrawer;
