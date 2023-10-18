"use client";

import React from "react";

export default function Notifications({ activeTab, w }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className={`tabs__pane -tab-item-4 ${activeTab == 4 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="row">
          <div className="col-12">
            <div className="text-16 fw-500 text-dark-1">
              {w.notificationsTitle}
            </div>
            <p className="text-14 lh-13 mt-5">
              {w.selectPushEmail}
            </p>
          </div>
        </div>

        <div className="pt-60">
          <div className="row y-gap-20 justify-between">
            <div className="col-auto">
              <div className="text-16 fw-500 text-dark-1">
                {w.chooseNotificationPreference}
              </div>
            </div>
          </div>

          <div className="pt-30">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">{w.clubs}</div>
                <p className="text-14 lh-13 mt-5">
                  {w.notifyClubs}
                </p>
              </div>
              <div className="col-auto">
                <div className="form-switch">
                  <div className="switch" data-switch=".js-switch-content">
                    <input type="checkbox" />
                    <span className="switch__slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-top-light pt-20 mt-20">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">
                  {w.recommendedClubs}
                </div>
                <p className="text-14 lh-13 mt-5">
                  {w.notifyRecommendedClubs}
                </p>
              </div>
              <div className="col-auto">
                <div className="form-switch">
                  <div className="switch" data-switch=".js-switch-content">
                    <input type="checkbox" />
                    <span className="switch__slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-top-light pt-20 mt-20">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">
                  {w.gradesAndHousePoints}
                </div>
                <p className="text-14 lh-13 mt-5">
                  {w.notifyGrades}
                </p>
              </div>
              <div className="col-auto">
                <div className="form-switch">
                  <div className="switch" data-switch=".js-switch-content">
                    <input type="checkbox" />
                    <span className="switch__slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-top-light pt-20 mt-20">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">
                  {w.activityOnMyComments}
                </div>
                <p className="text-14 lh-13 mt-5">
                  {w.notifyConnemts}
                </p>
              </div>
              <div className="col-auto">
                <div className="form-switch">
                  <div className="switch" data-switch=".js-switch-content">
                    <input type="checkbox" />
                    <span className="switch__slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-60">
          <div className="row y-gap-20 justify-between">
            <div className="col-auto">
              <div className="text-16 fw-500 text-dark-1">
                {w.emailNotifications}
              </div>
            </div>
          </div>

          <div className="pt-30">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">
                  {w.emailAboutCurriculum}
                </div>
                {/* <p className="text-14 lh-13 mt-5">
                  Notify me about activity from the profiles I'm subscribed to
                </p> */}
              </div>
              <div className="col-auto">
                <div className="form-switch">
                  <div className="switch" data-switch=".js-switch-content">
                    <input type="checkbox" />
                    <span className="switch__slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-top-light pt-20 mt-20">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">
                  {w.emailAboutChallenges}
                </div>
                {/* <p className="text-14 lh-13 mt-5">
                  Notify me about activity from the profiles I'm subscribed to
                </p> */}
              </div>
              <div className="col-auto">
                <div className="form-switch">
                  <div className="switch" data-switch=".js-switch-content">
                    <input type="checkbox" />
                    <span className="switch__slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-top-light pt-20 mt-20">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">
                  {w.emailAboutNews}
                </div>
                {/* <p className="text-14 lh-13 mt-5">
                  Notify me about activity from the profiles I'm subscribed to
                </p> */}
              </div>
              <div className="col-auto">
                <div className="form-switch">
                  <div className="switch" data-switch=".js-switch-content">
                    <input type="checkbox" />
                    <span className="switch__slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-30">
          <div className="col-12">
            <button className="button -md -purple-1 text-white">
              {w.saveChanges}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
