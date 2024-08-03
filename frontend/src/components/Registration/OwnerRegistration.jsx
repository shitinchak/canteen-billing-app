import { Link, useNavigate } from 'react-router-dom';
import loginpic from '../../assets/SVG/loginpic.svg';
import useInput from '../../hooks/useInput/use-input';

const OwnerRegister = () => {
  const navigate = useNavigate();

  const {
    value: enteredName,
    hasError: nameHasError,
    isValueValid: isNameValid,
    reset: nameReset,
    valueChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== '' && value.trim().length > 1);

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

  const {
    value: enteredClgName,
    hasError: clgNameHasError,
    isValueValid: isClgNameValid,
    valueChangeHandler: clgNameChangeHandler,
    blurHandler: clgNameBlurHandler,
    reset: clgReset,
  } = useInput((value) => value.trim() !== '');

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const RegisterReq = async (info) => {
    try {
      const response = await fetch('/api/v1/oregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      //   const result = await response.json();
      alert('registration successfull');
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!isNameValid && !isEmailValid && !isPasswordValid) {
      return;
    }
    if (!isClgNameValid) {
      return;
    }
    const userInfo = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      ownerCollegeName: enteredClgName,
    };
    RegisterReq(userInfo);
    nameReset();
    emailReset();
    passwordReset();
    clgReset();
    navigate('/ologin');
  };

  return (
    <section className="login">
      <div className="login__title-group login__title-group--reg">
        <img src={loginpic} alt='login pic' className="login__pic" />
        <h1 className="heading-primary login__title">Register to canteen</h1>
        <p className="login__sub-title">
          Already have an account?&nbsp;
          <span>
            <Link to="/ologin">Login</Link>
          </span>
        </p>
      </div>
      <form onSubmit={onSubmitHandler} className="login__form">
        <div className="login__form-group">
          <input
            name="username"
            className={
              nameHasError
                ? 'input--error u-margin-bottom-small'
                : 'input u-margin-bottom-small'
            }
            type="text"
            placeholder="name"
            required
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
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
                ? 'input--error u-margin-bottom-small'
                : 'input u-margin-bottom-small'
            }
            type="password"
            placeholder="password"
            required
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <input
            name="college"
            className={
              clgNameHasError
                ? 'input--error u-margin-bottom'
                : 'input u-margin-bottom'
            }
            type="text"
            placeholder="college"
            required
            value={enteredClgName}
            onChange={clgNameChangeHandler}
            onBlur={clgNameBlurHandler}
          />
          
          <button className="button button--primary u-margin-right u-margin-left u-margin-bottom">
            register
          </button>
          <Link to='..' className="button button--white u-margin-right u-margin-left">
            back
          </Link>
        </div>
      </form>
    </section>
  );
};

export default OwnerRegister;
