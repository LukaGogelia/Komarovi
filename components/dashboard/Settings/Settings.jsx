"use client";

import React, { useState } from "react";
import EditProfile from "./editProfile/EditProfile";
import Password from "./Password";
import SocialProfiles from "./socialProfiles/SocialProfiles";
import CloseAccount from "./CloseAccount";
import FooterNine from "@/components/layout/footers/FooterNine";
import Notification from "./Notifications";
import { useSession } from "next-auth/react";

const buttons = [
  "Edit Profile",
  "Password",
  "Social Profiles",
  "Notifications",
  "Close Account",
];

export default function Settings({ editProfileProps, socialProfilesProps }) {
  const [activeTab, setActiveTab] = useState(1);
  // const { status, data: session } = useSession();
  // console.log(editProfileProps);
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Settings</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__controls d-flex justify-content-around x-gap-30 y-gap-20 flex-wrap items-center pt-20 px-30 border-bottom-light js-tabs-controls">
                  {buttons.map((elm, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i + 1)}
                      className={`tabs__button text-light-1 js-tabs-button ${activeTab == i + 1 ? "is-active" : ""
                        } `}
                      type="button"
                    >
                      {elm}
                    </button>
                  ))}
                </div>

                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <EditProfile
                    activeTab={activeTab}
                    editProfileProps={editProfileProps}
                  />
                  <Password activeTab={activeTab} />
                  <SocialProfiles
                    activeTab={activeTab}
                    socialProfilesProps={socialProfilesProps}
                  />
                  <Notification activeTab={activeTab} />
                  <CloseAccount activeTab={activeTab} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
