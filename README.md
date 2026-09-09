# Christoffel's Restaurant - Menu Management App

## Project Description
Local restaurant owner Christoffel needed a simple mobile application to manage restaurant menu. Chef was using paper. This React Native app allows chef to add, view, update and manage menu items from mobile device.

## Features Implemented 
### UI Requirements:
- Clear application title: "Christoffel's Restaurant" in header
- Appropriate React Native components: SafeAreaView, FlatList, TextInput, TouchableOpacity, Alert
- Readable text: High contrast #2C2C2C on #FFF8F0, 18px bold
- Consistent spacing: padding 15px, border radius 12px throughout
- Simple attractive layout: Orange #FF6B35 + Dark #2C2C2C theme

### Capturing Menu Info:
- Dish Name - TextInput
- Description - Multiline TextInput
- Course - 3 buttons: Starter, Main Course, Desert
- Price - Numeric TextInput

### Displaying Menu Items:
- Add multiple items: uses useState array with Date.now() ID
- View all items: FlatList with cards showing name, description, course badge, price
- Auto update: State update triggers FlatList re-render

### UX Improvements:
- Validation for required fields - checks empty fields
- Appropriate error messages - Alert.alert with clear message
- Confirmation on success - Alert "added successfully"
- Message when no items - ListEmptyComponent "No menu items yet. Tap + to add!"
- Consistent layout - Central StyleSheet

  ## How to Run the App
Option 1 - Expo Snack (Easiest for marking):
1. Go to https://snack.expo.dev
2. Paste App.js code
3. Scan QR code with Expo Go app on phone
4. App runs instantly

Option 2
npx create-expo-app ChristoffelApp
cd ChristoffelApp
Replace App.js with this file
npm start
Scan QR with Expo Go

## Screenshots
(Add screenshots of your app running here)

## Video Submission Link
https://youtu.be/EiNO83xKiXU

## GitHub Repo Link for Submission
https://github.com/sevenonefivexo/christoffelrestaurantappST10107043

##Snackexpo link
https://snack.expo.dev/@sevenonefivexo/christoffelrestaurantst10107043

## Developer
Lesego Ramoroka - ST10107043

