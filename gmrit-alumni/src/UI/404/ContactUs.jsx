import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    eQuery: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="py-8 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold animate-slideInRight">Contact Us</h1>
          <p className="text-base md:text-lg text-gray-700 animate-fadeIn">
            GMRIT recognises the value of constant communication and interaction within the campus and with the outside world. The Institute is always open to suggestions, questions and inquiries.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            <p className="text-gray-700 mb-2">
              <strong>GMR INSTITUTE OF TECHNOLOGY</strong><br />
              GMR Nagar, Rajam - 532 127,<br />
              Vizianagaram District, Andhra Pradesh
            </p>
            <p className="text-gray-700 mb-2">
              <strong>TEL:</strong> 08941-251592, 251593;<br />
              <strong>FAX:</strong> 08941-251591<br />
              <strong>EMAIL:</strong> <a href="mailto:gmrit@gmrit.edu.in" className="text-blue-500">gmrit@gmrit.edu.in</a>
            </p>

            <h2 className="text-xl font-semibold mb-4">For alumni related issues:</h2>
            <p className="text-gray-700 mb-2">
              Dr. P. Ramana / Mr. M. Satish<br />
              9182368037 / 9491154391<br />
              <a href="mailto:ramana.pilla@gmrit.edu.in" className="text-blue-500">ramana.pilla@gmrit.edu.in</a><br />
              <a href="mailto:satish.m@gmrit.edu.in" className="text-blue-500">satish.m@gmrit.edu.in</a>
            </p>

            <h2 className="text-xl font-semibold mb-4">For technical issues:</h2>
            <p className="text-gray-700 mb-2">
              Mr. B. Hari Prasad<br />
              <a href="mailto:hari_b_prasad@gmrit.edu.in" className="text-blue-500">hari_b_prasad@gmrit.edu.in</a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Enquiry Form <span className="text-red-500">*</span></h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Address <span className="text-red-500">*</span></label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Your E-Query <span className="text-red-500">*</span></label>
                <textarea
                  name="eQuery"
                  value={formData.eQuery}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Send Mail
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
