import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Post from "../components/Post";

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState();
  const [isLoading, setLoading] = useState(false);

  function fetchBlog(page) {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/todos??userId=${page}`)
      .then((res) => setItems(res.data));
    setLoading(false);
  }

  useEffect(() => {
    fetchBlog(2);
  }, []);
  if (isLoading === true) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => fetchBlog(1)}
            refreshing={isLoading}
          />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("post", { id: item.id, title: item.title })
            }
          >
            <Post title={item.title} postDate={item.userId} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
