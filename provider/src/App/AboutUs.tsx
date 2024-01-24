import './AboutUs.scss'
import ReplaceTextToLink from './ReplaceTextToLink';
const title = process.env.REACT_APP_TITLE;
const description = process.env.REACT_APP_DESCRIPTION;
const logo = process.env.REACT_APP_LOGO;

const Content = () => {

  return (
    <div className="about-us">
      <div className="container">
        <div className="branding">
          <div className="image"><img src={logo} alt={title}/></div>
          <div className="logo">{title}</div>
        </div>

        <p>{<ReplaceTextToLink text={description}/>}</p>

      </div>
    </div>
  );
};

export default Content;
