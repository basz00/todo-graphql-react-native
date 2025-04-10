import { CreateNoteScreen } from "@/features/note/create/presentation/ui";
import { NoteListScreen } from "@/features/note/list/presentation/ui/";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="NoteList" component={NoteListScreen} />
    <Stack.Screen name="CreateNode" component={CreateNoteScreen} />
  </Stack.Navigator>
);
