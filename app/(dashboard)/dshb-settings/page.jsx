














import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Preloader from '@/components/common/Preloader'
import Settings from '@/components/dashboard/Settings/Settings'
import Sidebar from '@/components/dashboard/Sidebar'
import HeaderDashboard from '@/components/layout/headers/HeaderDashboard'
import getPersonById from '@/data/mongoDb/getPersonById'
import extractDate from '@/utils/extractDate'
import { getServerSession } from 'next-auth'
import React from 'react'
export const metadata = {
  title: 'Dashboard-settings || Educrat - Professional LMS Online Education Course NextJS Template',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',

}
export default async function page() {
  const session = await getServerSession(authOptions);
  const person = await getPersonById(session.user.name);

  const birthDate = extractDate(person.birthDate);
  const editProfileProps = {
    firstName: person.firstName,
    lastName: person.lastName,
    nationalId: person.nationalId,
    birthDate: birthDate,
    initialState: {
      previewImage: person.profilePictureUrl,
      selectedFile: null,
      phone: person.phone,
      email: person.email,
      selectedRegions: {
        registration: person.registrationAddress.region,
        actual: person.actualAddress.region
      },
      selectedUnits: {
        registration: person.registrationAddress.adminUnit,
        actual: person.actualAddress.adminUnit
      },
      addresses: {
        registration: person.registrationAddress.addressLine,
        actual: person.actualAddress.addressLine
      }
    }
  }
  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div id='dashboardOpenClose' className="dashboard -home-9 js-dashboard-home-9">
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />

            </div>
            <Settings editProfileProps={editProfileProps} />
          </div>
        </div>
      </main>
    </div>
  )
}
