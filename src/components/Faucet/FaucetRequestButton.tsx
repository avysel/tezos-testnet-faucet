import React, { RefObject, useState } from "react";
import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { Button, Spinner } from "react-bootstrap"
import { DropletFill } from "react-bootstrap-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { errorMapping } from "../../lib/Errors";
import Config from "../../Config";
import { getMainData, getPlainData, isValidTezosAddress, minifyTezosAddress } from "../../lib/Utils";
import axios from "axios";

function FaucetRequestButton({ to, network, status }: { to: string, network: any, status: any }) {

    const [isLocalLoading, setLocalLoading] = useState<boolean>(false)
    const [verified, setVerified] = useState<boolean>(false);

    const recaptchaRef: RefObject<ReCAPTCHA> = React.createRef();

    const startLoading = () => {
        status.setLoading(true);
        setLocalLoading(true);
        status.setStatus(null);
        status.setStatusType(null);
    }

    const stopLoadingSuccess = (message: string) => {
        status.setStatus(message);
        status.setStatusType("success");
        status.setLoading(false);
        setLocalLoading(false);
    }

    const stopLoadingError = (message: string) => {
        status.setStatus(message);
        status.setStatusType("danger");
        status.setLoading(false);
        setLocalLoading(false);
    }

    const verifyAndSend = async () => {

        if (verified) {
            sendTransaction();
        }
        else {
            console.log(`Check captcha ...`);
            const token = await recaptchaRef.current?.executeAsync();
            console.log("Checked");

            try {
                let result = await axios.get(`https://tezos-testnet-faucet-backend.netlify.app/.netlify/functions/verify?token=${token}`);
                if (result.status == 200) {
                    console.log("Captcha ok, send tx")
                    sendTransaction();
                    setVerified(true);
                }
                else {
                    console.log(result);
                }
            }
            catch (err) {
                console.log(err);
                stopLoadingError("Forbidden");
            }
        }
    }

    const checkCanSend = async (to: string, Tezos: TezosToolkit): Promise<{ ok: boolean, msg: string }> => {
        try {

            recaptchaRef.current?.execute();

            const userBalance: number = (await Tezos.tz.getBalance(to)).toNumber();

            if (to == network.faucetAddress) {
                return { ok: false, msg: "From me to me? Not a good idea!" };
            }

            if (userBalance > 5000000) {
                return { ok: false, msg: "You have already enough ???" };
            }

            if (!isValidTezosAddress(to)) {
                console.log(`${to} is not valid`)
                return { ok: false, msg: "Please synchronize your wallet or provide a valid address." };
            }
        }
        catch (error) {
            console.log(`error: ${error}`);
            return { ok: false, msg: `${error}` };
        }
        return { ok: true, msg: "ok" };
    }

    const sendTransaction = async () => {
        startLoading();

        let Tezos: TezosToolkit = new TezosToolkit(network.rpcUrl);

        const canSend: { ok: boolean, msg: string } = await checkCanSend(to, Tezos);

        if (!canSend.ok) {
            stopLoadingError(`${canSend.msg}`);
            return;
        }

        Tezos.setProvider({ signer: await InMemorySigner.fromSecretKey(getPlainData(getMainData(network.checksum))) });

        try {
            // Create and send transaction
            Tezos.contract.transfer({ to: to, amount: 1 })
                .then((operation) => {
                    console.log("Operation: " + operation.hash);
                    const viewerUrl = `${network.viewer}/${operation.hash}`;
                    status.setStatusType("primary");
                    status.setStatus(`Your ??? is on the way! <a target="_blank" href="${viewerUrl}" class="alert-link">Check it.</a>`);

                    // Wait for 1 confirmation to continue
                    return operation.confirmation(1).then(() => operation.hash);
                })
                .then((hash) => {
                    console.log("Hash: " + hash);
                    const viewerUrl = `${network.viewer}/${hash}`;
                    stopLoadingSuccess(`Your ??? should be arrived in your wallet! <a target="_blank" href="${viewerUrl}" class="alert-link">Check it.</a>`);
                })
                .catch((error) => {
                    //console.log(`${error}`);
                    stopLoadingError(error.description || errorMapping(error.name));
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
                sitekey={Config.application.googleCaptchaSiteKey}
            />

            <Button
                variant="primary"
                disabled={status.isLoading || !to}
                onClick={verifyAndSend}
            >
                <DropletFill />&nbsp;
                {isLocalLoading ? `Sending 1 ??? to ${minifyTezosAddress(to)}` : `Request 1 ???`}

                &nbsp; {isLocalLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ""}
            </Button>

        </>
    )
}

export default FaucetRequestButton;