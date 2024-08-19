import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch(`${COMPANY_API_END_POINT}/get`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await res.json();
                console.log('called');
                
                if (data.success) {
                    dispatch(setCompanies(data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchCompanies();
    }, [dispatch]);
}

export default useGetAllCompanies;
