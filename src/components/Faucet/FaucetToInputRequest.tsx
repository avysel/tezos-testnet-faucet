import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap"
import { isValidTezosAddress } from "../../lib/Utils";
import FaucetRequestButton from "./FaucetRequestButton";

function FaucetToInputRequest({ network, status }: { network: any, status: any }) {

    const [inputToAddr, setInputToAddr] = useState<string>("");
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [inputClass, setInputClass] = useState<string>("");

    const inputId = network.name + "-to";

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {

        const value: string = event.target.value;

        if (isValidTezosAddress(value) || value.length == 0) {
            setInputToAddr(value);
            setDisabledButton(false);

            if (value.length > 0)
                setInputClass("is-valid");
            else
                setInputClass("");
        }
        else {
            setDisabledButton(true);
            setInputClass("is-invalid");
        }
    };

    return (
        <>
            <Form.Group className="faucet-address-to">
                <Form.Control type="text" placeholder="Wallet address" id={inputId} onChange={handleInput} className={inputClass} />
            </Form.Group>

            <FaucetRequestButton network={network} to={inputToAddr} status={status} />
        </>
    )
}

export default FaucetToInputRequest;