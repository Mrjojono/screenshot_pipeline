import {useState} from "react";
import InputCustom from "../component/InputCustom.jsx";
import utils from "../utils.js";
function Home(){
    const [name,setName] = useState();
    const [job,setJob] = useState();
    const [website,setWebsite] = useState();
    const [email,setEmail] = useState();
    const [linkdin,setLinkdin] = useState();
    const [picture,setPicture] = useState();
    const [about,setAbout] = useState();
    const [interest,setInterest] = useState();

    const champ =
        [
            {id:"employe",title:"job",type:"text", set:setJob},
            {id:"name",title:"name",type:"text",set:setName},
            {id:"website",title:" Website",type:"text",set:setWebsite},
            {id:"email",title:"Email",type:"email",set:setEmail},
            {id:"linkdin",title:"Yours Linkdin",type:"text",set:setLinkdin},
            {id:"picture",title:"Past your image url here",type:"text",set:setPicture},
            {id:"about",title:"about",type:"text",set:setAbout},
            {id:"interest",title:"interest",type:"text",set:setInterest},
        ]
    ;

    const  handleSubmit = ()=>{
      let   data = {
            name,
            website,
            email,
            job,
            linkdin,
            picture,
            about,
            interest
        }
        console.log(data)
       const response = utils.Addcards(data);
        if (response.success){
            console.log("reussi")
        }else if (response.error){
            console.log("echouer")
        }

    }




    return (
        <>
              <div className="bg-white   flex flex-wrap gap-16  p-3 rounded-lg  ml-auto mr-auto mt-[10%]  w-[60%]">
                      {champ.map((item)=>
                          (
                                    <InputCustom
                                        key={item.id}
                                        click={(e)=>{item.set(e.target.value)}}
                                    id={item.id}
                                    title={item.title}
                                    type={item.type}
                                    />
                          )
                      )}

                      <div  className="gap-3 flex flex-row text-white " >
                          <button className="bg-red-600 hover: p-2 rounded-lg " >
                              Annuler
                          </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-700 p-2 rounded-lg" type="submit">
                            Valider
                        </button>
                      </div>

              </div>
          </>
    )
}


export default Home;