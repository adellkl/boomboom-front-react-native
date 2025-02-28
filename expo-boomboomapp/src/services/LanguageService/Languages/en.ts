import { Gender } from "../../UserService/userServiceI";
import LanguageTranslationType from "../beans/LanguageTranslationType";

const en: LanguageTranslationType = {
  common: {
    description: "Description",
    next: "Continue",
    toImplement: "To implement",
    fullName: "Full Name",
    dateOfBirth: "Date Of Birth",
    gender: "Gender",
    over: "Finish",
    matches: "Matches",
    profile: "Profile",
    cancel: "Cancel",
    stepperHeader: "Step {{step}} of {{numberOfStep}}",
  },
  component: {
    GenderButton: {
      [Gender.FEMALE]: "Female",
      [Gender.MALE]: "Male",
      [Gender.NO_SPECIFIC]: "No specific",
    },
    ReturnButton: {
      back: "Back",
    },
    UserProfileForm: {
      errorMessage: "This is required.",
    },
    RegisterStepper: {
      step: {
        "0": {
          title: "Upload profile picture",
        },
        "1": {
          title: "Tell us more about you",
        },
        "2": {
          title: "Add favorites songs",
        },
      },
    },
  },
  screen: {
    SignInScreen: {
      spotifySignInButtonLabel: "Sign in with spotify",
      title: "Get ready for an incredible musical adventure!",
    },
    SignInSuccessfulScreen: {
      title: "Logged In Successfully !",
      subtitle:
        "You have been logged in successfully. Please enter the your details to complete your profile",
    },
    WelcomeScreen: {
      title: "Welcome music lover",
      subtitle: "Let’s try to find your music mate",
      submitButton: "Start matching",
    },
    SongPicker: {
      searchBarPlaceholder: "Search...",
    },
    MyProfile: {
      title: "Profile",
      saveButton: "Save",
    },
  },
};

export default en;
