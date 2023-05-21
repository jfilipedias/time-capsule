import { useState } from 'react'
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

export default function NewMemory() {
  const [isPublic, setIsPublic] = useState(false)

  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-5 flex-row items-center justify-between">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#ffffff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372569' }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />

          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Icon name="image" color="#9E9EA0" />

            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          className="p-0 font-body text-lg text-gray-50"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor="#56565a"
          multiline
        />

        <TouchableOpacity
          className="items-center self-end rounded-full bg-green-500 px-5 py-3"
          activeOpacity={0.7}
        >
          <Text className="font-alt text-sm uppercase text-black">salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
