import React, { useEffect } from 'react';
import CategoryCarousal from './CategoryCarousal';
import Footer from './shared/Footer';
import HeroSection from './HeroSection';
import LatestJobs from './LatestJobs';
import Navbar from './shared/Navbar';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousal />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
