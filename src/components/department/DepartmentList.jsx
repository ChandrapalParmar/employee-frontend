import {Link} from "react-router-dom"
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper"
import { useEffect, useState } from "react"
import axios from "axios"

const DepartmentList = () => {
  const [departments,setDepartments] =useState([])
  const [depLoading,setDepLoading] =useState(false)
  const [filterDepartment, setFilterDepartment] =useState([])

  const onDepartmentDelete = () =>{
      fetchDepartments()
  }
  const fetchDepartments =async()=>{
      setDepLoading(true)
      try{
        const response =await axios.get('https://employee-backend-nu.vercel.app/api/department',{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          let sno=1;
          const data = await response.data.departments.map((dep)=>({
            _id:dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
          }))
          setDepartments(data)
          setFilterDepartment(data)
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } finally{
        setDepLoading(false)
      }
    }

  useEffect(()=>{
    fetchDepartments()
  },[])

  const filterDepartments=(e)=>{
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDepartment(records)
  }

  return (
    <>{depLoading ? <div>Loading....</div> :
       <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center">
        <input type="text" placeholder="Search by Dep Name" 
        className="px-4 py-0.5 border"
        onChange={filterDepartments}
        />
        <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Department</Link>
      </div>
      <div className="mt-5">
        <DataTable
         columns={columns} data={filterDepartment} pagination 
        />
      </div>
    </div>
    }</>
  )
}

export default DepartmentList