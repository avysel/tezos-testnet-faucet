import { Table } from "react-bootstrap";

function Home() {
    return (
        <>
            <Table className="faucet-list">
                <thead>
                    <tr>
                        <th>Network</th>
                        <th>Faucet</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ghostnet</td>
                        <td><a href='https://ghostnet-faucet.netlify.app/' target='_blank'>ghostnet-faucet.netlify.app</a></td>
                    </tr>
                    <tr>
                        <td>Jakartanet</td>
                        <td><a href='https://jakartanet-faucet.netlify.app/' target='_blank'>jakartanet-faucet.netlify.app</a></td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default Home;