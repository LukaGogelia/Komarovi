"use client";

import React, { useState } from "react";
import EditProfile from "./editProfile/EditProfile";
import Password from "./Password";
import SocialProfiles from "./socialProfiles/SocialProfiles";
import CloseAccount from "./CloseAccount";
import FooterNine from "@/components/layout/footers/FooterNine";
import Notification from "./Notifications";




export default function Settings({ editProfileProps, socialProfilesProps, words }) {
  const [activeTab, setActiveTab] = useState(1);

  const w = JSON.parse(words);
  const buttons = [
    w.editProfile,
    w.password,
    w.socialProfiles,
    w.notifications,
    w.closeAccount,
  ];
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">{w.h1}</h1>
            <div className="mt-10">
              {w.h2}
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
                    w={w}
                  />
                  <Password activeTab={activeTab} w={w} />
                  <SocialProfiles
                    activeTab={activeTab}
                    socialProfilesProps={socialProfilesProps}
                    w={w}
                  />
                  <Notification activeTab={activeTab} w={w} />
                  <CloseAccount activeTab={activeTab} w={w} />
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
