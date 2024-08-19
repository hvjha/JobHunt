import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await fetch(`${APPLICATION_API_END_POINT}/get`, {
                    method: 'GET',
                    credentials: 'include', 
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // console.log(data);

                if (data.success) {
                    dispatch(setAllAppliedJobs(data.application));
                }
            } catch (error) {
                console.error('Failed to fetch applied jobs:', error);
            }
        };

        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
