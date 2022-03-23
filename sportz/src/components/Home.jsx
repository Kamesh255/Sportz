import React, { useEffect, useState } from 'react'
import "./Home.css"
const Home = () => {
    const [playerdata, setPlayerdata] = useState([]);
    const [teamdata, setTeamdata] = useState([]); 
    const getPlayerData = async () =>{
    try{    const req = await fetch(`https://api.npoint.io/20c1afef1661881ddc9c`)
            const res = await req.json();
            setPlayerdata(res.playerList);
            setTeamdata(res.teamsList)
            } catch(e) {
                console.log(e)
            }
       }
       useEffect(()=>{
           getPlayerData()
       },[]) 
       console.log(playerdata)
       console.log(teamdata)
  return (
     <>
     <div className='main_box'> 
     <div className='search_box'>
        <input className='search' type="text" placeholder='Search your player by name' />
        <button className='btn'>Search</button>
     </div>
     <div className='container'>
         {playerdata.map((el)=>{
             return <div className='player'> 
                <div style={{width:"100%",height:"60%"}}> 
                    <img style={{width:"100%",height:"100%"}} src={`player-images/${el.Id}.jpg`} alt={`player-images/${el.Id}.jpg`} />
                </div>
                 <div className='text'> 
                    <p>{"Name : "+el.PFName}</p>
                    <p>{"Skill : "+el.SkillDesc}</p>
                    <p>{"Value : "+el.Value+" $"}</p> 
                    <div>{el.UpComingMatchesList.map((d)=>{
                        return <>
                        <p>{"Upcoming match : "+d.CCode+" vs "+ d.VsCCode}</p>
                        <p>{"Match time : "+ d.MDate}</p>
                        </>
                    })}</div>
                 </div>
             </div>
         })}
     </div>
     </div>

     </>
  )
}

export default Home