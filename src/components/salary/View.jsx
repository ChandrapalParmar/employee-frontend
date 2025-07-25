import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"

const View = () => {
    const [salaries, setSalaries] = useState(null)
    const [filterSalaries, setFilterSalaries] = useState(null)
    const { user } = useAuth()
    let sno = 1

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(
                `https://employee-backend-nu.vercel.app/api/salary/${user._id}/${user.role}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            if (response.data.success) {
                setSalaries(response.data.salary)
                setFilterSalaries(response.data.salary)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        fetchSalaries()
    }, [])

    const filterSalarie = (q) => {
        const filterRecords = salaries.filter((salary) =>
            salary.employeeId.employeeId
                .toLowerCase()
                .includes(q.toLowerCase())
        )
        setFilterSalaries(filterRecords)
    }

    return (
        <>
            {filterSalaries === null ? (
                <div>Loading.........</div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input
                            type="text"
                            placeholder="Search By Emp ID"
                            className="border px-2 rounded-md py-0.5 border-gray-300"
                            onChange={(e) => filterSalarie(e.target.value)}
                        />
                    </div>

                    {filterSalaries && filterSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterSalaries.map((salary) => (
                                    <tr
                                        key={salary._id}
                                        className="bg-gray-50 border-b dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{sno++}</td>
                                        <td className="px-6 py-3">
                                            {salary.employeeId.employeeId}
                                        </td>
                                        <td className="px-6 py-3">{salary.basicSalary}</td>
                                        <td className="px-6 py-3">{salary.allowances}</td>
                                        <td className="px-6 py-3">{salary.deductions}</td>
                                        <td className="px-6 py-3">{salary.netSalary}</td>
                                        <td className="px-6 py-3">
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No Records</div>
                    )}
                </div>
            )}
        </>
    )
}

export default View
