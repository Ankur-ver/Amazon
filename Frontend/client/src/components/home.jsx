import React, { useState } from 'react';
import './styles.css';

const Home = () => {
  // State to handle dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle the dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Function to handle clicks outside the dropdown to close it
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.profile-img') && dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  // Attach the click event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownVisible]);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar"></div>

      {/* Panel with navigation options */}
      <div className="panel">
        <div className="panel-ops">
          <i className="fa-solid fa-bars"></i>
          <p>Home</p>
          <p>Services</p>
          <p>About</p>
        </div>

        {/* Profile Section */}
        <li className="profile">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.zSBNiaIRxqsRKRy5WWTDpAHaHa&pid=Api&P=0&h=180"
            alt="Profile"
            className="profile-img"
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li><a href="#profile">Shopify</a></li>
              <li><a href="#settings">E-Commerce</a></li>
              <li><a href="#logout">Meesho</a></li>
            </ul>
          )}
        </li>

        <div className="panel-deals"></div>
      </div>

      {/* Hero Section */}
      <div className="hero-section"></div>
      <div className="hero-msg"></div>

      {/* Shop Section with boxes */}
      <div className="shop-section">
        <div className="box1 box">
          <div className="box-content">
            <div
              className="box-img"
              style={{
                backgroundImage: 'url("https://www.scurri.com/wp-content/uploads/2020/05/amazon-warehouse-exterior.png")',
              }}
            ></div>
          </div>
        </div>

        <div className="box1 box">
          <div className="box-content1">
            <h2><u>Features-</u></h2>
            <ul>
              <li><strong>Streamlined User Authentication:</strong> The immediate redirection to the profile section post-login or registration simplifies the onboarding process, making it easy for users to start managing their stores right away.</li>
              <li><strong>Real-Time Data Storage:</strong> All store information is securely stored in a real-time database, providing instant access and updates to streamline operations and enhance user experience.</li>
              <li><strong>Automated Order Notifications:</strong> Our system instantly receives notifications when orders are placed in any connected store, ensuring timely updates and enhancing automation.</li>
              <li><strong>Dynamic Order Fulfillment:</strong> If the product is in stock, our system automatically triggers API calls to fulfill the order. Upon delivery, product quantities are updated in real-time, ensuring all connected stores reflect accurate inventory levels.</li>
  
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
