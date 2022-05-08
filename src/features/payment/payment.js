import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import RadioGroup from '../../Components/radio-group/radio-group';
import RadioCard from '../../Components/radio-card/radio-card';
import { CardHeader } from '../../Components/card-header/card-header';
import { ButtonGroup } from '../../Components/button-group/button-group';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
const Payment = ({
    flexStart = false,
}) => {
    const paymentOption = [
        { id: '1', title: 'Cash On Delivery' },
        { id: '2', title: 'Credit / Debit card (BD)' },
        { id: '3', title: 'Mobile Banking' }
    ];
    const dispatch = useAppDispatch();
    const payment_method = useAppState("paymentOption");
    return (
        <>
            <CardHeader>
                <FormattedMessage
                    id='contactNumberText'
                    defaultMessage='Select Payment Option'
                />
            </CardHeader>
            <ButtonGroup flexStart={flexStart}>
                <RadioGroup
                    items={paymentOption}
                    component={(item) => (
                        <RadioCard
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            content={item.id}
                            checked={item.id === payment_method}
                            onChange={() =>
                                dispatch({
                                    type: 'SET_PAYMENT_OPTION',
                                    payload: item.id.toString(),
                                })
                            }
                            name='contact'
                        />
                    )}
                />
            </ButtonGroup>
        </>
    );
};

export default Payment;
