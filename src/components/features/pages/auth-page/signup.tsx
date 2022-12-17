import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import { useNavigateRootIfAuthorized } from '../../../../custom-hooks/use-navigate';
import { Input } from '../../../infra/input/input';
import { Button } from '../../../infra/button/button';
import { loginThunk } from '../../../../redux/features/authorization/authorization.thunks';
import { Link } from 'react-router-dom';

interface Props { }

export const SignUpPage: React.FC<Props> = () => {

    useNavigateRootIfAuthorized();

    const dispatch = useAppDispatch()
    const [user, setUser] = useState('');
    const [passFirst, setPassFirst] = useState('');
    const [passSecond, setPassSecond] = useState('');

    const onSignUpSubmit = useCallback(() => {
        dispatch(loginThunk({ user, pass: passFirst }));
    }, [user, passFirst]);

    return (
        <div className={`SignUpPage`} data-testid="SignUpPage">

            <h1>Sign Up</h1>
            <form>
                <label>
                    <p>Username</p>
                    <div>
                        <Input type="text" onChange={e => setUser(e.target.value)} />
                    </div>

                </label>
                <label>
                    <p>Password</p>
                    <div>
                        <Input type="password" onChange={e => setPassFirst(e.target.value)} />
                    </div>
                    <div style={{ marginTop: '20px' }} >
                        <Input
                            placeholder='Repeat your password'
                            type="password"
                            onChange={e => setPassSecond(e.target.value)}
                        />
                    </div>

                </label>
                <div style={{ marginTop: '20px' }} >
                    <Button label='Submit' onClick={onSignUpSubmit} />
                </div>

                <div style={{ marginTop: '20px' }} >
                    <Link to={'/login'} style={{ textDecoration: 'unset' }} > Already have an account, click here </Link>
                </div>
            </form>
        </div>
    );
};
