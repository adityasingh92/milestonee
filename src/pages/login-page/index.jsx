import React, { Fragment, useState } from "react";

import { debounce } from "../../common/generics";
import { 
	enterEmailLabel, 
	emailPlaceHolderLabel, 
	enterPasswordLabel, 
	milestoneAppTitleLabel, 
	nextButtonLabel, 
	loginButtonLabel 
} from "./locale/en";
import styles from "./styles.module.css";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginFormErrors, setLoginFormErrors] = useState({
		emailErrors: "",
		passwordErrors: ""
	});

	const [showPasswordForm, setShowPasswordForm] = useState(false);

	const goBack = () => {
		setPassword("");
		setLoginFormErrors(prevState => {
			return {...prevState, emailErrors: "", passwordErrors: ""};
		});
		setShowPasswordForm(false);
	};

	const onOk = (event) => {
		event.preventDefault();
        
		if(!email || loginFormErrors.emailErrors){
			setShowPasswordForm(false);
		}

		setShowPasswordForm(true);
	};

	const validateEmail = (emailAddress) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if(emailAddress.length < 6 || emailAddress.length > 300){
			setLoginFormErrors(prevState => {
				return {...prevState, emailErrors: "Email should be between 6 to 300 characters long"};
			});
			return;
		}

		if(re.test(emailAddress)){
			setLoginFormErrors(prevState => {
				return {...prevState, emailErrors: ""};
			});
		}else{
			setLoginFormErrors(prevState => {
				return {...prevState, emailErrors: "Invalid Email. Valid email eg: example@xyz.com"};
			});
		}
	};

	const handleEmailChange = event => {
		const {value} = event.target;
		setEmail(value);
		debounce(validateEmail)(value);
	};

	const emailForm = () => {
		return <>
			<form onSubmit={onOk}>
				<label>{enterEmailLabel}</label>
				<input type="text" placeholder={emailPlaceHolderLabel} onChange={handleEmailChange} value={email}/>
				{loginFormErrors.emailErrors && <span>{loginFormErrors.emailErrors}</span>}
			</form>
			<section className={styles.passwordButtonGroups}>
				<span className={styles.backbutton}>Sign up instead?</span>
				<button onClick={onOk}>{nextButtonLabel}</button>
			</section>
		</>;
	};

	const validatePassword = password => {
		if(password.length < 8 || password.length > 1024){
			setLoginFormErrors(prevState => {
				return {...prevState, passwordErrors: "Password should be between 8 to 1024 characters long"};
			});
		}
	};

	const handlePasswordChange = event => {
		const {value} = event.target;
		setPassword(value);
		debounce(validatePassword)(value);
	};

	const passwordForm = () => {
		return <>
			<form>
				<label>{enterPasswordLabel}</label>
				<input type="password" onChange={handlePasswordChange} value={password} />
				{loginFormErrors.passwordErrors && <span>{loginFormErrors.passwordErrors}</span>}
			</form>
			<section className={styles.passwordButtonGroups}>
				<span className={styles.backbutton} onClick={goBack}>Go back</span>
				<button>{loginButtonLabel}</button>
			</section>
		</>;
	};

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.loginContainer}>
					<div>{milestoneAppTitleLabel}</div>
					{!showPasswordForm ? emailForm() : passwordForm()}
				</div>
			</div>
		</Fragment>
	);
};

export default LoginPage; 