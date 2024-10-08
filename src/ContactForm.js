// ContactForm.js

import React from 'react';
import emailjs from 'emailjs-com';
import "./ContactForm.css";

emailjs.init("O6DdTd4lpKSNFt17u");

function ContactForm() {
    const email = localStorage.getItem('hospitalEmail');
    console.log("from contact:",email);
  
    function sendMail() {
        var params = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            address: document.getElementById("address").value,
            phone_number: document.getElementById("phone_number").value,
            email: email,

        };

        const serviceID = "service_qenvgmm";
        const templateID = "template_6e4n4z6";

        emailjs.send(serviceID, templateID, params)
            .then(res => {
                document.getElementById("name").value = "";
                document.getElementById("age").value = "";
                document.getElementById("address").value = "";
                document.getElementById("phone_number").value = "";
        
                console.log(res);
                alert("Your message sent successfully!!");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container border mt-3 bg-light">
            <div className="row">
                
                <div className="col-md-6 border-left py-3">
                    <h1>Contact form</h1>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            placeholder="Enter age"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Enter address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone_number"
                            placeholder="Enter phone number"
                        />
                    </div>
                    
                    
                    <button className="btn btn-primary" onClick={sendMail}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;