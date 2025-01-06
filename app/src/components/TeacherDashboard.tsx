import { useState } from "react"
import TeacherCourses from "./TeacherCourses"
import AddCourseForm from "./AddCourseForm"

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("add")
  return (
    <div className="w-full px-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("add")}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
              ${
                activeTab === "add"
                  ? "border-buttonPrimary text-buttonPrimary"
                  : "border-transparent text-gray-500 hover:border-gray-300"
              }`}
          >
            Dodaj nowy kurs
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
              ${
                activeTab === "list"
                  ? "border-buttonPrimary text-buttonPrimary"
                  : "border-transparent text-gray-500 hover:border-gray-300"
              }`}
          >
            Moje kursy
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === "add" ? (
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Dodaj nowy kurs</h2>
            <AddCourseForm />
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg">
            {/* <h2 className="text-2xl font-bold mb-4">Moje kursy</h2> */}

            <TeacherCourses />
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherDashboard
