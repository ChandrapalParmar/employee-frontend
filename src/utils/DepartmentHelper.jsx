import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns= [
    {
        name: "$ No",
        selector: (row) => row.sno
    },
    {
        name:"Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name:"Action",
        selector: (row)=> row.action
    },
]

export const DepartmentButtons =({Id,onDepartmentDelete})=>{
    const navigate=useNavigate()

    const handleDelete = async (id)=>{
        const confirm = window.confirm("Do you want to Delete?")
    if(confirm) {
     try {
        const response =await axios.delete(`https://employee-backend-nu.vercel.app/api/department/${id}`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        })
        if(response.data.success){
            onDepartmentDelete()             
        }
      } catch(error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
    }
}
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={()=> navigate(`/admin-dashboard/department/${Id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white"
            onClick={() => handleDelete(Id)}
            >Delete</button>
        </div> 
    )
}
