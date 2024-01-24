import './AboutUs.scss'
const title = process.env.REACT_APP_TITLE;
const description = process.env.REACT_APP_DESCRIPTION;
const logo = process.env.REACT_APP_LOGO;

const Content = () => {

  return (
    <div className="about-us">
      <div className="container">
        <div className="branding">
          <div className="image"><img src={logo} alt=""/></div>
          <div className="logo">{title}</div>
        </div>

        <p>{description}</p>

      </div>
    </div>
  );
};

export default Content;
