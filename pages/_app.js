// import './styles.css'
// import './css/Index.css'
// import './css/style.css'
import './css/homepage.css'
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
// export default function MyApp({ Component, pageProps }) {
//   return (
//   <>
//   <Head>
//       // Responsive meta tag
//       <meta name="viewport" content="width=device-width, initial-scale=1" />
//       //  bootstrap CDN
//       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
//     </Head>
//   <Component {...pageProps} />)
//   </>)
// }

import "bootstrap/dist/css/bootstrap.css";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;