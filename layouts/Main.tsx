import Head from 'next/head';
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#9c4dcc',
            main: "#6a1b9a",
            dark: '#38006b',
        },
        secondary: {
            light:'#9cff57',
            main: '#64dd17',
            dark: '#1faa00'
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
