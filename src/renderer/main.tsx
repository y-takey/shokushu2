import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";

import "./app.css";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container as HTMLElement);

// FIXME: `<React.StrictMode><App /></React.StrictMode>` のようにstrictモードを有効化すると、以下の問題があるため有効化していない。
// - dbのファイル名が不正とのエラーが electron(ブラウザ)のコンソールに表示される。
// - リストの初期表示がされない場合がある。何回かリロードすると表示される。
root.render(<App />);
