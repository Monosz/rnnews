import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchButton from "../components/SearchButton";

import { dummyData } from "../data/dummyData";
import { apiKey } from "../config/config";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearch, setLastSearch] = useState("Doraemon");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews(lastSearch);
  }, []);

  const loadDummyData = () => {
    setLoading(true);
    setNews(dummyData);
    setLoading(false);
  };

  const fetchNews = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      console.log(response.status);
      const data = await response.json();
      setNews(data.articles);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // News Item
  const renderNews = ({ item }) => {
    return (
      <>
        <View className="p-2 mt-4 border-b border-gray-300 bg-white rounded-tl-md rounded-tr-md flex-row">
          <View>
            <Image
              source={{
                uri:
                  item.urlToImage ||
                  "https://via.placeholder.com/150?text=Image+Not+Found",
              }}
              className="w-20 h-20 mt-5"
            />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-xs text-gray-400">
              {item.source.name} -{" "}
              {new Date(item.publishedAt).toLocaleDateString("en-US")}
            </Text>
            <Text className="text-sm font-bold" numberOfLines={2}>
              {item.title.split(" - ")[0]}
            </Text>
            <Text className="text-xs text-justify mt-1" numberOfLines={3}>
              {item.description}{" "}
            </Text>
          </View>
        </View>
        <Button
          title="Read more  >>"
          className="mt-2"
          onPress={() => {
            if (item.url !== "https://removed.com") Linking.openURL(item.url);
          }}
        ></Button>
      </>
    );
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    console.log("searching");
    setLastSearch(searchTerm);
    fetchNews(searchTerm);
    setSearchTerm("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-150">
      <ScrollView>
        {/* SearchBar */}
        <View className="p-4 flex-row">
          <TextInput
            className="flex-1 p-2 border border-gray-300 rounded-md bg-white"
            placeholder="Search for news..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          ></TextInput>
          <SearchButton onPress={handleSearch}></SearchButton>
        </View>

        {/* Latest Search */}
        <View className="ml-4">
          <Text className="text-gray-500" numberOfLines={2}>
            Latest search: {lastSearch}
          </Text>
        </View>

        {/* ListView -> FlatList */}
        <View className="p-4">
          <FlatList
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNews}
            ListEmptyComponent={
              <Text className="">
                {loading ? "Loading..." : "No articles found."}
              </Text>
            }
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-4 bg-gray-400">
        <Text className="text-center text-gray-50">
          Copyright <Text className="font-bold">rnNews</Text> © 2025. All rights
          reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
