import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import { useNavigateRootIfAuthorized } from '../../../../custom-hooks/use-navigate';
import { Input } from '../../../infra/input/input';
import { Button } from '../../../infra/button/button';
import { loginThunk } from '../../../../redux/features/authorization/authorization.thunks';
import { Link } from 'react-router-dom';
interface Props { }

export const LoginPage: React.FC<Props> = () => {

    useNavigateRootIfAuthorized();

    const dispatch = useAppDispatch()
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const onLoginSubmit = useCallback(async () => {
        try {
            await dispatch(loginThunk({ user, pass })).unwrap();
        } catch (error) {
            setError((error as Error).message);
        }
    }, [user, pass]);

    return (
        <div className={`LoginPage`} data-testid="LoginPage">

            <h1>Please Log In</h1>
            <form>
                <label>
                    <p>Username</p>
                    <Input type="text" onChange={e => setUser(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <Input type="password" onChange={e => setPass(e.target.value)} />
                </label>
                <div style={{ marginTop: '20px' }} >
                    <Button label='Submit' onClick={onLoginSubmit} />
                </div>

                <div style={{ marginTop: '20px' }} >
                    <Link to={'/signup'} style={{ textDecoration: 'unset' }} > Create an account </Link>
                </div>

                {error && <div style={{ color: 'red', marginTop: '20px' }} > {error} </div>}


            </form>
        </div>

    );
};
