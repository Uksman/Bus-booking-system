import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
//import * as Animatable from "react-native-animatable";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const goToPersonal = () => router.push("/AccountSetting");
  const goSecurity = () => router.push("/Notification");
  const goToPayment = () => setModalVisible(true); // Keep this if you plan to show a modal
  const signOut = () => router.replace("/auth/Login");

  const hideModal = () => {
    setModalVisible(false);
  };
  
  const goToManageAddress = () => {};
  const goToHelpCenter = () => {};

  const AcctSetting = [
    {
      icon1: "person-outline",
      icon2: "chevron-forward",
      text1: "Personal Information",
      text2: "Manage your personal details",
      action: goToPersonal,
      type: "link",
      iconColor: "#ff6536",
      bgColor: "#ffe8e0",
    },
    {
      icon1: "lock-closed-outline",
      icon2: "chevron-forward",
      text1: "Security Settings",
      text2: "Password, PIN, biometries",
      action: goSecurity,
      type: "link",
      iconColor: "#4b7bec",
      bgColor: "#e3ecff",
    },
    {
      icon1: "card-outline",
      icon2: "chevron-forward",
      text1: "Payment Methods",
      text2: "Manage your payment options",
      action: goToPayment,
      iconColor: "#20bf6b",
      bgColor: "#d4f5e6",
      type: "link",
    },
  ];

  const AppSetting = [
    {
      icon1: "notifications-outline",
      icon2: "chevron-forward",
      text1: "Notifications",
      text2: "Manage Notifications preferences",
      action: goToPersonal,
      type: "link",
      iconColor: "#ff6536",
      bgColor: "#ffe8e0",
    },
    {
      icon1: "language",
      icon2: "chevron-forward",
      text1: "Language",
      text2: "English(Us)",
      action: goSecurity,
      type: "link",
      iconColor: "#4b7bec",
      bgColor: "#e3ecff",
    },
    {
      icon1: "moon",
      text1: "Dark Mode",
      text2: "off",
      action: goToPayment,
      iconColor: "#20bf6b",
      bgColor: "#d4f5e6",
      type: "toggle",
    },
    {
      icon1: "location",
      text1: "Location Service",
      text2: "Allow app to access location",
      action: goToPayment,
      iconColor: "#20bf6b",
      bgColor: "#d4f5e6",
      type: "toggle",
    },
  ];

  const SupportAbout = [
    {
      icon1: "person-outline",
      icon2: "chevron-forward",
      text1: "Help & Support",
      text2: "Get help with the app",
      action: goToPersonal,
      type: "link",
      iconColor: "#ff6536",
      bgColor: "#ffe8e0",
    },
    {
      icon1: "lock-closed-outline",
      icon2: "chevron-forward",
      text1: "Terms & Conditions",
      text2: "Read our terms of service",
      action: goSecurity,
      type: "link",
      iconColor: "#4b7bec",
      bgColor: "#e3ecff",
    },
    {
      icon1: "card-outline",
      icon2: "chevron-forward",
      text1: "Privacy Poilcy",
      text2: "How we handle your data",
      action: goToPayment,
      iconColor: "#20bf6b",
      bgColor: "#d4f5e6",
      type: "link",
    },
    {
      icon1: "bus",
      icon2: "chevron-forward",
      text1: "About AKTC",
      text2: "Version 2.5.0",
      action: goToPayment,
      iconColor: "#20bf6b",
      bgColor: "#d4f5e6",
      type: "link",
    },
  ];

  return (
    <ScrollView className='flex-1'>
      <View className='p-5 mt-6'>
        {/* {Profile setting} */}
        <View className='flex-row mb-5 justify-between items-center'>
          <View className='bg-white p-4 rounded-full'>
            <Ionicons name='person-outline' size={20} color='#ff6536' />
          </View>
          <View>
            <Text>Etuk Ukeme</Text>
            <Text>Uksman1998@gmail.com</Text>
          </View>
          <TouchableOpacity className='bg-[#ecd5cd] p-3 rounded-xl'>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        {/* {Account settings} */}
        <View className='mb-4'>
          <View className=' p-3 flex-row items-center gap-3'>
            <View className='bg-orange-600 w-1.5 h-6'></View>
            <Text>Account settings</Text>
          </View>
          {AcctSetting.map((item, index) => (
            <TouchableOpacity
              key={index}
              className='h-16 px-4 rounded-xl flex-row mb-3 bg-white items-center justify-between'
              onPress={item.action}>
              <View className='flex-row items-center gap-4'>
                <View
                  style={{ backgroundColor: item.bgColor }}
                  className='p-3 rounded-xl'>
                  <Ionicons
                    name={item.icon1}
                    size={20}
                    color={item.iconColor}
                  />
                </View>
                <View>
                  <Text>{item.text1}</Text>
                  <Text className='text-xs text-gray-500'>{item.text2}</Text>
                </View>
              </View>
              <Ionicons name={item.icon2} size={20} color='' />
            </TouchableOpacity>
          ))}
        </View>
        {/* {App settings} */}
        <View className='mb-4'>
          <View className='p-3 flex-row items-center gap-4'>
            <View className='bg-orange-600 w-1.5 h-6'></View>
            <Text>App settings</Text>
          </View>
          {AppSetting.map((item, index) => (
            <TouchableOpacity
              key={index}
              className='h-16 px-4 rounded-xl flex-row mb-3 bg-white items-center justify-between'
              onPress={item.action}>
              <View className='flex-row items-center gap-4'>
                <View
                  style={{ backgroundColor: item.bgColor }}
                  className='p-3 rounded-xl'>
                  <Ionicons
                    name={item.icon1}
                    size={20}
                    color={item.iconColor}
                  />
                </View>
                <View>
                  <Text>{item.text1}</Text>
                  <Text className='text-xs text-gray-500'>{item.text2}</Text>
                </View>
              </View>
              {item.type === "toggle" && (
                <Switch
                  trackColor='#81b0ff'
                  thumbColor='#f4f3f4'
                  ios_backgroundColor='#3e3e3e'
                  onValueChange=''
                  value=''
                  accessibilityLabel='Toggle Dark Mode'
                />
              )}
              {item.type === "link" && (
                <Ionicons name={item.icon2} size={20} color='' />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {/* {Support & About} */}
        <View className='mb-4'>
          <View className='p-3 flex-row items-center gap-4'>
            <View className='bg-orange-600 w-1.5 h-6 '></View>
            <Text>Support & About</Text>
          </View>

          {SupportAbout.map((item, index) => (
            <TouchableOpacity
              key={index}
              className='h-16 px-4 rounded-xl flex-row mb-3 bg-white items-center justify-between'
              onPress={item.action}>
              <View className='flex-row items-center gap-4'>
                <View
                  style={{ backgroundColor: item.bgColor }}
                  className='p-3 rounded-xl'>
                  <Ionicons
                    name={item.icon1}
                    size={20}
                    color={item.iconColor}
                  />
                </View>
                <View>
                  <Text>{item.text1}</Text>
                  <Text className='text-xs text-gray-500'>{item.text2}</Text>
                </View>
              </View>
              <Ionicons name={item.icon2} size={20} color='' />
            </TouchableOpacity>
          ))}
        </View>
        {/* { Logout} */}
        <TouchableOpacity onPress={()=> setModalVisible()} className='flex-row justify-center bg-red-600 p-2 rounded-lg items-center gap-2'>
          <Ionicons name='exit-outline' size={20} color='#fff' />
          <Text className='text-white font-bold text-base'>Logout</Text>
        </TouchableOpacity>
        <Modal
          statusBarTranslucent
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideModal}>
          <View
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className='flex-1 justify-center items-center'>
            <View
              style={{ backgroundColor: "#f9f9f9" }}
              className='w-[70%] rounded-2xl p-5'>
              <View className='items-center justify-center my-5'>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  }}
                  source={require("../../../assets/images/close.png")}
                />
              </View>
              <Text
                className=' text-base text-center'
                style={{ color: "" }}>
                Are you sure you want to log out your account?
              </Text>
              <TouchableOpacity
                onPress={hideModal}
                className='bg-slate-400 my-4 p-3 mx-5 rounded-xl'>
                <Text className='text-white text-center'>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className='bg-red-500 mb-4 p-3 mx-5 rounded-xl'
                onPress={signOut}>
                <Text className='text-white text-center'>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    // borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
