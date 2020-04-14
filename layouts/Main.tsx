import Head from 'next/head';
import Footer from './Footer';

const Main = ({ children }: any) => {
    return (
        <div>
            <Head>
                <title>Udenar Schedule</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                      crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            </Head>
            { children }
            <Footer/>
        </div>
    )
}

export default Main;
