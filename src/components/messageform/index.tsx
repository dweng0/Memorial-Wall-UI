import { ethers } from 'ethers';
import React from 'react';
import { FormWrapper, StyledInput, StyledTextArea, SubmitWrapper } from '../../styled';
import { StyledButton } from '../button/styled';
import { toast } from 'react-toastify';
type MessageFormProps = {
    onSubmit: (name: string, message: string, donation: string) => void
}
export const MessageForm: React.FC<MessageFormProps> = ({onSubmit}) => {
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [donation, setDonation] = React.useState('');

    const handleSubmit = () => {

        /**
         * Error boundary
         */
        try { 
            ethers.utils.parseUnits(donation, 'ether')
        } catch (e) {
            toast('Please enter a valid donation amount')
            return 
        }
        onSubmit(name, message, donation);
        setName('');
        setMessage('');
    }
    return (
        <FormWrapper>
            <StyledInput placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />           
            <StyledTextArea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <StyledInput type='number' placeholder="0.0000" value={donation} onChange={(e) => setDonation(e.target.value)} />
            <SubmitWrapper>
                <StyledButton onClick={() => handleSubmit()}>Submit</StyledButton>
            </SubmitWrapper>
        </FormWrapper>
    )
}