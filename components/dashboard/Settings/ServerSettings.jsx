import React from 'react'
import Settings from './Settings'
import { useTranslations } from "next-intl";

const ServerSettings = ({ editProfileProps, socialProfilesProps }) => {

    const t = useTranslations('dshb-settings');
    const keys = [
        "h1", "h2", "editProfile", "password", "socialProfiles", "notifications", "closeAccount",
        "enterActiveEmail", "enterPrimaryPhone", "firstName", "lastName", "nationalIdNumber",
        "birthday", "telephoneNumber", "email", "region", "registration", "address", "actual", "adminUnit",
        "updateProfile", "imageRequirementDescription", "yourAvatar", "currentPassword", "actualAddress",
        "newPassword", "confirmNewPassword", "savePassword", "formerTwitter", "xProfileURL", "registrationAddress",
        "facebook", "facebookProfileURL", "instagram", "instagramProfileURL", "linkedin",
        "linkedinProfileURL", "saveSocialProfile", "closeAccountPrompt", "enterPassword",

        "closeAccountWarning", "notificationsTitle", "selectPushEmail", "chooseNotificationPreference", "saveChanges",
        "clubs", "notifyClubs", "recommendedClubs", "notifyRecommendedClubs", "gradesAndHousePoints", "notifyGrades",
        "activityOnMyComments", "notifyConnemts", "emailNotifications", "emailAboutCurriculum", "emailAboutChallenges",
        "emailAboutNews", "currentPasswordRequired", "newPasswordRequired", "passwordLength", "passwordDoNotMatch", "unexpectedError",
        "invalidEmailFormat", "invalidPhoneFormat", "invalidURL"
    ];
    const words = {};

    keys.forEach(key => {
        words[key] = t(key);
    });


    return (

        <Settings editProfileProps={editProfileProps} socialProfilesProps={socialProfilesProps} words={JSON.stringify(words)} />

    )
}

export default ServerSettings