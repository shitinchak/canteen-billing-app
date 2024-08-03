import { Link, useNavigate } from 'react-router-dom';
import loginpic from '../../assets/SVG/loginpic.svg';
import useInput from '../../hooks/useInput/use-input';

const OwnerLogin = () => {
  const navigate = useNavigate();
  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValueValid: isEmailValid,
    reset: emailReset,
    valueChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(
    (value) => value.trim() !== '' && value.includes('@') && value.includes('.')
  );

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValueValid: isPasswordValid,
    reset: passwordReset,
    valueChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== '' && value.trim().length > 6);

  const loginReq = async (info) => {
    try {
      const response = await fetch('/api/v1/ologin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) {
        throw new Error('Could not login in');
      }
      const result = await response.json();
      return result;
    } catch (err) {
      window.alert(err.message);
      return null;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isEmailValid && !isPasswordValid) {
      return;
    }

    const userInfo = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const result = await loginReq(userInfo);

    if (result) {
      localStorage.setItem('id', result.student._id);
      localStorage.setItem('clg',result.student.ownerCollegeName);
      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.student.name);
      localStorage.setItem('email',result.student.email);
      emailReset();
      passwordReset();

      navigate('/oitems');
    }
  };

  return <section className="login">
        <div className="login__title-group">
          <img src={loginpic} className="login__pic" />
          <h1 className="heading-primary login__title">login to canteen</h1>
          <p className="login__sub-title">
            Don't have an existing account?&nbsp;
            <span>
              <Link to="/oregister">Create</Link>
            </span>
          </p>
        </div>
        <form onSubmit={onSubmitHandler} className="login__form">
          <div className="login__form-group">
            <input
              name="email"
              className={
                emailHasError
                  ? 'input--error u-margin-bottom-small'
                  : 'input u-margin-bottom-small'
              }
              type="email"
              placeholder="email"
              required
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <input
              name="password"
              className={
                passwordHasError
                  ? 'input--error u-margin-bottom'
                  : 'input u-margin-bottom'
              }
              type="password"
              placeholder="password"
              required
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            <button className="button button--primary u-margin-right u-margin-left u-margin-bottom">
              login
            </button>
            <Link
              to=".."
              className="button button--white u-margin-right u-margin-left"
            >
              back
            </Link>
          </div>
        </form>
      </section>;
};

export default OwnerLogin;
