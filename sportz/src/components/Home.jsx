import React, { useEffect, useState } from 'react'
import "./Home.css"
const Home = () => {
    const [playerdata, setPlayerdata] = useState([]);
    const [teamdata, setTeamdata] = useState([]); 
    const [input,setInput] = useState("")
    const [searchPlayer, setSearchPlayer]= useState({})
    const [showSearch,setshowSearch] = useState(false)

    const getPlayerData = async () =>{
    try{    const req = await fetch(`https://api.npoint.io/20c1afef1661881ddc9c`)
            const res = await req.json();

            setPlayerdata(res.playerList); 
            setTeamdata(res.teamsList)
            } catch(e) {
                console.log(e)
            }
       }
     
       useEffect((e)=>{  
           getPlayerData() 
        },[]) 
        var newData = playerdata.sort((a,b)=>a.Value - b.Value) 
        const handelSearch = ()=>{
           const searchData= newData.find((el)=> el.PFName == input)
           setSearchPlayer(searchData)
           setshowSearch(true)
        }

        const handleCancel = () => {
            setshowSearch(false)
            setInput('')
        }
        console.log(playerdata)
  return (
     <>
     <div className='main_box'> 
     <div className='search_box'>
        <input className='search' type="text" placeholder='Search your player by name' onChange={(el)=>setInput(el.target.value)} />
    
        <button className='btn' onClick={handelSearch} >Search</button>
     </div>
     {showSearch ? 
     Object.keys(searchPlayer).length > 0 && (  
            <div className='cont'> 
              <div className='player'> 
                <div style={{width:"100%",height:"60%"}}> 
                    <img style={{width:"100%",height:"100%"}} src={`player-images/${searchPlayer.Id}.jpg`} alt={`player-images/${searchPlayer.Id}.jpg`} />
                </div>
                 <div className='text'> 
                    <p>{"Name : "+searchPlayer.PFName}</p>
                    <p>{"Skill : "+searchPlayer.SkillDesc}</p> 
                    <p>{"Value : "+searchPlayer.Value+" $"}</p> 
                    <div>{searchPlayer.UpComingMatchesList.map((d)=>{
                        return <>
                        <p>{"Upcoming match : "+d.CCode+" vs "+ d.VsCCode}</p>
                        <p>{"Match time : "+ d.MDate}</p>
                        </>
                    })}</div>
                 <button style={{width:"80px" ,height:"40px", margin:" 20px 110px"}} onClick={handleCancel}>Cancel</button>
                 </div>
             </div> 
     </div>)
     :
     <div className='container'>
         {newData.map((el)=>{
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
     </div> }
     </div>

     </>
  )
}

export default Home