import { Stack } from "expo-router";
import "../global.css";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "rnNews",
          headerStyle: { backgroundColor: "slategray" },
          headerTitleStyle: {
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
};

export default RootLayout;
