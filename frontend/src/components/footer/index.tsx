import React from "react";
import "./footer.css";
import facebook from "../../assets/facebook.png";
import instergram from "../../assets/instagram.png";
import linkdin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import Logo from "../../assets/LOGO png.png" 

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">

          <div className="sb_footer-links_div">
            <img src={Logo} alt="Logo" style={{ width: '75px', height: '75px' ,marginBottom: '10px'}}/>
            <a href="/resource">
              <p>Track Order</p>
            </a>
            <a href="/resource">
              <p>Deliver & Returns</p>
            </a>
            <a href="/resource">
              <p>Warrenty</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>About US</h4>
            <a href="/employer">
              <p>Group Story</p>
            </a>
            <a href="/employer">
              <p>Work with Us</p>
            </a>
            <a href="/employer">
              <p>Coporate News</p>
            </a>
            <a href="/employer">
              <p>Investors</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Online Shop</h4>
            <a href="/about">
              <p>Jwelery</p>
            </a>
            <a href="/press">
              <p>Batik</p>
            </a>
            <a href="/career">
              <p>Mask</p>
            </a>
            <a href="/contact">
              <p>Pottery</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Useful Links</h4>
            <a href="/about">
              <p>Secure Payment</p>
            </a>
            <a href="/press">
              <p>Privacy Policy</p>
            </a>
            <a href="/career">
              <p>Terms of Use</p>
            </a>

          </div>

        </div>

        <hr></hr>
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>
              @{new Date().getFullYear()} ARTICRAFTS All Right Reserved
            </p>
          </div>
          <div className="sb_footer-links_div">

            <div className="socialmedia">
              <p>
                <img src={facebook} alt="" />
              </p>
              <p>
                <img src={twitter} alt="" />
              </p>
              <p>
                <img src={linkdin} alt="" />
              </p>
              <p>
                <img src={instergram} alt="" />
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Footer;
