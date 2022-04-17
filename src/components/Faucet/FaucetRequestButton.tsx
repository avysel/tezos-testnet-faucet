import React, { RefObject, useState } from "react";
import { importKey } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { Button, Spinner } from "react-bootstrap"
import { DropletFill } from "react-bootstrap-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { errorMapping } from "../../lib/Errors";
import config from '../../config/config.json';
import { getMainData, getPlainData, isValidTezosAddress, minifyTezosAddress } from "../../lib/Utils";
import axios from "axios";

function FaucetRequestButton({ to, network, status }: { to: string, network: any, status: any }) {

    const [isLocalLoading, setLocalLoading] = useState<boolean>(false)

    const recaptchaRef: RefObject<ReCAPTCHA> = React.createRef();

    const verifyAndSend = async () => {
        const token = await recaptchaRef.current?.executeAsync();

        try {
            let result = await axios.get(`https://tezos-testnet-faucet-backend.netlify.app/.netlify/functions/verify?token=${token}`);
            if (result.status == 200) {
                sendTransaction();
            }
        }
        catch (err) {
            console.log(err);
            status.setStatus("Forbidden");
            status.setStatusType("danger");
            status.setLoading(false);
            setLocalLoading(false);
        }
    }

    const checkCanSend = async (to: string, Tezos: TezosToolkit): Promise<{ ok: boolean, msg: string }> => {
        try {

            recaptchaRef.current?.execute();

            const userBalance = await Tezos.tz.getBalance(to);

            if (to == network.faucetAddress) {
                return { ok: false, msg: "From me to me? Not a good idea!" };
            }

            if (userBalance.toNumber() > 5000000) {
                return { ok: false, msg: "You have already enough ꜩ" };
            }

            if (!isValidTezosAddress(to)) {
                console.log(`${to} is not valid`)
                return { ok: false, msg: "Please synchronize your wallet or provide a valid address." };
            }
        }
        catch (error) {
            console.log(`error: ${error}`);
            return { ok: false, msg: "Please synchronize your wallet or provide a valid address." };
        }
        return { ok: true, msg: "ok" };
    }

    const sendTransaction = async () => {
        status.setLoading(true);
        setLocalLoading(true);
        status.setStatus(null);
        status.setStatusType(null);

        const obj = JSON.parse(getPlainData(getMainData(network.checksum)));
        let Tezos: TezosToolkit = new TezosToolkit(network.rpcUrl);

        const canSend: { ok: boolean, msg: string } = await checkCanSend(to, Tezos);

        if (!canSend.ok) {
            status.setStatus(`${canSend.msg}`);
            status.setStatusType("danger");
            status.setLoading(false);
            setLocalLoading(false);
            return;
        }

        importKey(
            Tezos,
            obj.email,
            obj.password,
            obj.mnemonic.join(' '),
            obj.activation_code
        );

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

    return (
        <>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={config.application.googleCaptchaSiteKey}
            />

            <Button
                variant="primary"
                disabled={status.isLoading || !to}
                onClick={verifyAndSend}
            >
                <DropletFill />&nbsp;
                {isLocalLoading ? `Sending 1 ꜩ to ${minifyTezosAddress(to)}` : `Request 1 ꜩ`}

                &nbsp;{isLocalLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ""}
            </Button>

        </>
    )
}

export default FaucetRequestButton;