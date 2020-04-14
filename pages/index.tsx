import Main from '../layouts/Main';
import { Menu } from '../components/Menu';
import withData from '../plugins/apollo';
import "../styles/styles.css";

export default withData ( (props: any) => {
    return (
        <div>
            <Main>
                <Menu/>
            </Main>
        </div>
    )
})
