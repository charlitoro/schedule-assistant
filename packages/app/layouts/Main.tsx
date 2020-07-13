import Head from 'next/head';
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#484848',
            main: '#1B1B1B',
            dark: '#121212',
        },
        secondary: {
            light: '#97e078',
            main: '#7ed957',
            dark: '#58973c'
        },
    },
});

const Main = ({ children }: any) => {
    return (
        <div>
            <Head>
                <title>Udenar Schedule</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                      crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div style={{display: "flex"}}>
                <ThemeProvider theme={theme}>
                    { children }
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Main;
