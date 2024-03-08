import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { type AppType } from "next/app";
import '@fontsource-variable/outfit';
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar/Navbar";
import { useRouter } from "next/router";

const theme = createTheme({
  typography: {
    fontFamily: 'Outfit Variable, sans-serif'
  }
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
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

export default api.withTRPC(MyApp);
