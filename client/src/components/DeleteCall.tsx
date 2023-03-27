import axios from "axios";
import { useState, useEffect } from "react";
import { Calls } from "../types";

function DeleteCall({ IdCall }: { IdCall: number }) {

    const [formCallId, setFormCallId] = useState<Calls>();

    useEffect(() => {
        getFormCallId(IdCall);
    }, [IdCall]);

    console.log(IdCall);

    async function getFormCallId(IdCall: number) {
        try {
            const response = await axios.get<Calls>(`http://localhost:3001/call/${IdCall}`);
            setFormCallId(response.data);
        } catch (error) {
            console.error(error);
        }
        console.log(formCallId?.id);
        
    }

    return <div>Oi</div>
}

export default DeleteCall