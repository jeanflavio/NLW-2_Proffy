import React from 'react';
import { BrowserRouter, Route,  } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/Landing/TeatcherList';
import TeacherForm from './pages/Landing/TeatcherForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />

        </BrowserRouter>
    )
}

export default Routes;