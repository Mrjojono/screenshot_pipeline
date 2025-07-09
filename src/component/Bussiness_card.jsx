import  utils from "../utils.js";
import {useState,useEffect} from "react";
function Bussiness_card() {
    const [name,setName] = useState('');
    const [job,setJob] = useState('');
    const [website,setWebsite] = useState('');
    const [email,setEmail] = useState('');
    const [linkdin,setLinkdin] = useState('');
    const [picture,setPicture] = useState('');
    const [about,setAbout] = useState('');
    const [interest,setInterest] = useState('');

useEffect(()=>{
    try {
        const data = utils.Readcard();
        setName(data.name)
        setJob(data.job)
        setEmail(data.email)
        setLinkdin(data.linkdin)
        setPicture(data.picture)
        setWebsite(data.website)
        setAbout(data.about)
        setInterest(data.interest)
        console.log(data.picture)


    }catch (e) {
        console.log(e)

    }
},[])
console.log(picture)




    return (
        <>
           <div className="bg-[#1A1B21] shadow-blue-700 shadow-lg rounded-lg mt-10  ml-auto mr-auto w-[30%] flex flex-col">
               <div>
                   <img className="h-72 w-[350px] p-4  ml-auto mr-auto" src={picture} alt="images"/>
               </div>
               <div className="flex flex-col">
                   <span className="text-3xl text-white">{name}</span>
                   <span className=" text-amber-600">{job? job : "no job found"}</span>
                   <span className=" text-white">{website}</span>
               </div>
               <div className="flex justify-center mt-2 gap-10 flex-row">
                   <button className="bg-white text-black rounded-lg p-3" type="submit">
                            <a href={email}>
                                Email
                            </a>
                   </button>
                   <button className="bg-blue-600 text-white rounded-lg p-3" type="submit">
                            <a href={linkdin}>
                                Linkdin
                            </a>
                   </button>
               </div>
               <div className="ml-auto mr-auto ">
                   <div className="text-white ml-auto mr-auto  flex flex-col">
                       <h1 className="items-start p-3 mr-auto text-2xl font-bold ">About</h1>
                       <p className="text-justify flex flex-wrap  p-3">
                           {about}
                       </p>

                   </div>
                   <div className="text-white  ml-auto mr-auto  flex flex-col">
                       <h1 className="items-start p-3 mr-auto text-2xl font-bold  ">Interest</h1>
                       <p className="text-justify flex flex-wrap p-3">
                           {interest}
                       </p>

                   </div>
               </div>

           </div>
        </>
    )
}
export  default Bussiness_card;