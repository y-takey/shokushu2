import React from "react";
import { ConfigProvider } from "antd";

type Props = { children: React.ReactNode };

const ThemeProvider: React.FC<Props> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: `
          Lato, "Noto Sans JP", "游ゴシック Medium",
          "游ゴシック体", "Yu Gothic Medium", YuGothic, "ヒラギノ角ゴ ProN",
          "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo,
          "MS PGothic", sans-serif
        `,
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default ThemeProvider;
