import { useEffect, useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding, getAuthUser } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";
import { useNavigate } from "react-router";

const EditProfilePage = () => {
  // const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const user = await getAuthUser();
      setFormState({
        fullName: user?.fullName || "",
        bio: user?.bio || "",
        nativeLanguage: user?.nativeLanguage || "",
        learningLanguage: user?.learningLanguage || "",
        location: user?.location || "",
        profilePic: user?.profilePic || "",
      });
      setLoading(false);
    }
    fetchUser();
  }, []);

  const { mutate: editProfileMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error updating profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfileMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Edit Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile" />
                ) : (
                  <div className="flex items-center justify-center h-full text-base-content opacity-40">
                    <ShipWheelIcon className="size-16" />
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleRandomAvatar}
              >
                <ShuffleIcon className="size-4 mr-2" /> Random Avatar
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Location</label>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="size-4 opacity-70" />
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formState.location}
                    onChange={(e) =>
                      setFormState({ ...formState, location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Native Language
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Learning Language
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 font-semibold">Bio</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <LoaderIcon className="animate-spin size-5 mr-2" />
              ) : null}
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
