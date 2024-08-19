// import React, { useEffect } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useParams } from "react-router-dom";
// import { setSingleJob } from "@/redux/jobSlice";
// import { JOB_API_END_POINT } from "@/utils/constant";
// import { APPLICATION_API_END_POINT } from "@/utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// const JobDescription = () => {
//   // const isApplied = false;
//   const params = useParams()
//   const jobId = params.id;
//   const {singleJob} = useSelector(store => store.job);
//   const {user} = useSelector(store=>store.auth);
//   const dispatch = useDispatch();
//   const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

//   const applyJobHandler = async()=>{
  
//     try {
//       const response = await fetch(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
//         method: 'GET',
//         credentials: 'include',
//       });
      
//       const data = await response.json();
//       console.log(data)
      
//       if (response.ok && data.success) {
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('An error occurred while processing the request.');
//     }
//   }

//   useEffect(() => {
//     const fetchSingleJobs = async () => {
//       try {
//         const response = await fetch(`${JOB_API_END_POINT}/get/${jobId}`, {
//           method: "GET",
//           credentials: "include",
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             dispatch(setSingleJob(data.job));
//           }
//         } else {
//           console.log("Network response was not ok.");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSingleJobs();
//   }, [jobId,dispatch,user?._id]);
//   return (
//     <div className="max-w-7xl mx-auto my-10">
//       <div className="flex justify-between">
//         <div>
//           <h1 className="font-bold text-xl">{singleJob?.title}</h1>
//           <div className="flex items-center gap-2 mt-4">
//             <Badge className={"text-blue-700 font-bold"} variant="ghost">
//               {singleJob?.position} Position
//             </Badge>
//             <Badge className={"text-[#F83002] font-bold"} variant="ghost">
//             {singleJob?.jobType}
//             </Badge>
//             <Badge className={"text-[#7209B7] font-bold"} variant="ghost">
//             {singleJob?.salary}LPA
//             </Badge>
//           </div>
//         </div>
//         <Button
//         onClick={isApplied ? null : applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg ${
//             isApplied
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-[#7209B7] hover:bg-[#5f32ad]"
//           }`}
//         >
//           {" "}
//           {isApplied ? "Already Applied" : "Apply Now "}
//         </Button>
//       </div>
//       <h1 className="border-b-2 border-b-gray-300 font-medium p-4">Job Description</h1>
//       <div className="my-4">
//         <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
//         <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
//         <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
//         <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} yr</span></h1>
//         <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary}LPA</span></h1>
//         <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
//         <h1 className="font-bold my-1">Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;

import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const response = await fetch(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                method: 'GET',
                credentials: 'include',
            });

            const resData = await response.json();

            if (response.ok && resData.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
                toast.success(resData.message);
            } else {
                toast.error(resData.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while processing the request.');
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await fetch(`${JOB_API_END_POINT}/get/${jobId}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const resData = await response.json();

                if (response.ok && resData.success) {
                    dispatch(setSingleJob(resData.job));
                    setIsApplied(resData.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                } else {
                    console.log(resData.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription;

