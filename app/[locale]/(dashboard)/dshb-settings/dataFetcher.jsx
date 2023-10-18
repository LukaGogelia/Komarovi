// import { useEffect, useState } from "react";
// import { getServerSession } from "next-auth";
// import getPersonById from "@/data/mongoDb/getPersonById";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import extractDate from "@/utils/extractDate";
// import Page from "./Page";

// const DataFetcher = async () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const session = await getServerSession(authOptions);
//       let editProfileProps, socialProfilesProps;

//       if (session) {
//         const person = await getPersonById(session?.user.name);
//         const birthDate = extractDate(person.birthDate);
//         editProfileProps = {
//           firstName: person.firstName,
//           lastName: person.lastName,
//           nationalId: person.nationalId,
//           birthDate: birthDate,
//           initialState: {
//             previewImage: person.profilePictureUrl,
//             selectedFile: null,
//             phone: person.phone,
//             email: person.email,
//             selectedRegions: {
//               registration: person.registrationAddress.region,
//               actual: person.actualAddress.region,
//             },
//             selectedUnits: {
//               registration: person.registrationAddress.adminUnit,
//               actual: person.actualAddress.adminUnit,
//             },
//             addresses: {
//               registration: person.registrationAddress.addressLine,
//               actual: person.actualAddress.addressLine,
//             },
//           },
//         };
//         socialProfilesProps = {
//           facebook: person.socialProfiles.facebook,
//           instagram: person.socialProfiles.instagram,
//           x: person.socialProfiles.x,
//           linkedIn: person.socialProfiles.linkedIn,
//         };
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Page
//       editProfileProps={data.editProfileProps}
//       socialProfilesProps={data.socialProfilesProps}
//     />
//   );
// };

// export default DataFetcher;
