import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const response = await fetch(`${JOB_API_END_POINT}/getadminjobs`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await response.json();
                
                if (data.success) {
                    dispatch(setAllAdminJobs(data.jobs));
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllAdminJobs();
    }, [dispatch]);
}

export default useGetAllAdminJobs;
