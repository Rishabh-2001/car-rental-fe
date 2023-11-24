import { useEffect, useState } from 'react';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState({ email: '', userId: '' });

  useEffect(() => {
    // Get user details from localStorage only once during mount
    const storedUserDetails = localStorage.getItem('currentUser');

    if (storedUserDetails) {
      const { email, userId } = JSON.parse(storedUserDetails);
      setUserDetails({ email, userId });
    }
  }, []); // Empty dependency array ensures this effect runs only once during mount

  return userDetails;
};

export default useUserDetails;
