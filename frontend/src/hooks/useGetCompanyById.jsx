import React, { useEffect } from "react";
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await fetch(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            dispatch(setSingleCompany(data.company))
          }
        } else {
          console.log("Network response was not ok.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId,dispatch]);
};

export default useGetCompanyById;
