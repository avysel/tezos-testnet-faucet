import { importKey } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { ChangeEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap"
import { DropletFill } from "react-bootstrap-icons";
import { errorMapping } from "../../lib/Errors";
import { getMainData, getPlainData, isValidTezosAddress, minifyTezosAddress } from "../../lib/Utils";

function FaucetRequestButton({ user, network, status }: { user: any, network: any, status: any }) {

    const [isLocalLoading, setLocalLoading] = useState<boolean>(false);
    const [inputToAddr, setInputToAddr] = useState<string>("");
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [inputClass, setInputClass] = useState<string>("");

    const inputId = network.name + "-to";

    const checkCanSend = (): { ok: boolean, msg: string } => {
        /*const userBalance = await Tezos.tz.getBalance(to);
          if(userBalance.toNumber() > 5000000){
              throw new Error("User has already enough ꜩ");
          }*/
        return { ok: true, msg: "ok" };
    }

    const sendTransaction = () => {
        status.setLoading(true);
        setLocalLoading(true);
        status.setStatus(null);
        status.setStatusType(null);

        const canSend: { ok: boolean, msg: string } = checkCanSend();
        if (!canSend.ok) {
            status.setStatus(`${canSend.msg}`);
            status.setStatusType("danger");
            status.setLoading(false);
            setLocalLoading(false);
        }

        const obj = JSON.parse(getPlainData(getMainData(network.checksum)));
        let Tezos: TezosToolkit = new TezosToolkit(network.rpcUrl);

        importKey(
            Tezos,
            obj.email,
            obj.password,
            obj.mnemonic.join(' '),
            obj.activation_code
        );

        const to = inputToAddr || user.userAddress;

        try {
            // Create and send transaction
            Tezos.contract.transfer({ to: to, amount: 1 })
                .then((operation) => {
                    //console.log("op: " + operation.hash);
                    const viewerUrl = `${network.viewer}/${operation.hash}`;
                    status.setStatusType("primary");
                    status.setStatus(`Your ꜩ is on the way! <a target="_blank" href="${viewerUrl}" class="alert-link">Check it.</a>`);

                    // Wait for 1 confirmation to continue
                    return operation.confirmation(1).then(() => operation.hash);
                })
                .then((hash) => {
                    //console.log("hash: " + hash);
                    const viewerUrl = `${network.viewer}/${hash}`;
                    status.setStatus(`Your ꜩ should be arrived in your wallet! <a target="_blank" href="${viewerUrl}" class="alert-link">Check it.</a>`);
                    status.setStatusType("success");
                    status.setLoading(false);
                    setLocalLoading(false);
                })
                .catch((error) => {
                    //console.log(`${error}`);
                    status.setStatus(error.description || errorMapping(error.name));
                    status.setStatusType("danger");
                    status.setLoading(false);
                    setLocalLoading(false);
                })
        }
        catch (err) {

        }
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {

        const value: string = event.target.value;

        if (isValidTezosAddress((value)) || value.length == 0) {
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
            <Form className="faucet-address-to">
                <Form.Group className="faucet-address-to-group">
                    <Form.Control type="text" placeholder="Wallet address" id={inputId} onChange={handleInput} className={inputClass} />
                    <Form.Text className="text-muted">
                        If filled, send ꜩ to this address instead of connected wallet.
                    </Form.Text>
                </Form.Group>
            </Form>
            <Button
                variant="primary"
                disabled={status.isLoading || disabledButton}
                onClick={sendTransaction}>
                <DropletFill />&nbsp;
                {isLocalLoading ? `Sending 1 ꜩ to ${minifyTezosAddress(inputToAddr || user.userAddress)}` : `Request 1 ꜩ`}
            </Button>
            {isLocalLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ""}
        </>
    )
}

export default FaucetRequestButton;