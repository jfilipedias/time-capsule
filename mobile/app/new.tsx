import { useState } from 'react'
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { styled } from 'nativewind'
import Icon from '@expo/vector-icons/Feather'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

const StyledNLWLogo = styled(NLWLogo)

export default function NewMemory() {
  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  const router = useRouter()

  const { bottom, top } = useSafeAreaInsets()

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (err) {}
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()
      uploadFormData.append('file', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri: preview,
      } as any)

      const uploadResponse = await fetch('http://192.168.1.109:3333/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: uploadFormData,
      })

      const uploadedResponseData = await uploadResponse.json()

      coverUrl = uploadedResponseData.fileURL
    }

    await fetch('http://192.168.1.109:3333/memories', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coverUrl,
        content,
        isPublic,
      }),
    })

    router.push('/memories')
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-5 flex-row items-center justify-between">
        <StyledNLWLogo className="max-w-[190px]" />

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
          onPress={openImagePicker}
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#9E9EA0" />

              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          className="p-0 font-body text-lg text-gray-50"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor="#56565a"
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
          multiline
        />

        <TouchableOpacity
          className="items-center self-end rounded-full bg-green-500 px-5 py-3"
          activeOpacity={0.7}
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm uppercase text-black">salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
