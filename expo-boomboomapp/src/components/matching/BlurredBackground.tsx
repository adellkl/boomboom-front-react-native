import { useFocusEffect } from "@react-navigation/native";
import { Track } from "@swagger/api";
import { buildImageSource } from "@utils/images.utils";
import { buildKey } from "@utils/keys.utils";
import { BlurView } from "expo-blur";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  Platform,
  View,
} from "react-native";

import { BlurredAura } from "./BlurredAura";

// TODO add style pattern to page

type BlurredBackgroundProps = {
  stackProfiles: { songs: Track[] }[];
  currentIdBackground: Track["id"] | null;
  setCurrentIdBackground: (value: string | null) => void;
};

type ImageType = { id: Track["id"]; image: Track["spotifyImage"] };

// TODO add styles pattern and I18n

export function BlurredBackground({
  stackProfiles,
  currentIdBackground,
  setCurrentIdBackground,
}: BlurredBackgroundProps) {
  const [backgroundImages, setBackgroundImages] = useState<ImageType[]>([]);

  // When stackProfiles change, set currentIdBackground to the first song of the current profile
  useEffect(() => {
    if (stackProfiles.length > 0 && stackProfiles[0].songs.length > 0) {
      setCurrentIdBackground(stackProfiles[0].songs[0].id);
    } else {
      setCurrentIdBackground(null);
    }
  }, [stackProfiles]);

  // When a new profile is loaded, add its cover images to the backgroundImages
  useEffect(() => {
    const images = stackProfiles
      .reduce(
        (acc: ImageType[], profile) => [
          ...acc,
          ...profile.songs.map((song) => ({
            id: song.id,
            image: song.spotifyImage,
          })),
        ],
        [],
      )
      .filter(
        (v: ImageType, i: number, a: ImageType[]) =>
          a.findIndex((t) => t.id === v.id) === i,
      );

    // add missing title images only
    setBackgroundImages([
      ...backgroundImages,
      ...images.filter(
        (image) =>
          !backgroundImages.find(
            (bgImage: ImageType) => bgImage.id === image.id,
          ),
      ),
    ]);
  }, [stackProfiles]);

  // Android blueview workaround
  const [showBlueView, setShowBlueView] = useState(Platform.OS !== "android");
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === "android") {
        setShowBlueView(false);
        setTimeout(() => {
          setShowBlueView(true);
        }, 300);
      }
    }, []),
  );

  return (
    <>
      <BlurredAura color="red" position="top-left" />
      <BlurredAura color="blue" position="bottom-right" />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.75,
        }}
      >
        {backgroundImages.map((image) => (
          <Item
            isActive={image.id === currentIdBackground}
            key={buildKey(image.id)}
            image={buildImageSource(image.image)}
          />
        ))}
      </View>
      {showBlueView && (
        <BlurView
          intensity={50}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          // TODO to see
          // @ts-ignore
          overlayColor="transparent"
        />
      )}
    </>
  );
}

type ItemProps = { image: ImageSourcePropType; isActive: boolean };

function Item({ image, isActive }: ItemProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isActive ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          opacity: fadeAnim,
          position: "absolute",
        }}
      >
        <Image
          source={image}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Animated.View>
    </>
  );
}
