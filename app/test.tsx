import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../FirebaseConfig'
import { router } from 'expo-router'

const test = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace('/onboarding')
    } catch (error: any) {
      console.log(error)
      alert('Logout failed: ' + (error?.message ?? error))
    }
  }

  return (
    <SafeAreaView>
      <Text>test</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default test

const styles = StyleSheet.create({})