import React, { useState, useEffect } from 'react';

function Profile() {
  const [openSettings, setOpenSettings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    joined: '',
    email: '',
    location: '',
    languages: '',
    bio: '',
    profile_picture: null,
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null); // Track new profile picture

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const userProfile = data[0];
            setProfile({
              id: userProfile.id,  // Ensure id is stored
              name: userProfile.user.name || 'N/A',
              joined: new Date(userProfile.created_at).toLocaleDateString(),
              email: userProfile.user.email || 'N/A',
              location: userProfile.location || 'N/A',
              languages: userProfile.language || 'N/A',
              bio: userProfile.bio || 'N/A',
              profile_picture: userProfile.profile_picture || null,
            });
          }
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          setError('Failed to load profile. Please try again.');
        });
    }
  }, []);

  const handleSave = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) return;
  
    const updatedProfile = {
      location: profile.location,
      language: profile.languages,
      bio: profile.bio,
    };
  
    const formData = new FormData();
    formData.append('location', updatedProfile.location);
    formData.append('language', updatedProfile.language);
    formData.append('bio', updatedProfile.bio);
  
    // If there's a new profile picture, append it to formData
    if (newProfilePicture) {
      formData.append('profile_picture', newProfilePicture);
    }
  
    fetch(`http://127.0.0.1:8000/api/profile/${profile.id}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,  // Use FormData to send files
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile updated successfully:', data);
  
        // Fetch the updated profile
        fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
          .then(response => response.json())
          .then(updatedData => {
            if (updatedData.length > 0) {
              const updatedProfileData = updatedData[0];
              setProfile({
                id: updatedProfileData.id,  // Ensure id is stored
                name: updatedProfileData.user.name || 'N/A',
                joined: new Date(updatedProfileData.created_at).toLocaleDateString(),
                email: updatedProfileData.user.email || 'N/A',
                location: updatedProfileData.location || 'N/A',
                languages: updatedProfileData.language || 'N/A',
                bio: updatedProfileData.bio || 'N/A',
                profile_picture: updatedProfileData.profile_picture || null,
              });
            }
          })
          .catch(error => {
            console.error('Error fetching updated profile:', error);
            setError('Failed to fetch updated profile. Please try again.');
          });
  
        // Exit editing mode after save
        setIsEditing(false);
        setNewProfilePicture(null); // Clear the new profile picture after save
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        setError('Failed to update profile. Please try again.');
      });
  };
  

  const handleEditClick = () => {
    if (isEditing) {
      handleSave(); // Save when toggling from editing mode
    } else {
      setIsEditing(true); // Enter editing mode
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicture(file); // Store the new profile picture file
    }
  };

  return (
    <div>
      <div className="rounded-lg shadow-xl pb-8 relative">
        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
            alt="Profile Background"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          <img
            src={profile.profile_picture || "https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"}
            className="w-40 h-40 border-4 border-white rounded-full object-cover"
            alt="Profile"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl text-[#e6e9eef1]">{profile.name}</p>
          </div>
          <p className="text-[#ffffff]">{profile.bio}</p>
          <p className="text-sm text-[#f0f3f6]">{profile.location}</p>
        </div>
      </div>

      <div className="my-4 flex flex-col xl:flex-row justify-center space-y-4 xl:space-y-0 xl:space-x-4">
        <div className="w-full xl:w-1/2 flex flex-col xl:flex-row justify-center">
          <div className="flex-1 rounded-lg shadow-xl p-8 xl:w-full">
            <h4 className="text-xl text-[#ffffff] font-bold">Personal Info</h4>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="mt-2 text-[#ffffff]">
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Full name:</span>
                <span>{profile.name}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Joined:</span>
                <span>{profile.joined}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span>{profile.email}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Location:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleProfileChange}
                    className="bg-gray-100 text-black rounded px-2 py-1"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Languages:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="languages"
                    value={profile.languages}
                    onChange={handleProfileChange}
                    className="bg-gray-100 text-black rounded px-2 py-1"
                  />
                ) : (
                  <span>{profile.languages}</span>
                )}
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Bio:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    className="bg-gray-100 text-black rounded px-2 py-1"
                  />
                ) : (
                  <span>{profile.bio}</span>
                )}
              </li>
              {/* Profile Picture Section */}
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Profile Picture:</span>
                {isEditing ? (
                  <input
                    type="file"
                    name="profile_picture"
                    onChange={handleProfilePictureChange}
                    className="bg-gray-100 text-black rounded px-2 py-1"
                  />
                ) : (
                  <span>{profile.profile_picture ? 'Updated' : 'Not updated'}</span>
                )}
              </li>
            </ul>
            <button
              onClick={handleEditClick}
              className="mt-4 text-blue-500 hover:underline"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
