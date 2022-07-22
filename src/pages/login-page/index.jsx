import React, { Fragment } from 'react';

import styles from './styles.module.css';

const LoginPage = props => {
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <div>Milestone</div>
                    <form>
                        <label>Enter email</label>
                        <input type="text" placeholder='eg: example@xyz.com'/>
                    </form>
                    <button>Next</button>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginPage; 