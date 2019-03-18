// Back-end server for creating, deleting, and feeding my potfolio
// The server is a free Heroku app, so it may take moment to wake

import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Components/Nav';
import ProjectPage from './Components/ProjectPage';
import Footer from './Components/Footer';
import RouteError from './Components/RouteError';
import Main from './Components/Main';
import BackButtonRouter from './Components/BackButton';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

// Better naming conventions

const storage = window.localStorage;

const projectData =
    'https://jeremylshepherd.herokuapp.com/api/jeremylshepherd/projects';

class Portfolio extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],
            isLoading: false
        };

        this.loadProjects = this.loadProjects.bind(this);
    }

    loadProjects() {
        this.setState({ isLoading: true });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    data: data,
                    isLoading: false
                });
                storage.setItem('data', JSON.stringify(data));
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
                this.setState({ data: JSON.parse(storage.getItem('data')) });
            }
        });
    }

    componentDidMount() {
        this.loadProjects();
    }

    render() {
        const projRoutes = this.state.data.map((t) => {
            return <Route key={t._id} path={`/${t._id}`} render={() => <ProjectPage {...t} /> }/>;
        });
        return (
            <Router>
                <div>
                    <div className="full">
                        <Nav />
                        <div id="content">
                            <Switch>
                                <Route exact path="/" render={() => <Main {...this.state} />} />
                                {projRoutes}
                                <Route component={RouteError} />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <Portfolio url={projectData} />,
    document.getElementById('app')
);