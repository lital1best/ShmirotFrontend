import React, {useEffect, useState} from 'react';
import {
    Actions,
    BeforeLinkText,
    Button,
    Card,
    DialogWrapper,
    Emblem,
    Field,
    Form,
    Header,
    Icon,
    Input,
    InputWrap,
    Label,
    Link,
    LinkWrap,
    Subtitle,
    Title,
    TitleWrap
} from "../../theme/commonStyles";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../providers/Auth/UserProvider";
import {useSnackbar} from "../../providers/Snackbar/SnackbarProvider";


export function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()
    const {user, login} = useUser();

    useEffect(() => {
        if (!!user) {
            navigate('/');
        }
    }, [!!user]);

    const onChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((f) => ({...f, [name]: type === 'checkbox' ? checked : value}));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await login(form.email, form.password)
    };

    return (
        <DialogWrapper>
            <Card>
                <Header>
                    <Emblem/>
                    <TitleWrap>
                        <Title>Login into Shmirot Portal</Title>
                        <Subtitle>Restricted — Authorized Personnel Only</Subtitle>
                    </TitleWrap>
                </Header>
                <Form onSubmit={onSubmit}>
                    <Field>
                        <Label> Email </Label>
                        <InputWrap>
                            <Icon>📧</Icon>
                            <Input
                                name="email"
                                type="email"
                                placeholder='Enter Email'
                                value={form.email}
                                onChange={onChange}
                                autoComplete="email"
                                required
                            />
                        </InputWrap>
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <InputWrap>
                            <Icon>🔒</Icon>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                value={form.password}
                                onChange={onChange}
                                autoComplete="current-password"
                                required
                            />
                        </InputWrap>
                    </Field>

                    <Actions>
                        <Button type="submit">Enter</Button>
                    </Actions>
                </Form>
                <LinkWrap>
                    <BeforeLinkText>
                        Don't have an account?
                        <Link href="/signup">Create one here</Link>
                    </BeforeLinkText>
                </LinkWrap>
            </Card>
        </DialogWrapper>
    );
}

