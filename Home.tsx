import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Home = ({navigation}) => {
  const [searchKey, setSearchKey] = useState<string>('');
  const [searches, setSearches] = useState<any>([]);
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchKey}`;

  async function fetchData() {
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      const myArr = responseJson[1].map((title, index) => {
        return {
          title,
          url: responseJson[3][index],
        };
      });
      setSearches(myArr);
      console.log('myAsddsdsdsrr', myArr);
      return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        navigation.navigate('webview', {
          item,
          name: item.title,
        });
      }}>
      <Text>{item?.title}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.txtInput}
          onChangeText={newText => setSearchKey(newText)}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={() => fetchData()}>
          <Text style={{color: 'white'}}>Search</Text>
        </TouchableOpacity>
      </View>

      {searches.length > 0 ? (
        <FlatList data={searches} renderItem={renderItem} />
      ) : null}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  txtInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: 'gray',
    flex: 1,
  },
  touchable: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    marginHorizontal: 10,
  },
  searchBtn: {
    backgroundColor: 'blue',
  },
});
