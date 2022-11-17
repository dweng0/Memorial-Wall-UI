import React from 'react';
import { FormWrapper, StyledInput, StyledTextArea, SubmitWrapper } from '../../styled';
import { StyledButton } from '../button/styled';

type MessageFormProps = {
    onSubmit: (name: string, message: string) => void
}
export const MessageForm: React.FC<MessageFormProps> = ({onSubmit}) => {
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = () => {
        onSubmit(name, message);
        setName('');
        setMessage('');
    }
    return (
        <FormWrapper>
            <StyledInput placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <StyledTextArea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <SubmitWrapper>
                <StyledButton onClick={() => handleSubmit()}>Submit</StyledButton>
            </SubmitWrapper>
        </FormWrapper>
    )
}