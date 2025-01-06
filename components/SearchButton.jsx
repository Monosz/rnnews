import { TouchableOpacity, Image } from "react-native";

const SearchButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white border border-gray-300 rounded-lg ml-4 p-2">
      <Image
        source={require("../assets/magnifying-glass.png")}
        style={{ width: 20, height: 20 }}
      />
    </TouchableOpacity>
  );
};

export default SearchButton;
