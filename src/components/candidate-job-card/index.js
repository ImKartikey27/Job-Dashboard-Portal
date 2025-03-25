"use client";

import { Fragment, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";
function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

//   console.log(jobApplications);

  async function handlejobApply() {
    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawer(false);
  }
//   console.log(jobApplications);

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobItem.title}
          description={jobItem.companyName}
          footerContent={
            <DrawerTrigger>
              <Button className="dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5">
                View Details
              </Button>
            </DrawerTrigger>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handlejobApply}
                  disabled={
                    jobApplications.findIndex(
                      (item) => item.jobID === jobItem?._id
                    ) > -1
                      ? true
                      : false
                  }
                  className="dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
                >
                  
                    {
                        jobApplications.findIndex(
                          (item) => item.jobID === jobItem?._id
                        ) > -1
                          ? 'Applied'
                          : 'Apply'
                  }
                </Button>

                <Button
                  className="dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
                  onClick={() => setShowJobDetailsDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium text-gray-600">
            {jobItem?.description}
            <span className="text-xl ml-4 font-normal text-gray-500">
              {jobItem?.location}
            </span>
          </DrawerDescription>

          <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]">
            <h2 className="text-xl font-bold text-white">{jobItem?.type}</h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">
            Experience : {jobItem?.experience}
          </h3>

          <div className="flex gap-4 mt-6">
            {jobItem?.skills.split(",").map((skillItem) => (
              <div className="w-[150px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                <h2 className="text-[13-px] font-medium text-white">
                  {skillItem}
                </h2>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
export default CandidateJobCard;
