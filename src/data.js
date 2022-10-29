function Data(){
return (
    <div>
<h1>Welcome to my App. <br />Please fill the details for your car registration</h1>
      <div className="main">
     <div className="halfone">{<Inputform />} </div>
     <div className="halftwo"> {<ShowData />}</div>
     </div>
     </div>
)
}
export default Data;