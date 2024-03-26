import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { type AppType } from "next/app";
import '@fontsource-variable/outfit';
import { api } from "~/utils/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar/Navbar";
import { useRouter } from "next/router";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'Outfit Variable, sans-serif'
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 431,
      laptop: 1224,
      desktop: 1300
    }
  },
  palette: {
    primary: {
      main: '#774eec'
    }
  },
  components: {
    MuiTableFooter: {
      styleOverrides: {
        root: {
          position: 'sticky',
          left: 0,
          bottom: 0,
        }
      }
    }
  }
});

const SubManager = () => {
  const session = useSession();
  // console.log(48, session);
  return <></>;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <SubManager />
        {!(router.route === '/login' || router.route === '/signup') && <Navbar/>}
        {router.route === '/' && (
          <style jsx global>
            {`
              body {
                margin: 0;
                height: 100vh;
                background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 139, 0.6)), url(/assets/home-background.jpg);
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                overflow: auto;
              }
            `}
          </style>
        )}
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const dynamic = 'force-dynamic';
export const revalidate = 0
export default api.withTRPC(MyApp);
