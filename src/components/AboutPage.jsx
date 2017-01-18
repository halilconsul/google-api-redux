import React from 'react';
import { Link } from 'react-router';

const AboutPage = () => (
   <div className="AboutPage">
      <h2 className="AboutPage__title">
         This is AboutPage
      </h2>
      <p className="AboutPage__text">
         Get back to <Link to='/lists'>TaskLists Page</Link>
      </p>
   </div>
);

export default AboutPage;
