import axios from "axios";
import { useState } from "react";
import '../Style/CallForm.css';

interface Calls {
  callType: string;
  callTitle: string;
  callDescription: string;
  callAttachments: number;
};

function CallForm () {
    
    const [formCall, setFormCall] = useState<Calls>({ callType: '', callDescription: '', callTitle: '', callAttachments: 0});

    async function postData(formCall: Calls) {
        try {
          const response = await axios.post('http://localhost:3001/call/createCall', formCall);
          console.log(response.data); // Dados retornados pela API após a criação do registro
        } catch (error) {
          console.error(error);
        }
      }

      function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormCall({
          ...formCall,
          [event.target.name]: event.target.value
        });
      }  

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        postData(formCall);

        setFormCall({callType: '', callDescription: '', callTitle: '', callAttachments: 0})
  }

          
return(
    <div>
        <form onSubmit={handleSubmit}>

        <label>
          Type:
            <input type="text" name="callType" value={formCall.callType} onChange={handleInputChange} />
        </label>

        <label>
          Title:
            <input type="text" name="callTitle" value={formCall.callTitle} onChange={handleInputChange} />
        </label>

        <label>
          Description:
            <input type="text" name="callDescription" value={formCall.callDescription} onChange={handleInputChange} />
        </label>
  

        <button type="submit">Enviar</button>
        </form>
    </div>
);
}

export default CallForm;