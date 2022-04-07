/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  FlatList, Image, Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resp = await fetch("https://picsum.photos/v2/list");
    const data = await resp.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [visible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const renderItem = (item) => {
    return (
  <View style={{marginVertical: 5}}>
    <TouchableOpacity onPress={() => {
      setIsVisible(true);
      setSelectedImage(item.item.download_url);
    }}>
    <Image
        style={{width: 300, height: 200}}
        resizeMode={"contain"}
        source={{uri: item.item.download_url}}
    />
    <Text style={{color: "#fff", textAlign: "center"}}>{item.item.author}</Text>
    </TouchableOpacity>
  </View>

  )};


  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{paddingHorizontal:  20, justifyContent: "center", alignItems: "center"}}>
      <FlatList
          data={data}
          renderItem={(item) => renderItem(item)}
      />
      <Modal
        style={{  justifyContent: "center", alignItems: "center", backgroundColor: "#000000" }}
        visible={visible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <Text
            style={{fontSize: 24, backgroundColor: "#000", textAlign: "right", paddingHorizontal: 20}}
            onPress={() => setIsVisible(false)}
        >X
        </Text>
        <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#000000" }}>
        <Image
            style={{width: "100%", height: "100%"}}
            resizeMode={"contain"}
            source={{uri: selectedImage}}
        />
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  );
}

export default App;
