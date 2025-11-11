import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddress, createTransferInstruction } from "@solana/spl-token";
import { useState } from "react";

const JIMMYA_MINT = new PublicKey(import.meta.env.VITE_JIMMYA_ADDRESS);
const DECIMALS = 9; // Ajusta según tu token

export default function SendJimmyAFun() {
    const { publicKey, sendTransaction, connected } = useWallet();
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");

    const handleSend = async () => {
        if (!connected || !publicKey) return alert("Conecta tu Phantom Wallet primero 😎");

        try {
            const connection = new window.solanaWeb3.Connection(
                "https://api.devnet.solana.com"
            );

            const senderTokenAddr = await getAssociatedTokenAddress(JIMMYA_MINT, publicKey);
            const recipientPubKey = new PublicKey(recipient);
            const recipientTokenAddr = await getAssociatedTokenAddress(JIMMYA_MINT, recipientPubKey);

            const tx = new Transaction().add(
                createTransferInstruction(
                    senderTokenAddr,
                    recipientTokenAddr,
                    publicKey,
                    Number(amount * 10 ** DECIMALS)
                )
            );

            setStatus("🎰 Tirando el mini-slot… suerte!");
            const signature = await sendTransaction(tx, connection);
            await connection.confirmTransaction(signature, "processed");

            setStatus(`🎉 Éxito! Enviado ${amount} $JIMMYA a ${recipient}. TX: ${signature}`);
        } catch (err) {
            console.error(err);
            setStatus(`💥 Error: ${err.message}`);
        }
    };

    return (
        <div style={{ padding: "1rem", background: "#111", color: "#ffd700", borderRadius: "12px", maxWidth: "400px", margin: "1rem auto", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center" }}>💸 Tip Cósmico $JIMMYA 💸</h2>
            <input
                placeholder="Dirección del destinatario"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #444" }}
            />
            <input
                placeholder="Cantidad $JIMMYA"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #444" }}
            />
            <button
                onClick={handleSend}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", background: "#ffd700", color: "#111", fontWeight: "bold", cursor: "pointer" }}
            >
                🎲 Enviar y girar!
            </button>
            <p style={{ marginTop: "0.5rem", textAlign: "center" }}>{status}</p>
        </div>
    );
}
