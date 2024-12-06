// ログインとユーザー登録の画面の表示がおかしくなるのでglobals.cssは読み込まない
// import '../styles/globals.css'
// ↓ これを追加してBootstrapで読み込む
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
