// @flow
import * as React from "react";
import { Drawer } from "antd";
import { HotKeys } from "react-hotkeys";

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

// for make it focused
const DummyAnchor = () => {
  const ref: any = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <a href="#" ref={ref}>
      <span />
    </a>
  );
};

const useDrawer = (Comp: any, options: DrawerProps) => (props: Props) => {
  const { changeMode } = React.useContext(AppContext);

  const handleClose = () => {
    changeMode("");
  };

  const { title, icon, placement, width = 400 } = options;
  const drawerProps = {
    title: <IconText icon={icon} text={title} />,
    placement,
    width
  };
  const handlers = {
    escape: handleClose
  };

  return (
    <Drawer
      closable
      destroyOnClose
      onClose={handleClose}
      {...drawerProps}
      visible={props.visible}
    >
      <HotKeys handlers={handlers}>
        <DummyAnchor />
        <Comp autoFocus onClose={handleClose} {...props} />
      </HotKeys>
    </Drawer>
  );
};

export default useDrawer;
