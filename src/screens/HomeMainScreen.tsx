import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../styles/Colors';
import { useRootStore } from '../base/hooks/useRootStore';
import { observer } from 'mobx-react';
import { isFirst } from '../base/utils/util';
import DebounceHelper from '../helpers/DebounceHelper';
import { appConfig } from '../appConfig';

export const HomeMainScreen = observer(() => {
  const { albumStore } = useRootStore();

  let searchTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    albumStore.initAlbums();
    albumStore.runAlbumsRotation();

    return () => albumStore.resetAlbums();
  }, []);

  const handleTextChange = (query: string) => {
    searchTimer.current = DebounceHelper.debounce(
      searchTimer?.current,
      () => {
        if (!query) {
          albumStore.setDefaultAlbums();
          return;
        }

        albumStore.getAlbums(query);
      },
      1000,
    );
  };

  const renderTextItem = (value: string, index: number) => {
    if (index >= appConfig.albumsToRotateCount) {
      return null;
    }

    return (
      <View
        key={`item_${index}`}
        style={[
          styles.wrapper,
          styles.itemText,
          !isFirst(index) && styles.itemMargin,
        ]}>
        <Text numberOfLines={1}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, styles.searchContainer]}>
        <TextInput
          placeholder={'Search Band'}
          placeholderTextColor={Colors.gray300}
          selectionColor={Colors.black}
          style={styles.input}
          onChangeText={handleTextChange}
        />
      </View>

      <View style={styles.contentContainer}>
        {albumStore.albums.map((item: string, index: number) =>
          renderTextItem(item, index),
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  wrapper: {
    height: 44,
    overflow: 'hidden',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.gray600,
    backgroundColor: Colors.white,
  },

  input: {
    flex: 1,
    color: Colors.black,
  },
  searchContainer: {
    marginBottom: 16,
  },

  itemText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemMargin: {
    marginTop: 12,
  },

  contentContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gray600,
    borderRadius: 8,
    backgroundColor: Colors.gray300,
  },
});
