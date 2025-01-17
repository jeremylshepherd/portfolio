import React from 'react';
import Banner from './Banner';
import CollapseCont from './CollapseCont';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

const Main = props => {
    return (
        <div className="full">
            <Banner />
            <CollapseCont heading="About Me" id="welcome-section">
                <About />
            </CollapseCont>
            <CollapseCont heading="Projects">
                <Projects data={props.data} loading={props.isLoading} />
            </CollapseCont>
            <CollapseCont heading="Contact">
                <Contact />
            </CollapseCont>
        </div>
    );
};

export default Main;
