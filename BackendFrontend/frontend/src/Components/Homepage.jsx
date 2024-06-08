

import React, { useState } from 'react';
import Navbar from './Navbar';

function Homepage() {

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8 mt-16 ml-5"> 
                <h2 className="text-3xl font-bold text-gray-100 mb-4">Welcome To OPTIMAL Online Judge</h2>
                <p className="text-lg text-gray-100">This is An Advance Online Judge created by Aryan Kesharwani</p>
                <p className="text-lg text-gray-200 font-bold mt-4">Features :</p>
                <ul className="list-disc text-lg text-gray-300 ">
                    <li>Problem Set Page Referring to All the Problems</li>
                    <li>Submissions Page Showing all the recent Submissions</li>
                    <li>Users Page showing all the current users</li>
                </ul>
            </div>
        </>
    )
}

export default Homepage;



