import { Form,Link } from 'react-router-dom';
import duck from '../../../assets/duck.jpeg';
import user from '../../../assets/SVG/Edit-profile-logo.svg';
import history from '../../../assets/SVG/Order-history-logo.svg';
import about from '../../../assets/SVG/About-logo.svg';

const Profile = () => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const clg = localStorage.getItem('clg');
  return (
    <section className="profile">
      <div className="profile__card">
        <img className="profile__pic" src={duck} alt="profile pic" />
        <div className='profile__details'>
        <h3 className='heading-tertiary profile__name'>{name}</h3>
        <p className='profile__text'>{email}</p>
        <p className='profile__text'>{clg}</p>
        </div>
      </div>
      <div className='profile__links'>
        <Link className='profile__link'><span className='profile__link-logo'><img src={user} alt='user image' /></span>edit profile</Link>
        <Link className='profile__link'><span className='profile__link-logo'><img src={history} alt='history image' /></span>order history</Link>
        <Link className='profile__link'><span className='profile__link-logo'><img src={about} alt='about' /></span>about</Link>
      </div>
      <div className="profile__logout">
        <Form method="POST" action="/logout">
          <button className="button button--primary">logout</button>
        </Form>
      </div>
    </section>
  );
};

export default Profile;
