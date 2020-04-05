import Header from '../layouts/header'

export default function Index () {
    return (
        <div>
            <Header/>
            <nav>
                <div className="nav-wrapper">
                    <ul className="right hide-on-med-and-down">
                        <li><a href="#!"><i className="material-icons">search</i></a></li>
                        <li><a href="#!"><i className="material-icons">view_module</i></a></li>
                        <li><a href="#!"><i className="material-icons">refresh</i></a></li>
                        <li><a href="#!"><i className="material-icons">more_vert</i></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
